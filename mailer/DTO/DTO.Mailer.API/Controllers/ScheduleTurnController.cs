using DTO.Mailer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace DTO.Mailer.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ScheduleTurnController : ControllerBase
    {
     
        private readonly ILogger<ScheduleTurnController> logger;
        private readonly DTOSettings appSettings;


        public ScheduleTurnController(
            IOptions<DTOSettings> appSettings,
            ILogger<ScheduleTurnController> logger)
        {
            this.appSettings = appSettings.Value;
            this.logger = logger;
        }

        [HttpPost]
        public IActionResult Post([FromBody] ScheduleTurnPostRequest turnScheduleRequest)
        {
            var smtpClient = new SmtpClient(appSettings.SMTP.Host)
            {
                Port = appSettings.SMTP.Port,
                Credentials = new NetworkCredential(appSettings.Consultas.Sender.Mail, appSettings.Consultas.Sender.Password),
                EnableSsl = true,
            };

            var body = new StringBuilder();
            body.AppendLine($"Pedido de turno");
            body.AppendLine($"==============");
            body.AppendLine();
            body.AppendLine($"Nombre: {turnScheduleRequest.Name}");
            body.AppendLine($"Teléfono: {turnScheduleRequest.Phone}");
            body.AppendLine($"E-Mail: {turnScheduleRequest.Email}");
            body.AppendLine($"Mensaje");
            body.AppendLine($"=======");
            body.AppendLine(turnScheduleRequest.Message);

            try
            {
                smtpClient.Send(appSettings.Consultas.Sender.Mail, appSettings.Consultas.Recipient, $"[Consulta Web] Pedido de turno: {turnScheduleRequest.Name}", body.ToString());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

                return new BadRequestObjectResult(new { Status = 1, Message = "Error enviando mail, intente nuevamente más tarde." });
            }

            return new OkObjectResult(new { Status = 0 });
        }
    }
}
