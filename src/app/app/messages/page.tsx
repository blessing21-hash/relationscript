import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { NavigationBar } from "@/components/navigation-bar"
import { ConversationsList } from "@/components/conversations-list"

export default async function MessagesPage() {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile) {
    redirect("/onboarding")
  }

  // Get all matches with their latest message
  const { data: matches } = await supabase
    .from("matches")
    .select(
      `
      *,
      user1:profiles!matches_user1_id_fkey(*),
      user2:profiles!matches_user2_id_fkey(*)
    `,
    )
    .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
    .eq("is_active", true)
    .order("matched_at", { ascending: false })

  // Get latest message for each match
  const matchesWithMessages = await Promise.all(
    (matches || []).map(async (match) => {
      const { data: latestMessage } = await supabase
        .from("messages")
        .select("*")
        .eq("match_id", match.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single()

      const { count: unreadCount } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("match_id", match.id)
        .eq("is_read", false)
        .neq("sender_id", user.id)

      return {
        ...match,
        latestMessage,
        unreadCount: unreadCount || 0,
      }
    }),
  )

  // Sort by latest message time
  matchesWithMessages.sort((a, b) => {
    const aTime = a.latestMessage?.created_at || a.matched_at
    const bTime = b.latestMessage?.created_at || b.matched_at
    return new Date(bTime).getTime() - new Date(aTime).getTime()
  })

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar currentPage="messages" />

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">Messages</h1>
        <ConversationsList conversations={matchesWithMessages} currentUserId={user.id} />
      </div>
    </div>
  )
}
