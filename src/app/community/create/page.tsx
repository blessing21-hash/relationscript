import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { NavigationBar } from "@/components/navigation-bar"
import { CreateCommunityForm } from "@/components/create-community-form"

export default async function CreateCommunityPage() {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar currentPage="community" />

      <div className="container mx-auto max-w-2xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">Create a Community</h1>
        <CreateCommunityForm userId={user.id} />
      </div>
    </div>
  )
}
