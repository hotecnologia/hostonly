# Host Only Tecnologia

Site institucional estático, em português, criado em 09/10/2026. Uma página com seções navegáveis, cinco frentes de serviço, diferenciais baseados no portfólio, apresentação, dúvidas e contato. Todos os conteúdos públicos estão em `dist/`.

Site público: https://host-only-tecnologia.vercel.app.
Repositório público para compartilhamento: https://github.com/hotecnologia/hostonly.

## Esta cópia

Cópia pública independente do código da versão 6ad714368ec407fe83226207baedd5da6a47b860, publicada em 09/10/2026. Inclui código, assets, fonte da animação e documentação. Esta cópia tem histórico próprio; atualizações devem ser enviadas explicitamente a este repositório. O site de demonstração continua na Vercel.

Stack: HTML5, CSS3 e JavaScript puro. Node.js para preview local; Vercel para hospedagem. Sem instalação de dependências ou etapa de build.

## Preview local

Com Node.js instalado, execute na pasta deste projeto:

```sh
node preview.mjs
```

Abra http://127.0.0.1:4173. Encerre com Ctrl+C. O servidor é apenas para preview; a hospedagem recebe os arquivos de `dist/`.

## Manutenção

- `dist/index.html`: textos, seções, SEO e dados estruturados.
- `dist/styles.css`: identidade visual e responsividade; tokens no início.
- `dist/site-config.js`: WhatsApp, Instagram, cidade, endereço e horários.
- `dist/site.js`: menu, contatos, mensagens específicas por serviço e controle de movimento da hero.
- `dist/assets/`: logo, imagem conceitual e fonte local.
- `dist/robots.txt` e `dist/sitemap.xml`: orientações para mecanismos de busca.

Não existe compilação nem dependência de um framework. Alterações nos arquivos são servidas diretamente. Recarregue o preview depois de editar.

O contato padrão fica centralizado em `site-config.js`. Os links e os dados estruturados são atualizados com essa configuração. Mantenha também o telefone e Instagram escritos no HTML sincronizados: eles são o fallback sem JavaScript e a base para rastreadores. O e-mail permanece `null` na configuração até confirmação; não existe campo de e-mail público inventado.

## Referências e limites

Briefing de Vitor, enviado em 08/10/2026: suporte técnico especializado em informática, infraestrutura de tecnologia, redes de computadores, especialização em armazenamento cloud, montagem e manutenção de desktops e notebooks, inclusive gamer. Paleta solicitada: azul-claro, azul-escuro, preto e branco.

[Perfil público consultado](https://www.instagram.com/hostonlytecnologia/) em 09/10/2026: nome, logo e bio com Brasília-DF, infraestrutura, redes/Wi-Fi, cloud e suporte técnico. [Link de contato do perfil](https://wa.link/7jvsxz) redirecionou para `https://api.whatsapp.com/send?phone=5561994535613`, mostrando +55 61 99453-5613. Nenhuma mensagem foi enviada.

Logo original em PNG transparente (1291 × 1079 px), fornecido por Ítalo e registrado na memória do cliente, otimizado como WebP sem reconstrução da arte. O símbolo aparece com enquadramento via CSS ao lado do nome. O antigo logo do perfil permanece nos assets como referência. A imagem de hardware foi gerada como composição conceitual; não representa instalações ou equipamentos reais da empresa. Fonte Manrope auto-hospedada, licença SIL Open Font License incluída em `assets/manrope-OFL.txt`.

Endereço e horários confirmados por Ítalo em 09/10/2026: CLN 208, Bloco B, Loja 17 — Asa Norte, Brasília-DF; segunda a sexta, das 8h às 18h. E-mail, área de cobertura, prazos, garantias, preços e história institucional continuam não informados. Diferenciais descrevem o alcance do portfólio; não atribuem certificações, números ou promessas comerciais.

## Identidade visual proposta

Visual refinado em 09/10/2026 por solicitação de Ítalo. Azul profundo `#071522`, azul de infraestrutura `#0e2538`, azul-claro `#a5dfff`, branco `#ffffff`. Manrope local com carregamento antecipado; títulos amplos e hierarquia editorial. Cabeçalho integrado à abertura, cena original com personagem técnico cuidando de um computador, inspirada na composição da hero da ICB-AI, serviços em composição assimétrica e diagrama estático de equipamentos, redes e cloud. Contato e rodapé escuros completam a identidade. No celular, imagem com recorte próprio abaixo do texto e CTA, e serviços em uma coluna. A cena usa vídeo leve em loop com respiração, piscadas e pequenos movimentos do pulso com a chave, com pausa/retomada, respeito à preferência de movimento reduzido e parada fora da tela. Sem JavaScript, permanece estática. Arte gerada e prompt documentados em `HERO.md`. A proposta visual está em revisão e não equivale a um manual de marca aprovado.

## Publicação

Na Vercel, importe este repositório mantendo a Root Directory na raiz do projeto. `vercel.json` define `dist` como Output Directory; sem essa configuração, o deploy publica o repositório inteiro e a home retorna 404. O projeto estático não precisa de comando de build ou instalação. Pushes em `main` acionam a publicação automática no projeto conectado.

1. Validar com Vitor os textos, contatos e imagem conceitual. Endereço e horários já foram informados por Ítalo; manter site-config.js, HTML, FAQ e dados estruturados sincronizados ao alterar esses dados.
2. Logo original já incorporado. Se houver arquivo vetorial, ele poderá substituir a versão WebP futuramente.
3. Definir domínio comercial. A versão de demonstração já está pública na Vercel.
4. Canonical, Open Graph, JSON-LD, `robots.txt` e `sitemap.xml` apontam para a Vercel. Atualizar todos ao conectar um domínio comercial.
5. Hospedar o conteúdo de `dist/` por HTTPS e conectar o domínio. Configurar cache para os assets e validar a página no domínio.
6. Revisar no celular, testar o destino dos contatos e cadastrar o domínio no Google Search Console após publicação pública.


## Verificações

Consulte `VERIFICACOES.md` para os resultados registrados nesta entrega. Conteúdo e CTAs essenciais funcionam sem JavaScript; o JavaScript melhora menu e mensagens. O site não coleta dados por formulário. Os contatos abrem os aplicativos externos e dependem da disponibilidade do WhatsApp e Instagram.
