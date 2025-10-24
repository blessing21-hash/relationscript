"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface CreatePostFormProps {
  communityId: string
  userId: string
}

export function CreatePostForm({ communityId, userId }: CreatePostFormProps) {
  const [content, setContent] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim() || loading) return

    setLoading(true)

    try {
      const supabase = getSupabaseBrowserClient()

      const { error } = await supabase.from("community_posts").insert({
        community_id: communityId,
        author_id: userId,
        content: content.trim(),
        is_anonymous: isAnonymous,
      })

      if (error) throw error

      setContent("")
      setIsAnonymous(false)
      router.refresh()
    } catch (error) {
      console.error("[v0] Error creating post:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Share your thoughts, experiences, or ask for support..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            disabled={loading}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="anonymous"
                checked={isAnonymous}
                onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                disabled={loading}
              />
              <Label htmlFor="anonymous" className="cursor-pointer text-sm">
                Post anonymously
              </Label>
            </div>

            <Button type="submit" disabled={!content.trim() || loading}>
              {loading ? "Posting..." : "Post"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
