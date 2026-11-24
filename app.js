/*
  Configure o projeto Supabase em supabase-config.js (copie o arquivo de exemplo).
  A persistência remota usa a chave anon/publishable; nunca coloque a chave service_role
  no navegador. Crie a tabela `vehicles` com o SQL descrito em supabase-schema.sql.
*/
const initialVehicles = [
  { id: 'v-01', name: 'Caravana 01', plate: 'FBC-2A41', type: 'Carreta iluminada', driver: 'Rafael Mendes', route: 'Centro — Paulista', status: 'Em rota', nextStop: 'Av. Paulista, 1000', nextTime: '14:32', updated: 'há 20 seg', initials: 'RM', avatar: 'alt-one' },
  { id: 'v-02', name: 'Caravana 02', plate: 'GHT-8B26', type: 'Carreta iluminada', driver: 'Juliana Ferreira', route: 'Moema — Ibirapuera', status: 'Em rota', nextStop: 'Parque Ibirapuera', nextTime: '14:40', updated: 'há 1 min', initials: 'JF', avatar: '' },
  { id: 'v-03', name: 'Caravana 03', plate: 'EJK-4C73', type: 'Caminhão', driver: 'Marcos Oliveira', route: 'Pinheiros — Vila Madalena', status: 'Disponível', nextStop: 'Base operacional', nextTime: '—', updated: 'há 4 min', initials: 'MO', avatar: 'alt-two' },
  { id: 'v-04', name: 'Caravana 04', plate: 'DLM-9D15', type: 'Carreta iluminada', driver: 'Camila Santos', route: 'Centro — Liberdade', status: 'Em rota', nextStop: 'Praça da Sé', nextTime: '14:52', updated: 'há 35 seg', initials: 'CS', avatar: '' },
  { id: 'v-05', name: 'Caravana 05', plate: 'FKN-3E82', type: 'Ônibus de apoio', driver: 'Pedro Almeida', route: 'Vila Mariana — Ipiranga', status: 'Em rota', nextStop: 'Museu do Ipiranga', nextTime: '15:08', updated: 'há 2 min', initials: 'PA', avatar: 'alt-one' },
  { id: 'v-06', name: 'Caravana 06', plate: 'GPR-6F39', type: 'Carreta iluminada', driver: 'Ana Ribeiro', route: 'Santa Cecília — Higienópolis', status: 'Manutenção', nextStop: 'Oficina Central', nextTime: '—', updated: 'há 18 min', initials: 'AR', avatar: 'alt-two' },
  { id: 'v-07', name: 'Caravana 07', plate: 'HST-5G64', type: 'Van', driver: 'Lucas Costa', route: 'Jardins — Itaim Bibi', status: 'Disponível', nextStop: 'Base operacional', nextTime: '—', updated: 'há 6 min', initials: 'LC', avatar: '' },
  { id: 'v-08', name: 'Caravana 08', plate: 'KUV-7H91', type: 'Carreta iluminada', driver: 'Beatriz Lima', route: 'Consolação — Bela Vista', status: 'Em rota', nextStop: 'Rua Augusta, 450', nextTime: '15:21', updated: 'há 1 min', initials: 'BL', avatar: 'alt-one' }
];
const initialActivities = [
  { kind: 'moving', icon: '↗', title: 'Caravana 02 iniciou a rota', detail: 'Moema → Parque Ibirapuera', time: 'há 2 min' },
  { kind: 'issue', icon: '!', title: 'Alerta de velocidade · Caravana 05', detail: '82 km/h em via de 60 km/h', time: 'há 18 min' },
  { kind: 'arrived', icon: '⌖', title: 'Parada concluída · Caravana 01', detail: 'Praça Roosevelt · 12 minutos', time: 'há 34 min' },
  { kind: 'maint', icon: '⚒', title: 'Manutenção registrada · Caravana 06', detail: 'Revisão preventiva programada', time: 'há 1 h' }
];
const initialUsers = [
  { name: 'Mariana Costa', email: 'mariana@caravana.com.br', role: 'Administrador', status: 'Ativo' },
  { name: 'Rafael Mendes', email: 'rafael@caravana.com.br', role: 'Operação', status: 'Ativo' },
  { name: 'Paula Nogueira', email: 'paula@caravana.com.br', role: 'Manutenção', status: 'Ativo' },
  { name: 'Diego Martins', email: 'diego@caravana.com.br', role: 'Visualização', status: 'Convite pendente' }
];
const accessGroups = [
  { name: 'Administrador', description: 'Configura operação, usuários, grupos e todos os dados.', permissions: ['Visão geral', 'Frota', 'Rotas', 'Motoristas', 'Ocorrências', 'Manutenção', 'Relatórios', 'Usuários e acessos', 'Configurações'] },
  { name: 'Operação', description: 'Acompanha o mapa e administra veículos, condutores e rotas.', permissions: ['Visão geral', 'Frota', 'Rotas', 'Motoristas', 'Ocorrências', 'Relatórios'] },
  { name: 'Manutenção', description: 'Atualiza veículos, serviços, prazos e disponibilidade.', permissions: ['Visão geral', 'Frota', 'Manutenção', 'Ocorrências'] },
  { name: 'Visualização', description: 'Consulta as informações da operação sem editar.', permissions: ['Visão geral', 'Frota', 'Rotas', 'Relatórios'] },
  { name: 'Motorista', description: 'Consulta somente itinerários publicados atribuídos ao próprio perfil.', permissions: ['Minha rota', 'Navegação externa'] }
];
const emergencyAccessGroups = [
  { name: 'Central de Emergência', description: 'Coordena ambulâncias, viaturas e despacho operacional.', permissions: ['emergency.view','emergency.manage'] },
  { name: 'Despachante', description: 'Acompanha unidades em tempo real e distribui ocorrências.', permissions: ['emergency.view'] },
  { name: 'Equipe de Campo', description: 'Consulta designações e rotas de sua unidade.', permissions: ['emergency.view'] }
];
const groupPermissions = [
  ['dashboard.view', 'Visão geral'], ['fleet.view', 'Consultar frota'], ['fleet.manage', 'Gerenciar frota'],
  ['routes.view', 'Consultar rotas'], ['routes.manage', 'Gerenciar rotas'], ['drivers.view', 'Consultar motoristas'],
  ['drivers.manage', 'Gerenciar motoristas'], ['incidents.view', 'Consultar ocorrências'], ['incidents.manage', 'Gerenciar ocorrências'],
  ['maintenance.view', 'Consultar manutenções'], ['maintenance.manage', 'Gerenciar manutenções'], ['reports.view', 'Consultar relatórios'],
  ['users.manage', 'Gerenciar usuários e grupos'], ['emergency.view', 'Acessar área de emergência'], ['emergency.manage', 'Gerenciar unidades de emergência']
];
function loadGroups() {
  let saved = [];
  try { const value = JSON.parse(localStorage.getItem('rota-grupos-v1')); if (Array.isArray(value)) saved = value; } catch (_) { /* usa os grupos iniciais */ }
  const builtIns = structuredClone([...accessGroups, ...emergencyAccessGroups].map(group => ({ ...group, builtIn: true, id: `group-${group.name.toLocaleLowerCase().replace(/[^a-z0-9]+/g, '-')}`, permissions: group.name === 'Administrador' ? ['*'] : group.permissions })));
  const groups = builtIns.map(base => {
    const previous = saved.find(item => item.name === base.name);
    if (!previous) return base;
    const merged = { ...base, ...previous, builtIn: true };
    if (emergencyAccessGroups.some(group => group.name === base.name)) merged.permissions = previous.permissions?.includes('*') ? base.permissions : (previous.permissions || base.permissions).filter(permission => !['fleet.view','fleet.manage','routes.view','routes.manage','drivers.view','drivers.manage','incidents.view','incidents.manage','dashboard.view','reports.view'].includes(permission));
    return merged;
  });
  return [...groups, ...saved.filter(item => !builtIns.some(base => base.name === item.name))];
}
const initialIncidents = [
  { title: 'Velocidade acima do limite', vehicle: 'Caravana 05', detail: '82 km/h · limite configurado de 60 km/h', priority: 'Alta', status: 'Em aberto', time: '14:18' },
  { title: 'Atraso na parada', vehicle: 'Caravana 08', detail: 'Parada Consolação · 12 minutos de atraso', priority: 'Média', status: 'Em aberto', time: '13:52' },
  { title: 'Parada concluída', vehicle: 'Caravana 01', detail: 'Praça Roosevelt · permanência de 12 minutos', priority: 'Baixa', status: 'Resolvida', time: '13:36' }
];
const initialRoutes = [
  { id: 'route-demo-1', name: 'Caravana Centro', city: 'São Paulo', stateCode: 'SP', serviceDate: '2026-11-21', startTime: '18:00', origin: 'Praça Charles Miller, São Paulo, SP', vehicleId: 'v-01', driver: 'Rafael Mendes', navigationApp: 'waze', status: 'Publicada', version: 2, stops: [
    { name: 'Praça Charles Miller', address: 'Praça Charles Miller, Pacaembu, São Paulo, SP', latitude: -23.5465, longitude: -46.6652, plannedTime: '18:00' },
    { name: 'Avenida Paulista', address: 'Avenida Paulista, 1000, São Paulo, SP', latitude: -23.5631, longitude: -46.6544, plannedTime: '18:45' },
    { name: 'Praça da Sé', address: 'Praça da Sé, São Paulo, SP', latitude: -23.5505, longitude: -46.6333, plannedTime: '19:30' }
  ] },
  { id: 'route-demo-2', name: 'Caravana Ibirapuera', city: 'São Paulo', stateCode: 'SP', serviceDate: '2026-11-22', startTime: '18:30', origin: 'Parque Ibirapuera, São Paulo, SP', vehicleId: 'v-02', driver: 'Juliana Ferreira', navigationApp: 'google', status: 'Rascunho', version: 1, stops: [
    { name: 'Portão 10 do Ibirapuera', address: 'Av. IV Centenário, São Paulo, SP', plannedTime: '18:30' },
    { name: 'Praça Pereira Coutinho', address: 'Praça Pereira Coutinho, São Paulo, SP', plannedTime: '19:10' }
  ] }
];
const initialDrivers = [...new Set(initialVehicles.map(vehicle => vehicle.driver))].map((name, index) => ({ id: `driver-demo-${index + 1}`, full_name: name, phone: '', emergency_contact: '', license_category: '', license_expires_on: '', active: true }));
const STORAGE_KEY = 'rota-frota-v1';
const state = { vehicles: loadVehicles(), drivers: loadDrivers(), users: loadUsers(), groups: loadGroups(), incidents: loadIncidents(), trackingEvents: [], routes: loadRoutes(), filter: 'all', query: '', view: 'visao-geral', editingId: null, editingRouteId: null, editingDriverId: null, editingGroupId: null, sync: 'local', supabase: null, trackingMap: null, traccarTimer: null, role: 'Administrador', permissions: ['*'], organizationId: null, userId: null, driverProfile: null };
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
function loadVehicles() {
  try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); if (Array.isArray(saved)) return saved; } catch (_) { /* usa dados de demonstração */ }
  return structuredClone(initialVehicles);
}
function loadUsers() {
  try { const saved = JSON.parse(localStorage.getItem('rota-usuarios-v1')); if (Array.isArray(saved)) return saved; } catch (_) { /* usa dados de demonstração */ }
  return structuredClone(initialUsers);
}
function loadIncidents() {
  try { const saved = JSON.parse(localStorage.getItem('rota-ocorrencias-v1')); if (Array.isArray(saved)) return saved; } catch (_) { /* usa dados de demonstração */ }
  return structuredClone(initialIncidents);
}
function loadRoutes() {
  try { const saved = JSON.parse(localStorage.getItem('rota-itinerarios-v1')); if (Array.isArray(saved)) return saved; } catch (_) { /* usa dados de demonstração */ }
  return structuredClone(initialRoutes);
}
function loadDrivers() {
  try { const saved = JSON.parse(localStorage.getItem('rota-motoristas-v1')); if (Array.isArray(saved)) return saved; } catch (_) { /* usa dados de demonstração */ }
  return structuredClone(initialDrivers);
}
function saveLocal() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.vehicles)); }
function escapeHtml(value = '') { return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char])); }
function hasPermission(permission) { return state.permissions.includes('*') || state.permissions.includes(permission); }
function initials(name = '') { return name.trim().split(/\s+/).slice(0, 2).map(part => part[0]?.toUpperCase() || '').join(''); }
function statusClass(status) { return status === 'Em rota' ? 'emrota' : status === 'Manutenção' ? 'manutencao' : 'disponivel'; }
function visibleVehicles() {
  const query = state.query.trim().toLocaleLowerCase('pt-BR');
  return state.vehicles.filter(vehicle => vehicle.operationArea !== 'emergencia' && (state.filter === 'all' || vehicle.status === state.filter) && (!query || [vehicle.name, vehicle.plate, vehicle.driver, vehicle.route, vehicle.type].some(value => String(value || '').toLocaleLowerCase('pt-BR').includes(query))));
}
function renderFleet() {
  const rows = visibleVehicles();
  const eventVehicles = state.vehicles.filter(vehicle => vehicle.operationArea !== 'emergencia');
  $('#fleetTableBody').innerHTML = rows.map(vehicle => `<tr>
    <td><div class="vehicle-cell"><span class="vehicle-thumb">▰</span><span><strong>${escapeHtml(vehicle.name)}</strong><small>${escapeHtml(vehicle.plate)} · ${escapeHtml(vehicle.type)}</small></span></div></td>
    <td><div class="driver-cell"><span class="driver-avatar ${escapeHtml(vehicle.avatar || '')}">${escapeHtml(vehicle.initials || initials(vehicle.driver))}</span><strong>${escapeHtml(vehicle.driver || 'Não atribuído')}</strong></div></td>
    <td class="route-cell">${escapeHtml(vehicle.route || 'Rota não definida')}</td>
    <td><span class="status-pill status-${statusClass(vehicle.status)}"><span></span>${escapeHtml(vehicle.status)}</span></td>
    <td class="stop-name">${escapeHtml(vehicle.nextStop || '—')}${vehicle.nextTime && vehicle.nextTime !== '—' ? `<span class="stop-time">Prev. ${escapeHtml(vehicle.nextTime)}</span>` : ''}</td>
    <td class="updated-cell">${escapeHtml(vehicle.updated || 'agora')}</td>
    <td><button class="row-menu" data-edit-vehicle="${escapeHtml(vehicle.id)}" aria-label="Editar ${escapeHtml(vehicle.name)}">···</button></td>
  </tr>`).join('');
  $('#emptyState').classList.toggle('hidden', rows.length > 0);
  $('#tableResultCount').innerHTML = `Mostrando <strong>${rows.length}</strong> de <strong>${eventVehicles.length}</strong> veículos`;
  const count = status => eventVehicles.filter(vehicle => vehicle.status === status).length;
  const running = count('Em rota'), available = count('Disponível'), maintenance = count('Manutenção');
  $('#statTotal').textContent = String(eventVehicles.length).padStart(2, '0');
  $('#statRunning').textContent = String(running).padStart(2, '0');
  $('#statMaintenance').textContent = String(maintenance).padStart(2, '0');
  $('#fleetNavCount').textContent = eventVehicles.length;
  const driverNavCount = $('#driverNavCount'); if (driverNavCount) driverNavCount.textContent = state.drivers.filter(driver => driver.active !== false).length;
  $('#fleetTotalPill').textContent = `${eventVehicles.length} veículos`;
  $('#allFilterCount').textContent = eventVehicles.length;
  $('#routeFilterCount').textContent = running;
  $('#availableFilterCount').textContent = available;
  $('#maintenanceFilterCount').textContent = maintenance;
  const canManageFleet = hasPermission('fleet.manage') || hasPermission('emergency.manage') || hasPermission('maintenance.manage');
  $$('#fleetTableBody [data-edit-vehicle]').forEach(button => button.classList.toggle('permission-hidden', !canManageFleet));
  $$('#activityList .activity-item').forEach((item, index) => item.classList.toggle('hidden', index > 2 && state.view !== 'ocorrencias'));
}
function renderActivities() {
  $('#activityList').innerHTML = initialActivities.map(activity => `<div class="activity-item"><span class="activity-dot ${activity.kind}">${activity.icon}</span><div class="activity-copy"><strong>${activity.title}</strong><span>${activity.detail}</span></div><span class="activity-time">${activity.time}</span></div>`).join('');
}
function renderLiveFleetMap() {
  const canvas = $('#mapCanvas'); if (!canvas) return;
  const liveVehicles = state.vehicles.filter(vehicle => Number.isFinite(Number(vehicle.latitude)) && Number.isFinite(Number(vehicle.longitude)) && vehicle.latitude !== null && vehicle.longitude !== null);
  const staleLimit = Date.now() - 10 * 60 * 1000;
  const fresh = liveVehicles.filter(vehicle => vehicle.positionAt && new Date(vehicle.positionAt).getTime() >= staleLimit);
  const historic = liveVehicles.filter(vehicle => vehicle.positionAt && new Date(vehicle.positionAt).getTime() < staleLimit).sort((a, b) => new Date(b.positionAt) - new Date(a.positionAt));
  const oldMap = canvas.querySelector('.live-map-overlay'); if (oldMap) oldMap.remove();
  const demoMarkers = canvas.querySelectorAll('.vehicle-marker'); demoMarkers.forEach(marker => marker.classList.add('hidden'));
  let status = canvas.parentElement.querySelector('.traccar-map-status');
  if (!status) { status = document.createElement('div'); status.className = 'traccar-map-status'; canvas.append(status); }
  if (!fresh.length) { const minutesOld = historic.length ? Math.max(1, Math.round((Date.now() - new Date(historic[0].positionAt).getTime()) / 60000)) : 0; status.textContent = historic.length ? `Sem posição recente · última posição recebida há ${minutesOld} min.` : 'Mapa ilustrativo · sem posição GPS real. Vincule dispositivos Traccar para acompanhar a frota.'; canvas.classList.add('traccar-unavailable'); const footer = canvas.parentElement.querySelector('.map-footer span:nth-child(2)'); if (footer) footer.textContent = historic.length ? 'Posição GPS desatualizada' : 'Aguardando posição GPS do Traccar'; return; }
  status.remove(); canvas.classList.remove('traccar-unavailable');
  const bounds = { minLat: Math.min(...fresh.map(v => Number(v.latitude))), maxLat: Math.max(...fresh.map(v => Number(v.latitude))), minLng: Math.min(...fresh.map(v => Number(v.longitude))), maxLng: Math.max(...fresh.map(v => Number(v.longitude))) };
  const latSpan = Math.max(bounds.maxLat - bounds.minLat, 0.015); const lngSpan = Math.max(bounds.maxLng - bounds.minLng, 0.015);
  const overlay = document.createElement('div'); overlay.className = 'live-map-overlay'; overlay.setAttribute('aria-label', 'Posições recentes recebidas do Traccar');
  overlay.innerHTML = fresh.map(vehicle => { const x = 12 + (Number(vehicle.longitude) - bounds.minLng) / lngSpan * 76; const y = 14 + (bounds.maxLat - Number(vehicle.latitude)) / latSpan * 70; return `<button class="live-position-marker" style="left:${x}%;top:${y}%" title="${escapeHtml(vehicle.name)} · ${escapeHtml(vehicle.positionAt)}"><span>▰</span><small>${escapeHtml(vehicle.name)}</small></button>`; }).join('');
  canvas.append(overlay);
  const footer = canvas.parentElement.querySelector('.map-footer span:nth-child(2)'); if (footer) footer.textContent = `${fresh.length} veículo(s) com GPS recente do Traccar`;
  const label = canvas.querySelector('.map-label'); if (label && fresh[0]) label.innerHTML = `${escapeHtml(fresh[0].city || 'LOCALIZAÇÃO TRACCAR')} <span>⌖</span>`;
}
function extraPage(title, description, content, action = '') {
  return `<div class="extra-page"><div class="extra-page-heading"><div><div class="date-label"><span class="date-icon">◷</span> CARAVANA DE NATAL · OPERAÇÃO 2026</div><h1>${title}</h1><p>${description}</p></div>${action}</div>${content}</div>`;
}
function renderTrackingPage(emergency = false) {
  const vehicles = state.vehicles.filter(vehicle => emergency ? vehicle.operationArea === 'emergencia' : vehicle.operationArea !== 'emergencia');
  const recent = vehicles.filter(vehicle => vehicle.positionAt && Date.now() - new Date(vehicle.positionAt).getTime() < 10 * 60 * 1000);
  const rows = vehicles.map(vehicle => {
    const age = vehicle.positionAt ? Math.max(0, Math.round((Date.now() - new Date(vehicle.positionAt).getTime()) / 60000)) : null;
    const stateLabel = age == null ? 'Sem sinal' : age > 10 ? `Desatualizada · ${age} min` : 'Ao vivo';
    const destination = vehicle.address || vehicle.nextStop || '—';
    return `<tr><td><div class="vehicle-cell"><span class="vehicle-thumb">${emergency ? '✚' : '▰'}</span><span><strong>${escapeHtml(vehicle.name)}</strong><small>${escapeHtml(vehicle.plate)} · ${escapeHtml(vehicle.type)}</small></span></div></td><td>${escapeHtml(vehicle.driver || 'Condutor não associado')}</td><td><span class="status-pill ${age != null && age <= 10 ? 'status-emrota' : 'status-manutencao'}"><span></span>${escapeHtml(stateLabel)}</span></td><td>${escapeHtml(destination)}</td><td>${vehicle.speedKmh == null ? '—' : `${Math.round(vehicle.speedKmh)} km/h`}</td><td>${vehicle.positionAt ? new Date(vehicle.positionAt).toLocaleString('pt-BR') : '—'}</td></tr>`;
  }).join('');
  queueMicrotask(() => renderTrackingLeaflet(vehicles, emergency));
  return extraPage(emergency ? 'Central de emergência' : 'Rastreamento ao vivo', emergency ? 'Acompanhe unidades de resposta e seus sinais GPS em painel separado da operação de eventos.' : 'Posições recebidas do Traccar para os veículos vinculados à frota.', `<div class="tracking-summary"><article class="stat-card"><div class="stat-top"><span>Unidades</span><span class="stat-icon vehicle-icon">▣</span></div><div class="stat-value">${String(vehicles.length).padStart(2, '0')}</div><div class="stat-bottom"><span class="stat-note">nesta área operacional</span><span class="stat-trend">Frota cadastrada</span></div></article><article class="stat-card"><div class="stat-top"><span>GPS recente</span><span class="stat-icon operation-icon">◉</span></div><div class="stat-value">${String(recent.length).padStart(2, '0')}</div><div class="stat-bottom"><span class="stat-note">posição nos últimos 10 min</span><span class="stat-trend">Traccar</span></div></article><article class="stat-card"><div class="stat-top"><span>Sem sinal / atrasadas</span><span class="stat-icon maintenance-icon">!</span></div><div class="stat-value">${String(vehicles.length - recent.length).padStart(2, '0')}</div><div class="stat-bottom"><span class="stat-note">verifique o dispositivo</span><span class="stat-warning">Acompanhar</span></div></article></div><section class="panel tracking-map-panel"><div class="fleet-header"><div><h2>${emergency ? 'Mapa das unidades de emergência' : 'Mapa de posições recebidas'}</h2><p>As posições recentes aparecem no mapa abaixo.</p></div><span class="fleet-total-pill">${recent.length} atualizados</span></div><div id="trackingMap" class="tracking-map"></div>${recent.length ? '' : '<p class="tracking-map-empty">Aguardando primeira posição GPS. Instale o Traccar Client, configure o servidor HTTPS e inicie o envio.</p>'}</section><section class="panel extra-panel"><div class="fleet-header"><div><h2>${emergency ? 'Ambulâncias, viaturas e resposta' : 'Veículos monitorados'}</h2><p>Estado da conexão, velocidade e última posição registrada.</p></div></div><div class="table-wrap"><table><thead><tr><th>UNIDADE</th><th>CONDUTOR</th><th>SINAL</th><th>LOCAL / PRÓXIMA PARADA</th><th>VELOCIDADE</th><th>ÚLTIMA ATUALIZAÇÃO</th></tr></thead><tbody>${rows || `<tr><td colspan="6">${emergency ? 'Cadastre uma unidade e selecione a área Segurança pública e emergência.' : 'Cadastre veículos para acompanhar.'}</td></tr>`}</tbody></table></div></section><p class="info-note">A operação de emergência usa sua própria aba e grupos de acesso. Localização GPS serve para despacho e coordenação; confirme protocolos, rádio e sistemas oficiais da sua instituição antes de depender deste painel.</p>`);
}
function renderUsersPage() {
  const users = state.users.map(user => `<tr><td><div class="driver-cell"><span class="driver-avatar">${escapeHtml(initials(user.name))}</span><span><strong>${escapeHtml(user.name)}</strong><small>${escapeHtml(user.email)}</small></span></div></td><td><span class="status-pill status-disponivel"><span></span>${escapeHtml(state.groups.find(group => String(group.id) === String(user.groupId))?.name || user.role)}</span></td><td>${user.status === 'Ativo' ? '<span class="status-pill status-emrota"><span></span>Ativo</span>' : '<span class="status-pill status-manutencao"><span></span>Convite pendente</span>'}</td><td><button class="row-menu" aria-label="Ações do usuário">···</button></td></tr>`).join('');
  const groups = state.groups.map(group => { const labels = group.permissions.includes('*') ? ['Todas as permissões'] : group.permissions.map(key => groupPermissions.find(([permission]) => permission === key)?.[1] || key); return `<article class="access-card"><div class="access-card-head"><span class="access-glyph">♧</span><span class="fleet-total-pill">${labels.length} permissões</span></div><h3>${escapeHtml(group.name)}</h3><p>${escapeHtml(group.description || 'Grupo personalizado da operação.')}</p><div class="permission-list">${labels.map(permission => `<span>✓ ${escapeHtml(permission)}</span>`).join('')}</div>${canManageGroups() ? `<button class="secondary-button edit-group-button" data-edit-group="${escapeHtml(group.id)}">Editar grupo</button>${group.builtIn || state.users.some(user => String(user.groupId) === String(group.id) || user.role === group.name) ? '' : `<button class="secondary-button delete-group-button" data-delete-group="${escapeHtml(group.id)}">Excluir grupo</button>`}` : ''}</article>`; }).join('');
  const canInvite = hasPermission('users.manage');
  return extraPage('Usuários e acessos', 'Defina quem participa da operação e quais áreas cada grupo pode acessar.', `<div class="extra-summary"><article class="stat-card"><div class="stat-top"><span>Usuários</span><span class="stat-icon vehicle-icon">♧</span></div><div class="stat-value">${String(state.users.length).padStart(2, '0')}</div><div class="stat-bottom"><span class="stat-note">na operação</span><span class="stat-trend">${state.users.filter(user => user.status === 'Ativo').length} ativos</span></div></article><article class="stat-card"><div class="stat-top"><span>Grupos de acesso</span><span class="stat-icon operation-icon">▤</span></div><div class="stat-value">${String(state.groups.length).padStart(2, '0')}</div><div class="stat-bottom"><span class="stat-note">perfis de permissão</span><span class="stat-trend">por função</span></div></article><article class="stat-card"><div class="stat-top"><span>Convites pendentes</span><span class="stat-icon maintenance-icon">◷</span></div><div class="stat-value">${String(state.users.filter(user => user.status !== 'Ativo').length).padStart(2, '0')}</div><div class="stat-bottom"><span class="stat-note">aguardando aceite</span><span class="stat-warning">Acompanhar</span></div></article></div><section class="panel extra-panel"><div class="fleet-header"><div><div class="fleet-title-line"><h2>Pessoas da operação</h2><span class="fleet-total-pill">${state.users.length} pessoas</span></div><p>Acesso individual associado a um grupo de permissões.</p></div></div><div class="table-wrap"><table><thead><tr><th>USUÁRIO</th><th>GRUPO DE ACESSO</th><th>SITUAÇÃO</th><th></th></tr></thead><tbody>${users}</tbody></table></div></section><div class="extra-section-heading"><div><h2>Grupos de acesso</h2><p>Permissões aplicadas aos usuários de cada grupo</p></div></div><div class="access-grid">${groups}</div><p class="info-note">Grupos personalizados ficam neste navegador enquanto a demonstração não estiver conectada ao Supabase. Na integração, os grupos e permissões serão salvos na organização.</p>`, `${canManageGroups() ? '<button class="primary-button" id="addGroupButton"><span>＋</span> Criar grupo</button>' : ''}${canInvite ? `<button class="primary-button" id="addUserButton"><span>＋</span> Convidar usuário</button>` : ''}<dialog id="groupDialog" class="modal"><form id="groupForm"><div class="modal-head"><div><span class="modal-kicker">PERMISSÕES DE ACESSO</span><h2 id="groupDialogTitle">Criar grupo</h2><p>Escolha quais áreas e ações este grupo poderá usar.</p></div><button class="modal-close" type="button" data-group-close aria-label="Fechar">×</button></div><div class="form-grid"><label class="form-field wide-field">Nome do grupo<input name="name" required maxlength="60" placeholder="Ex.: Coordenação regional" /></label><label class="form-field wide-field">Descrição<input name="description" maxlength="140" placeholder="Responsabilidades deste grupo" /></label><fieldset class="permission-fieldset wide-field"><legend>Permissões</legend><div class="permission-checkbox-grid">${groupPermissions.map(([key, label]) => `<label><input type="checkbox" name="permissions" value="${key}" /><span>${label}</span></label>`).join('')}</div></fieldset></div><div class="modal-actions"><button class="secondary-button" type="button" data-group-close>Cancelar</button><button class="primary-button" type="submit">Salvar grupo <span>→</span></button></div></form></dialog>`);
}
function canManageGroups() { return hasPermission('users.manage'); }
function openGroupDialog(group = null) {
  const dialog = $('#groupDialog'); const form = $('#groupForm'); if (!dialog || !form || !canManageGroups()) return;
  form.reset(); state.editingGroupId = group?.id || null; $('#groupDialogTitle').textContent = group ? 'Editar grupo' : 'Criar grupo';
  $$('[name="permissions"]', form).forEach(input => { input.disabled = false; });
  if (group) { form.elements.name.value = group.name; form.elements.description.value = group.description || ''; $$('[name="permissions"]', form).forEach(input => { input.checked = group.permissions.includes('*') || group.permissions.includes(input.value); }); }
  dialog.showModal();
}
async function saveGroupForm(event) {
  event.preventDefault(); if (!canManageGroups()) { toast('Somente administradores podem gerenciar grupos.'); return; }
  const form = event.currentTarget; const name = form.elements.name.value.trim(); const existing = state.groups.find(group => String(group.id) === String(state.editingGroupId));
  if (state.groups.some(group => group.id !== existing?.id && group.name.trim().toLocaleLowerCase() === name.toLocaleLowerCase())) { toast('Já existe um grupo com esse nome.'); return; }
  const permissions = $$('[name="permissions"]', form).filter(input => input.checked).map(input => input.value);
  if (!permissions.length) { toast('Selecione pelo menos uma permissão para o grupo.'); return; }
  const group = { ...(existing || {}), id: existing?.id || `group-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, name, description: form.elements.description.value.trim(), permissions, builtIn: existing?.builtIn || false };
  if (state.supabase && state.organizationId && existing?.builtIn) { toast('Os grupos predefinidos são protegidos. Crie um grupo personalizado para definir permissões próprias.'); return; }
  if (state.supabase && state.organizationId) {
    const payload = { organization_id: state.organizationId, name: group.name, permissions: group.permissions };
    const result = existing ? await state.supabase.client.from('roles').update(payload).eq('id', existing.remoteId || existing.id).select().single() : await state.supabase.client.from('roles').insert(payload).select().single();
    if (result.error) { console.error('Supabase: falha ao salvar grupo.', result.error.message); toast('Não foi possível salvar o grupo no Supabase.'); return; }
    group.remoteId = result.data.id; group.id = result.data.id;
  }
  if (existing) state.groups = state.groups.map(item => item.id === existing.id ? group : item); else state.groups.push(group);
  localStorage.setItem('rota-grupos-v1', JSON.stringify(state.groups)); $('#groupDialog').close(); renderContent(); toast(existing ? 'Grupo atualizado.' : 'Grupo criado e pronto para receber usuários.');
}
async function deleteGroup(groupId) {
  const group = state.groups.find(item => String(item.id) === String(groupId)); if (!group || group.builtIn) return;
  if (state.users.some(user => String(user.groupId) === String(group.id) || user.role === group.name)) { toast('Este grupo tem usuários vinculados. Transfira-os para outro grupo antes de excluir.'); return; }
  if (state.supabase && state.organizationId) { const { error } = await state.supabase.client.from('roles').delete().eq('id', group.remoteId || group.id).eq('organization_id', state.organizationId); if (error) { toast('Não foi possível excluir o grupo no Supabase.'); return; } }
  state.groups = state.groups.filter(item => item.id !== group.id); localStorage.setItem('rota-grupos-v1', JSON.stringify(state.groups)); renderContent(); toast('Grupo excluído.');
}
function renderDriversPage(emergency = false) {
  const area = emergency ? 'emergencia' : 'eventos';
  const drivers = state.drivers.filter(driver => (driver.operation_area || driver.operationArea || 'eventos') === area);
  const rows = drivers.map(driver => {
    const assignments = state.routes.filter(route => (route.operationArea || 'eventos') === area).flatMap(route => (route.assignments || [{ driver: route.driver, vehicleId: route.vehicleId }]).filter(item => item.driverId === driver.id || item.driver === driver.full_name).map(item => ({ route, item })));
    const activeAssignment = assignments.find(({ route }) => route.status === 'Publicada' || route.status === 'Em andamento');
    const vehicleNames = assignments.map(({ item }) => state.vehicles.find(vehicle => String(vehicle.id) === String(item.vehicleId))?.name).filter(Boolean);
    const expiry = driver.license_expires_on ? new Date(`${driver.license_expires_on}T00:00:00`) : null;
    const days = expiry ? Math.ceil((expiry - new Date()) / 86400000) : null;
    const licenseStatus = days == null ? 'CNH não informada' : days < 0 ? 'CNH vencida' : days <= 30 ? `CNH vence em ${days} dias` : `CNH válida até ${driver.license_expires_on}`;
    const scheduleLabel = assignments.length ? [...new Set(assignments.map(({ route }) => `${route.city} · ${route.serviceDate || 'sem data'} ${route.startTime || ''}`))].join(', ') : 'Sem escala';
    return `<tr><td><div class="driver-cell"><span class="driver-avatar">${escapeHtml(initials(driver.full_name))}</span><span><strong>${escapeHtml(driver.full_name)}</strong><small>${escapeHtml(driver.phone || 'Telefone não informado')}</small></span></div></td><td>${escapeHtml(driver.license_category || 'Categoria não informada')}<small class="table-subline">${escapeHtml(licenseStatus)}</small></td><td>${assignments.length ? `${escapeHtml([...new Set(vehicleNames)].join(', ') || 'Em escala')}<small class="table-subline">${escapeHtml(scheduleLabel)}</small>` : 'Sem escala'}</td><td><span class="status-pill ${!driver.active ? 'status-disponivel' : activeAssignment ? 'status-emrota' : 'status-disponivel'}"><span></span>${!driver.active ? 'Inativo' : activeAssignment ? 'Em rota' : 'Disponível'}</span></td><td>${escapeHtml(driver.emergency_contact || 'Não informado')}</td><td>${canManageDrivers() ? `<button class="secondary-button edit-driver-button" data-edit-driver="${escapeHtml(driver.id)}">Editar</button>` : ''}</td></tr>`;
  }).join('');
  const activeCount = drivers.filter(driver => driver.active).length;
  const navCount = $('#driverNavCount'); if (navCount && !emergency) navCount.textContent = String(activeCount);
  return extraPage(emergency ? 'Condutores de resposta' : 'Motoristas', 'Cadastre condutores, acompanhe documentos e distribua escalas sem sobreposições.', `<div class="extra-summary"><article class="stat-card"><div class="stat-top"><span>Motoristas ativos</span><span class="stat-icon vehicle-icon">◉</span></div><div class="stat-value">${String(activeCount).padStart(2, '0')}</div><div class="stat-bottom"><span class="stat-note">aptos para escala</span><span class="stat-trend">${drivers.length} cadastrados</span></div></article><article class="stat-card"><div class="stat-top"><span>Em rota publicada</span><span class="stat-icon operation-icon">⌁</span></div><div class="stat-value">${String(new Set(state.routes.filter(route => (route.operationArea || 'eventos') === area && (route.status === 'Publicada' || route.status === 'Em andamento')).flatMap(route => (route.assignments || [{ driver: route.driver }]).map(item => item.driverId || item.driver))).size).padStart(2, '0')}</div><div class="stat-bottom"><span class="stat-note">motoristas escalados</span><span class="stat-trend">Escala atual</span></div></article><article class="stat-card"><div class="stat-top"><span>CNH a verificar</span><span class="stat-icon maintenance-icon">◷</span></div><div class="stat-value">${String(drivers.filter(driver => !driver.license_expires_on || Math.ceil((new Date(`${driver.license_expires_on}T00:00:00`) - new Date()) / 86400000) <= 30).length).padStart(2, '0')}</div><div class="stat-bottom"><span class="stat-note">sem validade ou vence em 30 dias</span><span class="stat-warning">Acompanhar</span></div></article></div><section class="panel extra-panel"><div class="fleet-header"><div><div class="fleet-title-line"><h2>Cadastro de condutores</h2><span class="fleet-total-pill">${drivers.length} motoristas</span></div><p>Dados de contato, habilitação e disponibilidade para distribuir rotas.</p></div></div><div class="table-wrap"><table><thead><tr><th>MOTORISTA</th><th>HABILITAÇÃO</th><th>ESCALA / VEÍCULO</th><th>DISPONIBILIDADE</th><th>CONTATO DE EMERGÊNCIA</th><th></th></tr></thead><tbody>${rows || '<tr><td colspan="6">Nenhum motorista cadastrado.</td></tr>'}</tbody></table></div></section><p class="info-note">A validade da CNH é sinalizada para conferência. Antes de publicar a escala, confirme categoria da habilitação, aptidão e descansos obrigatórios com o responsável operacional.</p>`, canManageDrivers() ? '<button class="primary-button" id="addDriverButton"><span>＋</span> Cadastrar motorista</button>' : '');
}
function renderTrackingLeaflet(vehicles, emergency) {
  const element = $('#trackingMap');
  if (!element || !window.L) return;
  if (state.trackingMap) { state.trackingMap.remove(); state.trackingMap = null; }
  const points = vehicles.filter(vehicle => vehicle.latitude != null && vehicle.longitude != null && vehicle.positionAt);
  const map = L.map(element, { scrollWheelZoom: true }).setView([-23.55, -46.63], 11);
  state.trackingMap = map;
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
  const markers = [];
  points.forEach(vehicle => {
    const lat = Number(vehicle.latitude), lng = Number(vehicle.longitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
    const age = Math.max(0, Math.round((Date.now() - new Date(vehicle.positionAt).getTime()) / 60000));
    const color = age <= 10 ? (emergency ? '#b84242' : '#3f7654') : '#9a8c62';
    const icon = L.divIcon({ className: 'tracking-leaflet-marker', html: `<span style="--marker-color:${color}">${emergency ? '✚' : '▰'}</span>`, iconSize: [32, 32], iconAnchor: [16, 16] });
    const marker = L.marker([lat, lng], { icon }).addTo(map);
    const query = `${lat},${lng}`;
    const popup = `<strong>${escapeHtml(vehicle.name)}</strong><br>${escapeHtml(vehicle.type)} · ${age <= 10 ? 'GPS recente' : `atualizado há ${age} min`}<br>${escapeHtml(vehicle.address || 'Endereço não informado')}<br><a target="_blank" rel="noopener" href="https://waze.com/ul?ll=${encodeURIComponent(query)}&navigate=yes">Waze</a> · <a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}">Google Maps</a> · <a target="_blank" rel="noopener" href="https://maps.apple.com/?ll=${encodeURIComponent(query)}">Apple Maps</a>`;
    marker.bindPopup(popup); markers.push(marker);
  });
  if (markers.length) map.fitBounds(L.featureGroup(markers).getBounds().pad(0.18), { maxZoom: 14 });
}
function renderEmergencyEventsPage() {
  const events = state.trackingEvents || [];
  const rows = events.map(event => `<tr><td><strong>${escapeHtml(event.event_type || event.type || 'Evento GPS')}</strong><small class="table-subline">${escapeHtml(event.attributes?.message || event.attributes?.alarm || '')}</small></td><td>${escapeHtml(event.vehicleName || 'Unidade')}</td><td>${escapeHtml(event.attributes?.address || '—')}</td><td>${event.occurred_at ? new Date(event.occurred_at).toLocaleString('pt-BR') : '—'}</td><td><span class="status-pill ${event.acknowledged_at ? 'status-disponivel' : 'status-manutencao'}"><span></span>${event.acknowledged_at ? 'Reconhecido' : 'Pendente'}</span></td></tr>`).join('');
  return extraPage('Eventos GPS', 'Alertas recebidos do Traccar para apoiar a central de emergência.', `<section class="panel extra-panel"><div class="fleet-header"><div><h2>Eventos recentes</h2><p>Geocerca, SOS, ignição e outros eventos enviados pelo dispositivo.</p></div><span class="fleet-total-pill">${events.length} eventos</span></div><div class="table-wrap"><table><thead><tr><th>EVENTO</th><th>UNIDADE</th><th>LOCAL</th><th>HORÁRIO</th><th>SITUAÇÃO</th></tr></thead><tbody>${rows || '<tr><td colspan="5">Nenhum evento recebido. Configure regras de notificação no Traccar.</td></tr>'}</tbody></table></div></section><p class="info-note">A disponibilidade de SOS, botão de pânico e alarmes depende do dispositivo/rastreador e da configuração do Traccar.</p>`);
}
function canManageDrivers() { return state.view === 'motoristas-emergencia' ? hasPermission('emergency.manage') : hasPermission('drivers.manage'); }
function routeNavigationUrl(route, app = route.navigationApp || 'waze') {
  const destinations = route.stops.map(stop => stop.address || stop.name).filter(Boolean);
  const start = route.origin || destinations.shift() || '';
  const end = destinations.at(-1) || start;
  const intermediates = destinations.slice(0, -1);
  if (app === 'google') return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(start)}&destination=${encodeURIComponent(end)}&waypoints=${encodeURIComponent(intermediates.join('|'))}&travelmode=driving`;
  if (app === 'apple') return `https://maps.apple.com/?saddr=${encodeURIComponent(start)}&daddr=${encodeURIComponent(destinations.join(' to:'))}&dirflg=d`;
  return `https://waze.com/ul?q=${encodeURIComponent(destinations[0] || end)}&navigate=yes`;
}
function escapeCsv(value) { return `"${String(value ?? '').replaceAll('"', '""')}"`; }
function canManageRoutes() { return hasPermission('routes.manage') || hasPermission('emergency.manage'); }
function canManageDriverRecords() { return state.view === 'motoristas-emergencia' ? hasPermission('emergency.manage') : hasPermission('drivers.manage'); }
function scheduledRouteConflicts(driverId, driverName, serviceDate, startTime, durationMinutes = 180, exceptRouteId = null) {
  if (!serviceDate || !startTime) return [];
  const [hour, minute] = startTime.split(':').map(Number); const start = hour * 60 + minute; const end = start + Number(durationMinutes || 180);
  return state.routes.filter(route => {
    if (String(route.id) === String(exceptRouteId) || route.serviceDate !== serviceDate || ['Cancelada', 'Concluída'].includes(route.status)) return false;
    const [routeHour, routeMinute] = String(route.startTime || '').split(':').map(Number); if (!Number.isFinite(routeHour)) return false;
    const routeStart = routeHour * 60 + routeMinute; const routeEnd = routeStart + Number(route.durationMinutes || 180);
    const assignments = route.assignments || [{ driver: route.driver, driverId: route.driverId }];
    const driverAssigned = assignments.some(item => (driverId && String(item.driverId) === String(driverId)) || (driverName && item.driver?.toLocaleLowerCase() === driverName.toLocaleLowerCase()));
    return driverAssigned && start < routeEnd && routeStart < end;
  });
}
function recommendedDriverId(serviceDate, startTime, durationMinutes, exceptRouteId = null) {
  return state.drivers.filter(driver => driver.active !== false).map(driver => ({ driver, conflicts: scheduledRouteConflicts(driver.id, driver.full_name, serviceDate, startTime, durationMinutes, exceptRouteId).length })).sort((a, b) => a.conflicts - b.conflicts)[0]?.driver.id || '';
}
function renderDriverConflictHints() {
  const form = $('#routeForm'); if (!form) return;
  const date = form.elements.serviceDate.value; const time = form.elements.startTime.value; const duration = form.elements.durationMinutes?.value || 180;
  $$('#routeAssignmentsEditor .route-assignment-editor-row').forEach(row => {
    const select = row.querySelector('[data-assignment-driver]'); const driver = state.drivers.find(item => String(item.id) === select.value);
    const conflicts = driver ? scheduledRouteConflicts(driver.id, driver.full_name, date, time, duration, state.editingRouteId) : [];
    let hint = row.querySelector('.driver-conflict-hint');
    if (!hint) { hint = document.createElement('small'); hint.className = 'driver-conflict-hint'; row.append(hint); }
    hint.textContent = conflicts.length ? `Conflito: também escalado em ${conflicts.map(route => route.name).join(', ')}.` : driver && date && time ? 'Disponível neste horário.' : 'Informe data e horário para verificar disponibilidade.';
    hint.classList.toggle('has-conflict', conflicts.length > 0);
  });
}
function orderedStopsByNearestNeighbor(stops, origin) {
  const remaining = stops.map((stop, index) => ({ ...stop, _originalIndex: index }));
  const originPoint = typeof origin === 'object' ? origin : null;
  if (!remaining.every(stop => Number.isFinite(Number(stop.latitude)) && Number.isFinite(Number(stop.longitude))) || !originPoint) return stops;
  const distanceSquared = (a, b) => (Number(a.latitude) - Number(b.latitude)) ** 2 + (Number(a.longitude) - Number(b.longitude)) ** 2;
  let current = originPoint; const ordered = [];
  while (remaining.length) {
    let bestIndex = 0;
    for (let i = 1; i < remaining.length; i++) if (distanceSquared(current, remaining[i]) < distanceSquared(current, remaining[bestIndex])) bestIndex = i;
    current = remaining.splice(bestIndex, 1)[0]; ordered.push(current);
  }
  return ordered.map(({ _originalIndex, ...stop }) => stop);
}
function renderRoutesPage() {
  const routes = state.routes.filter(route => (route.operationArea || 'eventos') === (state.view === 'rotas-emergencia' ? 'emergencia' : 'eventos'));
  const cities = [...new Set(routes.map(route => `${route.city}, ${route.stateCode}`))];
  const routeRows = routes.map(route => {
    const assignedVehicles = route.assignments?.length ? route.assignments : [{ vehicleId: route.vehicleId, driver: route.driver }];
    const vehicleNames = assignedVehicles.map(assignment => { const item = state.vehicles.find(vehicle => String(vehicle.id) === String(assignment.vehicleId)); return `${item?.name || 'Veículo'} · ${assignment.driver || 'Motorista'}`; }).join(' · ');
    const navLabel = (route.navigationApp || 'waze') === 'waze' ? 'Abrir 1ª parada no Waze' : `Abrir no ${escapeHtml((route.navigationApp || 'google').toUpperCase())}`;
    return `<article class="route-card" data-route-id="${escapeHtml(route.id)}"><div class="route-card-head"><div class="route-card-city"><span class="route-city-icon">⌖</span><span><strong>${escapeHtml(route.city)}, ${escapeHtml(route.stateCode)}</strong><small>${escapeHtml(route.serviceDate || 'Data não definida')} · ${escapeHtml(route.startTime || 'horário flexível')}</small></span></div><span class="status-pill ${route.status === 'Publicada' ? 'status-emrota' : 'status-disponivel'}"><span></span>${escapeHtml(route.status)}</span></div><div class="route-card-title"><h3>${escapeHtml(route.name)}</h3><span>v${route.version || 1}</span></div><div class="route-assignment"><span class="driver-avatar">${escapeHtml(assignedVehicles.length)}</span><span><strong>${assignedVehicles.length} veículo(s) na rota</strong><small>${escapeHtml(vehicleNames)}</small></span></div><div class="route-stops-list">${route.stops.map((stop, index) => `<div class="route-stop-row"><span class="route-stop-seq">${index + 1}</span><span><strong>${escapeHtml(stop.name)}</strong><small>${escapeHtml(stop.address || '')}${stop.vehicleId ? ` · ${escapeHtml(state.vehicles.find(item => String(item.id) === String(stop.vehicleId))?.name || 'Veículo específico')}` : ' · Comboio'}</small></span>${stop.plannedTime ? `<time>${escapeHtml(stop.plannedTime)}</time>` : ''}</div>`).join('')}</div><div class="route-card-footer"><span>${route.stops.length} paradas · ${escapeHtml(route.navigationApp || 'waze').toUpperCase()}</span><div class="route-card-actions"><a class="secondary-button route-map-link" target="_blank" rel="noopener" href="${routeNavigationUrl(route)}">${navLabel} ↗</a>${canManageRoutes() ? `<button class="secondary-button" data-edit-route="${escapeHtml(route.id)}">Editar</button><button class="primary-button publish-route" data-publish-route="${escapeHtml(route.id)}">${route.status === 'Publicada' ? 'Nova versão' : 'Publicar para motorista'}</button>` : ''}</div></div></article>`;
  }).join('');
  const options = cities.map(city => `<option>${escapeHtml(city)}</option>`).join('');
  return extraPage('Rotas e itinerários', 'Planeje por cidade, atribua o veículo e publique uma versão operacional para cada motorista.', `<div class="route-controls"><label class="form-field city-filter">Cidade<select id="routeCityFilter"><option value="all">Todas as cidades (${cities.length})</option>${options}</select></label><label class="form-field city-filter">Data<select id="routeDateFilter"><option value="all">Todas as datas</option>${[...new Set(routes.map(route => route.serviceDate).filter(Boolean))].map(date => `<option>${escapeHtml(date)}</option>`).join('')}</select></label><div class="route-control-note"><span>ⓘ</span> Motoristas veem rotas publicadas atribuídas a eles.</div></div><div class="route-summary"><span><strong>${routes.length}</strong> rotas</span><span><strong>${cities.length}</strong> cidades</span><span><strong>${routes.filter(route => route.status === 'Publicada').length}</strong> publicadas</span></div><div id="routeCards" class="route-grid">${routeRows || '<div class="panel route-empty">Ainda não há rotas. Crie a primeira para iniciar o planejamento.</div>'}</div><section class="panel route-optimization-note"><span class="route-city-icon">✳</span><div><strong>Planejamento mais eficiente</strong><p>Informe latitude e longitude das paradas para ordenar uma sequência curta por proximidade. Antes de sair, o motorista abre o itinerário no Waze ou Maps, que calcula trânsito e condições atuais. Coordenadas e restrições para veículos grandes devem ser conferidas pelo supervisor.</p></div></section>`, canManageRoutes() ? '<button class="primary-button" id="createRouteButton"><span>＋</span> Criar rota</button>' : '');
}
function renderDriverRoutePage(emergencyOnly = false) {
  const assignedRoutes = state.routes.filter(route => route.status === 'Publicada' && (!emergencyOnly || route.operationArea === 'emergencia') && (state.driverId ? route.assignments?.some(assignment => String(assignment.driverId) === String(state.driverId)) : route.driver.toLocaleLowerCase() === (state.driverProfile || '').toLocaleLowerCase()));
  return extraPage('Minha rota', 'Itinerários publicados pelo supervisor para sua escala.', `<div class="driver-route-banner"><span class="driver-route-icon">⌁</span><div><strong>Rota atribuída ao seu perfil</strong><p>Abra o aplicativo de navegação para conferir trânsito, alertas e condições atuais antes de iniciar. No Waze, avance entre paradas individualmente; Google Maps aceita a lista completa.</p></div></div><div class="route-grid">${assignedRoutes.map(route => { const assignments = route.assignments?.filter(assignment => !state.driverId || assignment.driverId === state.driverId) || [{ vehicleId: route.vehicleId, driver: route.driver }]; const vehicleIds = assignments.map(assignment => String(assignment.vehicleId)); const stops = route.stops.filter(stop => !stop.vehicleId || vehicleIds.includes(String(stop.vehicleId))); const driverRoute = { ...route, stops }; return `<article class="route-card"><div class="route-card-head"><div class="route-card-city"><span class="route-city-icon">⌖</span><span><strong>${escapeHtml(route.city)}, ${escapeHtml(route.stateCode)}</strong><small>${escapeHtml(route.serviceDate)} · saída ${escapeHtml(route.startTime || 'a combinar')}</small></span></div><span class="status-pill status-emrota"><span></span>Publicada · v${route.version || 1}</span></div><div class="route-card-title"><h3>${escapeHtml(route.name)}</h3></div><p class="driver-route-vehicle">Veículo(s): ${assignments.map(assignment => escapeHtml(state.vehicles.find(item => String(item.id) === String(assignment.vehicleId))?.name || '—')).join(', ')}</p><div class="route-stops-list">${stops.map((stop, index) => `<div class="route-stop-row"><span class="route-stop-seq">${index + 1}</span><span><strong>${escapeHtml(stop.name)}</strong><small>${escapeHtml(stop.address || '')}</small></span>${stop.plannedTime ? `<time>${escapeHtml(stop.plannedTime)}</time>` : ''}<a class="stop-nav-link" target="_blank" rel="noopener" href="https://waze.com/ul?q=${encodeURIComponent(stop.address || stop.name)}&navigate=yes">Waze ↗</a></div>`).join('')}</div><div class="route-card-footer"><span>${stops.length} paradas atribuídas</span><div class="route-card-actions"><a class="primary-button route-map-link" target="_blank" rel="noopener" href="${routeNavigationUrl(driverRoute, 'google')}">Abrir rota no Maps ↗</a></div></div></article>`; }).join('') || '<div class="panel route-empty">Não há rota publicada vinculada a este perfil. Fale com o supervisor da operação.</div>'}</div>`, '');
}
function refreshRouteCards() {
  const city = $('#routeCityFilter')?.value || 'all'; const date = $('#routeDateFilter')?.value || 'all';
  $$('#routeCards .route-card').forEach(card => { const route = state.routes.find(item => String(item.id) === card.dataset.routeId); card.classList.toggle('hidden', Boolean(route && ((city !== 'all' && `${route.city}, ${route.stateCode}` !== city) || (date !== 'all' && route.serviceDate !== date)))); });
}
function addRouteStopEditor(stop = {}) {
  const editor = $('#routeStopsEditor'); const row = document.createElement('div'); row.className = 'route-stop-editor-row';
  row.innerHTML = `<span class="route-stop-seq">${editor.children.length + 1}</span><label class="form-field">Nome<input data-stop-name required value="${escapeHtml(stop.name || '')}" placeholder="Nome do ponto" /></label><label class="form-field">Endereço<input data-stop-address required value="${escapeHtml(stop.address || '')}" placeholder="Rua, número, cidade, UF" /></label><label class="form-field">Horário<input data-stop-time type="time" value="${escapeHtml(stop.plannedTime || '')}" /></label><label class="form-field">Veículo<select data-stop-vehicle>${routeAssignmentOptions(stop.vehicleId)}</select></label><label class="form-field">Latitude<input data-stop-lat type="number" step="any" value="${escapeHtml(stop.latitude ?? '')}" placeholder="-23.55" /></label><label class="form-field">Longitude<input data-stop-lng type="number" step="any" value="${escapeHtml(stop.longitude ?? '')}" placeholder="-46.63" /></label><button type="button" class="remove-stop-button" aria-label="Remover parada">×</button>`;
  row.querySelector('.remove-stop-button').addEventListener('click', () => { row.remove(); [...editor.children].forEach((node, index) => node.querySelector('.route-stop-seq').textContent = index + 1); }); editor.append(row);
}
function routeAssignmentOptions(selected = '') {
  const assignedIds = $$('#routeAssignmentsEditor [data-assignment-vehicle]').map(select => select.value).filter(Boolean);
  const vehicles = state.vehicles.filter(vehicle => assignedIds.includes(String(vehicle.id)));
  return `<option value="">Compartilhada com o comboio</option>${vehicles.map(vehicle => `<option value="${escapeHtml(vehicle.id)}" ${String(vehicle.id) === String(selected) ? 'selected' : ''}>${escapeHtml(vehicle.name)} · ${escapeHtml(vehicle.plate)}</option>`).join('')}`;
}
function refreshAssignmentControls() {
  const routeArea = $('#routeForm')?.elements.operationArea?.value || 'eventos';
  const assigned = $$('#routeAssignmentsEditor [data-assignment-vehicle]').filter(select => select.value).map(select => select.value);
  $$('#routeAssignmentsEditor [data-assignment-vehicle]').forEach(select => {
    const current = select.value;
    const options = state.vehicles.filter(vehicle => (vehicle.operationArea || 'eventos') === routeArea && vehicle.status !== 'Manutenção' && (!assigned.includes(String(vehicle.id)) || String(vehicle.id) === current));
    select.innerHTML = `<option value="">Selecione veículo</option>${options.map(vehicle => `<option value="${escapeHtml(vehicle.id)}">${escapeHtml(vehicle.name)} · ${escapeHtml(vehicle.plate)}</option>`).join('')}`;
    select.value = current;
  });
  $$('#routeStopsEditor [data-stop-vehicle]').forEach(select => { const current = select.value; select.innerHTML = routeAssignmentOptions(current); select.value = current; });
}
function addRouteAssignmentEditor(assignment = {}) {
  const container = $('#routeAssignmentsEditor'); const row = document.createElement('div'); row.className = 'route-assignment-editor-row';
  const routeArea = $('#routeForm').elements.operationArea?.value || 'eventos';
  const available = state.vehicles.filter(vehicle => (vehicle.operationArea || 'eventos') === routeArea && vehicle.status !== 'Manutenção');
  const usedVehicleIds = $$('#routeAssignmentsEditor [data-assignment-vehicle]').map(select => select.value);
  const vehicleId = assignment.vehicleId || available.find(vehicle => !usedVehicleIds.includes(String(vehicle.id)))?.id || '';
  const serviceDate = $('#routeForm').elements.serviceDate.value; const startTime = $('#routeForm').elements.startTime.value; const duration = $('#routeForm').elements.durationMinutes?.value || 180;
  const alreadyChosenDrivers = $$('#routeAssignmentsEditor [data-assignment-driver]').map(select => select.value);
  const rankedDrivers = state.drivers.filter(driver => (driver.operation_area || driver.operationArea || 'eventos') === routeArea && driver.active !== false && (!alreadyChosenDrivers.includes(String(driver.id)) || String(driver.id) === String(assignment.driverId))).map(driver => ({ driver, conflicts: scheduledRouteConflicts(driver.id, driver.full_name, serviceDate, startTime, duration, state.editingRouteId).length, sameDayLoad: state.routes.filter(route => route.serviceDate === serviceDate && (route.assignments || [{ driverId: route.driverId, driver: route.driver }]).some(item => String(item.driverId) === String(driver.id) || item.driver === driver.full_name)).length })).sort((a, b) => a.conflicts - b.conflicts || a.sameDayLoad - b.sameDayLoad);
  const availableDrivers = rankedDrivers.filter(item => !item.conflicts);
  const drivers = [...rankedDrivers.map(item => item.driver), ...state.drivers.filter(driver => (driver.operation_area || driver.operationArea || 'eventos') === routeArea && driver.active === false && String(driver.id) === String(assignment.driverId))];
  const driverId = assignment.driverId || state.drivers.find(driver => driver.full_name === assignment.driver)?.id || availableDrivers[0]?.driver.id || '';
  row.innerHTML = `<label class="form-field">Veículo<select data-assignment-vehicle required><option value="">Selecione veículo</option>${available.map(vehicle => `<option value="${escapeHtml(vehicle.id)}" ${String(vehicle.id) === String(vehicleId) ? 'selected' : ''}>${escapeHtml(vehicle.name)} · ${escapeHtml(vehicle.plate)}</option>`).join('')}</select></label><label class="form-field">Motorista<select data-assignment-driver required><option value="">Selecione motorista</option>${drivers.map(driver => `<option value="${escapeHtml(driver.id)}" ${String(driver.id) === String(driverId) ? 'selected' : ''}>${escapeHtml(driver.full_name)}${scheduledRouteConflicts(driver.id, driver.full_name, serviceDate, startTime, duration, state.editingRouteId).length ? ' · conflito de horário' : ''}</option>`).join('')}</select></label><button type="button" class="remove-stop-button" aria-label="Remover veículo">×</button>`;
  row.querySelector('[data-assignment-vehicle]').addEventListener('change', refreshAssignmentControls);
  row.querySelector('[data-assignment-driver]').addEventListener('change', refreshDriverChoices);
  row.querySelector('.remove-stop-button').addEventListener('click', () => { row.remove(); refreshAssignmentControls(); refreshDriverChoices(); });
  container.append(row); refreshAssignmentControls(); refreshDriverChoices();
}
function refreshDriverChoices() {
  const routeArea = $('#routeForm').elements.operationArea?.value || 'eventos';
  const date = $('#routeForm').elements.serviceDate.value; const time = $('#routeForm').elements.startTime.value; const duration = $('#routeForm').elements.durationMinutes?.value || 180;
  const chosen = $$('#routeAssignmentsEditor [data-assignment-driver]').map(select => select.value).filter(Boolean);
  $$('#routeAssignmentsEditor [data-assignment-driver]').forEach(select => {
    const current = select.value;
    const assignedInEditor = chosen.filter(id => id !== current);
    const ranked = state.drivers.filter(driver => (driver.operation_area || driver.operationArea || 'eventos') === routeArea && driver.active !== false && !assignedInEditor.includes(String(driver.id))).map(driver => ({ driver, conflict: scheduledRouteConflicts(driver.id, driver.full_name, date, time, duration, state.editingRouteId).length, load: state.routes.filter(route => route.serviceDate === date && (route.assignments || [{ driverId: route.driverId, driver: route.driver }]).some(item => String(item.driverId) === String(driver.id) || item.driver === driver.full_name)).length })).sort((a, b) => a.conflict - b.conflict || a.load - b.load);
    const best = ranked[0];
    const preferred = current && ranked.some(item => String(item.driver.id) === current) ? current : best && !best.conflict ? String(best.driver.id) : '';
    select.innerHTML = `<option value="">Selecione motorista</option>${ranked.map(({ driver, conflict, load }) => `<option value="${escapeHtml(driver.id)}" ${String(driver.id) === preferred ? 'selected' : ''}>${escapeHtml(driver.full_name)}${conflict ? ' · conflito de horário' : ''}${!conflict && date ? ` · ${load} rota(s) no dia` : ''}</option>`).join('')}`;
  });
  renderDriverConflictHints();
}
function openRouteDialog(route = null) {
  state.editingRouteId = route?.id || null; const form = $('#routeForm'); form.reset(); $('#routeStopsEditor').replaceChildren(); $('#routeAssignmentsEditor').replaceChildren();
  if (!form.elements.durationMinutes) { const field = document.createElement('label'); field.className = 'form-field'; field.innerHTML = 'Duração estimada (minutos)<input name="durationMinutes" type="number" min="30" step="15" value="180" required />'; form.querySelector('.form-grid').append(field); }
  $('#routeDialogTitle').textContent = route ? 'Editar rota' : 'Criar rota';
  if (route) {
    for (const key of ['operationArea', 'name', 'city', 'stateCode', 'serviceDate', 'startTime', 'navigationApp', 'origin', 'durationMinutes']) form.elements[key].value = route[key] ?? (key === 'durationMinutes' ? 180 : key === 'operationArea' ? 'eventos' : '');
    const assignments = route.assignments?.length ? route.assignments : [{ vehicleId: route.vehicleId, driver: route.driver }];
    assignments.forEach(addRouteAssignmentEditor);
    form.elements.publish.checked = route.status === 'Publicada'; route.stops.forEach(addRouteStopEditor);
    form.elements.originLatitude.value = route.originLatitude ?? '';
    form.elements.originLongitude.value = route.originLongitude ?? '';
  } else { form.elements.serviceDate.value = new Date().toISOString().slice(0, 10); form.elements.operationArea.value = state.view === 'rotas-emergencia' ? 'emergencia' : 'eventos'; addRouteAssignmentEditor(); addRouteStopEditor(); addRouteStopEditor(); }
  form.elements.operationArea.onchange = () => { $('#routeAssignmentsEditor').replaceChildren(); addRouteAssignmentEditor(); refreshAssignmentControls(); };
  for (const field of ['serviceDate', 'startTime', 'durationMinutes']) form.elements[field].oninput = refreshDriverChoices;
  refreshDriverChoices();
  $('#routeDialog').showModal();
}
function ensureDriverDialog() {
  let dialog = $('#driverDialog'); if (dialog) return dialog;
  dialog = document.createElement('dialog'); dialog.id = 'driverDialog'; dialog.className = 'modal';
  dialog.innerHTML = `<form id="driverForm"><div class="modal-head"><div><span class="modal-kicker">CADASTRO DE CONDUTORES</span><h2 id="driverDialogTitle">Cadastrar motorista</h2><p>Os dados ajudam a conferir documentação e distribuir escalas.</p></div><button class="modal-close" type="button" data-driver-close aria-label="Fechar">×</button></div><div class="form-grid"><label class="form-field wide-field">Nome completo<input name="full_name" required placeholder="Nome do motorista" /></label><label class="form-field">Telefone<input name="phone" type="tel" placeholder="(00) 00000-0000" /></label><label class="form-field">Contato de emergência<input name="emergency_contact" placeholder="Nome e telefone" /></label><label class="form-field">Categoria da CNH<select name="license_category"><option value="">Selecione</option><option>A</option><option>B</option><option>C</option><option>D</option><option>E</option><option>AB</option><option>AC</option><option>AD</option><option>AE</option></select></label><label class="form-field">Validade da CNH<input name="license_expires_on" type="date" /></label><label class="publish-check wide-field"><input name="active" type="checkbox" checked /> Motorista ativo e disponível para escala</label></div><div class="modal-actions"><button class="secondary-button" type="button" data-driver-close>Cancelar</button><button class="primary-button" type="submit">Salvar motorista <span>→</span></button></div></form>`;
  document.body.append(dialog);
  dialog.querySelectorAll('[data-driver-close]').forEach(button => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.querySelector('#driverForm').addEventListener('submit', saveDriverForm);
  return dialog;
}
function openDriverDialog(driver = null) {
  const dialog = ensureDriverDialog(); const form = dialog.querySelector('#driverForm'); form.reset(); state.editingDriverId = driver?.id || null;
  $('#driverDialogTitle').textContent = driver ? 'Editar motorista' : 'Cadastrar motorista';
  if (driver) for (const key of ['full_name', 'phone', 'emergency_contact', 'license_category', 'license_expires_on', 'active']) { if (key === 'active') form.elements[key].checked = driver.active !== false; else form.elements[key].value = driver[key] || ''; }
  dialog.showModal();
}
async function saveDriverForm(event) {
  event.preventDefault(); if (!canManageDriverRecords()) { toast('Seu grupo não pode gerenciar motoristas.'); return; }
  const form = event.currentTarget; const values = Object.fromEntries(new FormData(form).entries());
  const existing = state.drivers.find(driver => String(driver.id) === String(state.editingDriverId));
  const operationArea = existing?.operation_area || existing?.operationArea || (state.view === 'motoristas-emergencia' ? 'emergencia' : 'eventos');
  const driver = { ...(existing || {}), ...values, id: existing?.id || `driver-${Date.now()}`, full_name: values.full_name.trim(), operation_area: operationArea, active: form.elements.active.checked };
  if (state.drivers.some(item => item.id !== existing?.id && item.full_name.trim().toLocaleLowerCase() === driver.full_name.toLocaleLowerCase())) { toast('Já existe um motorista com esse nome na operação.'); return; }
  if (!driver.active) {
    const futureAssignments = state.routes.filter(route => !['Cancelada', 'Concluída'].includes(route.status) && route.serviceDate && new Date(`${route.serviceDate}T${route.startTime || '00:00'}:00`) >= new Date() && (route.assignments || [{ driver: route.driver, driverId: route.driverId }]).some(assignment => assignment.driverId === driver.id || assignment.driver === driver.full_name));
    if (futureAssignments.length) { toast(`Remova ${driver.full_name} das rotas futuras antes de inativar.`); return; }
  }
  if (state.supabase && state.organizationId) {
    const { client } = state.supabase; const payload = { organization_id: state.organizationId, full_name: driver.full_name, phone: driver.phone || null, emergency_contact: driver.emergency_contact || null, license_category: driver.license_category || null, license_expires_on: driver.license_expires_on || null, operation_area: driver.operation_area, active: driver.active };
    const result = existing ? await client.from('drivers').update(payload).eq('id', driver.id).select().single() : await client.from('drivers').insert(payload).select().single();
    if (result.error) { console.error('Supabase: cadastro de motorista falhou.', result.error.message); toast('Não foi possível salvar o motorista no Supabase.'); return; }
    driver.id = result.data.id;
  }
  if (existing) state.drivers = state.drivers.map(item => String(item.id) === String(existing.id) ? driver : item); else state.drivers.push(driver);
  localStorage.setItem('rota-motoristas-v1', JSON.stringify(state.drivers));
  ensureDriverDialog().close(); renderContent(); toast(existing ? 'Cadastro do motorista atualizado.' : 'Motorista cadastrado e disponível para seleção.');
}
async function saveRoute(route, isNew) {
  if (!state.supabase || !state.organizationId) { localStorage.setItem('rota-itinerarios-v1', JSON.stringify(state.routes)); return true; }
  const { client } = state.supabase;
  const resolvedAssignments = [];
  for (const assignment of route.assignments) {
    let driverQuery = client.from('drivers').select('id').eq('organization_id', state.organizationId);
    driverQuery = assignment.driverId ? driverQuery.eq('id', assignment.driverId) : driverQuery.eq('full_name', assignment.driver);
    const { data: driverRow, error: driverError } = await driverQuery.maybeSingle();
    if (driverError || !driverRow) { toast(`Cadastre o motorista ${assignment.driver} no Supabase antes de atribuir a rota.`); return false; }
    resolvedAssignments.push({ ...assignment, driverId: driverRow.id });
  }
  route.assignments = resolvedAssignments;
  route.driverId = resolvedAssignments[0].driverId;
  route.driver = resolvedAssignments.map(assignment => assignment.driver).join(', ');
  const payload = { organization_id: state.organizationId, operation_area: route.operationArea || 'eventos', name: route.name, city: route.city, state_code: route.stateCode, service_date: route.serviceDate || null, start_time: route.startTime || null, duration_minutes: route.durationMinutes || 180, origin: route.origin, origin_latitude: route.originLatitude, origin_longitude: route.originLongitude, vehicle_id: Number(route.vehicleId), driver_id: route.driverId, driver_name: route.assignments.map(assignment => assignment.driver).join(', '), navigation_app: route.navigationApp, status: route.status, version: route.version, created_by: state.userId };
  let result;
  if (isNew) result = await client.from('routes').insert(payload).select().single();
  else result = await client.from('routes').update(payload).eq('id', route.id).select().single();
  if (result.error) { console.error('Supabase: erro ao salvar rota.', result.error.message); toast('Não foi possível sincronizar a rota com o Supabase.'); return false; }
  const routeId = result.data.id; route.id = routeId; route.driver = route.assignments[0].driver;
  const { error: clearAssignmentsError } = await client.from('route_assignments').delete().eq('route_id', routeId);
  if (clearAssignmentsError) { toast('Rota salva, mas não foi possível atualizar a lista de veículos.'); return false; }
  const assignmentsToSave = resolvedAssignments.map(assignment => ({ route_id: routeId, vehicle_id: Number(assignment.vehicleId), driver_id: assignment.driverId, driver_name: assignment.driver }));
  const { error: assignmentError } = await client.from('route_assignments').insert(assignmentsToSave);
  if (assignmentError) { toast('Não foi possível salvar os veículos atribuídos à rota.'); return false; }
  const { error: deleteError } = await client.from('route_stops').delete().eq('route_id', routeId);
  if (deleteError) { toast('Rota sincronizada; confira a permissão de paradas no Supabase.'); return false; }
  const stopRows = route.stops.map((stop, index) => ({ route_id: routeId, vehicle_id: stop.vehicleId ? Number(stop.vehicleId) : null, sequence: index + 1, name: stop.name, address: stop.address, latitude: stop.latitude ?? null, longitude: stop.longitude ?? null, planned_arrival: stop.plannedTime ? `${route.serviceDate}T${stop.plannedTime}:00` : null, status: 'Pendente' }));
  if (stopRows.length) { const { error } = await client.from('route_stops').insert(stopRows); if (error) { toast('A rota foi salva, mas houve erro nas paradas.'); return false; } }
  localStorage.setItem('rota-itinerarios-v1', JSON.stringify(state.routes));
  return true;
}
function renderIncidentsPage() {
  const rows = state.incidents.map(incident => `<tr><td><strong>${escapeHtml(incident.title)}</strong><small class="table-subline">${escapeHtml(incident.detail)}</small></td><td>${escapeHtml(incident.vehicle)}</td><td><span class="status-pill ${incident.priority === 'Alta' ? 'status-manutencao' : 'status-disponivel'}"><span></span>${escapeHtml(incident.priority)}</span></td><td><span class="status-pill ${incident.status === 'Em aberto' ? 'status-manutencao' : 'status-emrota'}"><span></span>${escapeHtml(incident.status)}</span></td><td>${escapeHtml(incident.time)}</td><td><button class="resolve-incident secondary-button" data-incident="${escapeHtml(incident.title)}" ${incident.status !== 'Em aberto' ? 'disabled' : ''}>${incident.status === 'Em aberto' ? 'Resolver' : 'Concluída'}</button></td></tr>`).join('');
  return extraPage('Ocorrências', 'Registre, priorize e acompanhe alertas durante o percurso.', `<div class="extra-summary"><article class="stat-card"><div class="stat-top"><span>Em aberto</span><span class="stat-icon incident-icon">!</span></div><div class="stat-value">${String(state.incidents.filter(item => item.status === 'Em aberto').length).padStart(2, '0')}</div><div class="stat-bottom"><span class="stat-note">precisam de triagem</span><span class="stat-warning">Acompanhar</span></div></article><article class="stat-card"><div class="stat-top"><span>Alta prioridade</span><span class="stat-icon maintenance-icon">↑</span></div><div class="stat-value">${String(state.incidents.filter(item => item.priority === 'Alta' && item.status === 'Em aberto').length).padStart(2, '0')}</div><div class="stat-bottom"><span class="stat-note">ocorrências abertas</span><span class="stat-warning">Priorizar</span></div></article><article class="stat-card"><div class="stat-top"><span>Resolvidas hoje</span><span class="stat-icon operation-icon">✓</span></div><div class="stat-value">${String(state.incidents.filter(item => item.status === 'Resolvida').length).padStart(2, '0')}</div><div class="stat-bottom"><span class="stat-note">registradas no painel</span><span class="stat-trend">Em acompanhamento</span></div></article></div><section class="panel extra-panel"><div class="fleet-header"><div><h2>Registro operacional</h2><p>Prioridade, veículo relacionado e acompanhamento.</p></div></div><div class="table-wrap"><table><thead><tr><th>OCORRÊNCIA</th><th>VEÍCULO</th><th>PRIORIDADE</th><th>SITUAÇÃO</th><th>HORÁRIO</th><th>AÇÃO</th></tr></thead><tbody>${rows}</tbody></table></div></section><p class="info-note">Em uma operação real, configure alertas para atraso de parada, perda de comunicação, velocidade e entrada/saída de áreas autorizadas.</p>`);
}
function renderMaintenancePage() {
  const rows = state.vehicles.filter(vehicle => vehicle.status === 'Manutenção').map(vehicle => `<tr><td><div class="vehicle-cell"><span class="vehicle-thumb">⚒</span><span><strong>${escapeHtml(vehicle.name)}</strong><small>${escapeHtml(vehicle.plate)} · ${escapeHtml(vehicle.type)}</small></span></div></td><td>${escapeHtml(vehicle.driver)}</td><td>Revisão preventiva</td><td><span class="status-pill status-manutencao"><span></span>Em manutenção</span></td><td>${escapeHtml(vehicle.updated || '—')}</td></tr>`).join('') || '<tr><td colspan="5">Nenhum veículo em manutenção no momento.</td></tr>';
  return extraPage('Manutenções', 'Acompanhe a disponibilidade da frota e organize revisões.', `<div class="extra-summary"><article class="stat-card"><div class="stat-top"><span>Veículos indisponíveis</span><span class="stat-icon maintenance-icon">⚒</span></div><div class="stat-value">${String(state.vehicles.filter(vehicle => vehicle.status === 'Manutenção').length).padStart(2, '0')}</div><div class="stat-bottom"><span class="stat-note">em manutenção</span><span class="stat-warning">Impacto na escala</span></div></article><article class="stat-card"><div class="stat-top"><span>Em operação</span><span class="stat-icon operation-icon">⌁</span></div><div class="stat-value">${String(state.vehicles.filter(vehicle => vehicle.status === 'Em rota').length).padStart(2, '0')}</div><div class="stat-bottom"><span class="stat-note">veículos em rota</span><span class="stat-trend">Disponibilidade</span></div></article><article class="stat-card"><div class="stat-top"><span>Próximas revisões</span><span class="stat-icon vehicle-icon">◷</span></div><div class="stat-value">—</div><div class="stat-bottom"><span class="stat-note">agenda não configurada</span><span class="stat-trend">Cadastre prazos</span></div></article></div><section class="panel extra-panel"><div class="fleet-header"><div><h2>Veículos em manutenção</h2><p>Altere a situação do veículo para atualizar a disponibilidade da frota.</p></div></div><div class="table-wrap"><table><thead><tr><th>VEÍCULO</th><th>RESPONSÁVEL</th><th>SERVIÇO</th><th>SITUAÇÃO</th><th>ATUALIZADO</th></tr></thead><tbody>${rows}</tbody></table></div></section><p class="info-note">Próximo passo recomendado: adicionar ordens de serviço, oficina, custo, hodômetro e datas de revisão para cada veículo.</p>`);
}
function renderReportsPage() {
  const count = status => state.vehicles.filter(vehicle => vehicle.status === status).length;
  return extraPage('Relatórios', 'Resumo da frota e exportação da relação de veículos.', `<div class="extra-summary"><article class="stat-card"><div class="stat-top"><span>Total de veículos</span><span class="stat-icon vehicle-icon">▣</span></div><div class="stat-value">${String(state.vehicles.length).padStart(2, '0')}</div><div class="stat-bottom"><span class="stat-note">cadastros na frota</span><span class="stat-trend">Operação 2026</span></div></article><article class="stat-card"><div class="stat-top"><span>Em rota</span><span class="stat-icon operation-icon">⌁</span></div><div class="stat-value">${String(count('Em rota')).padStart(2, '0')}</div><div class="stat-bottom"><span class="stat-note">em operação</span><span class="stat-trend">Situação atual</span></div></article><article class="stat-card"><div class="stat-top"><span>Disponíveis</span><span class="stat-icon incident-icon">✓</span></div><div class="stat-value">${String(count('Disponível')).padStart(2, '0')}</div><div class="stat-bottom"><span class="stat-note">prontos para escala</span><span class="stat-trend">Situação atual</span></div></article></div><section class="panel report-card"><div class="report-illustration">▤</div><div><h2>Relação da frota</h2><p>Exporte veículos, placas, condutores, rotas e situação atual em formato CSV.</p></div><button class="primary-button" id="exportFleetButton">Baixar CSV <span>↓</span></button></section><section class="panel extra-panel"><div class="fleet-header"><div><h2>Resumo operacional</h2><p>Distribuição dos veículos cadastrados</p></div></div><div class="report-bars">${[['Em rota', count('Em rota')], ['Disponível', count('Disponível')], ['Manutenção', count('Manutenção')]].map(([label, number]) => `<div class="report-bar-row"><span>${label}</span><span class="report-bar-track"><i style="width:${state.vehicles.length ? number / state.vehicles.length * 100 : 0}%"></i></span><strong>${number}</strong></div>`).join('')}</div></section>`);
}
function renderFleetManagementPage(emergency = false) {
  const vehicles = state.vehicles.filter(vehicle => emergency ? vehicle.operationArea === 'emergencia' : vehicle.operationArea !== 'emergencia');
  const canManage = emergency ? hasPermission('emergency.manage') : hasPermission('fleet.manage');
  const rows = vehicles.map(vehicle => `<tr><td><div class="vehicle-cell"><span class="vehicle-thumb">${emergency ? '✚' : '▰'}</span><span><strong>${escapeHtml(vehicle.name)}</strong><small>${escapeHtml(vehicle.plate)} · ${escapeHtml(vehicle.type)}</small></span></div></td><td>${escapeHtml(vehicle.traccarDeviceId || 'Não vinculado')}</td><td><span class="status-pill ${vehicle.traccarDeviceId ? 'status-emrota' : 'status-disponivel'}"><span></span>${vehicle.traccarDeviceId ? 'Vinculado' : 'Aguardando vínculo'}</span></td><td>${escapeHtml(vehicle.driver || '—')}</td></tr>`).join('');
  return extraPage(emergency ? 'Unidades de resposta' : 'Vínculo de rastreadores', emergency ? 'Gerencie ambulâncias, viaturas, bombeiros e equipes de resposta.' : 'Confira quais veículos têm um dispositivo Traccar associado.', `<section class="panel extra-panel"><div class="fleet-header"><div><h2>${emergency ? 'Unidades de emergência cadastradas' : 'Dispositivos por veículo'}</h2><p>O ID do dispositivo é configurado no cadastro/edição do veículo.</p></div>${emergency && canManage ? '<button class="primary-button" id="addEmergencyVehicle">＋ Cadastrar unidade</button>' : !emergency ? '<button class="primary-button" data-view="frota">Abrir cadastro da frota</button>' : ''}</div><div class="table-wrap"><table><thead><tr><th>VEÍCULO</th><th>ID TRACCAR</th><th>CONEXÃO</th><th>CONDUTOR</th></tr></thead><tbody>${rows || `<tr><td colspan="4">${emergency ? 'Nenhuma unidade de resposta cadastrada.' : 'Nenhum veículo encontrado.'}</td></tr>`}</tbody></table></div></section><section class="panel extra-panel"><h2>Conectar o Traccar Client</h2><ol class="setup-steps"><li>Instale o aplicativo Traccar Client no celular usado no veículo.</li><li>No aplicativo, informe a URL pública HTTPS do servidor Traccar e o identificador do dispositivo.</li><li>Cadastre o mesmo dispositivo no Traccar Server e registre o ID numérico aqui no veículo.</li><li>Permita localização em segundo plano, mantenha o celular carregado e inicie o serviço.</li></ol><p class="info-note">O servidor local deste protótipo não recebe as posições do Client. É necessário publicar um servidor Traccar acessível pela internet; a API será configurada no serviço sincronizador seguro.</p></section>`);
}
function renderContent() {
  const page = $('#pageContent');
  if (state.view === 'sem-acesso') { page.classList.add('page-mode-extra'); page.innerHTML = extraPage('Acesso não configurado', 'Esta conta não tem permissão para consultar áreas do sistema. Solicite ao administrador um grupo de acesso.'); return; }
  if (state.view === 'visao-geral') { page.classList.remove('page-mode-extra'); return; }
  if (state.view === 'frota') { page.classList.remove('page-mode-extra'); renderLiveFleetMap(); const heading = $('.page-heading h1'); if (heading) heading.textContent = 'Frota e rastreamento'; const subtitle = $('.page-heading .page-subtitle'); if (subtitle) subtitle.textContent = 'Acompanhe veículos, disponibilidade e posições recebidas do Traccar.'; return; }
  page.classList.add('page-mode-extra');
  if (state.view === 'rastreamento') page.innerHTML = renderTrackingPage(false);
  else if (state.view === 'emergencia') page.innerHTML = renderTrackingPage(true);
  else if (state.view === 'unidades') page.innerHTML = renderFleetManagementPage(true);
  else if (state.view === 'motoristas-emergencia') page.innerHTML = renderDriversPage(true);
  else if (state.view === 'rotas-emergencia' && ['Motorista','Equipe de Campo'].includes(state.role)) page.innerHTML = renderDriverRoutePage(true);
  else if (state.view === 'rotas-emergencia') page.innerHTML = renderRoutesPage();
  else if (state.view === 'eventos-gps') page.innerHTML = renderEmergencyEventsPage();
  else if (state.view === 'rotas' && state.role === 'Motorista') page.innerHTML = renderDriverRoutePage();
  else if (state.view === 'rotas') page.innerHTML = renderRoutesPage();
  else if (state.view === 'usuarios') page.innerHTML = renderUsersPage();
  else if (state.view === 'motoristas') page.innerHTML = renderDriversPage();
  else if (state.view === 'ocorrencias') page.innerHTML = renderIncidentsPage();
  else if (state.view === 'manutencoes') page.innerHTML = renderMaintenancePage();
  else if (state.view === 'relatorios') page.innerHTML = renderReportsPage();
  else page.innerHTML = extraPage('Configurações', 'Ajustes da organização e operação.', '<section class="panel extra-panel"><h2>Organização</h2><p class="page-subtitle">Caravana de Natal · Operação 2026</p><p class="info-note">Gestão de acesso, convite e políticas de segurança disponíveis para administradores.</p></section>');
  const addUserButton = $('#addUserButton'); if (addUserButton) addUserButton.addEventListener('click', () => $('#userDialog').showModal());
  const roleSelect = $('#userForm [name="role"]'); if (roleSelect) roleSelect.innerHTML = state.groups.map(group => `<option value="${escapeHtml(group.id)}">${escapeHtml(group.name)}</option>`).join('');
  const addGroupButton = $('#addGroupButton'); if (addGroupButton) addGroupButton.addEventListener('click', () => openGroupDialog());
  $$('[data-edit-group]').forEach(button => button.addEventListener('click', () => openGroupDialog(state.groups.find(group => String(group.id) === button.dataset.editGroup))));
  $$('[data-delete-group]').forEach(button => button.addEventListener('click', () => deleteGroup(button.dataset.deleteGroup)));
  const groupForm = $('#groupForm'); if (groupForm) groupForm.addEventListener('submit', saveGroupForm);
  const groupDialog = $('#groupDialog'); if (groupDialog) { groupDialog.querySelectorAll('[data-group-close]').forEach(button => button.addEventListener('click', () => groupDialog.close())); groupDialog.addEventListener('click', event => { if (event.target === groupDialog) groupDialog.close(); }); }
  const addDriverButton = $('#addDriverButton'); if (addDriverButton) addDriverButton.addEventListener('click', () => openDriverDialog());
  const addEmergencyVehicle = $('#addEmergencyVehicle'); if (addEmergencyVehicle) addEmergencyVehicle.addEventListener('click', () => { openVehicleDialog(); $('#vehicleForm').elements.operationArea.value = 'emergencia'; });
  $$('[data-edit-driver]').forEach(button => button.addEventListener('click', () => openDriverDialog(state.drivers.find(driver => String(driver.id) === button.dataset.editDriver))));
  const exportButton = $('#exportFleetButton'); if (exportButton) exportButton.addEventListener('click', exportFleetCsv);
  const createRouteButton = $('#createRouteButton'); if (createRouteButton) createRouteButton.addEventListener('click', () => openRouteDialog());
  $('#routeCityFilter')?.addEventListener('change', refreshRouteCards);
  $('#routeDateFilter')?.addEventListener('change', refreshRouteCards);
  $('#routeCards')?.addEventListener('click', event => {
    const editButton = event.target.closest('[data-edit-route]');
    if (editButton) { openRouteDialog(state.routes.find(route => String(route.id) === editButton.dataset.editRoute)); return; }
    const publishButton = event.target.closest('[data-publish-route]');
  if (publishButton) { const route = state.routes.find(item => String(item.id) === publishButton.dataset.publishRoute); if (!route) return; const oldStatus = route.status, oldVersion = route.version; route.version = (route.version || 0) + 1; route.status = 'Publicada'; saveRoute(route, false).then(saved => { if (saved) { renderContent(); toast(`Versão ${route.version} publicada para ${route.driver}.`); } else { route.status = oldStatus; route.version = oldVersion; } }); }
  });
  $$('.resolve-incident').forEach(button => button.addEventListener('click', async () => { const incident = state.incidents.find(item => item.title === button.dataset.incident); if (!incident) return; if (state.supabase) { const { error } = await state.supabase.client.from('incidents').update({ status: 'Resolvida', resolved_at: new Date().toISOString() }).eq('title', incident.title).eq('organization_id', state.organizationId); if (error) { toast('Não foi possível atualizar a ocorrência no Supabase.'); return; } } incident.status = 'Resolvida'; localStorage.setItem('rota-ocorrencias-v1', JSON.stringify(state.incidents)); renderContent(); toast('Ocorrência marcada como resolvida.'); }));
}
function exportFleetCsv() {
  const lines = ['Veículo;Placa;Tipo;Motorista;Rota;Status;Próxima parada', ...state.vehicles.map(vehicle => [vehicle.name, vehicle.plate, vehicle.type, vehicle.driver, vehicle.route, vehicle.status, vehicle.nextStop].map(value => `"${String(value || '').replaceAll('"', '""')}"`).join(';'))];
  const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob(['\ufeff' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' })); link.download = 'frota-caravana-natal.csv'; link.click(); URL.revokeObjectURL(link.href); toast('Relatório CSV baixado.');
}
function toast(message) {
  const element = $('#toast'); element.textContent = message; element.classList.add('show');
  clearTimeout(toast.timer); toast.timer = setTimeout(() => element.classList.remove('show'), 2900);
}
function setView(view) {
  state.view = view;
  const names = { 'visao-geral': 'Visão geral', frota: 'Frota', rastreamento: 'Rastreamento ao vivo', emergencia: 'Central de emergência', unidades: 'Unidades de resposta', 'motoristas-emergencia': 'Condutores de resposta', 'rotas-emergencia': 'Rotas de resposta', 'eventos-gps': 'Eventos GPS', rotas: state.role === 'Motorista' ? 'Minha rota' : 'Rotas', ocorrencias: 'Ocorrências', motoristas: 'Motoristas', usuarios: 'Usuários e acessos', manutencoes: 'Manutenções', relatorios: 'Relatórios', configuracoes: 'Configurações' };
  $('#breadcrumbCurrent').textContent = names[view] || 'Visão geral';
  $$('.nav-item[data-view]').forEach(button => button.classList.toggle('active', button.dataset.view === view));
  renderContent();
  if (view === 'frota') document.querySelector('.fleet-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (view === 'rotas' || view === 'rotas-emergencia') toast('Rotas · planejamento e acompanhamento');
}
function openVehicleDialog(vehicle = null) {
  state.editingId = vehicle?.id || null;
  $('#vehicleDialogTitle').textContent = vehicle ? 'Editar veículo' : 'Adicionar veículo';
  const form = $('#vehicleForm'); form.reset();
  if (vehicle) for (const key of ['name', 'plate', 'type', 'driver', 'route', 'nextStop', 'status', 'traccarDeviceId', 'operationArea']) if (form.elements[key]) form.elements[key].value = vehicle[key] || '';
  $('#vehicleDialog').showModal();
}
function connectSupabase() {
  const config = window.ROTA_SUPABASE_CONFIG;
  if (!config?.url || !config?.anonKey || !window.supabase?.createClient) return;
  const client = window.supabase.createClient(config.url, config.anonKey);
  state.supabase = { client, table: config.table || 'vehicles' };
  state.sync = 'supabase';
  client.auth.getSession().then(async ({ data }) => {
    if (!data?.session) { toast('Entre com sua conta para acessar os dados protegidos.'); return; }
    const profile = await loadRemoteProfile(client, data.session.user.id);
    if (!profile) { toast('Não foi encontrado um perfil de acesso para esta conta.'); return; }
    let vehicleQuery = client.from(state.supabase.table).select('*').order('created_at', { ascending: true });
    if (state.organizationId) vehicleQuery = vehicleQuery.eq('organization_id', state.organizationId);
    const { data: rows, error } = await vehicleQuery;
    if (error) { console.warn('Supabase: leitura inicial indisponível.', error.message); toast('Supabase conectado; confira o schema e as permissões da tabela.'); return; }
    state.vehicles = (rows || []).map(fromRemote); saveLocal(); renderFleet();
    if (state.vehicles.some(vehicle => vehicle.traccarDeviceId) && data.session.user) {
      const { data: positions, error: positionError } = await client.from('vehicle_positions').select('vehicle_id, latitude, longitude, address, recorded_at, speed_kmh').eq('organization_id', state.organizationId).order('recorded_at', { ascending: false }).limit(100);
      if (!positionError && positions) {
        const latest = new Map();
        for (const position of positions) if (!latest.has(String(position.vehicle_id))) latest.set(String(position.vehicle_id), position);
        state.vehicles = state.vehicles.map(vehicle => { const position = latest.get(String(vehicle.id)); return position ? { ...vehicle, latitude: position.latitude, longitude: position.longitude, address: position.address, speedKmh: position.speed_kmh, positionAt: position.recorded_at } : vehicle; });
      }
    }
    if (state.view === 'frota') renderContent();
    const { data: routeRows, error: routeError } = await client.from('routes').select('*, route_stops(*), route_assignments(*)').order('service_date', { ascending: true });
    if (!routeError && routeRows) {
      state.routes = routeRows.map(row => ({ id: row.id, name: row.name, city: row.city, stateCode: row.state_code, operationArea: row.operation_area || 'eventos', serviceDate: row.service_date, startTime: row.start_time, durationMinutes: row.duration_minutes || 180, origin: row.origin || row.start_location, originLatitude: row.origin_latitude, originLongitude: row.origin_longitude, vehicleId: row.vehicle_id, driverId: row.driver_id, driver: row.driver_name, navigationApp: row.navigation_app, status: row.status, version: row.version, assignments: (row.route_assignments || []).map(assignment => ({ vehicleId: assignment.vehicle_id, driverId: assignment.driver_id, driver: assignment.driver_name })), stops: (row.route_stops || []).sort((a, b) => a.sequence - b.sequence).map(stop => ({ name: stop.name, address: stop.address, latitude: stop.latitude, longitude: stop.longitude, vehicleId: stop.vehicle_id, plannedTime: stop.planned_arrival?.slice(11, 16) || '' })) }));
      if (['rotas','rotas-emergencia'].includes(state.view)) renderContent();
    }
    const { data: positionRows, error: positionError } = await client.from('vehicle_positions').select('vehicle_id, latitude, longitude, address, recorded_at, speed_kmh').eq('organization_id', state.organizationId).order('recorded_at', { ascending: false }).limit(100);
    if (!positionError && positionRows) {
      const latest = new Map(); for (const position of positionRows) if (!latest.has(String(position.vehicle_id))) latest.set(String(position.vehicle_id), position);
      state.vehicles = state.vehicles.map(vehicle => { const position = latest.get(String(vehicle.id)); return position ? { ...vehicle, latitude: position.latitude, longitude: position.longitude, address: position.address, speedKmh: position.speed_kmh, positionAt: position.recorded_at } : vehicle; });
    }
    const { data: eventRows, error: eventError } = await client.from('tracking_events').select('*, vehicles(name)').eq('organization_id', state.organizationId).order('occurred_at', { ascending: false }).limit(100);
    if (!eventError && eventRows) state.trackingEvents = eventRows.map(item => ({ ...item, vehicleName: item.vehicles?.name || 'Unidade' }));
    if (state.view === 'frota' || ['rastreamento','emergencia','unidades','eventos-gps'].includes(state.view)) renderContent();
    startTraccarSynchronization();
  });
}
function startTraccarSynchronization() {
  if (state.traccarTimer) clearInterval(state.traccarTimer);
  if (!state.supabase || !state.organizationId || !(hasPermission('fleet.view') || hasPermission('emergency.view'))) return;
  const synchronize = async () => {
    const { data, error } = await state.supabase.client.functions.invoke('traccar-sync', { body: {} });
    if (error) { console.warn('Traccar: sincronização indisponível.', error.message); return; }
    if (data?.error) { console.warn('Traccar:', data.error); return; }
    const { data: positions, error: positionError } = await state.supabase.client.from('vehicle_positions').select('vehicle_id, latitude, longitude, address, recorded_at, speed_kmh').eq('organization_id', state.organizationId).order('recorded_at', { ascending: false }).limit(200);
    if (!positionError && positions) {
      const latest = new Map(); for (const item of positions) if (!latest.has(String(item.vehicle_id))) latest.set(String(item.vehicle_id), item);
      state.vehicles = state.vehicles.map(vehicle => { const position = latest.get(String(vehicle.id)); return position ? { ...vehicle, latitude: position.latitude, longitude: position.longitude, address: position.address, speedKmh: position.speed_kmh, positionAt: position.recorded_at } : vehicle; });
    }
    const { data: events, error: eventError } = await state.supabase.client.from('tracking_events').select('*, vehicles(name)').eq('organization_id', state.organizationId).order('occurred_at', { ascending: false }).limit(100);
    if (!eventError && events) state.trackingEvents = events.map(item => ({ ...item, vehicleName: item.vehicles?.name || 'Unidade' }));
    if (['rastreamento','emergencia','eventos-gps','frota'].includes(state.view)) renderContent();
  };
  synchronize();
  state.traccarTimer = setInterval(synchronize, 15000);
}
async function loadRemoteProfile(client, userId) {
  const { data, error } = await client.from('profiles').select('organization_id, full_name, driver_id, roles(id, name, permissions), drivers(full_name)').eq('id', userId).maybeSingle();
  if (error) { console.warn('Supabase: perfil do usuário não carregado.', error.message); return; }
  if (!data) return null;
  state.organizationId = data.organization_id;
  state.userId = userId;
  if (data?.roles?.name) { state.role = data.roles.name; state.permissions = data.roles.permissions || []; if (emergencyAccessGroups.some(group => group.name === state.role)) state.permissions = state.permissions.includes('*') ? emergencyAccessGroups.find(group => group.name === state.role).permissions : state.permissions.filter(permission => !['fleet.view','fleet.manage','routes.view','routes.manage','drivers.view','drivers.manage','incidents.view','incidents.manage','dashboard.view','reports.view'].includes(permission)); applyPermissionVisibility(state.permissions); }
  state.driverProfile = data.drivers?.full_name || null;
  state.driverId = data.driver_id || null;
  const { data: remoteGroups, error: groupsError } = await client.from('roles').select('id, name, permissions').eq('organization_id', data.organization_id).order('name');
  if (!groupsError && remoteGroups) { state.groups = remoteGroups.map(group => ({ id: group.id, remoteId: group.id, name: group.name, description: state.groups.find(item => item.name === group.name)?.description || 'Grupo de acesso da organização.', permissions: emergencyAccessGroups.some(item => item.name === group.name) ? group.permissions?.includes('*') ? emergencyAccessGroups.find(item => item.name === group.name).permissions : (group.permissions || []).filter(permission => !['fleet.view','fleet.manage','routes.view','routes.manage','drivers.view','drivers.manage','incidents.view','incidents.manage','dashboard.view','reports.view'].includes(permission)) : group.permissions || [], builtIn: ['Administrador', 'Operação', 'Manutenção', 'Visualização', 'Motorista', ...emergencyAccessGroups.map(item => item.name)].includes(group.name) })); localStorage.setItem('rota-grupos-v1', JSON.stringify(state.groups)); }
  const { data: drivers, error: driversError } = await client.from('drivers').select('*').eq('organization_id', data.organization_id).order('full_name');
  if (!driversError) { state.drivers = drivers || []; localStorage.setItem('rota-motoristas-v1', JSON.stringify(state.drivers)); }
  if (data?.full_name) { const profileName = $('.profile-info strong'); if (profileName) profileName.textContent = data.full_name; }
  return data;
}
function applyPermissionVisibility(permissions) {
  const permissionByView = { 'visao-geral': 'dashboard.view', frota: 'fleet.view', rastreamento: 'fleet.view', emergencia: 'emergency.view', unidades: 'emergency.view', 'motoristas-emergencia': 'emergency.view', 'rotas-emergencia': 'emergency.view', 'eventos-gps': 'emergency.view', rotas: 'routes.view', ocorrencias: 'incidents.view', motoristas: 'drivers.view', usuarios: 'users.manage', manutencoes: 'maintenance.view', relatorios: 'reports.view', configuracoes: 'users.manage' };
  $$('[data-view]').forEach(button => { const required = permissionByView[button.dataset.view]; if (!(permissions.includes('*') || permissions.includes(required))) button.classList.add('permission-hidden'); });
  if (!(permissions.includes('*') || permissions.includes(permissionByView[state.view]))) {
    const landing = permissions.includes('dashboard.view') ? 'visao-geral' : permissions.includes('emergency.view') ? 'emergencia' : permissions.includes('fleet.view') ? 'rastreamento' : permissions.includes('routes.view') ? 'rotas' : permissions.includes('incidents.view') ? 'ocorrencias' : permissions.includes('users.manage') ? 'usuarios' : 'sem-acesso';
    setView(landing);
  }
}
function fromRemote(row) { return { ...row, nextStop: row.next_stop || row.nextStop || '', nextTime: row.next_time || row.nextTime || '—', traccarDeviceId: row.traccar_device_id || row.traccarDeviceId || null, operationArea: row.operation_area || row.operationArea || 'eventos', updated: row.updated || 'agora', initials: row.initials || initials(row.driver), avatar: row.avatar || '' }; }
function toRemote(vehicle) {
  const { id, name, plate, type, driver, route, status, nextStop, nextTime, traccarDeviceId, operationArea } = vehicle;
  return { organization_id: state.organizationId, name, plate, type, driver, route, status, next_stop: nextStop || null, next_time: nextTime || null, traccar_device_id: traccarDeviceId ? Number(traccarDeviceId) : null, operation_area: operationArea || 'eventos' };
}
async function persistVehicle(vehicle, isNew) {
  saveLocal();
  if (!state.supabase) return;
  const { client, table } = state.supabase;
  const result = isNew ? await client.from(table).insert(toRemote(vehicle)).select().single() : await client.from(table).update(toRemote(vehicle)).eq('id', vehicle.id);
  if (result.error) { console.error('Supabase: falha ao salvar veículo.', result.error.message); toast('Salvo neste dispositivo; não foi possível sincronizar com Supabase.'); return; }
  if (isNew && result.data) { const oldId = vehicle.id; vehicle.id = result.data.id; state.vehicles = state.vehicles.map(item => item.id === oldId ? vehicle : item); saveLocal(); renderFleet(); }
  const { data: auth } = await client.auth.getUser();
  const { error: auditError } = await client.from('audit_logs').insert({ organization_id: state.organizationId, actor_id: auth.user?.id, action: isNew ? 'vehicle.created' : 'vehicle.updated', entity_type: 'vehicle', entity_id: String(vehicle.id), details: { name: vehicle.name, plate: vehicle.plate } });
  if (auditError) console.warn('Auditoria Supabase: evento não registrado.', auditError.message);
}
$('#addVehicleButton').addEventListener('click', () => openVehicleDialog());
$('#vehicleForm').addEventListener('submit', async event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const data = Object.fromEntries(form.entries());
  const editing = state.editingId && state.vehicles.find(vehicle => vehicle.id === state.editingId);
  const vehicle = { ...(editing || {}), ...data, id: editing?.id || `v-${Date.now()}`, plate: data.plate.toUpperCase(), traccarDeviceId: data.traccarDeviceId ? Number(data.traccarDeviceId) : null, operationArea: data.operationArea || 'eventos', initials: initials(data.driver), updated: 'agora', nextTime: editing?.nextTime || '—', avatar: editing?.avatar || '' };
  if (editing) state.vehicles = state.vehicles.map(item => item.id === editing.id ? vehicle : item); else state.vehicles.unshift(vehicle);
  $('#vehicleDialog').close(); renderFleet(); await persistVehicle(vehicle, !editing);
  if (['unidades', 'emergencia', 'rastreamento'].includes(state.view)) renderContent();
  toast(editing ? 'Veículo atualizado.' : 'Veículo adicionado à frota.');
});
$$('[data-close-dialog]').forEach(button => button.addEventListener('click', () => $('#vehicleDialog').close()));
$('#vehicleDialog').addEventListener('click', event => { if (event.target === event.currentTarget) event.currentTarget.close(); });
$('#addStopButton').addEventListener('click', () => addRouteStopEditor());
$('#addRouteAssignmentButton').addEventListener('click', () => addRouteAssignmentEditor());
$('#optimizeStopsButton').addEventListener('click', () => {
  const rows = [...$('#routeStopsEditor').children];
  const stops = rows.map(row => ({ name: row.querySelector('[data-stop-name]').value, address: row.querySelector('[data-stop-address]').value, latitude: row.querySelector('[data-stop-lat]').value, longitude: row.querySelector('[data-stop-lng]').value, plannedTime: row.querySelector('[data-stop-time]').value }));
  if (stops.length < 2) { toast('Adicione pelo menos duas paradas para otimizar.'); return; }
  const originAddress = $('#routeForm').elements.origin.value;
  const originLatitude = $('#routeForm').elements.originLatitude.value; const originLongitude = $('#routeForm').elements.originLongitude.value;
  const originPoint = originLatitude && originLongitude ? { latitude: Number(originLatitude), longitude: Number(originLongitude) } : null;
  const canOptimize = stops.every(stop => stop.latitude !== '' && stop.longitude !== '') && originPoint;
  if (!canOptimize) { toast('Informe latitude e longitude na base e em todas as paradas para otimizar.'); return; }
  const ordered = orderedStopsByNearestNeighbor(stops, originPoint);
  $('#routeStopsEditor').replaceChildren(); ordered.forEach(addRouteStopEditor);
  toast('Sequência ordenada por proximidade em linha reta. Confira o percurso no navegador.');
});
$('#routeDialog').addEventListener('click', event => { if (event.target === event.currentTarget) event.currentTarget.close(); });
$('#routeForm').addEventListener('submit', async event => {
  event.preventDefault();
  if (!canManageRoutes()) { toast('Seu grupo não pode editar rotas.'); return; }
  const form = event.currentTarget; const values = Object.fromEntries(new FormData(form).entries());
  const assignments = $$('#routeAssignmentsEditor .route-assignment-editor-row').map(row => { const driverId = row.querySelector('[data-assignment-driver]').value; const driver = state.drivers.find(item => String(item.id) === String(driverId)); return { vehicleId: row.querySelector('[data-assignment-vehicle]').value, driverId, driver: driver?.full_name || '' }; });
  if (!assignments.length || assignments.some(assignment => !assignment.vehicleId || !assignment.driverId || !assignment.driver)) { toast('Adicione pelo menos um veículo e selecione o motorista de cada veículo.'); return; }
  if (new Set(assignments.map(assignment => assignment.vehicleId)).size !== assignments.length) { toast('Cada veículo deve aparecer uma única vez nesta rota.'); return; }
  const driverConflict = assignments.flatMap(assignment => scheduledRouteConflicts(assignment.driverId, assignment.driver, values.serviceDate, values.startTime, values.durationMinutes, state.editingRouteId).map(route => ({ driver: assignment.driver, route: route.name })))[0];
  if (driverConflict) { toast(`${driverConflict.driver} já está escalado em “${driverConflict.route}” neste horário. Escolha outro motorista ou horário.`); return; }
  const stops = [...$('#routeStopsEditor').children].map(row => ({ name: row.querySelector('[data-stop-name]').value.trim(), address: row.querySelector('[data-stop-address]').value.trim(), plannedTime: row.querySelector('[data-stop-time]').value, vehicleId: row.querySelector('[data-stop-vehicle]').value || null, latitude: row.querySelector('[data-stop-lat]').value ? Number(row.querySelector('[data-stop-lat]').value) : null, longitude: row.querySelector('[data-stop-lng]').value ? Number(row.querySelector('[data-stop-lng]').value) : null }));
  if (!stops.length || stops.some(stop => !stop.name || !stop.address)) { toast('Inclua ao menos uma parada com nome e endereço.'); return; }
  if (stops.some(stop => (stop.latitude == null) !== (stop.longitude == null))) { toast('Preencha latitude e longitude juntas em cada parada.'); return; }
  const originLatitude = values.originLatitude ? Number(values.originLatitude) : null; const originLongitude = values.originLongitude ? Number(values.originLongitude) : null;
  if ((originLatitude == null) !== (originLongitude == null)) { toast('Preencha latitude e longitude da base juntas.'); return; }
  if ((originLatitude != null && (Math.abs(originLatitude) > 90 || Math.abs(originLongitude) > 180)) || stops.some(stop => stop.latitude != null && (Math.abs(stop.latitude) > 90 || Math.abs(stop.longitude) > 180))) { toast('Confira as coordenadas: latitude deve estar entre -90 e 90, longitude entre -180 e 180.'); return; }
  const existing = state.routes.find(route => String(route.id) === String(state.editingRouteId));
  if (assignments.some(assignment => state.vehicles.find(item => String(item.id) === String(assignment.vehicleId))?.status === 'Manutenção')) { toast('Remova os veículos que estão em manutenção antes de salvar.'); return; }
  if (stops.some(stop => stop.vehicleId && !assignments.some(assignment => String(assignment.vehicleId) === String(stop.vehicleId)))) { toast('Cada parada específica deve apontar para um veículo incluído na rota.'); return; }
  const operationArea = values.operationArea || 'eventos';
  if (operationArea === 'emergencia' && !hasPermission('emergency.manage')) { toast('Seu grupo não pode gerenciar rotas de emergência.'); return; }
  if (operationArea === 'eventos' && !hasPermission('routes.manage')) { toast('Seu grupo não pode gerenciar rotas de eventos.'); return; }
  if (assignments.some(assignment => state.vehicles.find(item => String(item.id) === String(assignment.vehicleId))?.operationArea !== operationArea)) { toast('Selecione veículos que pertençam à mesma área operacional da rota.'); return; }
  const route = { ...(existing || {}), id: existing?.id || `route-${Date.now()}`, organizationId: state.organizationId, operationArea, name: values.name.trim(), city: values.city.trim(), stateCode: values.stateCode.trim().toUpperCase(), serviceDate: values.serviceDate, startTime: values.startTime, durationMinutes: Number(values.durationMinutes || 180), origin: values.origin.trim(), originLatitude: values.originLatitude ? Number(values.originLatitude) : null, originLongitude: values.originLongitude ? Number(values.originLongitude) : null, assignments, vehicleId: assignments[0].vehicleId, driver: assignments.map(item => item.driver).join(', '), driverId: assignments[0].driverId, navigationApp: values.navigationApp, status: form.elements.publish.checked ? 'Publicada' : (existing?.status || 'Rascunho'), version: existing ? (existing.version || 1) + (form.elements.publish.checked ? 1 : 0) : 1, stops };
  if (!Number.isFinite(route.durationMinutes) || route.durationMinutes < 30 || route.durationMinutes > 1440) { toast('A duração estimada deve ficar entre 30 minutos e 24 horas.'); return; }
  const previousRoutes = structuredClone(state.routes);
  if (existing) state.routes = state.routes.map(item => String(item.id) === String(existing.id) ? route : item); else state.routes.unshift(route);
  const saved = await saveRoute(route, !existing);
  if (!saved) { state.routes = previousRoutes; return; }
  $('#routeDialog').close(); renderContent(); toast(`Rota ${route.status === 'Publicada' ? 'publicada' : 'salva como rascunho'}.`);
});
$('#userForm').addEventListener('submit', async event => {
  event.preventDefault(); const values = Object.fromEntries(new FormData(event.currentTarget).entries());
  const selectedGroup = state.groups.find(group => String(group.id) === String(values.role)); if (!selectedGroup) { toast('Selecione um grupo de acesso válido.'); return; }
  const roleName = selectedGroup.name;
  if (!state.supabase) { state.users.push({ name: values.name.trim(), email: values.email.trim(), role: roleName, groupId: selectedGroup.id, status: 'Convite pendente' }); localStorage.setItem('rota-usuarios-v1', JSON.stringify(state.users)); $('#userDialog').close(); renderContent(); toast('Usuário de demonstração adicionado ao grupo. Para enviar convite real, conecte o Supabase.'); return; }
  if (state.supabase) {
    const { client } = state.supabase;
    const roleId = selectedGroup.remoteId || selectedGroup.id;
    const { error } = await client.functions.invoke('invite-user', { body: { email: values.email, full_name: values.name, role_id: roleId } });
    if (error) { console.error('Supabase Auth: convite não enviado.', error.message); toast('Convite não enviado. Verifique a função segura de convites do Supabase.'); return; }
  }
  state.users.push({ name: values.name, email: values.email, role: roleName, groupId: selectedGroup.id, status: 'Convite pendente' });
  localStorage.setItem('rota-usuarios-v1', JSON.stringify(state.users)); $('#userDialog').close(); renderContent(); toast('Convite enviado para o endereço informado.');
});
$('#userDialog').addEventListener('click', event => { if (event.target === event.currentTarget) event.currentTarget.close(); });
$('#fleetSearch').addEventListener('input', event => { state.query = event.target.value; renderFleet(); });
$('#filterTabs').addEventListener('click', event => { const button = event.target.closest('[data-filter]'); if (!button) return; state.filter = button.dataset.filter; $$('#filterTabs .filter-tab').forEach(tab => tab.classList.toggle('selected', tab === button)); renderFleet(); });
$('#fleetTableBody').addEventListener('click', event => { const button = event.target.closest('[data-edit-vehicle]'); if (button) openVehicleDialog(state.vehicles.find(vehicle => vehicle.id === button.dataset.editVehicle)); });
$('#clearFiltersButton').addEventListener('click', () => { state.filter = 'all'; state.query = ''; $('#fleetSearch').value = ''; $$('#filterTabs .filter-tab').forEach((tab, index) => tab.classList.toggle('selected', index === 0)); renderFleet(); });
$$('[data-view]').forEach(button => button.addEventListener('click', () => setView(button.dataset.view)));
$('#centerMapButton').addEventListener('click', () => toast('Exibindo todos os veículos no mapa.'));
$('#mapFilterButton').addEventListener('click', () => toast('O mapa mostra todos os veículos ativos.'));
renderActivities(); renderFleet(); connectSupabase();
