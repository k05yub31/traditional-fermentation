const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRV92qpHzPeHHew-24O5FZaehBaUv-dpDg5Bo3RfT2YNg3BxSAi-kCSYaG5Yyz3QFBzellnDzf__WnW/pub?output=csv'; 

async function loadData() {
    try {
        const response = await fetch(CSV_URL);
        const data = await response.text();
        parseData(data);
    } catch (error) {
        console.error('데이터를 불러오는 데 실패했습니다:', error);
    }
}

function parseData(csvText) {
    const rows = csvText.split('\n').map(row => row.split(','));
    const headers = rows[0];
    const items = [];

    for (let i = 1; i < rows.length; i++) {
        if (rows[i].length === headers.length) {
            let item = {};
            for (let j = 0; j < headers.length; j++) {
                item[headers[j].trim()] = rows[i][j].trim();
            }
            items.push(item);
        }
    }
    displayCards(items);
    setupSearch(items);
}

function displayCards(items) {
    const container = document.getElementById('card-container');
    container.innerHTML = '';
    
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${item.name}</h3>
            <p><strong>분류:</strong> ${item.category}</p>
            <p><strong>적정 온도:</strong> ${item.temp}</p>
            <p><strong>숙성 기간:</strong> ${item.period}</p>
            <p>${item.description}</p>
        `;
        container.appendChild(card);
    });
}

function setupSearch(items) {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();
        const filtered = items.filter(item => item.name.toLowerCase().includes(keyword));
        displayCards(filtered);
    });
}

loadData();
