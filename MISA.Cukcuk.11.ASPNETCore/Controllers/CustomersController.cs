using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.Cukcuc.ASP.NET_Core._11.DBAccess;
using MISA.Cukcuc.ASP.NET_Core._11.Models;
using MISA.CukCuk.Models;
using Newtonsoft.Json;

namespace MISA.Cukcuc.ASP.NET_Core._11.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        public DataAccess dataAccess = new DataAccess();
        // GET: api/Customers
        [HttpGet]
        [Route("")]

        public IEnumerable<T> GetCustomers()
        {
            return dataAccess.GetAllDatas<T>("Proc_GetCustomers");
        }


        // GET: api/Customers/5
        [HttpGet]
        [Route("{code}")]
        public T GetOneCustomer(string code)
        {
            return dataAccess.GetOneEntity(code);
        }

        // GET: api/Customers/delete/5
        [HttpGet]
        [Route("delete/{code}")]
        public bool DeleteOneCustomer(string code)
        {
            return dataAccess.DeleteOneCustomer(code);
        }

        [HttpPost]
        public IActionResult InsertOneCustomer([FromBody] T customer)
        {
            customer.CustomerID = Guid.NewGuid();
            bool check = dataAccess.InsertEntity<T>(customer, "Proc_InsertOneCustomer");
            if (!check)
            {
                return BadRequest();
            }
            return Ok();
        }

    }
}
