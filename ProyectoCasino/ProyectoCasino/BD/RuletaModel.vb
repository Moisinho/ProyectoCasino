Imports System.Configuration
Imports System.Data.SqlClient
Imports System.Web.Script.Serialization
Imports MySql.Data.MySqlClient

Imports Newtonsoft.Json ' Asegúrate de agregar este import

Public Class RuletaModel

    Public Function GuardarNumeroGanador(ganador As Integer) As String
        ' Recuperar la cadena de conexión desde el web.config
        Dim connectionString As String = ConfigurationManager.ConnectionStrings("MySqlConnectionString").ToString()

        Using connection As New MySqlConnection(connectionString)
            Try
                ' Conectar a la base de datos
                connection.Open()

                ' Preparar la consulta para insertar el número ganador en la tabla NumerosGanadoresRuleta
                Dim query As String = "INSERT INTO NumerosGanadoresRuleta (numero_ganador) VALUES (@NumeroGanador)"
                Using command As New MySqlCommand(query, connection)
                    command.Parameters.AddWithValue("@NumeroGanador", ganador)
                    command.ExecuteNonQuery()
                End Using

                ' Si todo salió bien, devolver una respuesta exitosa
                Dim respuesta As New With {.mensaje = "Número ganador registrado correctamente"}
                ' Retornar el éxito como JSON
                Return JsonConvert.SerializeObject(respuesta)
            Catch ex As MySqlException
                ' Si ocurre un error, mostrar el mensaje de error
                Dim respuesta As New With {.mensaje = "Error al conectar o ejecutar la consulta: " & ex.Message}
                ' Retornar el error como JSON para ser visible en el cliente
                Return JsonConvert.SerializeObject(respuesta)
            Catch ex As Exception
                ' Manejar errores generales
                Dim respuesta As New With {.mensaje = "Error desconocido: " & ex.Message}
                ' Retornar el error como JSON para ser visible en el cliente
                Return JsonConvert.SerializeObject(respuesta)
            End Try
        End Using
    End Function
    Public Shared Function ObtenerNumCalientes() As List(Of Integer)
        Dim connectionString As String = ConfigurationManager.ConnectionStrings("MySqlConnectionString").ToString()
        Dim numerosCalientes As New List(Of Integer)()

        Using conn As New MySqlConnection(connectionString)
            Using cmd As New MySqlCommand("ObtenerNumerosCalientes", conn)
                cmd.CommandType = CommandType.StoredProcedure

                Try
                    conn.Open()
                    Using reader As MySqlDataReader = cmd.ExecuteReader()
                        While reader.Read()
                            ' Asumiendo que el primer campo es el número caliente
                            numerosCalientes.Add(reader.GetInt32(0)) ' Cambia el índice según la columna
                        End While
                    End Using
                Catch ex As Exception
                    ' Manejar la excepción (log, mostrar mensaje, etc.)
                End Try
            End Using
        End Using
        Return numerosCalientes
    End Function


    Public Shared Function ObtenerNumFrios() As List(Of Integer)
        Dim connectionString As String = ConfigurationManager.ConnectionStrings("MySqlConnectionString").ToString()
        Dim numerosFrios As New List(Of Integer)() ' Cambiado a numerosFrios

        Using conn As New MySqlConnection(connectionString)
            Using cmd As New MySqlCommand("ObtenerNumerosFrios", conn)
                cmd.CommandType = CommandType.StoredProcedure

                Try
                    conn.Open()
                    Using reader As MySqlDataReader = cmd.ExecuteReader()
                        While reader.Read()
                            ' Asumiendo que el primer campo es el número frío
                            numerosFrios.Add(reader.GetInt32(0)) ' Cambia el índice según la columna
                        End While
                    End Using
                Catch ex As Exception
                    ' Manejar la excepción (log, mostrar mensaje, etc.)
                End Try
            End Using
        End Using

        Return numerosFrios ' Asegúrate de devolver la lista correcta
    End Function



End Class
