import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Users, ShoppingCart, Truck, Package, Settings } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("customer");

  const roles = [
    { id: "admin", label: "Admin", icon: ShieldCheck, color: "bg-gradient-primary", route: "/admin" },
    { id: "staff", label: "Staff", icon: Users, color: "bg-gradient-secondary", route: "/staff" },
    { id: "customer", label: "Customer", icon: ShoppingCart, color: "bg-gradient-primary", route: "/customer" },
    { id: "delivery", label: "Delivery", icon: Truck, color: "bg-gradient-secondary", route: "/delivery" },
    { id: "supplier", label: "Supplier", icon: Package, color: "bg-gradient-primary", route: "/supplier" },
    { id: "sysadmin", label: "System Admin", icon: Settings, color: "bg-muted-foreground", route: "/system-admin" },
  ];

  const handleSignIn = () => {
    const selectedRoleData = roles.find(role => role.id === selectedRole);
    if (selectedRoleData) {
      navigate(selectedRoleData.route);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-custom-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Pharmacy Management System</CardTitle>
          <CardDescription>Sign in RS to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In RS</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Role</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {roles.map((role) => (
                      <button
                        key={role.id}
                        onClick={() => setSelectedRole(role.id)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedRole === role.id
                            ? "border-primary shadow-custom-md"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <role.icon className={`h-5 w-5 mx-auto mb-1 ${
                          selectedRole === role.id ? "text-primary" : "text-muted-foreground"
                        }`} />
                        <span className="text-xs text-foreground">{role.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>

                <Button className="w-full bg-gradient-primary" onClick={handleSignIn}>
                  Sign In RS as {roles.find(r => r.id === selectedRole)?.label}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  <a href="#" className="text-primary hover:underline">Forgot password?</a>
                </p>
              </div>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input id="signup-name" placeholder="John Doe" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" type="email" placeholder="you@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" type="password" placeholder="••••••••" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm">Confirm Password</Label>
                  <Input id="signup-confirm" type="password" placeholder="••••••••" />
                </div>

                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {roles.filter(role => ['customer', 'supplier'].includes(role.id)).map((role) => (
                      <button
                        key={role.id}
                        onClick={() => setSelectedRole(role.id)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedRole === role.id
                            ? "border-primary shadow-custom-md"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <role.icon className={`h-4 w-4 mx-auto mb-1 ${
                          selectedRole === role.id ? "text-primary" : "text-muted-foreground"
                        }`} />
                        <span className="text-xs text-foreground">{role.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-secondary">
                  Create Account
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Demo Mode:</strong> Authentication will be enabled when connected to Lovable Cloud
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
