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

    var unidade = document.getElementById("unidade").value; // Obter o valor da unidade
    var errorMessage = document.getElementById("error-message"); // Área da mensagem de erro

    // Verificar se a Unidade já existe na planilha
    fetch(`https://script.google.com/macros/s/AKfycbxe7_WXExBKw9CllC325pdYEGOucKTKRspYPGpI5iF92p_ztr3vuC6mJv2opbXcIRQC/exec?unidade=${unidade}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === "exists") {
                // Se a Unidade já existe, exibe uma mensagem de erro
                errorMessage.style.display = "block";
            } else {
                // Se a Unidade não existe, prossegue com o envio do formulário
                errorMessage.style.display = "none";
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
            }
        })
        .catch(function(error) {
            console.error("Erro ao verificar duplicidade:", error);
        });
});
