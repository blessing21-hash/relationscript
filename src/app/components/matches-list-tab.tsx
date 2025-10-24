import type { Profile } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import Link from "next/link"

interface Match {
  id: string
  user1_id: string
  user2_id: string
  matched_at: string
  user1: Profile
  user2: Profile
}

interface MatchesListTabProps {
  matches: Match[]
  currentUserId: string
}

export function MatchesListTab({ matches, currentUserId }: MatchesListTabProps) {
  if (matches.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <h3 className="mb-2 text-xl font-semibold">No matches yet</h3>
        <p className="text-muted-foreground">Start discovering profiles to find your matches!</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {matches.map((match) => {
        const otherUser = match.user1_id === currentUserId ? match.user2 : match.user1
        return (
          <Card key={match.id}>
            <CardContent className="p-4">
              <Link href={`/profile/${otherUser.username}`}>
                <div className="mb-3 flex h-32 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                  <div className="text-4xl font-bold text-primary/40">
                    {otherUser.display_name.charAt(0).toUpperCase()}
                  </div>
                </div>
              </Link>

              <Link href={`/profile/${otherUser.username}`} className="hover:underline">
                <h3 className="mb-1 font-semibold">{otherUser.display_name}</h3>
              </Link>
              <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{otherUser.bio || "No bio yet"}</p>

              <Link href={`/messages/${match.id}`}>
                <Button className="w-full" size="sm">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message
                </Button>
              </Link>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
