const modulo1 = localStorage.getItem('modulo1_concluido') === 'true';
const modulo2 = localStorage.getItem('modulo2_concluido') === 'true';
const modulo3 = localStorage.getItem('modulo3_concluido') === 'true';

const totalConcluidos = [modulo1, modulo2, modulo3].filter(Boolean).length;
const progresso = Math.round((totalConcluidos / 3) * 100);

document.getElementById('dashboard-progress').textContent = `${progresso}% concluído`;
document.getElementById('dashboard-score').textContent = `${totalConcluidos * 100} pontos`;

let status = 'Treinamento não iniciado';

if (totalConcluidos > 0 && totalConcluidos < 3) {
    status = 'Em andamento';
}

if (totalConcluidos === 3) {
    status = 'Treinamento concluído';
}

document.getElementById('dashboard-status').textContent = status;

function updateModuleStatus(moduleId, isDone) {
    const element = document.getElementById(moduleId);

    if (isDone) {
        element.classList.remove('locked');
        element.classList.add('completed');
        element.querySelector('.module-status').textContent = 'Concluído';
    }
}

function lockButton(buttonId) {
    const button = document.getElementById(buttonId);

    button.classList.add('disabled-link');
    button.addEventListener('click', (event) => {
        event.preventDefault();
    });
}

function unlockButton(buttonId, text) {
    const button = document.getElementById(buttonId);

    button.classList.remove('disabled-link');
    button.classList.remove('btn-secondary');
    button.classList.add('btn-primary');
    button.textContent = text;

    const moduleCard = button.closest('.module-card');

    if (moduleCard) {
        moduleCard.classList.remove('locked');
    }
}

updateModuleStatus('module-1-card', modulo1);
updateModuleStatus('module-2-card', modulo2);
updateModuleStatus('module-3-card', modulo3);

if (modulo1) {
    unlockButton('module-2-button', modulo2 ? 'Visualizar' : 'Iniciar');
} else {
    lockButton('module-2-button');
}

if (modulo2) {
    unlockButton('module-3-button', modulo3 ? 'Visualizar' : 'Iniciar');
} else {
    lockButton('module-3-button');
}

if (modulo1) {
    document.getElementById('module-1-button').textContent = 'Visualizar';
}