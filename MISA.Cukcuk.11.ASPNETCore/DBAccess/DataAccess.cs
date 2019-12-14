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

        public IEnumerable<T> GetAllDatas<T>(string storeName)
        {
            List<T> Entities = new List<T>();

            SqlConnection sqlConnection = DBUtils.GetDBConnection();
            var cmdText = storeName;
            SqlCommand sqlCommand = new SqlCommand(cmdText, sqlConnection);
            sqlConnection.Open();
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
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
                Entities.Add(entity);
            }
            sqlConnection.Close();
            return Entities;
        }

        public object GetOneEntity<T>(object id, string storeName)
        {
            Models.T entity = new Models.T();
            SqlConnection sqlConnection = DBUtils.GetDBConnection();
            var cmdText = @"[dbo].[Proc_GetOneCustomer] @CustomerCode";
            SqlCommand sqlCommand = new SqlCommand(cmdText, sqlConnection);
            sqlCommand.Parameters.AddWithValue("@CustomerCode", id);
            sqlConnection.Open();
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
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

        public bool DeleteOneCustomer(object id)
        {
            SqlConnection sqlConnection = DBUtils.GetDBConnection();
            var cmdText = @"[dbo].[Proc_DelOneCustomer]";
            SqlCommand sqlCommand = new SqlCommand(cmdText, sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            try
            {
                sqlCommand.Parameters.AddWithValue("@CustomerCode", id);
                sqlConnection.Open();
                sqlCommand.ExecuteNonQuery();
            }
            catch (Exception)
            {
                return false;
            }
            finally
            {
                sqlConnection.Close();
            }
            return true;
        }

        public bool InsertEntity<T>(T entity, string storeName)
        {

            SqlConnection sqlConnection = DBUtils.GetDBConnection();
            var cmdText = storeName;
            try
            {
                SqlCommand sqlCommand = new SqlCommand(cmdText, sqlConnection);
                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlConnection.Open();
                SqlCommandBuilder.DeriveParameters(sqlCommand);
                var sqlParameters = sqlCommand.Parameters;
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
                sqlCommand.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                return false;
            }
            finally
            {
                sqlConnection.Close();
            }
            return true;
        }
    }
}

