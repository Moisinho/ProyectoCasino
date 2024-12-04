<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="UserLogin.aspx.vb" Inherits="ProyectoCasino.UserLogin" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" href="Estilos/Login.css" />
    <title>Login</title>
</head>
<body>
    <div class="login-container">
        <h1>Casino Pacoren</h1>
        <form id="loginForm" runat="server">
            <!-- Campo de correo -->
            <asp:TextBox ID="txtEmail" runat="server" CssClass="form-control" placeholder="Correo electrónico" />
            <asp:Label ID="lblEmailError" runat="server" ForeColor="Red" Visible="False"></asp:Label>

            <!-- Campo de contraseña -->
            <asp:TextBox ID="txtPassword" runat="server" CssClass="form-control" TextMode="Password" placeholder="Contraseña" />
            <asp:Label ID="lblPasswordError" runat="server" ForeColor="Red" Visible="False"></asp:Label>

            <!-- Botón de submit -->
            <asp:Button ID="btnLogin" runat="server" Text="Iniciar Sesión" CssClass="btn" OnClick="AutenticarUsuario" />
            <asp:Button ID="btnRegistro" runat="server" Text="Registrarse" CssClass="btn" OnClick="IrARegistro" />
        </form>

        
    </div>
</body>
</html>
