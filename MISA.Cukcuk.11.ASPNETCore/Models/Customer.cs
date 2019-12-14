using MISA.Cukcuc.ASP.NET_Core._11.DBAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.Cukcuc.ASP.NET_Core._11.Models
{
    public class T
    {
        public Guid CustomerID { get; set; }
        public string CustomerCode { get; set; }
        public string CustomerName { get; set; }
        public Guid? GroupCustomerID { get; set; }
        public string Tel { get; set; }
        public DateTime? Birthday { get; set; }
        public string CompanyName { get; set; }
        public string CompanyTaxCode { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public string Email { get; set; }
        public decimal Amount { get; set; }
        public bool Is5FoodMember { get; set; }
        public bool IsAddTo5Food { get; set; }
    }
}
