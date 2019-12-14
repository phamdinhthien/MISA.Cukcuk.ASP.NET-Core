using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MISA.CukCuk.Models
{
    public class AjaxResult
    {
        public object Data { get; set; }
        public bool Success { get; set; }
        public string Message { get; set; }

        public AjaxResult()
        {
            Success = true;      
        }
    }
}