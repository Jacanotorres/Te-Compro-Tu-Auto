/* =========================================================
   Te Compro Tu Auto — inmuebles: tarjetas, filtros y ficha
   ========================================================= */

const PROPERTY_TYPES = {
  casa: { singular: "Casa", plural: "Casas" },
  apartamento: { singular: "Apartamento", plural: "Apartamentos" },
  lote: { singular: "Lote", plural: "Lotes" },
  local: { singular: "Local", plural: "Locales" },
  finca: { singular: "Finca", plural: "Fincas" }
};
const PROPERTY_OPERATIONS = { venta: "En venta", arriendo: "En arriendo" };

/* Los textos escritos en el panel se pasan por aquí antes de ir al HTML */
function esc(value){
  return String(value === null || value === undefined ? "" : value)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function houseIconSVG(){
  return '<svg viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M6 24L32 6L58 24" stroke="#6B6B6B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M12 21V42H52V21" stroke="#6B6B6B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M27 42V30H37V42" stroke="#6B6B6B" stroke-width="2.5" stroke-linejoin="round"/>' +
    '</svg>';
}

function propertyTypeLabel(tipo){
  return (PROPERTY_TYPES[tipo] || { singular: tipo }).singular;
}

function propertyLocation(p){
  return [p.barrio, p.ciudad].filter(Boolean).join(", ");  /* texto plano; escapar al insertarlo */
}

/* En arriendo el precio es mensual */
function propertyPriceHTML(p){
  return formatPrice(p.precio) + (p.operacion === "arriendo" ? '<small class="per-month"> / mes</small>' : "");
}

function formatArea(n){
  return Number(n).toLocaleString("es-CO", { maximumFractionDigits: 2 }) + " m²";
}

/* Datos cortos de la tarjeta: solo los que aplican a ese inmueble */
function propertySpecs(p){
  const specs = [];
  const area = p.areaConstruida || p.area;
  if(area) specs.push(formatArea(area) + (p.tipo === "lote" ? " de lote" : ""));
  if(p.habitaciones) specs.push(p.habitaciones + (p.habitaciones === 1 ? " hab." : " hab."));
  if(p.banos) specs.push(p.banos + (p.banos === 1 ? " baño" : " baños"));
  if(p.parqueaderos) specs.push(p.parqueaderos + (p.parqueaderos === 1 ? " parq." : " parq."));
  return specs;
}

function propertyBadges(p){
  let out = '<span class="tag ' + (p.operacion === "venta" ? "tag-nuevo" : "tag-oportunidad") + '">' + PROPERTY_OPERATIONS[p.operacion] + '</span>';
  if(p.destacado) out += '<span class="tag tag-nuevo">Destacado</span>';
  return out;
}

function renderPropertyCard(p){
  const photo = (p.fotos && p.fotos[0])
    ? '<img src="' + p.fotos[0] + '" alt="' + esc(propertyTypeLabel(p.tipo) + ' en ' + propertyLocation(p)) + '" loading="lazy">'
    : houseIconSVG();
  return (
    '<a class="vehicle-card property-card" href="inmueble.html?id=' + encodeURIComponent(p.id) + '">' +
      '<div class="vehicle-photo">' +
        '<div class="vehicle-badges">' + propertyBadges(p) + '</div>' +
        photo +
      '</div>' +
      '<div class="vehicle-body">' +
        '<p class="property-type">' + propertyTypeLabel(p.tipo) + '</p>' +
        '<h3>' + esc(p.titulo) + '</h3>' +
        '<p class="property-place">' + esc(propertyLocation(p)) + '</p>' +
        '<p class="price">' + propertyPriceHTML(p) + '</p>' +
        '<div class="vehicle-specs">' + propertySpecs(p).map(function(s){ return '<span>' + s + '</span>'; }).join("") + '</div>' +
        '<div class="vehicle-actions">' +
          '<span class="btn btn-primary btn-sm" style="pointer-events:none;">Ver inmueble</span>' +
        '</div>' +
      '</div>' +
    '</a>'
  );
}

function renderPropertyGrid(container, list, emptyText){
  if(!container) return;
  if(list.length === 0){
    container.innerHTML = '<div class="empty-state">' + (emptyText || "No encontramos inmuebles con esos filtros. Intenta ajustarlos o escríbenos por WhatsApp y te ayudamos a buscar.") + '</div>';
    return;
  }
  container.innerHTML = list.map(renderPropertyCard).join("");
}

/* ---------- Página de inmuebles ---------- */
async function initPropertiesPage(){
  const grid = document.getElementById("property-grid");
  if(!grid) return;

  grid.innerHTML = '<div class="empty-state">Cargando inmuebles...</div>';
  const all = await fetchProperties();

  const els = {
    operacion: document.getElementById("p-operacion"),
    tipo: document.getElementById("p-tipo"),
    ciudad: document.getElementById("p-ciudad"),
    precioMin: document.getElementById("p-precio-min"),
    precioMax: document.getElementById("p-precio-max"),
    habitaciones: document.getElementById("p-habitaciones"),
    areaMin: document.getElementById("p-area-min"),
    sort: document.getElementById("p-sort"),
    reset: document.getElementById("p-reset"),
    count: document.getElementById("p-count")
  };
  const chips = document.getElementById("type-chips");

  /* Solo se ofrecen los tipos y las ciudades que de verdad tienen inmuebles */
  const tiposPresentes = Object.keys(PROPERTY_TYPES).filter(function(t){
    return all.some(function(p){ return p.tipo === t; });
  });
  els.tipo.innerHTML = '<option value="">Todos los tipos</option>' + tiposPresentes.map(function(t){
    return '<option value="' + t + '">' + PROPERTY_TYPES[t].plural + '</option>';
  }).join("");
  els.ciudad.innerHTML = '<option value="">Todas las ciudades</option>' +
    uniqueSorted(all.map(function(p){ return p.ciudad; })).map(function(c){ return '<option value="' + esc(c) + '">' + esc(c) + '</option>'; }).join("");

  function renderChips(){
    if(!chips) return;
    const current = els.tipo.value;
    const items = [{ value: "", label: "Todos" }].concat(tiposPresentes.map(function(t){
      return { value: t, label: PROPERTY_TYPES[t].plural };
    }));
    chips.innerHTML = items.map(function(i){
      return '<button type="button" class="chip' + (i.value === current ? " active" : "") + '" data-tipo="' + i.value + '" aria-pressed="' + (i.value === current) + '">' + i.label + '</button>';
    }).join("");
  }

  function applyFilters(){
    const f = {
      operacion: els.operacion.value,
      tipo: els.tipo.value,
      ciudad: els.ciudad.value,
      precioMin: parseFloat(els.precioMin.value) || null,
      precioMax: parseFloat(els.precioMax.value) || null,
      habitaciones: parseInt(els.habitaciones.value, 10) || null,
      areaMin: parseFloat(els.areaMin.value) || null
    };
    let list = all.filter(function(p){
      if(f.operacion && p.operacion !== f.operacion) return false;
      if(f.tipo && p.tipo !== f.tipo) return false;
      if(f.ciudad && p.ciudad !== f.ciudad) return false;
      if(f.precioMin && p.precio < f.precioMin) return false;
      if(f.precioMax && p.precio > f.precioMax) return false;
      if(f.habitaciones && (p.habitaciones || 0) < f.habitaciones) return false;
      if(f.areaMin && (p.area || 0) < f.areaMin) return false;
      return true;
    });

    switch(els.sort.value){
      case "precio-asc": list.sort(function(a, b){ return a.precio - b.precio; }); break;
      case "precio-desc": list.sort(function(a, b){ return b.precio - a.precio; }); break;
      case "area-desc": list.sort(function(a, b){ return (b.area || 0) - (a.area || 0); }); break;
      default: list.sort(function(a, b){ return new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion); });
    }

    renderPropertyGrid(grid, list, all.length === 0
      ? "Pronto publicaremos inmuebles aquí. Escríbenos por WhatsApp y te contamos qué tenemos disponible."
      : null);
    els.count.textContent = list.length + (list.length === 1 ? " inmueble disponible" : " inmuebles disponibles");
    renderChips();
  }

  /* En celular los filtros vienen plegados; este botón los muestra/oculta */
  const filtersToggle = document.getElementById("filters-toggle");
  const searchPanel = document.getElementById("search-panel");
  if(filtersToggle && searchPanel){
    filtersToggle.addEventListener("click", function(){
      const open = searchPanel.classList.toggle("open");
      filtersToggle.setAttribute("aria-expanded", open ? "true" : "false");
      filtersToggle.querySelector("span").textContent = open ? "Ocultar filtros" : "Filtrar y buscar";
    });
  }

  ["operacion","tipo","ciudad","precioMin","precioMax","habitaciones","areaMin","sort"].forEach(function(key){
    els[key].addEventListener("input", applyFilters);
    els[key].addEventListener("change", applyFilters);
  });

  if(chips){
    chips.addEventListener("click", function(e){
      const btn = e.target.closest("[data-tipo]");
      if(!btn) return;
      els.tipo.value = btn.getAttribute("data-tipo");
      applyFilters();
    });
  }

  els.reset.addEventListener("click", function(){
    ["operacion","tipo","ciudad","precioMin","precioMax","habitaciones","areaMin"].forEach(function(key){ els[key].value = ""; });
    applyFilters();
  });

  /* Prefiltros vía URL: ?tipo=lote&operacion=venta&ciudad=Cali */
  const params = new URLSearchParams(window.location.search);
  ["operacion","tipo","ciudad"].forEach(function(key){
    if(params.get(key)) els[key].value = params.get(key);
  });
  applyFilters();
}

