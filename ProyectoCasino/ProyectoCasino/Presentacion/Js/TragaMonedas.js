const urlParams = new URLSearchParams(window.location.search);
const usuarioId = urlParams.get('usuarioId');

// Verificar que el usuarioId esté presente
if (usuarioId) {
    console.log("ID de Usuario: " + usuarioId);
} else {
    console.log("No se encontró el usuarioId en la URL");
}

let puntajeUsuario = 0; // Inicializa la variable

const symbols = ['🍋', '🍇', '🍒', '🔔', '💎', 'W', 'I', 'N', '💣'];
const symbolValues = { '🍋': 5, '🍇': 10, '🍒': 15, '🔔': 20, '💎': 50, 'W': 100, 'I': 100, 'N': 100 };

document.addEventListener('DOMContentLoaded', () => {
    const spinButton = document.getElementById('btnGirar');
    const betAmountInput = document.getElementById('betAmountInput');
    const winAmountDisplay = document.getElementById('winAmount');

    // Inicializa los créditos al cargar la página
    cargarPuntajeUsuario(usuarioId);

    spinButton.addEventListener('click', () => {
        const bet = parseInt(betAmountInput.value, 10);
        if (isNaN(bet) || bet <= 0) {
            console.error('Apuesta inválida o no numérica');
            alert('¡Por favor, ingresa un valor de apuesta válido!');
            return;
        }

        puntajeUsuario -= bet; // Resta la apuesta de los créditos
        console.log(`Apuesta: ${bet}. Puntaje después de apuesta: ${puntajeUsuario}`);
        actualizarPuntaje(); // Actualiza la visualización de créditos

        let spins = 15;
        const interval = setInterval(() => {
            spinReels();
            spins--;
            if (spins <= 0) {
                clearInterval(interval);

                const winAmount = calculateWin(bet);
                console.log(`Ganancia calculada: ${winAmount}`);
                winAmountDisplay.textContent = winAmount;
                puntajeUsuario += winAmount; // Actualiza los créditos
                console.log(`Puntaje final después de ganar/perder: ${puntajeUsuario}`);
                actualizarPuntaje(); // Refleja el nuevo puntaje en pantalla

                // Mostrar el resultado y recargar la página después de un retraso
                setTimeout(() => {
                    if (winAmount > 0) {
                        alert(`¡Ganaste ${winAmount} puntos!`);
                    } else {
                        alert(`Perdiste ${bet} puntos.`);
                    }
                    location.reload(); // Recarga la página
                }, 500); // Espera medio segundo antes de mostrar el alert
            }
        }, 100);
    });
});

function spinReels() {
    const reels = document.querySelectorAll('.reel');
    reels.forEach(reel => {
        const children = reel.querySelectorAll('.symbol');
        children.forEach(child => {
            child.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        });
    });
}

function cargarPuntajeUsuario(idUsuario) {
    fetch("TragaMonedas.aspx/ObtenerPuntajeUsuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({ idUsuario: idUsuario })
    })
        .then(response => response.json())
        .then(data => {
            if (data.d !== undefined) {
                puntajeUsuario = data.d; // Asigna el puntaje directamente
                console.log(`Puntaje cargado del servidor: ${puntajeUsuario}`);
                actualizarPuntaje(); // Actualiza el puntaje en pantalla
            } else {
                console.error("Error al obtener el puntaje:", data);
                alert("Error al obtener el puntaje.");
            }
        })
        .catch(error => {
            console.error("Error al hacer la solicitud:", error);
            alert("Error al cargar el puntaje.");
        });
}

function actualizarPuntaje() {
    const puntajeDiv = document.getElementById('credits');
    puntajeDiv.textContent = puntajeUsuario; // Actualiza el puntaje en pantalla
}

function calculateWin(bet) {
    const reels = [
        document.getElementById('reel1'),
        document.getElementById('reel2'),
        document.getElementById('reel3')
    ];

    // Asegúrate de que cada carrete tenga tres símbolos
    const lines = [
        Array.from(reels).map(reel => reel.querySelectorAll('.symbol')[0]?.textContent || ''), // Línea superior
        Array.from(reels).map(reel => reel.querySelectorAll('.symbol')[1]?.textContent || ''), // Línea central
        Array.from(reels).map(reel => reel.querySelectorAll('.symbol')[2]?.textContent || '')  // Línea inferior
    ];

    console.log("Líneas extraídas:", lines); // Verifica que las líneas se extraigan correctamente

    return checkWinningLines(lines, bet);
}

