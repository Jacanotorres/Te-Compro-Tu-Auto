/* =========================================================
   Te Compro Tu Auto — datos del sitio
   VEHICLES: inventario real (cargado del PDF del 12/09/2026).
   HAPPY_CLIENTS: fotos reales de clientes.
   TEAM: todavía de ejemplo — reemplazar por asesores reales.
   ========================================================= */

const WHATSAPP_NUMBER = "573054411478";
const CONTACT_PHONE_DISPLAY = "+57 305 441 1478";
const CONTACT_EMAIL = "administracion@tecomprotuauto.com.co";

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/tecomprotuautosas?stkn=ZTJ3OWthcmJ4dnBn&utm_source=qr",
  tiktok: "https://www.tiktok.com/@tecomprotuautosas?_r=1&_t=ZS-99iW32dKwr2",
  facebook: "https://www.facebook.com/share/1BvgVUPRqM/?mibextid=wwXIfr",
  maps: "https://maps.app.goo.gl/CbG1gnEozWtFhTAd6"
};

function waLink(message){
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
}

/* Igual que waLink(), pero a un número específico (por ejemplo, el
   WhatsApp directo de un asesor en particular). */
function waLinkTo(number, message){
  return "https://wa.me/" + number + "?text=" + encodeURIComponent(message);
}

/* Inventario real de Te Compro Tu Auto (cargado desde el PDF del
   12 de septiembre de 2026). "destacado" marca los vehículos que
   se muestran en "Recién llegados" y "oportunidad" los que tienen
   precio especial (con precioAnterior). Todos ingresaron hoy.

   "fotos" es un arreglo de rutas de imagen, en el orden en que se
   deben mostrar (la primera es la foto de portada en las tarjetas
   y la ficha). Ejemplo, guardando las fotos en
   assets/img/Carros/<PLACA>/1.jpg, 2.jpg, 3.jpg...:
     fotos: ["assets/img/Carros/NMN913/1.jpg", "assets/img/Carros/NMN913/2.jpg"]
   Mientras "fotos" esté vacío se muestra el ícono de auto genérico. */
