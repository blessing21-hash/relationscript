import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DiscoverTab } from "@/components/discover-tab"
import { MatchesListTab } from "@/components/matches-list-tab"
import { NavigationBar } from "@/components/navigation-bar"

export default async function MatchesPage() {
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

  // Get potential matches - users with overlapping health categories
  const { data: potentialMatches } = await supabase
    .from("profiles")
    .select("*")
    .neq("id", user.id)
    .overlaps("health_categories", profile.health_categories)
    .limit(20)

  // Get existing matches
  const { data: existingMatches } = await supabase
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

  // Filter out users we've already interacted with
  const interactedUserIds = new Set(
    existingMatches?.flatMap((match) => [match.user1_id, match.user2_id]).filter((id) => id !== user.id) || [],
  )

  const filteredPotentialMatches = potentialMatches?.filter((match) => !interactedUserIds.has(match.id)) || []

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar currentPage="matches" />

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <Tabs defaultValue="discover" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="matches">
              Matches {existingMatches && existingMatches.length > 0 && `(${existingMatches.length})`}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="mt-6">
            <DiscoverTab potentialMatches={filteredPotentialMatches} currentUserId={user.id} />
          </TabsContent>

          <TabsContent value="matches" className="mt-6">
            <MatchesListTab matches={existingMatches || []} currentUserId={user.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
