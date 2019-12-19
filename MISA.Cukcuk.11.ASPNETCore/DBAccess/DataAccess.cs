using MISA.Cukcuc.ASP.NET_Core._11.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.Cukcuc.ASP.NET_Core._11.DBAccess
{
    public class DataAccess
    {
        private string _stringConnection = @"Data Source=Database\SQL2014;Initial Catalog=MISA.CukCuk.Web11_PDThien;Integrated Security=True";
        private SqlConnection _sqlConnection;
        private SqlCommand _sqlCommand;
        public DataAccess()
        {
            _sqlConnection = new SqlConnection(_stringConnection);
            _sqlCommand.CommandType = CommandType.StoredProcedure;
            _sqlConnection.Open();
        }
        ~DataAccess()
        {
            _sqlConnection.Close();
        }
        public IEnumerable<T> GetAllDatas<T>(string storeName)
        {
            List<T> entities = new List<T>();
            var cmdText = storeName;
            _sqlCommand = new SqlCommand(cmdText, _sqlConnection);
            SqlDataReader sqlDataReader = _sqlCommand.ExecuteReader();
            while (sqlDataReader.Read())
            {
                T entity = (T)Activator.CreateInstance(typeof(T));
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var colName = sqlDataReader.GetName(i);
                    var colValue = sqlDataReader.GetValue(i);
                    var PropertyInfo = entity.GetType().GetProperty(colName);
                    if (PropertyInfo != null && colValue != DBNull.Value)
                    {
                        PropertyInfo.SetValue(entity, colValue);
                    }
                }
                entities.Add(entity);
            }
            return entities;
        }

        public T GetOneEntity<T>(object[] paramaters, string storeName)
        {
            T entity = (T)Activator.CreateInstance(typeof(T));
            var cmdText = storeName;
            _sqlCommand = new SqlCommand(cmdText, _sqlConnection);
            SqlCommandBuilder.DeriveParameters(_sqlCommand);
            var sqlParameters = _sqlCommand.Parameters;
            for (int i = 1; i < sqlParameters.Count; i++)
            {
                sqlParameters[i].Value = paramaters[i - 1];
            }
            SqlDataReader sqlDataReader = _sqlCommand.ExecuteReader();
            if (sqlDataReader.HasRows)
            {
                sqlDataReader.Read();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var colName = sqlDataReader.GetName(i);
                    var colValue = sqlDataReader.GetValue(i);
                    var PropertyInfo = entity.GetType().GetProperty(colName);
                    if (PropertyInfo != null && colValue != DBNull.Value)
                    {
                        PropertyInfo.SetValue(entity, colValue);
                    }
                }
            }
            return entity;
        }

        public bool DeleteOneCustomer<T>(object[] paramaters, string storeName)
        {
            var cmdText = storeName;
            _sqlCommand = new SqlCommand(cmdText, _sqlConnection);
            try
            {
                SqlCommandBuilder.DeriveParameters(_sqlCommand);
                var sqlParameters = _sqlCommand.Parameters;
                for (int i = 1; i < sqlParameters.Count; i++)
                {
                    sqlParameters[i].Value = paramaters[i - 1];
                }
                _sqlCommand.ExecuteNonQuery();
            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }

        public bool InsertEntity<T>(T entity, string storeName)
        {
            var cmdText = storeName;
            try
            {
                _sqlCommand = new SqlCommand(cmdText, _sqlConnection);
                SqlCommandBuilder.DeriveParameters(_sqlCommand);
                var sqlParameters = _sqlCommand.Parameters;
                for (int i = 1; i < sqlParameters.Count; i++)
                {
                    SqlParameter parameter = sqlParameters[i];
                    var paramaterName = parameter.ParameterName;
                    var propertyInfo = entity.GetType().GetProperty(paramaterName.Replace("@", ""));
                    if (propertyInfo != null)
                    {
                        parameter.Value = propertyInfo.GetValue(entity) != null ? propertyInfo.GetValue(entity) : DBNull.Value;
                    }
                }
                _sqlCommand.ExecuteNonQuery();
            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }
    }
}

