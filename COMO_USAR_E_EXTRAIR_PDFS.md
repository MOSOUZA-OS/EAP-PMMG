# Guia Completo - Aplicativo de Estudos EAP PMMG

Parabéns! O seu aplicativo de perguntas e respostas para o **EAP PMMG** foi criado com sucesso. Ele foi projetado para ser leve, rápido, com modo escuro, adaptado para celular e 100% gratuito.

---

## 1. Como Abrir e Estudar Agora

### No seu Computador:
1. Abra a pasta do projeto:  
   `C:\Users\Pichau\.gemini\antigravity\scratch\eap-pmmg-app`
2. Dê **dois cliques** no arquivo `iniciar.bat` (ou execute `python iniciar_servidor.py` no terminal).
3. O navegador abrirá automaticamente em `http://localhost:8080`.

### No seu Celular (Mesma rede Wi-Fi):
1. Enquanto o `iniciar.bat` estiver aberto no computador, conecte seu celular no mesmo Wi-Fi de casa.
2. Abra o navegador do celular (Chrome, Safari, etc.) e acerte o endereço exibido na tela preta (por exemplo):
   ```
   http://192.168.10.32:8080
   ```
3. **Dica de Ouro (Virar Aplicativo)**:
   - No Chrome (Android): toque nos três pontinhos e selecione **"Adicionar à tela inicial"** ou **"Instalar aplicativo"**.
   - No Safari (iPhone): toque no botão de compartilhar e selecione **"Adicionar à Tela de Início"**.
   - Pronto! Ele ganha um ícone no seu celular e abre em tela cheia como um app nativo.

---

## 2. Como Usar o App no Celular em Qualquer Lugar (4G/5G na rua ou quartel)

Para não depender do computador ligado na mesma rede, você pode hospedar essa pasta **100% de graça** na internet em menos de 2 minutos:

1. **GitHub Pages (Recomendado)**:
   - Crie uma conta gratuita no [GitHub](https://github.com).
   - Crie um repositório (ex: `eap-pmmg`) e faça o upload dos arquivos da pasta.
   - Vá em `Settings > Pages`, selecione a branch `main` e clique em Save.
   - Você receberá um link público (ex: `https://seunome.github.io/eap-pmmg`) que funciona em qualquer celular com 4G/5G.
2. **Netlify / Vercel**:
   - Basta arrastar e soltar a pasta no [Netlify Drop](https://app.netlify.com/drop) e terá um link seguro (`https://...`) instantâneo.

---

## 3. Como Transformar os seus PDFs do Google Drive em Questões

O aplicativo lê as questões do arquivo `questoes.json` ou pelo botão **"+" (Adicionar Questões)** no topo do app.

### Método Mais Fácil e Gratuito (Usando IA / Gemini):

1. Abra o [Google Gemini](https://gemini.google.com) (ou o modelo de sua preferência).
2. Anexe o seu PDF do Drive ou copie o texto do capítulo/módulo que deseja estudar.
3. Cole o seguinte prompt na IA:

```text
Você é um instrutor e examinador sênior da banca do Exame de Aptidão Profissional da Polícia Militar de Minas Gerais (EAP PMMG).
Com base no material em anexo/texto fornecido, elabore 10 questões inéditas de múltipla escolha (A, B, C, D) no estilo e rigor da banca PMMG.

Requisitos obrigatórios:
1. Cada questão deve ter exatamente 4 alternativas (A, B, C, D).
2. Apenas UMA alternativa correta.
3. No campo "explicacao", explique de forma detalhada o fundamento legal (artigo de lei, regulamento, diretriz ou doutrina da PMMG) que valida a resposta certa e aponte o erro das demais opções.
4. Responda ESTRITAMENTE em formato JSON puro, sem explicações fora do bloco de código, seguindo exatamente este padrão:

[
  {
    "id": "eap-topico-001",
    "tema": "Nome do Tema (ex: Legislação Institucional)",
    "assunto": "Nome do Assunto (ex: CEDPM - Lei 14.310/2002)",
    "enunciado": "Texto do enunciado da questão...",
    "opcoes": [
      { "id": "A", "texto": "Texto da alternativa A" },
      { "id": "B", "texto": "Texto da alternativa B" },
      { "id": "C", "texto": "Texto da alternativa C" },
      { "id": "D", "texto": "Texto da alternativa D" }
    ],
    "respostaCorreta": "B",
    "explicacao": "Fundamentação legal detalhada..."
  }
]
```

4. A IA vai te devolver o código JSON pronto.
5. No aplicativo, toque no ícone de **"+"** no canto superior direito, cole o código gerado e clique em **"Salvar no Aplicativo"**.
6. Suas novas questões estarão imediatamente disponíveis nos filtros!

---

## 4. Recursos do Aplicativo para Otimizar sua Aprovação

- **Sistema Anti-Repetição**: Toda pergunta que você responde fica salva na memória do navegador. Você nunca responderá a mesma pergunta duas vezes enquanto o ciclo não terminar.
- **Caderno de Erros**: Errou alguma questão? Ela vai automaticamente para o filtro **"Caderno de Erros"**. Use essa opção para revisar apenas seus pontos fracos antes da prova.
- **Feedback & Fundamentação**: Assim que você marca a alternativa e confirma, o app destaca a resposta em verde/vermelho e exibe o artigo da lei correspondente.
- **Painel de Rendimento**: Toque no ícone de gráfico para ver sua taxa de acerto separada por matéria. Se alguma matéria estiver abaixo de 70%, o app alerta para você focar mais nela.
