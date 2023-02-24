// Formulario

const datos = {
  nombre: "",
  email: "",
};
const nombre = document.querySelector("#nombre");
const email = document.querySelector("#email");
const formulario = document.querySelector(".formulario");

nombre.addEventListener("input", leerTexto);
email.addEventListener("input", leerTexto);

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const { nombre, email } = datos;
  if (nombre === "" || email === "") {
    mostrarAlerta("Todos los campos son obligatorios");
    return;
  }
  mostrarAlerta("Suscripcion enviado correctamente", true);
});

function leerTexto(e) {
  datos[e.target.id] = e.target.value;
}

function mostrarAlerta(mensaje, error = null) {
  const alerta = document.createElement("p");
  alerta.textContent = mensaje;
  if (error) {
    alerta.classList.add("correcto");
  } else {
    alerta.classList.add("error");
  }
  formulario.appendChild(alerta);
  setTimeout(() => {
    alerta.remove();
  }, 5000);
}
