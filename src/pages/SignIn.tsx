import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Users, ShoppingCart, Truck, Package, Settings } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const roles = [
    { id: "admin", label: "Admin", icon: ShieldCheck, route: "/admin" },
    { id: "staff", label: "Staff", icon: Users, route: "/staff" },
    { id: "customer", label: "Customer", icon: ShoppingCart, route: "/customer" },
    { id: "delivery", label: "Delivery", icon: Truck, route: "/delivery" },
    { id: "supplier", label: "Supplier", icon: Package, route: "/supplier" },
    { id: "sysadmin", label: "System Admin", icon: Settings, route: "/system-admin" },
  ];

  const handleSignIn = () => {
    // Basic client-side validation (demo mode)
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    const role = roles.find(r => r.id === selectedRole);
    alert(`Signed in as ${role?.label} (demo). Redirecting...`);
    if (role) navigate(role.route);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-custom-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Role</Label>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${selectedRole === role.id ? 'border-primary shadow-custom-md' : 'border-border hover:border-primary/50'}`}>
                    <role.icon className={`h-5 w-5 mx-auto mb-1 ${selectedRole === role.id ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="text-xs text-foreground">{role.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <Button className="w-full bg-gradient-primary" onClick={handleSignIn}>
              Sign In as {roles.find(r => r.id === selectedRole)?.label}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              <a href="/auth" className="text-primary hover:underline">Use full Auth page</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
