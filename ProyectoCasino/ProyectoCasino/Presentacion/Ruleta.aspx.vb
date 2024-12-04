Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports Newtonsoft.Json
Public Class Ruleta1
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
    Public Shared Function ActualizarPuntajeUsuario(ByVal idUsuario As Integer, ByVal apuesta As Integer, ByVal resultado As String) As String
        Try
            ' Crear una instancia del modelo Usuario
            Dim usuario As New UsuarioModel()

            ' Llamar a la función para actualizar el puntaje
            usuario.ActualizarPuntajeUsuario(idUsuario, apuesta, resultado)

            ' Crear el objeto de respuesta
            Dim respuesta As New With {.mensaje = "Número ganador registrado correctamente"}

            ' Serializar el objeto a JSON y devolverlo como respuesta
            Return JsonConvert.SerializeObject(respuesta)
        Catch ex As Exception
            ' Manejar excepciones y devolver el error como JSON
            Dim respuesta As New With {.mensaje = "Error: " & ex.Message}
            Return JsonConvert.SerializeObject(respuesta)
        End Try
    End Function

    <System.Web.Services.WebMethod()>
    Public Shared Function RegistrarNumeroGanador(ByVal numeroGanador As String) As String
        Try
            Dim ruleta As New RuletaModel()
            ruleta.GuardarNumeroGanador(Integer.Parse(numeroGanador))

            ' Usar JsonConvert para serializar la respuesta
            Dim respuesta As New With {.mensaje = "Número ganador registrado correctamente"}

            ' Retornar el objeto como JSON
            Return JsonConvert.SerializeObject(respuesta)
        Catch ex As Exception
            ' Manejar excepciones y devolver el error como JSON
            Dim respuesta As New With {.mensaje = "Error: " & ex.Message}
            Return JsonConvert.SerializeObject(respuesta)
        End Try
    End Function

    <System.Web.Services.WebMethod()>
    Public Shared Function ObtenerPuntajeUsuario(idUsuario As Integer) As Integer
        Dim usuarioModel As New UsuarioModel()
        ' Obtener el puntaje y devolverlo como un número entero
        Return usuarioModel.ObtenerPuntajeUsuario(idUsuario) ' ID del usuario 7
    End Function

    <System.Web.Services.WebMethod()>
    Public Shared Function ObtenerNumCalientes() As String
        Try
            Dim numerosCalientes As List(Of Integer) = RuletaModel.ObtenerNumCalientes()
            Return Newtonsoft.Json.JsonConvert.SerializeObject(numerosCalientes.Select(Function(n) New With {.Numero = n, .Frecuencia = 1})) ' Asumiendo frecuencia como 1
        Catch ex As Exception
            ' Manejo de errores
            Return Newtonsoft.Json.JsonConvert.SerializeObject(New With {.error = ex.Message})
        End Try
    End Function

    <System.Web.Services.WebMethod()>
    Public Shared Function ObtenerNumFrios() As String
        Try
            Dim numerosFrios As List(Of Integer) = RuletaModel.ObtenerNumFrios()
            Return Newtonsoft.Json.JsonConvert.SerializeObject(numerosFrios.Select(Function(n) New With {.Numero = n, .Frecuencia = 1})) ' Asumiendo frecuencia como 1
        Catch ex As Exception
            ' Manejo de errores
            Return Newtonsoft.Json.JsonConvert.SerializeObject(New With {.error = ex.Message})
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
