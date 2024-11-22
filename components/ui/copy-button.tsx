import * as React from "react"
import { Button, ButtonProps } from "@/components/ui/button"
import { CheckIcon, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

export function CopyButton({
  className,
  variant = "ghost",
  ...props
}: ButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  const handleClick = () => {
    setHasCopied(true)
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }

  return (
    <Button
      size="icon"
      variant={variant}
      className={cn(
        "relative z-10 h-8 w-8 hover:bg-zinc-700 [&_svg]:h-4 [&_svg]:w-4",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <CheckIcon color="hsl(0, 0%, 63%)" /> : <Copy color="hsl(0, 0%, 63%)" />}
    </Button>
  )
}