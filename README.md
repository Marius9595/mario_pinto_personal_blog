# Personal Blog

## Descripción General

Este proyecto es un blog personal construido con Astro, un moderno generador de sitios estáticos,
y utiliza React para componentes interactivos.

Funcionalidades del blog (MVP):
- Página de inicio con información personal y enlaces a redes sociales.
- Página de blog con una lista de posts y un buscador.
- Página de post individual con contenido en formato Markdown.
- Cambio de tema de luz a oscuro.

Funcionalidades futuras (Roadmap):
- [ ] Separar contenido como strings separados para facilitar la internacionalización y personalización.
- [ ] Página de proyectos personales.
- [ ] Página de contacto.
- [ ] Página de curriculum vitae.
- [ ] Página de servicios.
- [ ] Página de portafolio.
- [ ] Filtro por Etiquetas en la página de blog.
- [ ] Comentarios en los posts.
- [ ] Página de error 404.
- [ ] Página de política de privacidad.
- [ ] Página de términos y condiciones.
- [ ] Añadir Soporte para i18n u otra forma de gestionar varios idiomas.
- [ ] Añadir pagina de cursos y formación.
- [ ] Añadir página de libros recomendados.
- [ ] Integrar Notion para gestionar los posts del blog.
- [ ] Integrar Obsidian para segundo cerebro y notas.


## Requisitos

Para ejecutar este proyecto, necesitarás tener instalado Node.js 
y npm en tu sistema. Puedes descargar Node.js desde su
[sitio web oficial](https://nodejs.org/) y npm se instala automáticamente
con Node.js.

Actualmente, está listo para ser desplegado en Vercel, pero puedes desplegarlo
en cualquier otro proveedor de alojamiento web que soporte sitios estáticos.

## Instalación

Para instalar las dependencias del proyecto, navega hasta el directorio
del proyecto en tu terminal y ejecuta el siguiente comando:

```bash
npm install
```

## Ejecución

Para ejecutar el proyecto en modo de desarrollo, utiliza el siguiente comando:

```bash
npm run dev
```

Para construir el proyecto para producción, utiliza el siguiente comando:

```bash
npm run build
```

## Pruebas

Para ejecutar las pruebas del proyecto, utiliza el siguiente comando:

```bash
npm run test
```

## Estructura del Proyecto

El proyecto sigue una estructura de directorios estándar para un proyecto Astro. Aquí hay una descripción de los directorios más importantes:

- `src/`: Este directorio contiene todo el código fuente del proyecto. Aquí es donde encontrarás todos los componentes de React y las páginas de Astro.
- `src/pages/`: Este directorio contiene todas las páginas de la aplicación. Cada archivo `.astro` en este directorio se convierte en una ruta en la aplicación.
- `src/BaseLayout/`: Este directorio contiene el diseño base que se utiliza en todas las páginas.
- `src/BaseLayout/styles/`: Este directorio contiene los estilos globales del proyecto.
  - `src/BaseLayout/styles/global.css`: Este archivo contiene los estilos globales del proyecto.
  - `src/BaseLayout/styles/colors.css`: Este archivo contiene las variables de colores del proyecto y de themes, aquí el valor --hue es el eje central.
- `src/pages/*/_components/`: Este directorio contiene los componentes relacionados y específicos de una Página.
- `src/pages/blog/posts/`: Este directorio contiene los posts del blog en formato Markdown.

## Contribución

Este repositorio es él que uso para mi blog personal, pero siéntete libre de
utilizarlo para tu propio blog personal o para cualquier otro propósito. 

Si deseas contribuir, primero agradezco tu interés en hacerlo y ayudar a mejorarlo,
pues puede ser de utilidad para otras personas que quieran clonarlo y personalizarlo para su propio blog.
Y segundo por favor, asegúrate de seguir las mejores prácticas de desarrollo y de realizar pruebas
en tus cambios antes de enviar un pull request dando
una descripción de la motivación, estrategia y referencias para evaluarla.

Es importante mantener la estrategia de testing en los componentes interactivos:
- Pruebas Unitarias a los componentes representacionales inyectando por props los accionadores.
- Pruebas de Integración sobre los contenedores que conectan los componentes con el estado global.
- Pruebas de Aceptación sobre los componentes interactivos que interactúan con el usuario (de momento no hay, pero será con
Playwright seguramente).

## Licencia

Este proyecto está licenciado bajo los términos de la licencia MIT.

Siente libre de utilizar este proyecto para tu propio blog personal o para cualquier otro propósito.
