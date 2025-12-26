// Cargar datos de boletines
async function cargarBoletines() {
    try {
        const response = await fetch('boletines/data.json');
        const data = await response.json();
        return data.boletines;
    } catch (error) {
        console.error('Error cargando boletines:', error);
        return [];
    }
}

// Renderizar tarjetas de boletines en la página principal
async function renderizarBoletines() {
    const container = document.getElementById('boletines-container');
    if (!container) return;

    const boletines = await cargarBoletines();
    
    // Ordenar del más reciente al más antiguo
    boletines.sort((a, b) => b.numero - a.numero);

    container.innerHTML = boletines.map(boletin => `
        <a href="boletin.html?n=${boletin.numero}" class="boletin-card">
            <div class="boletin-card-header">
                <span class="boletin-numero">Nº ${boletin.numero}</span>
                <span class="boletin-fecha">${boletin.fecha}</span>
            </div>
            <div class="boletin-card-body">
                <div class="boletin-resultado">
                    <span class="equipo-rojo">Rojos ${boletin.golesRojos}</span>
                    <span> - </span>
                    <span class="equipo-azul">${boletin.golesAzules} Azules</span>
                </div>
                <p class="boletin-destacado">${boletin.destacado}</p>
            </div>
        </a>
    `).join('');

    // Configurar buscador
    configurarBuscador(boletines);
}

// Buscador
function configurarBuscador(boletines) {
    const buscador = document.getElementById('buscador');
    const container = document.getElementById('boletines-container');
    
    if (!buscador) return;

    buscador.addEventListener('input', (e) => {
        const termino = e.target.value.toLowerCase();
        
        const filtrados = boletines.filter(b => 
            b.fecha.toLowerCase().includes(termino) ||
            b.destacado.toLowerCase().includes(termino) ||
            b.keywords.some(k => k.toLowerCase().includes(termino)) ||
            `nº ${b.numero}`.includes(termino) ||
            `numero ${b.numero}`.includes(termino)
        );

        if (filtrados.length === 0) {
            container.innerHTML = '<p class="sin-resultados">No se encontraron boletines con ese criterio</p>';
        } else {
            filtrados.sort((a, b) => b.numero - a.numero);
            container.innerHTML = filtrados.map(boletin => `
                <a href="boletin.html?n=${boletin.numero}" class="boletin-card">
                    <div class="boletin-card-header">
                        <span class="boletin-numero">Nº ${boletin.numero}</span>
                        <span class="boletin-fecha">${boletin.fecha}</span>
                    </div>
                    <div class="boletin-card-body">
                        <div class="boletin-resultado">
                            <span class="equipo-rojo">Rojos ${boletin.golesRojos}</span>
                            <span> - </span>
                            <span class="equipo-azul">${boletin.golesAzules} Azules</span>
                        </div>
                        <p class="boletin-destacado">${boletin.destacado}</p>
                    </div>
                </a>
            `).join('');
        }
    });
}

// Inicializar página principal
if (document.getElementById('boletines-container')) {
    renderizarBoletines();
}
