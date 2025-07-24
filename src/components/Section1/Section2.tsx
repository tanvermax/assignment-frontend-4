import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { Mail, Send, BookOpenCheck } from "lucide-react";

interface NewsletterFormData {
  email: string;
  agreeToPrivacy: boolean;
}

export function NewsletterSignup(): React.JSX.Element {
  const [formData, setFormData] = useState<NewsletterFormData>({
    email: '',
    agreeToPrivacy: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-background dark:bg-gray-950 border rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-blue-600 p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-background rounded-full mb-4">
              <BookOpenCheck className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-white">Stay in Touch with Our Updates</h2>
            <p className="mt-2 text-primary-foreground/90">
              Get the latest book releases, events, and exclusive offers
            </p>
          </div>

          {/* Form */}
          <div className="p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-lg flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Enter Your Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  className="h-14 text-base px-5"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="privacy"
                  name="agreeToPrivacy"
                  checked={formData.agreeToPrivacy}
                  onCheckedChange={(checked: boolean) => 
                    setFormData(prev => ({ ...prev, agreeToPrivacy: checked }))
                  }
                  required
                />
                <Label htmlFor="privacy" className="text-sm leading-none">
                  I agree to the <a href="#" className="underline hover:text-primary">Privacy Policy</a>
                </Label>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full h-14 text-lg gap-2 shadow-lg hover:shadow-primary/30"
                  disabled={!formData.email || !formData.agreeToPrivacy}
                >
                  Get In Touch
                  <Send className="w-5 h-5" />
                </Button>
              </motion.div>
            </form>

            {/* Social Proof */}
            <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/150?img=${i}`}
                      alt="Subscriber"
                      className="w-8 h-8 rounded-full border-2 border-background"
                      loading="lazy"
                    />
                  ))}
                </div>
                <span>Join 5k+ subscribers</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-500">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <span>Trusted by book lovers worldwide</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}