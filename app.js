// EAP PMMG - Simulado & Treinamento Inteligente
// Sistema de Rodadas, Inéditas e Ciclos de Reforço com Alternativas Dinâmicas
// Armazenamento 100% Local (Offline First)

(function () {
  'use strict';

  // --- Chaves do LocalStorage ---
  const STORAGE_CUSTOM_QUESTOES = 'eap_pmmg_custom_questoes';
  const STORAGE_RESPONDIDAS = 'eap_pmmg_respondidas';        // Array de IDs
  const STORAGE_ERROS = 'eap_pmmg_erros';                    // Array de IDs
  const STORAGE_STATS = 'eap_pmmg_stats';                    // { total: 0, acertos: 0, porTema: {} }
  const STORAGE_CICLO = 'eap_pmmg_ciclo';                    // Número do Ciclo (1 = inéditas, 2+ = reforço)
  const STORAGE_RESP_CICLO = 'eap_pmmg_resp_ciclo';          // Questões já feitas no ciclo atual de reforço
  const STORAGE_TAMANHO_RODADA = 'eap_pmmg_tamanho_rodada';  // Qtd de questões por rodada
  const STORAGE_TEMA = 'eap_pmmg_tema';                      // 'escuro' | 'institucional' | 'claro'

  // --- Estado Global ---
  let bancoQuestoes = [];
  let questaoAtual = null;
  let opcaoSelecionada = null;
  let respondidasSet = new Set();
  let errosSet = new Set();
  let respCicloSet = new Set();
  let statsData = { total: 0, acertos: 0, porTema: {} };

  let cicloAtual = 1;
  let tamanhoRodada = 10;
  let numeroRodada = 1;
  let respondidasNaRodada = 0;
  let acertosNaRodada = 0;
  let errosNaRodada = [];
  let questoesFilaRodada = []; // Fila ativa da rodada atual

  // --- Elementos do DOM ---
  const selectMode = document.getElementById('selectMode');
  const selectTema = document.getElementById('selectTema');
  const selectAssunto = document.getElementById('selectAssunto');
  const wrapperTema = document.getElementById('wrapperTema');
  const wrapperAssunto = document.getElementById('wrapperAssunto');

  // Status e Rodadas
  const lblRodadaAtual = document.getElementById('lblRodadaAtual');
  const lblProgressoRodada = document.getElementById('lblProgressoRodada');
  const badgeCiclo = document.getElementById('badgeCiclo');
  const lblRestantes = document.getElementById('lblRestantes');
  const lblTaxaAcerto = document.getElementById('lblTaxaAcerto');
  const countErrosBadge = document.getElementById('countErrosBadge');
  const selectTamanhoRodada = document.getElementById('selectTamanhoRodada');
  const btnResetProgress = document.getElementById('btnResetProgress');

  // Cards
  const cardQuestao = document.getElementById('cardQuestao');
  const cardFimRodada = document.getElementById('cardFimRodada');
  const cardCompletado = document.getElementById('cardCompletado');

  // Detalhes da Questão
  const badgeTema = document.getElementById('badgeTema');
  const badgeAssunto = document.getElementById('badgeAssunto');
  const badgeId = document.getElementById('badgeId');
  const txtEnunciado = document.getElementById('txtEnunciado');
  const containerOpcoes = document.getElementById('containerOpcoes');
  const btnConfirmar = document.getElementById('btnConfirmar');
  const btnProxima = document.getElementById('btnProxima');
  const boxExplicacao = document.getElementById('boxExplicacao');
  const feedbackTitle = document.getElementById('feedbackTitle');
  const feedbackContent = document.getElementById('feedbackContent');

  // Card Fim de Rodada
  const numRodadaConcluida = document.getElementById('numRodadaConcluida');
  const txtQuestoesRodada = document.getElementById('txtQuestoesRodada');
  const rodadaAcertos = document.getElementById('rodadaAcertos');
  const rodadaErros = document.getElementById('rodadaErros');
  const rodadaPct = document.getElementById('rodadaPct');
  const rodadaIneditasRestantes = document.getElementById('rodadaIneditasRestantes');
  const btnProximaRodada = document.getElementById('btnProximaRodada');
  const btnRevisarErrosRodada = document.getElementById('btnRevisarErrosRodada');

  // Card Conteúdo Esgotado / Reforço
  const btnIniciarCicloReforco = document.getElementById('btnIniciarCicloReforco');
  const btnAbrirImportador = document.getElementById('btnAbrirImportador');

  // Modais
  const modalStats = document.getElementById('modalStats');
  const btnStatsModal = document.getElementById('btnStatsModal');
  const btnCloseStats = document.getElementById('btnCloseStats');
  const statTotal = document.getElementById('statTotal');
  const statAcertos = document.getElementById('statAcertos');
  const statErros = document.getElementById('statErros');
  const statsPorTema = document.getElementById('statsPorTema');
  const btnZerarTudo = document.getElementById('btnZerarTudo');

  const modalImport = document.getElementById('modalImport');
  const btnSettingsModal = document.getElementById('btnSettingsModal');
  const btnCloseImport = document.getElementById('btnCloseImport');
  const txtJsonImport = document.getElementById('txtJsonImport');
  const btnSalvarImport = document.getElementById('btnSalvarImport');
  const btnDownloadTemplate = document.getElementById('btnDownloadTemplate');

  // PWA
  const btnInstallApp = document.getElementById('btnInstallApp');
  const modalInstall = document.getElementById('modalInstall');
  const btnCloseInstall = document.getElementById('btnCloseInstall');
  const btnEntendiInstall = document.getElementById('btnEntendiInstall');
  let deferredInstallPrompt = null;

  // Seletor de Tema
  const metaThemeColor = document.getElementById('metaThemeColor');
  const btnTemaApp = document.getElementById('btnTemaApp');
  const popoverTemaApp = document.getElementById('popoverTemaApp');

  // --- Sistema de Temas ---
  // As cores vivem em themes.css como variáveis CSS (canais RGB).
  // A paleta do Tailwind aponta para elas, então trocar o atributo
  // data-theme no <html> retematiza o aplicativo inteiro na hora.
  const TEMAS = {
    escuro: { nome: 'Escuro' },
    institucional: { nome: 'Institucional PMMG' },
    claro: { nome: 'Claro' }
  };

  // 'heraldico' foi renomeado para 'institucional' (novas cores institucionais)
  const ALIAS_TEMA = { heraldico: 'institucional' };

  function normalizarTema(tema) {
    const t = (tema && TEMAS[tema]) ? tema : ALIAS_TEMA[tema];
    return (t && TEMAS[t]) ? t : 'escuro';
  }

  function obterTemaSalvo() {
    try {
      return normalizarTema(localStorage.getItem(STORAGE_TEMA));
    } catch (e) {
      return 'escuro';
    }
  }

  function aplicarTema(tema) {
    const t = normalizarTema(tema);

    document.documentElement.setAttribute('data-theme', t);
    document.documentElement.classList.toggle('dark', t !== 'claro');

    try {
      localStorage.setItem(STORAGE_TEMA, t);
    } catch (e) {
      /* modo privado: apenas nao persiste */
    }

    // Barra do navegador / barra de status do Android acompanha o tema
    if (metaThemeColor) {
      const cor = getComputedStyle(document.documentElement)
        .getPropertyValue('--theme-color').trim();
      if (cor) metaThemeColor.setAttribute('content', cor);
    }

    atualizarMarcadoresTema();
  }

  function atualizarMarcadoresTema() {
    const atual = document.documentElement.getAttribute('data-theme');
    document.querySelectorAll('.tema-opt').forEach(btn => {
      const ativo = btn.getAttribute('data-tema') === atual;
      btn.classList.toggle('tema-ativo', ativo);
      btn.setAttribute('aria-checked', ativo ? 'true' : 'false');
    });
  }

  function abrirSeletorTema(abrir) {
    if (!popoverTemaApp) return;
    popoverTemaApp.classList.toggle('hidden', !abrir);
    if (btnTemaApp) btnTemaApp.setAttribute('aria-expanded', abrir ? 'true' : 'false');
  }

  // --- Inicialização ---
  async function init() {
    aplicarTema(obterTemaSalvo());
    carregarStorage();
    await carregarQuestoes();
    atualizarFiltros();
    atualizarResumoTopo();
    iniciarNovaRodada();
    registrarEventos();
  }

  // --- Gerenciamento de Armazenamento Local ---
  function carregarStorage() {
    try {
      const resp = localStorage.getItem(STORAGE_RESPONDIDAS);
      if (resp) respondidasSet = new Set(JSON.parse(resp));

      const err = localStorage.getItem(STORAGE_ERROS);
      if (err) errosSet = new Set(JSON.parse(err));

      const st = localStorage.getItem(STORAGE_STATS);
      if (st) statsData = JSON.parse(st);

      const ciclo = localStorage.getItem(STORAGE_CICLO);
      if (ciclo) cicloAtual = parseInt(ciclo, 10) || 1;

      const respCiclo = localStorage.getItem(STORAGE_RESP_CICLO);
      if (respCiclo) respCicloSet = new Set(JSON.parse(respCiclo));

      const tam = localStorage.getItem(STORAGE_TAMANHO_RODADA);
      if (tam && selectTamanhoRodada) {
        tamanhoRodada = parseInt(tam, 10) || 10;
        selectTamanhoRodada.value = tamanhoRodada.toString();
      }
    } catch (e) {
      console.error('Erro ao ler LocalStorage', e);
    }
  }

  function salvarStorage() {
    localStorage.setItem(STORAGE_RESPONDIDAS, JSON.stringify(Array.from(respondidasSet)));
    localStorage.setItem(STORAGE_ERROS, JSON.stringify(Array.from(errosSet)));
    localStorage.setItem(STORAGE_STATS, JSON.stringify(statsData));
    localStorage.setItem(STORAGE_CICLO, cicloAtual.toString());
    localStorage.setItem(STORAGE_RESP_CICLO, JSON.stringify(Array.from(respCicloSet)));
    localStorage.setItem(STORAGE_TAMANHO_RODADA, tamanhoRodada.toString());
  }

  // --- Carregamento de Questões ---
  async function carregarQuestoes() {
    let base = [];
    try {
      const res = await fetch('questoes.json?v=' + Date.now());
      if (res.ok) {
        base = await res.json();
      }
    } catch (err) {
      console.warn('questoes.json local não carregado via fetch', err);
    }

    let custom = [];
    try {
      const rawCustom = localStorage.getItem(STORAGE_CUSTOM_QUESTOES);
      if (rawCustom) custom = JSON.parse(rawCustom);
    } catch (e) {
      console.error('Erro ao ler custom questions', e);
    }

    const map = new Map();
    base.forEach(q => map.set(q.id, q));
    custom.forEach(q => map.set(q.id, q));
    bancoQuestoes = Array.from(map.values());
  }

  // --- Atualização de Filtros ---
  function atualizarFiltros() {
    const modo = selectMode.value;

    if (modo === 'simulado' || modo === 'erros') {
      wrapperTema.classList.add('opacity-40', 'pointer-events-none');
      wrapperAssunto.classList.add('opacity-40', 'pointer-events-none');
    } else {
      wrapperTema.classList.remove('opacity-40', 'pointer-events-none');
      wrapperAssunto.classList.remove('opacity-40', 'pointer-events-none');
    }

    const temaAtual = selectTema.value;
    const temas = Array.from(new Set(bancoQuestoes.map(q => q.tema).filter(Boolean)));
    selectTema.innerHTML = '<option value="todos">Todos os Temas</option>';
    temas.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t;
      opt.textContent = t;
      if (t === temaAtual) opt.selected = true;
      selectTema.appendChild(opt);
    });

    atualizarAssuntos();
  }

  function atualizarAssuntos() {
    const temaSel = selectTema.value;
    const assuntoAtual = selectAssunto.value;

    const filtradas = temaSel === 'todos' 
      ? bancoQuestoes 
      : bancoQuestoes.filter(q => q.tema === temaSel);

    const assuntos = Array.from(new Set(filtradas.map(q => q.assunto).filter(Boolean)));
    selectAssunto.innerHTML = '<option value="todos">Todos os Assuntos</option>';
    assuntos.forEach(a => {
      const opt = document.createElement('option');
      opt.value = a;
      opt.textContent = a;
      if (a === assuntoAtual) opt.selected = true;
      selectAssunto.appendChild(opt);
    });
  }

  // --- Obter Lista de Questões no Filtro Atual ---
  function obterQuestoesFiltradas() {
    const modo = selectMode.value;

    if (modo === 'erros') {
      return bancoQuestoes.filter(q => errosSet.has(q.id));
    }

    if (modo === 'simulado') {
      return bancoQuestoes;
    }

    const temaSel = selectTema.value;
    const assuntoSel = selectAssunto.value;

    return bancoQuestoes.filter(q => {
      const matchTema = (temaSel === 'todos' || q.tema === temaSel);
      const matchAssunto = (assuntoSel === 'todos' || q.assunto === assuntoSel);
      return matchTema && matchAssunto;
    });
  }

  // --- Obter Questões Inéditas Restantes no Filtro ---
  function obterQuestoesIneditasRestantes() {
    const todasNoFiltro = obterQuestoesFiltradas();
    if (cicloAtual === 1) {
      return todasNoFiltro.filter(q => !respondidasSet.has(q.id));
    } else {
      // No ciclo de reforço, inéditas dentro daquele ciclo
      return todasNoFiltro.filter(q => !respCicloSet.has(q.id));
    }
  }

  // --- Sistema Inteligente Anti-Decoreba: Embaralhamento de Alternativas ---
  // Transforma uma questão para que as opções mudem de letra (A, B, C, D)
  function prepararQuestaoComEmbaralhamento(qOriginal) {
    const opcoesCopia = qOriginal.opcoes.map(o => ({ ...o }));
    const textoCorreto = qOriginal.opcoes.find(o => o.id === qOriginal.respostaCorreta)?.texto;

    // Embaralha aleatoriamente as opções
    for (let i = opcoesCopia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opcoesCopia[i], opcoesCopia[j]] = [opcoesCopia[j], opcoesCopia[i]];
    }

    const letras = ['A', 'B', 'C', 'D', 'E'];
    const novasOpcoes = opcoesCopia.map((item, idx) => ({
      id: letras[idx],
      texto: item.texto
    }));

    const novaRespostaCorreta = novasOpcoes.find(o => o.texto === textoCorreto)?.id || 'A';

    return {
      ...qOriginal,
      opcoes: novasOpcoes,
      respostaCorreta: novaRespostaCorreta,
      isEmbaralhada: true
    };
  }

  // --- Montar e Iniciar uma Nova Rodada com Questões Inéditas ---
  function iniciarNovaRodada() {
    respondidasNaRodada = 0;
    acertosNaRodada = 0;
    errosNaRodada = [];

    const todasNoFiltro = obterQuestoesFiltradas();

    if (todasNoFiltro.length === 0) {
      cardQuestao.classList.add('hidden');
      cardFimRodada.classList.add('hidden');
      cardCompletado.classList.remove('hidden');
      return;
    }

    let disponiveis = [];

    if (cicloAtual === 1) {
      // Ciclo 1: Questões estritamente INÉDITAS no banco
      disponiveis = todasNoFiltro.filter(q => !respondidasSet.has(q.id));

      if (disponiveis.length === 0) {
        // Todas as questões inéditas foram esgotadas!
        cardQuestao.classList.add('hidden');
        cardFimRodada.classList.add('hidden');
        cardCompletado.classList.remove('hidden');
        return;
      }

      // Embaralha as disponíveis para sortear a rodada
      disponiveis.sort(() => Math.random() - 0.5);
      // Pega até o tamanho da rodada (ex: 10)
      questoesFilaRodada = disponiveis.slice(0, tamanhoRodada).map(q => ({ ...q }));

    } else {
      // Ciclo 2+: Modo Reforço Inteligente (não repete no mesmo ciclo e embaralha opções)
      disponiveis = todasNoFiltro.filter(q => !respCicloSet.has(q.id));

      if (disponiveis.length === 0) {
        // Completou o ciclo de reforço, inicia próximo ciclo
        cicloAtual++;
        respCicloSet.clear();
        salvarStorage();
        disponiveis = [...todasNoFiltro];
      }

      // Prioridade máxima para as que foram erradas anteriormente!
      disponiveis.sort((a, b) => {
        const aErro = errosSet.has(a.id) ? -1 : 1;
        const bErro = errosSet.has(b.id) ? -1 : 1;
        return aErro - bErro || (Math.random() - 0.5);
      });

      questoesFilaRodada = disponiveis.slice(0, tamanhoRodada).map(q => prepararQuestaoComEmbaralhamento(q));
    }

    cardFimRodada.classList.add('hidden');
    cardCompletado.classList.add('hidden');
    cardQuestao.classList.remove('hidden');

    atualizarResumoTopo();
    carregarProximaQuestaoDaFila();
  }

  // --- Carregar Próxima Questão da Rodada Ativa ---
  function carregarProximaQuestaoDaFila() {
    opcaoSelecionada = null;
    btnConfirmar.disabled = true;
    btnConfirmar.classList.remove('hidden');
    btnProxima.classList.add('hidden');
    boxExplicacao.classList.add('hidden');

    if (questoesFilaRodada.length === 0) {
      finalizarRodada();
      return;
    }

    questaoAtual = questoesFilaRodada.shift();
    renderizarQuestao(questaoAtual);
    atualizarResumoTopo();
  }

  // --- Renderizar Questão na Tela ---
  function renderizarQuestao(q) {
    badgeTema.textContent = q.tema || 'Geral';
    badgeAssunto.textContent = q.assunto || 'Tópico';
    badgeId.innerHTML = `#${q.id} ${q.isEmbaralhada ? '<span class="text-purple-400 font-bold ml-1" title="Ordem das alternativas reorganizada para evitar decoreba">🔀 Reforço</span>' : ''}`;
    txtEnunciado.textContent = q.enunciado;

    containerOpcoes.innerHTML = '';

    q.opcoes.forEach(op => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.dataset.id = op.id;
      btn.className = `opcao-btn w-full text-left p-3.5 sm:p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-800/80 hover:border-slate-700 transition flex items-start gap-3 text-slate-200 select-none group`;

      btn.innerHTML = `
        <span class="letra-indicador flex-shrink-0 w-7 h-7 rounded-lg bg-slate-800 text-slate-300 group-hover:bg-slate-700 font-bold text-xs flex items-center justify-center border border-slate-700">
          ${op.id}
        </span>
        <span class="text-xs sm:text-sm leading-relaxed flex-1 mt-0.5">
          ${op.texto}
        </span>
      `;

      btn.addEventListener('click', () => selecionarOpcao(op.id, btn));
      containerOpcoes.appendChild(btn);
    });
  }

  // --- Selecionar Alternativa ---
  function selecionarOpcao(id, btnElement) {
    if (!btnConfirmar.classList.contains('hidden') && btnProxima.classList.contains('hidden')) {
      opcaoSelecionada = id;
      btnConfirmar.disabled = false;

      const allBtns = containerOpcoes.querySelectorAll('.opcao-btn');
      allBtns.forEach(b => {
        b.classList.remove('border-amber-500', 'bg-amber-500/10', 'text-amber-300');
        const indicador = b.querySelector('.letra-indicador');
        indicador.classList.remove('bg-amber-500', 'text-slate-950', 'border-amber-400');
      });

      btnElement.classList.add('border-amber-500', 'bg-amber-500/10', 'text-amber-300');
      const ind = btnElement.querySelector('.letra-indicador');
      ind.classList.add('bg-amber-500', 'text-slate-950', 'border-amber-400');
    }
  }

  // --- Confirmar Resposta & Feedback Imediato ---
  function confirmarResposta() {
    if (!opcaoSelecionada || !questaoAtual) return;

    const acertou = (opcaoSelecionada === questaoAtual.respostaCorreta);
    respondidasNaRodada++;

    // Atualizar conjuntos
    respondidasSet.add(questaoAtual.id);
    if (cicloAtual >= 2) {
      respCicloSet.add(questaoAtual.id);
    }

    if (acertou) {
      acertosNaRodada++;
      errosSet.delete(questaoAtual.id);
    } else {
      errosNaRodada.push(questaoAtual);
      errosSet.add(questaoAtual.id);
    }

    // Estatísticas globais
    statsData.total = (statsData.total || 0) + 1;
    if (acertou) statsData.acertos = (statsData.acertos || 0) + 1;

    const tema = questaoAtual.tema || 'Outros';
    if (!statsData.porTema[tema]) {
      statsData.porTema[tema] = { total: 0, acertos: 0 };
    }
    statsData.porTema[tema].total++;
    if (acertou) statsData.porTema[tema].acertos++;

    salvarStorage();
    atualizarResumoTopo();

    // Destaque visual das opções
    const allBtns = containerOpcoes.querySelectorAll('.opcao-btn');
    allBtns.forEach(b => {
      b.classList.add('pointer-events-none');
      const id = b.dataset.id;

      if (id === questaoAtual.respostaCorreta) {
        b.classList.remove('border-slate-800', 'bg-slate-950/60');
        b.classList.add('border-emerald-500', 'bg-emerald-500/15', 'text-emerald-200');
        const ind = b.querySelector('.letra-indicador');
        ind.classList.add('bg-emerald-500', 'text-slate-950', 'border-emerald-400');
      } else if (id === opcaoSelecionada && !acertou) {
        b.classList.remove('border-slate-800', 'bg-slate-950/60');
        b.classList.add('border-rose-500', 'bg-rose-500/15', 'text-rose-200');
        const ind = b.querySelector('.letra-indicador');
        ind.classList.add('bg-rose-500', 'text-slate-950', 'border-rose-400');
      }
    });

    // Caixa de Fundamentação Legal
    boxExplicacao.classList.remove('hidden');
    if (acertou) {
      boxExplicacao.className = 'mt-6 p-4 sm:p-5 rounded-xl border border-emerald-500/40 bg-emerald-950/20 text-emerald-200';
      feedbackTitle.innerHTML = `
        <svg class="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
        <span class="text-emerald-400 text-sm font-bold">Resposta Correta! Parabéns.</span>
      `;
    } else {
      boxExplicacao.className = 'mt-6 p-4 sm:p-5 rounded-xl border border-rose-500/40 bg-rose-950/20 text-rose-200';
      feedbackTitle.innerHTML = `
        <svg class="w-5 h-5 text-rose-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
        <span class="text-rose-400 text-sm font-bold">Resposta Incorreta! A opção correta é a letra ${questaoAtual.respostaCorreta}.</span>
      `;
    }

    feedbackContent.innerHTML = `
      <div class="pt-1 border-t border-slate-700/50">
        <span class="font-bold uppercase tracking-wider text-[11px] text-amber-400 block mb-1">Fundamentação Jurídica & Justificativa:</span>
        <p class="text-slate-300 leading-relaxed text-xs sm:text-sm whitespace-pre-line">${questaoAtual.explicacao || 'Sem comentário cadastrado.'}</p>
      </div>
    `;

    // Alternar botões
    btnConfirmar.classList.add('hidden');
    btnProxima.classList.remove('hidden');

    if (questoesFilaRodada.length === 0) {
      btnProxima.querySelector('span').textContent = 'Concluir Rodada';
    } else {
      btnProxima.querySelector('span').textContent = 'Próxima Pergunta';
    }
  }

  // --- Finalizar Rodada e Exibir Placar ---
  function finalizarRodada() {
    cardQuestao.classList.add('hidden');
    cardCompletado.classList.add('hidden');
    cardFimRodada.classList.remove('hidden');

    numRodadaConcluida.textContent = numeroRodada;
    txtQuestoesRodada.textContent = respondidasNaRodada;
    rodadaAcertos.textContent = acertosNaRodada;
    rodadaErros.textContent = errosNaRodada.length;

    const pct = respondidasNaRodada > 0 ? Math.round((acertosNaRodada / respondidasNaRodada) * 100) : 0;
    rodadaPct.textContent = `${pct}%`;

    const ineditas = obterQuestoesIneditasRestantes();
    rodadaIneditasRestantes.textContent = ineditas.length;

    if (errosNaRodada.length > 0) {
      btnRevisarErrosRodada.classList.remove('hidden');
      btnRevisarErrosRodada.textContent = `Revisar ${errosNaRodada.length} Erro(s)`;
    } else {
      btnRevisarErrosRodada.classList.add('hidden');
    }

    if (ineditas.length === 0) {
      btnProximaRodada.innerHTML = `<span>🎓 Concluir e Iniciar Modo Reforço</span>`;
    } else {
      btnProximaRodada.innerHTML = `<span>🚀 Próxima Rodada (${Math.min(tamanhoRodada, ineditas.length)} Inéditas)</span>`;
    }
  }

  // --- Atualizar Contadores do Topo ---
  function atualizarResumoTopo() {
    lblRodadaAtual.textContent = `Rodada ${numeroRodada}`;
    lblProgressoRodada.textContent = `${respondidasNaRodada}/${tamanhoRodada}`;

    if (cicloAtual >= 2) {
      badgeCiclo.classList.remove('hidden');
      badgeCiclo.textContent = `🔄 Ciclo ${cicloAtual} (Reforço)`;
    } else {
      badgeCiclo.classList.add('hidden');
    }

    const ineditas = obterQuestoesIneditasRestantes();
    lblRestantes.textContent = ineditas.length;

    countErrosBadge.textContent = errosSet.size;

    const total = statsData.total || 0;
    const acertos = statsData.acertos || 0;
    const taxa = total > 0 ? Math.round((acertos / total) * 100) : 0;
    lblTaxaAcerto.textContent = `${taxa}%`;
  }

  // --- Modal de Estatísticas ---
  function abrirModalStats() {
    statTotal.textContent = statsData.total || 0;
    statAcertos.textContent = statsData.acertos || 0;
    statErros.textContent = (statsData.total || 0) - (statsData.acertos || 0);

    statsPorTema.innerHTML = '';
    const temas = Object.keys(statsData.porTema || {});

    if (temas.length === 0) {
      statsPorTema.innerHTML = '<p class="text-xs text-slate-500 italic">Nenhuma questão respondida ainda.</p>';
    } else {
      temas.forEach(t => {
        const item = statsData.porTema[t];
        const pct = item.total > 0 ? Math.round((item.acertos / item.total) * 100) : 0;
        const corBarra = pct >= 70 ? 'bg-emerald-500' : (pct >= 50 ? 'bg-amber-500' : 'bg-rose-500');

        const div = document.createElement('div');
        div.className = 'bg-slate-950 p-2.5 rounded-lg border border-slate-800';
        div.innerHTML = `
          <div class="flex justify-between items-center text-xs mb-1.5">
            <span class="font-medium text-slate-200 truncate pr-2">${t}</span>
            <span class="font-bold text-slate-300">${pct}% <span class="text-[10px] text-slate-500">(${item.acertos}/${item.total})</span></span>
          </div>
          <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div class="${corBarra} h-full transition-all duration-500" style="width: ${pct}%"></div>
          </div>
        `;
        statsPorTema.appendChild(div);
      });
    }

    modalStats.classList.remove('hidden');
    modalStats.classList.add('flex');
  }

  // --- Importar Questões JSON ---
  function salvarImportacao() {
    const raw = txtJsonImport.value.trim();
    if (!raw) return alert('Por favor, cole o código JSON das questões.');

    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) throw new Error('O JSON deve ser uma lista (array) de questões.');

      for (const q of parsed) {
        if (!q.id || !q.enunciado || !q.opcoes || !q.respostaCorreta) {
          throw new Error('Cada questão precisa ter ao menos: id, enunciado, opcoes e respostaCorreta.');
        }
      }

      let custom = [];
      const stored = localStorage.getItem(STORAGE_CUSTOM_QUESTOES);
      if (stored) custom = JSON.parse(stored);

      const map = new Map();
      custom.forEach(q => map.set(q.id, q));
      parsed.forEach(q => map.set(q.id, q));
      const finalCustom = Array.from(map.values());

      localStorage.setItem(STORAGE_CUSTOM_QUESTOES, JSON.stringify(finalCustom));
      alert(`Sucesso! ${parsed.length} questões adicionadas com sucesso.`);
      txtJsonImport.value = '';
      modalImport.classList.add('hidden');
      modalImport.classList.remove('flex');

      carregarQuestoes().then(() => {
        atualizarFiltros();
        iniciarNovaRodada();
      });

    } catch (err) {
      alert('Erro ao processar JSON: ' + err.message);
    }
  }

  // --- Registrar Eventos ---
  function registrarEventos() {
    // Seletor de Tema
    if (btnTemaApp && popoverTemaApp) {
      btnTemaApp.addEventListener('click', (e) => {
        e.stopPropagation();
        abrirSeletorTema(popoverTemaApp.classList.contains('hidden'));
      });

      popoverTemaApp.addEventListener('click', (e) => {
        const opt = e.target.closest('.tema-opt');
        if (!opt) return;
        aplicarTema(opt.getAttribute('data-tema'));
        abrirSeletorTema(false);
      });

      document.addEventListener('click', (e) => {
        if (popoverTemaApp.classList.contains('hidden')) return;
        if (!popoverTemaApp.contains(e.target)) abrirSeletorTema(false);
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') abrirSeletorTema(false);
      });
    }

    selectMode.addEventListener('change', () => {
      atualizarFiltros();
      numeroRodada = 1;
      iniciarNovaRodada();
    });

    selectTema.addEventListener('change', () => {
      atualizarAssuntos();
      numeroRodada = 1;
      iniciarNovaRodada();
    });

    selectAssunto.addEventListener('change', () => {
      numeroRodada = 1;
      iniciarNovaRodada();
    });

    selectTamanhoRodada.addEventListener('change', (e) => {
      tamanhoRodada = parseInt(e.target.value, 10) || 10;
      salvarStorage();
      numeroRodada = 1;
      iniciarNovaRodada();
    });

    btnConfirmar.addEventListener('click', confirmarResposta);
    btnProxima.addEventListener('click', carregarProximaQuestaoDaFila);

    // Botões da Rodada
    btnProximaRodada.addEventListener('click', () => {
      const ineditas = obterQuestoesIneditasRestantes();
      if (ineditas.length === 0 && cicloAtual === 1) {
        // Ativar modo reforço
        cicloAtual = 2;
        respCicloSet.clear();
        salvarStorage();
      }
      numeroRodada++;
      iniciarNovaRodada();
    });

    btnRevisarErrosRodada.addEventListener('click', () => {
      if (errosNaRodada.length > 0) {
        cardFimRodada.classList.add('hidden');
        cardQuestao.classList.remove('hidden');
        questoesFilaRodada = errosNaRodada.map(q => ({ ...q }));
        respondidasNaRodada = 0;
        acertosNaRodada = 0;
        errosNaRodada = [];
        carregarProximaQuestaoDaFila();
      }
    });

    // Botão de Iniciar Ciclo de Reforço quando 100% esgotado
    btnIniciarCicloReforco.addEventListener('click', () => {
      cicloAtual = Math.max(2, cicloAtual + 1);
      respCicloSet.clear();
      salvarStorage();
      numeroRodada = 1;
      iniciarNovaRodada();
    });

    btnAbrirImportador.addEventListener('click', () => {
      modalImport.classList.remove('hidden');
      modalImport.classList.add('flex');
    });

    btnResetProgress.addEventListener('click', () => {
      if (confirm('Deseja reiniciar as questões respondidas deste filtro e começar uma nova rodada de inéditas?')) {
        const questoesNoFiltro = obterQuestoesFiltradas();
        questoesNoFiltro.forEach(q => {
          respondidasSet.delete(q.id);
          respCicloSet.delete(q.id);
        });
        cicloAtual = 1;
        numeroRodada = 1;
        salvarStorage();
        iniciarNovaRodada();
      }
    });

    // Modais
    btnStatsModal.addEventListener('click', abrirModalStats);
    btnCloseStats.addEventListener('click', () => {
      modalStats.classList.add('hidden');
      modalStats.classList.remove('flex');
    });

    btnSettingsModal.addEventListener('click', () => {
      modalImport.classList.remove('hidden');
      modalImport.classList.add('flex');
    });

    btnCloseImport.addEventListener('click', () => {
      modalImport.classList.add('hidden');
      modalImport.classList.remove('flex');
    });

    btnSalvarImport.addEventListener('click', salvarImportacao);

    btnDownloadTemplate.addEventListener('click', () => {
      txtJsonImport.value = JSON.stringify([
        {
          "id": "exemplo-001",
          "tema": "Legislação Institucional",
          "assunto": "CEDPM - Lei Estadual nº 14.310/2002",
          "enunciado": "Texto do enunciado da questão...",
          "opcoes": [
            { "id": "A", "texto": "Opção A" },
            { "id": "B", "texto": "Opção B" },
            { "id": "C", "texto": "Opção C" },
            { "id": "D", "texto": "Opção D" }
          ],
          "respostaCorreta": "A",
          "explicacao": "Explicação fundamentada com artigo de lei ou doutrina."
        }
      ], null, 2);
    });

    btnZerarTudo.addEventListener('click', () => {
      if (confirm('Atenção: isso apagará todo o seu histórico de acertos, erros e progresso. Deseja continuar?')) {
        localStorage.removeItem(STORAGE_RESPONDIDAS);
        localStorage.removeItem(STORAGE_ERROS);
        localStorage.removeItem(STORAGE_STATS);
        localStorage.removeItem(STORAGE_CICLO);
        localStorage.removeItem(STORAGE_RESP_CICLO);
        respondidasSet.clear();
        errosSet.clear();
        respCicloSet.clear();
        statsData = { total: 0, acertos: 0, porTema: {} };
        cicloAtual = 1;
        numeroRodada = 1;
        salvarStorage();
        abrirModalStats();
        iniciarNovaRodada();
      }
    });

    // PWA & Instalação
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredInstallPrompt = e;
      if (btnInstallApp) {
        btnInstallApp.classList.remove('hidden');
      }
    });

    if (btnInstallApp) {
      btnInstallApp.addEventListener('click', async () => {
        if (deferredInstallPrompt) {
          deferredInstallPrompt.prompt();
          const { outcome } = await deferredInstallPrompt.userChoice;
          if (outcome === 'accepted') {
            deferredInstallPrompt = null;
          }
        } else {
          modalInstall.classList.remove('hidden');
          modalInstall.classList.add('flex');
        }
      });
    }

    if (btnCloseInstall) {
      btnCloseInstall.addEventListener('click', () => {
        modalInstall.classList.add('hidden');
        modalInstall.classList.remove('flex');
      });
    }

    if (btnEntendiInstall) {
      btnEntendiInstall.addEventListener('click', () => {
        modalInstall.classList.add('hidden');
        modalInstall.classList.remove('flex');
      });
    }

    // Forçar Atualização / Limpar Cache
    const btnForceUpdate = document.getElementById('btnForceUpdate');
    if (btnForceUpdate) {
      btnForceUpdate.addEventListener('click', async () => {
        btnForceUpdate.textContent = 'Atualizando...';
        try {
          if ('caches' in window) {
            const keys = await caches.keys();
            await Promise.all(keys.map(k => caches.delete(k)));
          }
          if ('serviceWorker' in navigator) {
            const regs = await navigator.serviceWorker.getRegistrations();
            for (const reg of regs) {
              await reg.unregister();
            }
          }
        } catch (e) {
          console.error('Erro ao limpar cache:', e);
        }
        window.location.reload(true);
      });
    }

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js?v=3.3').then(reg => {
        reg.update();
      }).catch(err => {
        console.log('Falha ao registrar Service Worker:', err);
      });

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    }
  }

  // Inicializar quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
