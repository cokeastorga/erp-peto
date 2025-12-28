export interface Customer {
  id: string;
  name: string; // Nombre o Razón Social
  email: string;
  phone: string;
  rut: string; // Identificador fiscal (importante en Chile)
  address: string;
  status: "active" | "inactive";
  lastPurchase?: string; // Fecha última compra
}