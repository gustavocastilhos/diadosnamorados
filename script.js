//Vou adicionar varias descrição para quem estiver interesado no que cada coisa faz!

//selecionando os elementos que vamos manipular
const caixaContrato = document.getElementById('caixa-contrato');
const checkboxAceito = document.getElementById('aceito-termos');
const btnProsseguir = document.getElementById('btn-prosseguir');

//escuta o evento de scroll (a rolagem) na caixa do contrato
// o () => é uma função anônima, ou seja, uma função sem nome que é executada quando o evento acontece)
caixaContrato.addEventListener('scroll', () => {
    const alturaTotalTexto = caixaContrato.scrollHeight; //tamanho total do texto interno
    const topoRolagem = caixaContrato.scrollTop;       // o quanto o usuário já rolou para baixo
    const alturaVisivelCaixa = caixaContrato.clientHeight; // o tamanho da caixinha na tela

    // se a rolagem atual + o espaço visível chegar no fundo do texto...
    // dexamos uma margem de 5 pixels para evitar bugs de arredondamento de navegadores(ouvi dizer que isso pode acontecer)
    if (topoRolagem + alturaVisivelCaixa >= alturaTotalTexto - 5) {
        //remove o atributo 'disabled' (desabilitado) do checkbox para a pessoa poder marcar que leu o contrato
        checkboxAceito.removeAttribute('disabled');
    }
});

//escutar quando o usuário marca/desmarca o checkbox
// ja expliquei oq é o () =>, nesse caso basicamente é uma função que roda toda vez que o estado do checkbox muda (marcado ou desmarcado)
checkboxAceito.addEventListener('change', () => { 
    if (checkboxAceito.checked) {
        // Se marcou, libera o botão de prosseguir
        btnProsseguir.removeAttribute('disabled');
    } else {
        // Se desmarcou, bloqueia de novo
        btnProsseguir.setAttribute('disabled', 'true');
    }
});

//logica da pegadinha do clique hehe
let contadorDeCliques = 0; // Variável que guarda em qual etapa estamos

//pegando os elementos novos do HTML
const caixaDeAviso = document.getElementById('caixa-confirmacao');
const textoCaixa = document.getElementById('texto-caixa');
const btnSim = document.getElementById('btn-sim');
const btnNao = document.getElementById('btn-nao');

btnProsseguir.addEventListener('click', () => {
    if (checkboxAceito.checked) {
        
        if (contadorDeCliques === 0) {
            // Primeiro clique: Abre a caixinha normal
            textoCaixa.innerText = "Tem certeza que você leu tudinhokkk?";
            textoCaixa.style.color = "#333";
            textoCaixa.style.fontSize = "18px";
            caixaDeAviso.className = "caixa-visivel";
            
        } else if (contadorDeCliques === 1) {
            //segundo clique: A caixinha aparece GRITANDO!!KAKAKA
            textoCaixa.innerText = "TEM CERTEZA ABSOLUTA MESMO???";
            textoCaixa.style.color = "red";
            textoCaixa.style.fontSize = "24px";
            textoCaixa.style.fontWeight = "bold";
            caixaDeAviso.className = "caixa-visivel";
            
        } else if (contadorDeCliques === 2) {
            // Terceiro clique: Aleluia! finalmente mostra a super surpresa super romantica
            document.body.classList.add('modo-romantico');
        }
    }
});

// O que acontece quando clica em SIM:
btnSim.addEventListener('click', () => {
    contadorDeCliques++; //aumenta a contagem de cliques
    caixaDeAviso.className = "caixa-escondido"; //esconde a caixinha, esta la no css a classe que esconde a caixinha, entao so precisa trocar a classe para esconder ou mostrar
    
    //o texto do botão principal para ficar mais divertido modificando a cada clique, para a pessoa perceber que tem algo mais acontecendo
    if (contadorDeCliques === 1) {
        btnProsseguir.innerText = "Executar contrato novamente";
    } else if (contadorDeCliques === 2) {
        btnProsseguir.innerText = "Executar contrato (Agora é sério! 👺  )";
    }
});

// ta e oque acontece quando clica em NÃO (a punição divina):
btnNao.addEventListener('click', () => {
    caixaDeAviso.className = "caixa-escondido"; // Esconde a caixinha
    contadorDeCliques = 0; // Zera a brincadeira
    
    //desmarca a caixinha, bloqueia tudo e faz a pessoa rolar tudo de novo, porque ela não leu o contrato (Punição máxima!)
    checkboxAceito.checked = false;
    checkboxAceito.setAttribute('disabled', 'true');
    btnProsseguir.setAttribute('disabled', 'true');
    btnProsseguir.innerText = "Executar Contrato";
    
    //joga o scroll do texto lá pro topo de novo (Punição colossal!)
    caixaContrato.scrollTop = 0; 
});