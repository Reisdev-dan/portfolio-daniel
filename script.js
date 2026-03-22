// Aguarda o carregamento completo do HTML antes de executar o script
document.addEventListener("DOMContentLoaded", () => {
    
    /* ===================================================
       1. LÓGICA DO MENU MOBILE (Hambúrguer)
       =================================================== */
    const menuToggle = document.getElementById("menuToggle");
    const menuPrincipal = document.getElementById("menuPrincipal");

    if (menuToggle && menuPrincipal) {
        menuToggle.addEventListener("click", () => {
            menuPrincipal.classList.toggle("ativo");
        });
    }

    /* ===================================================
       2. LÓGICA DO FORMULÁRIO DE CONTATO
       =================================================== */
    const formContato = document.getElementById("formContato");
    const mensagemAlerta = document.getElementById("mensagemAlerta");

    // TRAVA DE SEGURANÇA: Só roda esse código se o formulário existir na página
    if (formContato) {
        formContato.addEventListener("submit", function(event) {
            event.preventDefault();

            const nome = document.getElementById("nome").value.trim();
            const email = document.getElementById("email").value.trim();
            const mensagem = document.getElementById("mensagem").value.trim();

            if (nome === "" || email === "" || mensagem === "") {
                exibirAlerta("Por favor, preencha todos os campos obrigatórios.", "erro");
                return; 
            }

            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(email)) {
                exibirAlerta("Por favor, insira um endereço de e-mail válido (ex: usuario@dominio.com).", "erro");
                return; 
            }

            exibirAlerta(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`, "sucesso");
            formContato.reset();
        });

        function exibirAlerta(texto, tipo) {
            mensagemAlerta.textContent = texto;
            mensagemAlerta.style.display = "block"; 

            if (tipo === "sucesso") {
                mensagemAlerta.style.backgroundColor = "#d1fae5"; 
                mensagemAlerta.style.color = "#065f46"; 
                mensagemAlerta.style.border = "1px solid #34d399";
            } else {
                mensagemAlerta.style.backgroundColor = "#fee2e2"; 
                mensagemAlerta.style.color = "#991b1b"; 
                mensagemAlerta.style.border = "1px solid #f87171";
            }

            setTimeout(() => {
                mensagemAlerta.style.display = "none";
            }, 5000);
        }
    } // Fim da trava de segurança do formulário

    /* ===================================================
       3. LÓGICA DO TEMA CLARO/ESCURO (Dark Mode)
       =================================================== */
    const btnTema = document.getElementById("btnTema");
    const body = document.body;
    
    const temaSalvo = localStorage.getItem("tema_portfolio");

    // Aplica o tema imediatamente se já estiver salvo
    if (temaSalvo === "escuro") {
        body.classList.add("dark-mode");
        if (btnTema) {
            btnTema.textContent = "☀️"; // Ícone de sol
        }
    }

    // Ação do clique no botão
    if (btnTema) {
        btnTema.addEventListener("click", () => {
            body.classList.toggle("dark-mode");

            if (body.classList.contains("dark-mode")) {
                localStorage.setItem("tema_portfolio", "escuro"); 
                btnTema.textContent = "☀️"; 
            } else {
                localStorage.setItem("tema_portfolio", "claro"); 
                btnTema.textContent = "🌙"; 
            }
        });
    }

}); 