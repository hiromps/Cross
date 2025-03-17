import { Header } from "@/components/dashboard/header"
import { Overview } from "@/components/dashboard/overview"
import { Sidebar } from "@/components/dashboard/sidebar"

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <Overview />
        </main>
      </div>
    </div>
  )
}