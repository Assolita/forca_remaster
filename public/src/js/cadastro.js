// public/src/js/cadastro.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Encontra o formulário e a mensagem de erro
    const formCadastro = document.getElementById('form-cadastro');
    const mensagemErro = document.getElementById('mensagem-erro');

    // ATENÇÃO: Verifique se esta URL do backend ainda é a correta na sua aba "PORTAS"
    // const BACKEND_URL = 'https://upgraded-space-umbrella-pj7jgrj7g755h66q-3000.app.github.dev';

    if (formCadastro) {
        formCadastro.addEventListener('submit', async (event) => {
            event.preventDefault(); // Impede o recarregamento da página

            // 2. Pega os valores dos inputs (pelos 'name's que adicionamos)
            const username = event.target.username.value;
            const email = event.target.email.value;
            const password = event.target.password.value;
            
            console.log("Frontend: Enviando dados de cadastro...");
            if (mensagemErro) mensagemErro.textContent = ''; // Limpa erros antigos

            

            let erros = [];

            if (username.length < 3) {
                erros.push("O nome de usuário deve ter pelo menos 3 caracteres.");
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                erros.push("Por favor, insira um e-mail válido.");
            }

            if (password.length < 6) {
                erros.push("A senha deve ter pelo menos 6 caracteres.");
            }

            // Se houver erros, exibe e interrompe
            if (erros.length > 0) {
                if (mensagemErro) {
                    mensagemErro.textContent = erros.join(" ");
                } else {
                    alert(erros.join("\n"));
                }
                return; // Não envia para o backend
            }


            try {
                // 3. Faz o 'fetch' para o novo endpoint
                
                const response = await fetch(`api/players/register`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ username, email, password })

                });

                const resultado = await response.json();

                if (!response.ok) { // Se a resposta for 400 ou 500
                    throw new Error(resultado.message);
                }
                
                // 4. SUCESSO!
                console.log("Cadastro bem-sucedido:", resultado);
                alert("Cadastro realizado com sucesso! Redirecionando para o login.");
                window.location.href = 'login.html'; // Redireciona para o login

            } catch (error) {
                console.error("Falha no cadastro:", error.message);
                if (mensagemErro) {
                    mensagemErro.textContent = error.message;
                } else {
                    alert(`Erro: ${error.message}`);
                }
            }
        });
    } else {
        console.error("Erro: <form id='form-cadastro'> não foi encontrado.");
    }
});
