import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {

    
  return (
    <footer className="bg-muted px-6 py-10 mt-12 text-muted-foreground">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div>
          <h2 className="text-lg font-semibold text-primary mb-2">BookNest</h2>
          <p className="text-sm">Your favorite place to explore, read, and borrow books.</p>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/books" className="hover:underline">Browse Books</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-2">Legal</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:underline">Terms & Conditions</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-2">Connect With Us</h3>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook">
              <Facebook className="h-5 w-5 hover:text-primary" />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5 hover:text-primary" />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram className="h-5 w-5 hover:text-primary" />
            </a>
            <a href="mailto:support@booknest.com" aria-label="Email">
              <Mail className="h-5 w-5 hover:text-primary" />
            </a>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} BookNest. All rights reserved.
      </div>
    </footer>
  );
}
