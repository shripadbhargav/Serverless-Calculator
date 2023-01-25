// See https://aka.ms/new-console-template for more information
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Client;
using SignarClient.DTO;

Console.WriteLine("Hello, World!");

Console.WriteLine("Hello, World!");
try
{
	double operand1 = 1.0;
	double operand2 = 0;
	var result = operand1 / operand2;
	HubConnection hubConnection = new HubConnectionBuilder()
            .WithUrl("https://requestshandler.azurewebsites.net/api/").
			WithAutomaticReconnect()
           .Build();



    hubConnection.Closed += async (error) =>
	{
		await Task.Delay(new Random().Next(0, 5) * 1000);
		await hubConnection.StartAsync();
	};

	hubConnection.On<Result>("resultAvailable", result =>
	{
		Console.WriteLine($"Result Received, IsSuccess = {result.IsSuccess},OpResult = {result.OpResult}, ErrorInfo = { result.ErrorInfo}");
	});
	
	await hubConnection.StartAsync();
	Console.ReadLine();
	
}
catch (Exception ex)
{
	Console.WriteLine(ex.Message);

}