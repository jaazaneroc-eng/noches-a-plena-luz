/**
 * Contenido del fotoensayo.
 * Para reemplazar archivos, deja tus fotos en /public/assets/images/ y tus audios en
 * /public/assets/audio/ y actualiza aquí las rutas, textos y datos técnicos.
 * Formatos de audio soportados: .mp3, .wav, .ogg
 */

export type PhotoExif = {
  camera: string;
  lens: string;
  aperture: string;
  shutter: string;
  iso: string;
  date: string;
};

export type Photo = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  exif: PhotoExif;
};

export type AudioTrack = {
  src: string;
  title: string;
  description: string;
};

export type VideoBlock = {
  youtubeId: string;
  title: string;
  /** Miniatura personalizada (ruta local). Si falta, se usa la primera foto del capítulo. */
  poster?: string;
};

/** Marcador del artista sobre el mapa aéreo. `top`/`left` en % de la imagen del mapa. */
export type MapPin = {
  top: number;
  left: number;
  /** Color del marcador (hex). */
  color: string;
};

export type Artist = {
  name: string;
  /** Subtítulo breve (1 línea). */
  role: string;
  /** Descripción corta para la miniventana del mapa (1–2 líneas). */
  teaser: string;
  /** Qué foto del capítulo se usa como retrato en la miniventana (0 o 1). */
  portrait: 0 | 1;
  /** Encuadre del retrato (CSS object-position). */
  portraitFocus?: string;
};

export type ChapterLayout = "stacked" | "diptych" | "diptych-offset";

export type Chapter = {
  id: string;
  /** Parte final de la dirección de la página del artista: /artistas/<slug> */
  slug: string;
  artist: Artist;
  pin: MapPin;
  numeral: string;
  title: string;
  paragraphs: string[];
  /** Cita narrativa en serif. Añade `attribution` solo con testimonios reales. */
  quote?: { text: string; attribution?: string };
  layout: ChapterLayout;
  photos: [Photo, Photo];
  /** Galería ampliada solo para la página del capítulo (no aparece en el mapa ni en la portada). */
  gallery?: Photo[];
  audio: AudioTrack;
  video?: VideoBlock;
};

const SIGMA = "Sigma 18–50mm F2.8 DC DN | C";
const NA = "—";

const img = (name: string) => `/assets/images/${name}`;
const audio = (name: string) => `/assets/audio/${name}`;

export const essay = {
  title: "ACAPAR ARTE",
  subtitle:
    "Cinco oficios, cinco presencias: un recorrido por las calles del centro de Trujillo cuando la ciudad baja la voz y la plaza se vuelve escenario.",
  kicker: "Fotorreportaje interactivo",
  author: "Johan Salvador Azañero",
  date: "Octubre – Noviembre 2026",
  location: "Centro Histórico de Trujillo, Perú",
  cover: img("porto_1.jpg"),
  /** Fotografía aérea de la plaza usada como índice interactivo. */
  map: {
    src: img("mapa-plaza.jpg"),
    width: 945,
    height: 567,
    title: "Nuestros artistas",
    alt: "Vista aérea de la Plaza de Armas de Trujillo con el Monumento a la Libertad al centro",
  },
  intro: [
    "Cuando cae la noche, el centro no se apaga: cambia de habitantes. Entre faroles y baldosas húmedas aparecen quienes hacen de la calle su taller, su escenario y su pista.",
    "Este ensayo los acompaña en cinco capítulos. Elige a un artista en el mapa de la plaza para ver su sesión de fotos, escuchar su paisaje sonoro y, cuando existe, ver un fragmento en video.",
  ],
};

