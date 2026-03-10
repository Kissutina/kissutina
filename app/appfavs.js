
        // Função auxiliar para consertar links do YouTube
    function getEmbedLink(url) {
    try {
        const parsedUrl = new URL(url);

        // youtu.be/ID
        if (parsedUrl.hostname.includes('youtu.be')) {
            return `https://www.youtube.com/embed/${parsedUrl.pathname.slice(1)}`;
        }

        // youtube.com/watch?v=ID
        if (parsedUrl.searchParams.get('v')) {
            return `https://www.youtube.com/embed/${parsedUrl.searchParams.get('v')}`;
        }

        // youtube.com/embed/ID (já pronto)
        if (parsedUrl.pathname.includes('/embed/')) {
            return url;
        }

    } catch (e) {
        console.warn("Link inválido:", url);
    }

    return url;
}

        const data = [
            // --- CATEGORIA PADRÃO (TOP 10) ---
            {
                category: "Jogos Favoritos",
                tipo: "padrao",
                items: 
                [
                    { nome: "Hollow Knight Silksong", img: "https://cdn2.steamgriddb.com/grid/a4c450d525acc944630398eb55bdca70.png", desc: "Vocês não fazem ideia do tamanho da minha felicidade quando esse jogo saiu, depois de mais de 5 anos de espera, e a demora valeu a pena; Silksong é o jogo da minha vida." },
                    { nome: "Shadow of the Colossus", img: "https://cdn2.steamgriddb.com/grid/7eb34878362f67244415aaf134f35cbe.png", desc: "Se eu tivesse noção do quão bom isso é, teria feito questão de jogar antes; Shadow of the Colossus é literalmente o estado da arte." },
                    { nome: "Resident Evil 4", img: "https://cdn2.steamgriddb.com/grid/a7ee11c99daa86125832bfc5e5a06cce.png", desc: "O 4 sequer é o meu favorito da franquia, mas, se hoje sou um adulto que gosta de jogos, é porque tive esse jogo na minha infância." },
                    { nome: "Metal Gear Soild V: The Phantom Pain", img: "https://cdn2.steamgriddb.com/grid/fd352c65107ff1f3b22f03aa48bd053b.png", desc: "Esse jogo é um mundo aberto enorme e vazio, não tem nada pra fazer e, ainda assim, é um dos melhores que eu já joguei; Hideo Kojima sabe de algo que a gente não sabe." },
                    { nome: "The Legend of Zelda", img: "https://cdn2.steamgriddb.com/grid/775679ee9220a358ee19f572041e40f0.png", desc: "Eu sinto que estou roubando ao fazer isso, mas, apesar da capa, não é que Majora's Mask seja meu favorito da franquia, a verdade é que simplesmente não tem Zelda's ruins." },
                    { nome: "Mario Galaxy", img: "https://cdn2.steamgriddb.com/grid/850660ba5cb014184e5cc0e6b3d4c6bb.png", desc: "Esse jogo não cansa de surpreender o jogador, toda fase é uma mecânica completamnete nova que é super legal e munca mais vai ser usada... E tem MUITAS fases aqui." },
                    { nome: "Celeste", img: "https://cdn2.steamgriddb.com/grid/0d45814d8f22968ee3cfe99b8904d746.png", desc: "Celeste chegou pra mim num momento bem ruim e foi a minha redescoberta com jogos, foi como se apaixonar de novo, especialmente pelos jogos “difíceis”; além disso, foi o motivo de eu ter criado uma conta na Steam." },
                    { nome: "Far Cry 3", img: "https://cdn2.steamgriddb.com/grid/00c9157a614a13927382c42cc26dbfd4.png", desc: "Did I ever tell you what the definition of insanity is? Insanity is doing the exact... same fucking thing... over and over again expecting... shit to change... That. Is. Crazy." },
                    { nome: "Tetris", img: "https://cdn2.steamgriddb.com/grid/3a4b5cd74f65b2fa9163eb6c403112f9.jpg", desc: "Esse jogo me ajudou muito quando eu estava mal; não sei explicar, mas, quando não quero pensar em nada porque tudo ao meu redor me lembra algo ruim, entrar no flow de uma partida de Tetris meio que me salva disso." },
                    { nome: "Hades", img: "https://cdn2.steamgriddb.com/grid/4cb1c17b82ffc973aa1d52670a17c5a8.png", desc: "Naturalmente, o nº 10 do top 10 é o que muda com mais frequência, então ficam aqui as menções honrosas a Undertale, Bayonetta, Stardew Valley, Dishonored, Hi-fi Rush e tal."}
                ]
           },

            {
                category: "Melhor com Amigos",
                tipo: "padrao",
                items: 
                [
                    { nome: "Dark Souls Remastered", img: "https://cdn2.steamgriddb.com/grid/e1a19c58affd8e8794f8bd8de6309b77.png", desc: "Me chama pra jogar Dark Souls que eu aceito, pode ser uma run normal, com algum desafio maluco, randomizer, level 1, só no soco, speedrun, o que vier." },
                    { nome: "Minecraft", img: "https://cdn2.steamgriddb.com/grid/7344bcd24a4a0393f45cad1a212c62e7.png", desc: "Bem-vindo ao Minecraft, meu amigo Na jornada desse game, ficará surpreendido Sinta liberdade para poder criar Apenas qualquer coisa que poder imaginar Modo criativo ou sobrevivência" },
                    { nome: "Mario Party", img: "https://cdn2.steamgriddb.com/grid/d8990f79de598c52139e95e819c86c8c.png", desc: "É muito bom ter nascido com sorte, e, apesar de não parecer, eu gosto dos meus amigos." },
                    { nome: "Mario Kart", img: "https://cdn2.steamgriddb.com/grid/08685bf36516348b810ede4e3c1dfe52.png", desc: "Antes de jogar MK eu nem gostava de jogos de corrida, isso é o quão bom ele é." },
                    { nome: "PEAK", img: "https://cdn2.steamgriddb.com/grid/b53b8b48c4b228b070851d52800bb9e1.png", desc: "Ninguém solta a mão de ninguém. Todo dia eu torço pra esse jogo ganhar uma atualização massiva com conteúdo infinito" },
                    { nome: "Garry's Mod", img: "https://cdn2.steamgriddb.com/grid/a2a9894ca446f0fe0aac693516c52c4d.png", desc: "Gmod é aquele meme de Toy Story do Buzz falando 'THE POSSIBILITES ARE ENDLESS'" },
                    { nome: "Overwatch", img: "https://cdn2.steamgriddb.com/grid/20e29904d611f1e9dd8728bcae233854.png", desc: "Iniciando Matriz de defesa!<br>Neutralizando projéteis!<br>Pede pra nerfar, noob!" },
                    { nome: "It Takes Two", img: "https://cdn2.steamgriddb.com/grid/84d8df6932e202152767f7579f32c613.png", desc: "Apesar de estar meio baixo no top 10, essa aqui é a experiência coop em dupla definitiva." },
                    { nome: "A Way Out", img: "https://cdn2.steamgriddb.com/grid/f933d5c2b1cf9fd42ec839ef9648bf46.png", desc: "E essa aqui é a segunda melhor experiência em dupla, FUCK THE OSCARS" },
                    { nome: "Team Fortress 2", img: "https://cdn2.steamgriddb.com/grid/f64230dace882ba8b2d14ebfd24dc0a3.png", desc: "TF2 foi a minha primeira experiência online com um jogo, que maluco, o tempo passa muito rápido, hoje em dia eu só jogaria isso aqui de meme e muito bem acompanhado, mas já foi a minha principal diversão por muitos meses."}
                ]
           },
            
            // --- CATEGORIA PADRÃO (TOP 10) ---
            {
                category: "Personagens Favoritos",
                tipo: "padrao",
                items: [

                    { nome: "Hatsune Miku", img: "https://static.wikitide.net/projectsekaiwiki/thumb/7/72/Miku_58_trained_art.png/1920px-Miku_58_trained_art.png",zoom: 1.4, desc: "Miku representa toda uma cultura de internet que é muito importante pra mim, fora isso eu realmente acho que ela é uma das personagens mais populares mundialmente falando, quase todo mundo que ta na internet ou conhece a miku, ou conhece sem saber, já ouviu uma música, coisa assim. E não é atoa. Toda Miku é canon" },
                    { nome: "Goku", img: "https://a.storyblok.com/f/178900/960x540/d67d1aa19e/super-saiyan-goku.jpg", desc: "Goku é foda o resto é moda. Acho que todo mundo da mesma bolha que eu teve aquele momento da adolescencia onde 'dragon ball é coisa de criança' e quando consome a obra de verdade percebe que na verdade é ainda melhor do que lembrava" },
                    { nome: "Kiss-Shot Acerola-Orion Heart-Under-Blacde", img: "https://cdni.fancaps.net/file/fancaps-movieimages/5839658.jpg", desc: "Tirar a Shinobu daqui seria revisionismo histórico, talvez necessário, mas outra hora eu penso sobre isso, abraços Oikura Sodachi, apesar da matemética, não da pra competir", zoom: 1.5 },
                    { nome: "Solid Snake", img: "https://static.wikia.nocookie.net/metalgear/images/5/5d/Metal_Gear_Solid_256204.jpg", desc: "Eu sinto culpa de gostar do Snake, não sei se ele foi feito pra ser gostado, e como to incluindo todas as versões dele, o Venon Snake definitivamente não é um herói, mas aquela cena dele passando as cinzas na cara, ou o chifre dele crescendo, é bom demais" },
                    { nome: "Bocchi", img: "https://cdn-images.dzcdn.net/images/cover/ac55efc4ef57091a9c78df30e06e6869/0x1900-000000-80-0-0.jpg",zoom: 1.285 , desc: "Tirando o talento, ela é igualzinha a mim, aliás ela ta ocupando o espaço de todos os personagens de Keion, Lucky Star e derivados desses Slice of Life de Cute Girls Doing Cute Things que eu assisti MUITO quando era menorzinho." },
                    { nome: "Link", img: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/the-legend-of-zelda-breath-of-the-wild-2/3/38/Link2.png", desc: "Não sei exatamente por que eu gosto do Link, acho que é um amor ao jogo que acaba passando pro personagem, não, sei, só acho que faz muito sentido ele estar aqui." },
                    { nome: "Zelda", img: "/kissutina/midia/zeldarafa.png", desc: "E tudo isso que falei pro Link se aplica pra Zelda também...<br>Arte pelo meu amigo Rafa" },
                    { nome: "Hornet", img: "https://cdn.wikimg.net/en/hkwiki/images/5/57/SoSpromo1.jpg", desc: "Hornet, eu te esperei por tempo demais" },
                    { nome: "Luffy", img: "https://static.wikia.nocookie.net/onepiece/images/1/17/Monkey_D._Luffy%27s_Seventh_Wanted_Poster.png",zoom: 1.05, desc: "Pra mim o Luffy sempre foi mais um protagonista de Shonen, isso até o Gear 5. As palhaçadas do Nika me fizeram feliz durante as torturantes aulas de Cálculo 1" },
                    { nome: "Frieren", img: "/kissutina/midia/frieren.png", desc: "Eu realmente não sei se a Frieren merecia um espaço no meu top 10. Depois penso melhor nisso." }
                    ]
            },            {
                category: "Animes Favoritos",
                tipo: "padrao",
                items: [
                    { nome: "Sousou no Frieren", img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg", desc: "Um amigo meu falou 'Assite isso, é a sua cara', eu já tinha ouvido falar do anime, sabia que era bem popular mas deixei pra lá, mas esse amigo falou com tanta certeza que fiquei curioso, yep." },
                    { nome: "HunterXHunter", img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx11061-y5gsT1hoHuHw.png", desc: "Esse aqui eu tinha certeza que era maravilhoso, mas nunca tive um motivo pra realmente começar, quando um amigo meu falou que os 150 eps passavam rapidinho, dei uma chance, esse amigo é diferente do amigo de Frieren, mas os dois estavam certos." },
                    { nome: "Yuru Camp", img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx98444-Vzysp1EsrzgD.jpg", desc: "Essa é a animação mais importante da minha vida até hoje, quem tava comigo em 2018 sabe as loucuras que eu fiz."},
                    { nome: "Kaguya-sama", img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101921-ufrjLzhSz7L1.jpg", desc: "Não sou grande fã de romances, e eu nem sei dizer se isso aqui é um romance, mas eu sei que é bom" },
                    { nome: "Haikyuu!", img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113538-tHVE8j5mOPLu.jpg", desc: "Eu gosto de Haikyuu no nível que quando eu terminei de assisti, aprendi a jogar vôlei e tentei entrar num time de verdade." },
                    { nome: "A Place Further Than the Universe", img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx99426-ti5BL69Ip3kZ.png", desc: "Tal qual Haikyuu, eu tinha certeza que queria viajar pra Antartida e fazer pesquisas por lá, quase que eu escolho uma faculdade pensando só nisso." },
                    { nome: "Kimisui", img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx99750-pNyly9d3MEgV.jpg", desc: "Kimisui me ensinou que é bom estar vivo :)" },
                    { nome: "PSYCHO-PASS", img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx13601-i42VFuHpqEOJ.jpg", desc: "Só vi a primeria temporada, tô devendo resto, mas é bem legal" },
                    { nome: "Scott Pilgrim Takes Off", img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx170206-ZP4qAzx2I2oR.jpg", desc: "Eu ri bastante, muito bonitinho ver os bonecos animados, e esse estilo de arte me pega muito também."},
                    { nome: "O Serviço de Entregas da Kiki", img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx512-UwP8X4BR8YoM.png", desc: "Um sábado chuvoso, um café quente e uma tv com esse filme, é tudo que eu preciso" }
                    ]
            },{
                category: "Mangás Favoritos",
                tipo: "padrao",
                items: [
                    { nome: "One Piece", img: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30013-BeslEMqiPhlk.jpg", desc: "Leaim One Piece. 'ah mas tem 1000 caps', não importa, leia One Piece do começo ao fim, bom, do começo aos semanais." },
                    { nome: "Dragon Ball", img: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30042-4SetGiEbGc9x.jpg", desc: "Uma das melhores decisões da minha vida foi acordar e decidir que ia começar a ler Dragon Ball" },
                    { nome: "Fullmetal Alchemist", img: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30025-mpPVpCKFTowt.png", desc: "Não sei se é melhor que o anime, mas eu não queria repetir dois espaços então deixei só o mangá"},
                    { nome: "Keion", img: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx43001-yRE3yBmYoIrV.jpg", desc: "Outro da minha fase fã número um de slice of life" },
                    { nome: "Kizumonogatari", img: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx143701-JltoJEa9GLAS.jpg", desc: "Eu vi o primeiro filme, não aguentei esperar os próximos e li o material original, li na escola escondido ainda, já que não podia levar celular nem nada." }
                    ]
            },

            // --- NOVA CATEGORIA ESPECIAL (PREMIOS) ---
            {
                category: "Pokemon",
                tipo: "premios", // <--- AQUI ESTÁ O SEGREDO
                items: [
                    { 
                        premio: "Tipo Favorito",  // Título que aparece em cima
                        nome: "Água", 
                        img: "/kissutina/midia/agua.jpg",
                        zoom: 1.4,
                        desc: "..." 
                    },
                    { 
                        premio: "Pokemon Favorito", 
                        nome: "Piplup", 
                        img: "/kissutina/midia/piplup.png", 
                        desc: "..." 
                    },
                    { 
                        premio: "Forma Favorita", 
                        nome: "Mega Swampert", 
                        img: "/kissutina/midia/sw.png", 
                        desc: "..." 
                    },

                    { 
                        premio: "Jogo Favorito", 
                        nome: "Pokemon X (e Y)", 
                        img: "https://cdn2.steamgriddb.com/grid/13edec53dc35c6d975830902fbb4c3ec.png", 
                        desc: "..." 
                    }   ,                 { 
                        premio: "Treinador Favorito", 
                        nome: "Cynthia", 
                        zoom: 1.1   ,
                        img: "/kissutina/midia/cy.png", 
                        desc: "..." 
                    }
                ]
            },{
                category: "Mains",
                tipo: "premios", // <--- AQUI ESTÁ O SEGREDO
                items: [
                    { 
                        premio: "Stardew Valley",  // Título que aparece em cima
                        nome: "Abigail", 
                        img: "/kissutina/midia/abby.png",
                        desc: "..." 
                    },
                    { 
                        premio: "Mario Party / Kart", 
                        nome: "Rosalina", 
                        img: "https://mario.wiki.gallery/images/3/3e/Rosalina-Wave-MarioTennisUltraSmash.png", 
                        desc: "..." 
                    },
                    { 
                        premio: "Overwatch", 
                        nome: "D.VA", 
                        img: "https://cdn.oneesports.gg/cdn-data/2022/06/Overwatch_2_D.Va_.webp", 
                        desc: "..." 
                    },

                    { 
                        premio: "Street Fighter", 
                        nome: "Juri Han", 
                        img: "/kissutina/midia/juri.png", 
                        desc: "..." 
                    }   ,                 { 
                        premio: "Vocaloid", 
                        nome: "Kasane Teto",
                        img: "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/product/image/1136084/u6YAw8eUgBsRM5dGDCxWS0ktqJ7hLZQK.jpg", 
                        desc: "KKKKKKKKKKK Eu sei que a teto não é nem Vocaloid, e mesmo se fosse, deveria estar a miku aqui, mas deixa a teto merece o espaço dela." 
                    }
                ]
            },{
    category: "OSTs Favoritas",
    tipo: "youtube",
    items: [
        {
            nome: "Devil Trigger",
            link: "https://www.youtube.com/watch?v=eICijnr1k_I"
        },
        {
            nome: "Bury the Light",
            link: "https://www.youtube.com/watch?v=pvy9km7g6fw"
        },
        {
            nome: "A Beautiful Song",
            link: "https://www.youtube.com/watch?v=LDkVtoq5bIQ"
        },
        {
            nome: "Soul of Cinder",
            link: "https://www.youtube.com/watch?v=x0euNw-4YOo"
        },
        {
            nome: "Revived Power",
            link: "https://www.youtube.com/watch?v=iUjkBRKg2q0"
        },
        {
            nome: "Song of Storms",
            link: "https://www.youtube.com/watch?v=UtgHZaq0EGs"
        },
        {
            nome: "Gusty Garden Galaxy",
            link: "https://www.youtube.com/watch?v=VFLLUL9NEv0"
        },
        {
            nome: "Sins of the Father",
            link: "https://www.youtube.com/watch?v=y8VfziFZMGY"
        },
        {
            nome: "Spider Dance",
            link: "https://www.youtube.com/watch?v=NH-GAwLAO30"
        },
        {
            nome: "Dracula Castle",
            link: "https://www.youtube.com/watch?v=cyWTgLf-piE"
        }
    ]
}

// --- NOVA CATEGORIA DE MÚSICA ---

    ];

   const app = document.getElementById('app');


    data.forEach((group) => {
        const section = document.createElement('section');
        section.className = 'category-section';

        const header = document.createElement('div');
        header.className = 'category-header';
        header.innerHTML = `<h2 class="category-title">${group.category}</h2><span class="toggle-icon">▼</span>`;

        const grid = document.createElement('div');
        grid.className = 'grid-container';
        header.addEventListener('click', () => {
    grid.classList.toggle('hidden');
    header.querySelector('.toggle-icon').classList.toggle('icon-closed');
});
    

        group.items.forEach((item, index) => {
            
            // --- LÓGICA DO YOUTUBE ---
            if (group.tipo === 'youtube') {
    const card = document.createElement('div');
    card.className = 'video-card';

    card.innerHTML = `
        <div class="video-wrapper">
<iframe 
    src="${getEmbedLink(item.link)}"
    title="${item.nome}"
    frameborder="0"
    src="https://www.youtube.com/embed/pvy9km7g6fw"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
</iframe>

        </div>
        <p class="yt-caption">#${index + 1} - ${item.nome}</p>
    `;

    grid.appendChild(card);
}
            
            // --- LÓGICA PADRÃO (JOGOS/ANIMES) ---
            else {
                const card = document.createElement('div');
                card.className = 'card';
                
                const badgeHTML = group.tipo === 'premios' ? '' : `<div class="rank-badge">#${index + 1}</div>`;
                const zoomStyle = item.zoom ? `transform: scale(${item.zoom});` : '';

                card.innerHTML = `
                    <div class="card-inner">
                        <div class="card-front">
                            ${badgeHTML}
                            <img src="${item.img}" alt="${item.nome}" style="${zoomStyle}">
                            <div class="card-title-overlay">${item.nome}</div>
                        </div>
                        <div class="card-back">
                            <h3>${item.nome}</h3>
                            <p>${item.desc || ""}</p>
                        </div>
                    </div>
                `;
                
                if (group.tipo === 'premios') {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'award-wrapper';
                    wrapper.innerHTML = `<div class="award-label">${item.premio}</div>`;
                    wrapper.appendChild(card);
                    grid.appendChild(wrapper);
                } else {
                    grid.appendChild(card);
                }
            }
        });

        section.appendChild(header);
        section.appendChild(grid);
        app.appendChild(section);

    });
