# Noches a Plena Luz

Actúa como un diseñador de producto editorial y desarrollador frontend senior. Crea una aplicación web para un fotoensayo multimedia interactivo titulado "[TÍTULO DEL FOTOENSAYO]", con una estética minimalista en modo oscuro inspirada en la interfaz de Craft.do y Notion.

### 1. Sistema de Diseño y Estética (Estilo Craft / Notion Dark)
- **Paleta de colores:** Fondo principal en carbón profundo (`#191919`), bloques elevados y contenedores multimedia en gris pizarra oscuro (`#202020`), bordes sutiles de 1px (`#2F2F2F`), texto principal en blanco hueso (`#EBEBEB`) y metadatos o pies de foto en gris neutro (`#9B9B9B`).
- **Tipografía:** Combinación editorial limpia usando una fuente Serif elegante (como *Newsreader* o *Lora*) para títulos y citas narrativas, y una Sans-Serif geométrica (*Inter*) para párrafos, controles de audio y metadatos.
- **Arquitectura basada en bloques:** Una columna central de lectura estrecha (`max-width: 740px`) con amplio espacio negativo para textos, audios y videos, que se expande a ancho completo (`100vw`) para las fotografías principales.
- **Microinteracciones:** Transiciones suaves al hacer scroll (fade-in sutil), estados hover discretos estilo Notion en bloques interactivos y barra de progreso de lectura ultradelgada en el borde superior.

### 2. Galería Fotográfica a Pantalla Completa
- **Visualización editorial:** Presenta las fotografías en alta resolución en formato *full-bleed* (de borde a borde) o en dípticos asimétricos limpios con pies de foto minimalistas alineados a la izquierda.
- **Modo Lightbox (Pantalla Completa):** Al hacer clic en cualquier fotografía, ábrela en un visor inmersivo a pantalla completa (`100vh` / `100vw`) sobre fondo negro puro (`#0D0D0D`).
- **Controles del visor:** Navegación fluida mediante flechas laterales, teclas de dirección (`←` / `→`), tecla `Esc` para cerrar, contador de diapositivas discreto (`01 / 10`) y botón opcional para mostrar/ocultar datos técnicos (cámara, lente, apertura, ISO).

### 3. Reproductor de Audio Minimalista Debajo de Cada Bloque
- **Ubicación:** Integra un bloque reproductor de audio personalizado inmediatamente **debajo** de cada fotografía principal o capítulo narrativo, diseñado como un *callout block* de Notion (`#202020`, borde `1px solid #2F2F2F`, esquinas redondeadas `8px`).
- **Funcionalidad:** Soporte nativo para archivos `.mp3`, `.wav` y `.ogg` mediante HTML5 Audio API, con botón de Play/Pause minimalista, barra de progreso interactiva (scrubber), tiempo transcurrido/restante, título de la pista (ej. *"Ambiente sonoro — Plaza nocturna"* o *"Testimonio de voz"*) y control de volumen.
- **Comportamiento inteligente:** Al reproducir un nuevo archivo de audio, cualquier otro audio activo en la página debe pausarse automáticamente para evitar solapamientos.

### 4. Integración de Videos de YouTube
- **Bloques de video:** Inserta contenedores responsivos en relación de aspecto `16:9` integrados en la columna narrativa para videos documentales de YouTube.
- **Diseño limpio:** Utiliza carga diferida (*lazy-loading*) con una miniatura personalizada en modo oscuro y un botón de reproducción minimalista centrado antes de cargar el `iframe` de YouTube (`youtube-nocookie.com` con parámetros `rel=0&modestbranding=1`) para mantener la limpieza visual.

### 5. Estructura Narrativa (5 Capítulos)
Organiza la página en un encabezado editorial inmersivo (título, subtítulo, fecha y botón de *"Iniciar recorrido"*), seguido de 5 capítulos secuenciales (cada uno con texto breve, galería de 2 fotos expandibles a pantalla completa, bloque de audio debajo y espacio opcional para video de YouTube):
1. **Capítulo I — [Nombre / El telescopio en la plaza]**
2. **Capítulo II — [Nombre / El caballete nocturno]**
3. **Capítulo III — [Nombre / Percusión en la acera]**
4. **Capítulo IV — [Nombre / Canto entre pasos fugaces]**
5. **Capítulo V — [Nombre / Sobre ruedas en la noche]**

### 6. Entregable Técnico
Genera el código completo, limpio y listo para usar en [React + Tailwind CSS / HTML5, CSS3 y JavaScript Vanilla], asegurando diseño 100% responsivo en móviles y usando rutas relativas organizadas (`/assets/images/`, `/assets/audio/`) para reemplazar fácilmente los archivos locales.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/72cfd166-fe13-4461-9e82-3eb4b58dc012).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
