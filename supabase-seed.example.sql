-- Execute depois de criar a organização e de cadastrar a conta inicial em Supabase Auth.
-- Substitua os UUIDs por valores reais. Este seed fornece perfis de acesso sugeridos.
insert into public.organizations (id, name)
values ('11111111-1111-4111-8111-111111111111', 'Caravana de Natal')
on conflict (id) do nothing;

insert into public.roles (organization_id, name, permissions) values
('11111111-1111-4111-8111-111111111111', 'Administrador', array['*']),
('11111111-1111-4111-8111-111111111111', 'Operação', array['dashboard.view','fleet.view','fleet.manage','routes.view','routes.manage','drivers.view','drivers.manage','incidents.view','incidents.manage','reports.view']),
('11111111-1111-4111-8111-111111111111', 'Manutenção', array['dashboard.view','fleet.view','fleet.manage','maintenance.view','maintenance.manage','incidents.view','incidents.manage']),
('11111111-1111-4111-8111-111111111111', 'Visualização', array['dashboard.view','fleet.view','routes.view','drivers.view','incidents.view','maintenance.view','reports.view']),
('11111111-1111-4111-8111-111111111111', 'Motorista', array['dashboard.view','routes.view']),
('11111111-1111-4111-8111-111111111111', 'Central de Emergência', array['emergency.view','emergency.manage']),
('11111111-1111-4111-8111-111111111111', 'Despachante', array['emergency.view']),
('11111111-1111-4111-8111-111111111111', 'Equipe de Campo', array['emergency.view'])
on conflict (organization_id, name) do update set permissions = excluded.permissions;

-- Depois de criar o primeiro usuário em Authentication > Users, substitua o UUID
-- pelo ID do usuário e associe o perfil de administrador:
-- insert into public.profiles (id, organization_id, role_id, full_name)
-- select 'UUID-DO-USUARIO-AUTH', '11111111-1111-4111-8111-111111111111', id, 'Administrador da operação'
-- from public.roles where organization_id = '11111111-1111-4111-8111-111111111111' and name = 'Administrador';
