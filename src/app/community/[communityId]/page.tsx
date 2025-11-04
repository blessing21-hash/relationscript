import { redirect, notFound } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { NavigationBar } from "@/components/navigation-bar"
import { CommunityHeader } from "@/components/community-header"
import { CommunityPosts } from "@/components/community-posts"
import { CreatePostForm } from "@/components/create-post-form"

export default async function CommunityDetailPage({ params }: { params: Promise<{ communityId: string }> }) {
  const { communityId } = await params
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Get community details
  const { data: community } = await supabase.from("communities").select("*").eq("id", communityId).single()

  if (!community) {
    notFound()
  }

  // Check if user is a member
  const { data: membership } = await supabase
    .from("community_members")
    .select("*")
    .eq("community_id", communityId)
    .eq("user_id", user.id)
    .single()

  if (!membership) {
    redirect("/community")
  }

  // Get member count
  const { count: memberCount } = await supabase
    .from("community_members")
    .select("*", { count: "exact", head: true })
    .eq("community_id", communityId)

  // Get posts with author info
  const { data: posts } = await supabase
    .from("community_posts")
    .select(
      `
      *,
      author:profiles(*)
    `,
    )
    .eq("community_id", communityId)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar currentPage="community" />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <CommunityHeader
          community={community}
          memberCount={memberCount || 0}
          isModerator={membership.is_moderator}
          userId={user.id}
        />

        <div className="mt-8">
          <CreatePostForm communityId={communityId} userId={user.id} />
        </div>

        <div className="mt-8">
          <CommunityPosts posts={posts || []} currentUserId={user.id} />
        </div>
      </div>
    </div>
  )
}
