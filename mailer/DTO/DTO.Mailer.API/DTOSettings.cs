using System.Security;

namespace DTO.Mailer.API
{
    public class DTOSettings
    {
        public const string DTO = "DTO";

        public Consultas Consultas { get; set; }

        public SMTP SMTP { get; set; }
    }

    public class Consultas
    {
        public string Recipient { get; set; }

        public Sender Sender { get; set; }
    }

    public class Sender
    {
        public string Mail { get; set; }

        public string Password { get; set; }
    }

    public class SMTP
    {
        public string Host { get; set; }

        public int Port { get; set; }

        public bool EnableSSL { get; set; }

    }
}