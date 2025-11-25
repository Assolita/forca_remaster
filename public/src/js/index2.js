console.log("index2.js carregado");

function navegarComBuracoNegro(url) {
    console.log("Iniciando animação para:", url);
    
    // adiciona a classe que faz o body encolher e borrar
    document.body.classList.add("blackhole-out");

    // espera a animação acabar (1s no CSS) e só então navega
    setTimeout(() => {
        console.log("Redirecionando para:", url);
        window.location.href = url;
    }, 1000); // 1000ms = 1s (igual ao transition do CSS)
}

const btnCadastro = document.getElementById("btnCadastro");
const btnLogin    = document.getElementById("btnLogin");

if (btnCadastro) {
    btnCadastro.addEventListener("click", (e) => {
        e.preventDefault(); // garante que nada default atrapalhe
        navegarComBuracoNegro("/cadastro.html"); // ajuste a rota conforme seu backend
    });
}

if (btnLogin) {
    btnLogin.addEventListener("click", (e) => {
        e.preventDefault();
        navegarComBuracoNegro("/login.html"); // ajuste a rota conforme seu backend
    });
}
