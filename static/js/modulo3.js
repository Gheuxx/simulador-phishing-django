const simulations = [
    {
        title: 'Solicitação urgente do Diretor Geral',
        context: 'Você é gerente financeiro de uma empresa. Em uma manhã comum, recebe um e-mail aparentemente enviado pelo Diretor Geral solicitando um pagamento extraordinário para renovação de uma certificação importante. A mensagem afirma que, sem essa certificação, a empresa poderá perder clientes estratégicos.',
        image: '/static/img/cenarios/modulo3_financeiro.png',
        imageText: 'Imagem simulada: e-mail do Diretor Geral solicitando pagamento urgente para renovação de certificação.',
        options: [
            {
                text: 'Realizar o pagamento imediatamente para evitar prejuízos à empresa.',
                risk: 2,
                feedback: 'Ação de alto risco. Solicitações financeiras urgentes devem sempre ser verificadas por canais oficiais antes de qualquer pagamento.'
            },
            {
                text: 'Responder ao e-mail pedindo mais detalhes sobre o pagamento.',
                risk: 1,
                feedback: 'Ação de risco médio. Responder ao possível atacante pode manter a interação ativa. O ideal é validar a solicitação por outro canal.'
            },
            {
                text: 'Confirmar a solicitação por telefone ou canal interno oficial antes de agir.',
                risk: 0,
                feedback: 'Ação segura. Validar por um canal independente reduz o risco de cair em golpes de falso executivo.'
            }
        ]
    },
    {
        title: 'Atualização cadastral do RH',
        context: 'Você trabalha no setor administrativo e recebe uma mensagem informando que todos os colaboradores precisam atualizar seus dados pessoais em até 24 horas para não terem o acesso ao sistema bloqueado.',
        image: '/static/img/cenarios/modulo3_rh.png',
        imageText: 'Imagem simulada: e-mail do RH solicitando atualização cadastral urgente.',
        options: [
            {
                text: 'Clicar no link e preencher os dados solicitados.',
                risk: 2,
                feedback: 'Ação de alto risco. Links recebidos por e-mail solicitando dados pessoais devem ser tratados com desconfiança.'
            },
            {
                text: 'Verificar no portal interno da empresa se existe algum comunicado oficial.',
                risk: 0,
                feedback: 'Ação segura. Conferir diretamente em canais oficiais é uma boa prática.'
            },
            {
                text: 'Encaminhar o e-mail para colegas perguntando se eles também receberam.',
                risk: 1,
                feedback: 'Ação de risco médio. Encaminhar mensagens suspeitas pode espalhar o golpe. O ideal é reportar ao time responsável.'
            }
        ]
    },
    {
        title: 'Redefinição de senha pela equipe de TI',
        context: 'Você recebe um e-mail dizendo que sua senha corporativa expirou e que precisa redefini-la imediatamente por meio de um link externo. A mensagem usa o logotipo da empresa e parece bem formatada.',
        image: '/static/img/cenarios/modulo3_ti.png',
        imageText: 'Imagem simulada: e-mail de TI com link externo para redefinição de senha.',
        options: [
            {
                text: 'Clicar no link e redefinir a senha rapidamente.',
                risk: 2,
                feedback: 'Ação de alto risco. Links externos para redefinição de senha podem direcionar para páginas falsas.'
            },
            {
                text: 'Acessar manualmente o sistema oficial da empresa para verificar a necessidade de troca de senha.',
                risk: 0,
                feedback: 'Ação segura. Acessar o sistema digitando o endereço oficial evita clicar em links maliciosos.'
            },
            {
                text: 'Responder ao e-mail perguntando se a solicitação é verdadeira.',
                risk: 1,
                feedback: 'Ação de risco médio. Se o remetente for falso, você estará interagindo com o atacante.'
            }
        ]
    },
    {
        title: 'SMS sobre entrega pendente',
        context: 'Durante o expediente, você recebe um SMS informando que uma entrega importante para a empresa está retida e que é necessário pagar uma pequena taxa para liberação imediata.',
        image: '/static/img/cenarios/modulo3_entrega.png',
        imageText: 'Imagem simulada: SMS com link para pagamento de taxa de entrega.',
        options: [
            {
                text: 'Clicar no link e pagar a taxa, pois o valor é baixo.',
                risk: 2,
                feedback: 'Ação de alto risco. Golpes por SMS costumam usar valores pequenos para induzir decisões rápidas.'
            },
            {
                text: 'Consultar diretamente o site oficial da transportadora ou o setor responsável por compras.',
                risk: 0,
                feedback: 'Ação segura. Validar a informação em fonte oficial é o comportamento recomendado.'
            },
            {
                text: 'Responder ao SMS pedindo o código de rastreio.',
                risk: 1,
                feedback: 'Ação de risco médio. Interagir com mensagens suspeitas pode confirmar que seu número está ativo.'
            }
        ]
    },
    {
        title: 'Cliente enviando contrato por link',
        context: 'Você recebe uma mensagem de alguém se passando por cliente, dizendo que enviou um contrato urgente para assinatura. O arquivo está disponível em um link encurtado e a mensagem pede análise ainda no mesmo dia.',
        image: '/static/img/cenarios/modulo3_cliente.png',
        imageText: 'Imagem simulada: mensagem de cliente com link encurtado para contrato urgente.',
        options: [
            {
                text: 'Abrir o link imediatamente para não atrasar o atendimento ao cliente.',
                risk: 2,
                feedback: 'Ação de alto risco. Links encurtados podem esconder destinos maliciosos.'
            },
            {
                text: 'Solicitar o envio do contrato por um canal oficial já utilizado anteriormente.',
                risk: 0,
                feedback: 'Ação segura. Usar canais previamente conhecidos reduz o risco de fraude.'
            },
            {
                text: 'Abrir o link no celular pessoal para evitar riscos no computador da empresa.',
                risk: 1,
                feedback: 'Ação de risco médio. Isso ainda expõe seus dados e dispositivo pessoal a possíveis ameaças.'
            }
        ]
    }
];

