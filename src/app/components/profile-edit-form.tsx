"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Profile, HealthCategory, LookingFor } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

interface ProfileEditFormProps {
  profile: Profile
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

const lookingForOptions: { value: LookingFor; label: string }[] = [
  { value: "dating", label: "Dating" },
  { value: "friendship", label: "Friendship" },
  { value: "support", label: "Support & Community" },
]

export function ProfileEditForm({ profile }: ProfileEditFormProps) {
  const [displayName, setDisplayName] = useState(profile.display_name)
  const [age, setAge] = useState(profile.age?.toString() || "")
  const [location, setLocation] = useState(profile.location || "")
  const [bio, setBio] = useState(profile.bio || "")
  const [selectedHealthCategories, setSelectedHealthCategories] = useState<HealthCategory[]>(
    profile.health_categories || [],
  )
  const [lookingFor, setLookingFor] = useState<LookingFor[]>(profile.looking_for || [])
  const [showHealthPublicly, setShowHealthPublicly] = useState(profile.show_health_publicly)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleHealthCategoryToggle = (category: HealthCategory) => {
    setSelectedHealthCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleLookingForToggle = (option: LookingFor) => {
    setLookingFor((prev) => (prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const supabase = getSupabaseBrowserClient()

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          display_name: displayName,
          age: age ? Number.parseInt(age) : null,
          location: location || null,
          bio: bio || null,
          health_categories: selectedHealthCategories,
          looking_for: lookingFor,
          show_health_publicly: showHealthPublicly,
          updated_at: new Date().toISOString(),
        })
        .eq("id", profile.id)

      if (updateError) throw updateError

      router.push("/profile")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 font-semibold">Basic Information</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="display-name">Display Name</Label>
              <Input id="display-name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 font-semibold">Health Journey</h3>
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {healthCategories.map((category) => (
                <div key={category.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`edit-${category.value}`}
                    checked={selectedHealthCategories.includes(category.value)}
                    onCheckedChange={() => handleHealthCategoryToggle(category.value)}
                  />
                  <Label htmlFor={`edit-${category.value}`} className="cursor-pointer font-normal">
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2 rounded-lg border border-border p-4">
              <Checkbox
                id="show-health"
                checked={showHealthPublicly}
                onCheckedChange={(checked) => setShowHealthPublicly(checked as boolean)}
              />
              <Label htmlFor="show-health" className="cursor-pointer font-normal">
                Show my health categories on my public profile
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 font-semibold">Looking For</h3>
          <div className="space-y-3">
            {lookingForOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`edit-${option.value}`}
                  checked={lookingFor.includes(option.value)}
                  onCheckedChange={() => handleLookingForToggle(option.value)}
                />
                <Label htmlFor={`edit-${option.value}`} className="cursor-pointer font-normal">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  )
}
