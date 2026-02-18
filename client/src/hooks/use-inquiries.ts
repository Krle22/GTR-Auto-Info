import { useMutation } from "@tanstack/react-query";
import { api, type InsertInquiry } from "@shared/schema"; // Assuming shared export matches schema
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// Define schema locally if not exported from shared/routes yet or use what's available
// Based on instructions, we use api contract. 
// However, typically api object is in @shared/routes. 
// We will assume the structure provided in the prompt.

const createInquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type InquiryFormValues = z.infer<typeof createInquirySchema>;

export function useCreateInquiry() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InquiryFormValues) => {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to submit inquiry");
      }

      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Inquiry Sent",
        description: "We'll get back to you shortly regarding your vehicle.",
        variant: "default", 
        className: "bg-primary text-primary-foreground border-none"
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
