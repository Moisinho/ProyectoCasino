// Obtener el valor de usuarioId desde la URL
const urlParams = new URLSearchParams(window.location.search);
const usuarioId = urlParams.get('usuarioId');

// Verificar que el usuarioId esté presente
if (usuarioId) {
    console.log("ID de Usuario: " + usuarioId);
    // Puedes usar usuarioId aquí para enviar a tu backend o lo que necesites
} else {
    console.log("No se encontró el usuarioId en la URL");
}

      let puntajeUsuario = 0; // Inicializar el puntaje
      let montoApuesta = 0; // Monto de la apuesta actual
      const contadorApuestaDiv = document.getElementById('contadorApuesta');
function cargarPuntajeUsuario(usuarioId) {
          fetch("Ruleta.aspx/ObtenerPuntajeUsuario", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json; charset=utf-8"
              },
              body: JSON.stringify({ idUsuario: usuarioId })
          })
              .then(response => response.json())
              .then(data => {
                  const resultado = JSON.parse(data.d);
                  if (resultado.puntaje !== undefined) {
                      puntajeUsuario = resultado.puntaje;
                      actualizarPuntaje();
                  } else {
                      console.error("Error al obtener el puntaje:", data);
                      console.log("Puntaje: ", data.d);
                  }
              })
              .catch(error => {
                  console.error("Error al hacer la solicitud:", error);
              });
      }

