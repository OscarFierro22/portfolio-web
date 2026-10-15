# Capturas del portafolio

Esta galería documenta la interfaz real del proyecto y facilita comparar el resultado visual después de una modificación. Las capturas principales fueron **aportadas por el autor** y corresponden a una visualización del sitio en **modo oscuro**.

## 1. Inicio

![Página principal del portafolio de Oscar Fierro con el mensaje de presentación, botones de proyectos y contacto y tarjeta de perfil](capturas/inicio.png)

**Archivo:** [`docs/capturas/inicio.png`](capturas/inicio.png) — **2048 × 1060 píxeles**.

La portada presenta al estudiante, su interés en desarrollo de software y DevOps, un acceso directo a proyectos, otro al contacto y una tarjeta de disponibilidad para pasantías. El icono de sol permite alternar el tema visual.

## 2. Habilidades técnicas

![Tarjetas de habilidades técnicas del portafolio: Java, C++ y OpenGL, bases de datos, inteligencia artificial, Arduino, desarrollo web, Docker y redes, y ciberseguridad](capturas/habilidades.png)

**Archivo:** [`docs/capturas/habilidades.png`](capturas/habilidades.png) — **2048 × 1129 píxeles**.

Las ocho tarjetas agrupan conocimientos técnicos: Java; C++ y OpenGL; bases de datos; inteligencia artificial; Arduino; HTML, CSS y JavaScript; Docker y redes; y fundamentos de ciberseguridad. Son **áreas de conocimiento**, no certificaciones ni evidencia de experiencia profesional en todas ellas.

## 3. Contacto

![Sección de contacto del portafolio con email, ubicación, enlaces a GitHub y LinkedIn y un formulario de nombre, correo y mensaje](capturas/contacto.png)

**Archivo:** [`docs/capturas/contacto.png`](capturas/contacto.png) — **2048 × 1075 píxeles**.

La sección muestra canales de contacto y un formulario que prepara un mensaje de correo. El botón **Preparar correo** no envía por sí solo: solicita abrir la aplicación de correo del visitante, desde la que debe enviarse el mensaje.

## Cómo actualizar las capturas

1. Ejecuta el sitio localmente con Live Server o `python -m http.server 8000`.
2. Abre la sección deseada y selecciona el tema que quieras mostrar.
3. Haz una captura sin incluir pestañas, direcciones privadas ni credenciales.
4. Sustituye la imagen correspondiente en `docs/capturas/`, **manteniendo el nombre y la extensión** (`inicio.png`, `habilidades.png`, `contacto.png`).
5. Si modificas el contenido de una sección, revisa también su descripción en este documento y en el `README.md`.
6. Ejecuta las pruebas para comprobar que las rutas y los archivos de documentación siguen siendo válidos.

> **Privacidad:** en `contacto.png` aparece un correo electrónico. Si publicas el repositorio, la imagen también será visible al público; revisa cuidadosamente esta y cualquier captura futura.