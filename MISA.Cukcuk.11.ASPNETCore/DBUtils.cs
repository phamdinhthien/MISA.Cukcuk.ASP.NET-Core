using System;
using System.Data.SqlClient;

public class DBUtils
{
        public static SqlConnection GetDBConnection()
        {
            var stringConnection = @"Data Source=Database\SQL2014;Initial Catalog=MISA.CukCuk.Web11_PDThien;Integrated Security=True";
            SqlConnection sqlConnection = new SqlConnection(stringConnection);
            return sqlConnection;
        }
}
