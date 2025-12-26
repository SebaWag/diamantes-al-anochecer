// Obtener número de boletín de la URL
function obtenerNumeroBoletin() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('n')) || 1;
}

// Cargar y mostrar boletín individual
async function cargarBoletin() {
    const numero = obtenerNumeroBoletin();
    const boletines = await cargarBoletines();
    const boletin = boletines.find(b => b.numero === numero);

    if (!boletin) {
        document.getElementById('boletin-info').innerHTML = '<p>Boletín no encontrado</p>';
        return;
    }

    // Actualizar título
    document.getElementById('boletin-titulo').textContent = `Boletín Nº ${boletin.numero}`;
    document.title = `Boletín Nº ${boletin.numero} - Diamantes al Anochecer`;

    // Mostrar info
    document.getElementById('boletin-info').innerHTML = `
        <h2>${boletin.fecha}</h2>
        <p class="boletin-resultado" style="font-size: 1.5rem; margin: 0.5rem 0;">
            <span class="equipo-rojo">Rojos ${boletin.golesRojos}</span>
            <span> - </span>
            <span class="equipo-azul">${boletin.golesAzules} Azules</span>
        </p>
        <p style="color: #666; font-style: italic;">Destacado: ${boletin.destacado}</p>
    `;

    // Cargar PDF
    document.getElementById('pdf-viewer').src = boletin.archivo;
    
    // Configurar descarga
    document.getElementById('btn-descargar').href = boletin.archivo;

    // Navegación anterior/siguiente
    const numeros = boletines.map(b => b.numero).sort((a, b) => a - b);
    const indiceActual = numeros.indexOf(numero);
    
    const btnAnterior = document.getElementById('btn-anterior');
    const btnSiguiente = document.getElementById('btn-siguiente');

    if (indiceActual > 0) {
        btnAnterior.href = `boletin.html?n=${numeros[indiceActual - 1]}`;
    } else {
        btnAnterior.classList.add('disabled');
    }

    if (indiceActual < numeros.length - 1) {
        btnSiguiente.href = `boletin.html?n=${numeros[indiceActual + 1]}`;
    } else {
        btnSiguiente.classList.add('disabled');
    }
}

cargarBoletin();
