/* =========================================================
   Te Compro Tu Auto — ficha individual de vehículo
   ========================================================= */

function specRow(label, value){
  if(value === undefined || value === null || value === "") return "";
  return "<tr><td>" + label + "</td><td>" + value + "</td></tr>";
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

  const thumbs = Array.from({length:6}).map(function(){ return "<div>" + carIconSVG() + "</div>"; }).join("");

  const extra = (v.accesorios || []).map(function(a){ return "<li>" + a + "</li>"; }).join("");

  const priceBlock = v.oportunidad && v.precioAnterior
    ? '<span class="old" style="display:block;font-size:16px;color:var(--warmgray);text-decoration:line-through;font-weight:700;">' + formatPrice(v.precioAnterior) + '</span>' + formatPrice(v.precio)
    : formatPrice(v.precio);

  let badges = "";
  if(v.vendido) badges += '<span class="tag tag-vendido">Vendido</span>';
  if(v.oportunidad && !v.vendido) badges += '<span class="tag tag-oportunidad">Oportunidad</span>';
  if(v.destacado && !v.vendido) badges += '<span class="tag tag-nuevo">Recién llegado</span>';

  const waText = "Hola, quiero más información del " + v.marca + " " + v.linea + " " + v.modelo + " (placa " + v.placa + ")";

  root.innerHTML =
    '<div class="veh-detail">' +
      '<div>' +
        '<div class="veh-gallery-main">' + carIconSVG() + (v.vendido ? '<div class="vendido-overlay"><span>Vendido</span></div>' : '') + '</div>' +
        '<div class="veh-gallery-thumbs">' + thumbs + '</div>' +
        '<p class="placeholder-note" style="margin-top:14px;">Fotografías de ejemplo. Aquí irán las fotos reales del vehículo.</p>' +

        '<div style="margin-top:44px;">' +
          '<h2 style="font-size:26px;margin-bottom:16px;">Información del vehículo</h2>' +
          '<table class="spec-table">' +
            specRow("Marca", v.marca) +
            specRow("Línea", v.linea) +
            specRow("Versión", v.version) +
            specRow("Modelo", v.modelo) +
            specRow("Kilometraje", formatKm(v.km)) +
            specRow("Transmisión", v.transmision) +
            specRow("Combustible", v.combustible) +
            specRow("Carrocería", v.carroceria) +
            specRow("Puertas", v.puertas) +
            specRow("Capacidad", v.capacidad + " pasajeros") +
            specRow("Color", v.color) +
            specRow("Cilindraje", v.cilindraje) +
            specRow("Tracción", v.traccion) +
            specRow("Número de propietarios", v.propietarios) +
            specRow("Ciudad / Tránsito", v.ciudad) +
            specRow("Placa", v.placa) +
            specRow("SOAT", v.soatVence === "N/A" ? "N/A" : "Vence " + v.soatVence) +
            specRow("Revisión técnico-mecánica", v.tecnoVence === "N/A" ? "N/A" : "Vence " + v.tecnoVence) +
          '</table>' +
        '</div>' +

        (extra ? (
          '<div style="margin-top:36px;">' +
            '<h2 style="font-size:22px;margin-bottom:6px;">Equipamiento y accesorios</h2>' +
            '<ul class="veh-extra-list">' + extra + '</ul>' +
          '</div>'
        ) : "") +
      '</div>' +

      '<aside class="veh-sidebar">' +
        '<div class="veh-badges">' + badges + '</div>' +
        '<h1 style="font-size:26px;margin-bottom:4px;">' + v.marca + ' ' + v.linea + '</h1>' +
        '<p class="veh-price">' + priceBlock + '</p>' +
        (v.vendido
          ? '<p style="margin-top:18px;color:var(--warmgray);">Este vehículo ya fue vendido, pero tenemos otras opciones que pueden interesarte.</p>' +
            '<a class="btn btn-primary" href="inventario.html">Ver vehículos similares</a>'
          : '<h3 style="margin-top:22px;">¿Te interesa este vehículo?</h3>' +
            '<p>Uno de nuestros asesores puede darte más información, enviarte fotos adicionales o ayudarte a programar una visita.</p>' +
            '<a class="btn btn-green" href="' + waLink(waText) + '" target="_blank" rel="noopener">Hablar por WhatsApp</a>' +
            '<a class="btn btn-ghost" href="' + waLink("Hola, quiero programar una visita para ver el " + v.marca + " " + v.linea) + '" target="_blank" rel="noopener">Programar visita</a>'
        ) +
      '</aside>' +
    '</div>';
}

document.addEventListener("DOMContentLoaded", renderVehicleDetail);
