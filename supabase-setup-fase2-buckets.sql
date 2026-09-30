-- Las tablas ya se crearon bien. Solo faltan los buckets de Storage.
-- Corre esto en el SQL Editor (Dashboard -> SQL Editor -> New query -> Run).
-- Si da error en la primera línea, dime exactamente qué dice el error.

insert into storage.buckets (id, name, public)
values ('vehiculos', 'vehiculos', true),
       ('equipo', 'equipo', true),
       ('clientes', 'clientes', true)
on conflict (id) do nothing;

create policy "Lectura publica fotos vehiculos"
  on storage.objects for select
  to public
  using (bucket_id = 'vehiculos');

create policy "Lectura publica fotos equipo"
  on storage.objects for select
  to public
  using (bucket_id = 'equipo');

create policy "Lectura publica fotos clientes"
  on storage.objects for select
  to public
  using (bucket_id = 'clientes');

-- TEMPORAL: deja subir fotos con la llave pública SOLO para poder migrar
-- las ~260 fotos que ya existen en el sitio. Se reemplaza por la política
-- definitiva (solo admin/asesor logueados) al correr
-- "supabase-setup-fase2-cerrar-storage.sql" cuando la migración termine.
create policy "TEMP subida publica de fotos para migracion"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id in ('vehiculos','equipo','clientes'));
