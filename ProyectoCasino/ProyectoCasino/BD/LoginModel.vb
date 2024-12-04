Imports MySql.Data.MySqlClient
Imports System.Configuration
Public Class Usuario
    Public Property Id As Integer
    Public Property Nombre As String
    Public Property Correo As String
    Public Property Contrasena As String ' Si deseas incluir la contraseña también, aunque generalmente no es recomendable almacenarla directamente

    ' Constructor
    Public Sub New()
    End Sub
End Class

Public Class LoginModel

    ' Método para autenticar al usuario en la base de datos
    Public Function AutenticarUsuario(email As String, password As String) As Usuario
        Dim connectionString As String = ConfigurationManager.ConnectionStrings("MySqlConnectionString").ToString()
        Dim usuario As Usuario = Nothing

        Using conn As New MySqlConnection(connectionString)
            Using cmd As New MySqlCommand("AutenticarUsuario", conn)
                cmd.CommandType = CommandType.StoredProcedure
                cmd.Parameters.AddWithValue("correo_input", email) ' Asegúrate de que el nombre del parámetro coincida
                cmd.Parameters.AddWithValue("contrasena_input", password) ' Asegúrate de que el nombre del parámetro coincida

                Try
                    conn.Open()
                    Using reader As MySqlDataReader = cmd.ExecuteReader()
                        If reader.Read() Then
                            ' Si el usuario es encontrado, crear un objeto Usuario
                            usuario = New Usuario()
                            usuario.Id = Convert.ToInt32(reader("id"))
                            usuario.Nombre = reader("nombre").ToString()
                            usuario.Correo = reader("email").ToString() ' Cambia "correo" a "email" para que coincida con tu SELECT
                        End If
                    End Using
                Catch ex As Exception
                    ' Manejar errores
                    Console.WriteLine("Error: " & ex.Message)
                End Try
            End Using
        End Using

        Return usuario
    End Function


End Class
