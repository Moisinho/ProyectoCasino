<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Leaderboard.aspx.vb" Inherits="ProyectoCasino.Leaderboard" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <title>LeaderBoards</title>
</head>
<body class="bg-green-600">
    <!-- Navbar -->
<!-- Navbar -->
<nav class="bg-gray-800 text-white flex justify-between items-center p-4 fixed top-0 left-0 right-0 z-50">
    <ul class="list-none flex m-0 p-0">
        <!-- Enlace al Menú con usuarioId -->
        <li class="mx-4">
            <a href="Inicio.aspx?usuarioId=<%= Request.QueryString("usuarioId") %>" class="text-white font-bold hover:text-blue-400 transition-colors duration-300">Ir al Menú</a>
        </li>
        <!-- Enlace a otras páginas -->
        <li class="mx-4">
            <a href="Ruleta.aspx?usuarioId=<%= Request.QueryString("usuarioId") %>" class="text-white font-bold hover:text-blue-400 transition-colors duration-300">Ruleta</a>
        </li>
        <li class="mx-4">
            <a href="TragaMonedas.aspx?usuarioId=<%= Request.QueryString("usuarioId") %>" class="text-white font-bold hover:text-blue-400 transition-colors duration-300">Tragamonedas</a>
        </li>
    </ul>
    <form method="post" runat="server" class="m-0">
        <asp:Button ID="btnCerrarSesion" runat="server" Text="Cerrar Sesión" 
            CssClass="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors duration-300 cursor-pointer" 
            OnClick="CerrarSesion" />
    </form>
</nav>


    <!-- Main content -->
    <main class="p-8 text-white mt-12">
        <!-- Encabezado -->
        <h1 class="text-3xl font-bold text-center mb-8">Mejores Clasificados 🏆</h1>

        <h1 class="text-3xl font-bold text-center mb-8">Premio: Kia picanto </h1>
        
        <!-- Contador -->
        <div class="text-center text-xl mb-8">
            <p>Tiempo restante hasta ganar el premio:</p>
            <p id="contador" class="font-bold text-2xl"></p>
        </div>


        <!-- Contenedor de Tablas -->
        <div class="flex flex-wrap gap-4 justify-center">
            <!-- Tabla: Máximo Puntaje General -->
            <section class="flex-1 min-w-[300px]">
                <div class="overflow-x-auto">
                    <table class="table-auto w-full border-collapse border-4 border-black bg-red-900">
                        <thead class="bg-red-700 text-white">
                            <tr>
                                <th colspan="2" class="border-2 border-black px-4 py-2 text-center text-2xl font-semibold">General</th>
                            </tr>
                            <tr>
                                <th class="border-2 border-black px-4 py-2">Usuario</th>
                                <th class="border-2 border-black px-4 py-2">Créditos</th>
                            </tr>
                        </thead>
                        <tbody id="tablaGeneral">
                            <!-- Los datos se insertarán aquí con JS -->
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    </main>

    <script src="Js/Leaderboard.js"></script> 
<script>
    // JavaScript para el contador
    const contador = document.getElementById('contador');

    // Establecer la fecha límite al 3 de diciembre de 2024 a las 00:00:00
    const fechaLimite = new Date("2024-12-03T00:00:00");

    function actualizarContador() {
        const ahora = new Date();
        const tiempoRestante = fechaLimite - ahora;

        if (tiempoRestante <= 0) {
            contador.textContent = "¡El premio ha expirado!";
            clearInterval(intervalo);
            return;
        }

        const dias = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24));
        const horas = Math.floor((tiempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

        contador.textContent = `${dias} días, ${horas} horas, ${minutos} minutos, ${segundos} segundos`;
    }

    const intervalo = setInterval(actualizarContador, 1000);
</script>

</body>
</html>
