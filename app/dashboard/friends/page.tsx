"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Share2 } from "lucide-react"
import { CopyButton } from "@/components/ui/copy-button";

const suggestedFriends = [
  { name: "Jane Smith", description: "Product Designer in San Francisco" },
  { name: "John Doe", description: "Software Engineer in New York" },
  { name: "Jack Smith", status: "Pending", sentDate: "3 days ago" },
  { name: "Emma Johnson", status: "Pending", sentDate: "1 day ago" },
  { name: "Chris Brown", status: "Pending", sentDate: "5 days ago" },
];

export default function Friends() {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter the suggested friends based on the search query
  const filteredSuggestions = suggestedFriends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <CopyButton />
        </div>
        <Input
          placeholder="Find people"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <section className="mt-5">
          <h2 className="text-lg font-semibold mb-2">Your Friends</h2>
          <ul className="mb-6">
            {filteredSuggestions.map((friend, index) => (
              <li
                key={index}
                className="flex justify-between items-center mb-3"
              >
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <p>{friend.name}</p>
                    <p>{friend.description}</p>
                  </div>
                </div>
                <Button variant="gooeyLeft">Remove</Button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
