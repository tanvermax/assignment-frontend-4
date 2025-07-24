import { GiSpellBook } from "react-icons/gi";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-2xl font-bold hover:text-primary transition-colors"
          >
            <GiSpellBook className="text-3xl" />
            <span>BookSelf</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              <NavLink to="/book">Books</NavLink>
              <NavLink to="/borrow">Borrow</NavLink>
              <NavLink to="/publications">Publications</NavLink>
              <NavLink to="/authors">Authors</NavLink>
            </div>
            <Button variant="outline" className="ml-4">
              LOG IN
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-foreground hover:bg-accent"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <MobileNavLink to="/book" onClick={() => setMobileMenuOpen(false)}>
              Books
            </MobileNavLink>
            <MobileNavLink to="/borrow" onClick={() => setMobileMenuOpen(false)}>
              Borrow
            </MobileNavLink>
            <MobileNavLink to="/publications" onClick={() => setMobileMenuOpen(false)}>
              Publications
            </MobileNavLink>
            <MobileNavLink to="/authors" onClick={() => setMobileMenuOpen(false)}>
              Authors
            </MobileNavLink>
            <Button variant="outline" className="w-full mt-2">
              LOG IN
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

// Reusable styled NavLink component
const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="text-sm font-medium text-foreground/90 hover:text-primary transition-colors relative group"
  >
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
  </Link>
);

// Mobile-specific NavLink
const MobileNavLink = ({ 
  to, 
  children,
  onClick 
}: { 
  to: string; 
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent transition-colors"
  >
    {children}
  </Link>
);

export default Navbar;