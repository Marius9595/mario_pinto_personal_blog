---
layout: './_layout/MarkdownPostLayout.astro'
title: "Gestionar la experiencia visual de una app web según la orientación de un móvil"  # Ensure this is a string
description: "Cómo gestionar los estilos de una app web según la orientación de un móvil" 
pubDate: "2024-05-06"
tags: [ "CSS", "media-query", "design" ]
author: "Mario S. Pinto Miranda"
image:
  url: "/posts-covers/gestion-estilos-orientacion.webp"
  alt: "Gestionar la experiencia visual de una app web según la orientación de un móvil"
---

Actualmente (mayo 2024) me encuentro trabajando en la versión web de 
[Mr Market Game App](https://play.google.com/store/apps/details?id=com.mario.pinto95.mrmarketapp&hl=es_US) 
porque junto al compañero Gabriel (Creador del Juego de Mesa Mr. Market Game) 
vimos que puede que sea más fácil el consumo de la app si los usuarios simplemente tienen que acceder a
una dirección web leyendo un QR tras analizar la retroalimentación de la aplicación móvil de varios usuarios.
Esto se debe a cierta desconfianza hoy en día y la molestia de descargar e instalar una aplicación móvil.
Tenía mucho sentido la versión móvil al ser una aplicación sin necesidad de acceso a recursos en internet.
Pero, la realidad es que una versión SPA funcionaria similar pues con una carga el usuario tendría todos los
recursos. 

Ahora bien, si ves la app móvil, está desarrollada exclusivamente sobre un layout horizontal, uno vertical
no tenía sentido si se quiere una "migración" rápida (calcar diseño pues se hizo con React Native).
Esto no sabía como gestionarlo, pero después de una primera iteración con un script de JavaScript me pregunté
si había alguna forma más sencilla de hacerlo. Y me encontré con que sí, que CSS tiene una propiedad que permite
gestionar este tipo de situaciones. ¡Veámoslo!

## Media query y propiedad orientation

CSS tiene una característica de media orientación que permite aplicar estilos en función de la orientación
de la pantalla (lo cúal solo tiene sentido en un navegador abierto en un móvil, aunque se puede simular esto en un
ordenador con las tools de desarrollo). Toda la información en el siguiente enlace:
https://developer.mozilla.org/en-US/docs/Web/CSS/@media/orientation.
Con esto, ya tenemos control para adaptar la experiencia al usuario en función de la orientación de su móvil. 

En mi caso en concreto me ha servido para poder indicar al usuario como ha de usar la app web,
para poder mostrarte este caso de uso, vamos a verlo en un ejemplo que puedes ver directamente en CodePen. 
Antes de verlo, te dejo el código que he usado para gestionar la orientación de la pantalla en la app web.

```css
@media screen and (orientation: portrait) {
  /* Estilos para orientación vertical */
}

@media screen and (orientation: landscape) {
  /* Estilos para orientación horizontal */
}
```

También es importante, si no estás leyendo desde un móvil que abras las DevTools de tu navegador y simules
una pantalla de móvil para ver cómo se comporta la app web en función de la orientación de la pantalla. Desde aquí
podrás ver cómo se aplican los estilos en función de la orientación de la pantalla:

<p class="codepen" data-height="600" data-theme-id="dark" data-default-tab="result" data-slug-hash="MWRNvQe" data-user="Mario-Pinto-the-bold" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/Mario-Pinto-the-bold/pen/MWRNvQe">
  Media query y la orientación</a> by Mario Pinto (<a href="https://codepen.io/Mario-Pinto-the-bold">@Mario-Pinto-the-bold</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Conclusiones

Esto es una característica que no conocía y que me ha sorprendido por su sencillez y utilidad.
A mi gusto tiene un gran potencial para mejorar la experiencia de usuario en una app web cuando se trata de una
SPA o PWAs, no se si tanto en una web tradicional. Pero, en cualquier caso, es una herramienta que me guardo
para futuros proyectos. En el actual mencionado, me ha permitido poder indicar al usuario cómo usar su móvil
para poder tener la mejor experiencia posible en la app web, tal y como ya está en la versión mobile.