const VEHICLES = [
  {
    id: "audi-q2-2023-nmn913",
    marca: "Audi", linea: "Q2", version: "TFSI Ambition", modelo: 2023,
    precio: 89800000, precioAnterior: null,
    km: 35513, combustible: "Gasolina", color: "Plata Florete", cilindraje: "1.395 cc",
    fotos: ["assets/img/Carros/NMN913/1.JPG", "assets/img/Carros/NMN913/03ce3802-2c5b-48bf-a9ce-93b62692b979.JPG", "assets/img/Carros/NMN913/51d25a31-4893-44b1-9208-2d6b3becb362.JPG", "assets/img/Carros/NMN913/5408a8f0-fe09-4b94-8cc4-397df615abe1.JPG", "assets/img/Carros/NMN913/55e95585-a427-48ab-8c47-ae9c61e3c767.JPG", "assets/img/Carros/NMN913/5eb416dd-05d4-4721-afaa-085bc74907a1.JPG", "assets/img/Carros/NMN913/79b5ed4b-4960-40ca-8d63-e3946e07dcad.JPG", "assets/img/Carros/NMN913/c0d62e0d-692a-477c-ae00-490ac002be6c.JPG", "assets/img/Carros/NMN913/c18b3c02-ce4a-496b-a399-cdde105b352f.JPG", "assets/img/Carros/NMN913/c728d149-e12c-48cf-b288-44f299274427.JPG", "assets/img/Carros/NMN913/f8393ef6-1c47-4103-9594-4ba091d535aa.JPG"],
    placa: "NMN913", soatVence: "2027-01-07", tecnoVence: "N/A",
    destacado: true, oportunidad: false, fechaIngreso: "2026-09-14"
  },
  {
    id: "audi-q3-2022-llv449",
    marca: "Audi", linea: "Q3", modelo: 2022,
    precio: 108800000, precioAnterior: null,
    km: 27427, combustible: "Gasolina", color: "Blanco Glaciar", cilindraje: "1.395 cc",
    fotos: ["assets/img/Carros/LLV449/IMG_5191.JPG", "assets/img/Carros/LLV449/IMG_5192.JPG", "assets/img/Carros/LLV449/IMG_5193.JPG", "assets/img/Carros/LLV449/IMG_5194.JPG", "assets/img/Carros/LLV449/IMG_5195.JPG", "assets/img/Carros/LLV449/IMG_5196.JPG", "assets/img/Carros/LLV449/IMG_5197.JPG", "assets/img/Carros/LLV449/IMG_5200.JPG", "assets/img/Carros/LLV449/IMG_5201.JPG", "assets/img/Carros/LLV449/IMG_5202.jpeg"],
    placa: "LLV449", soatVence: "VENCIDO", tecnoVence: "N/A",
    destacado: false, oportunidad: false, fechaIngreso: "2026-09-14"
  },
  {
    id: "bmw-x3-2021-kqq050",
    marca: "BMW", linea: "X3", version: "xDrive30i", modelo: 2021,
    precio: 116800000, precioAnterior: null,
    km: 55720, combustible: "Gasolina", color: "Blanco Mineral", cilindraje: "1.998 cc",
    fotos: ["assets/img/Carros/KQQ050/1.JPG", "assets/img/Carros/KQQ050/04c9dde7-1ae0-4ee9-ba1d-aad57426421c.JPG", "assets/img/Carros/KQQ050/3473df7f-8a78-475d-8880-a8bccdfc366c.JPG", "assets/img/Carros/KQQ050/835385b9-57de-4338-9cb1-fcd9e9c572d2.JPG", "assets/img/Carros/KQQ050/9b2497a4-1305-45a8-8cce-7f3361bda469.JPG", "assets/img/Carros/KQQ050/ac562cae-0b98-4ffe-9baf-3bfecc73cea2.JPG", "assets/img/Carros/KQQ050/b4f2c066-4fc9-44e4-b523-491aedf06302.JPG", "assets/img/Carros/KQQ050/d3e8120b-733f-47cc-bc22-65610331503e.JPG", "assets/img/Carros/KQQ050/e02bb296-9402-4fd3-a130-a7b3be646eb6.JPG", "assets/img/Carros/KQQ050/fc7390ef-32ee-496e-bbb4-459b64ee3a95.JPG"],
    placa: "KQQ050", soatVence: "2026-11-24", tecnoVence: "2026-11-26",
    destacado: true, oportunidad: false, fechaIngreso: "2026-09-14"
  },
  {
    id: "byd-dolphin-2024-nmn318",
    marca: "BYD", linea: "Dolphin", modelo: 2024,
    precio: 69800000, precioAnterior: null,
    km: 17803, combustible: "Eléctrico", color: "Amarillo", cilindraje: "N/A",
    fotos: ["assets/img/Carros/NMN318/1.JPG", "assets/img/Carros/NMN318/IMG_4426.JPG", "assets/img/Carros/NMN318/IMG_4427.JPG", "assets/img/Carros/NMN318/IMG_4428.JPG", "assets/img/Carros/NMN318/IMG_4430.JPG", "assets/img/Carros/NMN318/IMG_4431.JPG", "assets/img/Carros/NMN318/IMG_4432.JPG", "assets/img/Carros/NMN318/IMG_4433.JPG", "assets/img/Carros/NMN318/IMG_4434.JPG", "assets/img/Carros/NMN318/IMG_4435.JPG", "assets/img/Carros/NMN318/IMG_4436.JPG"],
    placa: "NMN318", soatVence: "2026-11-26", tecnoVence: "N/A",
    destacado: false, oportunidad: false, fechaIngreso: "2026-09-14"
  },
  {
    id: "chevrolet-equinox-2018-frm990",
    marca: "Chevrolet", linea: "Equinox", modelo: 2018,
    precio: 56800000, precioAnterior: null,
    km: 60980, combustible: "Gasolina", color: "Ultra Azul", cilindraje: "1.490 cc",
    fotos: ["assets/img/Carros/FRM990/1.JPG","assets/img/Carros/FRM990/2.JPG","assets/img/Carros/FRM990/3.JPG","assets/img/Carros/FRM990/4.JPG","assets/img/Carros/FRM990/5.JPG","assets/img/Carros/FRM990/6.JPG","assets/img/Carros/FRM990/7.JPG","assets/img/Carros/FRM990/8.JPG","assets/img/Carros/FRM990/9.JPG","assets/img/Carros/FRM990/10.JPG","assets/img/Carros/FRM990/11.JPG"],
    placa: "FRM990", soatVence: "2026-10-22", tecnoVence: "2026-12-20",
    destacado: false, oportunidad: false, fechaIngreso: "2026-09-14"
  },
  {
    id: "fiat-500-2012-mcy705",
    marca: "Fiat", linea: "500", modelo: 2012,
    precio: 31800000, precioAnterior: null,
    km: 66295, combustible: "Gasolina", color: "Rojo Sfrontado", cilindraje: "1.368 cc",
    fotos: ["assets/img/Carros/MCY705/1.JPG", "assets/img/Carros/MCY705/24c470c4-5b5e-4b28-b079-fcf494a612fa.JPG", "assets/img/Carros/MCY705/2b25e03f-68c3-4afb-bd98-9e23821d3a85.JPG", "assets/img/Carros/MCY705/3bedd428-4ad3-4b8d-9834-3d2dc5bc4af5.JPG", "assets/img/Carros/MCY705/42301942-d6a3-4a70-823f-ccfc73dac90a.JPG", "assets/img/Carros/MCY705/4bd7cd2b-b542-4116-94f8-86f2413fbf06.JPG", "assets/img/Carros/MCY705/913f536d-5164-47be-ad18-b3f6146bd5bb.JPG", "assets/img/Carros/MCY705/96655801-4e1a-4aa1-8096-c6fe4a97854c.JPG", "assets/img/Carros/MCY705/c734bf22-7958-4c03-9a1f-3904f042e8f3.JPG", "assets/img/Carros/MCY705/f636c32b-f4d4-46c6-8201-187ea41bede2.JPG"],
    placa: "MCY705", soatVence: "2027-06-19", tecnoVence: "2027-06-23",
    destacado: false, oportunidad: false, fechaIngreso: "2026-09-14"
  },
  {
    id: "ford-escape-2024-nso125",
    marca: "Ford", linea: "Escape", modelo: 2024,
    precio: 107800000, precioAnterior: 109800000,
    km: 19314, combustible: "Gasolina", color: "Gris Carbón", cilindraje: "2.500 cc",
    fotos: ["assets/img/Carros/NSO125/1.jpeg","assets/img/Carros/NSO125/2.jpeg","assets/img/Carros/NSO125/3.jpeg","assets/img/Carros/NSO125/4.jpeg","assets/img/Carros/NSO125/5.jpeg","assets/img/Carros/NSO125/6.jpeg","assets/img/Carros/NSO125/7.jpeg","assets/img/Carros/NSO125/8.jpeg","assets/img/Carros/NSO125/9.jpeg","assets/img/Carros/NSO125/10.jpeg","assets/img/Carros/NSO125/11.jpeg"],
    placa: "NSO125", soatVence: "2027-08-27", tecnoVence: "N/A",
    destacado: true, oportunidad: true, fechaIngreso: "2026-09-14"
  },
  {
    id: "kia-sportage-2021-jsy666",
    marca: "Kia", linea: "Sportage", modelo: 2021,
    precio: 97800000, precioAnterior: null,
    km: 42291, combustible: "Híbrido", color: "Plata", cilindraje: "1.598 cc",
    fotos: ["assets/img/Carros/JSY666/1.JPG", "assets/img/Carros/JSY666/0933f923-72ab-40d0-a3bb-f1164fc0b7c6.JPG", "assets/img/Carros/JSY666/198ce118-8b3c-46b2-9758-652820fe6be1.JPG", "assets/img/Carros/JSY666/5c25b779-6ac7-4775-b83a-70e5a12f7516.JPG", "assets/img/Carros/JSY666/677d2cb3-f5b1-41e8-b666-18eea51b95df.JPG", "assets/img/Carros/JSY666/68f91f4f-a65d-442a-8271-a8f1fbb86909.JPG", "assets/img/Carros/JSY666/78fdd3ec-b41c-4df5-a34c-e7172e33716f.JPG", "assets/img/Carros/JSY666/aac42da4-ffed-49ec-aeee-4e87850db442.JPG", "assets/img/Carros/JSY666/bb6a1f24-6218-4f2a-b265-fa570117a221.JPG", "assets/img/Carros/JSY666/c70e2d52-7662-45f5-803b-6563ed141d54.JPG", "assets/img/Carros/JSY666/e621ff34-cdc4-4703-ade2-9490a4ae4451.JPG", "assets/img/Carros/JSY666/f95238a1-3310-49b4-b05b-98ea5471e341.JPG"],
    placa: "JSY666", soatVence: "2026-11-10", tecnoVence: "2026-10-27",
    destacado: false, oportunidad: false, fechaIngreso: "2026-09-14"
  },
  {
    id: "kia-stylus-2012-klt840",
    marca: "Kia", linea: "Stylus", modelo: 2012,
    precio: 24800000, precioAnterior: null,
    km: 131433, combustible: "Gasolina", color: "Plata", cilindraje: "1.493 cc",
    fotos: ["assets/img/Carros/KLT840/1.jpeg", "assets/img/Carros/KLT840/2.jpeg", "assets/img/Carros/KLT840/3.jpeg", "assets/img/Carros/KLT840/4.jpeg", "assets/img/Carros/KLT840/5.jpeg", "assets/img/Carros/KLT840/6.jpeg", "assets/img/Carros/KLT840/7.jpeg", "assets/img/Carros/KLT840/8.jpeg", "assets/img/Carros/KLT840/9.jpeg", "assets/img/Carros/KLT840/10.jpeg"],
    placa: "KLT840", soatVence: "VENCIDO", tecnoVence: "2027-04-06",
    destacado: false, oportunidad: false, fechaIngreso: "2026-09-14"
  },
  {
    id: "mazda-cx50-2024-lyr797",
    marca: "Mazda", linea: "CX-50", modelo: 2024,
    precio: 149800000, precioAnterior: 151800000,
    km: 52569, combustible: "Gasolina", color: "Zircon Arena", cilindraje: "2.488 cc",
    fotos: ["assets/img/Carros/LYR797/IMG_5255.jpeg", "assets/img/Carros/LYR797/IMG_5256.jpeg", "assets/img/Carros/LYR797/IMG_5257.jpeg", "assets/img/Carros/LYR797/IMG_5258.jpeg", "assets/img/Carros/LYR797/IMG_5259.jpeg", "assets/img/Carros/LYR797/IMG_5261.jpeg", "assets/img/Carros/LYR797/IMG_5262.jpeg", "assets/img/Carros/LYR797/IMG_5264.jpeg", "assets/img/Carros/LYR797/IMG_5266.jpeg", "assets/img/Carros/LYR797/IMG_5267.jpeg", "assets/img/Carros/LYR797/IMG_5268.jpeg"],
    placa: "LYR797", soatVence: "2027-06-24", tecnoVence: "N/A",
    destacado: true, oportunidad: true, fechaIngreso: "2026-09-14"
  },
  {
    id: "mercedes-benz-gla200-2018-ehy120",
    marca: "Mercedes-Benz", linea: "GLA 200", modelo: 2018,
    precio: 79800000, precioAnterior: null,
    km: 48096, combustible: "Gasolina", color: "Blanco Cirrio", cilindraje: "1.595 cc",
    fotos: ["assets/img/Carros/EHY120/30dc18a4-5394-4216-a35f-62fff92fc392.JPG", "assets/img/Carros/EHY120/3d6b083c-cd23-4baa-9095-c00ba382e5d5.JPG", "assets/img/Carros/EHY120/64c187a2-9981-40d7-ad85-30410da7f13b.JPG", "assets/img/Carros/EHY120/9e568739-3520-4000-abe1-139a0f4fbbbf.JPG", "assets/img/Carros/EHY120/9f1189e3-b495-4ecc-a7a4-39316b666275.JPG", "assets/img/Carros/EHY120/aee89f2b-988f-4eae-870d-d9b85a1c602a.JPG", "assets/img/Carros/EHY120/c11de400-e4c5-48da-9370-9299db420ee3.JPG", "assets/img/Carros/EHY120/cfd1fbe5-36d0-4d94-b34d-8a40ca9f149c.JPG", "assets/img/Carros/EHY120/de41fe6e-094e-4ca2-a898-aebaa7ba5de2.JPG"],
    placa: "EHY120", soatVence: "2027-07-26", tecnoVence: "2027-08-22",
    destacado: false, oportunidad: false, fechaIngreso: "2026-09-14"
  },
  {
    id: "mercedes-benz-gla200-2023-lyu805",
    marca: "Mercedes-Benz", linea: "GLA 200", modelo: 2023,
    precio: 132800000, precioAnterior: null,
    km: 23943, combustible: "Gasolina", color: "Blanco Polar", cilindraje: "1.332 cc",
    fotos: ["assets/img/Carros/LYU805/1.JPG", "assets/img/Carros/LYU805/IMG_4164.JPG", "assets/img/Carros/LYU805/IMG_4165.JPG", "assets/img/Carros/LYU805/IMG_4166.JPG", "assets/img/Carros/LYU805/IMG_4167.JPG", "assets/img/Carros/LYU805/IMG_4168.JPG", "assets/img/Carros/LYU805/IMG_4169.JPG", "assets/img/Carros/LYU805/IMG_4170.JPG", "assets/img/Carros/LYU805/IMG_4172.JPG", "assets/img/Carros/LYU805/IMG_4173.JPG", "assets/img/Carros/LYU805/IMG_4174.JPG"],
    placa: "LYU805", soatVence: "VENCIDO", tecnoVence: "N/A",
    destacado: false, oportunidad: false, fechaIngreso: "2026-09-14"
  },
  {
    id: "nissan-xtrail-2025-nsk083",
    marca: "Nissan", linea: "X-Trail", modelo: 2025,
    precio: 148800000, precioAnterior: 150800000,
    km: 36487, combustible: "Híbrido", color: "Plata", cilindraje: "1.497 cc",
    fotos: ["assets/img/Carros/NSK083/1.JPG", "assets/img/Carros/NSK083/2fef91c3-1f7a-4df9-a052-e721eab6873f.JPG", "assets/img/Carros/NSK083/5649a91b-e468-4802-b83a-03941b3a385b.JPG", "assets/img/Carros/NSK083/678d4b93-4adb-4ddb-be0b-fd23bb060b65.JPG", "assets/img/Carros/NSK083/70335beb-28d4-403a-8648-403605f50ff1.JPG", "assets/img/Carros/NSK083/8efd5b9b-021b-49cf-aa8c-5ac10027d766.JPG", "assets/img/Carros/NSK083/c17cbfba-ff4c-4995-8465-485495c62d93.JPG", "assets/img/Carros/NSK083/eae6447b-0e6a-4a23-a5ae-924f582f90e4.JPG", "assets/img/Carros/NSK083/f5d8362a-f2f6-4316-b506-a570f95c0144.JPG", "assets/img/Carros/NSK083/f75d48fb-45ef-476f-b426-d6f6cc11dd44.JPG", "assets/img/Carros/NSK083/fd8bc38c-c4a3-48fa-a25e-d437ec48d95a.JPG"],
    placa: "NSK083", soatVence: "2027-04-24", tecnoVence: "N/A",
    destacado: true, oportunidad: true, fechaIngreso: "2026-09-14"
  },
  {
    id: "nissan-qashqai-2023-ley892",
    marca: "Nissan", linea: "Qashqai", modelo: 2023,
    precio: 89800000, precioAnterior: null,
    km: 99850, combustible: "Gasolina", color: "Gris", cilindraje: "1.332 cc",
    fotos: ["assets/img/Carros/LEY892/1.JPG", "assets/img/Carros/LEY892/1bd4b0c2-58f2-4e57-962f-fa34effd6083.JPG", "assets/img/Carros/LEY892/1f546c19-290f-4804-818e-e356a615510d.JPG", "assets/img/Carros/LEY892/3b425853-6fb6-495c-b580-04d9269f4ea4.JPG", "assets/img/Carros/LEY892/4239ba8e-af00-4900-b1c3-5e935d0f1153.JPG", "assets/img/Carros/LEY892/4fbc9cdf-74c8-4bab-a769-6fa53b95da5f.JPG", "assets/img/Carros/LEY892/7c42538c-39da-42fb-a6cb-93f545fc5007.JPG", "assets/img/Carros/LEY892/8a05ec8f-955f-4309-8c32-daa4aae53243.JPG", "assets/img/Carros/LEY892/bc686346-a8d4-49b7-97b2-a782a22b5391.JPG", "assets/img/Carros/LEY892/c6b1c4dd-814e-4853-8b2b-f7d0b26ae157.JPG", "assets/img/Carros/LEY892/ebbb08e4-1a58-4a30-b02a-4a22b1852b41.JPG"],
    placa: "LEY892", soatVence: "2027-06-30", tecnoVence: "N/A",
    destacado: false, oportunidad: false, fechaIngreso: "2026-09-14"
  },
  {
    id: "porsche-macan-2023-lpr714",
    marca: "Porsche", linea: "Macan", modelo: 2023,
    precio: 239800000, precioAnterior: null,
    km: 26229, combustible: "Gasolina", color: "Blanco Metálico", cilindraje: "1.984 cc",
    fotos: ["assets/img/Carros/LPR714/IMG_5472.jpeg", "assets/img/Carros/LPR714/IMG_5473.jpeg", "assets/img/Carros/LPR714/IMG_5475.jpeg", "assets/img/Carros/LPR714/IMG_5476.jpeg", "assets/img/Carros/LPR714/IMG_5477.jpeg", "assets/img/Carros/LPR714/IMG_5478.jpeg", "assets/img/Carros/LPR714/IMG_5481.jpeg", "assets/img/Carros/LPR714/IMG_5483.jpeg", "assets/img/Carros/LPR714/IMG_5484.jpeg", "assets/img/Carros/LPR714/IMG_5485.jpeg"],
    placa: "LPR714", soatVence: "2026-11-18", tecnoVence: "N/A",
    destacado: true, oportunidad: false, fechaIngreso: "2026-09-14"
  },
  {
    id: "renault-duster-2019-gls172",
    marca: "Renault", linea: "Duster", modelo: 2019,
    precio: 51800000, precioAnterior: null,
    km: 89234, combustible: "Gasolina", color: "Blanco Glacial", cilindraje: "1.998 cc",
    fotos: ["assets/img/Carros/GLS172/1.JPG", "assets/img/Carros/GLS172/IMG_5037.JPG", "assets/img/Carros/GLS172/IMG_5040.JPG", "assets/img/Carros/GLS172/IMG_5041.JPG", "assets/img/Carros/GLS172/IMG_5045.JPG", "assets/img/Carros/GLS172/IMG_5046.JPG", "assets/img/Carros/GLS172/IMG_5047.JPG"],
    placa: "GLS172", soatVence: "2026-12-12", tecnoVence: "2027-01-06",
    destacado: false, oportunidad: false, fechaIngreso: "2026-09-14"
  },
  {
    id: "renault-clio-2017-izu355",
    marca: "Renault", linea: "Clio", modelo: 2017,
    precio: 32800000, precioAnterior: null,
    km: 88525, combustible: "Gasolina", color: "Blanco Ártica", cilindraje: "1.149 cc",
    fotos: ["assets/img/Carros/IZU355/1.JPG", "assets/img/Carros/IZU355/2730d825-ee06-4897-8b30-a46bfca421e1.JPG", "assets/img/Carros/IZU355/5bf13aa3-f068-4324-8d31-d426a6539bde.JPG", "assets/img/Carros/IZU355/6bea456f-c554-485d-9808-772e67461b30.JPG", "assets/img/Carros/IZU355/7c55bb18-d7c4-4a9d-9d8b-c1b381d44a06.JPG", "assets/img/Carros/IZU355/8c76097e-4f11-4bc6-a22b-ae802b20665b.JPG", "assets/img/Carros/IZU355/91160292-061d-4555-be48-e96b27b63f87.JPG", "assets/img/Carros/IZU355/9a8e9d08-a02c-4f08-ba98-e43675de61a7.JPG", "assets/img/Carros/IZU355/c36d465e-9d1f-4959-84cb-5aaee662f3a8.JPG", "assets/img/Carros/IZU355/dee63a29-4ab8-41fd-952c-34109d2277ce.JPG"],
    placa: "IZU355", soatVence: "2027-07-27", tecnoVence: "2027-06-30",
    destacado: false, oportunidad: false, fechaIngreso: "2026-09-14"
  },
  {
    id: "suzuki-baleno-2024-lvx369",
    marca: "Suzuki", linea: "Baleno", modelo: 2024,
    precio: 62800000, precioAnterior: null,
    km: 40584, combustible: "Gasolina", color: "Plata", cilindraje: "1.462 cc",
    fotos: ["assets/img/Carros/LVX369/IMG_5207.jpeg", "assets/img/Carros/LVX369/IMG_5208.jpeg", "assets/img/Carros/LVX369/IMG_5209.jpeg", "assets/img/Carros/LVX369/IMG_5210.jpeg", "assets/img/Carros/LVX369/IMG_5211.jpeg", "assets/img/Carros/LVX369/IMG_5212.jpeg", "assets/img/Carros/LVX369/IMG_5213.jpeg", "assets/img/Carros/LVX369/IMG_5214.jpeg", "assets/img/Carros/LVX369/IMG_5215.jpeg", "assets/img/Carros/LVX369/IMG_5216.jpeg", "assets/img/Carros/LVX369/IMG_5217.jpeg", "assets/img/Carros/LVX369/IMG_5218.jpeg", "assets/img/Carros/LVX369/IMG_5219.jpeg", "assets/img/Carros/LVX369/IMG_5220.jpeg"],
    placa: "LVX369", soatVence: "VENCIDO", tecnoVence: "N/A",
    destacado: false, oportunidad: false, fechaIngreso: "2026-09-14"
  },
  {
    id: "toyota-fortuner-2019-gjq529",
    marca: "Toyota", linea: "Fortuner", modelo: 2019,
    precio: 149800000, precioAnterior: null,
    km: 136618, combustible: "Gasolina", color: "Gris Metálico", cilindraje: "2.694 cc",
    fotos: ["assets/img/Carros/GJQ529/IMG_4520.JPG", "assets/img/Carros/GJQ529/IMG_4521.JPG", "assets/img/Carros/GJQ529/IMG_4522.JPG", "assets/img/Carros/GJQ529/IMG_4523.JPG", "assets/img/Carros/GJQ529/IMG_4524.JPG", "assets/img/Carros/GJQ529/IMG_4525.JPG", "assets/img/Carros/GJQ529/IMG_4526.JPG", "assets/img/Carros/GJQ529/IMG_4527.JPG", "assets/img/Carros/GJQ529/IMG_4528.JPG", "assets/img/Carros/GJQ529/IMG_4529.JPG", "assets/img/Carros/GJQ529/IMG_4530.JPG", "assets/img/Carros/GJQ529/IMG_4531.JPG", "assets/img/Carros/GJQ529/IMG_4532.JPG"],
    placa: "GJQ529", soatVence: "2026-09-17", tecnoVence: "2027-06-10",
    destacado: true, oportunidad: false, fechaIngreso: "2026-09-14"
  },
  {
    id: "toyota-fortuner-2017-ims188",
    marca: "Toyota", linea: "Fortuner", modelo: 2017,
    precio: 129800000, precioAnterior: null,
    km: 103200, combustible: "Gasolina", color: "Plata Metálico", cilindraje: "2.694 cc",
    fotos: ["assets/img/Carros/IMS188/IMG_5141.JPG", "assets/img/Carros/IMS188/IMG_5142.JPG", "assets/img/Carros/IMS188/IMG_5143.JPG", "assets/img/Carros/IMS188/IMG_5144.JPG", "assets/img/Carros/IMS188/IMG_5145.JPG", "assets/img/Carros/IMS188/IMG_5146.JPG", "assets/img/Carros/IMS188/IMG_5147.JPG", "assets/img/Carros/IMS188/IMG_5148.JPG", "assets/img/Carros/IMS188/IMG_5149.JPG", "assets/img/Carros/IMS188/IMG_5150.JPG", "assets/img/Carros/IMS188/IMG_5151.JPG", "assets/img/Carros/IMS188/IMG_5152.JPG"],
    placa: "IMS188", soatVence: "2027-05-17", tecnoVence: "2027-05-15",
    destacado: false, oportunidad: false, fechaIngreso: "2026-09-14"
  },
  {
    id: "volvo-xc60-2021-jrk473",
    marca: "Volvo", linea: "XC60", modelo: 2021,
    precio: 114800000, precioAnterior: null,
    km: 59163, combustible: "Gasolina", color: "Gris", cilindraje: "1.969 cc",
    fotos: ["assets/img/Carros/JRK473/1.JPG", "assets/img/Carros/JRK473/IMG_4339.JPG", "assets/img/Carros/JRK473/IMG_4340.JPG", "assets/img/Carros/JRK473/IMG_4341.JPG", "assets/img/Carros/JRK473/IMG_4342.JPG", "assets/img/Carros/JRK473/IMG_4343.JPG", "assets/img/Carros/JRK473/IMG_4344.JPG", "assets/img/Carros/JRK473/IMG_4345.JPG", "assets/img/Carros/JRK473/IMG_4346.JPG", "assets/img/Carros/JRK473/IMG_4347.JPG", "assets/img/Carros/JRK473/IMG_4349.JPG", "assets/img/Carros/JRK473/IMG_4350.JPG"],
    placa: "JRK473", soatVence: "2026-11-26", tecnoVence: "N/A",
    destacado: false, oportunidad: false, fechaIngreso: "2026-09-14"
  },
  {
    id: "volvo-xc90-2018-ehv690",
    marca: "Volvo", linea: "XC90", modelo: 2018,
    precio: 149800000, precioAnterior: null,
    km: 73000, combustible: "Diésel", color: "Negro Onyx", cilindraje: "1.969 cc",
    fotos: ["assets/img/Carros/EHV690/1.JPG", "assets/img/Carros/EHV690/1b8ba2b8-8939-4a2e-be31-9b4a37cb54a0.JPG", "assets/img/Carros/EHV690/2efe55e0-7968-4f57-9c17-1f36c24a1b57.JPG", "assets/img/Carros/EHV690/5e01ee93-8035-4212-83f2-d6e7748cc42a.JPG", "assets/img/Carros/EHV690/65fb5a4b-8eab-431f-b00f-e511cad4fc6e.JPG", "assets/img/Carros/EHV690/731b6eba-b65e-440d-826a-676841fa3115.JPG", "assets/img/Carros/EHV690/a13099f7-78f3-48b9-98e4-da022d9a5c43.JPG", "assets/img/Carros/EHV690/a87a46af-f4b1-45c9-80cb-85563a3466c4.JPG", "assets/img/Carros/EHV690/b7cf65d0-21c5-422a-b0cd-c4ab4199397a.JPG", "assets/img/Carros/EHV690/caba721e-160d-4363-a81a-cc07f9409268.JPG", "assets/img/Carros/EHV690/cfa63e16-396b-4423-bf72-fa246e6101e5.JPG"],
    placa: "EHV690", soatVence: "2026-12-12", tecnoVence: "2026-10-09",
    destacado: false, oportunidad: false, fechaIngreso: "2026-09-14"
  },
  {
    id: "volvo-xc60-2018-ehw851",
    marca: "Volvo", linea: "XC60", version: "Blindaje", modelo: 2018,
    precio: 99800000, precioAnterior: null,
    km: 75441, combustible: "Gasolina", color: "Gris Osmio", cilindraje: "1.969 cc",
    fotos: ["assets/img/Carros/EHW851/1.JPG", "assets/img/Carros/EHW851/1e88118a-72f5-4319-8c8a-b0d746fb3d8f.JPG", "assets/img/Carros/EHW851/21df7d29-664f-416d-a0c6-9381e685b05c.JPG", "assets/img/Carros/EHW851/4e28c664-519b-417c-85a6-653a0de44903.JPG", "assets/img/Carros/EHW851/7b4ea855-4eff-4f7b-a3ac-7a4d6e71a044.JPG", "assets/img/Carros/EHW851/b424bc11-228a-4cfa-b6b5-18b0c0d5287d.JPG", "assets/img/Carros/EHW851/b63a63bc-52ea-4ea5-bf83-4dd29f6aa7f3.JPG", "assets/img/Carros/EHW851/cbdfb840-7690-4d8d-be0a-9b7038bbe160.JPG", "assets/img/Carros/EHW851/cf3bdf25-2fe8-451d-8f4e-5595cd790c3e.JPG", "assets/img/Carros/EHW851/d4048f5f-8fbc-4753-a061-05f2cb0dabce.JPG", "assets/img/Carros/EHW851/d577da35-c4ae-4871-8e79-9fc91180ec11.JPG", "assets/img/Carros/EHW851/dec53ac5-5141-4736-adcc-7893c2d47118.JPG"],
    placa: "EHW851", soatVence: "2027-01-31", tecnoVence: "2026-12-06",
    destacado: false, oportunidad: false, fechaIngreso: "2026-09-14"
  },
  {
    id: "volvo-xc90-t6-awd-2021-kon905",
    marca: "Volvo", linea: "XC90 T6 AWD", modelo: 2021,
    precio: 149800000, precioAnterior: null,
    km: 60706, combustible: "Gasolina", color: "Plata Brillante", cilindraje: "1.969 cc",
    fotos: ["assets/img/Carros/KON905/1.jpeg", "assets/img/Carros/KON905/2.jpeg", "assets/img/Carros/KON905/3.jpeg", "assets/img/Carros/KON905/4.jpeg", "assets/img/Carros/KON905/5.jpeg", "assets/img/Carros/KON905/6.jpeg", "assets/img/Carros/KON905/7.jpeg", "assets/img/Carros/KON905/8.jpeg", "assets/img/Carros/KON905/9.jpeg", "assets/img/Carros/KON905/10.jpeg"],
    placa: "KON905", soatVence: "2027-07-31", tecnoVence: "N/A",
    destacado: true, oportunidad: false, fechaIngreso: "2026-09-14"
  }
];

