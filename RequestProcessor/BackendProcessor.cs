using System;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.SignalRService;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using RequestProcessor.DTO;

namespace RequestProcessor
{
    public class BackendProcessor
    {
        [FunctionName("BackendProcessor")]
        public void Run([ServiceBusTrigger("%QueueName%", Connection = "ServiceBusConnectionString")] string inputData,
            [SignalR(HubName = "%HubName%")] IAsyncCollector<SignalRMessage> signalrmessage, ILogger log)
        {
            string clientFunction = "resultAvailable";
            log.LogInformation($"BackendProcessor queue trigger function started processing with input : {inputData}");
            var result = new Result
            {
                IsSuccess= true
            };
            try
            {
                var data = JsonConvert.DeserializeObject<Request>(inputData);
                result.OpResult = Calculator.Calculate(data.Operation, data.Operand1, data.Operand2);
            }
            catch (Exception e)
            {
                result.IsSuccess= false;
                result.ErrorInfo = e.Message;
            }

            log.LogInformation($"Calculated Result: IsSuccess : {result.IsSuccess}, OpResult : {result.OpResult},ErrorInfo : {result.ErrorInfo},");
            signalrmessage.AddAsync(
                new SignalRMessage
                {
                    Target = clientFunction,
                    Arguments = new[] { result }
                }
                );
        }

        [FunctionName("negotiate")]
        public static SignalRConnectionInfo Negotiate(
           [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
           [SignalRConnectionInfo(HubName = "%HubName%")] SignalRConnectionInfo signalRConnectionInfo,
           ILogger log)
        {
            log.LogInformation("negotiate is called.");

            return signalRConnectionInfo;
        }


    }


}
