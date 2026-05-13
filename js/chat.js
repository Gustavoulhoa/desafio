// Chat Bot Funcionalidade
const chatButton = document.getElementById('chatButton');
const chatModal = document.getElementById('chatModal');
const closeChat = document.querySelector('.close-chat');
const sendButton = document.getElementById('sendMessage');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

// Respostas automáticas do bot
const botResponses = {
    'ola': 'Olá! Como posso ajudar você com turismo em São Gonçalo?',
    'cachoeira': 'Temos várias cachoeiras incríveis! A Cachoeira do Funil e a Cachoeira da Usina são as mais famosas. Quer saber mais detalhes?',
    'trilha': 'As trilhas da Serra do Espinhaço são imperdíveis! Recomendo a Trilha do Pico do Itacolomi. Gostaria de informações sobre guias?',
    'hotel': 'Temos pousadas aconchegantes na cidade. A Pousada Recanto da Serra é muito recomendada. Precisa de contato?',
    'restaurante': 'A culinária local é maravilhosa! Recomendo o Restaurante Sabores da Roça e o Bar do Zé. Quer mais sugestões?',
    'evento': 'Fique de olho na nossa página do Instagram para eventos culturais e festivais! 🎉',
    'mapa': 'Temos um mapa interativo na nossa página! Clique em "Mapa" no menu principal.',
    'obrigado': 'Por nada! Estou aqui para ajudar. 😊',
    'default': 'Desculpe, não entendi. Posso ajudar com: cachoeiras, trilhas, hospedagem, restaurantes, eventos ou mapa.'
};

// Abrir chat
chatButton.addEventListener('click', () => {
    chatModal.classList.add('active');
});

// Fechar chat
closeChat.addEventListener('click', () => {
    chatModal.classList.remove('active');
});

// Enviar mensagem
function sendMessage() {
    const message = chatInput.value.trim();
    if(message === '') return;
    
    // Adicionar mensagem do usuário
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Processar resposta do bot
    setTimeout(() => {
        const response = getBotResponse(message.toLowerCase());
        addMessage(response, 'bot');
    }, 500);
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(userMessage) {
    // Verificar palavras-chave
    for(const [key, response] of Object.entries(botResponses)) {
        if(userMessage.includes(key)) {
            return response;
        }
    }
    return botResponses.default;
}

sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') sendMessage();
});

// Fechar chat ao clicar fora (opcional)
document.addEventListener('click', (e) => {
    if(!chatModal.contains(e.target) && !chatButton.contains(e.target) && chatModal.classList.contains('active')) {
        chatModal.classList.remove('active');
    }
});