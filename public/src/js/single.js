// single.js — Modo campanha com 3 palavras por integrante (salva no banco)



// -----------------------------------------------------------------------------
// CONFIGURAÇÃO DOS 10 INTEGRANTES — 3 palavras e 3 dicas cada (placeholders)
// -----------------------------------------------------------------------------

const PERSONS = [
  {
    id: 1,
    nome: "Membro 1",
    imagem: "/public/assets/images/user1.png",
    palavras: [
      {
        termo: "ALGA",
        dicas: [
          "Planta marinha muito comum.",
          "Pode ser verde ou marrom.",
          "Está presente em diversos ambientes aquáticos."
        ]
      },
      {
        termo: "CORAL",
        dicas: [
          "Forma belas estruturas no fundo do mar.",
          "Vive em colônias.",
          "Muito presente em recifes tropicais."
        ]
      },
      {
        termo: "BOLHAS",
        dicas: [
          "Sempre sobem à superfície.",
          "Associadas à água ou sabão.",
          "Objeto visual recorrente do seu jogo."
        ]
      }
    ]
  },

  {
    id: 2,
    nome: "Membro 2",
    imagem: "/public/assets/images/user2.png",
    palavras: [
      { termo: "CODIGO", dicas: ["Conjunto de instruções.", "Base de qualquer software.", "Algo que todo programador cria."] },
      { termo: "DEV", dicas: ["Profissão do futuro.", "Resolve problemas lógicos.", "Termo curto e comum."] },
      { termo: "GIT", dicas: ["Ferramenta de versionamento.", "Muito usada no GitHub.", "Ajuda equipes inteiras a colaborar."] }
    ]
  },

  {
    id: 3,
    nome: "Membro 3",
    imagem: "/public/assets/images/user3.png",
    palavras: [
      { termo: "MAR", dicas: ["Extremamente azul.", "Cobre grande parte do planeta.", "Casa de diversos animais."] },
      { termo: "PEIXE", dicas: ["Animal aquático.", "Respira por brânquias.", "Pode ser encontrado em rios e mares."] },
      { termo: "SEREIA", dicas: ["Criatura mitológica.", "Meio humana, meio peixe.", "Popular em lendas."] }
    ]
  },

  {
    id: 4,
    nome: "Membro 4",
    imagem: "/public/assets/images/user4.png",
    palavras: [
      { termo: "AREIA", dicas: ["Presente na praia.", "Muito fina e clara.", "Usada para construir castelos."] },
      { termo: "CONCHA", dicas: ["Objeto encontrado no mar.", "Pode gerar som curioso.", "Usado como lembrança de praia."] },
      { termo: "MARISCO", dicas: ["Alimento do mar.", "Tem casca dura.", "Muito usado na culinária."] }
    ]
  },

  {
    id: 5,
    nome: "Membro 5",
    imagem: "/public/assets/images/user5.png",
    palavras: [
      { termo: "NAVIO", dicas: ["Veículo marítimo.", "Pode transportar cargas.", "Também usado em cruzeiros."] },
      { termo: "VELA", dicas: ["Usada para navegar.", "Pode ser branca.", "Captura o vento."] },
      { termo: "RUMO", dicas: ["Direção que segue o navio.", "Algo que se traça antes de partir.", "Relacionado a navegação."] }
    ]
  },

  {
    id: 6,
    nome: "Membro 6",
    imagem: "/public/assets/images/user6.png",
    palavras: [
      { termo: "ILHA", dicas: ["Cercada por água.", "Pode ser tropical.", "Habitada ou deserta."] },
      { termo: "FAROIS", dicas: ["Guia para embarcações.", "Emite luz forte.", "Fica próximo ao mar."] },
      { termo: "TEMPESTADE", dicas: ["Vento forte.", "Relâmpagos.", "Freqüente em mares turbulentos."] }
    ]
  },

  {
    id: 7,
    nome: "Membro 7",
    imagem: "/public/assets/images/user7.png",
    palavras: [
      { termo: "TUBARAO", dicas: ["Animal marinho.", "Grande predador.", "Famoso em filmes."] },
      { termo: "GAIVOTA", dicas: ["Ave da praia.", "Branca e cinza.", "Adora peixes."] },
      { termo: "POLVO", dicas: ["Tem oito braços.", "Inteligente.", "Solta tinta."] }
    ]
  },

  {
    id: 8,
    nome: "Membro 8",
    imagem: "/public/assets/images/user8.png",
    palavras: [
      { termo: "NEBLINA", dicas: ["Diminui a visão.", "Comum no mar cedo.", "Branca e densa."] },
      { termo: "MARUJO", dicas: ["Vive no mar.", "Tripulante do navio.", "Veterano de tempestades."] },
      { termo: "ANCORA", dicas: ["Prende o navio.", "Pesada e metálica.", "Joga-se ao mar."] }
    ]
  },

  {
    id: 9,
    nome: "Membro 9",
    imagem: "/public/assets/images/user9.png",
    palavras: [
      { termo: "PIRATA", dicas: ["Vive no mar.", "Procura tesouros.", "Tapa no olho."] },
      { termo: "TESOURO", dicas: ["Cofre valioso.", "Enterrado em ilhas.", "Muito cobiçado."] },
      { termo: "MAPA", dicas: ["Guia caminhos.", "Mostra ilhas.", "Essencial para piratas."] }
    ]
  },

  {
    id: 10,
    nome: "Membro 10",
    imagem: "/public/assets/images/user10.png",
    palavras: [
      { termo: "PEROLA", dicas: ["Encontrada em ostras.", "Rara e brilhante.", "Usada em joias."] },
      { termo: "OSTRA", dicas: ["Mollusco marinho.", "Casca dura.", "Pode conter pérolas."] },
      { termo: "MARFIM", dicas: ["Material nobre.", "Relacionado ao mar por comércio.", "Muito caro historicamente."] }
    ]
  }
];

