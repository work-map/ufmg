# WorkMap UFMG

Um aplicativo web para encontrar e sugerir locais de estudo, trabalho e convivência no campus da UFMG.

## ✨ Funcionalidades
- **Mapa interativo** com marcadores dos principais locais do campus
- **Busca por categorias** (Wi-Fi, Tomada, Ar-Condicionado, etc)
- **Visualização detalhada** de cada local, com foto, avaliação e categorias
- **Avaliação de locais** (link externo configurável)
- **Sugestão de novos locais** (link externo configurável)
- **Responsivo**: funciona bem em desktop e mobile

## 🚀 Como rodar localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/work-map/ufmg.git
   cd ufmg/workmap
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Configure as variáveis de ambiente:**
   - Copie o arquivo `.env.example` para `.env` e edite os links:
     ```bash
     cp .env.example .env
     # Edite .env conforme necessário
     ```
   - Exemplo de `.env`:
     ```env
     VITE_SUGGESTION_URL=https://forms.gle/SEU_FORM_SUGESTAO
     VITE_AVALIACAO_URL=https://forms.gle/SEU_FORM_AVALIACAO
     ```
4. **Rode o app em modo desenvolvimento:**
   ```bash
   npm run dev
   ```
   O app estará disponível em [http://localhost:5173](http://localhost:5173)

## 🛠️ Build para produção

```bash
npm run build
```
Os arquivos finais estarão em `dist/`.

## 🌐 Deploy no GitHub Pages

1. Certifique-se de que o campo `homepage` no `package.json` e o campo `base` no `vite.config.ts` estão corretos:
   - `homepage`: `https://work-map.github.io/ufmg`
   - `base`: `/ufmg/`
2. Faça o deploy:
   ```bash
   npm run deploy
   ```
3. O site ficará disponível em: [https://work-map.github.io/ufmg](https://work-map.github.io/ufmg)

## 📁 Estrutura de pastas
```
workmap/
  src/
    assets/photos/    # Fotos dos locais
    components/       # Componentes React
    App.tsx           # Componente principal
    ...
  .env.example        # Exemplo de variáveis de ambiente
  package.json        # Configurações do projeto
  vite.config.ts      # Configuração do Vite
```

## 👨‍💻 Tecnologias
- React + TypeScript
- Vite
- React-Leaflet + Leaflet
- CSS Modules

## 📢 Créditos
Desenvolvido por [work-map](https://github.com/work-map) para a comunidade UFMG.

---
Sinta-se à vontade para contribuir, sugerir melhorias ou reportar bugs!
