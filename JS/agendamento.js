const formulario = document.querySelector("form");

const Inome = document.querySelector(".nome");
const Iemail = document.querySelector(".email");
const Itelefone = document.querySelector(".telefone");
const Idata = document.querySelector(".data");


function mostrarAviso(mensagem) {
    const aviso = document.createElement("div");
    aviso.textContent = mensagem;
    aviso.style.position = "fixed";
    aviso.style.top = "30px";
    aviso.style.left = "50%";
    aviso.style.transform = "translateX(-50%)";
    aviso.style.background = "#2e7d32";
    aviso.style.color = "#fff";
    aviso.style.padding = "18px 32px";
    aviso.style.borderRadius = "16px";
    aviso.style.boxShadow = "0 2px 12px rgba(46,125,50,0.18)";
    aviso.style.zIndex = "9999";
    aviso.style.fontSize = "1.1rem";
    aviso.style.textAlign = "center";
    aviso.style.transition = "box-shadow 0.4s, transform 0.4s";
    aviso.style.animation = "baloonAnim 1.2s infinite alternate";
    document.body.appendChild(aviso);

    // Adiciona a animação via CSS
    const style = document.createElement("style");
    style.textContent = `
        @keyframes baloonAnim {
            0% { box-shadow: 0 2px 12px rgba(46,125,50,0.18); transform: translateX(-50%) scale(1); }
            50% { box-shadow: 0 8px 24px rgba(46,125,50,0.28); transform: translateX(-50%) scale(1.05); }
            100% { box-shadow: 0 2px 12px rgba(46,125,50,0.18); transform: translateX(-50%) scale(1); }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        aviso.remove();
        style.remove();
    }, 4000);
}

function cadastrarAgendamento(){

    fetch("/http://localhost:8080/agendamentos",
        {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body :JSON.stringify({
                nome:Inome.value,
                email:Iemail.value,
                telephone:Itelefone.value,
                data_agendamento:Idata.value
            })
        })
        .then(function(res){
            console.log(res);
            mostrarAviso("Agendamento cadastrado com sucesso!");
        })
        .catch(function(res){
            console.log(res);
            mostrarAviso("Erro ao cadastrar agendamento.");
        });

};

function limpar (){
    Inome.value = "";
    Iemail.value = "";
    Itelefone.value = "";
    Idata.value = "";
}

formulario.addEventListener('submit', function(event){
    event.preventDefault();

    cadastrarAgendamento();
    limpar();
    

});