// -----------------------------------------------------------------------------
// VARIÁVEIS DO JOGO
// -----------------------------------------------------------------------------

const MAX_LIVES = 5;

let campaignCompletedWords = [];
let currentPerson = null;
let currentWordIndex = 1;
let secretWord = "";
let revealed = [];
let usedLetters = new Set();
let lives = MAX_LIVES;
let currentHints = [];
let hintIndex = 0;

// -----------------------------------------------------------------------------
// FUNÇÕES DE API — BUSCAR E SALVAR PROGRESSO NO BANCO
// -----------------------------------------------------------------------------






async function fetchCampaignProgress() {
  const token = localStorage.getItem("token");
  if (!token) return [];

  try {
    const res = await fetch("/api/campaign", {
      headers: { Authorization: "Bearer " + token }
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.completedWords || [];
  } catch (err) {
    console.error("Erro ao buscar progresso:", err);
    return [];
  }
}

async function fetchUserInfo() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const base64Payload = token.split(".")[1];        // Parte do meio do JWT
    const jsonPayload = atob(base64Payload);          // Decodifica base64
    return JSON.parse(jsonPayload);                   // { id, nome }
  } catch (err) {
    console.error("Erro ao decodificar token:", err);
    return null;
  }
}


async function salvarProgressoNoBanco() {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    await fetch("/api/campaign/complete-word", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        personId: currentPerson.id,
        wordIndex: currentWordIndex
      })
      
    });
    await atualizarProgresso();
  } catch (err) {
    console.error("Erro ao salvar progresso:", err);
  }
}


async function atualizarProgresso() {
  const token = localStorage.getItem("token");
  if (!token) return;

  const res = await fetch("/api/campaign", {
    headers: { "Authorization": "Bearer " + token }
  });

  if (!res.ok) return;
  const campaign = await res.json();
  
  const completadas = campaign.completedWords || [];

// ----- PROGRESSO DE PALAVRAS DO INTEGRANTE ATUAL -----
  const personId = currentPerson?.id;

  let concluidasDeste = [];
  if (personId) {
    concluidasDeste = completadas.filter(p => p.personId === personId);
  }

  const palavrasConcluidas = concluidasDeste.length; // 0 a 3

  document.getElementById("progress-words-count").textContent =
    `${palavrasConcluidas} / 3`;

  document.getElementById("progress-words-bar-inner").style.width =
    `${(palavrasConcluidas / 3) * 100}%`;


  // ----- PROGRESSO TOTAL DA CAMPANHA -----
  // Um integrante é considerado concluído se concluiu as 3 palavras
  const integrantesConcluidos = new Set(
    completadas.filter(p => p.wordIndex >= 1 && p.wordIndex <= 3)
               .map(p => p.personId)
  ).size;

  document.getElementById("progress-count").textContent = `${integrantesConcluidos} / 10`;

  const barInner = document.getElementById("progress-bar-inner");
  barInner.style.width = `${(integrantesConcluidos / 10) * 100}%`;
}



// -----------------------------------------------------------------------------
// SORTEIO DO INTEGRANTE + PALAVRA (1..3) PENDENTE
// -----------------------------------------------------------------------------

function getCompletedForPerson(personId) {
  return campaignCompletedWords
    .filter(w => w.personId === personId)
    .map(w => w.wordIndex);
}

