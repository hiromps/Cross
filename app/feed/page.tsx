"use client"

import { motion } from "framer-motion"
import { 
  Heart, 
  MessageCircle, 
  Repeat2, 
  Share, 
  MoreHorizontal, 
  Image as ImageIcon, 
  X, 
  Send, 
  Search, 
  Users, 
  MapPin, 
  Link as LinkIcon, 
  Calendar,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  Mail
} from "lucide-react"
import { useState, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const users = [
  {
    id: 1,
    name: "Sarah Wilson",
    handle: "@sarahwilson",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    bio: "Product Designer | UI/UX Enthusiast",
    location: "San Francisco, CA",
    website: "https://sarahwilson.design",
    joinDate: "January 2022",
    followers: 1234,
    following: 567,
    isFollowing: false
  },
  {
    id: 2,
    name: "Alex Thompson",
    handle: "@alexdev",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
    bio: "Frontend Developer | React & TypeScript",
    location: "New York, NY",
    website: "https://alexdev.tech",
    joinDate: "March 2021",
    followers: 892,
    following: 345,
    isFollowing: false
  },
  {
    id: 3,
    name: "Emily Chen",
    handle: "@emilyc",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    bio: "Software Engineer | Open Source Contributor",
    location: "Seattle, WA",
    website: "https://emilychen.dev",
    joinDate: "June 2021",
    followers: 2341,
    following: 789,
    isFollowing: false
  },
  {
    id: 4,
    name: "David Kim",
    handle: "@davidk",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&h=400&fit=crop",
    bio: "Tech Lead | Cloud Architecture",
    location: "Austin, TX",
    website: "https://davidkim.io",
    joinDate: "April 2022",
    followers: 1567,
    following: 432,
    isFollowing: false
  },
  {
    id: 5,
    name: "Lisa Brown",
    handle: "@lisab",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    bio: "UX Researcher | Design Systems",
    location: "London, UK",
    website: "https://lisabrown.me",
    joinDate: "September 2021",
    followers: 987,
    following: 654,
    isFollowing: false
  }
]

const initialPosts: Array<{
  id: number;
  author: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  images: string[];
  timestamp: string;
  stats: {
    likes: number;
    reposts: number;
    comments: number;
  };
  isLiked: boolean;
  isReposted: boolean;
  comments: Array<{
    id: number;
    author: {
      name: string;
      handle: string;
      avatar: string;
    };
    content: string;
    timestamp: string;
  }>;
  showComments: boolean;
}> = [
  {
    id: 1,
    author: {
      name: "Sarah Wilson",
      handle: "@sarahwilson",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
    },
    content: "Just deployed a new feature to production! 🚀 #coding #webdev",
    images: [],
    timestamp: "2h ago",
    stats: {
      likes: 24,
      reposts: 5,
      comments: 3
    },
    isLiked: false,
    isReposted: false,
    comments: [
      {
        id: 1,
        author: {
          name: "Alex Thompson",
          handle: "@alexdev",
          avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop"
        },
        content: "Great work! The new features look amazing 🎉",
        timestamp: "1h ago"
      },
      {
        id: 2,
        author: {
          name: "Emily Chen",
          handle: "@emilyc",
          avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop"
        },
        content: "Can't wait to try it out!",
        timestamp: "30m ago"
      }
    ],
    showComments: false
  },
  {
    id: 2,
    author: {
      name: "Alex Thompson",
      handle: "@alexdev",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop"
    },
    content: "Working on some new UI components using Tailwind CSS and Framer Motion. The animations are looking smooth! ✨",
    images: ["https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop"],
    timestamp: "4h ago",
    stats: {
      likes: 42,
      reposts: 8,
      comments: 6
    },
    isLiked: false,
    isReposted: false,
    comments: [],
    showComments: false
  },
  {
    id: 3,
    author: {
      name: "Emily Chen",
      handle: "@emilyc",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop"
    },
    content: "Just published my first blog post about modern web development practices! Check it out at my website. Would love to hear your thoughts! 📝",
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop"
    ],
    timestamp: "6h ago",
    stats: {
      likes: 56,
      reposts: 12,
      comments: 8
    },
    isLiked: false,
    isReposted: false,
    comments: [],
    showComments: false
  }
]

