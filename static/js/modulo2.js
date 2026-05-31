const scenarios = [
    {
        title: 'E-mail básico',
        description: 'Você recebeu um e-mail informando que sua conta será bloqueada caso não confirme seus dados imediatamente.',
        image: '/static/img/cenarios/modulo2_email_basico.png',
        imageText: 'Imagem simulada: e-mail com aviso urgente de bloqueio de conta.',
        options: [
            'Remetente suspeito',
            'Pedido de senha',
            'Logotipo da empresa',
            'Tom de urgência',
            'Cor azul no botão'
        ],
        correct: [0, 1, 3],
        explanation: 'O remetente suspeito, o pedido de senha e o tom de urgência são sinais comuns em tentativas de phishing.'
    },
    {
        title: 'E-mail avançado',
        description: 'O e-mail parece profissional, mas contém um domínio parecido com o oficial e solicita atualização urgente de cadastro.',
        image: '/static/img/cenarios/modulo2_email_avancado.png',
        imageText: 'Imagem simulada: e-mail corporativo falso com link de atualização.',
        options: [
            'Domínio semelhante ao oficial',
            'Linguagem profissional',
            'Link encurtado',
            'Pedido de atualização urgente',
            'Assinatura corporativa'
        ],
        correct: [0, 2, 3],
        explanation: 'Domínios parecidos, links encurtados e pedidos urgentes de atualização são fortes redflags.'
    },
    {
        title: 'SMS suspeito',
        description: 'Você recebeu um SMS dizendo que há uma entrega pendente e que precisa clicar em um link para liberar o pacote.',
        image: '/static/img/cenarios/modulo2_sms.png',
        imageText: 'Imagem simulada: SMS com link suspeito sobre entrega pendente.',
        options: [
            'Número desconhecido',
            'Link suspeito',
            'Saudação personalizada',
            'Mensagem de urgência',
            'Data correta'
        ],
        correct: [0, 1, 3],
        explanation: 'Número desconhecido, link suspeito e urgência são sinais comuns em golpes por SMS, também chamados de smishing.'
    },
    {
        title: 'Landing page falsa',
        description: 'Uma página de login parecida com a de uma empresa conhecida solicita seu usuário e senha.',
        image: '/static/img/cenarios/modulo2_landing_page1.png',
        imageText: 'Imagem simulada: página falsa de login com endereço estranho.',
        options: [
            'URL diferente da oficial',
            'Cadeado HTTPS ausente',
            'Campo de login',
            'Erros de ortografia',
            'Logotipo da empresa'
        ],
        correct: [0, 1, 3],
        explanation: 'URL diferente, ausência de HTTPS e erros de ortografia podem indicar que a página é falsa.'
    },
    {
        title: 'Link ou mensagem maliciosa',
        description: 'Uma mensagem promete um prêmio exclusivo e pede que você clique em um link para informar seus dados.',
        image: '/static/img/cenarios/modulo2_mensagem.png',
        imageText: 'Imagem simulada: mensagem prometendo prêmio com link desconhecido.',
        options: [
            'Promessa exagerada',
            'Link desconhecido',
            'Texto curto',
            'Solicitação de dados pessoais',
            'Emoji na mensagem'
        ],
        correct: [0, 1, 3],
        explanation: 'Promessas exageradas, links desconhecidos e solicitação de dados pessoais são sinais claros de alerta.'
    }
];

const scenarioStep = document.getElementById('scenario-step');
const scenarioTitle = document.getElementById('scenario-title');
const scenarioDescription = document.getElementById('scenario-description');
const scenarioImageText = document.getElementById('scenario-image-text');
const scenarioImage = document.getElementById('scenario-image');
const scenarioForm = document.getElementById('scenario-form');
const feedbackBox = document.getElementById('feedback-box');

const submitButton = document.getElementById('submit-answer');
const nextButton = document.getElementById('next-scenario');
const finishButton = document.getElementById('finish-module2');
const finalResult = document.getElementById('final-result');

let retryButton = null;
let currentScenario = 0;
let totalScore = 0;
let answered = false;

function shuffleScenarioOptions(scenario) {

    if (scenario.shuffled) {
        return;
    }

    const items = scenario.options.map((option, index) => ({
        text: option,
        isCorrect: scenario.correct.includes(index)
    }));

    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [items[i], items[j]] = [items[j], items[i]];
    }

    scenario.options = items.map(item => item.text);

    scenario.correct = items
        .map((item, index) => item.isCorrect ? index : null)
        .filter(index => index !== null);

    scenario.shuffled = true;
}

