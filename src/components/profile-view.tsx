import type { Profile } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar } from "lucide-react"

interface ProfileViewProps {
  profile: Profile
  isOwnProfile: boolean
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

export function ProfileView({ profile, isOwnProfile }: ProfileViewProps) {
  const showHealthCategories = isOwnProfile || profile.show_health_publicly

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-3xl font-semibold text-primary sm:mb-0 sm:mr-6">
              {profile.display_name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{profile.display_name}</h2>
              <p className="text-muted-foreground">@{profile.username}</p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground sm:justify-start">
                {profile.age && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{profile.age} years old</span>
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
          </div>
        </CardContent>
      </Card>

      {/* Bio */}
      {profile.bio && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-2 font-semibold">About</h3>
            <p className="text-muted-foreground">{profile.bio}</p>
          </CardContent>
        </Card>
      )}

      {/* Looking For */}
      {profile.looking_for && profile.looking_for.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-3 font-semibold">Looking For</h3>
            <div className="flex flex-wrap gap-2">
              {profile.looking_for.map((item) => (
                <Badge key={item} variant="secondary">
                  {lookingForLabels[item] || item}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Health Journey */}
      {showHealthCategories && profile.health_categories && profile.health_categories.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-3 font-semibold">Health Journey</h3>
            <div className="flex flex-wrap gap-2">
              {profile.health_categories.map((category) => (
                <Badge key={category} variant="outline" className="border-primary/50 text-primary">
                  {healthCategoryLabels[category] || category}
                </Badge>
              ))}
            </div>
            {!isOwnProfile && !profile.show_health_publicly && (
              <p className="mt-3 text-sm text-muted-foreground">
                This user has chosen to keep their health journey private until you match.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
