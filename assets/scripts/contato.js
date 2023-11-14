btnSubmit.addEventListener("click", (e) => {
    e.preventDefault(); // Evita que o formulário seja enviado, já que estamos tratando o clique manualmente

    var inputNome = document.getElementById("nome");
    var inputEmail = document.getElementById("email");
    var mensagemContato = document.getElementById("mensagem-contato");

    // Verificar se os campos estão vazios
    if (inputNome.value === "" || inputEmail.value === "") {
        mensagemContato.innerHTML = "&#9888; Campo nome e e-mail obrigatórios, por favor preencha. &#9888;";
        mensagemContato.style.color = "#fff"; // Define a cor da mensagem
    } else {
        mensagemContato.innerHTML = "Obrigado pelo seu interesse em nossa plataforma! Entraremos em contato. &#10004;";
        mensagemContato.style.color = "#fff"; // Define a cor da mensagem
    }
});
