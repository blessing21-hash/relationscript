import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { NavigationBar } from "@/components/navigation-bar"
import { CommunityCard } from "@/components/community-card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function CommunityPage() {
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

  // Get all public communities
  const { data: communities } = await supabase.from("communities").select("*").eq("is_private", false)

  // Get user's joined communities
  const { data: joinedCommunities } = await supabase
    .from("community_members")
    .select("community_id")
    .eq("user_id", user.id)

  const joinedCommunityIds = new Set(joinedCommunities?.map((jc) => jc.community_id) || [])

  // Get member counts for each community
  const communitiesWithCounts = await Promise.all(
    (communities || []).map(async (community) => {
      const { count } = await supabase
        .from("community_members")
        .select("*", { count: "exact", head: true })
        .eq("community_id", community.id)

      return {
        ...community,
        memberCount: count || 0,
        isJoined: joinedCommunityIds.has(community.id),
      }
    }),
  )

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar currentPage="community" />

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Community Spaces</h1>
          <Link href="/community/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Community
            </Button>
          </Link>
        </div>

        <p className="mb-8 text-muted-foreground">
          Join supportive communities where you can share experiences, find understanding, and connect with others on
          similar journeys.
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {communitiesWithCounts.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
      </div>
    </div>
  )
}
