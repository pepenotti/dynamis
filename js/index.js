var turnSubmit  = $("#turn-submit")[0];
var turnName    = $("#turn-name")[0];
var turnPhone   = $("#turn-phone")[0];
var turnEmail   = $("#turn-email")[0];
var turnMessage = $("#turn-message")[0];
var turnUrl = "https://dto-mailer.azurewebsites.net/api/ScheduleTurn";

turnSubmit.onclick = scheduleTurn;

function scheduleTurn() {
    var body = {
        Name    : turnName.value,   
        Phone   : turnPhone.value,
        Email   : turnEmail.value,
        Message : turnMessage.value,
    }

    disableAll();

    $.ajax({
        type: 'POST',
        url: turnUrl,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(body)
    })
    .done((r) => {
        alert("Solicitud enviada, te responderemos a la brevedad. ¡Muchas gracias!");
        enableAll();
    })
    .fail(() => {
        alert("Hubo un error en el sistema, por favor envíe un mail a consultas@dto.com.ar.");
    });
}

function disableAll() {
    turnSubmit.disabled = true;
    turnName.disabled = true;
    turnPhone.disabled = true;
    turnEmail.disabled = true;
    turnMessage.disabled = true;
    turnSubmit.innerHTML = "Enviando..."
}

function enableAll() {
    turnSubmit.disabled = false;
    turnName.disabled = false;
    turnPhone.disabled = false;
    turnEmail.disabled = false;
    turnMessage.disabled = false;
    turnSubmit.innerHTML = "Solicitar turno"
}
