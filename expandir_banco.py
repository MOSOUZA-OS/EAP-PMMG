import json

mais_10_questoes = [
  {
    "id": "eap-pmmg-031",
    "tema": "Legislação Institucional",
    "assunto": "Redação Oficial e Comunicação PMMG",
    "enunciado": "No âmbito da correspondência e redação oficial da Polícia Militar de Minas Gerais (Instruções e Manual de Redação Oficial), a comunicação interna de caráter eminentemente administrativo, ágil e sucinto, transitada entre chefias ou setores de uma mesma OPM, é o:",
    "opcoes": [
      { "id": "A", "texto": "Ofício externo com aviso de recebimento." },
      { "id": "B", "texto": "Memorando." },
      { "id": "C", "texto": "Edital de citação militar." },
      { "id": "D", "texto": "Decreto corporativo autônomo." }
    ],
    "respostaCorreta": "B",
    "explicacao": "Na redação oficial padrão da PMMG e da administração pública, o Memorando é a modalidade de comunicação interna entre unidades ou seções da mesma instituição, primando pela celeridade, clareza e concisão no trâmite de informações rotineiras."
  },
  {
    "id": "eap-pmmg-032",
    "tema": "Direito Penal Militar",
    "assunto": "Crimes Militares em Espécie (CPM)",
    "enunciado": "Praticar violência contra superior (art. 157 do CPM) e desrespeitar superior diante de outro militar (art. 160 do CPM) são crimes que tutelam principalmente:",
    "opcoes": [
      { "id": "A", "texto": "Apenas a honra subjetiva e individual da pessoa física do oficial ou graduado." },
      { "id": "B", "texto": "A autoridade e a disciplina militares, princípios constitucionais basilares das instituições militares." },
      { "id": "C", "texto": "A integridade do erário e o patrimônio das Forças de Segurança." },
      { "id": "D", "texto": "A incolumidade do tráfego urbano em áreas militares." }
    ],
    "respostaCorreta": "B",
    "explicacao": "Os crimes contra a autoridade ou disciplina militar (arts. 149 a 166 do CPM) têm como bem jurídico mediato e principal a autoridade, a hierarquia e a disciplina militares, pilares previstos expressamente no art. 42 c/c art. 142 da Constituição Federal."
  },
  {
    "id": "eap-pmmg-033",
    "tema": "Doutrina Operacional e POP",
    "assunto": "Técnicas de Abordagem a Veículos",
    "enunciado": "Conforme o POP da PMMG para abordagem policial a veículos em atitude suspeita, a viatura policial deve posicionar-se taticamente em relação ao veículo abordado:",
    "opcoes": [
      { "id": "A", "texto": "Na frente do veículo suspeito, bloqueando seu capô em ângulo de 90 graus." },
      { "id": "B", "texto": "Na retaguarda do veículo suspeito, a uma distância de segurança de aproximadamente 4 a 5 metros, alinhada ligeiramente à esquerda (cobrindo a linha de fuga), permitindo abrigo seguro aos militares na abertura das portas." },
      { "id": "C", "texto": "Colada lado a lado na porta do motorista do veículo abordado com os policiais dentro da viatura." },
      { "id": "D", "texto": "A mais de 50 metros de distância, aguardando que o suspeito desembarque voluntariamente sem comandos verbais." }
    ],
    "respostaCorreta": "B",
    "explicacao": "A técnica de abordagem a veículos da PMMG preconiza que a viatura policial deve parar à retaguarda do veículo abordado, resguardando distância de segurança (4 a 5 metros), levemente deslocada à esquerda para proporcionar ângulo visual, proteção balística do bloco do motor e segurança no desembarque dos operadores."
  },
  {
    "id": "eap-pmmg-034",
    "tema": "Legislação Extravagante",
    "assunto": "Lei de Abuso de Autoridade - Lei nº 13.869/2019",
    "enunciado": "Submeter o preso ou detido a interrogatório policial durante o período de repouso noturno, salvo se capturado em flagrante delito ou com seu prévio consentimento assistido por defensor (art. 18 da Lei 13.869/2019):",
    "opcoes": [
      { "id": "A", "texto": "Configura conduta atípica, pois a polícia tem discricionariedade absoluta para interrogar a qualquer hora." },
      { "id": "B", "texto": "Constitui crime de abuso de autoridade punido com pena de detenção e multa." },
      { "id": "C", "texto": "Gera apenas advertência administrativa do chefe imediato, sem qualquer repercussão penal." },
      { "id": "D", "texto": "É permitido independentemente de flagrante delito para agilizar o encerramento do REDS." }
    ],
    "respostaCorreta": "B",
    "explicacao": "O art. 18 da Lei nº 13.869/2019 tipifica como crime de abuso de autoridade 'Submeter o preso, internado ou apreendido a interrogatório policial durante o período de repouso noturno, salvo se capturado em flagrante delito ou se ele, devidamente assistido, consentir em prestar declarações' (detenção de 6 meses a 2 anos e multa)."
  },
  {
    "id": "eap-pmmg-035",
    "tema": "Legislação Institucional",
    "assunto": "CEDPM - Lei Estadual nº 14.310/2002",
    "enunciado": "Segundo o CEDPM (Lei nº 14.310/2002), sobre a Comissão Processante Disciplinar (CPD) e os Processos Administrativos Disciplinares (PAD), é garantia expressa assegurada ao militar acusado:",
    "opcoes": [
      { "id": "A", "texto": "O direito ao contraditório e à ampla defesa, com a oportunidade de arrolar testemunhas e apresentar defesa escrita acompanhada de advogado ou defensor dativo." },
      { "id": "B", "texto": "O dever de confessar a prática do ato ilícito para obter direito a recurso." },
      { "id": "C", "texto": "A obrigatoriedade de julgamento secreto sem acesso aos autos antes da decisão final." },
      { "id": "D", "texto": "A dispensa de notificação formal dos atos do processo quando se tratar de praça." }
    ],
    "respostaCorreta": "A",
    "explicacao": "O art. 5º, LV da Constituição e o CEDPM consagram o princípio da ampla defesa e do contraditório no processo administrativo disciplinar militar, com prazo para apresentação de defesa, arrolamento de testemunhas e assistência jurídica por advogado constituído ou defensor designado."
  },
  {
    "id": "eap-pmmg-036",
    "tema": "Direito Penal Militar",
    "assunto": "Crimes Militares em Espécie (CPM)",
    "enunciado": "No crime de Peculato culposo (art. 303, § 3º e § 4º do CPM), a reparação do dano patrimonial antes da sentença condenatória irrecorrível:",
    "opcoes": [
      { "id": "A", "texto": "Aumenta a pena de metade pela confissão da culpa." },
      { "id": "B", "texto": "Extingue a punibilidade do agente militar." },
      { "id": "C", "texto": "Apenas converte a pena de reclusão em detenção simples." },
      { "id": "D", "texto": "Não produz qualquer efeito na esfera penal militar." }
    ],
    "respostaCorreta": "B",
    "explicacao": "Conforme o art. 303, § 4º do Código Penal Militar, no peculato culposo, a reparação do dano, se precede a sentença irrecorrível, extingue a punibilidade; se lhe é posterior, reduz de metade a pena imposta."
  },
  {
    "id": "eap-pmmg-037",
    "tema": "Doutrina Operacional e POP",
    "assunto": "Uso Diferenciado da Força",
    "enunciado": "No contínuo do uso da força adotado pela PMMG, perante uma atitude de 'Resistência Passiva' (indivíduo que não acata a ordem verbal mas não agride os policiais fisicamente, como sentar no chão e se recusar a sair), o nível de força proporcional correspondente é:",
    "opcoes": [
      { "id": "A", "texto": "Emprego imediato de arma de fogo letal." },
      { "id": "B", "texto": "Técnicas de controle de contato e condução física (imobilização tática de baixa lesividade)." },
      { "id": "C", "texto": "Disparo de elastômero (bala de borracha) à queima-roupa na cabeça." },
      { "id": "D", "texto": "Retirada incontinenti da guarnição do local sem intervenção." }
    ],
    "respostaCorreta": "B",
    "explicacao": "Na escala progressiva de força: à presença policial responde a cooperação; à resistência passiva responde o controle de contato (técnicas de mãos livres e condução); à resistência ativa responde o controle físico/técnicas não letais de impacto moderado; à agressão letal responde a força potencialmente letal (arma de fogo)."
  },
  {
    "id": "eap-pmmg-038",
    "tema": "Legislação Extravagante",
    "assunto": "Crimes de Trânsito no Contexto Policial (CTB)",
    "enunciado": "Segundo o Código de Trânsito Brasileiro (CTB - Lei nº 9.503/1997), as viaturas policiais quando em serviço de urgência e devidamente identificadas por dispositivos regulamentares de alarme sonoro (sirene) e iluminação vermelha intermitente (giroflex):",
    "opcoes": [
      { "id": "A", "texto": "Gozam de livre circulação, estacionamento e parada, devendo os condutores agir com cautela e velocidade compatível com a segurança viária nos cruzamentos." },
      { "id": "B", "texto": "Têm imunidade penal absoluta em caso de colisão com vítimas fatais decorrente de excesso manifesto de velocidade." },
      { "id": "C", "texto": "Podem transitar em velocidade ilimitada sem necessidade de acionar giroflex e sirene." },
      { "id": "D", "texto": "Não possuem qualquer preferência de passagem frente aos demais veículos particulares." }
    ],
    "respostaCorreta": "A",
    "explicacao": "Art. 29, VII do CTB: Os veículos destinados a socorro de incêndio e salvamento, os de polícia, os de fiscalização e operação de trânsito e as ambulâncias, além de prioridade no trânsito, gozam de livre circulação, estacionamento e parada, quando em serviço de urgência, de policiamento ostensivo ou de preservação da ordem pública, observada a devida cautela."
  },
  {
    "id": "eap-pmmg-039",
    "tema": "Legislação Institucional",
    "assunto": "EMEMG - Lei Estadual nº 5.301/1969",
    "enunciado": "Conforme o Estatuto dos Militares (Lei nº 5.301/1969), o militar da ativa que permanecer por mais de 24 (vinte e quatro) horas consecutivas sem que se saiba o seu paradeiro e sem que haja deixado notícia de onde possa ser encontrado é considerado oficialmente:",
    "opcoes": [
      { "id": "A", "texto": "Desaparecido." },
      { "id": "B", "texto": "Extraviado definitivo." },
      { "id": "C", "texto": "Desertor consumado." },
      { "id": "D", "texto": "Rebelde." }
    ],
    "respostaCorreta": "A",
    "explicacao": "Conforme o EMEMG (Lei 5.301/1969), é considerado desaparecido o militar da ativa que, no desempenho de qualquer serviço, em viagem, em operações policiais ou em caso de calamidade pública, tiver paradeiro ignorado por mais de 24 horas consecutivas. Se a ausência persistir por mais de trinta dias, é considerado oficialmente extraviado."
  },
  {
    "id": "eap-pmmg-040",
    "tema": "Doutrina Operacional e POP",
    "assunto": "Comunicação Operacional e REDS",
    "enunciado": "No registro do Registro de Eventos de Defesa Social (REDS) pela guarnição policial militar, o histórico da ocorrência policial deve atender aos seguintes atributos fundamentais da redação técnico-policial:",
    "opcoes": [
      { "id": "A", "texto": "Subjetividade, inclusão de opiniões pessoais dos militares e omissão do rol de testemunhas." },
      { "id": "B", "texto": "Objetividade, clareza, precisão, veracidade cronológica dos fatos e descrição fiel das providências adotadas." },
      { "id": "C", "texto": "Uso obrigatório de gírias e expressões regionais coloquiais para retratar a linguagem dos infratores." },
      { "id": "D", "texto": "Anonimato de todos os envolvidos e ausência de qualificação dos bens apreendidos." }
    ],
    "respostaCorreta": "B",
    "explicacao": "O REDS (boletim de ocorrência da PMMG) é documento público com fé pública e força probatória. Seu histórico deve primar pela impessoalidade, clareza, concisão, exatidão dos horários e locais, e relato fidedigno das circunstâncias da ação e das providências de custódia e apreensão."
  }
]

with open('questoes.json', 'r', encoding='utf-8') as f:
    existentes = json.load(f)

ids_existentes = {q['id'] for q in existentes}
adicionadas = 0

for nq in mais_10_questoes:
    if nq['id'] not in ids_existentes:
        existentes.append(nq)
        ids_existentes.add(nq['id'])
        adicionadas += 1

with open('questoes.json', 'w', encoding='utf-8') as f:
    json.dump(existentes, f, ensure_ascii=False, indent=2)

print(f"Sucesso! {adicionadas} novas questões inseridas. Total no banco: {len(existentes)} questões.")
