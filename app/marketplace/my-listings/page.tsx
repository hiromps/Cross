"use client"

import { motion } from "framer-motion"
import { Edit, Trash2, Package, Tag, DollarSign, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Home & Garden",
  "Sports",
  "Photography",
  "Other"
]

const conditions = [
  { value: "new", label: "New" },
  { value: "like-new", label: "Used - Like New" },
  { value: "good", label: "Used - Good" },
  { value: "fair", label: "Used - Fair" }
]

type Listing = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  condition: string;
  category: string;
  active: boolean;
  views: number;
  likes: number;
};

export default function MyListingsPage() {
  const [myListings, setMyListings] = useState([
    {
      id: 1,
      title: "Mechanical Keyboard",
      price: 129.99,
      description: "Custom mechanical keyboard with RGB backlight",
      image: "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=400&h=300&fit=crop",
      condition: "New",
      category: "Electronics",
      active: true,
      views: 245,
      likes: 12
    },
    {
      id: 2,
      title: "Vintage Camera",
      price: 299.99,
      description: "Classic film camera in excellent condition",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
      condition: "Used - Like New",
      category: "Photography",
      active: true,
      views: 189,
      likes: 8
    }
  ])

  const [editingListing, setEditingListing] = useState<Listing | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleEdit = (listing: Listing) => {
    setEditingListing(listing)
    setIsEditDialogOpen(true)
  }

  const handleSave = () => {
    if (editingListing) {
      setMyListings(myListings.map(listing => 
        listing.id === editingListing.id ? editingListing : listing
      ))
    }
    setIsEditDialogOpen(false)
  }

  const handleDelete = (id: number) => {
    setMyListings(myListings.filter(listing => listing.id !== id))
  }

  const toggleActive = (id: number) => {
    setMyListings(myListings.map(listing =>
      listing.id === id ? { ...listing, active: !listing.active } : listing
    ))
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <div className="border-b">
          <div className="flex h-16 items-center px-4 md:px-6">
            <h1 className="text-2xl font-bold">My Listings</h1>
          </div>
        </div>
        <main className="p-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {myListings.map((listing) => (
                <Card key={listing.id} className={!listing.active ? "opacity-75" : ""}>
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-start">
                      <span className="text-xl">{listing.title}</span>
                      <span className="text-2xl font-bold">${listing.price}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{listing.description}</p>
                    <div className="flex gap-2 mb-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Tag className="h-4 w-4" />
                        <span>{listing.category}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Package className="h-4 w-4" />
                        <span>{listing.condition}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{listing.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{listing.likes}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`active-${listing.id}`} className="text-sm">Active</Label>
                        <Switch
                          id={`active-${listing.id}`}
                          checked={listing.active}
                          onCheckedChange={() => toggleActive(listing.id)}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleEdit(listing)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        className="flex-1"
                        onClick={() => handleDelete(listing.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </main>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Listing</DialogTitle>
            <DialogDescription>
              Make changes to your listing here.
            </DialogDescription>
          </DialogHeader>
          {editingListing && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editingListing.title}
                  onChange={(e) => setEditingListing({
                    ...editingListing,
                    title: e.target.value
                  })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <div className="relative">
                  <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="price"
                    type="number"
                    className="pl-8"
                    value={editingListing.price}
                    onChange={(e) => setEditingListing({
                      ...editingListing,
                      price: parseFloat(e.target.value)
                    })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={editingListing.category.toLowerCase()}
                  onValueChange={(value) => setEditingListing({
                    ...editingListing,
                    category: value
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="condition">Condition</Label>
                <Select
                  value={editingListing ? editingListing.condition.toLowerCase().replace(" - ", "-") : ""}
                  onValueChange={(value) => {
                    if (editingListing) {
                      setEditingListing({
                        ...editingListing,
                        condition: conditions.find(c => c.value === value)?.label || ""
                      });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((condition) => (
                      <SelectItem key={condition.value} value={condition.value}>
                        {condition.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingListing ? editingListing.description : ""}
                  onChange={(e) => {
                    if (editingListing) {
                      setEditingListing({
                        ...editingListing,
                        description: e.target.value
                      });
                    }
                  }}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}