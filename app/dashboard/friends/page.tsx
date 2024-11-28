"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { CopyButton } from "@/components/ui/copy-button"
import { getFriends } from "@/utils/actions/get-friends"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Users } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Friends() {
  const { user } = useUser()
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [friendsList, setFriendsList] = useState<{
    nickname: string
    color: string
    user: {
      user_id: string
      profile_image_url: string
      first_name: string
      last_name: string
      email: string
    }
  }[]>([])

  useEffect(() => {
    const updateFriendsList = async () => {
      try {
        const data = await getFriends()
        setIsLoading(false)
        setFriendsList(data.friends)
      } catch(err) {
        console.log(err)
      }
    }

    updateFriendsList()
  }, [])

  const filteredFriends = friendsList.filter(friend =>
    friend.user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex w-full gap-4">
      {/* Left section */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex w-full items-center justify-between bg-muted p-4 rounded-lg ">    
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={user?.imageUrl} alt="User Profile" />
            </Avatar>
            <div>
              <p className="font-medium">Send invite link</p>
              <p className="text-sm text-gray-400">get.howbout.app</p>
            </div>
          </div>
          <CopyButton value={`${process.env.NEXT_PUBLIC_FRONTEND_URL!}/dashboard/friends/add-friend/${user?.id}`} />
        </div>
        <Input
          placeholder="Find people"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <section className="mt-5">
          <h2 className="text-lg font-semibold mb-2">Your Friends</h2>
          <ScrollArea className="h-[400px] pr-4">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-4 w-[150px]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : friendsList.length > 0 ? (
              <ul className="space-y-4">
                {filteredFriends.map((friend, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg transition-colors hover:bg-muted"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage 
                          src={friend.user.profile_image_url} 
                          alt={`${friend.user.first_name} ${friend.user.last_name}`} 
                        />
                        <AvatarFallback style={{ backgroundColor: friend.color }}>
                          {friend.user.first_name[0]}
                          {friend.user.last_name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {friend.user.first_name} {friend.user.last_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {friend.user.email}
                        </p>
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => {console.log(friend.user.user_id)}}
                        >
                          Remove
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Remove Friend</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to remove {friend.user.first_name} {friend.user.last_name} from your friends list? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline">Cancel</Button>
                          <Button variant="destructive">Remove Friend</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium mb-1">No friends found</h3>
                <p className="text-sm text-muted-foreground">
                  {searchQuery 
                    ? "Try adjusting your search terms" 
                    : "Share your invite link to add friends"}
                </p>
              </div>
            )}
          </ScrollArea>
        </section>
      </div>
    </div>
  )
}

