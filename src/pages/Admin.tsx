import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import jsPDF from 'jspdf';
import {
  Package,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Users,
  Pill,
  Search,
  Plus,
  Download,
  Calendar,
  FileText,
  BarChart3,
  Printer
} from "lucide-react";

const Admin = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddMedicineOpen, setIsAddMedicineOpen] = useState(false);
  const [isExportReportOpen, setIsExportReportOpen] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    category: "",
    stock: "",
    price: "",
    expiry: "",
    description: ""
  });
  const [medicines, setMedicines] = useState([
    { name: "Paracetamol 500mg", category: "Pain Relief", stock: 450, expiry: "2025-12-30", status: "In Stock" },
    { name: "Amoxicillin 250mg", category: "Antibiotic", stock: 15, expiry: "2025-03-15", status: "Low Stock" },
    { name: "Ibuprofen 400mg", category: "Pain Relief", stock: 320, expiry: "2025-08-20", status: "In Stock" },
    { name: "Omeprazole 20mg", category: "Gastric", stock: 5, expiry: "2025-01-10", status: "Critical" },
    { name: "Vitamin D3", category: "Supplement", stock: 200, expiry: "2026-05-15", status: "In Stock" },
  ]);

  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+20.1%",
      icon: DollarSign,
      trend: "up",
      color: "text-secondary"
    },
    {
      title: "Medicines in Stock",
      value: "1,234",
      change: "-5%",
      icon: Package,
      trend: "down",
      color: "text-primary"
    },
    {
      title: "Low Stock Items",
      value: "23",
      change: "Alert",
      icon: AlertTriangle,
      trend: "alert",
      color: "text-destructive"
    },
    {
      title: "Active Staff",
      value: "12",
      change: "+2",
      icon: Users,
      trend: "up",
      color: "text-accent"
    },
  ];


  const recentOrders = [
    { id: "ORD-001", customer: "John Doe", total: "$45.99", status: "Completed", date: "2025-10-15" },
    { id: "ORD-002", customer: "Jane Smith", total: "$120.50", status: "Processing", date: "2025-10-15" },
    { id: "ORD-003", customer: "Bob Johnson", total: "$78.25", status: "Pending", date: "2025-10-14" },
  ];

  const handleAddMedicine = () => {
    if (!newMedicine.name || !newMedicine.category || !newMedicine.stock || !newMedicine.expiry) {
      alert("Please fill in all required fields (Name, Category, Stock, Expiry Date)");
      return;
    }

    const stock = parseInt(newMedicine.stock);
    let status = "In Stock";
    if (stock <= 10) {
      status = "Critical";
    } else if (stock <= 50) {
      status = "Low Stock";
    }

    const medicineToAdd = {
      name: newMedicine.name,
      category: newMedicine.category.charAt(0).toUpperCase() + newMedicine.category.slice(1).replace('-', ' '),
      stock: stock,
      expiry: newMedicine.expiry,
      status: status
    };

    setMedicines([medicineToAdd, ...medicines]);
    setIsAddMedicineOpen(false);
    setNewMedicine({ name: "", category: "", stock: "", price: "", expiry: "", description: "" });
    
    // Show success message
    alert("Medicine added successfully!");
  };

  const handleExportReport = (reportType: string) => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();
    
    // Set up the PDF document
    doc.setFontSize(20);
    doc.text(`${reportType} Report`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${currentDate}`, 20, 30);
    doc.text(`Pharmacy Management System`, 20, 40);
    
    let yPosition = 60;
    
    switch (reportType) {
      case "Sales":
        doc.setFontSize(16);
        doc.text("Sales Summary", 20, yPosition);
        yPosition += 20;
        
        doc.setFontSize(12);
        doc.text("Total Revenue: $45,231", 20, yPosition);
        yPosition += 15;
        doc.text("Growth Rate: +20.1%", 20, yPosition);
        yPosition += 15;
        doc.text("Active Staff: 12", 20, yPosition);
        break;
        
      case "Inventory":
        doc.setFontSize(16);
        doc.text("Medicine Inventory", 20, yPosition);
        yPosition += 20;
        
        // Table headers
        doc.setFontSize(10);
        doc.text("Medicine Name", 20, yPosition);
        doc.text("Category", 80, yPosition);
        doc.text("Stock", 130, yPosition);
        doc.text("Status", 160, yPosition);
        doc.text("Expiry", 190, yPosition);
        yPosition += 10;
        
        // Table data
        medicines.forEach(medicine => {
          if (yPosition > 280) {
            doc.addPage();
            yPosition = 20;
          }
          
          doc.text(medicine.name.length > 20 ? medicine.name.substring(0, 20) + "..." : medicine.name, 20, yPosition);
          doc.text(medicine.category, 80, yPosition);
          doc.text(medicine.stock.toString(), 130, yPosition);
          doc.text(medicine.status, 160, yPosition);
          doc.text(medicine.expiry, 190, yPosition);
          yPosition += 8;
        });
        break;
        
      case "Orders":
        doc.setFontSize(16);
        doc.text("Recent Orders", 20, yPosition);
        yPosition += 20;
        
        // Table headers
        doc.setFontSize(10);
        doc.text("Order ID", 20, yPosition);
        doc.text("Customer", 60, yPosition);
        doc.text("Total", 120, yPosition);
        doc.text("Status", 160, yPosition);
        doc.text("Date", 190, yPosition);
        yPosition += 10;
        
        // Table data
        recentOrders.forEach(order => {
          if (yPosition > 280) {
            doc.addPage();
            yPosition = 20;
          }
          
          doc.text(order.id, 20, yPosition);
          doc.text(order.customer, 60, yPosition);
          doc.text(order.total, 120, yPosition);
          doc.text(order.status, 160, yPosition);
          doc.text(order.date, 190, yPosition);
          yPosition += 8;
        });
        break;
        
      case "Financial":
        doc.setFontSize(16);
        doc.text("Financial Summary", 20, yPosition);
        yPosition += 20;
        
        doc.setFontSize(12);
        doc.text("Total Revenue: $45,231", 20, yPosition);
        yPosition += 15;
        doc.text("Operating Expenses: $28,500", 20, yPosition);
        yPosition += 15;
        doc.text("Net Profit: $16,731", 20, yPosition);
        yPosition += 15;
        doc.text("Profit Margin: 37%", 20, yPosition);
        break;
    }
    
    // Save the PDF
    const fileName = `${reportType.toLowerCase()}_report_${currentDate.replace(/\//g, '-')}.pdf`;
    doc.save(fileName);
    
    setIsExportReportOpen(false);
    alert(`${reportType} report exported successfully as PDF!`);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your pharmacy operations</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isExportReportOpen} onOpenChange={setIsExportReportOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Export Report
                  </DialogTitle>
                  <DialogDescription>
                    Select the type of report you want to export.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" onClick={() => handleExportReport("Sales")}>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Sales Report
                    </Button>
                    <Button variant="outline" onClick={() => handleExportReport("Inventory")}>
                      <Package className="h-4 w-4 mr-2" />
                      Inventory Report
                    </Button>
                    <Button variant="outline" onClick={() => handleExportReport("Orders")}>
                      <FileText className="h-4 w-4 mr-2" />
                      Orders Report
                    </Button>
                    <Button variant="outline" onClick={() => handleExportReport("Financial")}>
                      <DollarSign className="h-4 w-4 mr-2" />
                      Financial Report
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isAddMedicineOpen} onOpenChange={setIsAddMedicineOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Medicine
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Pill className="h-5 w-5" />
                    Add New Medicine
                  </DialogTitle>
                  <DialogDescription>
                    Enter the details for the new medicine to add to your inventory.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="medicine-name">Medicine Name</Label>
                      <Input
                        id="medicine-name"
                        placeholder="e.g., Paracetamol 500mg"
                        value={newMedicine.name}
                        onChange={(e) => setNewMedicine({...newMedicine, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={newMedicine.category} onValueChange={(value) => setNewMedicine({...newMedicine, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pain-relief">Pain Relief</SelectItem>
                          <SelectItem value="antibiotic">Antibiotic</SelectItem>
                          <SelectItem value="gastric">Gastric</SelectItem>
                          <SelectItem value="supplement">Supplement</SelectItem>
                          <SelectItem value="cardiac">Cardiac</SelectItem>
                          <SelectItem value="diabetes">Diabetes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="stock">Stock Quantity</Label>
                      <Input
                        id="stock"
                        type="number"
                        placeholder="100"
                        value={newMedicine.stock}
                        onChange={(e) => setNewMedicine({...newMedicine, stock: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price per Unit</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="2.50"
                        value={newMedicine.price}
                        onChange={(e) => setNewMedicine({...newMedicine, price: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      type="date"
                      value={newMedicine.expiry}
                      onChange={(e) => setNewMedicine({...newMedicine, expiry: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Additional notes about the medicine..."
                      value={newMedicine.description}
                      onChange={(e) => setNewMedicine({...newMedicine, description: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddMedicineOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddMedicine} className="bg-gradient-primary">
                    Add Medicine
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border hover:shadow-custom-md transition-all">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
                    <div className="flex items-center gap-1">
                      <TrendingUp className={`h-4 w-4 ${
                        stat.trend === 'up' ? 'text-secondary' : 
                        stat.trend === 'alert' ? 'text-destructive' : 'text-muted-foreground'
                      }`} />
                      <span className={`text-xs ${
                        stat.trend === 'up' ? 'text-secondary' : 
                        stat.trend === 'alert' ? 'text-destructive' : 'text-muted-foreground'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-primary`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="inventory" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Medicine Inventory</CardTitle>
                    <CardDescription>Manage your stock and track expiry dates</CardDescription>
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search medicines..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-6 gap-4 pb-3 border-b border-border font-semibold text-sm text-muted-foreground">
                    <div className="col-span-2">Medicine Name</div>
                    <div>Category</div>
                    <div>Stock</div>
                    <div>Expiry Date</div>
                    <div>Status</div>
                  </div>
                  {medicines.filter(medicine => 
                    medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    medicine.category.toLowerCase().includes(searchQuery.toLowerCase())
                  ).map((medicine, index) => (
                    <div key={index} className="grid grid-cols-6 gap-4 items-center py-3 hover:bg-muted/50 rounded-lg px-2 transition-colors">
                      <div className="col-span-2 flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Pill className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium text-foreground">{medicine.name}</span>
                      </div>
                      <div className="text-muted-foreground">{medicine.category}</div>
                      <div className="font-semibold text-foreground">{medicine.stock}</div>
                      <div className="text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {medicine.expiry}
                      </div>
                      <div>
                        <Badge 
                          variant={
                            medicine.status === "In Stock" ? "default" : 
                            medicine.status === "Low Stock" ? "secondary" : 
                            "destructive"
                          }
                        >
                          {medicine.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Track and manage customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-5 gap-4 pb-3 border-b border-border font-semibold text-sm text-muted-foreground">
                    <div>Order ID</div>
                    <div>Customer</div>
                    <div>Total</div>
                    <div>Date</div>
                    <div>Status</div>
                  </div>
                  {recentOrders.map((order, index) => (
                    <div key={index} className="grid grid-cols-5 gap-4 items-center py-3 hover:bg-muted/50 rounded-lg px-2 transition-colors">
                      <div className="font-mono text-sm text-primary">{order.id}</div>
                      <div className="font-medium text-foreground">{order.customer}</div>
                      <div className="font-semibold text-foreground">{order.total}</div>
                      <div className="text-muted-foreground">{order.date}</div>
                      <div>
                        <Badge variant={
                          order.status === "Completed" ? "default" : 
                          order.status === "Processing" ? "secondary" : 
                          "outline"
                        }>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales Analytics</CardTitle>
                <CardDescription>View detailed reports and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center space-y-2">
                    <TrendingUp className="h-12 w-12 mx-auto text-primary" />
                    <p>Analytics charts will be displayed here</p>
                    <p className="text-sm">Connect to Lovable Cloud to enable real-time analytics</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
