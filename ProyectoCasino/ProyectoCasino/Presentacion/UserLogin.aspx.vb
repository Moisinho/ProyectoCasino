Imports MySql.Data.MySqlClient
Imports System.Configuration

Public Class UserLogin
    Inherits System.Web.UI.Page

    Protected Sub IrARegistro(ByVal sender As Object, ByVal e As EventArgs)
        ' Redirigir al usuario a la página de inicio de sesión
        Response.Redirect("Registro.aspx")
    End Sub

    Protected Sub AutenticarUsuario(ByVal sender As Object, ByVal e As EventArgs)
        Dim email As String = txtEmail.Text.Trim()
        Dim password As String = txtPassword.Text.Trim()

        ' Validar que los campos no estén vacíos
        If String.IsNullOrEmpty(email) Then
            lblEmailError.Text = "El correo electrónico es obligatorio."
            lblEmailError.Visible = True
            Return
        End If

        If String.IsNullOrEmpty(password) Then
            lblPasswordError.Text = "La contraseña es obligatoria."
            lblPasswordError.Visible = True
            Return
        End If

        ' Instancia del modelo para autenticar
        Dim loginModel As New LoginModel()
        Dim usuario As Usuario = loginModel.AutenticarUsuario(email, password)

        If usuario IsNot Nothing Then
            Session("UsuarioId") = usuario.Id
            Session("UsuarioNombre") = usuario.Nombre

            ' Redirigir a la página de inicio pasando el ID de usuario en la URL
            Response.Redirect("Inicio.aspx?usuarioId=" & usuario.Id)
        Else
            ' Mostrar mensaje de error si la autenticación falla
            lblEmailError.Text = "Credenciales incorrectas. Inténtalo de nuevo."
            lblEmailError.Visible = True
        End If
    End Sub
End Class
