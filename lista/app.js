// app.js

// Elementos principais
const GAME_COVER_PREVIEW = document.getElementById('game-cover-preview'); // Pega o elemento da capa
const PREVIEW_IMAGE = document.getElementById('preview-image'); // Pega a imagem dentro da capa
let gamesData = [];

let currentFilter = {
    search: '',
    is_100_percent: false,
    status: 'Tudo', // filtro inicial
    platform: 'Tudo',
    min_score: '0',
    played_year: 'Tudo',
    release_year: '',
    genre_search: ''
};

let currentSort = 'titulo_asc'; // Ordenação padrão

// STATUS_MAP (verifica se os IDs existem)
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
    'Coleções': document.getElementById('games-col'),
};
Object.entries(STATUS_MAP).forEach(([k, el]) => {
    if (!el) console.warn(`Aviso: container do status "${k}" não encontrado no DOM.`);
});

// Cores das notas
const SCORE_COLORS = {
    0: '#313336',
    1: '#9A1E2F',
    2: '#C9364C',
    3: '#D9651C',
    4: '#E99C2E',
    5: '#E0B547',
    6: '#6DAE4F',
    7: '#429352',
    8: '#3D7791',
    9: '#4F4EAD',
    10: '#754FAB'
};
function getScoreColor(nota) {
    const n = Number(nota);
    const scoreKey = (n >= 1 && n <= 10) ? n : 0;
    return SCORE_COLORS[scoreKey];
}

// --- Utilitários de data robustos ---
function extractYear(value) {
    if (value === null || value === undefined || value === '') return null;
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    const s = value.toString().trim();
    if (/^\d{4}$/.test(s)) return parseInt(s, 10);
    const isoMatch = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (isoMatch) return parseInt(isoMatch[1], 10);
    const dm = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (dm) return parseInt(dm[3], 10);
    const ts = Date.parse(s);
    if (!isNaN(ts)) return new Date(ts).getFullYear();
    return null;
}
function parseDateToTimestamp(value) {
    if (!value && value !== 0) return NaN;
    if (typeof value === 'number' && Number.isFinite(value)) {
        // se for só ano (ex: 2025) cria Date no início do ano
        const year = value;
        if (year > 1000) return new Date(year, 0, 1).getTime();
        return NaN;
    }
    const s = value.toString().trim();
    const isoMatch = s.match(/^(\d{4})-(\d{2})-(\d{2})(.*)?$/);
    if (isoMatch) {
        const d = new Date(s);
        return isNaN(d.getTime()) ? NaN : d.getTime();
    }
    const dm = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (dm) {
        const day = parseInt(dm[1], 10);
        const month = parseInt(dm[2], 10) - 1;
        const year = parseInt(dm[3], 10);
        const d = new Date(year, month, day);
        return isNaN(d.getTime()) ? NaN : d.getTime();
    }
    // se for só "2025" em string
    if (/^\d{4}$/.test(s)) return new Date(parseInt(s,10), 0, 1).getTime();
    const ts = Date.parse(s);
    return isNaN(ts) ? NaN : ts;
}

// --- createGameRow (robusto) ---
function createGameRow(game) {
    const row = document.createElement('div');
    row.classList.add('game-row');
    row.setAttribute('data-game-id', game.id ?? '');

    const scoreColor = getScoreColor(game.nota_pessoal);
    const isPlat = Number(game.conquistas_percentual) === 100;
    const progressContent = isPlat ? '🏆' : `${game.conquistas_percentual ?? 0}%`;
    const trophyClass = isPlat ? 'trophy-bg' : '';

    // Proteção generos
    const generosText = Array.isArray(game.generos) ? game.generos.join(', ') : (game.generos || '—');

    row.innerHTML = `
        <div class="col-icon">
            <img src="${game.icone_url || ''}" alt="${(game.titulo || '').replace(/"/g, '')} ícone">
        </div>
        <div class="col-title"> 
            ${game.titulo || '—'}
        </div>

        <div class="col-score">
            <span class="data-highlight" style="background-color: ${scoreColor};">${game.nota_pessoal ?? '—'}</span>
        </div>

        <div class="col-year">
            <span class="data-highlight">${game.ano_lancamento ?? '—'}</span>
        </div>

        <div class="col-progress">
            <span class="data-highlight ${trophyClass}">${progressContent}</span>
        </div>
    `;

    const reviewContent = document.createElement('div');
    reviewContent.classList.add('review-content');
    reviewContent.id = `review-${game.id ?? Math.random().toString(36).slice(2)}`;

reviewContent.innerHTML = `
  <div class="review-text">${game.review || ''}</div>

  <div class="review-info">
    <p><i class="fas fa-desktop"></i> ${game.plataforma || '—'}</p>
    <p><i class="fas fa-puzzle-piece"></i> ${generosText}</p>
    <p><i class="fas fa-clock"></i>  ${game.tempo_jogo_horas ?? '—'}h</p>
    <p><i class="fas fa-calendar-alt"></i> ${game.data_zerado ?? '—'}</p>
  </div>
`;


    // Hover preview com checagens
    row.addEventListener('mouseenter', () => {
        if (!GAME_COVER_PREVIEW || !PREVIEW_IMAGE) return;
        PREVIEW_IMAGE.src = game.capa_url || '';
        GAME_COVER_PREVIEW.classList.add('show');

        const parent = GAME_COVER_PREVIEW.parentElement;
        if (!parent) return;

        const rowRect = row.getBoundingClientRect();
        const wrapperRect = parent.getBoundingClientRect();

        const previewHeight = GAME_COVER_PREVIEW.offsetHeight || GAME_COVER_PREVIEW.getBoundingClientRect().height || 200;
        let coverTopPosition = (rowRect.top - wrapperRect.top) + (rowRect.height / 2) - (previewHeight / 2);
        GAME_COVER_PREVIEW.style.top = `${coverTopPosition}px`;

        const leftBase = (rowRect.left || 0) - (wrapperRect.left || 0);
        GAME_COVER_PREVIEW.style.left = `${leftBase - (GAME_COVER_PREVIEW.offsetWidth || 300) - 16}px`;
    });

    row.addEventListener('mouseleave', () => {
        if (!GAME_COVER_PREVIEW || !PREVIEW_IMAGE) return;
        GAME_COVER_PREVIEW.classList.remove('show');
        setTimeout(() => {
            if (!GAME_COVER_PREVIEW.classList.contains('show')) {
                PREVIEW_IMAGE.src = '';
            }
        }, 350);
    });

    row.addEventListener('click', () => {
        reviewContent.classList.toggle('show');
    });

    const fragment = document.createDocumentFragment();
    fragment.appendChild(row);
    fragment.appendChild(reviewContent);

    return fragment;
}

