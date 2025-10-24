"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { HealthCategory } from "@/lib/types"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

interface CreateCommunityFormProps {
  userId: string
}

const healthCategories: { value: HealthCategory; label: string }[] = [
  { value: "anxiety", label: "Anxiety" },
  { value: "depression", label: "Depression" },
  { value: "adhd", label: "ADHD" },
  { value: "bipolar", label: "Bipolar Disorder" },
  { value: "ptsd", label: "PTSD" },
  { value: "ocd", label: "OCD" },
  { value: "chronic_pain", label: "Chronic Pain" },
  { value: "autoimmune", label: "Autoimmune Conditions" },
  { value: "diabetes", label: "Diabetes" },
  { value: "other", label: "Other" },
]

export function CreateCommunityForm({ userId }: CreateCommunityFormProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [healthCategory, setHealthCategory] = useState<HealthCategory | "">("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name.trim()) {
      setError("Community name is required")
      return
    }

    setLoading(true)

    try {
      const supabase = getSupabaseBrowserClient()

      const { data: community, error: createError } = await supabase
        .from("communities")
        .insert({
          name: name.trim(),
          description: description.trim() || null,
          health_category: healthCategory || null,
          created_by: userId,
          is_private: false,
        })
        .select()
        .single()

      if (createError) throw createError

      // Automatically join the creator as a moderator
      await supabase.from("community_members").insert({
        community_id: community.id,
        user_id: userId,
        is_moderator: true,
      })

      router.push(`/community/${community.id}`)
    } catch (err: any) {
      setError(err.message || "Failed to create community")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Community Name</Label>
            <Input
              id="name"
              placeholder="e.g., Anxiety Support Circle"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="What is this community about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Health Category (Optional)</Label>
            <Select value={healthCategory} onValueChange={(value) => setHealthCategory(value as HealthCategory)}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {healthCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Creating..." : "Create Community"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