function pickPersonAndWord() {
  const params = new URLSearchParams(window.location.search);
  const urlPersonId = params.get("personId");
  const urlWordIndex = params.get("wordIndex");

  const allPersons = PERSONS;

  const pendingPersons = allPersons.filter(p => {
    const completed = new Set(getCompletedForPerson(p.id));
    return completed.size < 3;
  });

  if (pendingPersons.length === 0) {
    currentPerson = null;
    return;
  }

  let person = null;
  let wordIndex = null;

  if (urlPersonId) {
    const id = Number(urlPersonId);
    const candidate = allPersons.find(p => p.id === id);

    if (candidate) {
      const completed = new Set(getCompletedForPerson(candidate.id));
      if (completed.size < 3) {
        person = candidate;

        if (urlWordIndex) {
          const w = Number(urlWordIndex);
          if (w >= 1 && w <= 3 && !completed.has(w)) {
            wordIndex = w;
          }
        }

        if (!wordIndex) {
          const possibles = [1, 2, 3].filter(i => !completed.has(i));
          wordIndex = possibles[Math.floor(Math.random() * possibles.length)];
        }
      }
    }
  }

  if (!person || !wordIndex) {
    person = pendingPersons[Math.floor(Math.random() * pendingPersons.length)];
    const completed = new Set(getCompletedForPerson(person.id));
    const possibles = [1, 2, 3].filter(i => !completed.has(i));
    wordIndex = possibles[Math.floor(Math.random() * possibles.length)];
  }

  currentPerson = person;
  currentWordIndex = wordIndex;
}

// -----------------------------------------------------------------------------
// DOM ELEMENTS
// -----------------------------------------------------------------------------

const personNameEl = document.getElementById("person-name");
const personAvatarEl = document.getElementById("person-avatar");
const wordDisplayEl = document.getElementById("word-display");
const livesEl = document.getElementById("lives");
const hintBtn = document.getElementById("hint-btn");
const hintTextEl = document.getElementById("hint-text");
const keyboardEl = document.getElementById("keyboard");
const guessWordBtn = document.getElementById("guess-word-btn");
const backBtn = document.getElementById("back-btn");

const overlayEl = document.getElementById("result-overlay");
const resultTitleEl = document.getElementById("result-title");
const resultMessageEl = document.getElementById("result-message");
const playAgainBtn = document.getElementById("play-again-btn");
const goAboutBtn = document.getElementById("go-about-btn");

const progressCountEl = document.getElementById("progress-count");
const progressBarInnerEl = document.getElementById("progress-bar-inner");

// -----------------------------------------------------------------------------
// INICIALIZAÇÃO DO JOGO
// -----------------------------------------------------------------------------


function updateProgressBar() {
  const uniquePersons = new Map();
  campaignCompletedWords.forEach(row => {
    if (!uniquePersons.has(row.personId))
      uniquePersons.set(row.personId, new Set());
    uniquePersons.get(row.personId).add(row.wordIndex);
  });

  let completedPersons = 0;
  uniquePersons.forEach(set => {
    if (set.size >= 3) completedPersons++;
  });

  const total = PERSONS.length;
  progressCountEl.textContent = `${completedPersons} / ${total}`;
  progressBarInnerEl.style.width = `${(completedPersons / total) * 100}%`;
}

function initGame(userInfo) {
  if (!currentPerson) {
    showResultOverlay(
      "Campanha concluída! 🎉",
      "Você já completou todas as palavras de todos os integrantes."
    );
    return;
  }

  const palavraObj = currentPerson.palavras[currentWordIndex - 1];
  secretWord = palavraObj.termo.toUpperCase();
  currentHints = palavraObj.dicas || [];

  revealed = secretWord.split("").map(ch => (ch === " " ? " " : "_"));
  usedLetters.clear();
  lives = MAX_LIVES;
  hintIndex = 0;

  personNameEl.textContent = currentPerson.nome;
  personAvatarEl.src = currentPerson.imagem;
  document.getElementById("progress-words-label").textContent =
  `Palavras  de  ${currentPerson.nome}`;

  document.getElementById("progress-campaign-label").textContent =
  `Campanha  de  ${userInfo?.nome}`;

  document.getElementById("leroelero").innerHTML =
  `Tente adivinhar a palavra do  <span class="player-name-glow">${currentPerson.nome}</span>`;
  hintTextEl.textContent = "Use as letras para descobrir a palavra.";

  updateWordDisplay();
  renderLives();
  renderKeyboard();
  updateProgressBar();
}


// -----------------------------------------------------------------------------
// FUNÇÕES DE RENDERIZAÇÃO
// -----------------------------------------------------------------------------

