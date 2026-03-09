// ===============================
// ELEMENTOS PRINCIPAIS DO DOM
// ===============================

// Pega o elemento visual onde a capa do jogo aparece quando passa o mouse.
const GAME_COVER_PREVIEW = document.getElementById('game-cover-preview');

// Pega a <img> dentro desse preview (para trocar a imagem na hora do hover).
const PREVIEW_IMAGE = document.getElementById('preview-image');

// Variável global que vai guardar TODOS os jogos carregados do games.json.
let gamesData = [];

const sortSelect = document.getElementById('sort-filter-select');


// ===============================
// FILTROS INICIAIS DA PÁGINA
// ===============================

// Esse objeto representa todos os filtros ativos no momento.
// É assim que a página começa carregada: nada filtrado.
let currentFilter = {
    search: '',              // Filtrar pelo nome do jogo
    is_100_percent: 0,   // Mostrar apenas platinas (100%)
    status: 'Tudo',          // Filtrar por status (Jogando, Zerado, etc.)
    platform: 'Tudo',        // Filtrar pela plataforma
    min_score: '0',          // Nota exata
    played_year: 'Tudo',     // Filtrar ano em que o jogo foi zerado
    release_year: '',        // Filtrar ano de lançamento
    genre_search: ''         // Busca por gênero
};

// Ordenação inicial: título crescente
let currentSort = 'titulo_asc';

// ===============================
// MAPA DE STATUS DO DOM
// ===============================

// Cada chave representa um status de jogo, e o valor é o container no HTML
// onde os jogos desse status serão colocados.
const STATUS_MAP = {
    'Jogando': document.getElementById('games-jogando'),
    'Zerado': document.getElementById('games-zerados'),
    'Pausado': document.getElementById('games-pausado'),
    'Dropado': document.getElementById('games-dropados'),
    'Backlog': document.getElementById('games-backlog'),
    'Playlist': document.getElementById('games-playlist'),
    'Sem Fim': document.getElementById('games-semfim'),
    'DLC': document.getElementById('games-dlc'),
    'Ports': document.getElementById('games-ports'),
    'Outros': document.getElementById('games-outros'),
    'Coleções': document.getElementById('games-col'),
};

// Esse trecho verifica se algum desses IDs não existe no HTML.
// Caso falte algum container, mostra um aviso no console.
Object.entries(STATUS_MAP).forEach(([k, el]) => {
    if (!el) console.warn(`Aviso: container do status "${k}" não encontrado no DOM.`);
});

// ===============================
// CORES DAS NOTAS
// ===============================

// Cada nota de 0 a 10 tem uma cor específica (usada no quadradinho da nota).
const SCORE_COLORS = {
    0: '#313336',
1:  '#D32F2F', // vermelho forte
2:  '#E53935',
3:  '#F4511E', // vermelho-alaranjado
4:  '#FB8C00', // laranja
5:  '#FBC02D', // amarelo
6:  '#C0CA33', // amarelo-esverdeado
7:  '#7CB342', // verde
8:  '#43A047', // verde mais vivo
9:  '#26A69A', // verde-azulado (transição)
10: '#22b9cf'  // azul (fixo)
};

// Retorna a cor correta para uma nota.
// Se a nota não existir, usa cor de 0.
function getScoreColor(nota) {
    const n = Number(nota);
    const scoreKey = (n >= 1 && n <= 10) ? n : 0;
    return SCORE_COLORS[scoreKey];
}

// FUNÇÃO DE DATA
function extractYear(value) {
    if (value === null || value === undefined || value === '') return null;
    if (typeof value === 'number' && Number.isFinite(value)) return value;
}

// ===============================
// CRIAÇÃO VISUAL DE UM JOGO
// ===============================

function isPlatinum(valor) {
    if (typeof valor === "number") return valor === 100;

    if (typeof valor === "string") {
        if (valor.includes("/")) {
            const [a, b] = valor.split("/").map(Number);
            return !isNaN(a) && !isNaN(b) && a === b;
        }
        return Number(valor) === 100;
    }

    return false;
}


