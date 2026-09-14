/* =========================================================
   Te Compro Tu Auto — catálogo: tarjetas, filtros, orden
   ========================================================= */

function vehicleBadges(v){
  let out = "";
  if(v.oportunidad) out += '<span class="tag tag-oportunidad">Oportunidad</span>';
  if(v.destacado) out += '<span class="tag tag-nuevo">Recién llegado</span>';
  return out;
}

function renderVehicleCard(v){
  const badges = vehicleBadges(v);
  const priceBlock = v.oportunidad && v.precioAnterior
    ? '<span class="old">' + formatPrice(v.precioAnterior) + '</span>' + formatPrice(v.precio)
    : formatPrice(v.precio);
  return (
    '<a class="vehicle-card" href="vehiculo.html?id=' + v.id + '">' +
      '<div class="vehicle-photo">' +
        '<div class="vehicle-badges">' + badges + '</div>' +
        carIconSVG() +
      '</div>' +
      '<div class="vehicle-body">' +
        '<h3>' + v.marca + ' ' + v.linea + '</h3>' +
        '<p class="price">' + priceBlock + '</p>' +
        '<div class="vehicle-specs">' +
          '<span>' + v.modelo + '</span>' +
          '<span>' + formatKm(v.km) + '</span>' +
          '<span>' + v.transmision + '</span>' +
          '<span>' + v.ciudad + '</span>' +
        '</div>' +
        '<div class="vehicle-actions">' +
          '<span class="btn btn-primary btn-sm" style="pointer-events:none;">Ver vehículo</span>' +
        '</div>' +
      '</div>' +
    '</a>'
  );
}

function renderGrid(container, vehicles){
  if(!container) return;
  if(vehicles.length === 0){
    container.innerHTML = '<div class="empty-state">No encontramos vehículos con esos filtros. Intenta ajustarlos o escríbenos por WhatsApp y te ayudamos a buscar.</div>';
    return;
  }
  container.innerHTML = vehicles.map(renderVehicleCard).join("");
}

function uniqueSorted(list){
  return Array.from(new Set(list)).sort(function(a,b){ return String(a).localeCompare(String(b), "es"); });
}

function fillSelect(select, values, placeholder){
  if(!select) return;
  select.innerHTML = '<option value="">' + placeholder + '</option>' +
    values.map(function(v){ return '<option value="' + v + '">' + v + '</option>'; }).join("");
}

