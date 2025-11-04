"use client"

import type { Community } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface CommunityCardProps {
  community: Community & { memberCount: number; isJoined: boolean }
}

const healthCategoryLabels: Record<string, string> = {
  anxiety: "Anxiety",
  depression: "Depression",
  adhd: "ADHD",
  bipolar: "Bipolar Disorder",
  ptsd: "PTSD",
  ocd: "OCD",
  chronic_pain: "Chronic Pain",
  autoimmune: "Autoimmune",
  diabetes: "Diabetes",
  other: "Other",
}

export function CommunityCard({ community }: CommunityCardProps) {
  const [isJoined, setIsJoined] = useState(community.isJoined)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleJoin = async () => {
    setLoading(true)
    try {
      const supabase = getSupabaseBrowserClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      if (isJoined) {
        await supabase.from("community_members").delete().eq("community_id", community.id).eq("user_id", user.id)
        setIsJoined(false)
      } else {
        await supabase.from("community_members").insert({
          community_id: community.id,
          user_id: user.id,
        })
        setIsJoined(true)
      }

      router.refresh()
    } catch (error) {
      console.error("[v0] Error joining/leaving community:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewCommunity = () => {
    if (isJoined) {
      router.push(`/community/${community.id}`)
    }
  }

  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pt-6">
        <div className="mb-3 flex items-start justify-between">
          <h3 className="text-lg font-semibold">{community.name}</h3>
          {community.health_category && (
            <Badge variant="outline" className="border-primary/50 text-primary">
              {healthCategoryLabels[community.health_category] || community.health_category}
            </Badge>
          )}
        </div>

        <p className="mb-4 text-sm text-muted-foreground line-clamp-3">{community.description}</p>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>
            {community.memberCount} {community.memberCount === 1 ? "member" : "members"}
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        {isJoined ? (
          <>
            <Button onClick={handleViewCommunity} className="flex-1">
              View Community
            </Button>
            <Button onClick={handleJoin} variant="outline" disabled={loading}>
              {loading ? "Leaving..." : "Leave"}
            </Button>
          </>
        ) : (
          <Button onClick={handleJoin} className="w-full" disabled={loading}>
            {loading ? "Joining..." : "Join Community"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