function checkWinningLines(lines, bet) {
    let winAmount = 0;

    // Verificar si alguna línea contiene tres bombas (💣)
    if (lines.some(line => line.join('') === '💣💣💣')) {
        winAmount = -bet * 2; // Descontar el doble de la apuesta cuando aparezcan tres bombas
        console.log("¡Tres bombas! El puntaje se reduce en el doble de la apuesta:", winAmount);
        actualizarPuntajeBD(usuarioId, winAmount, 'perder'); // Actualizar puntaje como pérdida
        return winAmount; // Finalizar inmediatamente si hay tres bombas
    }

    // Verificar las combinaciones en la línea central (2 iguales o 3 iguales) excluyendo "WIN"
    const centralLine = lines[1];

    // Caso 1: Si hay 3 símbolos iguales en la línea central
    if (centralLine[0] === centralLine[1] && centralLine[1] === centralLine[2] && centralLine[0] !== 'W' && centralLine[1] !== 'I' && centralLine[2] !== 'N') {
        const symbol = centralLine[0];
        if (symbol in symbolValues) {
            const winCentral = symbolValues[symbol] * bet * 3; // Mayor ganancia si son 3 iguales
            winAmount += winCentral;
            console.log(`Ganancia en línea central (tres iguales): ${winCentral}`);
        }
    }
    // Caso 2: Si hay 2 símbolos iguales en la línea central
    else if (centralLine[0] === centralLine[1] || centralLine[1] === centralLine[2] || centralLine[0] === centralLine[2]) {
        const symbol = centralLine[0] === centralLine[1] ? centralLine[0] : (centralLine[1] === centralLine[2] ? centralLine[1] : centralLine[0]);
        if (symbol in symbolValues && symbol !== 'W' && symbol !== 'I' && symbol !== 'N') {
            const winCentral = (symbolValues[symbol] * bet * 2) - bet; // Menor ganancia si son 2 iguales
            winAmount += winCentral;
            console.log(`Ganancia en línea central (dos iguales): ${winCentral}`);
        }
    }

    // Verificar si la línea central contiene "WIN"
    if (centralLine.join('') === 'W I N') {
        const winBonus = bet * 100; // Premio especial para "WIN"
        winAmount += winBonus;
        console.log(`Línea WIN! Premio especial: ${winBonus}`);
    }

    // Verificar si alguna línea contiene "WIN" horizontalmente
    if (lines.some(line => line.join('') === 'W I N')) {
        const winBonus = bet * 50; // Premio por "WIN" horizontal
        winAmount += winBonus;
        console.log(`Ganancia por "WIN" horizontal: ${winBonus}`);
    }

    // Registrar resultado en la base de datos
    if (winAmount > 0) {
        console.log(`Ganancia total: ${winAmount}`);
        puntajeUsuario += winAmount; // Actualiza el puntaje del usuario
        actualizarPuntaje(); // Refleja el nuevo puntaje en pantalla inmediatamente
        actualizarPuntajeBD(usuarioId, winAmount, 'ganar'); // Registrar ganancia
    } else {
        console.log(`Pérdida total:, ${bet }`);
        actualizarPuntajeBD(usuarioId, bet, 'perder'); // Registrar pérdida (monto negativo)
    }

    return winAmount;
}

function actualizarPuntajeBD(idUsuario, puntajeApostado, resultado) {
    const datos = {
        idUsuario: idUsuario,
        apuesta: puntajeApostado,
        resultado: resultado
    };

    console.log(`Datos enviados a la base de datos:`, JSON.stringify(datos));

    fetch("TragaMonedas.aspx/ActualizarPuntajeUsuario", {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Puntaje actualizado en la base de datos:', data);
        })
        .catch(error => {
            console.error('Error al actualizar puntaje en la base de datos:', error);
        });
}
