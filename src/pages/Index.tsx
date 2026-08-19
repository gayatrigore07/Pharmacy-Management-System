import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShieldCheck, 
  Users, 
  ShoppingCart, 
  Truck, 
  Package, 
  Settings,
  Pill,
  BarChart3,
  FileText,
  Bell
} from "lucide-react";

const Index = () => {
  const modules = [
    {
      title: "Admin Dashboard",
      description: "Manage medicines, staff, inventory, and view analytics",
      icon: ShieldCheck,
      link: "/admin",
      gradient: "from-primary to-primary-dark",
    },
    {
      title: "Staff Portal",
      description: "Process billing, manage orders, and customer service",
      icon: Users,
      link: "/staff",
      gradient: "from-secondary to-accent",
    },
    {
      title: "Customer Portal",
      description: "Browse medicines, upload prescriptions, place orders",
      icon: ShoppingCart,
      link: "/customer",
      gradient: "from-primary-light to-primary",
    },
    {
      title: "Delivery Staff",
      description: "Manage deliveries, update status, view routes",
      icon: Truck,
      link: "/delivery",
      gradient: "from-accent to-secondary",
    },
    {
      title: "Supplier Portal",
      description: "View purchase orders, confirm deliveries, manage supply",
      icon: Package,
      link: "/supplier",
      gradient: "from-primary-dark to-primary",
    },
    {
      title: "System Admin",
      description: "Server management, security, backups, and monitoring",
      icon: Settings,
      link: "/system-admin",
      gradient: "from-muted-foreground to-foreground",
    },
  ];

  const features = [
    {
      icon: Pill,
      title: "Medicine Management",
      description: "Complete inventory control with expiry tracking"
    },
    {
      icon: BarChart3,
      title: "Sales Analytics",
      description: "Real-time reports and data visualization"
    },
    {
      icon: FileText,
      title: "Prescription Handling",
      description: "Upload, verify, and manage prescriptions digitally"
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Alerts for low stock, expiry, and order updates"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-custom-md">
              <Pill className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Pharmacy Management System</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Modern Healthcare
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Management Solution
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Streamline your pharmacy operations with our comprehensive management platform. 
              Secure, efficient, and user-friendly.
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="bg-gradient-primary shadow-custom-lg hover:shadow-custom-md transition-all" onClick={() => window.location.href = '/auth'}>
                Sign In RS
              </Button>
              <Button size="lg" variant="outline">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-border hover:shadow-custom-md transition-all">
                <CardContent className="pt-6">
                  <div className="bg-gradient-primary p-3 rounded-lg w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Six Powerful Modules
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Role-based access control for every user type in your pharmacy ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <Link key={index} to={module.link}>
                <Card className="h-full hover:shadow-custom-lg transition-all group cursor-pointer border-border">
                  <CardHeader>
                    <div className={`bg-gradient-to-br ${module.gradient} p-4 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform`}>
                      <module.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-foreground group-hover:text-primary transition-colors">
                      {module.title}
                    </CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-primary text-white border-0 shadow-custom-lg">
            <CardContent className="pt-12 pb-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Transform Your Pharmacy?
              </h2>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                Join hundreds of pharmacies using our platform to streamline operations, 
                improve customer service, and boost efficiency.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90" onClick={() => window.location.href = '/auth'}>
                  Sign In RS
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
