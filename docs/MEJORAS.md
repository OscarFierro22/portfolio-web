# Registro de mejoras y pendientes

## Mejoras realizadas sobre el proyecto recibido

- Se reorganizaron los archivos para poder publicar en GitHub Pages desde la raíz.
- Se corrigieron los enlaces de GitHub y se añadieron enlaces verificables a dos proyectos públicos.
- Se ajustó el texto profesional a **búsqueda de pasantías** e **interés en DevOps**, sin presentar especialización profesional que aún no corresponde.
- Se incluyeron fundamentos de **Docker, redes y ciberseguridad** en las habilidades visibles.
- Se restauró una **navegación móvil funcional** mediante botón desplegable.
- Se mejoró el acceso por teclado: salto al contenido, `aria-label`, foco en el diálogo y cierre con `Escape`.
- Se añadió soporte para `prefers-reduced-motion` y mejor manejo de la preferencia visual guardada.
- Se corrigió el **falso envío exitoso** del formulario: ahora informa que el navegador preparará un mensaje `mailto:` para enviar desde un cliente de correo.
- Se incorporaron `README`, documentación técnica, guía de usuario, `.gitignore`, pruebas y CI básica.

- Se documentaron tres capturas reales proporcionadas por el autor: **Inicio, Habilidades y Contacto**, conservando las imágenes originales en `docs/capturas/`.
- Se creó una [galería visual](CAPTURAS.md) con imágenes reales del sitio.
- Se añadieron validaciones automáticas que comprueban la existencia y referencias de los archivos de documentación e imágenes.

## Mejoras recomendadas en siguientes versiones

| Prioridad | Propuesta | Motivo |
| --- | --- | --- |
| Alta | Sustituir `mailto:` por un backend o proveedor de formularios correctamente configurado | Permitir envío real con confirmación verificable. |
| Alta | Validar correo y demás datos públicos antes del despliegue | Evitar exposición involuntaria de datos personales. |
| Media | Incorporar capturas o demos auténticas de cada proyecto | Mejorar el portafolio para reclutadores. |
| Media | Agregar enlaces públicos de repositorios restantes cuando existan | Poder verificar trabajos. |
| Media | Incluir pruebas de navegador automatizadas para menú, modal y formulario | Complementar pruebas estructurales. |
| Media | Optimizar imágenes elegidas para producción (WebP, dimensiones adecuadas, carga diferida) | Rendimiento y accesibilidad. |
| Baja | Incorporar traducción español/inglés | Ampliar audiencia profesional. |
| Baja | Agregar proyectos propios de Docker, CI/CD o automatización | Demostrar avances hacia DevOps. |

## Nota sobre la fotografía incluida en el RAR

El archivo original contenía `imagenes/perfil.png`, pero **no estaba utilizado en el HTML**. No se incluye en esta versión preparada para publicar, para reducir tamaño y evitar exponer una fotografía no necesaria sin revisión previa. El avatar de iniciales permanece tal como se mostraba en la web.