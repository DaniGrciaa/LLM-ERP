export const MOCK_DATA = {
  totalProductos: 1450,
  unidadesStock: 12500,
  productosBajoStock: 8,
  perdidasDesechos: 850.5,
  productos: [
    { id: 1, nombre: "Teclado mecánico NeonKey X1", categoria: "Periféricos", stock: 120, precio: 150 },
    { id: 2, nombre: "Ratón óptico CyberMouse V2", categoria: "Periféricos", stock: 200, precio: 80 },
    { id: 3, nombre: "Monitor QuantumView 27", categoria: "Monitores", stock: 45, precio: 300 },
    { id: 4, nombre: "Cable USB-C HyperLink", categoria: "Accesorios", stock: 500, precio: 15 },
    { id: 5, nombre: "Base refrigeradora FrostPad", categoria: "Accesorios", stock: 65, precio: 40 },
  ],
  stockPorCategoria: [
    { name: "Periféricos", value: 320 },
    { name: "Monitores", value: 45 },
    { name: "Accesorios", value: 565 },
    { name: "Componentes", value: 150 },
  ],
  desechos: [
    { mes: "Ene", valor: 120 },
    { mes: "Feb", valor: 200 },
    { mes: "Mar", valor: 150 },
    { mes: "Abr", valor: 80 },
    { mes: "May", valor: 250 },
  ],
  actividadReciente: [
    "Sistema iniciado. IA lista.",
    "Procesados desechos de HyperLink",
    "Listados productos bajo stock"
  ]
};