function updateWordDisplay() {
  wordDisplayEl.textContent = revealed.join(" ");
}

function renderLives() {
  livesEl.innerHTML = "";
  for (let i = 0; i < MAX_LIVES; i++) {
    const heart = document.createElement("span");
    heart.classList.add("life-heart");
    if (i >= lives) heart.classList.add("lost");
    livesEl.appendChild(heart);
  }
}

// function renderKeyboard() {
//   keyboardEl.innerHTML = "";
//   const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
//   letters.forEach(letter => {
//     const btn = document.createElement("button");
//     btn.classList.add("key-btn");
//     btn.textContent = letter;

//     if (usedLetters.has(letter)) {
//       btn.disabled = true;
//       btn.classList.add("key-used");
//     }

//     btn.addEventListener("click", () => handleLetter(letter));
//     keyboardEl.appendChild(btn);
//   });
// }

function renderKeyboard() {
  const rows = {
    1: document.getElementById("row-1"),
    2: document.getElementById("row-2"),
    3: document.getElementById("row-3"),
    4: document.getElementById("row-4")
  };

  Object.values(rows).forEach(r => r.innerHTML = "");

  const layout = [
    "ABCDEFGHIJ",
    "KLMNOPQRST",
    "UVWXYZ",
    "-Ç"
  ];

  layout.forEach((stringRow, index) => {
    const rowEl = rows[index + 1];

    stringRow.split("").forEach(letter => {
      const btn = document.createElement("button");
      btn.classList.add("tecla");
      btn.textContent = letter;

      if (usedLetters.has(letter)) {
        btn.disabled = true;
        btn.classList.add("key-used");
      }

      btn.addEventListener("click", () => handleLetter(letter));

      rowEl.appendChild(btn);
    });
  });
}





// -----------------------------------------------------------------------------
// FUNCIONALIDADE DO TECLADO
// -----------------------------------------------------------------------------

function handleLetter(letter) {
  if (usedLetters.has(letter)) return;

  usedLetters.add(letter);

  const indices = [];
  for (let i = 0; i < secretWord.length; i++) {
    if (secretWord[i] === letter) indices.push(i);
  }

  if (indices.length === 0) {
    lives--;
    renderLives();
    if (lives <= 0) onLose();
  } else {
    indices.forEach(i => (revealed[i] = letter));
    updateWordDisplay();

    if (!revealed.includes("_")) onWin();
  }

  renderKeyboard();
}

// -----------------------------------------------------------------------------
// DICA
// -----------------------------------------------------------------------------

function showNextHint() {
  if (hintIndex >= currentHints.length) return;

  hintTextEl.textContent = currentHints[hintIndex];
  hintIndex++;

  if (hintIndex >= currentHints.length) {
    hintBtn.disabled = true;
  }
}

// -----------------------------------------------------------------------------
// CHUTE DA PALAVRA
// -----------------------------------------------------------------------------

function askGuessFullWord() {
  const guess = prompt("Qual é a palavra completa?");
  if (!guess) return;

  if (guess.trim().toUpperCase() === secretWord) onWin();
  else {
    lives--;
    renderLives();
    if (lives <= 0) onLose();
  }
}

// -----------------------------------------------------------------------------
// RESULTADO
// -----------------------------------------------------------------------------

function onWin() {
  salvarProgressoNoBanco();
  showResultOverlay(
    "Acertou! 🎉",
    `Você descobriu um dos segredos de ${currentPerson.nome}! Continue descobrindo😋🤤`
  );
}

function onLose() {
  showResultOverlay(
    "Fim de jogo! 😢",
    `Bom trabalho, você enforcou ${currentPerson.nome}!🪢`
  );
}


function showResultOverlay(title, message) {
  resultTitleEl.textContent = title;
  resultMessageEl.textContent = message;
  overlayEl.classList.remove("hidden");
}

// -----------------------------------------------------------------------------
// EVENT LISTENERS
// -----------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", async () => {
  const userInfo = await fetchUserInfo();

  campaignCompletedWords = await fetchCampaignProgress();
  
  pickPersonAndWord();
  initGame(userInfo);   // <-- agora recebe o usuário
  atualizarProgresso();

  hintBtn.addEventListener("click", showNextHint);
  guessWordBtn.addEventListener("click", askGuessFullWord);
  backBtn.addEventListener("click", () => (window.location.href = "aboutus.html"));
  goAboutBtn.addEventListener("click", () => (window.location.href = "aboutus.html"));

  document.addEventListener("keydown", e => {
    const letter = e.key.toUpperCase();
    if (letter >= "A" && letter <= "Z") handleLetter(letter);
  });


});
