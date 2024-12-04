Imports System.Web.Services
Imports Newtonsoft.Json

Public Class Leaderboard
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

    <System.Web.Services.WebMethod()>
    Public Shared Function ObtenerLeaderboardGeneral() As String
        Try
            ' Llamar al método del modelo para obtener el leaderboard
            Dim leaderboard As List(Of Dictionary(Of String, Object)) = LeaderboardModel.ObtenerLeaderGeneral()

            ' Crear un objeto que contenga la propiedad 'jugadores'
            Dim respuesta As New With {.jugadores = leaderboard}

            ' Serializar el objeto completo a JSON
            Dim respuestaJson As String = JsonConvert.SerializeObject(respuesta)

            Return respuestaJson
        Catch ex As Exception
            ' En caso de error, devolver el mensaje de error en formato JSON
            Return JsonConvert.SerializeObject(New With {.error = ex.Message})
        End Try
    End Function

    Protected Sub CerrarSesion(ByVal sender As Object, ByVal e As EventArgs)
        ' Limpiar la sesión
        Session.Clear()
        Session.Abandon()

        ' Redirigir al inicio de sesión
        Response.Redirect("UserLogin.aspx")
    End Sub
End Class