/* ---------- Página de inventario ---------- */
function initInventoryPage(){
  const grid = document.getElementById("vehicle-grid");
  if(!grid) return;

  const disponibles = VEHICLES;

  const els = {
    marca: document.getElementById("f-marca"),
    linea: document.getElementById("f-linea"),
    anio: document.getElementById("f-anio"),
    precioMin: document.getElementById("f-precio-min"),
    precioMax: document.getElementById("f-precio-max"),
    km: document.getElementById("f-km"),
    carroceria: document.getElementById("f-carroceria"),
    combustible: document.getElementById("f-combustible"),
    transmision: document.getElementById("f-transmision"),
    ciudad: document.getElementById("f-ciudad"),
    color: document.getElementById("f-color"),
    sort: document.getElementById("f-sort"),
    reset: document.getElementById("f-reset"),
    count: document.getElementById("results-count")
  };

  fillSelect(els.marca, uniqueSorted(disponibles.map(function(v){ return v.marca; })), "Todas las marcas");
  fillSelect(els.carroceria, uniqueSorted(disponibles.map(function(v){ return v.carroceria; })), "Todos los tipos");
  fillSelect(els.combustible, uniqueSorted(disponibles.map(function(v){ return v.combustible; })), "Todos");
  fillSelect(els.transmision, uniqueSorted(disponibles.map(function(v){ return v.transmision; })), "Todas");
  fillSelect(els.ciudad, uniqueSorted(disponibles.map(function(v){ return v.ciudad; })), "Todas las ciudades");
  fillSelect(els.color, uniqueSorted(disponibles.map(function(v){ return v.color; })), "Todos los colores");

  function currentFilters(){
    return {
      marca: els.marca.value,
      linea: (els.linea.value || "").trim().toLowerCase(),
      anio: els.anio.value,
      precioMin: parseFloat(els.precioMin.value) || null,
      precioMax: parseFloat(els.precioMax.value) || null,
      km: parseFloat(els.km.value) || null,
      carroceria: els.carroceria.value,
      combustible: els.combustible.value,
      transmision: els.transmision.value,
      ciudad: els.ciudad.value,
      color: els.color.value
    };
  }

  function applyFilters(){
    const f = currentFilters();
    let list = disponibles.filter(function(v){
      if(f.marca && v.marca !== f.marca) return false;
      if(f.linea && v.linea.toLowerCase().indexOf(f.linea) === -1) return false;
      if(f.anio && String(v.modelo) !== f.anio) return false;
      if(f.precioMin && v.precio < f.precioMin) return false;
      if(f.precioMax && v.precio > f.precioMax) return false;
      if(f.km && v.km > f.km) return false;
      if(f.carroceria && v.carroceria !== f.carroceria) return false;
      if(f.combustible && v.combustible !== f.combustible) return false;
      if(f.transmision && v.transmision !== f.transmision) return false;
      if(f.ciudad && v.ciudad !== f.ciudad) return false;
      if(f.color && v.color !== f.color) return false;
      return true;
    });

    const sortKey = els.sort.value;
    list = list.slice().sort(function(a,b){
      switch(sortKey){
        case "precio-asc": return a.precio - b.precio;
        case "precio-desc": return b.precio - a.precio;
        case "km-asc": return a.km - b.km;
        case "km-desc": return b.km - a.km;
        default: return new Date(b.fechaIngreso) - new Date(a.fechaIngreso);
      }
    });

    renderGrid(grid, list);
    if(els.count) els.count.textContent = list.length + (list.length === 1 ? " vehículo disponible" : " vehículos disponibles");
  }

  Object.keys(els).forEach(function(key){
    const el = els[key];
    if(!el || key === "reset" || key === "count") return;
    el.addEventListener("input", applyFilters);
    el.addEventListener("change", applyFilters);
  });

  if(els.reset){
    els.reset.addEventListener("click", function(){
      Object.keys(els).forEach(function(key){
        const el = els[key];
        if(!el || key === "reset" || key === "count") return;
        el.value = "";
      });
      applyFilters();
    });
  }

  /* Prefiltros vía URL */
  const params = new URLSearchParams(window.location.search);
  if(params.get("tipo") === "oportunidad"){
    renderGrid(grid, disponibles.filter(function(v){ return v.oportunidad; }));
    if(els.count) els.count.textContent = "Mostrando vehículos con precio especial";
    return;
  }
  if(params.get("marca")) els.marca.value = params.get("marca");
  if(params.get("carroceria")) els.carroceria.value = params.get("carroceria");
  if(params.get("ciudad")) els.ciudad.value = params.get("ciudad");
  if(params.get("precioMax")) els.precioMax.value = params.get("precioMax");
  applyFilters();
}

/* ---------- Widgets de inicio ---------- */
function initHomeWidgets(){
  const recientes = document.getElementById("recientes-grid");
  if(recientes){
    const list = VEHICLES.slice()
      .sort(function(a,b){ return new Date(b.fechaIngreso) - new Date(a.fechaIngreso); })
      .slice(0,8);
    renderGrid(recientes, list);
  }
  const oportunidades = document.getElementById("oportunidades-grid");
  if(oportunidades){
    const list = VEHICLES.filter(function(v){ return v.oportunidad; }).slice(0,6);
    renderGrid(oportunidades, list);
  }
}

document.addEventListener("DOMContentLoaded", function(){
  initInventoryPage();
  initHomeWidgets();
});
