<%@ Page Language="VB" AutoEventWireup="false" CodeBehind="TragaMonedas.aspx.vb" Inherits="ProyectoCasino.TragaMonedas" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Máquina Tragamonedas</title>
    
    <!-- Agregar el archivo JS -->
    <script src="Js/TragaMonedas.js" type=""></script>
    <link rel="stylesheet" href="Estilos/TragaMonedas.css">
</head>
<body>
    <nav class="navbar">
        <ul class="nav-links">
            <!-- Enlace al Menú con usuarioId -->
            <li>
                <a href="Inicio.aspx?usuarioId=<%= Request.QueryString("usuarioId") %>">Ir al Menú</a>
            </li>
            <!-- Enlace a otras páginas -->
            <li>
                <a href="Ruleta.aspx?usuarioId=<%= Request.QueryString("usuarioId") %>">Ruleta</a>
            </li>
            <li>
                <a href="Leaderboard.aspx?usuarioId=<%= Request.QueryString("usuarioId") %>">Tabla de Puntuaciones</a>
            </li>
        </ul>
        <form method="post" runat="server" class="logout-form">
            <asp:Button ID="btnCerrarSesion" runat="server" Text="Cerrar Sesión" OnClick="CerrarSesion" CssClass="logout-button" />
        </form>
    </nav>

    <div class="container">
        <!-- Máquina tragamonedas -->
        <div class="slot-machine">
            <header class="header">
                <div class="coins">💰 <span id="credits"></span></div>
                <div class="buy-coins">TragaMonedas</div>
                <div class="menu">☰</div>
            </header>

            <div class="reels">
                <div class="reel" id="reel1">
                    <div class="symbol">💎</div>
                    <div class="symbol">🍋</div>
                    <div class="symbol">💣</div>
                </div>
                <div class="reel" id="reel2">
                    <div class="symbol">🍒</div>
                    <div class="symbol">💣</div>
                    <div class="symbol">🔔</div>
                </div>
                <div class="reel" id="reel3">
                    <div class="symbol">🍇</div>
                    <div class="symbol">W</div>
                    <div class="symbol">🍒</div>
                </div>
            </div>

            <div class="controls">
                <div class="win">Win: <span id="win-amount">0</span></div>
                <div class="bets">
                    <input type="number" id="betAmountInput" min="1" placeholder="Introduce tu apuesta" />
                    <div id="winAmountDisplay"></div>
                </div>
                <button id="btnGirar">Girar</button>
            </div>
        </div>

        <!-- Tabla de símbolos al lado de la máquina -->
        <div id="symbolTableContainer">
            <h2>Tabla de Símbolos</h2>
            <table id="symbolTable">
                <thead>
                    <tr>
                        <th>Símbolo</th>
                        <th>Miltiplicador</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>🍋</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>🍇</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>🍒</td>
                        <td>15</td>
                    </tr>
                    <tr>
                        <td>🔔</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <td>💎</td>
                        <td>50</td>
                    </tr>
                    <tr>
                        <td>WIN</td>
                        <td>100 (Ganancia)</td>
                    </tr>
                    <tr>
                        <td>💣</td>
                        <td>-10 (Pérdida)</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <script src="Js/TragaMonedas.js"></script>
</body>
</html>
