using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace RequestProcessor
{
    internal static class Calculator
    {
        public static double Calculate(string symbol, double operand1, double operand2)
        {
            double res;
            try
            {

                res = symbol switch
                {
                    "+" => operand1 + operand2,
                    "-" => operand1 - operand2,
                    "*" => operand1 * operand2,
                    "/" => operand1 / operand2,
                    _ => throw new InvalidOperationException($"Invalid Operand provided, Operand is [ {symbol} ] "),
                };
            }
            catch (Exception)
            {
                throw;
            }
            return res;
        }
    }
}