cargarPuntajeUsuario(usuarioId);
      const board = document.getElementById('rouletteBoard');

      board.addEventListener('click', (event) => {
          const cell = event.target;
          if (cell.classList.contains('cell')) {
              manejarApuesta(cell);
          }
      });
      

      const ruletaElement = document.getElementById('ruleta');
      const canvas = ruletaElement.querySelector('canvas');
      const ctx = canvas.getContext('2d');
      const segmentos = [
          { numero: '0', color: '#00a340' },
          { numero: '32', color: '#e51c1c' },
          { numero: '15', color: '#1a1a1a' },
          { numero: '19', color: '#e51c1c' },
          { numero: '4', color: '#1a1a1a' },
          { numero: '21', color: '#e51c1c' },
          { numero: '2', color: '#1a1a1a' },
          { numero: '25', color: '#e51c1c' },
          { numero: '17', color: '#1a1a1a' },
          { numero: '34', color: '#e51c1c' },
          { numero: '6', color: '#1a1a1a' },
          { numero: '27', color: '#e51c1c' },
          { numero: '13', color: '#1a1a1a' },
          { numero: '36', color: '#e51c1c' },
          { numero: '11', color: '#1a1a1a' },
          { numero: '30', color: '#e51c1c' },
          { numero: '8', color: '#1a1a1a' },
          { numero: '23', color: '#e51c1c' },
          { numero: '10', color: '#1a1a1a' },
          { numero: '00', color: '#00a340' },
          { numero: '5', color: '#e51c1c' },
          { numero: '24', color: '#1a1a1a' },
          { numero: '16', color: '#e51c1c' },
          { numero: '33', color: '#1a1a1a' },
          { numero: '1', color: '#e51c1c' },
          { numero: '20', color: '#1a1a1a' },
          { numero: '14', color: '#e51c1c' },
          { numero: '31', color: '#1a1a1a' },
          { numero: '9', color: '#e51c1c' },
          { numero: '22', color: '#1a1a1a' },
          { numero: '18', color: '#e51c1c' },
          { numero: '29', color: '#1a1a1a' },
          { numero: '7', color: '#e51c1c' },
          { numero: '28', color: '#1a1a1a' },
          { numero: '12', color: '#e51c1c' },
          { numero: '35', color: '#1a1a1a' },
          { numero: '3', color: '#e51c1c' },
          { numero: '26', color: '#1a1a1a' }
      ];
      const anguloPorSegmento = (2 * Math.PI) / segmentos.length;
      let anguloActual = 0;
      let anguloObjetivo = 0;
      let isGirando = false;
      let requestId;

      function dibujarRuleta() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const radio = canvas.width / 2;

          segmentos.forEach((seg, index) => {
              const inicioAngulo = index * anguloPorSegmento + anguloActual;
              const finAngulo = inicioAngulo + anguloPorSegmento;

              ctx.beginPath();
              ctx.moveTo(radio, radio);
              ctx.arc(radio, radio, radio, inicioAngulo, finAngulo);
              ctx.closePath();
              ctx.fillStyle = seg.color;
              ctx.fill();
              ctx.strokeStyle = '#000';
              ctx.stroke();

              const anguloTexto = inicioAngulo + anguloPorSegmento / 2;
              const xTexto = radio + radio * 0.7 * Math.cos(anguloTexto);
              const yTexto = radio + radio * 0.7 * Math.sin(anguloTexto);
              ctx.fillStyle = '#fff';
              ctx.font = '16px Arial';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(seg.numero, xTexto, yTexto);
          });
      }

      // Función para girar la ruleta
      function girarRuleta() {
          if (!isGirando) {
              isGirando = true;

              // Determinar un ángulo objetivo aleatorio (al menos 5 vueltas completas más un extra aleatorio)
              const vueltasCompletas = 5; // Vueltas completas para darle efecto
              const anguloExtra = Math.random() * 2 * Math.PI; // Parte extra al final
              anguloObjetivo = vueltasCompletas * 2 * Math.PI + anguloExtra;

              const duracionGiro = 5000; // Duración del giro en milisegundos
              const inicioTiempo = performance.now();

            
              function animarGiro(timestamp) {
                  const tiempoTranscurrido = timestamp - inicioTiempo;
                  const progreso = Math.min(tiempoTranscurrido / duracionGiro, 1);
                  anguloActual = (progreso * anguloObjetivo) % (2 * Math.PI);

                  dibujarRuleta();

                  if (progreso < 1) {
                      requestId = requestAnimationFrame(animarGiro);
                  } else {
                      isGirando = false;

                      // Calcular el número ganador basado en el ángulo final
                      const anguloCorregido = (2 * Math.PI - anguloActual + Math.PI / 2) % (2 * Math.PI);
                      const indiceGanador = Math.floor(anguloCorregido / anguloPorSegmento) % segmentos.length;
                      const numeroGanador = segmentos[indiceGanador].numero;

                      mostrarResultado(numeroGanador);
                      cancelAnimationFrame(requestId);

                  }
              }

              requestId = requestAnimationFrame(animarGiro);
          }
      }
      const tablaNumeros = document.querySelectorAll('.numero');
      const tablaColores = document.querySelectorAll('.color');
      const tablaParImpar = document.querySelectorAll('.par-impar');

      // Función para manejar selección de número
      tablaNumeros.forEach(boton => {
          boton.addEventListener('click', () => {
              boton.classList.toggle('selected');
          });
      });

      // Función para manejar selección de color
      tablaColores.forEach(boton => {
          boton.addEventListener('click', () => {
              boton.classList.toggle('selected');
          });
      });

      // Función para manejar selección de par/impar
      tablaParImpar.forEach(boton => {
          boton.addEventListener('click', () => {
              boton.classList.toggle('selected');
          });
      });

      function obtenerApuestas() {
          const apuestasSeleccionadas = [];
          const celdasSeleccionadas = document.querySelectorAll('.cell.selected');

          celdasSeleccionadas.forEach(celda => {
              apuestasSeleccionadas.push(celda.dataset.value);
          });

          return apuestasSeleccionadas;
      }
      
      function manejarApuesta(celda) {
          const montoCelda = obtenerMontoApuesta(celda); // Obtener el monto de la apuesta de la celda

          if (celda.classList.contains('selected')) {
              // Si ya está seleccionada, restamos la apuesta
              montoApuesta -= montoCelda;
              celda.classList.remove('selected'); // Deseleccionamos la celda
          } else {
              // Si no está seleccionada, sumamos la apuesta
              montoApuesta += montoCelda;
              celda.classList.add('selected'); // Seleccionamos la celda
          }

          // Actualizar el contador y el puntaje visualmente
          actualizarContadorApuesta();
          actualizarPuntaje();
      }
      function obtenerMontoApuesta(celda) {
          const valorApuesta = celda.dataset.value;
          return valorApuesta.match(/^\d+$/) ? 25 : 50; // Ajusta según el tipo de apuesta
      }
      function actualizarContadorApuesta() {
          contadorApuestaDiv.textContent = `Apuesta: ${montoApuesta} puntos`;
      }
      

      function mostrarResultado(numero) {
          const mensajeDiv = document.getElementById('mensaje');
          mensajeDiv.textContent = `¡El número ganador es el ${numero}!`;
          numeroGanador = numero; // Guardar el número ganador

          // Verificar las apuestas seleccionadas
          const seleccionados = document.querySelectorAll('.cell.selected');
          let puntajeGanado = 0;
          const apuestasGanadoras = [];

          seleccionados.forEach((apuesta) => {
              const valorApuesta = apuesta.dataset.value;
              let resultado = 'perder'; // Valor por defecto si la apuesta no coincide
              let montoApostado = 0;

              // Determinar el monto apostado según el tipo de apuesta
              if (valorApuesta.match(/^\d+$/)) {
                  montoApostado = 25; // Apuesta a número
              } else {
                  montoApostado = 50; // Apuestas a color, docena, par/impar, rango
              }

              // Verificar si la apuesta coincide con el número ganador
              if (
                  valorApuesta === numero || // Apuesta a un número específico
                  (valorApuesta === 'Rojo' && segmentos.find(seg => seg.numero === numero)?.color === '#e51c1c') || // Apuesta a Rojo
                  (valorApuesta === 'Negro' && segmentos.find(seg => seg.numero === numero)?.color === '#1a1a1a') || // Apuesta a Negro
                  (valorApuesta === 'Par' && numero % 2 === 0 && numero !== '0' && numero !== '00') || // Apuesta a Par
                  (valorApuesta === 'Impar' && numero % 2 !== 0) || // Apuesta a Impar
                  (valorApuesta === '1-18' && numero >= 1 && numero <= 18) || // Apuesta 1-18
                  (valorApuesta === '19-36' && numero >= 19 && numero <= 36) || // Apuesta 19-36
                  (valorApuesta === '1-12' && numero >= 1 && numero <= 12) || // Apuesta 1-12
                  (valorApuesta === '13-24' && numero >= 13 && numero <= 24) || // Apuesta 13-24
                  (valorApuesta === '25-36' && numero >= 25 && numero <= 36) || // Apuesta 25-36
                  (valorApuesta === '00' && numero === '00') // Apuesta al 00
              ) {
                  apuestasGanadoras.push(valorApuesta);
                  puntajeGanado += montoApostado; // Sumar puntaje por cada apuesta ganadora
                  resultado = 'ganar'; // Actualizamos el resultado si la apuesta es ganadora
              }

              // Actualizar puntaje en la base de datos por cada apuesta
              actualizarPuntajeBD(usuarioId, montoApostado, resultado); // Cambia el ID según sea necesario
          });

          // Actualizar puntaje total
          puntajeUsuario += puntajeGanado;
          actualizarPuntaje(); // Actualizar puntaje después de evaluar las apuestas

          // Mostrar las áreas ganadoras
          if (apuestasGanadoras.length > 0) {
              mensajeDiv.textContent += ` Ganaste con las apuestas: ${apuestasGanadoras.join(', ')}.`;
          } else {
              mensajeDiv.textContent += " No hubo apuestas ganadoras.";
          }

          // Esperar 5 segundos y luego recargar la página
          setTimeout(() => {
              // Enviar datos al servidor para registrar el resultado
              fetch("Ruleta.aspx/RegistrarNumeroGanador", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json; charset=utf-8"
                  },
                  body: JSON.stringify({ numeroGanador: numero, apuestasGanadoras: apuestasGanadoras })
              })
                  .then(response => response.json())
                  .then(data => {
                      const responseData = JSON.parse(data.d);
                      if (responseData.mensaje) {
                          console.log("Resultado registrado: " + responseData.mensaje);
                      } else {
                          console.error("Error en el formato de la respuesta del servidor:", data);
                      }
                  })
                  .catch(error => {
                      console.error("Error al registrar el resultado:", error);
                  });

              // Recargar la página después de 5 segundos
              location.reload(); // Recarga la página
          }, 7000); // 7 segundos de espera antes de refrescar la página
      }



      function actualizarPuntajeBD(idUsuario, puntajeApostado, resultado) {
          fetch("Ruleta.aspx/ActualizarPuntajeUsuario", {
              method: 'POST',
              body: JSON.stringify({
                  idUsuario: idUsuario,
                  apuesta: puntajeApostado, // Asegúrate de usar el nombre correcto
                  resultado: resultado
              }),
              headers: {
                  'Content-Type': 'application/json'
              }
          })
              .then(response => response.json())
              .then(data => {
                 
              })
              .catch(error => {
                  console.error('Error:', error);


              });
      }


      document.getElementById('girar').addEventListener('click', () => {
          // Deshabilitar el botón
          const botonGirar = document.getElementById('girar');
          botonGirar.disabled = true;

          // Llamar a la función para girar la ruleta
          girarRuleta();
      });

      dibujarRuleta();

      document.addEventListener('DOMContentLoaded', () => {
          obtenerPuntaje();
      });

      function obtenerPuntaje() {
          fetch("Ruleta.aspx/ObtenerPuntajeUsuario", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json; charset=utf-8"
              },
              body: JSON.stringify({ idUsuario: usuarioId }) // Añade el ID de usuario
          })
              .then(response => response.json())
              .then(data => {
                  // Establecer el puntaje inicial del usuario
                  puntajeUsuario = data.d; // Suponiendo que 'd' contiene el puntaje
                  actualizarPuntaje(0); // Muestra el puntaje en pantalla
              })
              .catch(error => {
                  console.error("Error al obtener el puntaje: ", error);
              });
      }
      function recopilarApuestas() {
          const apuestas = {
              Numero: [],
              Color: [],
              Docena: [],
              Paridad: [],
              Rango: []
          };

          const numerosSeleccionados = document.querySelectorAll('.cell.selected');
          numerosSeleccionados.forEach(celda => {
              const valor = celda.dataset.value;

              // Lógica para identificar y clasificar diferentes tipos de apuestas
              switch (true) {
                  case !isNaN(parseInt(valor)) && parseInt(valor) >= 0 && parseInt(valor) <= 36:
                      // Apuesta a número específico
                      apuestas.Numero.push(parseInt(valor));
                      break;

                  case valor === 'Rojo':
                      apuestas.Color.push(1); // 1 para Rojo
                      break;

                  case valor === 'Verde':
                      apuestas.Color.push(0); // 0 para Verde (cero)
                      break;

                  case valor === 'Negro':
                      apuestas.Color.push(2); // 2 para Negro
                      break;

                  case valor === '1-12':
                      apuestas.Docena.push(1); // Primera docena
                      break;

                  case valor === '13-24':
                      apuestas.Docena.push(2); // Segunda docena
                      break;

                  case valor === '25-36':
                      apuestas.Docena.push(3); // Tercera docena
                      break;

                  case valor === 'Par':
                      apuestas.Paridad.push(2); // Par
                      break;

                  case valor === 'Impar':
                      apuestas.Paridad.push(1); // Impar
                      break;

                  case valor === '1-18':
                      apuestas.Rango.push(1); // Rango bajo (1-18)
                      break;

                  case valor === '19-36':
                      apuestas.Rango.push(2); // Rango alto (19-36)
                      break;
              }
          });

          // Eliminar categorías vacías
          Object.keys(apuestas).forEach(key => {
              if (apuestas[key].length === 0) {
                  delete apuestas[key];
              }
          });

          return apuestas;
      }

      // Llama a la función para obtener el puntaje del usuario con ID 2