function loadScenario(index) {
    const scenario = scenarios[index];
    shuffleScenarioOptions(scenario);

    answered = false;

    scenarioStep.textContent = `Cenário ${index + 1} de ${scenarios.length}`;
    scenarioTitle.textContent = scenario.title;
    scenarioDescription.textContent = scenario.description;
    scenarioImageText.textContent = scenario.imageText;
    scenarioImage.src = scenario.image;
    scenarioImage.alt = scenario.title;

    scenarioForm.innerHTML = '';
    feedbackBox.classList.add('hidden');
    feedbackBox.innerHTML = '';

    submitButton.classList.remove('hidden');
    nextButton.classList.add('hidden');
    finishButton.classList.add('hidden');

    if (retryButton) {
    retryButton.remove();
    retryButton = null;
}

    scenario.options.forEach((option, optionIndex) => {
        const label = document.createElement('label');
        label.classList.add('checkbox-option');

        label.innerHTML = `
            <input type="checkbox" name="redflag" value="${optionIndex}">
            <span>${option}</span>
        `;

        scenarioForm.appendChild(label);
    });
}

function checkAnswer() {
    if (answered) {
        return;
    }

    const scenario = scenarios[currentScenario];
    const selectedOptions = Array.from(
        document.querySelectorAll('input[name="redflag"]:checked')
    ).map(input => Number(input.value));

    let scenarioScore = 0;

    selectedOptions.forEach(option => {
        if (scenario.correct.includes(option)) {
            scenarioScore++;
        }
    });

    totalScore += scenarioScore;
    answered = true;

    const correctTexts = scenario.correct.map(index => scenario.options[index]);

    feedbackBox.classList.remove('hidden');
    feedbackBox.innerHTML = `
        <h3>Feedback do cenário</h3>
        <p>Você acertou <strong>${scenarioScore}</strong> de <strong>${scenario.correct.length}</strong> redflags.</p>

        <p><strong>Redflags corretas:</strong></p>
        <ul>
            ${correctTexts.map(item => `<li>${item}</li>`).join('')}
        </ul>

        <p>${scenario.explanation}</p>
    `;

    submitButton.classList.add('hidden');

    if (currentScenario === scenarios.length - 1) {
        showFinalResult();
    } else {
        nextButton.classList.remove('hidden');
    }
}

function showFinalResult() {
    const maxScore = scenarios.reduce((total, scenario) => {
        return total + scenario.correct.length;
    }, 0);

    const percentage = Math.round((totalScore / maxScore) * 100);
    const approved = percentage >= 70;

    document.getElementById('scenario-container').classList.add('hidden');

    finalResult.classList.remove('hidden');

    finalResult.innerHTML = `
        <span class="slide-step">Resultado do Módulo 2</span>

        ${approved ? `
            <h2>Parabéns, você foi aprovado!</h2>
            <p>
                Você atingiu a assertividade mínima necessária para avançar para o próximo módulo.
            </p>
        ` : `
            <h2>Você foi reprovado neste módulo</h2>
            <p>
                Para liberar o próximo módulo, é necessário atingir uma assertividade mínima de
                <strong>70%</strong>.
            </p>
        `}

        <div class="result-summary">
            <div>
                <h3>Pontuação</h3>
                <p>${totalScore} / ${maxScore}</p>
            </div>

            <div>
                <h3>Percentual</h3>
                <p>${percentage}%</p>
            </div>

            <div>
                <h3>Status</h3>
                <p class="${approved ? 'approved' : 'failed'}">
                    ${approved ? 'Aprovado' : 'Reprovado'}
                </p>
            </div>
        </div>
    `;

    fetch(salvarModulo2Url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({
            pontos: totalScore,
            total: maxScore
        })
    });

    if (approved) {
        finishButton.classList.remove('hidden');
    } else {
        finishButton.classList.add('hidden');

        retryButton = document.createElement('button');
        retryButton.classList.add('btn-primary');
        retryButton.textContent = 'Refazer Módulo 2';

        retryButton.addEventListener('click', () => {
            currentScenario = 0;
            totalScore = 0;
            answered = false;

            finalResult.classList.add('hidden');
            finalResult.innerHTML = '';
            document.getElementById('scenario-container').classList.remove('hidden');

            loadScenario(currentScenario);
        });

        document.querySelector('.slide-controls').appendChild(retryButton);
    }
}

nextButton.addEventListener('click', () => {
    currentScenario++;
    loadScenario(currentScenario);
});

submitButton.addEventListener('click', checkAnswer);

loadScenario(currentScenario);

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