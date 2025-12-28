"use client";

import { useState } from "react";
import { CustomerList } from "@/features/customers/components/CustomerList";
import { CustomerSheet } from "@/features/customers/components/CustomerSheet";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import { Customer } from "@/features/customers/types";

export default function CustomersPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const handleOpenCreate = () => {
    setEditingCustomer(null);
    setIsSheetOpen(true);
  };

  const handleOpenEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsSheetOpen(true);
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <Users className="h-8 w-8 text-indigo-600" />
            Clientes (CRM)
          </h1>
          <p className="text-slate-500 text-sm">
            Base de datos de compradores y gestión de contactos.
          </p>
        </div>
        <Button 
            onClick={handleOpenCreate} 
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-900/20 transition-all"
        >
            <Plus className="mr-2 h-4 w-4" /> 
            Nuevo Cliente
        </Button>
      </div>

      {/* Lista */}
      <CustomerList onEdit={handleOpenEdit} />

      {/* Formulario */}
      <CustomerSheet 
        isOpen={isSheetOpen} 
        onClose={() => setIsSheetOpen(false)}
        customerToEdit={editingCustomer}
      />
    </div>
  );
}