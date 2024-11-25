"use client"
import { useState } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ColorPicker } from "./color-picker"
import { auth } from "@clerk/nextjs/server"
import { useAuth } from "@clerk/nextjs"
import { addCalendar } from "@/utils/actions/add-calendar"

// Walidacja formularza za pomocą zod
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  color: z.string().min(1, "Color is required").regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format"),
  isPublic: z.boolean(),
});

export default function CalendarForm() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '', 
      color: '#aabbcc', // Domyślny kolor
      isPublic: false, // Domyślnie prywatny
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await addCalendar(values)
      if (isOpen) {
        form.reset();
      }
      toast.success("Calendar created successfully!");
      setIsOpen(false)
    }catch (err) {
      toast.error("Failed to create calendar");
      console.log(err)
    }
  }

  function handleOpenChange(open: boolean) {
    setIsOpen(open);
    if (!open) {
      form.reset();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Calendar</Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Create Calendar</DialogTitle>
          <DialogDescription>
            Add a new calendar by filling out the details below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-8 max-w-3xl mx-auto">

            {/* Pole Tytuł */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="My Calendar"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Provide a title for your calendar.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Pole Kolor */}
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <ColorPicker color={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>Choose a color to represent your calendar.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Pole Publiczny/Prywatny */}
            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Public</FormLabel>
                    <FormDescription>Make this calendar public or private.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" size="lg">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}