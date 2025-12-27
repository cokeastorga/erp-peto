"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { productSchema, ProductFormValues } from "../schema";
import { useInventoryStore } from "../store";
import { Product } from "../types";

interface ProductSheetProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
}

export function ProductSheet({ isOpen, onClose, productToEdit }: ProductSheetProps) {
  const { addProduct, updateProduct } = useInventoryStore();

 // Quitamos <ProductFormValues> para que el resolver maneje la inferencia
const form = useForm({
  resolver: zodResolver(productSchema),
  defaultValues: {
    name: "",
    sku: "",
    category: "",
    status: "active",
    price: 0,
    stock: 0,
  },
});

  useEffect(() => {
    if (productToEdit) {
      form.reset({
        name: productToEdit.name,
        sku: productToEdit.sku,
        category: productToEdit.category,
        status: productToEdit.status,
        price: productToEdit.price,
        stock: productToEdit.stock,
      });
    } else {
      form.reset({
        name: "",
        sku: "",
        category: "",
        status: "active",
        price: 0,
        stock: 0,
      });
    }
  }, [productToEdit, form, isOpen]);

  function onSubmit(data: ProductFormValues) {
    if (productToEdit) {
      updateProduct(productToEdit.id, data);
    } else {
      addProduct(data);
    }
    onClose();
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      {/* CLAVE 1: p-0 quita el padding por defecto para que podamos controlar bordes exactos.
        CLAVE 2: flex flex-col h-full permite estructurar Header-Body-Footer.
        CLAVE 3: sm:max-w-lg define un ancho cómodo y profesional.
      */}
      <SheetContent className="w-full sm:max-w-lg p-0 flex flex-col h-full bg-white border-l border-slate-200 shadow-2xl">
        
        {/* --- HEADER FIJO --- */}
        <SheetHeader className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <SheetTitle className="text-xl font-bold text-slate-900">
            {productToEdit ? "Editar Producto" : "Nuevo Producto"}
          </SheetTitle>
          <SheetDescription className="text-slate-500 mt-1">
            {productToEdit
              ? `Modificando SKU: ${productToEdit.sku}`
              : "Completa la ficha técnica para el registro."}
          </SheetDescription>
        </SheetHeader>

        {/* --- BODY CON SCROLL INDEPENDIENTE --- */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <Form {...form}>
            <form id="product-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Sección 1: Datos Básicos */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">1</div>
                  Información General
                </h3>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium text-slate-500 uppercase">Nombre del Producto</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej. Alimento Premium..." {...field} className="h-10 bg-slate-50/50 focus:bg-white transition-all" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-slate-500 uppercase">SKU</FormLabel>
                        <FormControl>
                          <Input placeholder="PET-000" {...field} className="h-10 font-mono text-sm bg-slate-50/50 focus:bg-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-slate-500 uppercase">Categoría</FormLabel>
                        <FormControl>
                          <Input placeholder="Accesorios" {...field} className="h-10 bg-slate-50/50 focus:bg-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator className="bg-slate-100" />

              {/* Sección 2: Inventario y Precios */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">2</div>
                  Detalles de Venta
                </h3>

                <div className="grid grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-slate-500 uppercase">Precio Unitario</FormLabel>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-slate-400 font-medium">$</span>
                          <FormControl>
                            <Input type="number" {...field} className="pl-7 h-10 font-mono text-sm bg-slate-50/50 focus:bg-white" />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-slate-500 uppercase">Stock Actual</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} className="h-10 font-mono text-sm bg-slate-50/50 focus:bg-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium text-slate-500 uppercase">Estado de Publicación</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10 bg-slate-50/50 focus:bg-white">
                            <SelectValue placeholder="Selecciona estado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">
                            <span className="flex items-center gap-2">🟢 Activo</span>
                          </SelectItem>
                          <SelectItem value="draft">
                            <span className="flex items-center gap-2">⚪ Borrador</span>
                          </SelectItem>
                          <SelectItem value="low_stock">
                            <span className="flex items-center gap-2">🟡 Stock Crítico</span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>

        {/* --- FOOTER FIJO --- */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 mt-auto">
          <Button variant="outline" onClick={onClose} className="h-10 px-6 border-slate-200 text-slate-700 hover:bg-white">
            Cancelar
          </Button>
          {/* El botón submit se vincula al formulario mediante form="product-form" o simplemente onClick si está dentro del contexto */}
          <Button 
            type="submit" 
            form="product-form" // Vincula este botón externo con el formulario de arriba
            className="h-10 px-6 bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/10"
          >
            {productToEdit ? "Guardar Cambios" : "Crear Producto"}
          </Button>
        </div>

      </SheetContent>
    </Sheet>
  );
}