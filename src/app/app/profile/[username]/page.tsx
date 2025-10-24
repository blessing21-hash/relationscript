import { notFound, redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { ProfileView } from "@/components/profile-view"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, MessageCircle, Flag } from "lucide-react"

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("username", username).single()

  if (!profile) {
    notFound()
  }

  const isOwnProfile = user.id === profile.id

  // Check if already matched
  const { data: existingMatch } = await supabase
    .from("matches")
    .select("*")
    .or(`and(user1_id.eq.${user.id},user2_id.eq.${profile.id}),and(user1_id.eq.${profile.id},user2_id.eq.${user.id})`)
    .single()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/matches">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          {!isOwnProfile && (
            <Button variant="ghost" size="icon">
              <Flag className="h-5 w-5" />
            </Button>
          )}
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <ProfileView profile={profile} isOwnProfile={isOwnProfile} />

        {!isOwnProfile && (
          <div className="mt-8 flex gap-4">
            {existingMatch ? (
              <Link href={`/messages/${existingMatch.id}`} className="flex-1">
                <Button className="w-full" size="lg">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Send Message
                </Button>
              </Link>
            ) : (
              <Button className="flex-1" size="lg">
                <Heart className="mr-2 h-5 w-5" />
                Like Profile
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
