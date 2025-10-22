import { User, Shield, Info, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileSidebar = ({ isOpen, onClose }: ProfileSidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-80 bg-background shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 space-y-8">
          {/* Profile Header */}
          <div className="flex items-center gap-4 pb-6 border-b">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Hello, Maju!</h3>
              <p className="text-sm text-muted-foreground">How can we help today?</p>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-left">
              <User className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground">Profile</span>
            </button>
            
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-left">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground">Permissions</span>
            </button>
            
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-left">
              <Info className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground">About us</span>
            </button>
          </nav>

          {/* Logout Button */}
          <div className="pt-6 border-t">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-5 h-5" />
              <span>Log out</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;
