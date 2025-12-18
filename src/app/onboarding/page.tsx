// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Textarea } from "@/components/ui/textarea"
// import { Heart } from "lucide-react"
// import { getSupabaseBrowserClient } from "@/lib/supabase/client"
// import type { HealthCategory, LookingFor } from "@/lib/types"

// const healthCategories: { value: HealthCategory; label: string }[] = [
//   { value: "anxiety", label: "Anxiety" },
//   { value: "depression", label: "Depression" },
//   { value: "adhd", label: "ADHD" },
//   { value: "bipolar", label: "Bipolar Disorder" },
//   { value: "ptsd", label: "PTSD" },
//   { value: "ocd", label: "OCD" },
//   { value: "chronic_pain", label: "Chronic Pain" },
//   { value: "autoimmune", label: "Autoimmune Conditions" },
//   { value: "diabetes", label: "Diabetes" },
//   { value: "other", label: "Other" },
// ]

// const lookingForOptions: { value: LookingFor; label: string }[] = [
//   { value: "dating", label: "Dating" },
//   { value: "friendship", label: "Friendship" },
//   { value: "support", label: "Support & Community" },
// ]

// export default function OnboardingPage() {
//   const [step, setStep] = useState(1)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")
//   const router = useRouter()

//   // Form state
//   const [username, setUsername] = useState("")
//   const [displayName, setDisplayName] = useState("")
//   const [age, setAge] = useState("")
//   const [location, setLocation] = useState("")
//   const [bio, setBio] = useState("")
//   const [selectedHealthCategories, setSelectedHealthCategories] = useState<HealthCategory[]>([])
//   const [lookingFor, setLookingFor] = useState<LookingFor[]>([])
//   const [showHealthPublicly, setShowHealthPublicly] = useState(false)

//   const handleHealthCategoryToggle = (category: HealthCategory) => {
//     setSelectedHealthCategories((prev) =>
//       prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
//     )
//   }

//   const handleLookingForToggle = (option: LookingFor) => {
//     setLookingFor((prev) => (prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]))
//   }

//   const handleSubmit = async () => {
//     if (selectedHealthCategories.length === 0) {
//       setError("Please select at least one health category")
//       return
//     }

//     if (lookingFor.length === 0) {
//       setError("Please select what you're looking for")
//       return
//     }

//     setLoading(true)
//     setError("")

//     try {
//       const supabase = getSupabaseBrowserClient()
//       const {
//         data: { user },
//       } = await supabase.auth.getUser()

//       if (!user) throw new Error("Not authenticated")

//       const { error: profileError } = await supabase.from("profiles").insert({
//         id: user.id,
//         username,
//         display_name: displayName,
//         age: Number.parseInt(age),
//         location,
//         bio,
//         health_categories: selectedHealthCategories,
//         looking_for: lookingFor,
//         show_health_publicly: showHealthPublicly,
//       })

//       if (profileError) throw profileError

//       router.push("/matches")
//     } catch (err: any) {
//       setError(err.message || "Failed to complete onboarding")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-muted/50 px-4 py-8">
//       <div className="w-full max-w-2xl">
//         <div className="mb-8 text-center">
//           <Heart className="mx-auto h-8 w-8 text-primary" />
//           <h1 className="mt-4 text-2xl font-semibold">Welcome to Relationscript</h1>
//           <p className="mt-2 text-muted-foreground">Let's set up your profile</p>
//         </div>

//         <Card>
//           <CardHeader>
//             <CardTitle>
//               {step === 1 && "Basic Information"}
//               {step === 2 && "Your Health Journey"}
//               {step === 3 && "What You're Looking For"}
//             </CardTitle>
//             <CardDescription>Step {step} of 3</CardDescription>
//           </CardHeader>
//           <CardContent>
//             {step === 1 && (
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="username">Username</Label>
//                   <Input
//                     id="username"
//                     placeholder="Choose a unique username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="display-name">Display Name</Label>
//                   <Input
//                     id="display-name"
//                     placeholder="How should we call you?"
//                     value={displayName}
//                     onChange={(e) => setDisplayName(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className="grid gap-4 sm:grid-cols-2">
//                   <div className="space-y-2">
//                     <Label htmlFor="age">Age</Label>
//                     <Input
//                       id="age"
//                       type="number"
//                       placeholder="25"
//                       value={age}
//                       onChange={(e) => setAge(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="location">Location</Label>
//                     <Input
//                       id="location"
//                       placeholder="City, State"
//                       value={location}
//                       onChange={(e) => setLocation(e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="bio">Bio</Label>
//                   <Textarea
//                     id="bio"
//                     placeholder="Tell us a bit about yourself..."
//                     value={bio}
//                     onChange={(e) => setBio(e.target.value)}
//                     rows={4}
//                   />
//                 </div>

//                 <Button onClick={() => setStep(2)} className="w-full" disabled={!username || !displayName || !age}>
//                   Continue
//                 </Button>
//               </div>
//             )}

//             {step === 2 && (
//               <div className="space-y-4">
//                 <div className="space-y-4">
//                   <p className="text-sm text-muted-foreground">
//                     Select the health experiences you're comfortable sharing. This helps us connect you with people who
//                     understand.
//                   </p>

//                   <div className="grid gap-3 sm:grid-cols-2">
//                     {healthCategories.map((category) => (
//                       <div key={category.value} className="flex items-center space-x-2">
//                         <Checkbox
//                           id={category.value}
//                           checked={selectedHealthCategories.includes(category.value)}
//                           onCheckedChange={() => handleHealthCategoryToggle(category.value)}
//                         />
//                         <Label htmlFor={category.value} className="cursor-pointer font-normal">
//                           {category.label}
//                         </Label>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="flex items-center space-x-2 rounded-lg border border-border p-4">
//                     <Checkbox
//                       id="show-health"
//                       checked={showHealthPublicly}
//                       onCheckedChange={(checked) => setShowHealthPublicly(checked as boolean)}
//                     />
//                     <Label htmlFor="show-health" className="cursor-pointer font-normal">
//                       Show my health categories on my public profile
//                     </Label>
//                   </div>
//                 </div>

