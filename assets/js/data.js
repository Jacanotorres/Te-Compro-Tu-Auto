/* =========================================================
   Te Compro Tu Auto — configuración del sitio
   El inventario, el equipo y los clientes felices viven en Supabase
   (ver assets/js/db.js) y se administran desde panel.html. Aquí solo
   queda la configuración fija del sitio (contacto, redes) y los
   helpers que usan varias páginas.
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

function formatPrice(n){
  return "$" + n.toLocaleString("es-CO");
}
function formatKm(n){
  return n.toLocaleString("es-CO") + " km";
}
