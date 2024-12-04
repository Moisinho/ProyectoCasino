<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Inicio.aspx.vb" Inherits="ProyectoCasino.Inicio" %>

<!DOCTYPE html>
<html lang="en">
<head runat="server">
    <meta charset="utf-8" />
    <title>Casino Options</title>
    <style>
        body {
            font-family: Verdana, sans-serif;
            background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
            color: white;
            margin: 0;
            padding: 0;
        }
        .banner-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 100px;
            margin-bottom: 40px;
            gap: 30px;
        }
        .banner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 650px;
            height: 180px;
            border-radius: 10px;
            color: white;
            padding: 15px 25px;
            position: relative;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
            transition: transform 0.3s;
        }
        .banner:hover {
            transform: scale(1.05);
        }
        .banner .content {
            max-width: 60%;
            margin-top:auto;
            margin-bottom:auto;
        }
        .banner .content .title {
            font-family: "Playfair Display", serif;
            font-size: 30px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.7); /* Sombra más pronunciada */
            color: white;
            background: linear-gradient(to right, #ffcc00, #ff6600); /* Gradiente cálido */
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .banner .content .description {
            font-family: "Poppins", sans-serif;
            font-size: 18px;
            font-weight: 300; /* Ligera para contraste */
            color: #f0f0f0;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6); /* Sombra suave */
            line-height: 1.5; /* Espaciado cómodo */
        }
        .banner img {
            border-radius: 10px;
        }
        /* Ajuste del tamaño de las imágenes */
        .roulette img, .slots img {
            height: 120%;
            width: auto;
        }
        .leaderboard img {
            height: 100%;
            width: auto;
        }
        .roulette {
            background: linear-gradient(135deg, #43cea2, #185a9d);
        }
        .slots {
            background: linear-gradient(135deg, #f45c43, #eb3349);
        }
        .leaderboard {
            background: linear-gradient(135deg, #36d1dc, #5b86e5);
        }
        .navbar {
            background-color: #333;
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
        }

        .nav-links {
            list-style: none;
            display: flex;
            margin: 0;
            padding: 0;
        }

            .nav-links li {
                margin: 0 15px;
            }

            .nav-links a {
                text-decoration: none;
                color: white;
                font-weight: bold;
                transition: color 0.3s;
            }

                .nav-links a:hover {
                    color: #00bfff;
                }

        .logout-form {
            margin: 0;
        }

        .logout-button {
            background-color: #ff4d4d;
            border: none;
            color: white;
            padding: 10px 15px;
            font-size: 14px;
            cursor: pointer;
            border-radius: 5px;
            transition: background-color 0.3s;
        }

    .logout-button:hover {
        background-color: #cc0000;
    }

    </style>
</head>
<body>

    <form id="form1" runat="server">
        <!-- Navbar -->
        <nav class="navbar">
            <ul class="nav-links">
                <!-- Aquí puedes agregar más enlaces si es necesario -->
            </ul>
            <!-- Botón de Cerrar Sesión -->
            <asp:Button ID="btnCerrarSesion" runat="server" Text="Cerrar Sesión" OnClick="CerrarSesion" CssClass="logout-button" />
        </nav>
        
        <div class="banner-container">
                    <h1>Casino Pacoren</h1>

            <!-- Redirección a Ruleta pasando el usuarioId -->
            <div class="banner roulette" onclick="window.location.href='Ruleta.aspx?usuarioId=<%= Request.QueryString("usuarioId") %>'">
                <div class="content">
                    <span class="title">Juega a la Ruleta</span>
                    <p class="description">Gira la rueda de la fortuna y prueba tu suerte para ganar en grande.</p>
                    <p class="description">¡Que comience la emoción!</p>
                </div>
                <img src="/Img/Ruleta.png" alt="Roulette Image" />
            </div>
    
            <!-- Redirección a TragaMonedas pasando el usuarioId -->
            <div class="banner slots" onclick="window.location.href='TragaMonedas.aspx?usuarioId=<%= Request.QueryString("usuarioId") %>'">
                <div class="content">
                    <span class="title">Máquinas Tragamonedas</span>
                    <p class="description">Disfruta de la emoción de probar tu suerte y perseguir los grandes premios.</p>
                    <p class="description">¡Es tu momento de brillar!</p>
                </div>
                <img src="/Img/Slot_Machine.png" alt="Slots Image" />
            </div>
    
            <!-- Redirección a Leaderboard pasando el usuarioId -->
            <div class="banner leaderboard" onclick="window.location.href='Leaderboard.aspx?usuarioId=<%= Request.QueryString("usuarioId") %>'">
                <div class="content">
                    <span class="title">Tabla de Puntuaciones</span>
                    <p class="description">Echa un vistazo a los mejores jugadores y ve si puedes escalar hasta la cima.</p>
                    <p class="description">¡El desafío te espera!</p>
                </div>
                <img src="/Img/Ganador.png" alt="Leaderboard Image" />
            </div>
        </div>
    </form>
</body>
</html>