/* ---------- Sección de inmuebles en el inicio ---------- */
async function initHomeProperties(){
  const grid = document.getElementById("inmuebles-grid");
  if(!grid) return;
  const all = await fetchProperties();
  /* Sin inmuebles publicados, el inicio no muestra la sección */
  const list = all.slice().sort(function(a, b){
    return (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0);
  }).slice(0, 4);
  if(list.length === 0) return;
  renderPropertyGrid(grid, list);
  grid.closest("section").hidden = false;
}

/* ---------- Ficha de un inmueble ---------- */
function specRowP(label, value){
  if(value === undefined || value === null || value === "") return "";
  return "<tr><td>" + label + "</td><td>" + value + "</td></tr>";
}

async function renderPropertyDetail(){
  const root = document.getElementById("property-detail");
  if(!root) return;

  root.innerHTML = '<div class="empty-state">Cargando inmueble...</div>';

  const id = new URLSearchParams(window.location.search).get("id");
  const p = id ? await fetchPropertyById(id) : null;

  if(!p){
    root.innerHTML =
      '<div class="empty-state">' +
        '<h2 style="margin-bottom:10px;">No encontramos este inmueble</h2>' +
        '<p style="margin-bottom:20px;">Puede que ya no esté disponible. Explora el resto de nuestros inmuebles.</p>' +
        '<a class="btn btn-primary" href="inmuebles.html">Ver inmuebles</a>' +
      '</div>';
    return;
  }

  const tipo = propertyTypeLabel(p.tipo);
  const lugar = propertyLocation(p);
  document.title = p.titulo + " — Te Compro Tu Auto";

  const fotos = p.fotos || [];
  const galleryHTML = fotos.length > 0
    ? '<div class="veh-gallery-main"><img id="veh-main-photo" src="' + fotos[0] + '" alt="' + esc(p.titulo) + '"></div>' +
      (fotos.length > 1
        ? '<div class="veh-gallery-thumbs">' + fotos.map(function(src, i){
            return '<div class="' + (i === 0 ? "active" : "") + '" data-src="' + src + '"><img src="' + src + '" alt="' + esc(p.titulo) + ' foto ' + (i + 1) + '" loading="lazy"></div>';
          }).join("") + '</div>'
        : "")
    : '<div class="veh-gallery-main">' + houseIconSVG() + '</div>' +
      '<p class="placeholder-note" style="margin-top:14px;">Fotografías próximamente.</p>';

  const quick = [];
  const areaMain = p.areaConstruida || p.area;
  if(areaMain) quick.push(formatArea(areaMain));
  if(p.habitaciones) quick.push(p.habitaciones + " hab.");
  if(p.banos) quick.push(p.banos + (p.banos === 1 ? " baño" : " baños"));
  if(p.parqueaderos) quick.push(p.parqueaderos + " parq.");
  const quickHTML = '<div class="veh-quick-specs">' + quick.map(function(s){ return "<span>" + s + "</span>"; }).join("") + '</div>';

  const priceHTML = '<div class="veh-price-wrap"><span class="veh-price">' + propertyPriceHTML(p) + '</span>' +
    (p.administracion ? '<span class="property-admin">Administración: ' + formatPrice(p.administracion) + ' / mes</span>' : "") + '</div>';

  const waText = "Hola, quiero más información del inmueble \"" + p.titulo + "\" (" + tipo + " " + PROPERTY_OPERATIONS[p.operacion].toLowerCase() + " en " + lugar + ")";
  const descripcion = p.descripcion
    ? '<div style="margin-top:44px;"><h2 style="font-size:20px;margin-bottom:16px;">Descripción</h2><p class="property-description"></p></div>'
    : "";

  root.innerHTML =
    '<div class="veh-detail">' +
      '<div>' +
        galleryHTML +
        '<div class="veh-mobile-summary">' +
          '<div class="veh-badges">' + propertyBadges(p) + '</div>' +
          '<p class="veh-mobile-title">' + esc(p.titulo) + '</p>' +
          '<p class="property-place">' + tipo + ' · ' + esc(lugar) + '</p>' +
          quickHTML + priceHTML +
        '</div>' +
        descripcion +
        '<div style="margin-top:44px;">' +
          '<h2 style="font-size:20px;margin-bottom:16px;">Características</h2>' +
          '<table class="spec-table">' +
            specRowP("Tipo", tipo) +
            specRowP("Operación", PROPERTY_OPERATIONS[p.operacion]) +
            specRowP("Ciudad", esc(p.ciudad)) +
            specRowP("Barrio / sector", esc(p.barrio)) +
            specRowP(p.tipo === "lote" ? "Área del lote" : "Área total", p.area ? formatArea(p.area) : "") +
            specRowP("Área construida", p.areaConstruida ? formatArea(p.areaConstruida) : "") +
            specRowP("Habitaciones", p.habitaciones) +
            specRowP("Baños", p.banos) +
            specRowP("Parqueaderos", p.parqueaderos) +
            specRowP("Estrato", p.estrato) +
            specRowP("Administración", p.administracion ? formatPrice(p.administracion) + " / mes" : "") +
          '</table>' +
        '</div>' +
      '</div>' +

      '<aside class="veh-sidebar">' +
        '<div class="veh-badges">' + propertyBadges(p) + '</div>' +
        '<h1 style="font-size:20px;margin-bottom:6px;">' + esc(p.titulo) + '</h1>' +
        '<p class="property-place" style="margin-bottom:10px;">' + tipo + ' · ' + esc(lugar) + '</p>' +
        quickHTML + priceHTML +
        '<p class="veh-cta-line">¿Te interesa este inmueble? Escríbenos ahora.</p>' +
        '<a class="btn btn-green" href="' + waLink(waText) + '" target="_blank" rel="noopener">Hablar por WhatsApp</a>' +
        '<a class="btn btn-ghost" href="' + waLink("Hola, quiero programar una visita al inmueble \"" + p.titulo + "\" en " + lugar) + '" target="_blank" rel="noopener">Programar visita</a>' +
        '<p style="margin-top:16px;margin-bottom:0;font-size:13.5px;">Uno de nuestros asesores puede darte más información, enviarte fotos adicionales o coordinar una visita.</p>' +
      '</aside>' +
    '</div>';

  /* La descripción se inserta como texto (conserva saltos de línea, sin interpretar HTML) */
  const desc = root.querySelector(".property-description");
  if(desc) desc.textContent = p.descripcion;

  if(fotos.length > 1){
    const mainPhoto = document.getElementById("veh-main-photo");
    const thumbs = Array.from(root.querySelectorAll(".veh-gallery-thumbs div"));
    let current = 0;

    function goTo(i){
      current = (i + fotos.length) % fotos.length;
      mainPhoto.src = fotos[current];
      thumbs.forEach(function(t, idx){ t.classList.toggle("active", idx === current); });
      thumbs[current].scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    }
    thumbs.forEach(function(thumb, idx){
      thumb.addEventListener("click", function(){ goTo(idx); });
    });

    /* En celular: deslizar la foto principal a izquierda o derecha */
    const stage = root.querySelector(".veh-gallery-main");
    let startX = null;
    stage.addEventListener("touchstart", function(e){ startX = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener("touchend", function(e){
      if(startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      startX = null;
      if(Math.abs(dx) > 40) goTo(current + (dx < 0 ? 1 : -1));
    });
  }

  /* Barra fija abajo en celular: precio + WhatsApp siempre a la mano */
  const sticky = document.createElement("div");
  sticky.className = "veh-sticky-cta";
  sticky.innerHTML =
    '<div class="veh-sticky-price"><small>' + tipo + ' · ' + esc(p.ciudad) + '</small><strong>' + propertyPriceHTML(p) + '</strong></div>' +
    '<a class="btn btn-green" href="' + waLink(waText) + '" target="_blank" rel="noopener">WhatsApp</a>';
  document.body.appendChild(sticky);
  document.body.classList.add("has-sticky-cta");
}

document.addEventListener("DOMContentLoaded", function(){
  initPropertiesPage();
  initHomeProperties();
  renderPropertyDetail();
});
