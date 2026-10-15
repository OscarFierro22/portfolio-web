"use strict";

const botonTema = document.getElementById("botonTema");
const botonMenu = document.getElementById("botonMenu");
const enlacesNavegacion = document.getElementById("enlacesNavegacion");
const formularioContacto = document.getElementById("formularioContacto");
const respuestaFormulario = document.getElementById("respuestaFormulario");
const modalProyecto = document.getElementById("modalProyecto");
const contenidoModal = modalProyecto.querySelector(".contenido-modal");
const cerrarModal = document.getElementById("cerrarModal");
const tituloModal = document.getElementById("tituloModal");
const descripcionModal = document.getElementById("descripcionModal");
const campos = ["nombre", "correo", "mensaje"].map(id => document.getElementById(id));
let focoAntesDelModal = null;

// Preferencias persistentes: funciona también cuando el navegador bloquea localStorage.
function obtenerTemaGuardado() {
    try { return window.localStorage.getItem("tema"); }
    catch { return null; }
}
function guardarTema(tema) {
    try { window.localStorage.setItem("tema", tema); }
    catch { /* La selección sigue funcionando para esta sesión. */ }
}
function aplicarTema(oscuro) {
    document.body.classList.toggle("modo-oscuro", oscuro);
    botonTema.textContent = oscuro ? "☀️" : "🌙";
    botonTema.setAttribute("aria-label", oscuro ? "Activar tema claro" : "Activar tema oscuro");
    botonTema.setAttribute("aria-pressed", String(oscuro));
}
const temaGuardado = obtenerTemaGuardado();
const prefiereOscuro = window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
aplicarTema(temaGuardado === "oscuro" || (temaGuardado === null && prefiereOscuro));

botonTema.addEventListener("click", () => {
    const activarOscuro = !document.body.classList.contains("modo-oscuro");
    aplicarTema(activarOscuro);
    guardarTema(activarOscuro ? "oscuro" : "claro");
});

// Menú móvil accesible.
function cerrarMenu() {
    enlacesNavegacion.classList.remove("abierto");
    botonMenu.setAttribute("aria-expanded", "false");
    botonMenu.setAttribute("aria-label", "Abrir menú de navegación");
}
botonMenu.addEventListener("click", () => {
    const abierto = enlacesNavegacion.classList.toggle("abierto");
    botonMenu.setAttribute("aria-expanded", String(abierto));
    botonMenu.setAttribute("aria-label", abierto ? "Cerrar menú de navegación" : "Abrir menú de navegación");
});
enlacesNavegacion.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", cerrarMenu);
});
document.addEventListener("click", event => {
    if (!event.target.closest(".navegacion")) cerrarMenu();
});

// Información del modal expresada como texto (sin insertar HTML externo).
const descripcionesProyectos = {
    "Smart Parking": "Sistema de estacionamiento inteligente desarrollado con OpenGL, visualización 3D y algoritmo de Dijkstra para encontrar rutas.",
    "Sistema de facturación": "Aplicación de escritorio Java Swing para gestionar productos, clientes e inventario, conectada con MySQL.",
    "Cinta transportadora": "Simulación industrial con C++, OpenGL y Arduino: sensores, control de velocidad, alarmas y parada de emergencia.",
    "Modelo predictivo": "Proyecto académico de IA con procesamiento de datos y evaluación de modelos predictivos."
};

function abrirVentanaModal(nombreProyecto) {
    const descripcion = descripcionesProyectos[nombreProyecto];
    if (!descripcion) return;
    focoAntesDelModal = document.activeElement;
    tituloModal.textContent = nombreProyecto;
    descripcionModal.textContent = descripcion;
    modalProyecto.classList.add("visible");
    modalProyecto.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-abierto");
    cerrarModal.focus();
}
function cerrarVentanaModal() {
    if (!modalProyecto.classList.contains("visible")) return;
    modalProyecto.classList.remove("visible");
    modalProyecto.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-abierto");
    if (focoAntesDelModal instanceof HTMLElement) focoAntesDelModal.focus();
}
document.querySelectorAll(".boton-detalles").forEach(boton => {
    boton.addEventListener("click", () => abrirVentanaModal(boton.dataset.proyecto));
});
cerrarModal.addEventListener("click", cerrarVentanaModal);
modalProyecto.addEventListener("click", event => {
    if (event.target === modalProyecto) cerrarVentanaModal();
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        cerrarVentanaModal();
        cerrarMenu();
        return;
    }
    if (event.key !== "Tab" || !modalProyecto.classList.contains("visible")) return;
    // Mantener el foco dentro del diálogo abierto.
    const navegables = [...contenidoModal.querySelectorAll("button, a[href], input, textarea, [tabindex]:not([tabindex='-1'])")]
        .filter(el => !el.hasAttribute("disabled"));
    if (navegables.length === 0) { event.preventDefault(); contenidoModal.focus(); return; }
    const primero = navegables[0];
    const ultimo = navegables[navegables.length - 1];
    if (event.shiftKey && document.activeElement === primero) {
        event.preventDefault(); ultimo.focus();
    } else if (!event.shiftKey && document.activeElement === ultimo) {
        event.preventDefault(); primero.focus();
    }
});

// Sitio estático: NO hay servidor que envíe mensajes. Se abre el cliente de correo.
const errores = {
    nombre: "El nombre debe tener al menos 3 caracteres.",
    correo: "Ingresa un correo electrónico válido.",
    mensaje: "El mensaje debe tener al menos 10 caracteres."
};
function validarCampo(campo) {
    const valor = campo.value.trim();
    let valido;
    if (campo.id === "nombre") valido = valor.length >= 3;
    else if (campo.id === "correo") valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
    else valido = valor.length >= 10;
    const elementoError = document.getElementById(`error${campo.id[0].toUpperCase()}${campo.id.slice(1)}`);
    elementoError.textContent = valido ? "" : errores[campo.id];
    campo.setAttribute("aria-invalid", String(!valido));
    return valido;
}
campos.forEach(campo => {
    campo.addEventListener("input", () => {
        if (campo.getAttribute("aria-invalid") === "true") validarCampo(campo);
    });
});
formularioContacto.addEventListener("submit", event => {
    event.preventDefault();
    respuestaFormulario.textContent = "";
    const valido = campos.map(validarCampo).every(Boolean);
    if (!valido) {
        campos.find(campo => campo.getAttribute("aria-invalid") === "true")?.focus();
        return;
    }
    const [nombre, correo, mensaje] = campos.map(campo => campo.value.trim());
    const asunto = encodeURIComponent(`Contacto desde el portafolio: ${nombre}`);
    const cuerpo = encodeURIComponent(`Nombre: ${nombre}\nCorreo: ${correo}\n\n${mensaje}`);
    respuestaFormulario.textContent = "Se abrirá tu aplicación de correo. Revisa el mensaje y pulsa Enviar; aún no se ha enviado.";
    window.location.href = `mailto:oscarfierro2222@gmail.com?subject=${asunto}&body=${cuerpo}`;
});

document.getElementById("anioActual").textContent = new Date().getFullYear();