import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: (email: string) => apiRequest("POST", "/api/newsletter/subscribe", { email }),
    onSuccess: () => {
      setEmail("");
      toast({
        title: "Successfully subscribed!",
        description: "Welcome to the TechScope community. Check your email for confirmation.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Subscription failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      subscribeMutation.mutate(email);
    }
  };

  return (
    <section className="gradient-bg py-16 mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Never Miss a Tech Breakthrough 📧
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Get personalized tech summaries delivered to your inbox. 
          Join 50,000+ developers, designers, and tech enthusiasts staying informed.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-3">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-4 focus:ring-white/30"
          />
          <Button 
            type="submit"
            disabled={subscribeMutation.isPending}
            className="bg-white text-primary px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
        
        <p className="text-white/70 text-sm mt-4">
          ✨ Free forever • 📧 Weekly digest • 🚫 No spam, ever
        </p>
      </div>
    </section>
  );
}
