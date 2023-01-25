using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using RequestProcessor.DTO;
using Microsoft.Azure.ServiceBus;
using System.Text;
using Azure.Core;

namespace RequestProcessor
{
    public static class GatewayApp
    {
        [FunctionName("GatewayApp")]
        [return: ServiceBus("%QueueName%", Connection = "ServiceBusConnectionString")]
        public static async Task<string> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("GatewayApp function started processing request.");
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();


            dynamic data = JsonConvert.DeserializeObject(requestBody);
            log.LogInformation($"GatewayApp - Input Data in the request.{data}");

            if (string.IsNullOrEmpty(requestBody))
            {
                throw new Exception("Please pass required data in the request body.");
            }

            return requestBody;
        }
    }
}
