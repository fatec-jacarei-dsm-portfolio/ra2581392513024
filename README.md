# Portfólio — Davi Snaider Mendoza

| | |
|---|---|
| **Aluno** | Davi Snaider Mendoza |
| **RA** | 2581392513024 |
| **Turma** | 4º DSM — 2026-2 |
| **Curso** | Tecnologia em Desenvolvimento de Software Multiplataforma (DSM) |
| **Instituição** | Fatec Jacareí — Centro Paula Souza |
| **Portfólio** | [fatec-jacarei-dsm-portfolio.github.io/ra2581392513024](https://fatec-jacarei-dsm-portfolio.github.io/ra2581392513024/) |
| **Vídeo de apresentação** | [youtu.be/81iGP-wStGc](https://youtu.be/81iGP-wStGc) |

## Contatos

- GitHub: [github.com/davisnaider06](https://github.com/davisnaider06)
- LinkedIn: [linkedin.com/in/davi-s-a7a99432b](https://www.linkedin.com/in/davi-s-a7a99432b/)

## Formação acadêmica

**Tecnologia em Desenvolvimento de Software Multiplataforma (DSM)** — Fatec Jacareí, Centro Paula Souza. Início em 2025, cursando o 4º semestre.

O curso usa Aprendizagem Baseada em Projetos (ABP): a cada semestre a turma entrega, em equipe e com Scrum, um sistema para um cliente real. Integro a equipe CrimsonCode desde o 1º semestre.

## Projetos acadêmicos (ABP)

### 1º DSM · 2025-1 — Fatreck

- **Descrição:** aplicação web para a Fatec Jacareí divulgar os horários de aula e as salas de cada curso, com mapa interativo dos ambientes, ingestão de dados por CSV e exportação em PDF.
- **Contribuição pessoal:** desenvolvi a página de busca e a página de horários a partir do protótipo no Figma, fiz a integração do front-end com o banco de dados, escrevi o script que carrega os horários do PostgreSQL na tela, implementei a exportação em PDF e a responsividade da página de horários.
- **Tecnologias:** HTML, CSS, JavaScript, Node.js, PostgreSQL, Figma.
- **Repositório:** https://github.com/CRIMS0NC0DE/abp-2025-1

### 2º DSM · 2025-2 — Dados Limnológicos

- **Descrição:** aplicação web para visualizar e disseminar dados limnológicos e meteorológicos dos reservatórios de Furnas, coletados pelo SIMA e em campanhas de campo, com painéis, tabelas, exportação em CSV e mapa interativo.
- **Contribuição pessoal:** fiquei responsável pelo mapa interativo: construí o mapa com Leaflet, criei e organizei as rotas do back-end que entregam os pontos de coleta e integrei tudo ao front-end em React. Também corrigi a tabela de dados e a configuração da URL da API.
- **Tecnologias:** React, TypeScript, Node.js, PostgreSQL, Leaflet, Docker.
- **Repositório:** https://github.com/CRIMS0NC0DE/abp-2025-2

### 3º DSM · 2026-1 — 1000 Valle Multimarcas

- **Descrição:** plataforma de gestão de leads para a concessionária 1000 Valle Multimarcas, cobrindo o fluxo de vendas da captação do lead até a análise de conversão em dashboards.
- **Contribuição pessoal:** implementei o login e o cadastro de usuários, a estrutura de RBAC (papéis, permissões, equipes e middlewares) e a migração dos colaboradores para ela, o módulo de logs de auditoria, a área financeira e a aba de documentos.
- **Tecnologias:** React, TypeScript, Node.js, PostgreSQL, Prisma, JWT, Docker.
- **Repositório:** https://github.com/CRIMS0NC0DE/3DSM-ABP-2026-1

### 4º DSM · 2026-2 — Passe (em andamento)

- **Descrição:** controle de acesso IoT de baixo custo: um terminal ESP32 exibe um QR Code rotativo, o aplicativo lê o código e o back-end decide se libera a catraca; há também a alternativa por tag NFC.
- **Contribuição pessoal:** sou responsável pelo back-end (autenticação, autorizações, validação de acesso por QR e NFC, registro de eventos), pela comunicação com o terminal via MQTT e pelo pipeline de CI/CD com lint, testes, build e deploy.
- **Tecnologias:** Node.js, Express, TypeScript, Prisma, PostgreSQL, Flutter, ESP32, MQTT, Docker, GitHub Actions.
- **Repositório:** https://github.com/CRIMS0NC0DE/4DSM-ABP-2026-2

## Projetos autorais

Além das ABPs, o portfólio lista projetos próprios e comerciais (Sova AI, Atlas CRM, Evolutech, Boder AI, RevOps SaaS, Belezinha, Atlas e Forge), com links de deploy e repositório na seção Portfólio do site.

## Sobre o site

- HTML, CSS e JavaScript puros, sem frameworks, bibliotecas ou dependências via CDN.
- Animações com CSS, `IntersectionObserver` e Web Animations API.
- Seções: Início, Sobre, Formação, Skills, ABPs, Portfólio e Contato.
- Layout responsivo, botão para pausar as animações e suporte a `prefers-reduced-motion`.

## Estrutura

- `docs/index.html`: conteúdo e links.
- `docs/style.css`: layout e estilos responsivos.
- `docs/app.js`: interações e animações.
- `docs/assets/`: imagens.

## Executar localmente

Sirva a pasta `docs` com um servidor HTTP estático:

```sh
python -m http.server 4173 --directory docs
```

Abra `http://localhost:4173`.

## Publicar

Site estático, sem build. A versão avaliada fica no repositório institucional [fatec-jacarei-dsm-portfolio/ra2581392513024](https://github.com/fatec-jacarei-dsm-portfolio/ra2581392513024), publicada pelo GitHub Pages a partir da pasta `/docs` da branch `main`.
