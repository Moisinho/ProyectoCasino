<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Presentacion.aspx.vb" Inherits="ProyectoCasino.Presentacion" %>

<!DOCTYPE html>
<html lang="es">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Presentación Proyecto Semestral</title>
    <link rel="stylesheet" type="text/css" href="Presentacion/Estilos/Presentacion.css" />
</head>
<body>
    <form id="form1" runat="server">
        <div class="container">
            <div class="header">
                <img class="left-img" src="Img/logo-utp.png" alt="Imagen Izquierda" />
                <h1>UNIVERSIDAD TECNOLÓGICA DE PANAMÁ</h1>
                <img class="right-img" src="Img/logo-fisc.png" alt="Imagen Derecha" />
            </div>

            <h2>FACULTAD DE INGENIERÍA DE SISTEMAS COMPUTACIONALES</h2>
            <h3>LICENCIATURA EN DESARROLLO DE SOFTWARE</h3>
            <h4>DESARROLLO DE SOFTWARE VIII</h4>
            <p><strong>Rodrigo Yánguez</strong></p>
            <p><strong>PROYECTO SEMESTRAL</strong></p>
            <p><strong>DESARROLLO DE UN SISTEMA DE CASINO</strong></p>

            <div class="members-list">
                <p><strong>Integrantes:</strong></p>
                <ul>
                    <li>Arevalo, Odeth - 20-53-7507</li>
                    <li>Barrios, Fernando - 8-1002-1207</li>
                    <li>Betancourt, Moisés - 20-70-7371</li>
                    <li>Pan, Freddy - 8-981-989</li>
                    <li>Vásquez, Gerardo - 8-1002-2180</li>
                </ul>
            </div>

            <p><strong>Grupo:</strong> 1LS131</p>
            <p><strong>Fecha:</strong> 02/12/2024</p>

            <!-- Botón al final del contenedor -->
            <div id="button-div">
                <a href="/Presentacion/UserLogin.aspx" class="start-button">Iniciar</a>
            </div>
        </div>
    </form>
</body>
</html>

