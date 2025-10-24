import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Users, User } from "lucide-react"

interface NavigationBarProps {
  currentPage: "matches" | "messages" | "community" | "profile"
}

export function NavigationBar({ currentPage }: NavigationBarProps) {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/matches" className="text-xl font-semibold">
          <Heart className="inline h-6 w-6 text-primary" /> Relationscript
        </Link>

        <nav className="flex items-center gap-2">
          <Link href="/matches">
            <Button variant={currentPage === "matches" ? "default" : "ghost"} size="sm">
              <Heart className="mr-2 h-4 w-4" />
              Discover
            </Button>
          </Link>
          <Link href="/messages">
            <Button variant={currentPage === "messages" ? "default" : "ghost"} size="sm">
              <MessageCircle className="mr-2 h-4 w-4" />
              Messages
            </Button>
          </Link>
          <Link href="/community">
            <Button variant={currentPage === "community" ? "default" : "ghost"} size="sm">
              <Users className="mr-2 h-4 w-4" />
              Community
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant={currentPage === "profile" ? "default" : "ghost"} size="icon">
              <User className="h-4 w-4" />
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