function createGameRow(game) {

    // Cria o elemento visual do jogo (linha principal)
    const row = document.createElement('div');
    row.classList.add('game-row');
    row.setAttribute('data-game-id', game.id ?? '');

    // Pega a cor da nota
    const scoreColor = getScoreColor(game.score);
    

    const sortSelect = document.getElementById('sort-filter-select');



    // Conteúdo do progresso
    const isPlat = isPlatinum(game.conquistas_percentual);

    const progressContent = isPlat ? '🏆' : `${game.conquistas_percentual ?? 0}%`;
    const trophyClass = isPlat ? 'trophy-bg' : '';

    // Gêneros formatados
    const generosText = Array.isArray(game.generos)
        ? game.generos.join(', ')
        : (game.generos || '—');

    // HTML da linha principal
    row.innerHTML = `
        <div class="col-icon">
            <img src="${game.icone_url || ''}" alt="${(game.titulo || '').replace(/"/g, '')} ícone">
        </div>

        <div class="col-title">
            ${game.titulo || '—'}
        </div>

        <div class="col-score">
            <span class="data-highlight" style="background-color: ${scoreColor};">
                ${game.score ?? '—'}
            </span>
        </div>

        <div class="col-year">
            <span class="data-highlight">${game.ano_lancamento ?? '—'}</span>
        </div>


        <div class="col-progress">
            <span class="data-highlight ${trophyClass}">
                ${progressContent}
            </span>
        </div>
    `;

    // Conteúdo extra que aparece ao clicar
    const reviewContent = document.createElement('div');
    reviewContent.classList.add('review-content');
    reviewContent.id = `review-${game.id ?? Math.random().toString(36).slice(2)}`;

    reviewContent.innerHTML = `
      <div class="review-text">${game.review || ''}</div>

      <div class="review-info">
        <p><i class="fas fa-desktop"></i> ${game.plataforma || '—'}</p>
        <p><i class="fas fa-puzzle-piece"></i> ${generosText}</p>
        <p><i class="fas fa-clock"></i> ${game.tempo_jogo_horas ?? '—'}h</p>
        <p><i class="fas fa-calendar-alt"></i> ${game.data_zerado ?? '—'}</p>
        <p><i class="fas fa-code"></i> ${game.dev || '—'}</p>

      </div>

      
    `;

    // ===============================
    // EVENTO: HOVER PARA MOSTRAR CAPA
    // ===============================
    row.addEventListener('mouseenter', () => {

        if (!GAME_COVER_PREVIEW || !PREVIEW_IMAGE) return;

        // Troca a imagem
        PREVIEW_IMAGE.src = game.capa_url || '';

        // Mostra visualmente
        GAME_COVER_PREVIEW.classList.add('show');

        const parent = GAME_COVER_PREVIEW.parentElement;
        if (!parent) return;

        // Calcula posição vertical do preview
        const rowRect = row.getBoundingClientRect();
        const wrapperRect = parent.getBoundingClientRect();

        const previewHeight =
            GAME_COVER_PREVIEW.offsetHeight ||
            GAME_COVER_PREVIEW.getBoundingClientRect().height ||
            200;

        let coverTopPosition =
            (rowRect.top - wrapperRect.top) +
            (rowRect.height / 2) -
            (previewHeight / 2);

        GAME_COVER_PREVIEW.style.top = `${coverTopPosition}px`;

        // Alinha à esquerda da linha
        const leftBase = (rowRect.left || 0) - (wrapperRect.left || 0);
        GAME_COVER_PREVIEW.style.left =
            `${leftBase - (GAME_COVER_PREVIEW.offsetWidth || 300) - 16}px`;
    });

    // Evento para sumir com o preview
    row.addEventListener('mouseleave', () => {
        if (!GAME_COVER_PREVIEW || !PREVIEW_IMAGE) return;

        GAME_COVER_PREVIEW.classList.remove('show');

        // Pequeno atraso para evitar piscadas
        setTimeout(() => {
            if (!GAME_COVER_PREVIEW.classList.contains('show')) {
                PREVIEW_IMAGE.src = '';
            }
        }, 350);
    });

    // Evento de clique para mostrar/esconder review
    row.addEventListener('click', () => {
        reviewContent.classList.toggle('show');
    });

    // Agrupa a linha + review em um fragmento
    const fragment = document.createDocumentFragment();
    fragment.appendChild(row);
    fragment.appendChild(reviewContent);

    return fragment;
}

