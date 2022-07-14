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
        alert("error");
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

//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}