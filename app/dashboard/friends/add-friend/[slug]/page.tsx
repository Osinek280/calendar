import { actionTemplate, addFriend } from "@/utils/actions/action-template";
import { currentUser } from "@clerk/nextjs/server"
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
} from "@/components/ui/card"


export default async function Friends({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const user = await currentUser()
  const slug = (await params).slug
  const { friend, error } = await actionTemplate(slug)

  if(user?.id === slug) {
    return (
      <>its your request url</>
    )
  }

  if (error) {
    return (
      <div className="flex w-full items-center justify-center">
        <Card className="max-w-7xl w-full">
          <CardHeader>
            <CardTitle>Invalid URL</CardTitle>
            <CardDescription>The provided invitation link is invalid or the user does not exist.</CardDescription>
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
        <CardDescription>Add this person to your friends list?</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={friend?.profile_image_url} alt="User Profile" />
          </Avatar>
          <div>
            <p className="font-medium">{`${friend.first_name} ${friend.last_name}`}</p>
            <p className="text-sm text-gray-400">{friend.email}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={async () => {
          "use server"
          addFriend(user!?.id, slug)
        }}>
          Add Friend
        </Button>
      </CardFooter>
    </Card>
    </div>
  );
}