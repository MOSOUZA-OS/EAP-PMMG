# Guia Completo - Aplicativo de Estudos EAP PMMG

O seu aplicativo de estudos para o **EAP PMMG** conta com um sistema de **Lotes e Rodadas de Questões Inéditas** para que você possa esgotar todo o conteúdo dos seus PDFs sem repetições.

---

## 1. Como Funciona a Progressão por Lotes e Rodadas

Atualmente, o aplicativo já vem com **80 questões completas e inéditas** divididas em lotes:
* **Lote 1 (Questões 1 a 40)**: Cobre todo o edital (CEDPM, EMEMG, CPM, CPPM, Doutrina Operacional da PMMG, POP e Leis Extravagantes).
* **Lote 2 (Questões 41 a 80)**: Aprofundamento dos mesmos temas e novos tópicos sem repetir nenhuma pergunta anterior!

### Regra de Ouro da Ineditismo:
- Enquanto houver questões não respondidas no banco, **nenhuma pergunta já feita volta a aparecer**.
- Você faz a **Rodada 1 (10 questões)** &rarr; **Rodada 2 (10 novas)** &rarr; **Rodada 3 (10 novas)** &rarr; **Rodada 4 (10 novas)**... totalizando 40 questões.
- Ao concluir as 40 primeiras, o app mostra: **"Restam 40 inéditas no banco (Lote 2)"** com o botão: **`🚀 Próxima Rodada (Inéditas)`**.
- Você segue pelas próximas 40 questões (do Lote 2), todas inéditas!

---

## 2. Como Gerar o "Lote 3", "Lote 4", etc. (Mais 40 Questões a Cada Rodada)

Quando você estiver perto de concluir ou quiser adicionar novos lotes de 40 questões direto dos seus PDFs do Google Drive:

1. Acesse o [Google Gemini](https://gemini.google.com) (gratuito).
2. Anexe o seu PDF de estudo (ou copie o texto dos tópicos do seu material).
3. Cole o prompt abaixo:

```text
Você é um instrutor e examinador sênior da banca do Exame de Aptidão Profissional da Polícia Militar de Minas Gerais (EAP PMMG).
Com base no material anexo/fornecido, elabore um novo lote de 40 questões inéditas de múltipla escolha (A, B, C, D) no estilo e rigor da banca PMMG.

Requisitos obrigatórios:
1. Questões novas que abordem os pontos e detalhes ainda não explorados do material.
2. Cada questão deve ter exatamente 4 alternativas (A, B, C, D) com apenas UMA correta.
3. No campo "explicacao", indique expressamente o fundamento legal (artigo de lei, norma, POP ou diretriz da PMMG) que valida a resposta certa e aponte o erro das demais.
4. Utilize identificadores únicos sequenciais (ex: lote3-001, lote3-002, etc.).
5. Responda ESTRITAMENTE em formato JSON puro, sem textos antes ou depois do array:

[
  {
    "id": "lote3-001",
    "tema": "Legislação Institucional",
    "assunto": "CEDPM - Lei Estadual nº 14.310/2002",
    "enunciado": "Texto da questão...",
    "opcoes": [
      { "id": "A", "texto": "Texto A" },
      { "id": "B", "texto": "Texto B" },
      { "id": "C", "texto": "Texto C" },
      { "id": "D", "texto": "Texto D" }
    ],
    "respostaCorreta": "B",
    "explicacao": "Fundamentação legal detalhada..."
  }
]
```

4. No aplicativo, toque no ícone de **`+`** (canto superior direito) ou no botão de importação.
5. Cole o JSON gerado e clique em **"Salvar no Aplicativo"**.
6. As novas 40 questões entram imediatamente na fila de inéditas! O aplicativo continuará puxando essas novas questões sem repetir nenhuma das 80 anteriores!

---

## 3. O que acontece quando 100% de todo o material for esgotado?

Quando você responder todos os lotes cadastrados e não houver mais nenhuma questão inédita:
1. O aplicativo exibe a tela: **"100% das Questões Inéditas Concluídas!"**.
2. Você pode clicar em **`+ Inserir Questões dos PDFs`** para colocar mais um lote de 40 questões novas.
3. Ou pode clicar em **`🔄 Iniciar Ciclo de Reforço`**:
   - As perguntas do seu material voltam, mas **as alternativas A, B, C, D vêm embaralhadas aleatoriamente** para você não acertar por reflexo de letra decorada.
   - As questões que você errou nos lotes anteriores têm **prioridade máxima** e aparecem primeiro.

---

## 4. Atualizando no Celular (GitHub)

Para atualizar o app no seu celular com os 2 Lotes (80 questões) e o sistema de rodadas:
Envie para o seu repositório no GitHub os seguintes arquivos da pasta:
- `questoes.json`
- `app.js`
- `index.html`
- `sw.js`
