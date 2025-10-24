"use client"

import { useState } from "react"
import type { Profile } from "@/lib/types"
import { ProfileCard } from "@/components/profile-card"
import { Button } from "@/components/ui/button"
import { X, Heart, Sparkles } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface DiscoverTabProps {
  potentialMatches: Profile[]
  currentUserId: string
}

export function DiscoverTab({ potentialMatches, currentUserId }: DiscoverTabProps) {
  const [matches, setMatches] = useState(potentialMatches)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const currentProfile = matches[currentIndex]

  const handleAction = async (action: "pass" | "like") => {
    if (!currentProfile || loading) return

    setLoading(true)

    try {
      const supabase = getSupabaseBrowserClient()

      if (action === "like") {
        // Check if the other user already liked us
        const { data: existingMatch } = await supabase
          .from("matches")
          .select("*")
          .or(
            `and(user1_id.eq.${currentProfile.id},user2_id.eq.${currentUserId}),and(user1_id.eq.${currentUserId},user2_id.eq.${currentProfile.id})`,
          )
          .single()

        if (existingMatch) {
          // Update existing match
          const updateField = existingMatch.user1_id === currentUserId ? "user1_liked" : "user2_liked"
          await supabase
            .from("matches")
            .update({ [updateField]: true })
            .eq("id", existingMatch.id)
        } else {
          // Create new match entry
          await supabase.from("matches").insert({
            user1_id: currentUserId,
            user2_id: currentProfile.id,
            user1_liked: true,
            user2_liked: false,
          })
        }
      }

      // Move to next profile
      setCurrentIndex((prev) => prev + 1)
      router.refresh()
    } catch (error) {
      console.error("[v0] Error handling match action:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!currentProfile) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
        <Sparkles className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="mb-2 text-xl font-semibold">No more profiles to show</h3>
        <p className="text-muted-foreground">Check back later for new matches!</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <ProfileCard profile={currentProfile} />

      <div className="mt-6 flex items-center justify-center gap-4">
        <Button
          size="lg"
          variant="outline"
          className="h-16 w-16 rounded-full border-2 bg-transparent"
          onClick={() => handleAction("pass")}
          disabled={loading}
        >
          <X className="h-6 w-6" />
        </Button>

        <Button size="lg" className="h-20 w-20 rounded-full" onClick={() => handleAction("like")} disabled={loading}>
          <Heart className="h-8 w-8" />
        </Button>
      </div>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        {matches.length - currentIndex - 1} more {matches.length - currentIndex - 1 === 1 ? "profile" : "profiles"} to
        discover
      </div>
    </div>
  )
}
