-- Inmuebles (casas, apartamentos, lotes, locales y fincas) de Te Compro Tu Auto.
-- Se publican y editan desde la pestaña "Inmuebles" del panel (Admin y Asesor),
-- igual que los vehículos. Cualquiera puede verlos en el sitio.
-- Ejecutar UNA vez: Dashboard -> SQL Editor -> New query -> pegar -> Run.

create table public.properties (
  id text primary key,                       -- slug, ej. casa-venta-cali-ciudad-jardin-4821
  tipo text not null check (tipo in ('casa','apartamento','lote','local','finca')),
  operacion text not null check (operacion in ('venta','arriendo')),
  titulo text not null,
  descripcion text,
  ciudad text not null,
  barrio text,                               -- barrio, sector o vereda
  direccion text,                            -- opcional; no se muestra en el sitio
  precio bigint not null,                    -- en arriendo es el valor mensual
  administracion bigint,                     -- cuota de administración mensual (opcional)
  area_m2 numeric not null,                  -- área total (lotes: el área del lote)
  area_construida_m2 numeric,                -- casas, apartamentos, locales y fincas
  habitaciones int,
  banos int,
  parqueaderos int,
  estrato int check (estrato between 1 and 6),
  destacado boolean not null default false,
  fecha_publicacion date not null default current_date,
  updated_at timestamptz not null default now()
);

create table public.property_photos (
  id uuid primary key default gen_random_uuid(),
  property_id text not null references public.properties(id) on delete cascade,
  url text not null,
  posicion int not null default 0
);

alter table public.properties enable row level security;
alter table public.property_photos enable row level security;

create policy "Cualquiera puede ver los inmuebles"
  on public.properties for select
  to anon, authenticated
  using (true);

create policy "Admin y asesor administran los inmuebles"
  on public.properties for all
  to authenticated
  using (get_my_role() in ('admin','asesor'))
  with check (get_my_role() in ('admin','asesor'));

create policy "Cualquiera puede ver las fotos de inmuebles"
  on public.property_photos for select
  to anon, authenticated
  using (true);

create policy "Admin y asesor administran fotos de inmuebles"
  on public.property_photos for all
  to authenticated
  using (get_my_role() in ('admin','asesor'))
  with check (get_my_role() in ('admin','asesor'));

-- Fotos: lectura pública; solo imágenes de hasta 10 MB (el panel las reduce antes de subirlas).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('inmuebles', 'inmuebles', true, 10485760, array['image/*'])
on conflict (id) do nothing;

create policy "Lectura publica inmuebles"
  on storage.objects for select
  to public
  using (bucket_id = 'inmuebles');

create policy "Admin y asesor suben fotos de inmuebles"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'inmuebles' and get_my_role() in ('admin','asesor'));

create policy "Admin y asesor actualizan fotos de inmuebles"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'inmuebles' and get_my_role() in ('admin','asesor'));

create policy "Admin y asesor borran fotos de inmuebles"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'inmuebles' and get_my_role() in ('admin','asesor'));
