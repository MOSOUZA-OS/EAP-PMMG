import json

mais_20_questoes = [
  {
    "id": "eap-pmmg-061",
    "tema": "Legislação Institucional",
    "assunto": "CEDPM - Lei Estadual nº 14.310/2002",
    "enunciado": "A respeito das recompensas militares previstas no CEDPM (Lei nº 14.310/2002), constituem formas legítimas de reconhecimento pelo bom desempenho do militar:",
    "opcoes": [
      { "id": "A", "texto": "Elogio individual ou coletivo, dispensa do serviço e cancelamento de sanções disciplinares." },
      { "id": "B", "texto": "Concessão discricionária de porte de armas de uso exclusivo das forças armadas sem registro." },
      { "id": "C", "texto": "Aumento salarial compulsório concedido diretamente pelo capitão da companhia." },
      { "id": "D", "texto": "Imunidade absoluta a qualquer processo disciplinar futuro." }
    ],
    "respostaCorreta": "A",
    "explicacao": "Conforme os arts. 77 a 80 do CEDPM, são recompensas militares conferidas aos integrantes das corporações militares de Minas Gerais: o elogio, a dispensa de serviço, o cancelamento de registros de sanções disciplinares e outras honrarias e condecorações legalmente instituídas."
  },
  {
    "id": "eap-pmmg-062",
    "tema": "Legislação Institucional",
    "assunto": "EMEMG - Lei Estadual nº 5.301/1969",
    "enunciado": "Segundo o Estatuto dos Militares (Lei 5.301/1969), o militar da ativa que contrair matrimônio terá direito a afastamento total do serviço (licença nupcial) pelo período de:",
    "opcoes": [
      { "id": "A", "texto": "8 (oito) dias consecutivos." },
      { "id": "B", "texto": "2 (dois) dias úteis." },
      { "id": "C", "texto": "15 (quinze) dias corridos." },
      { "id": "D", "texto": "30 (trinta) dias com prejuízo dos vencimentos." }
    ],
    "respostaCorreta": "A",
    "explicacao": "O Estatuto dos Militares do Estado de Minas Gerais assegura ao militar o direito de afastar-se do serviço por 8 (oito) dias consecutivos em razão de núpcias (casamento), assim como por 8 dias em caso de luto (falecimento de cônjuge, pais, filhos ou irmãos)."
  },
  {
    "id": "eap-pmmg-063",
    "tema": "Direito Penal Militar",
    "assunto": "Crimes Militares em Espécie (CPM)",
    "enunciado": "O crime militar de Falsidade Ideológica (art. 312 do CPM) consuma-se quando o agente:",
    "opcoes": [
      { "id": "A", "texto": "Omitir, em documento público ou particular militar, declaração que dele devia constar, ou nele inserir ou fazer inserir declaração falsa ou diversa da que devia ser escrita, com o fim de prejudicar direito ou criar obrigação." },
      { "id": "B", "texto": "Rabiscar ou amassar involuntariamente cópia de documento sem fé pública." },
      { "id": "C", "texto": "Falsificar a assinatura material em papel moeda corrente internacional." },
      { "id": "D", "texto": "Extraviar documento militar por mera negligência durante o patrulhamento." }
    ],
    "respostaCorreta": "A",
    "explicacao": "Art. 312 do CPM: 'Omitir, em documento público ou particular, declaração que dele devia constar, ou nele inserir ou fazer inserir declaração falsa ou diversa da que devia ser escrita, com o fim de prejudicar direito, criar obrigação ou alterar a verdade sobre fato juridicamente relevante'."
  },
  {
    "id": "eap-pmmg-064",
    "tema": "Direito Penal Militar",
    "assunto": "Crimes Militares em Espécie (CPM)",
    "enunciado": "Desrespeitar superior diante de outro militar (art. 160 do CPM) e Desacato a militar no exercício da função (art. 299 do CPM) distinguem-se porque:",
    "opcoes": [
      { "id": "A", "texto": "O crime do art. 160 tutela a hierarquia militar e exige que o ofendido seja superior hierárquico e que haja presença de outro militar; enquanto o art. 299 tutela o prestígio da autoridade militar em geral, mesmo entre iguais ou contra inferior em serviço." },
      { "id": "B", "texto": "Ambos exigem que o agente seja oficial superior reformado." },
      { "id": "C", "texto": "O desacato só ocorre em tempo de guerra externa." },
      { "id": "D", "texto": "O desrespeito a superior é punido apenas com repreensão administrativa." }
    ],
    "respostaCorreta": "A",
    "explicacao": "O crime de desrespeito a superior (art. 160) exige a presença de outro militar e qualidade de superior da vítima. O desacato a militar (art. 299) consiste em desacatar militar no exercício de função ou em razão dela, podendo o sujeito passivo ser superior, igual ou subordinado que esteja atuando no estrito exercício funcional."
  },
  {
    "id": "eap-pmmg-065",
    "tema": "Direito Processual Penal Militar",
    "assunto": "Prisão em Flagrante Delito (CPPM)",
    "enunciado": "Nos termos do Código de Processo Penal Militar (CPPM), quando um militar estadual cometer crime militar e for capturado em flagrante:",
    "opcoes": [
      { "id": "A", "texto": "Deverá ser lavrado o Auto de Prisão em Flagrante Delito (APFD) por autoridade de polícia judiciária militar competente, sendo o preso recolhido a unidade prisional militar." },
      { "id": "B", "texto": "Deverá ser conduzido à carceragem de presos comuns da penitenciária civil." },
      { "id": "C", "texto": "Ficará dispensado de qualquer lavratura caso possua mais de 10 anos de serviço." },
      { "id": "D", "texto": "O flagrante só pode ser lavrado se houver confissão por escritura pública." }
    ],
    "respostaCorreta": "A",
    "explicacao": "Nos termos do art. 243 e seguintes do CPPM e da Constituição (art. 125, § 4º), os militares dos Estados têm prerrogativa de prisão em recinto de unidade militar de sua própria corporação, sendo o auto de prisão em flagrante por crime militar lavrado pela autoridade militar competente."
  },
  {
    "id": "eap-pmmg-066",
    "tema": "Doutrina Operacional e POP",
    "assunto": "Triângulo de Segurança e Ponto Base",
    "enunciado": "No posicionamento dos militares de uma guarnição durante a permanência em Ponto Base (PB) ou blitz de trânsito, a regra tática fundamental de sobrevivência policial consiste em:",
    "opcoes": [
      { "id": "A", "texto": "Adotar o Triângulo de Segurança (visão de 360 graus mútua), mantendo os militares distribuídos de forma a cobrir as costas e pontos cegos uns dos outros." },
      { "id": "B", "texto": "Permanecerem todos agrupados de costas para o tráfego olhando para a mesma tela de celular." },
      { "id": "C", "texto": "Ficarem os militares sentados no interior da viatura com vidros fechados sem visual do entorno." },
      { "id": "D", "texto": "Ficar apenas um militar em pé enquanto os demais dormem na retaguarda." }
    ],
    "respostaCorreta": "A",
    "explicacao": "O Triângulo de Segurança na doutrina da PMMG garante que a equipe mantenha cobertura de 360 graus, impedindo a aproximação furtiva de ameaças e assegurando que um policial sempre proteja a retaguarda do companheiro."
  },
  {
    "id": "eap-pmmg-067",
    "tema": "Doutrina Operacional e POP",
    "assunto": "Abordagem a Coletivos de Transporte",
    "enunciado": "Na abordagem policial a ônibus coletivo urbano em atitude suspeita (segundo o POP da PMMG):",
    "opcoes": [
      { "id": "A", "texto": "A guarnição deve estabelecer verbalização clara, determinar que os passageiros mantenham as mãos visíveis sobre os bancos ou encostos e realizar a inspeção visual preliminar antes de desembarques precipitados." },
      { "id": "B", "texto": "Os policiais devem ingressar atirando no teto do veículo para assustar possíveis assaltantes." },
      { "id": "C", "texto": "Deve-se mandar todos os passageiros correrem juntos em direção à porta traseira." },
      { "id": "D", "texto": "A viatura policial deve empurrar o ônibus para fora da pista." }
    ],
    "respostaCorreta": "A",
    "explicacao": "O Procedimento Operacional Padrão da PMMG determina que em coletivos a equipe priorize a verbalização firme e serena, controle das mãos de todos os passageiros para evitar disparos no ambiente confinado, mantendo cobertura externa na porta dianteira e traseira."
  },
  {
    "id": "eap-pmmg-068",
    "tema": "Doutrina Operacional e POP",
    "assunto": "Cadeia de Custódia e Lacre de Vestígios",
    "enunciado": "De acordo com as regras da Cadeia de Custódia (art. 158-A do CPP) adotadas pela PMMG, todo vestígio recolhido em local de crime (como armas, drogas ou cápsulas):",
    "opcoes": [
      { "id": "A", "texto": "Deve ser acondicionado em embalagem individual apropriada, devidamente lacrada, numerada e identificada, não podendo ser violada senão pelo perito oficial." },
      { "id": "B", "texto": "Pode ser misturado em sacolas de supermercado sem identificação dos policiais." },
      { "id": "C", "texto": "Pode ser manuseado e testado por curiosos antes da chegada à delegacia." },
      { "id": "D", "texto": "Dispensa formalidades caso se trate de objeto de baixo valor monetário." }
    ],
    "respostaCorreta": "A",
    "explicacao": "A cadeia de custódia (Lei nº 13.964/2019 e instruções da PMMG) é o conjunto de procedimentos utilizados para manter e documentar a história cronológica do vestígio, exigindo lacre individual numerado para assegurar a autenticidade e validade jurídica da prova."
  },
  {
    "id": "eap-pmmg-069",
    "tema": "Legislação Extravagante",
    "assunto": "Estatuto da Pessoa Idosa - Lei nº 10.741/2003",
    "enunciado": "A conduta de apropriar-se de ou desviar bens, proventos, pensão ou qualquer outro rendimento de pessoa idosa, dando-lhes aplicação diversa da de sua finalidade (art. 102 do Estatuto do Idoso):",
    "opcoes": [
      { "id": "A", "texto": "Constitui crime punido com pena de reclusão de 1 a 4 anos e multa." },
      { "id": "B", "texto": "Configura mera discordância civil sem repercussão na esfera penal." },
      { "id": "C", "texto": "É infração punida apenas se houver lesão corporal grave associada." },
      { "id": "D", "texto": "Fica isenta de pena se o agente for filho do idoso, por imunidade absoluta da lei civil." }
    ],
    "respostaCorreta": "A",
    "explicacao": "O art. 102 da Lei nº 10.741/2003 tipifica o crime de apropriação indébita ou desvio de bens de pessoa idosa com reclusão de 1 a 4 anos e multa. Importante: nos crimes contra idosos não se aplicam as imunidades patrimoniais dos arts. 181 e 182 do Código Penal."
  },
  {
    "id": "eap-pmmg-070",
    "tema": "Legislação Extravagante",
    "assunto": "Lei de Abuso de Autoridade - Lei nº 13.869/2019",
    "enunciado": "Nos termos do art. 22 da Lei nº 13.869/2019, invadir ou adentrar, clandestina ou astuciosamente, ou à revelia da vontade do ocupante, imóvel alheio ou suas dependências, sem determinação judicial ou fora das condições estabelecidas em lei:",
    "opcoes": [
      { "id": "A", "texto": "Constitui crime de abuso de autoridade punido com pena de detenção de 1 a 4 anos e multa." },
      { "id": "B", "texto": "É lícito a qualquer hora do dia ou da noite independentemente de flagrante delito." },
      { "id": "C", "texto": "Constitui infração de trânsito punida com remoção da viatura." },
      { "id": "D", "texto": "Não se aplica a policiais fardados em patrulhamento de bairro." }
    ],
    "respostaCorreta": "A",
    "explicacao": "O art. 22 da Lei nº 13.869/2019 tipifica a invasão de domicílio sem as causas constitucionais autorizadoras (flagrante delito, desastre, socorro ou consentimento do morador) com pena de detenção de 1 a 4 anos e multa."
  },
  {
    "id": "eap-pmmg-071",
    "tema": "Legislação Institucional",
    "assunto": "CEDPM - Lei Estadual nº 14.310/2002",
    "enunciado": "A respeito do Conselho de Ética e Disciplina Militares da Unidade (CEDM) previsto no CEDPM, assinale a opção CORRETA sobre sua composição e atribuições:",
    "opcoes": [
      { "id": "A", "texto": "É órgão colegiado de natureza consultiva encarregado de emitir parecer sobre a conduta disciplinar e mérito de militares submetidos a processos disciplinares na Unidade." },
      { "id": "B", "texto": "Tem competência exclusiva para decretar a prisão preventiva de coronéis da corporação." },
      { "id": "C", "texto": "É formado exclusivamente por cidadãos civis sem ligação com a PMMG." },
      { "id": "D", "texto": "Seus pareceres têm força de lei em todo o território nacional." }
    ],
    "respostaCorreta": "A",
    "explicacao": "Conforme o CEDPM, o CEDM (Conselho de Ética e Disciplina Militares) instituído em cada Unidade é um órgão colegiado de caráter consultivo, cuja atribuição é assessorar o Comandante nos julgamentos disciplinares e na avaliação de conduta e conceitos éticos."
  },
  {
    "id": "eap-pmmg-072",
    "tema": "Legislação Institucional",
    "assunto": "EMEMG - Lei Estadual nº 5.301/1969",
    "enunciado": "Conforme o EMEMG (Lei 5.301/1969), o militar da ativa que vier a falecer em consequência de ato de bravura ou em cumprimento do dever policial militar será promovido:",
    "opcoes": [
      { "id": "A", "texto": "Post-mortem, ao posto ou graduação imediatamente superior." },
      { "id": "B", "texto": "Por antiguidade tardia sem qualquer reflexo pecuniário para os herdeiros." },
      { "id": "C", "texto": "Ex-officio honorífico sem aposentadoria." },
      { "id": "D", "texto": "Apenas se tiver concluído o curso de formação de oficiais." }
    ],
    "respostaCorreta": "A",
    "explicacao": "A promoção post-mortem é concedida pela corporação ao militar que falecer no cumprimento do dever ou em consequência de ferimento recebido em serviço, ou que tenha sido julgado apto para promoção anterior ao falecimento, garantindo pensão proporcional aos seus dependentes."
  },
  {
    "id": "eap-pmmg-073",
    "tema": "Direito Penal Militar",
    "assunto": "Crimes Militares em Espécie (CPM)",
    "enunciado": "O crime de Deserção no CPM (art. 187) possui como particularidade processual:",
    "opcoes": [
      { "id": "A", "texto": "A possibilidade de captura e prisão do desertor por qualquer pessoa, sem necessidade de mandado judicial formal prévio, por se tratar de crime propriamente militar permanente." },
      { "id": "B", "texto": "A exigência de autorização do Senado Federal para detenção do militar faltoso." },
      { "id": "C", "texto": "A imprescritibilidade absoluta mesmo após os 70 anos de idade do agente." },
      { "id": "D", "texto": "A necessidade de homologação pelo Ministério Público antes de lavrar o termo de ausência." }
    ],
    "respostaCorreta": "A",
    "explicacao": "Conforme o Código de Processo Penal Militar (art. 243, § 1º) e a jurisprudência consolidada, o desertor pode ser preso por qualquer autoridade ou cidadão onde quer que seja encontrado, independentemente de prévia ordem judicial escrita, tendo em vista a natureza permanente e grave do crime contra o dever militar."
  },
  {
    "id": "eap-pmmg-074",
    "tema": "Doutrina Operacional e POP",
    "assunto": "Abordagem a Motocicletas Suspeitas",
    "enunciado": "Ao realizar abordagem a uma motocicleta ocupada por dois indivíduos em atitude suspeita, a guarnição policial deve redobrar a atenção prioritariamente em relação:",
    "opcoes": [
      { "id": "A", "texto": "Ao passageiro (garupa), pois este possui as mãos livres, maior campo de tiro e maior facilidade para sacar armas contra os militares." },
      { "id": "B", "texto": "Exclusivamente ao escapamento da motocicleta." },
      { "id": "C", "texto": "Ao capacete apenas para verificar a validade do selo do Inmetro." },
      { "id": "D", "texto": "À placa do veículo ignorando os gestos dos ocupantes." }
    ],
    "respostaCorreta": "A",
    "explicacao": "O POP da PMMG adverte que em abordagens a motocicletas com dois ocupantes, o garupa representa a ameaça mais letal imediata, pois não está ocupado com os comandos de condução da moto (guidão, embreagem e freio), podendo reagir armadamente em frações de segundo."
  },
  {
    "id": "eap-pmmg-075",
    "tema": "Legislação Extravagante",
    "assunto": "Lei de Tortura - Lei nº 9.455/1997",
    "enunciado": "Aquele que se omite em face das condutas de tortura, quando tinha o dever de evitá-las ou apurá-las (art. 1º, § 2º da Lei 9.455/1997):",
    "opcoes": [
      { "id": "A", "texto": "Incorre na pena de detenção de 1 a 4 anos (tortura por omissão)." },
      { "id": "B", "texto": "Responde na mesma pena privativa de liberdade dos autores imediatos (reclusão de 4 a 10 anos)." },
      { "id": "C", "texto": "Pratica conduta atípica, pois a omissão nunca é punida no direito brasileiro." },
      { "id": "D", "texto": "Recebe apenas repreensão ética da Corregedoria." }
    ],
    "respostaCorreta": "A",
    "explicacao": "A chamada 'tortura por omissão' (art. 1º, § 2º da Lei nº 9.455/1997) pune aquele que se omite em face da tortura quando tinha o dever jurídico de evitá-la ou apurá-la com pena de detenção de 1 a 4 anos (pena mais branda que a da tortura ativa, mas com efeitos disciplinares severos para superiores e corregedores)."
  },
  {
    "id": "eap-pmmg-076",
    "tema": "Legislação Institucional",
    "assunto": "CEDPM - Lei Estadual nº 14.310/2002",
    "enunciado": "No CEDPM, cometer transgressão disciplinar para a qual não haja justificativa plausível, estando o militar sob o efeito de bebida alcoólica ou substância entorpecente:",
    "opcoes": [
      { "id": "A", "texto": "Constitui circunstância que agrava a sanção disciplinar a ser imposta." },
      { "id": "B", "texto": "Constitui causa de justificação automática que extingue a punibilidade." },
      { "id": "C", "texto": "Impede a instauração de qualquer processo disciplinar pelo prazo de 6 meses." },
      { "id": "D", "texto": "Converte a sanção em elogio meritório." }
    ],
    "respostaCorreta": "A",
    "explicacao": "Conforme o art. 21 do CEDPM, estar sob a influência de álcool ou de substância entorpecente ao cometer a infração disciplinar é circunstância expressamente agravante, demonstrando quebra do dever de sobriedade inerente à carreira militar."
  },
  {
    "id": "eap-pmmg-077",
    "tema": "Direito Penal Militar",
    "assunto": "Crimes Militares em Espécie (CPM)",
    "enunciado": "Subtrair, ou concorrer para que seja subtraído, em proveito próprio ou alheio, coisa móvel da administração militar, valendo-se da facilidade que lhe proporciona a qualidade de militar, configura:",
    "opcoes": [
      { "id": "A", "texto": "Peculato-furto (art. 303, § 2º do CPM)." },
      { "id": "B", "texto": "Roubo militar qualificado." },
      { "id": "C", "texto": "Apropriação de coisa havida por erro." },
      { "id": "D", "texto": "Estelionato administrativo simples." }
    ],
    "respostaCorreta": "A",
    "explicacao": "Art. 303, § 2º do CPM: Aplica-se a pena do peculato ao militar que, embora não tendo a posse ou detenção da coisa móvel, a subtrai, ou concorre para que seja subtraída, em proveito próprio ou alheio, valendo-se da facilidade que lhe proporciona a qualidade de militar (Peculato-Furto)."
  },
  {
    "id": "eap-pmmg-078",
    "tema": "Doutrina Operacional e POP",
    "assunto": "Emprego de Armas e Munições de Impacto Controlado",
    "enunciado": "O disparo de munições de elastômero (bala de borracha) em operações de controle de distúrbios civis pela PMMG:",
    "opcoes": [
      { "id": "A", "texto": "Deve ser direcionado preferencialmente para membros inferiores (pernas) e áreas de grande massa muscular, sendo terminantemente proibido o disparo direcionado à cabeça ou pescoço dos manifestantes." },
      { "id": "B", "texto": "Deve ser efetuado à queima-roupa nos olhos dos infratores para dispersão imediata." },
      { "id": "C", "texto": "Só pode ser disparado por ordens expressas do Governador do Estado." },
      { "id": "D", "texto": "Equipara-se ao emprego de armamento nuclear tático." }
    ],
    "respostaCorreta": "A",
    "explicacao": "As diretrizes operacionais de Instrumentos de Menor Potencial Ofensivo da PMMG determinam que as munições de impacto controlado sejam disparadas respeitando a distância mínima de segurança e apontadas exclusivamente para os membros inferiores, visando incapacitar temporariamente sem gerar letalidade."
  },
  {
    "id": "eap-pmmg-079",
    "tema": "Legislação Extravagante",
    "assunto": "Código de Trânsito Brasileiro - Lei nº 9.503/1997",
    "enunciado": "Conduzir veículo automotor com capacidade psicomotora alterada em razão da influência de álcool ou de outra substância psicoativa (art. 306 do CTB):",
    "opcoes": [
      { "id": "A", "texto": "Constitui crime de trânsito punido com detenção de 6 meses a 3 anos, multa e suspensão do direito de dirigir, podendo a alteração ser constatada por etilômetro, exame clínico, testemunhos ou vídeos." },
      { "id": "B", "texto": "É infração meramente administrativa que não admite prisão em flagrante." },
      { "id": "C", "texto": "Só é crime se o motorista causar capotamento com mortes confirmadas." },
      { "id": "D", "texto": "Não se aplica aos motoristas profissionais de transporte coletivo." }
    ],
    "respostaCorreta": "A",
    "explicacao": "Art. 306 do CTB: Crime de embriaguez ao volante, com pena de detenção de 6 meses a 3 anos, multa e suspensão ou proibição da habilitação. A alteração psicomotora pode ser demonstrada por concentração de álcool por etilômetro ou pelos sinais visíveis de alteração (anexo II do CTB e Resolução do CONTRAN)."
  },
  {
    "id": "eap-pmmg-080",
    "tema": "Doutrina Operacional e POP",
    "assunto": "Diretrizes de Segurança Orgânica nas Instalações",
    "enunciado": "A respeito da segurança orgânica das instalações policiais militares (aquartelamentos e frações), o militar que se encontra no posto de Sentinela da Guarda:",
    "opcoes": [
      { "id": "A", "texto": "É o responsável pela segurança armada do perímetro e controle de acesso, devendo manter vigilância ininterrupta e postura de pronto emprego operacional." },
      { "id": "B", "texto": "Pode ausentar-se do posto a qualquer momento sem permissão do Comandante da Guarda." },
      { "id": "C", "texto": "Deve entregar seu fuzil a qualquer civil que pedir para manuseá-lo na portaria." },
      { "id": "D", "texto": "Está dispensado de usar colete balístico e equipamento de proteção individual." }
    ],
    "respostaCorreta": "A",
    "explicacao": "A sentinela em posto militar é a autoridade máxima imediata na guarda de seu posto. Deve permanecer em constante estado de alerta, de posse de seu armamento regulamentar e com postura tática para repelir atentados e controlar o fluxo de pessoas e viaturas no aquartelamento."
  }
]

with open('questoes.json', 'r', encoding='utf-8') as f:
    existentes = json.load(f)

ids_existentes = {q['id'] for q in existentes}
adicionadas = 0

for nq in mais_20_questoes:
    if nq['id'] not in ids_existentes:
        existentes.append(nq)
        ids_existentes.add(nq['id'])
        adicionadas += 1

with open('questoes.json', 'w', encoding='utf-8') as f:
    json.dump(existentes, f, ensure_ascii=False, indent=2)

print(f"Sucesso! {adicionadas} novas questões inseridas. Total no banco: {len(existentes)} questões.")
