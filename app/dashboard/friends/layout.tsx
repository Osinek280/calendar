import { ReactNode } from "react"

export default async function FriendsLayout({ children }: { children: ReactNode }) {
  return (
  <main className="flex flex-col gap-4 p-10 lg:gap-6">
    {children}
  </main>
  )
}