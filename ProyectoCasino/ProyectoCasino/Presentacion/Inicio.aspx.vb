Public Class Inicio
    Inherits System.Web.UI.Page
    Dim usuarioId As String

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As EventArgs) Handles Me.Load
        ' Verificamos si el parámetro "usuarioId" existe en la URL
        If Not IsNothing(Request.QueryString("usuarioId")) Then
            ' Si existe, lo asignamos a la variable usuarioId
            usuarioId = Request.QueryString("usuarioId")
        Else
            ' Si no existe, puedes manejarlo de alguna manera, por ejemplo, redirigiendo a otra página
            Response.Redirect("Login.aspx")
        End If
    End Sub

    Protected Sub CerrarSesion(ByVal sender As Object, ByVal e As EventArgs)
        ' Limpiar la sesión
        Session.Clear()
        Session.Abandon()

        ' Redirigir al inicio de sesión
        Response.Redirect("UserLogin.aspx")
    End Sub
End Class