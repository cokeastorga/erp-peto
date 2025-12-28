"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription
} from "@/components/ui/sheet";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { customerSchema, CustomerFormValues } from "../schema";
import { useCustomerStore } from "../store";
import { Customer } from "../types";

interface CustomerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  customerToEdit?: Customer | null;
}

export function CustomerSheet({ isOpen, onClose, customerToEdit }: CustomerSheetProps) {
  const { addCustomer, updateCustomer } = useCustomerStore();

  // NOTA: Quitamos el genérico <CustomerFormValues> para evitar el error de tipos de Vercel
  const form = useForm({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      rut: "",
      email: "",
      phone: "",
      address: "",
      // SOLUCIÓN: Forzamos a TS a entender que esto no es un string cualquiera, sino uno de los permitidos
      status: "active" as "active" | "inactive", 
    },
  });

  useEffect(() => {
    if (customerToEdit) {
      form.reset(customerToEdit); // TypeScript inferirá los tipos compatibles
    } else {
      form.reset({
        name: "", rut: "", email: "", phone: "", address: "", status: "active"
      });
    }
  }, [customerToEdit, form, isOpen]);

  function onSubmit(data: any) { // Usamos any temporalmente o el tipo inferido
    if (customerToEdit) {
      updateCustomer(customerToEdit.id, data);
    } else {
      addCustomer(data);
    }
    onClose();
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg p-0 flex flex-col h-full bg-white border-l border-slate-200 shadow-2xl">
        <SheetHeader className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <SheetTitle className="text-xl font-bold text-slate-900">
            {customerToEdit ? "Editar Cliente" : "Nuevo Cliente"}
          </SheetTitle>
          <SheetDescription className="text-slate-500 mt-1">
            Información de contacto y facturación.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <Form {...form}>
            <form id="customer-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Datos Personales */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">1</div>
                  Datos Identificación
                </h3>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase text-slate-500">Nombre / Razón Social</FormLabel>
                      <FormControl><Input placeholder="Ej. Juan Pérez" {...field} className="bg-slate-50/50" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="rut"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-xs font-bold uppercase text-slate-500">RUT</FormLabel>
                        <FormControl><Input placeholder="12.345.678-9" {...field} className="font-mono bg-slate-50/50" /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-xs font-bold uppercase text-slate-500">Estado</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                            <SelectTrigger className="bg-slate-50/50"><SelectValue /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="active">🟢 Activo</SelectItem>
                            <SelectItem value="inactive">🔴 Inactivo</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
              </div>

              <Separator />

              {/* Datos Contacto */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">2</div>
                  Contacto
                </h3>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-xs font-bold uppercase text-slate-500">Email</FormLabel>
                        <FormControl><Input placeholder="cliente@mail.com" {...field} className="bg-slate-50/50" /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-xs font-bold uppercase text-slate-500">Teléfono</FormLabel>
                        <FormControl><Input placeholder="+569..." {...field} className="bg-slate-50/50" /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                 <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase text-slate-500">Dirección</FormLabel>
                      <FormControl><Input placeholder="Calle Principal 123, Santiago" {...field} className="bg-slate-50/50" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

            </form>
          </Form>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 mt-auto">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button type="submit" form="customer-form" className="bg-slate-900 text-white hover:bg-slate-800">
            {customerToEdit ? "Guardar Cambios" : "Crear Cliente"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}