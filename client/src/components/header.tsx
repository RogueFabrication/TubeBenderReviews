import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Settings, Star, Calculator, BookOpen, Shield, MessageSquare } from "lucide-react";

export default function Header() {
  const [location] = useLocation();

  const navigation = [
    { name: "Reviews", href: "/#reviews", icon: Star },
    { name: "Compare", href: "/comparison", icon: Settings },
    { name: "Buyer's Guide", href: "/#guide", icon: BookOpen },
    { name: "Contact", href: "/contact", icon: MessageSquare },
  ];

  const NavLinks = ({ mobile = false }) => (
    <>
      {navigation.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`${
              mobile
                ? "flex items-center space-x-3 px-3 py-2 text-base font-medium rounded-lg hover:bg-gray-100"
                : "text-gray-700 hover:text-primary font-medium transition-colors flex items-center space-x-1"
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary flex items-center space-x-2">
              <Settings className="h-8 w-8 text-accent" />
              <span>TubeBenderReviews</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <NavLinks />
          </nav>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                <NavLinks mobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