// --- renderGames: carrega, filtra, ordena e renderiza ---
async function renderGames(data = gamesData) {
    if (data.length === 0) {
        try {
            const response = await fetch('/kissutina/games.json');
            gamesData = await response.json();
            data = gamesData;
        } catch (error) {
            console.error('Erro ao carregar games.json:', error);
            return;
        }
    }

    let filteredGames = data.slice();

    // Busca por título
    if (currentFilter.search) {
        const searchTerm = currentFilter.search.toLowerCase();
        filteredGames = filteredGames.filter(game => (game.titulo || '').toString().toLowerCase().includes(searchTerm));
    }

    // 100% achievements
    if (currentFilter.is_100_percent === true) {
        filteredGames = filteredGames.filter(game => Number(game.conquistas_percentual) === 100);
    }

    // Status (agrupa Platinado -> Zerado)
    if (currentFilter.status && currentFilter.status !== 'Tudo') {
        filteredGames = filteredGames.filter(game => {
            const gameStatus = (game.status === 'Platinado' || game.status === 'Zerado') ? 'Zerado' : (game.status || '');
            return gameStatus === currentFilter.status;
        });
    }

    // Plataforma (comparação parcial, case-insensitive)
    if (currentFilter.platform && currentFilter.platform !== 'Tudo') {
        const target = currentFilter.platform.toString().toLowerCase();
        filteredGames = filteredGames.filter(game => {
            if (!game.plataforma) return false;
            return game.plataforma.toString().toLowerCase().includes(target);
        });
    }

// Nota exata (se selecionou algo diferente de '0' interpretamos como filtro)
if (currentFilter.min_score && currentFilter.min_score !== '0') {
    const targetScore = parseInt(currentFilter.min_score, 10);
    if (!isNaN(targetScore)) {
        filteredGames = filteredGames.filter(game => {
            // força número para comparação exata
            const gScore = parseInt(game.nota_pessoal, 10);
            return !isNaN(gScore) && gScore === targetScore;
        });
    }
}


    // Ano zerado (played_year) — usa extractYear para compatibilidade
    if (currentFilter.played_year && currentFilter.played_year !== 'Tudo') {
        const targetYear = parseInt(currentFilter.played_year, 10);
        if (!isNaN(targetYear)) {
            filteredGames = filteredGames.filter(game => {
                const year = extractYear(game.data_zerado);
                return year === targetYear;
            });
        }
    }

    // Ano de lançamento (release_year) — busca exata em string/number
    if (currentFilter.release_year && currentFilter.release_year.toString().trim() !== '') {
        const searchTerm = currentFilter.release_year.toString().trim();
        filteredGames = filteredGames.filter(game => {
            if (game.ano_lancamento === undefined || game.ano_lancamento === null) return false;
            return game.ano_lancamento.toString().trim() === searchTerm;
        });
    }

    // Gênero (busca parcial, case-insensitive)
    if (currentFilter.genre_search && currentFilter.genre_search.trim() !== '') {
        const gTerm = currentFilter.genre_search.toLowerCase();
        filteredGames = filteredGames.filter(game => {
            if (!game.generos) return false;
            if (Array.isArray(game.generos)) {
                return game.generos.some(gn => gn.toString().toLowerCase().includes(gTerm));
            } else {
                return game.generos.toString().toLowerCase().includes(gTerm);
            }
        });
    }

    // Ordenação robusta
    filteredGames.sort((a, b) => {
        const parts = currentSort.split('_');
        const direction = parts.pop();
        const key = parts.join('_');

        if (key === 'titulo') {
            const valA = (a.titulo || '').toString().toLowerCase();
            const valB = (b.titulo || '').toString().toLowerCase();
            return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }

        let valA = 0, valB = 0;
        if (key === 'nota_pessoal') {
            valA = parseFloat(a.nota_pessoal) || 0;
            valB = parseFloat(b.nota_pessoal) || 0;
        } else if (key === 'ano_lancamento') {
            valA = parseInt(a.ano_lancamento, 10) || 0;
            valB = parseInt(b.ano_lancamento, 10) || 0;
        } else if (key === 'data_zerado') {
            const timeA = parseDateToTimestamp(a.data_zerado);
            const timeB = parseDateToTimestamp(b.data_zerado);
            valA = isNaN(timeA) ? 0 : timeA;
            valB = isNaN(timeB) ? 0 : timeB;
        } else if (key === 'conquistas_percentual') {
            valA = parseFloat(a.conquistas_percentual) || 0;
            valB = parseFloat(b.conquistas_percentual) || 0;
        } else {
            return 0;
        }

        return direction === 'asc' ? (valA - valB) : (valB - valA);
    });

    // --- Renderização agrupada por status ---
    // Limpa containers com checagem
    Object.values(STATUS_MAP).forEach(container => {
        if (!container) return;
        const section = container.closest('.status-section');
        if (section) section.classList.add('hidden');
        container.innerHTML = '';
    });

    const gamesByStatus = {};
    filteredGames.forEach(game => {
        const status = (game.status === 'Platinado' || game.status === 'Zerado') ? 'Zerado' : (game.status || 'Outro');
        if (!gamesByStatus[status]) gamesByStatus[status] = [];
        gamesByStatus[status].push(game);
    });

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

    const totalEl = document.getElementById('total-games');
    if (totalEl) totalEl.textContent = `Total: ${filteredGames.length} Jogos Filtrados`;
}

