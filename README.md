# Rota — gestão da operação de frota

Painel em português para a gestão da frota de uma operação de evento, com inspiração no mapa ao vivo do Ponto.OS. Inclui demonstração local de frota, rotas, motoristas, usuários e grupos de acesso, ocorrências, manutenção e relatórios.

## Abrir a demonstração

Abra `index.html` em um navegador. Os cadastros de veículo e usuário ficam no armazenamento local do navegador até a configuração do Supabase. Dados, pessoas, endereços e alertas exibidos inicialmente são exemplos fictícios; o mapa é ilustrativo e não recebe GPS real.

## Configurar Supabase

1. Crie um projeto Supabase.
2. Execute `supabase-schema.sql` no SQL Editor.
3. Copie `supabase-config.example.js` para `supabase-config.js` e preencha a URL e a chave pública anon/publishable.
4. Abra a aplicação por um servidor web local/de hospedagem e configure Auth para exigir sessão. A biblioteca Supabase JS v2 é carregada pelo CDN já incluído em `index.html`.
5. Crie a organização, os grupos de eventos/emergência sugeridos e associe seu primeiro usuário administrador, seguindo `supabase-seed.example.sql`.
6. Publique uma Supabase Edge Function `invite-user` (esqueleto em `supabase/functions/invite-user/index.ts`) com `SUPABASE_SERVICE_ROLE_KEY` apenas como segredo de servidor. A tela de convite chama essa função. Configure a URL de redirecionamento e o provedor de e-mail no Supabase Auth.

O schema aplica Row Level Security e isola os dados por organização. Não use a chave `service_role` no navegador, não deixe tabela acessível anonimamente e nunca persista senhas na aplicação. A função de convite verifica o token do administrador, autorização `users.manage` e organização antes de criar a conta.

## Referência Traccar

