"use client"

import { motion } from "framer-motion"
import { 
  BarChart3, 
  Home, 
  Settings, 
  Users, 
  FileText, 
  Calendar, 
  MessageSquare, 
  HelpCircle,
  LayoutDashboard,
  User,
  Hash,
  ShoppingBag,
  LogOut
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const mainMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Hash, label: "Feed", href: "/feed" },
  { icon: ShoppingBag, label: "Marketplace", href: "/marketplace" },
  { icon: Users, label: "Users", href: "/users" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Calendar, label: "Calendar", href: "/calendar" },
  { icon: MessageSquare, label: "Messages", href: "/messages" },
]

const otherMenuItems = [
  { icon: FileText, label: "Documents", href: "/documents" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: HelpCircle, label: "Help Center", href: "/help" },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    // ログアウト処理
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAuthenticated')
    }
    router.push('/login')
  }

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="flex h-screen w-[240px] flex-col border-r bg-background"
    >
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <BarChart3 className="h-6 w-6" />
          <span className="text-lg">Dashboard</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 pt-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Main Menu
          </h2>
          <nav className="grid gap-1">
            {mainMenuItems.map((item) => (
              <Button
                key={item.href}
                asChild
                variant={pathname === item.href ? "secondary" : "ghost"}
                className="justify-start"
              >
                <Link href={item.href} className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </Button>
            ))}
          </nav>
        </div>
        <Separator className="my-4" />
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Other
          </h2>
          <nav className="grid gap-1">
            {otherMenuItems.map((item) => (
              <Button
                key={item.href}
                asChild
                variant={pathname === item.href ? "secondary" : "ghost"}
                className="justify-start"
              >
                <Link href={item.href} className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </Button>
            ))}
            <Button
              variant="ghost"
              className="justify-start text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-3" />
              <span>ログアウト</span>
            </Button>
          </nav>
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <Link href="/profile">
          <div className="flex items-center gap-3 rounded-lg bg-secondary p-3 hover:bg-secondary/80 transition-colors">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop" />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Sarah Wilson</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  )
}