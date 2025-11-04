import type { Profile, CommunityPost } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

interface PostWithAuthor extends CommunityPost {
  author: Profile
}

interface CommunityPostsProps {
  posts: PostWithAuthor[]
  currentUserId: string
}

export function CommunityPosts({ posts, currentUserId }: CommunityPostsProps) {
  if (posts.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
        <h3 className="mb-2 text-lg font-semibold">No posts yet</h3>
        <p className="text-sm text-muted-foreground">Be the first to share something with the community!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Community Posts</h2>

      {posts.map((post) => {
        const isOwnPost = post.author_id === currentUserId
        const displayName = post.is_anonymous && !isOwnPost ? "Anonymous" : post.author.display_name
        const showUsername = !post.is_anonymous || isOwnPost

        return (
          <Card key={post.id}>
            <CardContent className="pt-6">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  {showUsername ? (
                    <Link href={`/profile/${post.author.username}`} className="font-semibold hover:underline">
                      {displayName}
                    </Link>
                  ) : (
                    <span className="font-semibold text-muted-foreground">{displayName}</span>
                  )}
                  {post.is_anonymous && isOwnPost && (
                    <span className="ml-2 text-xs text-muted-foreground">(posted anonymously)</span>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                  </p>
                </div>
              </div>

              <p className="whitespace-pre-wrap text-foreground">{post.content}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
