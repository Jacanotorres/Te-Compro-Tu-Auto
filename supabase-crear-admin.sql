-- Asigna el rol de Admin a la cuenta administracion@tecomprotuauto.com.co
-- Correr en el SQL Editor (Dashboard -> SQL Editor -> New query -> Run).
-- Funciona tanto si la fila ya existe (la actualiza) como si no (la crea).

insert into public.profiles (id, role, nombre)
values ('de4ea814-91d2-4bf3-9ebd-ff7aaf622793', 'admin', 'Administración')
on conflict (id) do update set role = excluded.role, nombre = excluded.nombre;
