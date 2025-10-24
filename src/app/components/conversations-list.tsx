import type { Profile } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

interface Conversation {
  id: string
  user1_id: string
  user2_id: string
  matched_at: string
  user1: Profile
  user2: Profile
  latestMessage?: {
    content: string
    created_at: string
    sender_id: string
  }
  unreadCount: number
}

interface ConversationsListProps {
  conversations: Conversation[]
  currentUserId: string
}

export function ConversationsList({ conversations, currentUserId }: ConversationsListProps) {
  if (conversations.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <h3 className="mb-2 text-xl font-semibold">No conversations yet</h3>
        <p className="text-muted-foreground">Start matching with people to begin conversations!</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {conversations.map((conversation) => {
        const otherUser = conversation.user1_id === currentUserId ? conversation.user2 : conversation.user1
        const isFromCurrentUser = conversation.latestMessage?.sender_id === currentUserId

        return (
          <Link key={conversation.id} href={`/messages/${conversation.id}`}>
            <Card className="transition-colors hover:bg-muted/50">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                  {otherUser.display_name.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <h3 className="font-semibold">{otherUser.display_name}</h3>
                    {conversation.latestMessage && (
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(conversation.latestMessage.created_at), { addSuffix: true })}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm text-muted-foreground">
                      {conversation.latestMessage ? (
                        <>
                          {isFromCurrentUser && "You: "}
                          {conversation.latestMessage.content}
                        </>
                      ) : (
                        "Start a conversation"
                      )}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <Badge variant="default" className="ml-2 flex-shrink-0">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
