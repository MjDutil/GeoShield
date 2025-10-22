import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, KeyRound } from "lucide-react";
import Header from "@/components/Header";
import ManImage from "../../public/image 3.png";


const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Static - no real registration yet
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Header />
      {/* Decorative background shapes - fixed position using percentages for better responsiveness */}
      <div
        className="
          absolute bg-accent rounded-full
          top-[10%] left-[25%] 
          w-[40vw] h-[40vw] max-w-[350px] max-h-[350px] min-w-[250px] min-h-[250px]
        "
      />

      <div
        className="
          absolute bg-accent rounded-full
          bottom-[10%] right-[5%] 
          w-[55vw] h-[55vw] max-w-[600px] max-h-[600px] min-w-[300px] min-h-[300px]
        "
      />

      <div
        className="
          absolute bg-accent rounded-full
          bottom-0 left-0 
          -translate-x-1/3 translate-y-1/3
          w-[35vw] h-[35vw] max-w-[300px] max-h-[300px] min-w-[250px] min-h-[250px]
        "
      />
      <div className="container h-screen mx-auto px-4 sm:px-6 pt-10 sm:pt-12 pb-10 sm:pb-14">
        <div className="h-full flex flex-col lg:flex-row lg:items-center gap-10 sm:gap-16 justify-center">
          {/* Form Section */}
          <div className="relative z-20 lg:w-[40%]">
            <div className="bg-background/40 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-md border border-white/10 mx-auto w-full">
              <h1 className="text-3xl text-center sm:text-4xl font-bold mb-6 sm:mb-8 text-foreground">Register</h1>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-4 pr-12 py-6 rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground"
                  />
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>

                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-4 pr-12 py-6 rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground"
                  />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>

                <div className="relative">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-4 pr-12 py-6 rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground"
                  />
                  <KeyRound className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>

                <div className="relative">
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="pl-4 pr-12 py-6 rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground"
                  />
                  <KeyRound className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>

                <Button 
                  type="submit"
                  className="w-full py-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base mt-6"
                >
                  Submit!
                </Button>
              </form>

              <p className="text-center mt-6 text-sm text-muted-foreground">
                Have an account?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Illustration Section */}
          <div className="relative z-10 hidden lg:block lg:w-[60%] order-first lg:order-last">
            {/* Responsive image container with positioned bubbles */}
            <div className="relative w-full h-[280px] sm:h-[350px] md:h-[420px] lg:h-[580px]">
                 {/* Weather bubble */}
              <div className="absolute bg-white rounded-full shadow-lg flex items-center px-4 py-2 text-sm left-0 bottom-[23%] z-20 max-w-[400px]">
                <span className="text-yellow-500 mr-2">☀️</span>
                Hoje o dia estará ensolarado na sua região
              </div>

              {/* Location bubble */}
              <div className="absolute bg-white rounded-full shadow-lg flex items-center px-4 py-2 text-sm left-0 bottom-[15%] z-20 max-w-[300px]">
                <span className="text-red-500 mr-2">📍</span>
                Buscando sua localização...
              </div>

              {/* Man image positioned to match reference */}
              <img
                src={ManImage}
                alt="Homem com chapéu olhando o celular"
                className="absolute object-contain h-[130%] w-auto max-w-none right-0 bottom-[-40%] sm:h-[140%] md:h-[150%] lg:h-[150%]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
