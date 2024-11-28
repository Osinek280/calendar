"use client";

import { getFriendRequest, addFriend } from "@/utils/actions/add-friend";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

interface Friend {
  profile_image_url: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface FriendsProps {
  params: Promise<{ slug: string }>;
}

export default function Friends({ params }: FriendsProps) {
  const { user } = useUser();

  const [friend, setFriend] = useState<Friend | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const updateFriend = async () => {
      try {
        const { slug } = await params;
        if (user?.id === slug) {
          setError(true);
          return;
        }

        const data = await getFriendRequest(slug);
        if (data?.friend) {
          console.log(data?.friend)
          setFriend(data.friend);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching friend request:", err);
        setError(true);
      }
    };

    updateFriend();
  }, [params, user?.id]);

  async function onSubmit() {
    try {
      const { slug } = await params;
      const response = await addFriend(slug);
  
      if (response.success) {
        toast.success("Friend added successfully!");
      } else {
        toast.error("You are already friend with");
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
      console.error("Error adding friend:", err);
    }
  }  

  if (error) {
    return (
      <div className="flex w-full items-center justify-center">
        <Card className="max-w-7xl w-full">
          <CardHeader>
            <CardTitle>Invalid URL</CardTitle>
            <CardDescription>
              The provided invitation link is invalid or the user does not exist.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex w-full gap-4 items-center justify-center">
      <Card className="max-w-7xl w-full">
        <CardHeader>
          <CardTitle>Friend URL</CardTitle>
          <CardDescription>
            Add this person to your friends list?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage
                src={friend?.profile_image_url || ""}
                alt={`${friend?.first_name || "User"}'s Profile`}
              />
            </Avatar>
            <div>
              <p className="font-medium">
                {`${friend?.first_name || ""} ${friend?.last_name || ""}`}
              </p>
              <p className="text-sm text-gray-400">{friend?.email || ""}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onSubmit}>Add Friend</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
