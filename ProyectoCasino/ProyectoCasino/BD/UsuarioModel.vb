Imports System.Data.SqlClient
Imports MySql.Data.MySqlClient
Imports Newtonsoft.Json

Public Class UsuarioModel
    Public Function ObtenerPuntajeUsuario(idUsuario As Integer) As Integer
        Dim connectionString As String = ConfigurationManager.ConnectionStrings("MySqlConnectionString").ToString()
        Dim puntaje As Integer = 0 ' Valor por defecto

        Using conn As New MySqlConnection(connectionString)
            Using cmd As New MySqlCommand("ObtenerPuntaje", conn)
                cmd.CommandType = CommandType.StoredProcedure

                ' Agregar parámetro de entrada (idUsuario)
                cmd.Parameters.AddWithValue("@idUsuario", idUsuario)

                ' Agregar parámetro de salida (puntaje)
                Dim parametroPuntaje As New MySqlParameter("@puntaje", MySqlDbType.Int32)
                parametroPuntaje.Direction = ParameterDirection.Output
                cmd.Parameters.Add(parametroPuntaje)

                Try
                    conn.Open()
                    cmd.ExecuteNonQuery() ' Ejecuta el procedimiento almacenado

                    ' Obtener el puntaje de la variable de salida
                    puntaje = Convert.ToInt32(parametroPuntaje.Value)
                Catch ex As Exception

                End Try
            End Using
        End Using

        Return puntaje
    End Function


    Public Sub ActualizarPuntajeUsuario(idUsuario As Integer, montoApostado As Integer, resultado As String)
        Dim connectionString As String = ConfigurationManager.ConnectionStrings("MySqlConnectionString").ToString()

        Using conn As New MySqlConnection(connectionString)
            Using cmd As New MySqlCommand("ActualizarPuntaje", conn)
                cmd.CommandType = CommandType.StoredProcedure

                ' Agregar parámetros al procedimiento almacenado
                cmd.Parameters.AddWithValue("@idUsuario", idUsuario)
                cmd.Parameters.AddWithValue("@montoApostado", montoApostado)
                cmd.Parameters.AddWithValue("@resultado", resultado) ' Se agrega el parámetro resultado

                Try
                    conn.Open()
                    cmd.ExecuteNonQuery() ' Ejecuta la actualización sin devolver nada

                Catch ex As Exception
                    ' Manejar la excepción si ocurre
                    Console.WriteLine("Error: " & ex.Message)
                End Try
            End Using
        End Using
    End Sub



    Public Function RegistrarUsuario(nombre As String, email As String, password As String) As Usuario
        Dim connectionString As String = ConfigurationManager.ConnectionStrings("MySqlConnectionString").ToString()
        Dim usuario As Usuario = Nothing

        ' Procedimiento almacenado para registrar el usuario
        Using conn As New MySqlConnection(connectionString)
            Using cmd As New MySqlCommand("sp_RegistrarUsuario", conn)
                cmd.CommandType = CommandType.StoredProcedure
                cmd.Parameters.AddWithValue("@p_Email", email)
                cmd.Parameters.AddWithValue("@p_Contrasena", password)
                cmd.Parameters.AddWithValue("@p_Nombre", nombre) ' Agregar nombre

                ' Parámetros de salida
                cmd.Parameters.Add("@p_Registrado", MySqlDbType.Bit).Direction = ParameterDirection.Output
                cmd.Parameters.Add("@p_Mensaje", MySqlDbType.VarChar, 50).Direction = ParameterDirection.Output

                Try
                    conn.Open()
                    cmd.ExecuteNonQuery()

                    ' Verificar si el usuario fue registrado
                    Dim registrado As Boolean = Convert.ToBoolean(cmd.Parameters("@p_Registrado").Value)
                    Dim mensaje As String = cmd.Parameters("@p_Mensaje").Value.ToString()

                    If registrado Then
                        ' Si el usuario fue registrado correctamente, obtener el ID
                        usuario = New Usuario()
                        usuario.Nombre = nombre
                        usuario.Correo = email

                        ' Ahora obtenemos el ID del usuario registrado
                        Using getIdCmd As New MySqlCommand("sp_ObtenerUsuarioPorEmail", conn)
                            getIdCmd.CommandType = CommandType.StoredProcedure
                            getIdCmd.Parameters.AddWithValue("@p_Email", email)
                            getIdCmd.Parameters.Add("@p_Id", MySqlDbType.Int32).Direction = ParameterDirection.Output
                            getIdCmd.Parameters.Add("@p_Nombre", MySqlDbType.VarChar, 100).Direction = ParameterDirection.Output
                            getIdCmd.Parameters.Add("@p_EmailOut", MySqlDbType.VarChar, 100).Direction = ParameterDirection.Output

                            ' Ejecutar el comando para obtener el ID del usuario
                            getIdCmd.ExecuteNonQuery()

                            ' Asignar el ID del usuario registrado
                            usuario.Id = Convert.ToInt32(getIdCmd.Parameters("@p_Id").Value)
                        End Using
                    Else
                        ' Si no se registró correctamente, mostrar el mensaje de error
                        Console.WriteLine(mensaje) ' Registrar el mensaje para depuración
                    End If
                Catch ex As Exception
                    ' Manejar errores durante el registro
                    Console.WriteLine("Error durante el registro: " & ex.Message)
                End Try
            End Using
        End Using

        Return usuario
    End Function

End Class
