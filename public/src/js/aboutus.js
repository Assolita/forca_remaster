// aboutus.js — Lê progresso do banco e aplica ao About Us

document.addEventListener('DOMContentLoaded', async () => {
  const modal = document.getElementById('modal');
  const modalName = document.getElementById('modal-nome');
  const modalDesc = document.getElementById('modal-desc');
  const closeBtn = document.querySelector('.close-modal');
  const modalBg = document.querySelector('.modal-bg');
  const teamMembers = Array.from(document.querySelectorAll('.team-member'));
  const discoverBtn = document.querySelector('.discover-btn');

  // ===============================================================
  // 1) Função para buscar progresso do banco
  // ===============================================================

  async function fetchCampaignProgress() {
    const token = localStorage.getItem("token");
    if (!token) return [];

    try {
      const res = await fetch("/api/campaign", {
        headers: { "Authorization": "Bearer " + token }
      });

      if (!res.ok) return [];
      const data = await res.json();
      return data.completedWords || [];
    } catch (err) {
      console.error("Erro ao buscar progresso:", err);
      return [];
    }
  }

  // helper: pega todos os wordIndex concluídos de um integrante
  function completedWordsForPerson(progress, personId) {
    return progress
      .filter(x => x.personId === personId)
      .map(x => x.wordIndex);
  }

  // ===============================================================
  // 2) Aplicar estilo .completed nos integrantes já finalizados
  // ===============================================================

  function aplicarCompleted(teamMembers, progress) {
    teamMembers.forEach(member => {
      const id = Number(member.dataset.id);
      const completed = completedWordsForPerson(progress, id);

      if (completed.length >= 3) {
        member.classList.add("completed");
      }
    });
  }

  // ===============================================================
  // 3) Modal (mesma lógica que você já tinha)
  // ===============================================================

  teamMembers.forEach(member => {
    member.addEventListener('click', () => {
      const nome = member.dataset.name || "Integrante";
      modalName.textContent = nome;

      if (member.classList.contains("completed")) {
        modalDesc.textContent =
          "Você já concluiu o desafio deste integrante na campanha!";
      } else {
        modalDesc.textContent =
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula justo sed ligula molestie.";
      }

      modal.classList.add('active');
    });
  });

  function fecharModal() {
    modal.classList.remove('active');
  }

  closeBtn.addEventListener('click', fecharModal);
  modalBg.addEventListener('click', fecharModal);

  // ===============================================================
  // 4) Botão discover us! → sortear integrante + palavra pendente
  // ===============================================================

  function sortearIntegranteEPalavra(progress) {
    // Agrupar progresso por personId
    const perPerson = {};
    progress.forEach(entry => {
      if (!perPerson[entry.personId]) {
        perPerson[entry.personId] = new Set();
      }
      perPerson[entry.personId].add(entry.wordIndex);
    });

    // pegar IDs dos membros (1..10) com pendências
    const pendentes = teamMembers
      .map(m => Number(m.dataset.id))
      .filter(id => {
        const set = perPerson[id];
        return !set || set.size < 3;
      });

    if (pendentes.length === 0) {
      alert("Você já concluiu a campanha de todos os integrantes! 🎉");
      return null;
    }

    // sorteia integrante
    const personId = pendentes[Math.floor(Math.random() * pendentes.length)];

    const set = perPerson[personId] || new Set();
    const possiveisWordIndex = [1, 2, 3].filter(i => !set.has(i));

    // sorteia palavra pendente
    const wordIndex =
      possiveisWordIndex[
        Math.floor(Math.random() * possiveisWordIndex.length)
      ];

    return { personId, wordIndex };
  }

  if (discoverBtn) {
    discoverBtn.addEventListener("click", async () => {
      const progress = await fetchCampaignProgress();

      const sorteio = sortearIntegranteEPalavra(progress);
      if (!sorteio) return;

      const { personId, wordIndex } = sorteio;

      window.location.href =
        `single.html?personId=${personId}&wordIndex=${wordIndex}`;
    });
  }

  // ===============================================================
  // 5) Executar carregamento inicial
  // ===============================================================

  const progress = await fetchCampaignProgress();
  aplicarCompleted(teamMembers, progress);
});