function sortGames(filteredGames) {
    const sortBy = sortSelect?.value || 'titulo';

    filteredGames.sort((a, b) => {

        if (sortBy === 'titulo') {
            return (a.titulo || '').localeCompare(b.titulo || '');
        }

        if (sortBy === 'score') {
            return (b.score || 0) - (a.score || 0);
        }

        if (sortBy === 'ano_lancamento') {
            return (a.ano_lancamento || 0) - (b.ano_lancamento || 0);
        }

        if (sortBy === 'tempo_jogo_horas') {
            return (b.tempo_jogo_horas || 0) - (a.tempo_jogo_horas || 0);
        }

        if (sortBy === 'conquistas_percentual') {
            return (b.conquistas_percentual || 0) - (a.conquistas_percentual || 0);
        }

        return 0;
    });
}








// FUNÇÃO PRINCIPAL DE RENDERIZAÇÃO, APLICAÇÂO DE FILTROS, ORDENAÇÃO ETC
async function renderGames(data = gamesData) {

    // Se ainda não carregou o JSON, carrega
    if (data.length === 0) {
        try {
            const response = await fetch('../games.json');
            gamesData = await response.json();
            data = gamesData;
        } catch (error) {
            console.error('Erro ao carregar games.json:', error);
            return;
        }
    }

    let filteredGames = data.slice();

    // FILTROS POR TÌTULO
    if (currentFilter.search) {
        const searchTerm = currentFilter.search.toLowerCase();
        filteredGames =
            filteredGames.filter(game =>
                (game.titulo || '').toLowerCase().includes(searchTerm)
            );
    }

    // PARTE DO FILTRO DE PLATINAS
        if (currentFilter.is_100_percent) {
        filteredGames = filteredGames.filter(game =>
            isPlatinum(game.conquistas_percentual)
        );
    }

    // FILTRO POR PLATAFORMA
    if (currentFilter.platform && currentFilter.platform !== 'Tudo') {
        const target = currentFilter.platform.toLowerCase();
        filteredGames = filteredGames.filter(game => {
            if (!game.plataforma) return false;
            return game.plataforma.toLowerCase().includes(target);
        });
    }

    // FILTRO POR NOTA
    if (currentFilter.min_score && currentFilter.min_score !== '0') {
        const targetScore = parseInt(currentFilter.min_score, 10);
        if (!isNaN(targetScore)) {
            filteredGames = filteredGames.filter(game => {
                const gScore = parseInt(game.score, 10);
                return !isNaN(gScore) && gScore === targetScore;
            });
        }
    }

    // FILTROS POR DATA DE ZERAMENTO
    if (currentFilter.played_year && currentFilter.played_year !== 'Tudo') {
        const targetYear = parseInt(currentFilter.played_year, 10);
        if (!isNaN(targetYear)) {
            filteredGames = filteredGames.filter(game => {
                const year = extractYear(game.data_zerado);
                return year === targetYear;
            });
        }
    }

// FILTROS POR ANO DE LANÇAMENTO - VERSÃO COM STRING CONTAINS
if (currentFilter.release_year &&
    currentFilter.release_year.toString().trim() !== '') {

    const searchTerm = currentFilter.release_year.toString().trim().toLowerCase();

    filteredGames = filteredGames.filter(game => {
        if (game.ano_lancamento === undefined || game.ano_lancamento === null)
            return false;

        // Converte o ano do jogo para string e faz busca parcial (case insensitive)
        return game.ano_lancamento.toString().toLowerCase().includes(searchTerm);
    });
}

    // FILTROS POR GÊNEROS
    if (currentFilter.genre_search &&
        currentFilter.genre_search.trim() !== '') {

        const gTerm = currentFilter.genre_search.toLowerCase();

        filteredGames = filteredGames.filter(game => {
            if (!game.generos) return false;

            if (Array.isArray(game.generos)) {
                return game.generos.some(gn =>
                    gn.toLowerCase().includes(gTerm)
                );
            } else {
                return game.generos.toLowerCase().includes(gTerm);
            }
        });
    }

// APLICA ORDENAÇÃO FINAL
sortGames(filteredGames);



    // NÃO SEI O QUE ISSO FAZ, NÃO PARECE IMPORTANTE
    Object.values(STATUS_MAP).forEach(container => {
        if (!container) return;

        const section = container.closest('.status-section');
        if (section) section.classList.add('hidden');

        container.innerHTML = '';
    });

    // NÃO SEI O QUE ISSO FAZ, MAS É IMPORTANTE (NÃO MUDAR)
    const gamesByStatus = {};
    filteredGames.forEach(game => {
        const status =
            (game.status === 'Platinado' || game.status === 'Zerado')
            ? 'Zerado'
            : (game.status || 'Outro');

        if (!gamesByStatus[status]) gamesByStatus[status] = [];
        gamesByStatus[status].push(game);
    });

    // CRIA OS CONTAINERS E CARDS
    Object.keys(gamesByStatus).forEach(statusKey => {

        const gamesList = gamesByStatus[statusKey];
        const targetContainer = STATUS_MAP[statusKey];

        if (targetContainer && gamesList.length > 0) {

            gamesList.forEach(game => {
                targetContainer.appendChild(createGameRow(game));
            });

            const section = targetContainer.closest('.status-section');
            if (section) section.classList.remove('hidden');
        }
    });
}

