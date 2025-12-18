"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Check if user has completed onboarding
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

      if (!profile) {
        router.push("/onboarding")
      } else {
        router.push("/matches")
      }
    } catch (err: any) {
      setError(err.message || "Failed to log in")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-2xl font-semibold">Relationscript</span>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Log in to continue your journey</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Log In"}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}









// import type React from "react"

// import { useState } from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Heart } from "lucide-react"
// import { getSupabaseBrowserClient } from "@/lib/supabase/client"

// export default function LoginPage() {
//   const [email, setEmail] = useState("testuser@example.com")     // Dummy email
//   const [password, setPassword] = useState("password123")        // Dummy password
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)
//   const router = useRouter()

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")
//     setLoading(true)

//     try {
//       const supabase = getSupabaseBrowserClient()
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       })

//       if (error) throw error

//       // Check if user has completed onboarding
//       const { data: profile } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("id", data.user.id)
//         .single()

//       if (!profile) {
//         router.push("/login")
//       } else {
//         router.push("/matches")
//       }
//     } catch (err: any) {
//       setError(err.message || "Failed to log in")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-muted/50 px-4">
//       <div className="w-full max-w-md">
//         <div className="mb-8 text-center">
//           <Link href="/" className="inline-flex items-center gap-2">
//             <Heart className="h-8 w-8 text-primary" />
//             <span className="text-2xl font-semibold">Relationscript</span>
//           </Link>
//         </div>

//         <Card>
//           <CardHeader>
//             <CardTitle>Welcome Back</CardTitle>
//             <CardDescription>Log in to continue your journey</CardDescription>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleLogin} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>

//               {error && <p className="text-sm text-destructive">{error}</p>}

//               <Button type="submit" className="w-full" disabled={loading}>
//                 {loading ? "Logging in..." : "Log In"}
//               </Button>
//             </form>

//             <div className="mt-4 text-center text-sm">
//               Don't have an account?{" "}
//               <Link href="/signup" className="text-primary hover:underline">
//                 Sign up
//               </Link>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }
