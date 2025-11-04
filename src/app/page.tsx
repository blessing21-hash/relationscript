// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }

















// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Heart, Users, Shield, MessageCircle } from "lucide-react"

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen">
//       {/* Header */}
//       <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container mx-auto flex h-16 items-center justify-between px-4">
//           <div className="flex items-center gap-2">
//             <Heart className="h-6 w-6 text-primary" />
//             <span className="text-xl font-semibold">Relationscript</span>
//           </div>
//           <nav className="flex items-center gap-4">
//             <Link href="/login">
//               <Button variant="ghost">Log In</Button>
//             </Link>
//             <Link href="/signup">
//               <Button>Sign Up</Button>
//             </Link>
//           </nav>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="container mx-auto px-4 py-20 md:py-32">
//         <div className="mx-auto max-w-3xl text-center">
//           <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
//             Connect Through <span className="text-primary">Understanding</span>
//           </h1>
//           <p className="mt-6 text-pretty text-lg text-muted-foreground md:text-xl">
//             In a world full of dating apps, we match based on something deeper. Find meaningful connections with people
//             who share your health journey and truly understand what you're going through.
//           </p>
//           <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
//             <Link href="/signup">
//               <Button size="lg" className="w-full sm:w-auto">
//                 Get Started
//               </Button>
//             </Link>
//             <Link href="#how-it-works">
//               <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
//                 Learn More
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="how-it-works" className="bg-muted/50 py-20">
//         <div className="container mx-auto px-4">
//           <div className="mx-auto max-w-2xl text-center">
//             <h2 className="text-balance text-3xl font-bold md:text-4xl">How Relationscript Works</h2>
//             <p className="mt-4 text-pretty text-muted-foreground">
//               We're creating a safe space where empathy comes first
//             </p>
//           </div>

//           <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-4">
//             <Card className="p-6">
//               <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
//                 <Heart className="h-6 w-6 text-primary" />
//               </div>
//               <h3 className="mb-2 font-semibold">Share Your Journey</h3>
//               <p className="text-sm text-muted-foreground">
//                 Choose what health experiences you're comfortable sharing, with full privacy control
//               </p>
//             </Card>

//             <Card className="p-6">
//               <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
//                 <Users className="h-6 w-6 text-primary" />
//               </div>
//               <h3 className="mb-2 font-semibold">Find Your Match</h3>
//               <p className="text-sm text-muted-foreground">
//                 Connect with people who share similar health journeys and truly understand
//               </p>
//             </Card>

//             <Card className="p-6">
//               <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
//                 <MessageCircle className="h-6 w-6 text-primary" />
//               </div>
//               <h3 className="mb-2 font-semibold">Build Connections</h3>
//               <p className="text-sm text-muted-foreground">
//                 Start meaningful conversations without having to over-explain or hide who you are
//               </p>
//             </Card>

//             <Card className="p-6">
//               <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
//                 <Shield className="h-6 w-6 text-primary" />
//               </div>
//               <h3 className="mb-2 font-semibold">Stay Safe</h3>
//               <p className="text-sm text-muted-foreground">
//                 Your privacy and safety are our top priority with robust moderation and controls
//               </p>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20">
//         <div className="container mx-auto px-4">
//           <div className="mx-auto max-w-2xl text-center">
//             <h2 className="text-balance text-3xl font-bold md:text-4xl">Ready to Find Your People?</h2>
//             <p className="mt-4 text-pretty text-muted-foreground">
//               Join a community where connection starts with understanding
//             </p>
//             <div className="mt-8">
//               <Link href="/signup">
//                 <Button size="lg">Create Your Account</Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="border-t border-border py-8">
//         <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
//           <p>&copy; 2025 Relationscript. Building connections through understanding.</p>
//         </div>
//       </footer>
//     </div>
//   )
// }




















"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, Users, Shield, MessageCircle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">Relationscript</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
            Connect Through <span className="text-primary">Understanding</span>
          </h1>
          <p className="mt-6 text-pretty text-lg text-muted-foreground md:text-xl">
            In a world full of dating apps, we match based on something deeper. Find meaningful connections with people
            who share your health journey and truly understand what you're going through.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold md:text-4xl">How Relationscript Works</h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              We're creating a safe space where empathy comes first
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Share Your Journey</h3>
              <p className="text-sm text-muted-foreground">
                Choose what health experiences you're comfortable sharing, with full privacy control
              </p>
            </Card>

            <Card className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Find Your Match</h3>
              <p className="text-sm text-muted-foreground">
                Connect with people who share similar health journeys and truly understand
              </p>
            </Card>

            <Card className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Build Connections</h3>
              <p className="text-sm text-muted-foreground">
                Start meaningful conversations without having to over-explain or hide who you are
              </p>
            </Card>

            <Card className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Stay Safe</h3>
              <p className="text-sm text-muted-foreground">
                Your privacy and safety are our top priority with robust moderation and controls
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold md:text-4xl">Ready to Find Your People?</h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Join a community where connection starts with understanding
            </p>
            <div className="mt-8">
              <Link href="/signup">
                <Button size="lg">Create Your Account</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Relationscript. Building connections through understanding.</p>
        </div>
      </footer>
    </div>
  )
}
