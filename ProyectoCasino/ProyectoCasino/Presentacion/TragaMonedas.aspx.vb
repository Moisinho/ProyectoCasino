Imports Newtonsoft.Json
Imports System.Web.Services

Public Class TragaMonedas
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As EventArgs) Handles Me.Load
        If Not IsPostBack Then
            Dim usuarioId As String = Request.QueryString("usuarioId")

            If String.IsNullOrEmpty(usuarioId) Then
                ' Redirigir al login si no hay usuarioId
                Response.Redirect("UserLogin.aspx")
            End If
        End If
    End Sub

    <WebMethod()>
    Public Shared Function ActualizarPuntajeUsuario(ByVal idUsuario As Integer, ByVal apuesta As Integer, ByVal resultado As String) As String
        Try
            ' Crear una instancia del modelo Usuario
            Dim usuario As New UsuarioModel()

            ' Llamar a la función para actualizar el puntaje
            usuario.ActualizarPuntajeUsuario(idUsuario, apuesta, resultado)

            ' Retornar un mensaje de éxito
            Dim respuesta As New With {.mensaje = "Puntaje actualizado correctamente."}
            Return JsonConvert.SerializeObject(respuesta)

        Catch ex As Exception
            ' Manejar excepciones y devolver el error como JSON
            Dim respuesta As New With {.mensaje = "Error: " & ex.Message}
            Return JsonConvert.SerializeObject(respuesta)
        End Try
    End Function
    <System.Web.Services.WebMethod()>
    Public Shared Function ObtenerPuntajeUsuario(idUsuario) As Integer
        Dim usuarioModel As New UsuarioModel()
        ' Obtener el puntaje y devolverlo como un número entero
        Return usuarioModel.ObtenerPuntajeUsuario(idUsuario) ' ID del usuario 7
    End Function

    Protected Sub CerrarSesion(ByVal sender As Object, ByVal e As EventArgs)
        ' Limpiar la sesión
        Session.Clear()
        Session.Abandon()

        ' Redirigir al inicio de sesión
        Response.Redirect("UserLogin.aspx")
    End Sub
End Class
