/* =========================================================
   Te Compro Tu Auto — datos de ejemplo (placeholder)
   Reemplaza este archivo con el inventario, testimonios y
   equipo reales cuando estén disponibles.
   ========================================================= */

const WHATSAPP_NUMBER = "573053299873";
const CONTACT_PHONE_DISPLAY = "+57 305 329 9873";
const CONTACT_EMAIL = "contacto@tecomprotuauto.com.co";

function waLink(message){
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
}

/* Cada vehículo es un ejemplo (placeholder) listo para reemplazar
   por datos e imágenes reales. */
const VEHICLES = [
  {
    id: "volvo-xc60-t5-2021",
    marca: "Volvo", linea: "XC60 T5 AWD", modelo: 2021,
    precio: 119800000, precioAnterior: 124800000,
    km: 59163, transmision: "Automática", combustible: "Gasolina",
    carroceria: "Camioneta", puertas: 5, capacidad: 5,
    color: "Blanco", cilindraje: "2000 cc", ciudad: "Cali",
    placa: "JRK473", soatVence: "2026-04-12", tecnoVence: "2026-01-30",
    version: "T5 Inscription", traccion: "AWD", propietarios: 1,
    accesorios: ["Cámara de reversa","Sensores de parqueo","Techo panorámico","Pantalla multimedia","Apple CarPlay / Android Auto","Sillas eléctricas","Aire acondicionado","Rines de lujo"],
    destacado: true, oportunidad: true, vendido: false,
    fechaIngreso: "2026-08-20"
  },
  {
    id: "ford-bronco-2024",
    marca: "Ford", linea: "Bronco", modelo: 2024,
    precio: 189900000, precioAnterior: null,
    km: 30070, transmision: "Automática", combustible: "Gasolina",
    carroceria: "Camioneta 4x4", puertas: 5, capacidad: 5,
    color: "Verde militar", cilindraje: "2300 cc", ciudad: "Cali",
    placa: "FRD024", soatVence: "2026-07-02", tecnoVence: "N/A",
    version: "Outer Banks", traccion: "4x4", propietarios: 1,
    accesorios: ["Cámara 360°","Techo removible","Luces LED","Asistencias de conducción","Pantalla multimedia","Apple CarPlay / Android Auto"],
    destacado: true, oportunidad: false, vendido: false,
    fechaIngreso: "2026-09-05"
  },
  {
    id: "mazda-3-sedan-2022",
    marca: "Mazda", linea: "3 Sedán Grand Touring", modelo: 2022,
    precio: 84900000, precioAnterior: null,
    km: 41250, transmision: "Automática", combustible: "Gasolina",
    carroceria: "Sedán", puertas: 4, capacidad: 5,
    color: "Rojo", cilindraje: "2000 cc", ciudad: "Cali",
    placa: "MZD322", soatVence: "2026-03-18", tecnoVence: "2026-03-18",
    version: "Grand Touring", traccion: "4x2", propietarios: 2,
    accesorios: ["Sillas eléctricas","Aire acondicionado","Sensores de parqueo","Cámara de reversa","Rines de lujo"],
    destacado: true, oportunidad: false, vendido: false,
    fechaIngreso: "2026-08-28"
  },
  {
    id: "renault-duster-2020",
    marca: "Renault", linea: "Duster Intens", modelo: 2020,
    precio: 62500000, precioAnterior: 67500000,
    km: 78900, transmision: "Mecánica", combustible: "Gasolina",
    carroceria: "Camioneta", puertas: 5, capacidad: 5,
    color: "Gris", cilindraje: "2000 cc", ciudad: "Palmira",
    placa: "DUS220", soatVence: "2026-02-10", tecnoVence: "2026-02-10",
    version: "Intens 4x2", traccion: "4x2", propietarios: 1,
    accesorios: ["Aire acondicionado","Rines de lujo","Sensores de parqueo"],
    destacado: false, oportunidad: true, vendido: false,
    fechaIngreso: "2026-07-14"
  },
  {
    id: "chevrolet-spark-gt-2019",
    marca: "Chevrolet", linea: "Spark GT", modelo: 2019,
    precio: 34900000, precioAnterior: null,
    km: 62300, transmision: "Mecánica", combustible: "Gasolina",
    carroceria: "Hatchback", puertas: 5, capacidad: 5,
    color: "Blanco", cilindraje: "1200 cc", ciudad: "Cali",
    placa: "SPK219", soatVence: "2026-05-22", tecnoVence: "2026-05-22",
    version: "1.2 LT", traccion: "4x2", propietarios: 2,
    accesorios: ["Aire acondicionado","Vidrios eléctricos"],
    destacado: false, oportunidad: false, vendido: false,
    fechaIngreso: "2026-06-30"
  },
  {
    id: "toyota-corolla-cross-2023",
    marca: "Toyota", linea: "Corolla Cross XEI", modelo: 2023,
    precio: 112000000, precioAnterior: null,
    km: 21400, transmision: "Automática", combustible: "Híbrido",
    carroceria: "Camioneta", puertas: 5, capacidad: 5,
    color: "Gris plata", cilindraje: "1800 cc", ciudad: "Cali",
    placa: "TCR323", soatVence: "2026-09-01", tecnoVence: "N/A",
    version: "XEI Hybrid", traccion: "4x2", propietarios: 1,
    accesorios: ["Cámara de reversa","Sensores de parqueo","Pantalla multimedia","Apple CarPlay / Android Auto","Asistencias de conducción"],
    destacado: false, oportunidad: false, vendido: false,
    fechaIngreso: "2026-08-02"
  },
  {
    id: "kia-sportage-2021",
    marca: "Kia", linea: "Sportage EX", modelo: 2021,
    precio: 96500000, precioAnterior: 101500000,
    km: 45870, transmision: "Automática", combustible: "Gasolina",
    carroceria: "Camioneta", puertas: 5, capacidad: 5,
    color: "Azul", cilindraje: "2000 cc", ciudad: "Yumbo",
    placa: "KSP121", soatVence: "2026-01-15", tecnoVence: "2026-01-15",
    version: "EX Premium", traccion: "4x2", propietarios: 1,
    accesorios: ["Techo panorámico","Sillas eléctricas","Cámara de reversa","Rines de lujo","Luces LED"],
    destacado: false, oportunidad: true, vendido: false,
    fechaIngreso: "2026-05-18"
  },
  {
    id: "nissan-versa-2020",
    marca: "Nissan", linea: "Versa Advance", modelo: 2020,
    precio: 52900000, precioAnterior: null,
    km: 55600, transmision: "Automática", combustible: "Gasolina",
    carroceria: "Sedán", puertas: 4, capacidad: 5,
    color: "Negro", cilindraje: "1600 cc", ciudad: "Cali",
    placa: "NVA220", soatVence: "2026-04-28", tecnoVence: "2026-04-28",
    version: "Advance CVT", traccion: "4x2", propietarios: 1,
    accesorios: ["Aire acondicionado","Vidrios eléctricos","Sensores de parqueo"],
    destacado: false, oportunidad: false, vendido: true,
    fechaIngreso: "2026-03-10"
  },
  {
    id: "mitsubishi-montero-sport-2018",
    marca: "Mitsubishi", linea: "Montero Sport GLS", modelo: 2018,
    precio: 89900000, precioAnterior: null,
    km: 92100, transmision: "Automática", combustible: "Diésel",
    carroceria: "Camioneta 4x4", puertas: 5, capacidad: 7,
    color: "Blanco perla", cilindraje: "2400 cc", ciudad: "Cali",
    placa: "MSP118", soatVence: "2026-06-09", tecnoVence: "2026-06-09",
    version: "GLS 4x4", traccion: "4x4", propietarios: 2,
    accesorios: ["Tercera fila","Cámara de reversa","Rines de lujo","Aire acondicionado"],
    destacado: false, oportunidad: false, vendido: true,
    fechaIngreso: "2026-02-22"
  },
  {
    id: "volkswagen-tiguan-2022",
    marca: "Volkswagen", linea: "Tiguan Allspace", modelo: 2022,
    precio: 134900000, precioAnterior: null,
    km: 33800, transmision: "Automática", combustible: "Gasolina",
    carroceria: "Camioneta", puertas: 5, capacidad: 7,
    color: "Gris grafito", cilindraje: "1400 cc", ciudad: "Cali",
    placa: "VWT222", soatVence: "2026-10-11", tecnoVence: "N/A",
    version: "Allspace Comfortline", traccion: "4x2", propietarios: 1,
    accesorios: ["Tercera fila","Techo panorámico","Sillas eléctricas","Pantalla multimedia","Apple CarPlay / Android Auto","Sensores de parqueo"],
    destacado: true, oportunidad: false, vendido: false,
    fechaIngreso: "2026-09-01"
  }
];

