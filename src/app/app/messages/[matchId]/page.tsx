import { redirect, notFound } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { ChatInterface } from "@/components/chat-interface"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default async function ChatPage({ params }: { params: Promise<{ matchId: string }> }) {
  const { matchId } = await params
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Get match details
  const { data: match } = await supabase
    .from("matches")
    .select(
      `
      *,
      user1:profiles!matches_user1_id_fkey(*),
      user2:profiles!matches_user2_id_fkey(*)
    `,
    )
    .eq("id", matchId)
    .single()

  if (!match) {
    notFound()
  }

  // Verify user is part of this match
  if (match.user1_id !== user.id && match.user2_id !== user.id) {
    redirect("/messages")
  }

  const otherUser = match.user1_id === user.id ? match.user2 : match.user1

  // Get all messages for this match
  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .eq("match_id", matchId)
    .order("created_at", { ascending: true })

  // Mark messages as read
  await supabase.from("messages").update({ is_read: true }).eq("match_id", matchId).neq("sender_id", user.id)

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
          <Link href="/messages">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <Link href={`/profile/${otherUser.username}`} className="flex items-center gap-3 hover:opacity-80">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              {otherUser.display_name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-semibold">{otherUser.display_name}</h2>
              <p className="text-xs text-muted-foreground">@{otherUser.username}</p>
            </div>
          </Link>
        </div>
      </header>

      {/* Chat Interface */}
      <ChatInterface matchId={matchId} initialMessages={messages || []} currentUserId={user.id} otherUser={otherUser} />
    </div>
  )
}
