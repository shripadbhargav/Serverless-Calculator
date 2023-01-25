using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RequestProcessor.DTO
{
    public class Request
    {
        public string Operation { get; set; }
        public double Operand1 { set; get; }
        public double Operand2 { set; get; }
    }
}