function shuffleSimulationOptions(simulation) {
    if (simulation.shuffled) {
        return;
    }

    for (let i = simulation.options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [simulation.options[i], simulation.options[j]] = [
            simulation.options[j],
            simulation.options[i]
        ];
    }

    simulation.shuffled = true;
}

const simulationStep = document.getElementById('simulation-step');
const simulationTitle = document.getElementById('simulation-title');
const simulationContext = document.getElementById('simulation-context');
const simulationImageText = document.getElementById('simulation-image-text');
const simulationImage = document.getElementById('simulation-image');
const simulationOptions = document.getElementById('simulation-options');
const simulationFeedback = document.getElementById('simulation-feedback');

const nextSimulationButton = document.getElementById('next-simulation');
const restartSimulationButton = document.getElementById('restart-simulation');
const finishTrainingButton = document.getElementById('finish-training');

const simulationContainer = document.getElementById('simulation-container');
const simulationResult = document.getElementById('simulation-result');

let currentSimulation = 0;
let totalRisk = 0;
let decisionMade = false;

function loadSimulation(index) {
    const simulation = simulations[index];

    shuffleSimulationOptions(simulation);

    decisionMade = false;

    simulationStep.textContent = `Cenário ${index + 1} de ${simulations.length}`;
    simulationTitle.textContent = simulation.title;
    simulationContext.textContent = simulation.context;
    simulationImageText.textContent = simulation.imageText;
    simulationImage.src = simulation.image;
    simulationImage.alt = simulation.title;

    simulationOptions.innerHTML = '';
    simulationFeedback.classList.add('hidden');
    simulationFeedback.innerHTML = '';

    nextSimulationButton.classList.add('hidden');
    restartSimulationButton.classList.add('hidden');
    finishTrainingButton.classList.add('hidden');

    simulation.options.forEach((option) => {
        const button = document.createElement('button');
        button.classList.add('decision-option');
        button.textContent = option.text;

        button.addEventListener('click', () => {
            selectDecision(option);
        });

        simulationOptions.appendChild(button);
    });
}

function selectDecision(option) {
    if (decisionMade) {
        return;
    }

    decisionMade = true;
    totalRisk += option.risk;

    const allOptions = document.querySelectorAll('.decision-option');

    allOptions.forEach((button) => {
        button.disabled = true;
    });

    simulationFeedback.classList.remove('hidden');

    simulationFeedback.innerHTML = `
        <h3>Feedback da decisão</h3>
        <p>${option.feedback}</p>
        <p><strong>Pontos de risco nesta decisão:</strong> ${option.risk}</p>
    `;

    if (currentSimulation === simulations.length - 1) {
        showSimulationResult();
    } else {
        nextSimulationButton.classList.remove('hidden');
    }
}

function showSimulationResult() {
    simulationContainer.classList.add('hidden');
    nextSimulationButton.classList.add('hidden');

    let riskLevel = '';
    let riskClass = '';
    let message = '';

    if (totalRisk <= 3) {
        riskLevel = 'Baixo risco';
        riskClass = 'approved';
        message = 'Ótimo desempenho. Suas decisões demonstraram cautela, validação por canais oficiais e baixa exposição a golpes.';
    } else if (totalRisk <= 6) {
        riskLevel = 'Médio risco';
        riskClass = 'warning';
        message = 'Você tomou algumas decisões seguras, mas ainda apresentou comportamentos que poderiam aumentar sua exposição a tentativas de phishing.';
    } else {
        riskLevel = 'Alto risco';
        riskClass = 'failed';
        message = 'Suas decisões indicam alta exposição a golpes. Revise os módulos anteriores e pratique a validação de mensagens suspeitas.';
    }

    fetch(salvarModulo3Url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({
            pontos_risco: totalRisk,
            risco: riskLevel
        })
    });

    simulationResult.classList.remove('hidden');

    simulationResult.innerHTML = `
        <span class="slide-step">Resultado do Simulador</span>
        <h2>${riskLevel}</h2>
        <p>${message}</p>

        <div class="result-summary">
            <div>
                <h3>Pontuação de risco</h3>
                <p>${totalRisk} / 10</p>
            </div>

            <div>
                <h3>Classificação</h3>
                <p class="${riskClass}">${riskLevel}</p>
            </div>
        </div>
    `;

    localStorage.setItem('modulo3_concluido', 'true');
    restartSimulationButton.classList.remove('hidden');
    finishTrainingButton.classList.remove('hidden');
}

nextSimulationButton.addEventListener('click', () => {
    currentSimulation++;
    loadSimulation(currentSimulation);
});

restartSimulationButton.addEventListener('click', () => {
    currentSimulation = 0;
    totalRisk = 0;
    decisionMade = false;

    simulationResult.classList.add('hidden');
    simulationResult.innerHTML = '';
    simulationContainer.classList.remove('hidden');

    loadSimulation(currentSimulation);
});

loadSimulation(currentSimulation);

function getCookie(name) {
    let cookieValue = null;

    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');

        for (let cookie of cookies) {
            cookie = cookie.trim();

            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }

    return cookieValue;
}