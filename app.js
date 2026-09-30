// EAP PMMG - Simulado & Treinamento Inteligente
// Armazenamento 100% Local (Offline First)

(function () {
  'use strict';

  // --- Chaves do LocalStorage ---
  const STORAGE_CUSTOM_QUESTOES = 'eap_pmmg_custom_questoes';
  const STORAGE_RESPONDIDAS = 'eap_pmmg_respondidas'; // Array de IDs
  const STORAGE_ERROS = 'eap_pmmg_erros';             // Array de IDs
  const STORAGE_STATS = 'eap_pmmg_stats';             // { total: 0, acertos: 0, porTema: {} }

  // --- Estado Global ---
  let bancoQuestoes = [];
  let questaoAtual = null;
  let opcaoSelecionada = null;
  let respondidasSet = new Set();
  let errosSet = new Set();
  let statsData = { total: 0, acertos: 0, porTema: {} };

  // --- Elementos do DOM ---
  const selectMode = document.getElementById('selectMode');
  const selectTema = document.getElementById('selectTema');
  const selectAssunto = document.getElementById('selectAssunto');
  const wrapperTema = document.getElementById('wrapperTema');
  const wrapperAssunto = document.getElementById('wrapperAssunto');

  const lblRestantes = document.getElementById('lblRestantes');
  const lblTaxaAcerto = document.getElementById('lblTaxaAcerto');
  const countErrosBadge = document.getElementById('countErrosBadge');
  const btnResetProgress = document.getElementById('btnResetProgress');

  const cardQuestao = document.getElementById('cardQuestao');
  const cardCompletado = document.getElementById('cardCompletado');
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

  const btnReiniciarFiltro = document.getElementById('btnReiniciarFiltro');
  const btnIrParaErros = document.getElementById('btnIrParaErros');

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

  // --- Inicialização ---
  async function init() {
    carregarStorage();
    await carregarQuestoes();
    atualizarFiltros();
    atualizarResumoTopo();
    carregarProximaQuestao();
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
    } catch (e) {
      console.error('Erro ao ler LocalStorage', e);
    }
  }

  function salvarStorage() {
    localStorage.setItem(STORAGE_RESPONDIDAS, JSON.stringify(Array.from(respondidasSet)));
    localStorage.setItem(STORAGE_ERROS, JSON.stringify(Array.from(errosSet)));
    localStorage.setItem(STORAGE_STATS, JSON.stringify(statsData));
  }

  // --- Carregamento de Questões ---
  async function carregarQuestoes() {
    let base = [];
    try {
      const res = await fetch('questoes.json');
      if (res.ok) {
        base = await res.json();
      }
    } catch (err) {
      console.warn('Arquivo questoes.json local não carregado via fetch (modo arquivo direto)', err);
    }

    // Carregar questões customizadas importadas pelo usuário
    let custom = [];
    try {
      const rawCustom = localStorage.getItem(STORAGE_CUSTOM_QUESTOES);
      if (rawCustom) {
        custom = JSON.parse(rawCustom);
      }
    } catch (e) {
      console.error('Erro ao ler custom questions', e);
    }

    // Unir por ID único (prioriza customizado se houver conflito)
    const map = new Map();
    base.forEach(q => map.set(q.id, q));
    custom.forEach(q => map.set(q.id, q));
    bancoQuestoes = Array.from(map.values());
  }

  // --- Atualização de Filtros ---
  function atualizarFiltros() {
    const modo = selectMode.value;

    if (modo === 'simulado') {
      wrapperTema.classList.add('opacity-40', 'pointer-events-none');
      wrapperAssunto.classList.add('opacity-40', 'pointer-events-none');
    } else if (modo === 'erros') {
      wrapperTema.classList.add('opacity-40', 'pointer-events-none');
      wrapperAssunto.classList.add('opacity-40', 'pointer-events-none');
    } else {
      wrapperTema.classList.remove('opacity-40', 'pointer-events-none');
      wrapperAssunto.classList.remove('opacity-40', 'pointer-events-none');
    }

    // Temas únicos
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

    // Modo Estudo
    const temaSel = selectTema.value;
    const assuntoSel = selectAssunto.value;

    return bancoQuestoes.filter(q => {
      const matchTema = (temaSel === 'todos' || q.tema === temaSel);
      const matchAssunto = (assuntoSel === 'todos' || q.assunto === assuntoSel);
      return matchTema && matchAssunto;
    });
  }

  // --- Próxima Questão com Sistema Anti-Repetição ---
  function carregarProximaQuestao() {
    opcaoSelecionada = null;
    btnConfirmar.disabled = true;
    btnConfirmar.classList.remove('hidden');
    btnProxima.classList.add('hidden');
    boxExplicacao.classList.add('hidden');

    const questoesNoFiltro = obterQuestoesFiltradas();
    const modo = selectMode.value;

    // Apenas as não respondidas neste ciclo
    let candidatas = [];
    if (modo === 'erros') {
      // No caderno de erros, se já respondeu certo na sessão, você remove
      candidatas = questoesNoFiltro;
    } else {
      candidatas = questoesNoFiltro.filter(q => !respondidasSet.has(q.id));
    }

    lblRestantes.textContent = candidatas.length;
    atualizarResumoTopo();

    if (candidatas.length === 0) {
      cardQuestao.classList.add('hidden');
      cardCompletado.classList.remove('hidden');
      return;
    }

    cardCompletado.classList.add('hidden');
    cardQuestao.classList.remove('hidden');

    // Escolhe aleatoriamente uma das candidatas
    const idx = Math.floor(Math.random() * candidatas.length);
    questaoAtual = candidatas[idx];

    renderizarQuestao(questaoAtual);
  }

  // --- Renderizar Questão na Tela ---
  function renderizarQuestao(q) {
    badgeTema.textContent = q.tema || 'Geral';
    badgeAssunto.textContent = q.assunto || 'Tópico';
    badgeId.textContent = `#${q.id}`;
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

      // Limpar seleções anteriores
      const allBtns = containerOpcoes.querySelectorAll('.opcao-btn');
      allBtns.forEach(b => {
        b.classList.remove('border-amber-500', 'bg-amber-500/10', 'text-amber-300');
        const indicador = b.querySelector('.letra-indicador');
        indicador.classList.remove('bg-amber-500', 'text-slate-950', 'border-amber-400');
      });

      // Destacar selecionado
      btnElement.classList.add('border-amber-500', 'bg-amber-500/10', 'text-amber-300');
      const ind = btnElement.querySelector('.letra-indicador');
      ind.classList.add('bg-amber-500', 'text-slate-950', 'border-amber-400');
    }
  }

  // --- Confirmar Resposta & Feedback Imediato ---
  function confirmarResposta() {
    if (!opcaoSelecionada || !questaoAtual) return;

    const acertou = (opcaoSelecionada === questaoAtual.respostaCorreta);
    
    // Atualizar conjuntos
    respondidasSet.add(questaoAtual.id);
    if (acertou) {
      errosSet.delete(questaoAtual.id);
    } else {
      errosSet.add(questaoAtual.id);
    }

    // Atualizar estatísticas
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

    // Estilizar botões de opção
    const allBtns = containerOpcoes.querySelectorAll('.opcao-btn');
    allBtns.forEach(b => {
      b.classList.add('pointer-events-none'); // Bloqueia novos cliques
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

    // Configurar Caixa de Explicação Comentada
    boxExplicacao.classList.remove('hidden');
    if (acertou) {
      boxExplicacao.className = 'mt-6 p-4 sm:p-5 rounded-xl border border-emerald-500/40 bg-emerald-950/20 text-emerald-200';
      feedbackTitle.innerHTML = `
        <svg class="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
        <span class="text-emerald-400 text-sm font-bold">Resposta Correta!</span>
      `;
    } else {
      boxExplicacao.className = 'mt-6 p-4 sm:p-5 rounded-xl border border-rose-500/40 bg-rose-950/20 text-rose-200';
      feedbackTitle.innerHTML = `
        <svg class="w-5 h-5 text-rose-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
        <span class="text-rose-400 text-sm font-bold">Resposta Incorreta! A correta é a letra ${questaoAtual.respostaCorreta}.</span>
      `;
    }

    feedbackContent.innerHTML = `
      <div class="pt-1 border-t border-slate-700/50">
        <span class="font-bold uppercase tracking-wider text-[11px] text-amber-400 block mb-1">Fundamentação Legal & Comentário:</span>
        <p class="text-slate-300 leading-relaxed text-xs sm:text-sm whitespace-pre-line">${questaoAtual.explicacao || 'Sem comentário detalhado registrado.'}</p>
      </div>
    `;

    // Alternar botões
    btnConfirmar.classList.add('hidden');
    btnProxima.classList.remove('hidden');
  }

  // --- Atualizar Contadores do Topo ---
  function atualizarResumoTopo() {
    countErrosBadge.textContent = errosSet.size;

    const total = statsData.total || 0;
    const acertos = statsData.acertos || 0;
    const taxa = total > 0 ? Math.round((acertos / total) * 100) : 0;

    lblTaxaAcerto.textContent = `${taxa}%`;
  }

  // --- Reiniciar Ciclo Atual ---
  function reiniciarCicloAtual() {
    const modo = selectMode.value;
    const questoesNoFiltro = obterQuestoesFiltradas();

    if (modo === 'erros') {
      errosSet.clear();
    } else {
      // Remove do conjunto de respondidas apenas as do filtro atual
      questoesNoFiltro.forEach(q => respondidasSet.delete(q.id));
    }

    salvarStorage();
    carregarProximaQuestao();
  }

  // --- Renderizar Modal de Estatísticas ---
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

      // Validar estrutura básica
      for (const q of parsed) {
        if (!q.id || !q.enunciado || !q.opcoes || !q.respostaCorreta) {
          throw new Error('Cada questão precisa ter ao menos: id, enunciado, opcoes e respostaCorreta.');
        }
      }

      // Salvar no localStorage de custom
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

      // Recarrega banco
      carregarQuestoes().then(() => {
        atualizarFiltros();
        carregarProximaQuestao();
      });

    } catch (err) {
      alert('Erro ao processar JSON: ' + err.message);
    }
  }

  // --- Registrar Eventos ---
  function registrarEventos() {
    selectMode.addEventListener('change', () => {
      atualizarFiltros();
      carregarProximaQuestao();
    });

    selectTema.addEventListener('change', () => {
      atualizarAssuntos();
      carregarProximaQuestao();
    });

    selectAssunto.addEventListener('change', () => {
      carregarProximaQuestao();
    });

    btnConfirmar.addEventListener('click', confirmarResposta);
    btnProxima.addEventListener('click', carregarProximaQuestao);

    btnResetProgress.addEventListener('click', () => {
      if (confirm('Deseja reiniciar as questões respondidas do filtro atual?')) {
        reiniciarCicloAtual();
      }
    });

    btnReiniciarFiltro.addEventListener('click', reiniciarCicloAtual);
    btnIrParaErros.addEventListener('click', () => {
      selectMode.value = 'erros';
      atualizarFiltros();
      carregarProximaQuestao();
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
        respondidasSet.clear();
        errosSet.clear();
        statsData = { total: 0, acertos: 0, porTema: {} };
        salvarStorage();
        abrirModalStats();
        carregarProximaQuestao();
      }
    });
  }

  // Inicializar quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
