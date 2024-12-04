document.addEventListener('DOMContentLoaded', () => {
    cargarLeaderboardGeneral();
});

function cargarLeaderboardGeneral() {
    fetch('Leaderboard.aspx/ObtenerLeaderboardGeneral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
            console.log("Leaderboard General:", data); // Verifica la estructura de la respuesta

            if (data.error) {
                console.error("Error:", data.error);
            } else {
                // Parsear el string dentro de la propiedad 'd' a un objeto JSON
                const respuesta = JSON.parse(data.d);
                console.log("Jugadores:", respuesta.jugadores); // Verifica que 'jugadores' es un arreglo

                if (respuesta.jugadores && Array.isArray(respuesta.jugadores)) {
                    const tablaGeneral = document.getElementById("tablaGeneral");
                    tablaGeneral.innerHTML = ""; // Limpiar contenido previo

                    respuesta.jugadores.forEach(jugador => {
                        const fila = document.createElement("tr");
                        fila.classList.add("hover:bg-red-600");

                        // Asegúrate de que el nombre del campo coincide exactamente con lo que tienes en el JSON
                        const celdaEmail = document.createElement("td");
                        celdaEmail.className = "border-2 border-black px-4 py-2";
                        celdaEmail.textContent = jugador.Email;

                        const celdaCreditos = document.createElement("td");
                        celdaCreditos.className = "border-2 border-black px-4 py-2";
                        celdaCreditos.textContent = jugador.Creditos;  // Asegúrate de que 'Creditos' esté con la 'C' mayúscula

                        fila.appendChild(celdaEmail);
                        fila.appendChild(celdaCreditos);
                        tablaGeneral.appendChild(fila);
                    });
                } else {
                    console.error("No se encontró la propiedad 'jugadores' o no es un arreglo.");
                }
            }
        })
        .catch(error => console.error('Error:', error));
}




