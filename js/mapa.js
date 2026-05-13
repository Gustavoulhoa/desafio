// Inicializar o mapa
const map = L.map('map').setView([-19.8315, -43.3575], 13);

// Adicionar camada do mapa (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Pontos turísticos com coordenadas reais (aproximadas)
const pontosTuristicos = [
    {
        nome: 'Cachoeira do Funil',
        lat: -19.8315,
        lng: -43.3575,
        tipo: 'cachoeira',
        descricao: 'Linda cachoeira com piscinas naturais perfeitas para banho'
    },
    {
        nome: 'Trilha da Serra',
        lat: -19.8200,
        lng: -43.3500,
        tipo: 'trilha',
        descricao: 'Trilha ecológica com vista panorâmica da região'
    },
    {
        nome: 'Igreja Matriz',
        lat: -19.8400,
        lng: -43.3600,
        tipo: 'historico',
        descricao: 'Igreja histórica do século XVIII, patrimônio cultural'
    },
    {
        nome: 'Mirante do Vale',
        lat: -19.8250,
        lng: -43.3450,
        tipo: 'mirante',
        descricao: 'Vista deslumbrante do vale do Rio Doce'
    }
];

// Ícones personalizados
const icones = {
    cachoeira: L.divIcon({
        className: 'custom-icon',
        html: '💧',
        iconSize: [30, 30],
        popupAnchor: [0, -15]
    }),
    trilha: L.divIcon({
        className: 'custom-icon',
        html: '🥾',
        iconSize: [30, 30],
        popupAnchor: [0, -15]
    }),
    historico: L.divIcon({
        className: 'custom-icon',
        html: '⛪',
        iconSize: [30, 30],
        popupAnchor: [0, -15]
    }),
    mirante: L.divIcon({
        className: 'custom-icon',
        html: '⛰️',
        iconSize: [30, 30],
        popupAnchor: [0, -15]
    })
};

// Adicionar marcadores no mapa
const markers = [];
pontosTuristicos.forEach(ponto => {
    const marker = L.marker([ponto.lat, ponto.lng])
        .bindPopup(`
            <strong>${ponto.nome}</strong><br>
            ${ponto.descricao}
        `)
        .addTo(map);
    
    markers.push({ marker, ponto });
});

// Adicionar interatividade com a lista de pontos
document.querySelectorAll('.ponto-item').forEach((item, index) => {
    item.addEventListener('click', () => {
        const ponto = pontosTuristicos[index];
        map.setView([ponto.lat, ponto.lng], 15);
        markers[index].marker.openPopup();
        
        // Scroll suave para o mapa
        document.getElementById('map').scrollIntoView({ behavior: 'smooth' });
    });
});

// Controle de zoom personalizado
map.zoomControl.setPosition('bottomright');

// Adicionar legenda
const legend = L.control({ position: 'bottomleft' });
legend.onAdd = function() {
    const div = L.DomUtil.create('div', 'info legend');
    div.style.backgroundColor = 'white';
    div.style.padding = '10px';
    div.style.borderRadius = '5px';
    div.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    div.innerHTML = `
        <strong>Legenda:</strong><br>
        💧 Cachoeiras<br>
        🥾 Trilhas<br>
        ⛪ Histórico<br>
        ⛰️ Mirantes
    `;
    return div;
};
legend.addTo(map);