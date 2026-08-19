import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import jsPDF from 'jspdf';
import { Search, Plus, Minus, Trash2, Printer, Calculator } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Staff = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedMedicine, setSelectedMedicine] = useState<string>("");

  const medicines = [
    { id: 1, name: "Paracetamol 500mg", price: 12.99, stock: 450 },
    { id: 2, name: "Amoxicillin 250mg", price: 24.50, stock: 15 },
    { id: 3, name: "Ibuprofen 400mg", price: 10.50, stock: 320 },
    { id: 4, name: "Omeprazole 20mg", price: 18.75, stock: 85 },
    { id: 5, name: "Vitamin D3", price: 15.99, stock: 200 },
  ];

  const addToCart = (medicine: typeof medicines[0]) => {
    const existing = cart.find(item => item.id === medicine.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === medicine.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, change: number) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const removeItem = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;

  const generateInvoicePDF = () => {
    if (cart.length === 0) {
      alert("No items in cart to generate invoice!");
      return;
    }

    const doc = new jsPDF();
    const currentDate = new Date();
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
    const currentDateStr = currentDate.toLocaleDateString();
    const currentTimeStr = currentDate.toLocaleTimeString();

    // Invoice Header
    doc.setFontSize(24);
    doc.text("PHARMACY INVOICE", 20, 20);
    
    doc.setFontSize(12);
    doc.text("Pharmacy Management System", 20, 30);
    doc.text("123 Healthcare Street", 20, 35);
    doc.text("Medical City, MC 12345", 20, 40);
    doc.text("Phone: (555) 123-4567", 20, 45);
    doc.text("Email: info@pharmacy.com", 20, 50);

    // Invoice Details
    doc.setFontSize(14);
    doc.text("INVOICE DETAILS", 140, 30);
    doc.setFontSize(10);
    doc.text(`Invoice #: ${invoiceNumber}`, 140, 40);
    doc.text(`Date: ${currentDateStr}`, 140, 45);
    doc.text(`Time: ${currentTimeStr}`, 140, 50);
    doc.text(`Staff: System User`, 140, 55);

    // Customer Section
    doc.setFontSize(12);
    doc.text("BILL TO:", 20, 70);
    doc.setFontSize(10);
    doc.text("Walk-in Customer", 20, 80);
    doc.text("Counter Sale", 20, 85);

    // Items Table Header
    doc.setFontSize(12);
    doc.text("ITEMS PURCHASED", 20, 105);
    
    // Table Headers
    doc.setFontSize(10);
    doc.text("Item", 20, 115);
    doc.text("Price", 100, 115);
    doc.text("Qty", 130, 115);
    doc.text("Total", 160, 115);

    // Draw line under headers
    doc.line(20, 117, 190, 117);

    let yPosition = 125;

    // Add items to PDF
    cart.forEach((item, index) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      doc.text(item.name.length > 25 ? item.name.substring(0, 25) + "..." : item.name, 20, yPosition);
      doc.text(`$${item.price.toFixed(2)}`, 100, yPosition);
      doc.text(item.quantity.toString(), 130, yPosition);
      doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 160, yPosition);
      
      yPosition += 8;
    });

    // Calculate totals
    yPosition += 10;
    
    // Draw line above totals
    doc.line(140, yPosition, 190, yPosition);
    yPosition += 8;

    // Subtotal
    doc.text("Subtotal:", 140, yPosition);
    doc.text(`$${subtotal.toFixed(2)}`, 160, yPosition);
    yPosition += 8;

    // Tax
    doc.text("Tax (5%):", 140, yPosition);
    doc.text(`$${tax.toFixed(2)}`, 160, yPosition);
    yPosition += 8;

    // Total
    doc.setFontSize(12);
    doc.text("TOTAL:", 140, yPosition);
    doc.text(`$${total.toFixed(2)}`, 160, yPosition);

    // Payment Method
    yPosition += 15;
    doc.setFontSize(10);
    doc.text("Payment Method: Cash", 20, yPosition);
    doc.text("Status: Paid", 20, yPosition + 5);

    // Footer
    yPosition += 20;
    doc.setFontSize(8);
    doc.text("Thank you for your business!", 20, yPosition);
    doc.text("Inventory will be updated automatically.", 20, yPosition + 5);
    doc.text("Please keep this receipt for your records.", 20, yPosition + 10);

    // Save the PDF
    const fileName = `invoice_${invoiceNumber}_${currentDateStr.replace(/\//g, '-')}.pdf`;
    doc.save(fileName);

    // Clear cart and show success message
    setCart([]);
    alert(`Invoice generated successfully!\nTotal: $${total.toFixed(2)}\nPDF saved as: ${fileName}\n\nInventory will be updated automatically.`);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Staff Billing Portal</h1>
          <p className="text-muted-foreground">Process sales and manage customer orders</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Side - Medicine Search */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Search Medicines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by medicine name or code..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {medicines
                    .filter(med =>
                      med.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((medicine) => (
                      <div
                        key={medicine.id}
                        className="flex justify-between items-center p-4 border border-border rounded-lg hover:shadow-custom-md transition-all cursor-pointer"
                        onClick={() => addToCart(medicine)}
                      >
                        <div>
                          <p className="font-semibold text-foreground">{medicine.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-lg font-bold text-primary">${medicine.price}</span>
                            <Badge variant={medicine.stock > 50 ? "default" : "secondary"}>
                              Stock: {medicine.stock}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-gradient-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(medicine);
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Cart */}
          <div className="space-y-4">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Current Bill
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No items in cart</p>
                    <p className="text-sm mt-2">Search and add medicines to start billing</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 max-h-[300px] overflow-y-auto">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 border border-border rounded-lg space-y-2"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-medium text-sm text-foreground">{item.name}</p>
                              <p className="text-xs text-muted-foreground">${item.price} each</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="font-semibold text-sm w-8 text-center text-foreground">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <span className="ml-auto font-semibold text-primary">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal:</span>
                        <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax (5%):</span>
                        <span className="font-medium text-foreground">${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t border-border pt-2">
                        <span className="text-foreground">Total:</span>
                        <span className="text-primary">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button
                        className="w-full bg-gradient-primary"
                        onClick={generateInvoicePDF}
                      >
                        <Printer className="h-4 w-4 mr-2" />
                        Generate Invoice PDF
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setCart([])}
                      >
                        Clear Cart
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Items in cart:</span>
                    <span className="font-semibold text-foreground">{cart.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total quantity:</span>
                    <span className="font-semibold text-foreground">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staff;
