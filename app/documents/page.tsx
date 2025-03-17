"use client"

import { motion } from "framer-motion"
import { FileText, Folder, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const documents = [
  {
    title: "Project Proposal",
    type: "PDF",
    size: "2.4 MB",
    modified: "2024-03-20",
  },
  {
    title: "Financial Report Q1",
    type: "XLSX",
    size: "1.8 MB",
    modified: "2024-03-18",
  },
  {
    title: "Meeting Notes",
    type: "DOC",
    size: "542 KB",
    modified: "2024-03-15",
  },
  {
    title: "Marketing Strategy",
    type: "PDF",
    size: "3.1 MB",
    modified: "2024-03-12",
  },
]

export default function DocumentsPage() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <div className="border-b">
          <div className="flex h-16 items-center px-4 md:px-6">
            <div className="ml-auto flex items-center space-x-4">
              <form className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search documents..."
                    className="w-full min-w-[300px] pl-8"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <main className="p-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Documents</h1>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {documents.map((doc, index) => (
                <Card key={index} className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-base font-medium">
                      {doc.title}
                    </CardTitle>
                    <div className="rounded-full bg-secondary p-2.5">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Type:</span>
                        <span className="font-medium text-foreground">{doc.type}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Size:</span>
                        <span className="font-medium text-foreground">{doc.size}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Modified:</span>
                        <span className="font-medium text-foreground">{doc.modified}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}