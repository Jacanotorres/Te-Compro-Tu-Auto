/* Conexión con Supabase. La "llave pública" es segura de exponer aquí:
   solo permite insertar filas (ver políticas de seguridad en supabase-setup.sql),
   no leer, editar ni borrar datos. */
const SUPABASE_URL = "https://dwtfuvnlogpzvrcgvbpe.supabase.co";
const SUPABASE_PUBLIC_KEY = "sb_publishable_XFoVvAcR8dhs6ohM0XXVxQ_StUKkL3K";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
