<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Ruleta.aspx.vb" Inherits="ProyectoCasino.Ruleta1" %>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tablero de Ruleta</title>
  <link rel="stylesheet" href="Estilos/Ruleta.css">
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
                <a href="TragaMonedas.aspx?usuarioId=<%= Request.QueryString("usuarioId") %>">Tragamonedas</a>
            </li>
            <li>
                <a href="Leaderboard.aspx?usuarioId=<%= Request.QueryString("usuarioId") %>">Tabla de Puntuaciones</a>
            </li>
        </ul>
        <form method="post" runat="server" class="logout-form">
            <asp:Button ID="btnCerrarSesion" runat="server" Text="Cerrar Sesión" OnClick="CerrarSesion" CssClass="logout-button" />
        </form>
    </nav>
  <h1>Tablero de Apuestas de la Ruleta</h1>
    
    
  <div class="container">
    
    <!-- Tablero de apuestas -->
    <div class="roulette-board" id="rouletteBoard">
        
        
      <div class="cell green" style="grid-row: span 3;" data-value="0">0</div>
      <!-- Fila 1 -->
      <div class="cell red" data-value="3">3</div>
      <div class="cell black" data-value="6">6</div>
      <div class="cell red" data-value="9">9</div>
      <div class="cell black" data-value="12">12</div>
      <div class="cell red" data-value="15">15</div>
      <div class="cell black" data-value="18">18</div>
      <div class="cell red" data-value="21">21</div>
      <div class="cell black" data-value="24">24</div>
      <div class="cell red" data-value="27">27</div>
      <div class="cell black" data-value="30">30</div>
      <div class="cell red" data-value="33">33</div>
      <div class="cell black" data-value="36">36</div>
      
      <!-- Fila 2 -->
      <div class="cell black" data-value="2">2</div>
      <div class="cell red" data-value="5">5</div>
      <div class="cell black" data-value="8">8</div>
      <div class="cell red" data-value="11">11</div>
      <div class="cell black" data-value="14">14</div>
      <div class="cell red" data-value="17">17</div>
      <div class="cell black" data-value="20">20</div>
      <div class="cell red" data-value="23">23</div>
      <div class="cell black" data-value="26">26</div>
      <div class="cell red" data-value="29">29</div>
      <div class="cell black" data-value="32">32</div>
      <div class="cell red" data-value="35">35</div>
      <!-- Fila 3 -->
      <div class="cell red" data-value="1">1</div>
      <div class="cell black" data-value="4">4</div>
      <div class="cell red" data-value="7">7</div>
      <div class="cell black" data-value="10">10</div>
      <div class="cell red" data-value="13">13</div>
      <div class="cell black" data-value="16">16</div>
      <div class="cell red" data-value="19">19</div>
      <div class="cell black" data-value="22">22</div>
      <div class="cell red" data-value="25">25</div>
      <div class="cell black" data-value="28">28</div>
      <div class="cell red" data-value="31">31</div>
      <div class="cell black" data-value="34">34</div>
      <div class="cell green" style="grid-row: span 2;" data-value="0">00</div>
      <!-- Áreas de apuestas -->
      
      <div class="cell betting-area" style="grid-column: span 4;" data-value="1-12">Primera docena</div>
      <div class="cell betting-area" style="grid-column: span 4;" data-value="13-24">Segunda docena</div>
      <div class="cell betting-area" style="grid-column: span 4;" data-value="25-36">Tercera docena</div>
      <div class="cell betting-area" style="grid-column: span 2;" data-value="1-18">1 a 18</div>

      <div class="cell betting-area" style="grid-column: span 2;" data-value="Par">Par</div>
      <div class="cell betting-area" style="grid-column: span 2;" data-value="Rojo">Rojo</div>
      <div class="cell betting-area" style="grid-column: span 2;" data-value="Ngro">Negro</div>

      <div class="cell betting-area" style="grid-column: span 2;" data-value="Impar">Impar</div>
      <div class="cell betting-area" style="grid-column: span 2;" data-value="19-26">19 a 36</div>


    </div>
      


    <!-- Ruleta -->
    <div class="ruleta-container">
  <div class="ruleta" id="ruleta">
    <canvas width="400" height="400"></canvas>
    <div class="flecha"></div>
  </div>
  <button id="girar" class="mt-4">Girar Ruleta</button>
</div>

<div class="numeros-container">
  <div class="numeros-section">
    <h3>Calientes</h3>
    <div id="numerosCalientes">
      <!-- Aquí se mostrarán los números calientes -->
    </div>
  </div>
  
  <div class="numeros-section">
    <h3>Fríos</h3>
    <div id="numerosFrios">
      <!-- Aquí se mostrarán los números fríos -->
    </div>
  </div>
</div>

  </div>
   <div class="puntaje" id="puntaje"></div>
<div id="contadorApuesta">Apuesta: 0 puntos</div>
  <div class="mensaje" id="mensaje"></div>
 <script type="" src="Js/Ruleta.js"></script>
</body>
</html>