import type { Profile } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar } from "lucide-react"
import Link from "next/link"

interface ProfileCardProps {
  profile: Profile
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

const lookingForLabels: Record<string, string> = {
  dating: "Dating",
  friendship: "Friendship",
  support: "Support & Community",
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Card className="overflow-hidden">
      {/* Profile Image Placeholder */}
      <div className="flex h-96 items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="text-8xl font-bold text-primary/40">{profile.display_name.charAt(0).toUpperCase()}</div>
      </div>

      <CardContent className="p-6">
        <div className="mb-4">
          <Link href={`/profile/${profile.username}`} className="hover:underline">
            <h2 className="text-2xl font-bold">{profile.display_name}</h2>
          </Link>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            {profile.age && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{profile.age}</span>
              </div>
            )}
            {profile.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{profile.location}</span>
              </div>
            )}
          </div>
        </div>

        {profile.bio && <p className="mb-4 text-muted-foreground">{profile.bio}</p>}

        {profile.looking_for && profile.looking_for.length > 0 && (
          <div className="mb-4">
            <h4 className="mb-2 text-sm font-semibold">Looking For</h4>
            <div className="flex flex-wrap gap-2">
              {profile.looking_for.map((item) => (
                <Badge key={item} variant="secondary">
                  {lookingForLabels[item] || item}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {profile.show_health_publicly && profile.health_categories && profile.health_categories.length > 0 && (
          <div>
            <h4 className="mb-2 text-sm font-semibold">Health Journey</h4>
            <div className="flex flex-wrap gap-2">
              {profile.health_categories.map((category) => (
                <Badge key={category} variant="outline" className="border-primary/50 text-primary">
                  {healthCategoryLabels[category] || category}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
