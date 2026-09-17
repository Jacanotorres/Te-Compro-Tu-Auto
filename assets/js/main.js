/* =========================================================
   Te Compro Tu Auto — comportamiento compartido del sitio
   ========================================================= */

document.addEventListener("DOMContentLoaded", function(){

  /* Menú móvil */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("nav.main-nav");
  const scrim = document.querySelector(".nav-scrim");
  if(toggle && nav && scrim){
    function closeNav(){
      nav.classList.remove("open");
      scrim.classList.remove("open");
      toggle.setAttribute("aria-expanded","false");
    }
    toggle.addEventListener("click", function(){
      const isOpen = nav.classList.toggle("open");
      scrim.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    scrim.addEventListener("click", closeNav);
    nav.querySelectorAll("a").forEach(function(a){ a.addEventListener("click", closeNav); });
  }

  /* Enlaces de WhatsApp con texto predefinido (data-wa-text) */
  document.querySelectorAll("[data-wa-text]").forEach(function(a){
    a.href = waLink(a.getAttribute("data-wa-text"));
  });

  /* Teléfono / correo de contacto inyectados donde se pidan */
  document.querySelectorAll("[data-contact-phone]").forEach(function(el){
    el.textContent = CONTACT_PHONE_DISPLAY;
  });
  document.querySelectorAll("[data-contact-phone-href]").forEach(function(el){
    el.href = "tel:+" + WHATSAPP_NUMBER;
  });
  document.querySelectorAll("[data-contact-email]").forEach(function(el){
    el.textContent = CONTACT_EMAIL;
  });
  document.querySelectorAll("[data-contact-email-href]").forEach(function(el){
    el.href = "mailto:" + CONTACT_EMAIL;
  });

  /* Año dinámico en el footer */
  document.querySelectorAll("[data-year]").forEach(function(el){
    el.textContent = new Date().getFullYear();
  });

  /* Acordeón de preguntas frecuentes */
  document.querySelectorAll(".faq-item .faq-q").forEach(function(btn){
    btn.addEventListener("click", function(){
      const item = btn.closest(".faq-item");
      const wasOpen = item.classList.contains("open");
      item.parentElement.querySelectorAll(".faq-item").forEach(function(i){ i.classList.remove("open"); });
      if(!wasOpen) item.classList.add("open");
    });
  });

});

/* Genera el grid de fotos de "clientes felices" a partir de HAPPY_CLIENTS.
   Si un cliente no tiene "foto" todavía, se muestra un ícono de marcador. */
function renderClientPhotos(list){
  return list.map(function(c){
    const inner = c.foto
      ? '<img src="' + c.foto + '" alt="Cliente feliz con su vehículo" style="width:100%;height:100%;object-fit:cover;display:block;">'
      : photoIconSVG();
    return '<div class="team-photo">' + inner + '</div>';
  }).join("");
}

/* Icono de cámara reutilizable para fotos de clientes sin imagen aún */
function photoIconSVG(){
  return '<svg viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="4" y="10" width="40" height="26" rx="4" stroke="#0A0A0A" stroke-width="2.2"/>' +
    '<path d="M16 10L19 5H29L32 10" stroke="#0A0A0A" stroke-width="2.2" stroke-linejoin="round"/>' +
    '<circle cx="24" cy="23" r="7" stroke="#0A0A0A" stroke-width="2.2"/>' +
    '</svg>';
}

/* Icono de auto reutilizable para fotos placeholder */
function carIconSVG(){
  return '<svg viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M6 26L10 14C11 11 13 9 16 9H42C45 9 47.5 11 48.5 14L52 26" stroke="#0A0A0A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M3 26H55C56.5 26 57.5 27.2 57.5 28.5V32C57.5 33.5 56.3 34.5 55 34.5H49" stroke="#0A0A0A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M3 26V32C3 33.5 4.2 34.5 5.5 34.5H9" stroke="#0A0A0A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<line x1="9" y1="34.5" x2="49" y2="34.5" stroke="#0A0A0A" stroke-width="2.5" stroke-linecap="round"/>' +
    '<circle cx="16" cy="34.5" r="5" fill="#FAFAF8" stroke="#0A0A0A" stroke-width="2.5"/>' +
    '<circle cx="44" cy="34.5" r="5" fill="#FAFAF8" stroke="#0A0A0A" stroke-width="2.5"/>' +
    '<line x1="18" y1="18" x2="18" y2="26" stroke="#0A0A0A" stroke-width="2"/>' +
    '<line x1="34" y1="18" x2="34" y2="26" stroke="#0A0A0A" stroke-width="2"/>' +
    '</svg>';
}
