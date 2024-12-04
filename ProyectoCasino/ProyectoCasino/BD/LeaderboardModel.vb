Imports System.Configuration
Imports MySql.Data.MySqlClient

Public Class LeaderboardModel
    ' Método para obtener el leaderboard general
    Public Shared Function ObtenerLeaderGeneral() As List(Of Dictionary(Of String, Object))
        Dim connectionString As String = ConfigurationManager.ConnectionStrings("MySqlConnectionString").ToString()

        Dim leaderboard As New List(Of Dictionary(Of String, Object))()

        Using conn As New MySqlConnection(connectionString)
            Using cmd As New MySqlCommand("ObtenerLeaderGeneral", conn)
                cmd.CommandType = CommandType.StoredProcedure

                Try
                    conn.Open()
                    Using reader As MySqlDataReader = cmd.ExecuteReader()
                        While reader.Read()
                            Dim row As New Dictionary(Of String, Object)()

                            row("id_usuario") = reader("id_usuario")
                            row("Creditos") = reader("Creditos")
                            row("Email") = reader("Email")

                            leaderboard.Add(row)
                        End While
                    End Using
                Catch ex As Exception
                    Throw New Exception("Error al obtener el leaderboard general: " & ex.Message)
                End Try
            End Using
        End Using

        Return leaderboard ' Devuelve una lista de diccionarios
    End Function
End Class


