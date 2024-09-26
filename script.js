// Função para esconder ou mostrar o campo de faltas
function toggleFaltas() {
    var checkBox = document.getElementById("nao-sei");
    var campoFaltas = document.getElementById("campo-faltas");
    
    // Se o checkbox estiver marcado, esconda o campo de faltas
    if (checkBox.checked == true) {
        campoFaltas.classList.add("hidden");
    } else {
        campoFaltas.classList.remove("hidden");
    }
}

// Função para mostrar o modal de sucesso após o envio do formulário
document.getElementById("meuFormulario").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir o envio padrão do formulário

    var form = document.getElementById("meuFormulario");
    var formData = new FormData(form);

    fetch(form.action, {
        method: "POST",
        body: formData,
        mode: "no-cors" // Para evitar problemas de CORS
    })
    .then(function() {
        var modal = new bootstrap.Modal(document.getElementById("successModal"));
        modal.show(); // Mostrar o modal de sucesso
        form.reset(); // Resetar o formulário após o envio
    })
    .catch(function(error) {
        console.error("Erro ao enviar dados:", error);
    });
});