obtenerPuntaje(usuarioId);


      document.getElementById('girar').addEventListener('click', () => {
          // Deshabilitar el botón
          const botonGirar = document.getElementById('girar');
          botonGirar.disabled = true;

          // Llamar a la función para girar la ruleta
          girarRuleta();
      });
      
      function actualizarPuntaje() {
          const puntajeDiv = document.getElementById('puntaje');
          puntajeDiv.textContent = `Puntaje actual: ${puntajeUsuario}`;
          if (numeroGanador !== null) {
              puntajeDiv.textContent += ` | Último número ganador: ${numeroGanador}`; // Mostrar el número ganador
          }
      }
      function obtenerNumerosCalientes() {
          fetch("Ruleta.aspx/ObtenerNumCalientes", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json; charset=utf-8"
              }
          })
              .then(response => response.json())
              .then(data => {
                  const numerosCalientes = JSON.parse(data.d);
                  mostrarNumerosCalientes(numerosCalientes); // Función para mostrar los números calientes
              })
              .catch(error => {
                  console.error("Error al obtener los números calientes:", error);
              });
      }

      function obtenerNumerosFrios() {
          fetch("Ruleta.aspx/ObtenerNumFrios", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json; charset=utf-8"
              }
          })
              .then(response => response.json())
              .then(data => {
                  const numerosFrios = JSON.parse(data.d);
                  mostrarNumerosFrios(numerosFrios); // Función para mostrar los números fríos
              })
              .catch(error => {
                  console.error("Error al obtener los números fríos:", error);
              });
      }
      function mostrarNumerosCalientes(numeros) {
          const contenedorCalientes = document.getElementById('numerosCalientes');
          contenedorCalientes.innerHTML = ''; // Limpiar contenido previo
          numeros.forEach(numero => {
              const elemento = document.createElement('div');
              elemento.textContent = `${numero.Numero}`;
              contenedorCalientes.appendChild(elemento);
          });
      }

      function mostrarNumerosFrios(numeros) {
          const contenedorFrios = document.getElementById('numerosFrios');
          contenedorFrios.innerHTML = ''; // Limpiar contenido previo
          numeros.forEach(numero => {
              const elemento = document.createElement('div');
              elemento.textContent = `${numero.Numero}`;
              contenedorFrios.appendChild(elemento);
          });
      }

      // Llamadas a los procedimientos
      obtenerNumerosCalientes();
      obtenerNumerosFrios();

