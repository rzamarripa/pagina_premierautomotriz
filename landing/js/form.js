// Form validation and submission
$(document).ready(function () {
  const API_URL = "http://localhost:3006/enviar-correo";

  // Validación del formulario
  function validateForm() {
    let isValid = true;

    // Validar nombre
    const name = $("#name").val().trim();
    if (name.length < 2) {
      showFieldError("name", "El nombre debe tener al menos 2 caracteres");
      isValid = false;
    } else {
      clearFieldError("name");
    }

    // Validar email
    const email = $("#email").val().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFieldError("email", "Por favor ingresa un email válido");
      isValid = false;
    } else {
      clearFieldError("email");
    }

    // Validar teléfono
    const phone = $("#phone").val().trim();
    if (phone.length < 10) {
      showFieldError("phone", "El teléfono debe tener al menos 10 dígitos");
      isValid = false;
    } else {
      clearFieldError("phone");
    }

    // Validar mensaje
    const message = $("#message").val().trim();
    if (message.length < 10) {
      showFieldError("message", "El mensaje debe tener al menos 10 caracteres");
      isValid = false;
    } else {
      clearFieldError("message");
    }

    return isValid;
  }

  // Mostrar error en campo
  function showFieldError(fieldId, message) {
    const field = $("#" + fieldId);
    const helpBlock = field.siblings(".help-block");

    field.addClass("error");
    helpBlock.text(message).show();
  }

  // Limpiar error de campo
  function clearFieldError(fieldId) {
    const field = $("#" + fieldId);
    const helpBlock = field.siblings(".help-block");

    field.removeClass("error");
    helpBlock.text("").hide();
  }

  // Mostrar estado de carga
  function showLoading() {
    $("#success").html(
      '<div class="alert alert-info"><i class="fa fa-spinner fa-spin"></i> Enviando mensaje...</div>'
    );
  }

  // Mostrar mensaje de éxito
  function showSuccessMessage() {
    $("#success").html(
      '<div class="alert alert-success"><i class="fa fa-check"></i> ¡Mensaje enviado exitosamente! Te contactaremos pronto.</div>'
    );
    $("#contactForm")[0].reset();
    if (typeof grecaptcha !== "undefined") {
      grecaptcha.reset();
    }
  }

  // Mostrar mensaje de error
  function showErrorMessage(message) {
    $("#success").html(
      '<div class="alert alert-danger"><i class="fa fa-exclamation-triangle"></i> ' +
        message +
        "</div>"
    );
  }

  // Envío del formulario
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    showLoading();

    const formData = {
      name: $("#name").val().trim(),
      email: $("#email").val().trim(),
      phone: $("#phone").val().trim(),
      message: $("#message").val().trim(),
      "g-recaptcha-response":
        typeof grecaptcha !== "undefined" ? grecaptcha.getResponse() : "",
    };

    $.ajax({
      url: API_URL,
      method: "POST",
      data: formData,
      success: function (response) {
        showSuccessMessage();
      },
      error: function (xhr, status, error) {
        let errorMessage =
          "Error al enviar el mensaje. Por favor intenta de nuevo.";

        if (xhr.responseText) {
          errorMessage = xhr.responseText;
        }

        showErrorMessage(errorMessage);
      },
    });
  });

  // Limpiar errores al escribir
  $("#name, #email, #phone, #message").on("input", function () {
    const fieldId = $(this).attr("id");
    clearFieldError(fieldId);
  });
});
