Imports System.Data.SqlClient
Imports System.Text.RegularExpressions ' Necesario para usar Regex

Public Class Registro
    Inherits System.Web.UI.Page

    Protected Sub IrAInicioSesion(ByVal sender As Object, ByVal e As EventArgs)
        ' Redirigir al usuario a la página de inicio de sesión
        Response.Redirect("UserLogin.aspx")
    End Sub

    Protected Sub RegistrarUsuario(ByVal sender As Object, ByVal e As EventArgs)
        Dim nombre As String = txtNombre.Text.Trim()
        Dim email As String = txtCorreo.Text.Trim()
        Dim password As String = txtContrasena.Text.Trim()

        ' Validar campos vacíos
        If String.IsNullOrEmpty(nombre) Then
            lblNombreError.Text = "El nombre es obligatorio."
            lblNombreError.Visible = True
            Return
        End If

        If String.IsNullOrEmpty(email) Then
            lblCorreoError.Text = "El correo electrónico es obligatorio."
            lblCorreoError.Visible = True
            Return
        End If

        ' Validar formato del correo electrónico
        If Not IsValidEmail(email) Then
            lblCorreoError.Text = "El correo electrónico no tiene un formato válido."
            lblCorreoError.Visible = True
            Return
        End If

        If String.IsNullOrEmpty(password) Then
            lblContrasenaError.Text = "La contraseña es obligatoria."
            lblContrasenaError.Visible = True
            Return
        End If

        ' Llamar al modelo para registrar usuario
        Dim usuarioModel As New UsuarioModel()
        Dim usuario As Usuario = usuarioModel.RegistrarUsuario(nombre, email, password)

        If usuario IsNot Nothing Then
            ' Establecer sesión con el usuario registrado
            Session("UsuarioId") = usuario.Id
            Session("UsuarioNombre") = usuario.Nombre

            ' Redirigir a la página de inicio pasando el ID de usuario en la URL
            Response.Redirect("Inicio.aspx?usuarioId=" & usuario.Id)
        Else
            ' Mostrar mensaje de error
            lblMensajeRegistro.Text = "El usuario ya existe o ocurrió un error durante el registro."
            lblMensajeRegistro.ForeColor = System.Drawing.Color.Red
            lblMensajeRegistro.Visible = True
        End If
    End Sub

    ' Función para validar el correo electrónico con expresión regular
    Private Function IsValidEmail(ByVal email As String) As Boolean
        Dim regex As New Regex("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
        Return regex.IsMatch(email)
    End Function

End Class
