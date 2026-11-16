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

export type ChapterLayout = "stacked" | "diptych" | "diptych-offset";

export type Chapter = {
  id: string;
  numeral: string;
  title: string;
  paragraphs: string[];
  /** Cita narrativa en serif. Añade `attribution` solo con testimonios reales. */
  quote?: { text: string; attribution?: string };
  layout: ChapterLayout;
  photos: [Photo, Photo];
  audio: AudioTrack;
  video?: VideoBlock;
};

const SIGMA = "Sigma 18–50mm F2.8 DC DN | C";
const NA = "—";

const img = (name: string) => `/assets/images/${name}`;
const audio = (name: string) => `/assets/audio/${name}`;

export const essay = {
  title: "Lo que la noche sostiene",
  subtitle:
    "Cinco oficios, cinco presencias: un recorrido por las calles del centro de Trujillo cuando la ciudad baja la voz y la plaza se vuelve escenario.",
  kicker: "Fotoensayo multimedia",
  author: "Johan Salvador Azañero",
  date: "Octubre – Noviembre 2026",
  location: "Centro Histórico de Trujillo, Perú",
  cover: img("porto_1.jpg"),
  intro: [
    "Cuando cae la noche, el centro no se apaga: cambia de habitantes. Entre faroles y baldosas húmedas aparecen quienes hacen de la calle su taller, su escenario y su pista.",
    "Este ensayo los acompaña en cinco capítulos. Cada uno reúne dos fotografías, un paisaje sonoro y, cuando existe, un fragmento en video. Pulsa cualquier imagen para verla a pantalla completa.",
  ],
};

export const chapters: Chapter[] = [
  {
    id: "capitulo-1",
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
    audio: {
      src: audio("plaza-nocturna.mp3"),
      title: "Ambiente sonoro — Plaza nocturna",
      description: "Murmullo de la Plaza de Armas",
    },
    video: {
      youtubeId: "aqz-KE-bpKQ",
      title: "Documental — Noches en la plaza",
      poster: img("porto_2.jpg"),
    },
  },
  {
    id: "capitulo-2",
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
  },
  {
    id: "capitulo-3",
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
  },
  {
    id: "capitulo-4",
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
      youtubeId: "aqz-KE-bpKQ",
      title: "Fragmento — Canto en el centro",
      poster: img("lugo_1.jpg"),
    },
  },
  {
    id: "capitulo-5",
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
    audio: {
      src: audio("ruedas-noche.ogg"),
      title: "Ambiente sonoro — Ruedas sobre piedra",
      description: "Patines en la plaza",
    },
  },
];

/** Todas las fotos en orden de lectura (para el visor a pantalla completa). */
export const allPhotos: Photo[] = chapters.flatMap((c) => c.photos);
