import type { Community } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface CommunityHeaderProps {
  community: Community
  memberCount: number
  isModerator: boolean
  userId: string
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

export function CommunityHeader({ community, memberCount, isModerator }: CommunityHeaderProps) {
  return (
    <>
      <div className="mb-6">
        <Link href="/community">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Communities
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="mb-3 flex items-start justify-between">
            <h1 className="text-2xl font-bold">{community.name}</h1>
            {community.health_category && (
              <Badge variant="outline" className="border-primary/50 text-primary">
                {healthCategoryLabels[community.health_category] || community.health_category}
              </Badge>
            )}
          </div>

          {community.description && <p className="mb-4 text-muted-foreground">{community.description}</p>}

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>
                {memberCount} {memberCount === 1 ? "member" : "members"}
              </span>
            </div>
            {isModerator && <Badge variant="secondary">Moderator</Badge>}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