export default function FeedPage() {
  const [newPost, setNewPost] = useState("")
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [posts, setPosts] = useState(initialPosts)
  const [newComments, setNewComments] = useState<Record<number, string>>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null)
  const [localUsers, setLocalUsers] = useState(users)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const filteredUsers = localUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.bio.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedImages([...selectedImages, ...files]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previewImages[index]);
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
    setPreviewImages(previewImages.filter((_, i) => i !== index));
  };

  const handlePost = () => {
    const newPostObj = {
      id: posts.length + 1,
      author: {
        name: "Sarah Wilson",
        handle: "@sarahwilson",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
      },
      content: newPost,
      images: previewImages,
      timestamp: "Just now",
      stats: {
        likes: 0,
        reposts: 0,
        comments: 0
      },
      isLiked: false,
      isReposted: false,
      comments: [],
      showComments: false
    }

    setPosts([newPostObj, ...posts])
    setNewPost("")
    setSelectedImages([])
    setPreviewImages([])
    toast.success("Post created successfully!")
  }

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newIsLiked = !post.isLiked
        return {
          ...post,
          isLiked: newIsLiked,
          stats: {
            ...post.stats,
            likes: post.stats.likes + (newIsLiked ? 1 : -1)
          }
        }
      }
      return post
    }))
  }

  const handleRepost = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newIsReposted = !post.isReposted
        return {
          ...post,
          isReposted: newIsReposted,
          stats: {
            ...post.stats,
            reposts: post.stats.reposts + (newIsReposted ? 1 : -1)
          }
        }
      }
      return post
    }))
  }

  const toggleComments = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          showComments: !post.showComments
        }
      }
      return post
    }))
  }

  const handleNewComment = (postId: number) => {
    const commentContent = newComments[postId];
    if (!commentContent?.trim()) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: post.comments.length + 1,
          author: {
            name: "Sarah Wilson",
            handle: "@sarahwilson",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
          },
          content: commentContent,
          timestamp: "Just now"
        };
        return {
          ...post,
          comments: [...post.comments, newComment],
          stats: {
            ...post.stats,
            comments: post.stats.comments + 1
          }
        };
      }
      return post;
    }));

    setNewComments({ ...newComments, [postId]: "" });
    toast.success("Comment added successfully!");
  };

  const handleShare = (post: { id: number; author: { name: string; }; content: string; }) => {
    if (typeof window === 'undefined') return null;

    const shareUrl = `${window.location.origin}/post/${post.id}`;

    const shareData = {
      title: `Post by ${post.author.name}`,
      text: post.content,
      url: shareUrl
    };

    const handleCopyLink = async () => {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
      } catch (err) {
        toast.error("Failed to copy link");
      }
    };

    const handleEmailShare = () => {
      const subject = encodeURIComponent(`Check out this post by ${post.author.name}`);
      const body = encodeURIComponent(`${post.content}\n\nView post: ${shareUrl}`);
      window.open(`mailto:?subject=${subject}&body=${body}`);
      toast.success("Opening email client...");
    };

    const handleSocialShare = (platform: 'twitter' | 'facebook' | 'linkedin') => {
      let shareUrl = '';
      switch (platform) {
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.content)}&url=${encodeURIComponent(shareUrl)}`;
          break;
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
          break;
      }
      window.open(shareUrl, '_blank', 'width=600,height=400');
      toast.success(`Sharing on ${platform}...`);
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <Share className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
            <Copy className="mr-2 h-4 w-4" />
            Copy link
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleEmailShare} className="cursor-pointer">
            <Mail className="mr-2 h-4 w-4" />
            Share via email
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSocialShare('twitter')} className="cursor-pointer">
            <Twitter className="mr-2 h-4 w-4" />
            Share on Twitter
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSocialShare('facebook')} className="cursor-pointer">
            <Facebook className="mr-2 h-4 w-4" />
            Share on Facebook
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSocialShare('linkedin')} className="cursor-pointer">
            <Linkedin className="mr-2 h-4 w-4" />
            Share on LinkedIn
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const handleFollowUser = (userId: number) => {
    setLocalUsers(localUsers.map(user => {
      if (user.id === userId) {
        const newIsFollowing = !user.isFollowing
        return {
          ...user,
          isFollowing: newIsFollowing,
          followers: user.followers + (newIsFollowing ? 1 : -1)
        }
      }
      return user
    }))
    toast.success(`${selectedUser?.isFollowing ? 'Unfollowed' : 'Followed'} successfully!`)
  }

  const handleUserClick = (user: { id: number; } | undefined) => {
    if (!user) return;
    const foundUser = localUsers.find(u => u.id === user.id);
    setSelectedUser(foundUser || null);
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <div className="border-b">
          <div className="flex h-16 items-center px-4 md:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  <Users className="h-4 w-4 mr-2" />
                  Find Users
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle>Find Users</SheetTitle>
                  <SheetDescription>
                    Search for users by name, handle, or bio
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-4 space-y-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="space-y-4">
                    {filteredUsers.map((user) => (
                      <Card key={user.id} className="cursor-pointer" onClick={() => handleUserClick(user)}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div className="flex gap-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{user.name}</h3>
                                <p className="text-sm text-muted-foreground">{user.handle}</p>
                                <p className="text-sm mt-1">{user.bio}</p>
                                <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                                  <span>{user.followers} followers</span>
                                  <span>{user.following} following</span>
                                </div>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant={user.isFollowing ? "outline" : "default"}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleFollowUser(user.id)
                              }}
                            >
                              {user.isFollowing ? 'Following' : 'Follow'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <main className="container max-w-2xl mx-auto py-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop" />
                    <AvatarFallback>SW</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    <Textarea 
                      placeholder="What's happening?" 
                      className="resize-none"
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                    />
                    {previewImages.length > 0 && (
                      <div className="grid grid-cols-2 gap-2">
                        {previewImages.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="rounded-lg w-full h-48 object-cover"
                            />
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageSelect}
                      />
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                      <Button 
                        onClick={handlePost}
                        disabled={!newPost.trim() && selectedImages.length === 0}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader className="pt-6">
                    <div className="flex justify-between">
                      <div 
                        className="flex gap-3 cursor-pointer" 
                        onClick={() => handleUserClick(users.find(u => u.handle === post.author.handle))}
                      >
                        <Avatar>
                          <AvatarImage src={post.author.avatar} />
                          <AvatarFallback>
                            {post.author.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{post.author.name}</div>
                          <div className="text-sm text-muted-foreground">{post.author.handle}</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base mb-4">{post.content}</p>
                    {post.images.length > 0 && (
                      <div className={`grid gap-2 mb-4 ${post.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                        {post.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Post image ${index + 1}`}
                            className="rounded-lg w-full h-48 object-cover"
                          />
                        ))}
                      </div>
                    )}
                    <div className="flex justify-between items-center text-muted-foreground text-sm">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-2"
                        onClick={() => toggleComments(post.id)}
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.stats.comments}</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`gap-2 ${post.isReposted ? 'text-green-500' : ''}`}
                        onClick={() => handleRepost(post.id)}
                      >
                        <Repeat2 className="h-4 w-4" />
                        <span>{post.stats.reposts}</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`gap-2 ${post.isLiked ? 'text-red-500' : ''}`}
                        onClick={() => handleLike(post.id)}
                      >
                        <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                        <span>{post.stats.likes}</span>
                      </Button>
                      {handleShare(post)}
                    </div>

                    {post.showComments && (
                      <div className="mt-4 space-y-4">
                        <Separator />
                        <div className="flex gap-4">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop" />
                            <AvatarFallback>SW</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <Textarea
                              placeholder="Write a comment..."
                              className="resize-none"
                              value={newComments[post.id] || ""}
                              onChange={(e) => setNewComments({
                                ...newComments,
                                [post.id]: e.target.value
                              })}
                            />
                            <Button
                              size="sm"
                              onClick={() => handleNewComment(post.id)}
                              disabled={!newComments[post.id]?.trim()}
                            >
                              Comment
                            </Button>
                          </div>
                        </div>

                        {post.comments.map((comment) => (
                          <div key={comment.id} className="flex gap-4">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={comment.author.avatar} />
                              <AvatarFallback>
                                {comment.author.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">{comment.author.name}</span>
                                <span className="text-sm text-muted-foreground">{comment.author.handle}</span>
                                <span className="text-sm text-muted-foreground">·</span>
                                <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
                              </div>
                              <p className="mt-1">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>

      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Profile</DialogTitle>
            <DialogDescription>
              View user profile and details
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="mt-4 space-y-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedUser.avatar} />
                  <AvatarFallback>
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{selectedUser.name}</h2>
                  <p className="text-sm text-muted-foreground">{selectedUser.handle}</p>
                  <p className="mt-2">{selectedUser.bio}</p>
                </div>
              </div>

              <div className="flex gap-6 text-sm">
                <div>
                  <span className="font-bold">{selectedUser.followers}</span>
                  <span className="text-muted-foreground ml-1">Followers</span>
                </div>
                <div>
                  <span className="font-bold">{selectedUser.following}</span>
                  <span className="text-muted-foreground ml-1">Following</span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedUser.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4 text-muted-foreground" />
                  <a href={selectedUser.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {selectedUser.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {selectedUser.joinDate}</span>
                </div>
              </div>

              <Button 
                className="w-full"
                variant={selectedUser.isFollowing ? "outline" : "default"}
                onClick={() => handleFollowUser(selectedUser.id)}
              >
                {selectedUser.isFollowing ? 'Following' : 'Follow'}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}