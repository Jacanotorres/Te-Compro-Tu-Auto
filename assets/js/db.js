/* =========================================================
   Te Compro Tu Auto — acceso a los datos (Supabase)
   Reemplaza los arreglos estáticos VEHICLES/TEAM/HAPPY_CLIENTS
   de data.js: ahora el inventario, el equipo y los clientes
   felices se leen (y se administran desde panel.html) en Supabase.
   ========================================================= */

/* Convierte una fila de la tabla "vehicles" (+ sus vehicle_photos)
   al mismo formato de objeto que usaban catalog.js y vehiculo.js
   cuando los vehículos vivían en el arreglo VEHICLES. */
function normalizeVehicle(row){
  const fotos = (row.vehicle_photos || [])
    .slice()
    .sort(function(a, b){ return a.posicion - b.posicion; })
    .map(function(p){ return p.url; });
  return {
    id: row.id,
    marca: row.marca,
    linea: row.linea,
    version: row.version,
    modelo: row.modelo,
    precio: row.precio,
    precioAnterior: row.precio_anterior,
    km: row.km,
    combustible: row.combustible,
    color: row.color,
    cilindraje: row.cilindraje,
    placa: row.placa,
    soatVence: row.soat_vence,
    tecnoVence: row.tecno_vence,
    destacado: row.destacado,
    oportunidad: row.oportunidad,
    fechaIngreso: row.fecha_ingreso,
    fotos: fotos
  };
}

async function fetchVehicles(){
  const { data, error } = await supabaseClient
    .from("vehicles")
    .select("*, vehicle_photos(url, posicion)")
    .order("fecha_ingreso", { ascending: false });
  if(error){
    console.error("Error cargando el inventario:", error);
    return [];
  }
  return data.map(normalizeVehicle);
}

async function fetchVehicleById(id){
  const { data, error } = await supabaseClient
    .from("vehicles")
    .select("*, vehicle_photos(url, posicion)")
    .eq("id", id)
    .maybeSingle();
  if(error || !data){
    if(error) console.error("Error cargando el vehículo:", error);
    return null;
  }
  return normalizeVehicle(data);
}

async function fetchTeam(){
  const { data, error } = await supabaseClient
    .from("team")
    .select("*")
    .order("orden", { ascending: true });
  if(error){
    console.error("Error cargando el equipo:", error);
    return [];
  }
  return data;
}

async function fetchHappyClients(){
  const { data, error } = await supabaseClient
    .from("happy_clients")
    .select("*")
    .order("orden", { ascending: true });
  if(error){
    console.error("Error cargando clientes felices:", error);
    return [];
  }
  return data.map(function(c){ return { foto: c.foto }; });
}
