import { Button } from "@/components/ui/button";
import Logo from "../../public/logo.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="" className="w-10 h-10" />
          <span className="text-xl font-semibold text-foreground">GeoShield</span>
        </div>
        <div className="flex items-center gap-8">
          <a href="#about" className="text-sm text-foreground hover:text-primary transition-colors">
            About us
          </a>
          <a href="#services" className="text-sm text-foreground hover:text-primary transition-colors">
            Services
          </a>
          <a href="#how-it-works" className="text-sm text-foreground hover:text-primary transition-colors">
            How it Works
          </a>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6">
            Contact us
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
