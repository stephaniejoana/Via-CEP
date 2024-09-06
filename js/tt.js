document.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        buscarCep();
    }
});

function buscarCep() {
    const cep = document.getElementById("cep").value.trim();
    if (cep === '') {
        alert("Por favor, insira um CEP válido.");
        return;
    }
    fetchDadosCep(cep);
}

async function fetchDadosCep(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await response.json();
        if (dados.erro) {
            alert("CEP não encontrado.");
            return;
        }
        exibirDados(dados);
    } catch (error) {
        alert("Ocorreu um erro ao buscar o CEP. Tente novamente.");
        console.error("Erro ao buscar o CEP:", error);
    }
}

function exibirDados(dados) {
    document.getElementById("logradouro").value = dados.logradouro || '';
    document.getElementById("bairro").value = dados.bairro || '';
    document.getElementById("cidade").value = dados.localidade || '';
    document.getElementById("estado").value = dados.uf || '';
}

function limparCampos() {
    document.querySelectorAll("input[type='text']").forEach(input => input.value = '');
}
