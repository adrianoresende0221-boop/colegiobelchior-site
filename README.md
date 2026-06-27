# Site — Centro Educacional Caminho Suave

Site institucional estático (HTML/CSS/JS puro, sem build, sem dependências). Site principal (`index.html`) + 3 subpastas — `infantil/`, `fundamental1/`, `fundamental2/` — pensadas pra se tornarem subdomínios (`infantil.SEUDOMINIO.com.br`, etc.), cada uma com cor de destaque própria e captação de matrícula via WhatsApp.

## Site principal vs. subdomínios — como isso funciona na prática

As páginas de etapa já estão organizadas em pastas separadas (`infantil/index.html`, `fundamental1/index.html`, `fundamental2/index.html`) com `canonical`/Open Graph apontando pra `infantil.SEUDOMINIO.com.br` etc. Isso dá duas opções na hora de publicar, sem precisar tocar no código:

1. **Subdomínios reais** (o que foi pedido): cada pasta vira o conteúdo de um subdomínio. Na prática isso pede, pra cada subdomínio, um registro DNS (CNAME) + um site/deploy apontando pra aquela pasta — a maioria das hospedagens estáticas (Netlify, Vercel) trata cada subdomínio como um "site" próprio. Dá mais trabalho de configuração, mas reforça cada etapa como uma marca dentro da escola.
2. **Caminho mais simples, mesmo resultado visual:** publicar tudo num deploy só e usar as pastas como caminho (`SEUDOMINIO.com.br/infantil/`, etc.) — zero configuração extra de DNS. Só trocar os `canonical`/`og:url` de cada página pra refletir isso quando for publicar.

Se quiser ir de subdomínio mesmo, me avisa quando tiver o domínio e a hospedagem escolhidos que eu ajudo a configurar o DNS.

## Ver localmente

Não precisa instalar nada. Dois jeitos:

1. **Mais simples:** dá duplo-clique em `index.html` — abre direto no navegador.
2. **Recomendado** (evita qualquer comportamento estranho de caminho relativo): clique direito na pasta no VS Code → "Open with Live Server" (instala a extensão "Live Server" se ainda não tiver), ou rode no terminal, dentro desta pasta:
   ```
   python -m http.server 8080
   ```
   e abra `http://localhost:8080` no navegador.

## Novidades (2026-06-27, segunda rodada)

- **Cursor interativo**: em telas com mouse (desktop), um ponto + anel acompanha o cursor e cresce sobre links/botões/cartões. Em touch (celular) fica desativado automaticamente.
- **Carrossel na home**: logo abaixo do hero, alterna entre as 3 etapas (cada slide é clicável e leva pra página da etapa), com setas, bolinhas e troca automática a cada 6s.
- **Modais de atividades**: o botão "Ver atividades" em cada cartão de etapa, na home, abre um painel com uma lista rápida de atividades — fecha com X, clique fora ou Esc.
  ⚠️ **Importante**: essa lista usa só o que eu vi de verdade no Instagram da escola (Mostra Pedagógica, Projeto Sementinha, Dia de Piscina, passeios incl. Peirópolis, Acampamento, PROERD). Não copiei os nomes específicos de programas dos concorrentes que você mandou print (Xadrez, Robótica, Clube de Leitura, Oficina de Redação etc.) porque não tenho confirmação de que o Caminho Suave oferece isso — copiar nomes de programas que a escola não tem seria passar informação falsa pros pais. Se vocês tiverem essa grade de projetos/diferenciais, me manda que eu completo a lista de verdade.
- **Botão "Como chegar"**: acima do mapa, em todas as páginas, abre directions do Google Maps com o endereço real.
- **Página/subdomínio "Sobre"**: `sobre/index.html`, institucional, segue o mesmo padrão de pasta-por-subdomínio das etapas.
- **Aba "Contato"** no menu: leva direto pro rodapé (telefone, WhatsApp, Instagram, endereço) de cada página.

## O que já foi confirmado (2026-06-27)

- **Cores oficiais:** vermelho, azul e amarelo (confirmado por você + foto real da fachada). `css/style.css` e `identidade/design-guide.md` já atualizados — azul é a cor base/Fundamental I, amarelo é a Educação Infantil, vermelho é o Fundamental II.
- **Horário de funcionamento:** segunda a sexta, 7h às 18h, fechado sábado e domingo. Já atualizado no rodapé das 4 páginas e no JSON-LD (SEO).

## O que ainda falta pra ficar pronto pra publicar

1. **Logo real** — vi as duas versões do logo no chat (completo e compacto), mas não tenho como extrair o arquivo de uma imagem de chat pra salvar no projeto. Arraste os arquivos reais (alta resolução) pra `assets/logo.png` e `assets/logo-compacto.png` e me avisa pra eu trocar o wordmark em texto do header pelo logo de verdade.
2. **Fotos reais da escola** — os quadros tracejados ("Foto da escola aqui") são placeholders. As fotos da fachada e do playground que você mandou no chat dão uma ótima referência visual, mas pelo mesmo motivo do logo eu não consigo salvar essas imagens direto no projeto — arraste os arquivos originais pra `assets/` (veja `assets/LEIA-ME.txt`) e eu encaixo nos lugares certos.
3. **Domínio** — `SEUDOMINIO.com.br` é um placeholder (com variações `infantil.`, `fundamental1.`, `fundamental2.` pros subdomínios) que aparece em todas as páginas, `robots.txt` e `sitemap.xml`. Depois de registrar o domínio, é só substituir essa string em todos os arquivos (busca e substitui).
4. **Tom de voz** — os textos foram escritos num tom acolhedor "de melhor suposição", sem um exemplo real de escrita da escola pra calibrar. Se quiser ajustar pra ficar mais "com a voz" de vocês, me manda uma legenda ou comunicado real.

## Publicar (domínio + hospedagem)

Vocês ainda não têm nada registrado. Caminho mais simples e de menor custo pra esse tipo de site:

1. **Domínio:** registrar um `.com.br` em [registro.br](https://registro.br) (é o registro oficial — qualquer outro vendedor de domínio `.com.br` revende a partir dali).
2. **Hospedagem:** como o site é só HTML/CSS/JS estático, serviços como **Netlify** ou **Vercel** hospedam de graça — basta arrastar essa pasta `colegiobelchior/` (renomeada pra algo como `site/`) no painel deles, ou conectar a um repositório Git.
3. Depois de ter o domínio, configurar o DNS apontando pra hospedagem escolhida (cada uma tem um passo a passo próprio na hora de conectar domínio customizado).

Quando tiver domínio e hospedagem escolhidos, me chama que eu ajudo a configurar.

## Estrutura

```
colegiobelchior/
  index.html              site principal (home, com carrossel + modais de atividades)
  sobre/index.html         institucional — pasta = futuro subdomínio
  infantil/index.html      Educação Infantil — pasta = futuro subdomínio
  fundamental1/index.html  Ensino Fundamental I (1º ao 5º) — pasta = futuro subdomínio
  fundamental2/index.html  Ensino Fundamental II (6º ao 9º) — pasta = futuro subdomínio
  css/style.css           estilos (cores em identidade/design-guide.md)
  js/main.js              menu mobile + formulário→WhatsApp + cursor + modais + carrossel
  assets/                 fotos e logo (ver LEIA-ME.txt)
  robots.txt / sitemap.xml
```