function initializeListeners() { // FILTROS DA ABINHA LATERAL

    // FILTRO DE PESQUISAS POR TEXTO E TÍTULOS
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentFilter.search = e.target.value;
            renderGames(gamesData);
        });}

        


    // FILTRO DE PESQUISA POR PLATAFORMAS
    const platformSelect = document.getElementById('platform-filter-select');
    if (platformSelect) {
        platformSelect.addEventListener('change', (e) => {
            currentFilter.platform = e.target.value;
            renderGames(gamesData);
        });}

    // FILTRO DE PESQUISA POR NOTAS
    const minScoreSelect = document.getElementById('min-score-filter-select');
    if (minScoreSelect) {
        minScoreSelect.addEventListener('change', (e) => {
            currentFilter.min_score = e.target.value;
            renderGames(gamesData);
        });}

    // FILTRO DE PESQUISA POR ANO ZERADO
    const playedYearSelect = document.getElementById('played-year-filter-select');
    if (playedYearSelect) {
        playedYearSelect.addEventListener('change', (e) => {
            currentFilter.played_year = e.target.value;
            renderGames(gamesData);
        });}

    // FILTRO PESQUISAR POR GÊNEROS
    const genreInput = document.getElementById('genre-search-input');
    if (genreInput) {
        genreInput.addEventListener('input', (e) => {
            currentFilter.genre_search = e.target.value;
            renderGames(gamesData);
        });}

    // FILTRO DE PESQUISAR POR ANO DE LANÇAMENTO
    const releaseYearInput = document.getElementById('release-year-input');
    if (releaseYearInput) {
        releaseYearInput.addEventListener('input', (e) => {
            currentFilter.release_year = e.target.value;
            renderGames(gamesData);
        });}

    // CARREGA E ATIVA AS ORDENAÇÕES
        if (sortSelect) {
            sortSelect.addEventListener('change', () => {
            renderGames(gamesData);
        });
}

}

(async () => { // RENDERIZA E ATIVA OS FILTROS QUANDO A PÁGINA CARREGA
    await renderGames();     // Carrega tudo e renderiza
    initializeListeners();   // Ativa filtros
})();

(function markActiveNav() { // MARCA A PÁGINA ATUAL NA HEADER 
    const links = document.querySelectorAll('.main-nav .nav-link');
    const path = location.pathname || '/';

    links.forEach(a => {
        a.classList.remove('active');

        const href = a.getAttribute('href') || '';
        const target = a.getAttribute('data-target') || '';

        if (href !== '/' && href !== '' && path.startsWith(href)) {
            a.classList.add('active');
        }
        else if (href === '/' && path === '/') {
            a.classList.add('active');
        }
        else if (target && path.includes(target)) {
            a.classList.add('active');
        }
    });
})();