/* Fotos de clientes felices — coloca la ruta de cada imagen real en "foto"
   (por ejemplo "assets/img/Clientes/cliente-1.jpeg"). Mientras "foto" esté
   vacío se muestra un ícono de marcador de posición. */
const HAPPY_CLIENTS = [
  { foto: "assets/img/Clientes/cliente-1.jpeg" },
  { foto: "assets/img/Clientes/cliente-2.jpeg" },
  { foto: "assets/img/Clientes/cliente-3.jpeg" },
  { foto: "assets/img/Clientes/cliente-4.jpeg" },
  { foto: "assets/img/Clientes/cliente-5.jpeg" },
  { foto: "assets/img/Clientes/cliente-6.jpeg" },
  { foto: "assets/img/Clientes/cliente-7.jpeg" },
  { foto: "assets/img/Clientes/cliente-8.jpeg" },
  { foto: "assets/img/Clientes/cliente-9.jpeg" },
  { foto: "assets/img/Clientes/cliente-10.jpeg" },
  { foto: "assets/img/Clientes/cliente-11.jpeg" },
  { foto: "assets/img/Clientes/cliente-12.jpeg" },
  { foto: "assets/img/Clientes/cliente-13.jpg" },
  { foto: "assets/img/Clientes/cliente-14.jpg" },
  { foto: "assets/img/Clientes/cliente-15.jpg" },
  { foto: "assets/img/Clientes/cliente-16.jpg" },
  { foto: "assets/img/Clientes/cliente-17.jpg" },
  { foto: "assets/img/Clientes/cliente-18.jpg" },
  { foto: "assets/img/Clientes/cliente-19.jpg" },
  { foto: "assets/img/Clientes/cliente-20.jpg" }
];

/* Equipo real. "whatsapp" usa el número general mientras no tengamos
   el número directo de cada asesor — cámbialo cuando lo tengas. */
const TEAM = [
  { nombre: "Juan Manuel", cargo: "Asesor comercial", whatsapp: "573244443242", foto: "assets/img/Asesores/juan-manuel.jpeg" },
  { nombre: "Pilar Soto M.", cargo: "Asesor comercial", whatsapp: "573104243125", foto: "assets/img/Asesores/pilar-soto.png" },
  { nombre: "Stiven Sierra M.", cargo: "Asesor comercial", whatsapp: "573148618095", foto: "assets/img/Asesores/stiven-sierra.png" }
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