/* Testimonios de ejemplo — reemplazar por reseñas reales de clientes. */
const TESTIMONIALS = [
  {
    nombre: "Andrés M.", ciudad: "Cali",
    texto: "Excelente atención durante todo el proceso. Encontramos el vehículo que estábamos buscando y nos acompañaron hasta finalizar la compra."
  },
  {
    nombre: "Valentina R.", ciudad: "Cali",
    texto: "Vendí mi vehículo con Te Compro Tu Auto y el proceso fue mucho más sencillo de lo que esperaba."
  },
  {
    nombre: "Carlos G.", ciudad: "Palmira",
    texto: "Muy buena atención y variedad de vehículos. Gracias a todo el equipo por ayudarnos a encontrar nuestro nuevo carro."
  },
  {
    nombre: "Diana P.", ciudad: "Yumbo",
    texto: "Me hicieron una oferta justa por mi carro y el pago fue inmediato. Todo muy transparente de principio a fin."
  },
  {
    nombre: "Felipe A.", ciudad: "Cali",
    texto: "Buscaba una camioneta hace meses y aquí encontré varias opciones reales, con fotos que sí correspondían al vehículo."
  },
  {
    nombre: "Marcela T.", ciudad: "Jamundí",
    texto: "El equipo fue muy paciente explicando cada paso. Recomiendo Te Compro Tu Auto para vender sin complicaciones."
  }
];

/* Equipo de ejemplo — reemplazar por fotos y datos reales de los asesores. */
const TEAM = [
  { nombre: "Asesor comercial", cargo: "Ventas de inventario", whatsapp: WHATSAPP_NUMBER },
  { nombre: "Asesor comercial", cargo: "Compra de vehículos", whatsapp: WHATSAPP_NUMBER },
  { nombre: "Asesor comercial", cargo: "Valoración y avalúos", whatsapp: WHATSAPP_NUMBER },
  { nombre: "Asesor comercial", cargo: "Atención al cliente", whatsapp: WHATSAPP_NUMBER }
];

function formatPrice(n){
  return "$" + n.toLocaleString("es-CO");
}
function formatKm(n){
  return n.toLocaleString("es-CO") + " km";
}
function getVehicleById(id){
  return VEHICLES.find(function(v){ return v.id === id; });
}
