# Verificações — Host Only Tecnologia

Data: 09/10/2026. Revisão visual solicitada por Ítalo. Medições no preview local; não são garantia de resultados em qualquer dispositivo ou hospedagem.

## Resultado da revisão visual

- Lighthouse mobile: desempenho **99**, acessibilidade **100**, boas práticas **100**, SEO **100**.
- Primeiro conteúdo: **1,0 s**; maior conteúdo: **2,2 s**; bloqueio total: **10 ms**; mudança de layout: **0**.
- Axe (WCAG 2 A/AA, WCAG 2.1 A/AA e boas práticas): **zero violações automáticas** em 320, 375, 390, 768 e 1440 px, texto ampliado a 200% e fallback sem scripts da aplicação. Não substitui auditoria manual completa com tecnologias assistivas.
- Nos cinco tamanhos: sem rolagem horizontal, imagens carregadas, um H1, links internos válidos e WhatsApp correto.
- Menu mobile: abre, fecha com Escape, devolve foco e fecha ao navegar.
- Detalhes dos serviços abrem por teclado; contato de suporte mantém mensagem específica. Nenhuma mensagem foi enviada.
- HTML/CSS revisados: cinco serviços confirmados, endereço e horários informados por Ítalo, elementos decorativos separados do conteúdo acessível.
- Fonte local antecipada e imagens WebP responsivas. Vídeo nativo reproduzido em desktop/mobile; controle de pausa/retomada verificado por teclado; pausa manual preservada ao navegar e parada automática fora da tela. Cenário de movimento reduzido simulado no servidor de diagnóstico: arte estática, botão oculto e vídeo sem src (não carregado). CSS também respeita a preferência do sistema.
- Sintaxe de JavaScript/servidor e diferença de arquivos conferidas.
- URLs de SEO alinhadas ao site público na Vercel.

## Entrega

Site público: https://host-only-tecnologia.vercel.app/.
Repositório: https://github.com/hotecnologia/hostonly.

A revisão inclui hero com vídeo do personagem técnico original (8,6 s, 30 fps, H264 sem áudio; aproximadamente 454 KB), título “Pode deixar. A gente cuida da tecnologia.”, cabeçalho integrado, serviços em composição assimétrica, mapa de especialidades, contato escuro e rodapé com assinatura visual. Mesma base estática, sem novas dependências de produção.

## Limites e pendências

Endereço e horários informados por Ítalo: CLN 208, Bloco B, Loja 17 — Asa Norte, Brasília-DF; segunda a sexta, das 8h às 18h. Link abre busca pelo endereço no Google Maps. Logo original transparente em alta resolução incorporado, com WebP otimizado. Imagens e personagem conceituais, gerados; não representam instalações da empresa. Conteúdo e proposta visual ainda precisam de validação comercial com Vitor.

Configuração de cache e compressão depende da hospedagem. Ao conectar domínio comercial, atualizar canonical, Open Graph, JSON-LD, robots e sitemap. Repetir verificação de contatos/dados no domínio escolhido.

A medição inicial da versão anterior foi 97/100/100/100; os números acima são da nova hero, inspirada na composição da ICB-AI.
