"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

const FormSchema = z.object({
  subject: z.string(),
  text: z.string(),
  to: z.string().email("Please enter a valid email"),
});

export default function CreateNewMessage() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      subject: "",
      text: "",
      to: "",
    },
  });

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await getSession();
        setSession(sessionData);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();
  }, []);

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      setIsPending(true);
      const payload = {
        ...values,
      };

      const response = await fetch('/api/mess/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data: { error?: string; success?: string; feedback?: string } = await response.json();

      if (data.error) {
        toast.error(data.error);
        setIsPending(false);
        form.reset();
        return;
      }

      if (data.success) {
        toast.success(data?.feedback);
        setIsPending(false);
        form.reset();
        router.push("/messages");
        return;
      }
    } catch (error: any) {
      toast.error(error.message);
      setIsPending(false);
      form.reset();
    } finally {
      setIsPending(false);
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <div className="p-1.5 flex flex-row justify-between items-center">
        <h2 className="text-xl font-bold pl-2">Create Message</h2>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full p-4 pt-2 gap-1 flex flex-col w-full"
      >
        <FormField
          control={form.control}
          name="to"
          render={({ field }) => (
            <FormItem>
              <FormLabel>To:</FormLabel>
              <FormControl>
                <Input type="email" placeholder="John@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject:</FormLabel>
              <FormControl>
                <Input placeholder="What's This Email is About?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What You want to write"
                  className="resize-none h-[30vh] "
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit" className="w-full">
          {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Sending..." : "Send Mail"}
        </Button>
      </form>
    </Form>
  );
}