// --- Initialize listeners (defensivo) ---
function initializeListeners() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentFilter.search = e.target.value;
            renderGames(gamesData);
        });
    }

    const toggleButton = document.getElementById('toggle-100-percent');
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            currentFilter.is_100_percent = !currentFilter.is_100_percent;
            toggleButton.setAttribute('data-active', currentFilter.is_100_percent);
            toggleButton.textContent = currentFilter.is_100_percent ? '100% APENAS (ATIVO)' : 'Mostrar Somente 100%';
            renderGames(gamesData);
        });
    }

    const statusSelect = document.getElementById('status-filter-select');
    if (statusSelect) {
        statusSelect.addEventListener('change', (e) => {
            currentFilter.status = e.target.value;
            renderGames(gamesData);
        });
    }

    const platformSelect = document.getElementById('platform-filter-select');
    if (platformSelect) {
        platformSelect.addEventListener('change', (e) => {
            currentFilter.platform = e.target.value;
            renderGames(gamesData);
        });
    }

    const minScoreSelect = document.getElementById('min-score-filter-select');
    if (minScoreSelect) {
        minScoreSelect.addEventListener('change', (e) => {
            currentFilter.min_score = e.target.value;
            renderGames(gamesData);
        });
    }

    const playedYearSelect = document.getElementById('played-year-filter-select');
    if (playedYearSelect) {
        playedYearSelect.addEventListener('change', (e) => {
            currentFilter.played_year = e.target.value;
            renderGames(gamesData);
        });
    }

    const genreInput = document.getElementById('genre-search-input');
    if (genreInput) {
        genreInput.addEventListener('input', (e) => {
            currentFilter.genre_search = e.target.value;
            renderGames(gamesData);
        });
    }

    const releaseYearInput = document.getElementById('release-year-input');
    if (releaseYearInput) {
        releaseYearInput.addEventListener('input', (e) => {
            currentFilter.release_year = e.target.value;
            renderGames(gamesData);
        });
    }

    const sortSelect = document.getElementById('sort-filter-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            renderGames(gamesData);
        });
    }
}

// --- Inicialização ---
(async () => {
    await renderGames();
    initializeListeners();
})();


(function markActiveNav() {
  const links = document.querySelectorAll('.main-nav .nav-link');
  const path = location.pathname || '/';
  links.forEach(a => {
    a.classList.remove('active');
    const href = a.getAttribute('href') || '';
    const target = a.getAttribute('data-target') || '';
    if (href !== '/' && href !== '' && path.startsWith(href)) {
      a.classList.add('active');
    } else if (href === '/' && path === '/') {
      a.classList.add('active');
    } else if (target && path.includes(target)) {
      a.classList.add('active');
    }
  });
})();