//                 <div className="flex gap-2">
//                   <Button onClick={() => setStep(1)} variant="outline" className="w-full">
//                     Back
//                   </Button>
//                   <Button
//                     onClick={() => setStep(3)}
//                     className="w-full"
//                     disabled={selectedHealthCategories.length === 0}
//                   >
//                     Continue
//                   </Button>
//                 </div>
//               </div>
//             )}

//             {step === 3 && (
//               <div className="space-y-4">
//                 <div className="space-y-4">
//                   <p className="text-sm text-muted-foreground">What are you looking for on Relationscript?</p>

//                   <div className="space-y-3">
//                     {lookingForOptions.map((option) => (
//                       <div key={option.value} className="flex items-center space-x-2">
//                         <Checkbox
//                           id={option.value}
//                           checked={lookingFor.includes(option.value)}
//                           onCheckedChange={() => handleLookingForToggle(option.value)}
//                         />
//                         <Label htmlFor={option.value} className="cursor-pointer font-normal">
//                           {option.label}
//                         </Label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {error && <p className="text-sm text-destructive">{error}</p>}

//                 <div className="flex gap-2">
//                   <Button onClick={() => setStep(2)} variant="outline" className="w-full">
//                     Back
//                   </Button>
//                   <Button onClick={handleSubmit} className="w-full" disabled={loading || lookingFor.length === 0}>
//                     {loading ? "Creating profile..." : "Complete Setup"}
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }






















"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Heart } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import type { HealthCategory, LookingFor } from "@/lib/types"



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



export default function OnboardingPage() {
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Form state
  const [username, setUsername] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [age, setAge] = useState("")
  const [location, setLocation] = useState("")
  const [bio, setBio] = useState("")
  const [selectedHealthCategories, setSelectedHealthCategories] = useState<HealthCategory[]>([])
  const [lookingFor, setLookingFor] = useState<LookingFor[]>([])
  const [showHealthPublicly, setShowHealthPublicly] = useState(false)

  

  const toggleHealthCategory = (category: HealthCategory) => {
    setSelectedHealthCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleLookingFor = (option: LookingFor) => {
    setLookingFor((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option],
    )
  }

 

  const handleSubmit = async () => {
    if (!selectedHealthCategories.length) {
      setError("Please select at least one health category.")
      return
    }

    if (!lookingFor.length) {
      setError("Please select what you're looking for.")
      return
    }

    setLoading(true)
    setError("")

    try {
      // ✅ FIX: use getSession instead of getUser
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        throw new Error("Not authenticated. Please sign in again.")
      }

      const user = session.user

      const { error: profileError } = await supabase.from("profiles").upsert({
        id: user.id,
        username,
        display_name: displayName,
        age: Number(age),
        location,
        bio,
        health_categories: selectedHealthCategories,
        looking_for: lookingFor,
        show_health_publicly: showHealthPublicly,
      })

      if (profileError) throw profileError

      router.push("/matches")
    } catch (err: any) {
      setError(err.message || "Failed to complete onboarding.")
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <Heart className="mx-auto h-8 w-8 text-primary" />
          <h1 className="mt-4 text-2xl font-semibold">Welcome to Relationscript</h1>
          <p className="mt-2 text-muted-foreground">Let’s set up your profile</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && "Basic Information"}
              {step === 2 && "Your Health Journey"}
              {step === 3 && "What You’re Looking For"}
            </CardTitle>
            <CardDescription>Step {step} of 3</CardDescription>
          </CardHeader>

          <CardContent>
            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label>Username</Label>
                  <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div>
                  <Label>Display Name</Label>
                  <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Age</Label>
                    <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                  </div>

                  <div>
                    <Label>Location</Label>
                    <Input value={location} onChange={(e) => setLocation(e.target.value)} />
                  </div>
                </div>

                <div>
                  <Label>Bio</Label>
                  <Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
                </div>

                <Button
                  className="w-full"
                  onClick={() => setStep(2)}
                  disabled={!username || !displayName || !age}
                >
                  Continue
                </Button>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Select health experiences you’re comfortable sharing.
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {healthCategories.map((c) => (
                    <div key={c.value} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedHealthCategories.includes(c.value)}
                        onCheckedChange={() => toggleHealthCategory(c.value)}
                      />
                      <Label className="font-normal">{c.label}</Label>
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-2 rounded border p-4">
                  <Checkbox
                    checked={showHealthPublicly}
                    onCheckedChange={(v) => setShowHealthPublicly(v as boolean)}
                  />
                  <Label className="font-normal">Show on public profile</Label>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(1)} className="w-full">
                    Back
                  </Button>
                  <Button
                    className="w-full"
                    onClick={() => setStep(3)}
                    disabled={!selectedHealthCategories.length}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-4">
                {lookingForOptions.map((o) => (
                  <div key={o.value} className="flex items-center space-x-2">
                    <Checkbox
                      checked={lookingFor.includes(o.value)}
                      onCheckedChange={() => toggleLookingFor(o.value)}
                    />
                    <Label className="font-normal">{o.label}</Label>
                  </div>
                ))}

                {error && <p className="text-sm text-destructive">{error}</p>}

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(2)} className="w-full">
                    Back
                  </Button>
                  <Button className="w-full" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Creating profile..." : "Complete Setup"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