export const chapters: Chapter[] = [
  {
    id: "capitulo-1",
    slug: "porto",
    artist: {
      name: "Fernando Portocarrero",
      role: "\"El Cazador de Astros\"",
      teaser: "Ofrece la Luna por unas monedas a los pies del Monumento a la Libertad.",
      portrait: 0,
    },
    pin: { top: 30, left: 46, color: "#3E2B22" },
    numeral: "I",
    title: "El telescopio en la plaza",
    paragraphs: [
      "A los pies del Monumento a la Libertad, un hombre ajusta el ocular con la paciencia de quien ha esperado muchas noches despejadas. Por unas monedas, cualquiera puede asomarse a la Luna.",
      "La estatua cambia de color con las luces de la plaza —azul, luego rosa—, pero él no la mira. Su atención está más arriba, donde la ciudad no alcanza.",
    ],
    quote: {
      text: "En medio del ruido de la plaza, alguien ofrece silencio: un tubo negro apuntando a la Luna.",
    },
    layout: "stacked",
    photos: [
      {
        id: "porto-1",
        src: img("porto_1.jpg"),
        alt: "Hombre con gorra mira por un telescopio frente al Monumento a la Libertad iluminado de azul",
        caption: "Porto calibra su telescopio frente al Monumento a la Libertad.",
        width: 1920,
        height: 1080,
        exif: { camera: NA, lens: NA, aperture: NA, shutter: NA, iso: NA, date: NA },
      },
      {
        id: "porto-2",
        src: img("porto_2.jpg"),
        alt: "Perfil del astrónomo mirando por el ocular, con la estatua iluminada de rosa al fondo",
        caption: "El monumento cambia de color; la mirada sigue fija en el cielo.",
        width: 1920,
        height: 1006,
        exif: { camera: NA, lens: NA, aperture: NA, shutter: NA, iso: NA, date: NA },
      },
    ],
    gallery: [
      {
        id: "porto-3",
        src: img("porto_3.jpg"),
        alt: "Varios transeúntes reunidos frente al telescopio en la Plaza de Armas bajo la luna creciente",
        caption:
          "Testigos de la luna — Bajo la luz de la luna creciente, varios transeúntes se reúnen frente al telescopio en la Plaza de Armas, convirtiendo el espacio público en un punto de encuentro con la astronomía.",
        width: 1920,
        height: 1006,
        exif: { camera: NA, lens: NA, aperture: NA, shutter: NA, iso: NA, date: NA },
      },
      {
        id: "porto-4",
        src: img("porto_4.jpg"),
        alt: "Dos personas observan con asombro a través del telescopio en la plaza de noche",
        caption:
          "Mirar lo lejano — Dos personas observan con asombro a través del telescopio, descubriendo la fascinación del cielo nocturno en medio de la plaza.",
        width: 1920,
        height: 1006,
        exif: { camera: NA, lens: NA, aperture: NA, shutter: NA, iso: NA, date: NA },
      },
      {
        id: "porto-5",
        src: img("porto_5.jpg"),
        alt: "El aficionado apunta el telescopio hacia la luna creciente con un láser verde",
        caption:
          "Trazar el cielo — El aficionado apunta el telescopio hacia la luna creciente con ayuda de un láser verde, demostrando su dedicación a la divulgación astronómica.",
        width: 1536,
        height: 1920,
        exif: { camera: NA, lens: NA, aperture: NA, shutter: NA, iso: NA, date: NA },
      },
      {
        id: "porto-6",
        src: img("porto_6.jpg"),
        alt: "El observador enfoca el firmamento con el telescopio frente al Monumento a la Libertad iluminado de azul",
        caption:
          "El cielo sobre el monumento — El observador enfoca el firmamento a través del telescopio, mientras el monumento a la Libertad une el patrimonio histórico con la ciencia.",
        width: 1920,
        height: 1080,
        exif: { camera: NA, lens: NA, aperture: NA, shutter: NA, iso: NA, date: NA },
      },
      {
        id: "porto-7",
        src: img("porto_7.jpg"),
        alt: "El divulgador sonríe mientras manipula el telescopio en la plaza de noche",
        caption:
          "El rostro del asombro — Con una amplia sonrisa, el divulgador manipula el telescopio y transmite su entusiasmo por acercar la ciencia a las personas.",
        width: 1920,
        height: 1006,
        exif: { camera: NA, lens: NA, aperture: NA, shutter: NA, iso: NA, date: NA },
      },
    ],
    audio: {
      src: audio("plaza-nocturna.mp3"),
      title: "Ambiente sonoro — Plaza nocturna",
      description: "Murmullo de la Plaza de Armas",
    },
    video: {
      youtubeId: "KFCY2xoJIow",
      title: "Documental — Noches en la plaza",
      poster: img("porto_2.jpg"),
    },
  },
  {
    id: "capitulo-2",
    slug: "jean",
    artist: {
      name: "Jean Carlo",
      role: "\"El Pintor Errante\"",
      teaser: "Dibuja rostros a carboncillo de espaldas al bullicio de la feria.",
      portrait: 0,
    },
    pin: { top: 60, left: 56, color: "#388E3C" },
    numeral: "II",
    title: "El caballete nocturno",
    paragraphs: [
      "Un retratista se sienta de espaldas al bullicio de la feria. Sobre el piso brillante descansan sus rostros a carboncillo, esperando que alguien se detenga.",
      "Al terminar la jornada, carga el caballete al hombro como quien carga la herramienta de toda una vida, y cruza la plaza entre luces de neón y faroles antiguos.",
    ],
    layout: "stacked",
    photos: [
      {
        id: "jean-1",
        src: img("jean_1.jpg"),
        alt: "Retratista sentado de espaldas junto a su caballete y un retrato a carboncillo en la plaza de noche",
        caption: "Jean trabaja de espaldas a la feria; sus retratos miran a los paseantes.",
        width: 1920,
        height: 1080,
        exif: { camera: NA, lens: NA, aperture: NA, shutter: NA, iso: NA, date: NA },
      },
      {
        id: "jean-2",
        src: img("jean_2.jpg"),
        alt: "Hombre camina por la plaza con un caballete de madera al hombro y una bolsa verde",
        caption: "Fin de jornada: el caballete vuelve a casa al hombro.",
        width: 1366,
        height: 768,
        exif: {
          camera: NA,
          lens: SIGMA,
          aperture: NA,
          shutter: NA,
          iso: "ISO 250",
          date: "26 oct 2026 · 19:00",
        },
      },
    ],
    audio: {
      src: audio("caballete-nocturno.mp3"),
      title: "Testimonio de voz — El retratista",
      description: "Grabación de campo",
    },
    video: {
      youtubeId: "aqz-KE-bpKQ",
      title: "Video — Jean Carlo, el pintor errante",
      poster: img("jean_1.jpg"),
    },
  },
  {
    id: "capitulo-3",
    slug: "carlos",
    artist: {
      name: "Carlos Antonio",
      role: "\"Manos Imparables\"",
      teaser: "Toca una batería de tambores rescatados, sentado en la acera.",
      portrait: 1,
    },
    pin: { top: 84, left: 86, color: "#6D4C41" },
    numeral: "III",
    title: "Percusión en la acera",
    paragraphs: [
      "Una batería armada con tambores rescatados, cencerros y un platillo gastado. Detrás, las vitrinas navideñas parpadean; delante, la gente pasa sin detenerse, aunque todos llevan el ritmo en los pies.",
      "Carlos toca sentado en el suelo, junto a su silla de ruedas. La calle es su sala de conciertos y una batería de 12 voltios alimenta su parlante.",
    ],
    quote: {
      text: "Todo lo que suena puede ser música; la calle pone el resto.",
    },
    layout: "diptych",
    photos: [
      {
        id: "carlos-1",
        src: img("carlos_1.jpg"),
        alt: "Percusionista sentado en la acera visto a través de la rueda de una bicicleta, con vitrinas navideñas detrás",
        caption: "A través de una rueda: Carlos frente a las vitrinas de Navidad.",
        width: 1616,
        height: 1080,
        exif: {
          camera: NA,
          lens: SIGMA,
          aperture: NA,
          shutter: NA,
          iso: "ISO 2500",
          date: "5 nov 2026 · 21:27",
        },
      },
      {
        id: "carlos-2",
        src: img("carlos_2.jpg"),
        alt: "Hombre mayor toca una batería improvisada con tambores y cencerros en una calle peatonal",
        caption: "Tambores rescatados, cencerros y un parlante a batería.",
        width: 1616,
        height: 1080,
        exif: {
          camera: NA,
          lens: SIGMA,
          aperture: NA,
          shutter: NA,
          iso: "ISO 640",
          date: "5 nov 2026 · 21:27",
        },
      },
    ],
    audio: {
      src: audio("percusion-acera.mp3"),
      title: "Ambiente sonoro — Ritmo en la acera",
      description: "Percusión callejera",
    },
    video: {
      youtubeId: "aqz-KE-bpKQ",
      title: "Video — Carlos Antonio, manos imparables",
      poster: img("carlos_2.jpg"),
    },
  },
  {
    id: "capitulo-4",
    slug: "lugo",
    artist: {
      name: "Luis Lugo",
      role: "\"La Voz Paternal\"",
      teaser: "Canta contra una pared amarilla con su hijo dormido en brazos.",
      portrait: 1,
      portraitFocus: "center 55%",
    },
    pin: { top: 72, left: 80, color: "#E65100" },
    numeral: "IV",
    title: "Canto entre pasos fugaces",
    paragraphs: [
      "Contra una pared amarilla, un padre canta con un micrófono en una mano y a su hijo dormido en el otro brazo. A su lado, otro pequeño sostiene un globo y mira hacia la calle.",
      "Los transeúntes son apenas manchas en movimiento. Lo único quieto en la escena es la familia, y la canción que intenta detener a alguien.",
    ],
    layout: "diptych",
    photos: [
      {
        id: "lugo-1",
        src: img("lugo_1.jpg"),
        alt: "Cantante sentado contra una pared amarilla con niños, mientras peatones pasan desenfocados en movimiento",
        caption: "Larga exposición: la ciudad pasa; la canción permanece.",
        width: 1616,
        height: 1080,
        exif: {
          camera: NA,
          lens: SIGMA,
          aperture: NA,
          shutter: NA,
          iso: "ISO 160",
          date: "5 nov 2026 · 21:05",
        },
      },
      {
        id: "lugo-2",
        src: img("lugo_2.jpg"),
        alt: "Padre canta con micrófono sosteniendo a su hijo dormido, junto a un niño con ropa roja",
        caption: "Lugo canta sin soltar a su hijo dormido.",
        width: 1080,
        height: 1616,
        exif: {
          camera: NA,
          lens: SIGMA,
          aperture: NA,
          shutter: NA,
          iso: "ISO 200",
          date: "5 nov 2026 · 21:07",
        },
      },
    ],
    audio: {
      src: audio("canto-pasos.mp3"),
      title: "Testimonio de voz — Canto en la vereda",
      description: "Voz y ambiente",
    },
    video: {
      youtubeId: "ho92qeOIeLU",
      title: "Fragmento — Canto en el centro",
      poster: img("lugo_1.jpg"),
    },
  },
  {
    id: "capitulo-5",
    slug: "briss",
    artist: {
      name: "Priss Azabache",
      role: "\"La Dama del Asfalto\"",
      teaser: "Convierte la plaza vacía en pista cuando cae la noche.",
      portrait: 0,
      portraitFocus: "center 35%",
    },
    pin: { top: 40, left: 32, color: "#7B1FA2" },
    numeral: "V",
    title: "Sobre ruedas en la noche",
    paragraphs: [
      "Casco con orejas de gato, coderas y un chaleco reflectante. Cuando la plaza se vacía, llegan los patinadores y la convierten en pista.",
      "Briss se desliza alrededor del monumento con la seguridad de quien conoce cada baldosa. La noche, para ella, no es un final: es el momento de empezar a rodar.",
    ],
    quote: {
      text: "De día la plaza es de todos. De noche, por un rato, pertenece a quienes ruedan.",
    },
    layout: "diptych-offset",
    photos: [
      {
        id: "briss-1",
        src: img("briss_1.jpg"),
        alt: "Patinadora con casco de orejas de gato y protecciones, frente al monumento iluminado",
        caption: "Briss frente al monumento, lista para rodar.",
        width: 1536,
        height: 1920,
        exif: { camera: NA, lens: NA, aperture: NA, shutter: NA, iso: NA, date: NA },
      },
      {
        id: "briss-2",
        src: img("briss_2.jpg"),
        alt: "Patinadora señalando a la cámara con la plaza nocturna desenfocada al fondo",
        caption: "Un gesto antes de perderse en la pista.",
        width: 1536,
        height: 1920,
        exif: { camera: NA, lens: NA, aperture: NA, shutter: NA, iso: NA, date: NA },
      },
    ],
    gallery: [
      {
        id: "briss-3",
        src: img("briss_3.jpg"),
        alt: "Patinadora con casco personalizado y coderas posa de frente señalando a la cámara",
        caption:
          "Fuerza y rodaje — La joven patinadora posa con seguridad frente a la cámara, mostrando su indumentaria deportiva y casco personalizado.",
        width: 1536,
        height: 1920,
        exif: { camera: NA, lens: NA, aperture: NA, shutter: NA, iso: NA, date: NA },
      },
      {
        id: "briss-4",
        src: img("briss_4.jpg"),
        alt: "Patinadora con los brazos abiertos frente al monumento iluminado de verde",
        caption:
          "Brazos al viento — Con los brazos extendidos, la patinadora demuestra su equilibrio y confianza frente al monumento iluminado de la plaza.",
        width: 1536,
        height: 1920,
        exif: { camera: NA, lens: NA, aperture: NA, shutter: NA, iso: NA, date: NA },
      },
      {
        id: "briss-5",
        src: img("briss_5.png"),
        alt: "Patinadora cruza en movimiento sobre patines frente al monumento a la Libertad",
        caption:
          "Rodar en la historia — La patinadora cruza en movimiento frente al monumento a la Libertad, mostrando su agilidad sobre ruedas.",
        width: 1070,
        height: 602,
        exif: { camera: NA, lens: NA, aperture: NA, shutter: NA, iso: NA, date: NA },
      },
      {
        id: "briss-6",
        src: img("briss_6.jpg"),
        alt: "Patinadora se desplaza con un brazo extendido para mantener el equilibrio frente al monumento",
        caption:
          "Equilibrio monumental — La joven se desplaza con un brazo extendido para mantener el equilibrio frente al monumento iluminado.",
        width: 1080,
        height: 1616,
        exif: { camera: NA, lens: NA, aperture: NA, shutter: NA, iso: NA, date: NA },
      },
      {
        id: "briss-7",
        src: img("briss_7.jpg"),
        alt: "Patinadora posa con su equipo de protección frente al monumento con luz rosada",
        caption:
          "Brillo en el patín — La patinadora posa con su equipo de protección frente al monumento, transmitiendo seguridad y pasión por el deporte.",
        width: 1536,
        height: 1920,
        exif: { camera: NA, lens: NA, aperture: NA, shutter: NA, iso: NA, date: NA },
      },
    ],
    audio: {
      src: audio("ruedas-noche.ogg"),
      title: "Ambiente sonoro — Ruedas sobre piedra",
      description: "Patines en la plaza",
    },
    video: {
      youtubeId: "tMi6fMegbFs",
      title: "Video — Priss Azabache, la dama del asfalto",
      poster: img("briss_1.jpg"),
    },
  },
];

/** Todas las fotos en orden de lectura (para el visor a pantalla completa). */
export const allPhotos: Photo[] = chapters.flatMap((c) => c.photos);
