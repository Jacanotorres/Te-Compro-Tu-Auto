/* =========================================================
   Te Compro Tu Auto — ficha individual de vehículo
   ========================================================= */

function specRow(label, value){
  if(value === undefined || value === null || value === "") return "";
  return "<tr><td>" + label + "</td><td>" + value + "</td></tr>";
}

function vigenciaLabel(value){
  if(value === "N/A") return "N/A";
  if(value === "VENCIDO") return '<span style="color:var(--red);font-weight:800;">Vencido</span>';
  return "Vence " + value;
}

function renderVehicleDetail(){
  const root = document.getElementById("vehicle-detail");
  if(!root) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const v = id ? getVehicleById(id) : null;

  if(!v){
    root.innerHTML =
      '<div class="empty-state">' +
        '<h2 style="margin-bottom:10px;">No encontramos este vehículo</h2>' +
        '<p style="margin-bottom:20px;">Puede que ya no esté disponible. Explora el resto de nuestro inventario.</p>' +
        '<a class="btn btn-primary" href="inventario.html">Ver inventario</a>' +
      '</div>';
    return;
  }

  document.title = v.marca + " " + v.linea + " — Te Compro Tu Auto";

  const fotos = v.fotos || [];
  const galleryHTML = fotos.length > 0
    ? '<div class="veh-gallery-main"><img id="veh-main-photo" src="' + fotos[0] + '" alt="' + v.marca + ' ' + v.linea + '"></div>' +
      (fotos.length > 1
        ? '<div class="veh-gallery-thumbs">' + fotos.map(function(src, i){
            return '<div class="' + (i === 0 ? "active" : "") + '" data-src="' + src + '"><img src="' + src + '" alt="' + v.marca + ' ' + v.linea + ' foto ' + (i + 1) + '" loading="lazy"></div>';
          }).join("") + '</div>'
        : "")
    : '<div class="veh-gallery-main">' + carIconSVG() + '</div>' +
      '<div class="veh-gallery-thumbs">' + Array.from({length:6}).map(function(){ return "<div>" + carIconSVG() + "</div>"; }).join("") + '</div>' +
      '<p class="placeholder-note" style="margin-top:14px;">Fotografías de ejemplo. Aquí irán las fotos reales del vehículo.</p>';

  const oldPriceHTML = (v.oportunidad && v.precioAnterior)
    ? '<span class="old">' + formatPrice(v.precioAnterior) + '</span>'
    : "";

  let badges = "";
  if(v.oportunidad) badges += '<span class="tag tag-oportunidad">Oportunidad</span>';
  if(v.destacado) badges += '<span class="tag tag-nuevo">Recién llegado</span>';

  const waText = "Hola, quiero más información del " + v.marca + " " + v.linea + " " + v.modelo + " (placa " + v.placa + ")";

  root.innerHTML =
    '<div class="veh-detail">' +
      '<div>' +
        galleryHTML +

        '<div style="margin-top:44px;">' +
          '<h2 style="font-size:26px;margin-bottom:16px;">Información del vehículo</h2>' +
          '<table class="spec-table">' +
            specRow("Marca", v.marca) +
            specRow("Línea", v.linea) +
            specRow("Versión", v.version) +
            specRow("Modelo", v.modelo) +
            specRow("Kilometraje", formatKm(v.km)) +
            specRow("Combustible", v.combustible) +
            specRow("Color", v.color) +
            specRow("Cilindraje", v.cilindraje) +
            specRow("Placa", v.placa) +
            specRow("SOAT", vigenciaLabel(v.soatVence)) +
            specRow("Revisión técnico-mecánica", vigenciaLabel(v.tecnoVence)) +
          '</table>' +
        '</div>' +
      '</div>' +

      '<aside class="veh-sidebar">' +
        '<div class="veh-badges">' + badges + '</div>' +
        '<h1 style="font-size:26px;margin-bottom:4px;">' + v.marca + ' ' + v.linea + '</h1>' +
        '<div class="veh-quick-specs">' +
          '<span>' + v.modelo + '</span>' +
          '<span>' + formatKm(v.km) + '</span>' +
          '<span>' + v.combustible + '</span>' +
          '<span>' + v.color + '</span>' +
        '</div>' +
        '<div class="veh-price-wrap">' + oldPriceHTML + '<span class="veh-price">' + formatPrice(v.precio) + '</span></div>' +
        '<p class="veh-cta-line">¿Te interesa este vehículo? Escríbenos ahora.</p>' +
        '<a class="btn btn-green" href="' + waLink(waText) + '" target="_blank" rel="noopener">Hablar por WhatsApp</a>' +
        '<a class="btn btn-ghost" href="' + waLink("Hola, quiero programar una visita para ver el " + v.marca + " " + v.linea) + '" target="_blank" rel="noopener">Programar visita</a>' +
        '<p style="margin-top:16px;margin-bottom:0;font-size:13.5px;">Uno de nuestros asesores puede darte más información, enviarte fotos adicionales o ayudarte a programar una visita.</p>' +
      '</aside>' +
    '</div>';

  if(fotos.length > 1){
    const mainPhoto = document.getElementById("veh-main-photo");
    root.querySelectorAll(".veh-gallery-thumbs div").forEach(function(thumb){
      thumb.addEventListener("click", function(){
        mainPhoto.src = thumb.getAttribute("data-src");
        root.querySelectorAll(".veh-gallery-thumbs div").forEach(function(t){ t.classList.remove("active"); });
        thumb.classList.add("active");
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", renderVehicleDetail);
