"use client";

import { useEffect, useState } from "react"; // Agregamos useState e useEffect
import { Trash2, ShoppingCart, User, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { useCartStore } from "../cart-store";
import { useInventoryStore } from "@/features/inventory/store";
import { useSalesHistoryStore } from "../history-store";
import { useCustomerStore } from "@/features/customers/store";

export function CartSummary() {
  // Estados para evitar hidratación
  const [mounted, setMounted] = useState(false);
  
  const { 
    items, removeItem, updateQuantity, 
    total, clearCart, selectedCustomer, setCustomer 
  } = useCartStore();
  
  const { customers } = useCustomerStore();
  const { addSale } = useSalesHistoryStore();
  const { products, updateProduct } = useInventoryStore(); // Necesitamos esto para descontar stock

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCheckout = () => {
    if (items.length === 0) return;
    if (!confirm("¿Confirmar venta y procesar pago?")) return;

    // 1. Guardar en Historial
    const saleData = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      customer: selectedCustomer,
      items: [...items], // Copia de los items
      total: total(),
      status: "completed" as const
    };
    addSale(saleData);

    // 2. Descontar Stock del Inventario Real
    items.forEach(cartItem => {
      const productInStore = products.find(p => p.id === cartItem.id);
      if (productInStore) {
        updateProduct(cartItem.id, { 
          stock: productInStore.stock - cartItem.quantity 
        });
      }
    });

    // 3. Limpiar Carrito
    clearCart();
    alert("¡Venta realizada con éxito!");
  };

  if (!mounted) return null;

  return (
    <Card className="h-full flex flex-col border-none shadow-xl bg-white/80 backdrop-blur">
      <CardHeader className="pb-3 border-b border-slate-100">
        <CardTitle className="flex items-center gap-2 text-lg">
          <ShoppingCart className="w-5 h-5 text-indigo-600" />
          Ticket de Venta
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {/* Selector de Cliente */}
        <div className="p-4 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-500 uppercase">
            <User className="w-3 h-3" /> Cliente
          </div>
          <Select 
            value={selectedCustomer?.id || "anonymous"} 
            onValueChange={(val) => {
              if(val === "anonymous") setCustomer(null);
              else {
                const c = customers.find(cust => cust.id === val);
                if(c) setCustomer(c);
              }
            }}
          >
            <SelectTrigger className="bg-white border-slate-200">
              <SelectValue placeholder="Cliente Anónimo (Venta Rápida)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="anonymous">👤 Cliente Anónimo</SelectItem>
              {customers.map(c => (
                <SelectItem key={c.id} value={c.id}>{c.name} ({c.rut})</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Lista de Items (Scrollable) */}
        <ScrollArea className="flex-1 p-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2 opacity-60">
              <ShoppingCart className="w-12 h-12" />
              <p>Carrito vacío</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-start group">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-500">${item.price.toLocaleString("es-CL")} c/u</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                     {/* Control Cantidad */}
                    <div className="flex items-center border rounded-md bg-white h-8">
                      <button 
                        className="px-2 hover:bg-slate-100 text-slate-600 disabled:opacity-50"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >-</button>
                      <span className="text-sm font-mono w-8 text-center">{item.quantity}</span>
                      <button 
                        className="px-2 hover:bg-slate-100 text-slate-600 disabled:opacity-50"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                      >+</button>
                    </div>

                    {/* Subtotal */}
                    <div className="w-20 text-right">
                      <p className="font-bold text-sm">${item.subtotal.toLocaleString("es-CL")}</p>
                    </div>

                    {/* Eliminar */}
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Totales y Botón Pagar (Footer Fijo) */}
        <div className="p-4 bg-slate-900 text-white mt-auto">
          <div className="space-y-1 mb-4">
            <div className="flex justify-between text-sm text-slate-400">
              <span>Subtotal</span>
              <span>${total().toLocaleString("es-CL")}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-400">
              <span>IVA (19%)</span>
              <span>${Math.round(total() * 0.19).toLocaleString("es-CL")}</span>
            </div>
            <Separator className="bg-slate-700 my-2" />
            <div className="flex justify-between text-xl font-bold">
              <span>Total a Pagar</span>
              <span>${total().toLocaleString("es-CL")}</span>
            </div>
          </div>

          <Button 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-12 shadow-lg shadow-green-900/20"
            disabled={items.length === 0}
            onClick={handleCheckout}
          >
            <CreditCard className="mr-2 h-5 w-5" />
            Completar Venta
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}