<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Registro.aspx.vb" Inherits="ProyectoCasino.Registro" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Registro de Usuario</title>
    <link rel="stylesheet" href="Estilos/Registro.css" />
</head>
<body>
    <div class="login-container">
        <h1>Registro de Usuario</h1>
        <form id="registerForm" runat="server">
            <!-- Campo de Nombre -->
            <asp:TextBox ID="txtNombre" runat="server" CssClass="form-control" placeholder="Nombre Completo" />
            <asp:Label ID="lblNombreError" runat="server" ForeColor="Red" Visible="False"></asp:Label>

            <!-- Campo de Correo -->
            <asp:TextBox ID="txtCorreo" runat="server" CssClass="form-control" placeholder="Correo Electrónico" />
            <asp:Label ID="lblCorreoError" runat="server" ForeColor="Red" Visible="False"></asp:Label>

            <!-- Campo de Contraseña -->
            <asp:TextBox ID="txtContrasena" runat="server" CssClass="form-control" TextMode="Password" placeholder="Contraseña" />
            <asp:Label ID="lblContrasenaError" runat="server" ForeColor="Red" Visible="False"></asp:Label>

            <!-- Botón de Registro -->
            <asp:Button ID="btnRegistrar" runat="server" Text="Registrar" CssClass="btn" OnClick="RegistrarUsuario" />

            <!-- Mensaje de Éxito/Error -->
            
            <asp:Button ID="btnIniciarSesion" runat="server" Text="Iniciar Sesión" CssClass="btn" OnClick="IrAInicioSesion" />
            <div>
                <asp:Label ID="lblMensajeRegistro" runat="server" CssClass="alert success" Visible="False"></asp:Label>
            </div>
            
        </form>
    </div>
</body>