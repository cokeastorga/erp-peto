"use client";

import { useEffect, useState } from "react";
import { Edit, Trash2, Mail, Phone, MapPin, Building2 } from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCustomerStore } from "../store";
import { Customer } from "../types";

interface CustomerListProps {
  onEdit: (customer: Customer) => void;
}

export function CustomerList({ onEdit }: CustomerListProps) {
  const { customers, removeCustomer } = useCustomerStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm ring-1 ring-slate-900/5">
      <CardHeader className="px-6 py-4 border-b border-slate-100">
        <CardTitle className="text-xl font-bold text-slate-800">Cartera de Clientes</CardTitle>
        <CardDescription>Gestiona tus contactos comerciales ({customers.length} registros).</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="pl-6">Cliente</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right pr-6">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id} className="group hover:bg-slate-50/50">
                <TableCell className="pl-6 font-medium">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                      {customer.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-slate-900">{customer.name}</div>
                      <div className="text-xs text-slate-500 font-mono">{customer.rut}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3" /> {customer.email}
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3" /> {customer.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-2 text-sm text-slate-600 max-w-[200px] truncate">
                        <MapPin className="w-3 h-3 shrink-0" /> {customer.address}
                    </div>
                </TableCell>
                <TableCell>
                  <Badge variant={customer.status === 'active' ? 'default' : 'secondary'} className={customer.status === 'active' ? "bg-green-100 text-green-700 hover:bg-green-100 border-green-200" : ""}>
                    {customer.status === 'active' ? 'Activo' : 'Inactivo'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right pr-6">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(customer)}>
                      <Edit className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => {
                        if(confirm("¿Eliminar cliente?")) removeCustomer(customer.id);
                    }}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}