O [servidor Traccar](https://github.com/traccar/traccar) recebe telemetria GPS. O [Traccar Client](https://www.traccar.org/client/) transforma um celular em rastreador; a [API oficial](https://www.traccar.org/traccar-api/) disponibiliza posições e eventos. Esta aplicação inclui o sincronizador `supabase/functions/traccar-sync` e abas distintas de rastreamento. Sem servidor e aparelho configurados, o painel informa que aguarda GPS e não apresenta posições de exemplo como reais.

### Ativar rastreamento

1. Hospede um servidor Traccar acessível por HTTPS e crie nele um usuário dedicado à integração, com acesso apenas aos dispositivos da organização. Não use o servidor público de demonstração para ambulâncias, viaturas ou operações reais.
2. Em Authentication, crie no Traccar um dispositivo para cada telefone/rastreador. No veículo dentro do Rota, informe o **ID numérico do dispositivo Traccar**. No celular, o Traccar Client precisa apontar para o endereço público do servidor e usar o **identificador exclusivo** definido para aquele dispositivo. São dois valores diferentes.
3. Faça deploy da Edge Function e configure os segredos no Supabase (não no navegador):

   ```sh
   supabase secrets set TRACCAR_BASE_URL=https://traccar.suaempresa.com TRACCAR_USERNAME=usuario-integracao TRACCAR_PASSWORD='senha-forte'
   supabase functions deploy traccar-sync
   ```

   A função também precisa dos segredos padrão `SUPABASE_URL`, `SUPABASE_ANON_KEY` e `SUPABASE_SERVICE_ROLE_KEY` do projeto. Mantenha a chave de serviço somente no ambiente de servidor.
4. Entre na aplicação com uma conta associada ao perfil/organização no Supabase. A sincronização consulta o Traccar a cada 15 segundos enquanto a sessão está aberta e registra posições e eventos novos no Supabase; o histórico detalhado permanece no Traccar. A interface apresenta o horário do último sinal e atalhos de navegação Waze, Google Maps e Apple Maps.
5. No Android/iOS, permita localização em segundo plano, desative a economia agressiva de bateria para o Client e mantenha o aparelho carregado. Confirme primeiro o funcionamento com um veículo de demonstração.

O intervalo de 15 segundos é uma atualização quase ao vivo por consulta periódica; não é um fluxo de vídeo/telemetria contínuo. Para despacho crítico, contrate/instale um servidor Traccar com disponibilidade, rede móvel, autenticação, retenção, backup e monitoramento apropriados. A localização do celular depende de GPS e conectividade e não substitui rádio ou sistemas oficiais.

### Áreas e permissões

- A área **Operação de eventos** mantém a frota da caravana e as rotas de eventos.
- **Segurança pública e emergência** tem sua própria central, unidades, condutores, rotas e eventos GPS; ambulâncias, viaturas, bombeiros, Defesa Civil e resgate são cadastrados nesta área.
- Os grupos sugeridos **Central de Emergência**, **Despachante** e **Equipe de Campo** usam permissões `emergency.*`; eles não recebem automaticamente acesso à frota, condutores, rotas ou ocorrências de eventos. A RLS do Supabase aplica a separação em veículos, condutores, rotas, posições, atribuições e paradas.
- Execute novamente `supabase-schema.sql` se ainda não criou as tabelas. O arquivo de seed atualiza as permissões sugeridas dos grupos de demonstração.

## Grupos de acesso sugeridos

- **Administrador:** usuários, configuração e todas as áreas.
- **Operação:** frota, rotas, motoristas, mapa, ocorrências e relatórios.
- **Manutenção:** veículos, ordens de serviço e ocorrências relacionadas.
- **Visualização:** consulta, mapa e relatórios sem permissão de edição.
- **Motorista:** consulta somente rotas publicadas e atribuídas ao próprio perfil.
- Grupos personalizados podem receber permissões por área; contas de demonstração e grupos personalizados ficam salvos no armazenamento local até configurar o Supabase.

Permissão de navegação na interface é conveniência; o bloqueio efetivo é feito pelas políticas RLS no Supabase.

## Funcionalidades e próximos passos de integração

- Frota: cadastro/edição, placa única por organização, motorista, rota, próxima parada e disponibilidade.
- Usuários e grupos: criação/edição de grupos com permissões por área, convite ligado a grupos predefinidos ou personalizados, com armazenamento local na demonstração e sincronização preparada no Supabase.
- Motoristas: cadastro e edição de condutores, telefone, contato de emergência, categoria e validade da CNH, situação ativa e consulta de escala/veículos. Os motoristas ativos aparecem na seleção da rota.
- Rotas: planejamento por cidade/UF e data, vários pares veículo/motorista por itinerário, base, horário, duração estimada e paradas compartilhadas ou atribuídas a um veículo, com endereço, coordenadas e janela prevista. A escala recomenda primeiro condutores sem conflito e com menor carga no dia, avisa sobre sobreposições e impede salvar conflito de horário. Inclui rascunho/publicação, versão, filtros por cidade/data e links ao Waze por parada ou Google Maps com waypoints.
- Ocorrências: prioridade, situação, veículo responsável e resolução.
- Manutenção: visão de indisponibilidade e schema para ordens de serviço, prazo, hodômetro e custo.
- Relatórios: exportação CSV da frota e distribuição por estado.
- Auditoria: schema registra usuário, ação e entidade.
- Traccar: campo de vínculo por identificador do dispositivo; estrutura Supabase para última/selecionada telemetria, histórico resumido, geocercas circulares/poligonais/lineares, eventos, regras de notificação e controle de acesso. Posições recentes importadas podem ser mostradas na visão de frota; sem GPS Traccar válido a interface informa que o mapa de demonstração não é rastreamento real.

Frota, rotas, cadastro de motoristas e grupos possuem fluxo de leitura/gravação preparado no Supabase. Ocorrências e ordens de manutenção já têm tabelas e políticas no schema, mas ainda precisam da integração completa das telas para gestão remota.

### Fluxo de rotas e motoristas

- Cadastre o motorista e o veículo na organização antes de montar a rota. Ao convidar uma pessoa pelo grupo **Motorista**, a função de convite reutiliza o cadastro com nome correspondente e associa a conta ao respectivo `driver_id` no perfil.
- O supervisor salva rascunhos e publica uma versão. O motorista autenticado recebe pela RLS apenas as rotas publicadas associadas ao seu `driver_id`, os veículos do próprio vínculo e as paradas compartilhadas ou atribuídas ao veículo dele.
- Para ordenar paradas automaticamente, informe latitude/longitude da base e de todas as paradas. O protótipo aplica uma heurística de vizinho mais próximo pela distância geográfica em linha reta, que serve como primeira organização. Não é otimização de tráfego, pedágios, altura/peso de carreta ou janelas de serviço.
- Google Maps recebe base, destino e pontos intermediários. O Waze abre um destino por vez; o motorista pode acionar Waze em cada parada conforme avança. O app de navegação consulta o trânsito em tempo real, mas o supervisor deve validar restrições específicas de veículo pesado e condições operacionais.
- Uma publicação gera uma versão identificada do itinerário. A trilha de auditoria deve ser habilitada também para criação/publicação de rota antes de operação real.
