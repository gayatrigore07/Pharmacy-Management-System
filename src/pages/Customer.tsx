import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  ShoppingCart,
  Upload,
  Heart,
  Star,
  Filter,
  Pill,
  Package,
  Clock
} from "lucide-react";

const Customer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const categories = [
    "All Medicines",
    "Pain Relief",
    "Antibiotics",
    "Vitamins",
    "Gastric",
    "Cold & Flu",
    "Diabetes Care"
  ];

  const medicines = [
    {
      name: "Paracetamol 500mg",
      brand: "HealthCare Pharma",
      category: "Pain Relief",
      price: 12.99,
      rating: 4.5,
      inStock: true,
      prescription: false,
      image: "💊"
    },
    {
      name: "Amoxicillin 250mg",
      brand: "MedPlus",
      category: "Antibiotic",
      price: 24.50,
      rating: 4.8,
      inStock: true,
      prescription: true,
      image: "💊"
    },
    {
      name: "Vitamin D3 1000IU",
      brand: "NutriHealth",
      category: "Supplement",
      price: 15.99,
      rating: 4.6,
      inStock: true,
      prescription: false,
      image: "💊"
    },
    {
      name: "Omeprazole 20mg",
      brand: "GastroMed",
      category: "Gastric",
      price: 18.75,
      rating: 4.7,
      inStock: true,
      prescription: false,
      image: "💊"
    },
    {
      name: "Ibuprofen 400mg",
      brand: "PainAway",
      category: "Pain Relief",
      price: 10.50,
      rating: 4.4,
      inStock: false,
      prescription: false,
      image: "💊"
    },
    {
      name: "Metformin 500mg",
      brand: "DiabetCare",
      category: "Diabetes",
      price: 22.00,
      rating: 4.9,
      inStock: true,
      prescription: true,
      image: "💊"
    },
  ];

  const orderHistory = [
    { id: "ORD-001", date: "2025-10-10", items: 3, total: "$45.99", status: "Delivered" },
    { id: "ORD-002", date: "2025-09-28", items: 2, total: "$32.50", status: "Delivered" },
    { id: "ORD-003", date: "2025-09-15", items: 5, total: "$78.25", status: "Delivered" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-custom-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-foreground">MedStore</h1>
              <p className="text-sm text-muted-foreground">Your trusted online pharmacy</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload Prescription
              </Button>
              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="browse">Browse</TabsTrigger>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          </TabsList>

          {/* Browse Tab */}
          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex gap-4 flex-wrap">
              <div className="relative flex-1 min-w-[300px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search medicines by name, brand, or disease..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category, index) => (
                <Badge
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  className="cursor-pointer whitespace-nowrap"
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {medicines.map((medicine, index) => (
                <Card key={index} className="hover:shadow-custom-lg transition-all group">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="text-4xl mb-2">{medicine.image}</div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-lg">{medicine.name}</CardTitle>
                    <CardDescription>{medicine.brand}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {medicine.category}
                        </Badge>
                        {medicine.prescription && (
                          <Badge variant="secondary" className="text-xs">
                            Prescription Required
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-foreground">{medicine.rating}</span>
                        <span className="text-xs text-muted-foreground ml-1">(120 reviews)</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-foreground">${medicine.price}</span>
                        <span className="text-sm text-muted-foreground">per pack</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button 
                      className="flex-1 bg-gradient-primary"
                      disabled={!medicine.inStock}
                      onClick={() => setCartCount(prev => prev + 1)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {medicine.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>Track your past and current orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderHistory.map((order, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-4 border border-border rounded-lg hover:shadow-custom-md transition-all"
                    >
                      <div className="space-y-1">
                        <p className="font-semibold text-foreground">{order.id}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {order.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Package className="h-3 w-3" />
                            {order.items} items
                          </span>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <p className="text-lg font-bold text-foreground">{order.total}</p>
                        <Badge variant="default">{order.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Prescriptions Tab */}
          <TabsContent value="prescriptions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Prescriptions</CardTitle>
                <CardDescription>Upload and manage your prescriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center space-y-4">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground mb-1">Upload Prescription</p>
                    <p className="text-sm text-muted-foreground">
                      Drag and drop your prescription or click to browse
                    </p>
                  </div>
                  <Button className="bg-gradient-primary">Choose File</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Customer;
