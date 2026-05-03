// ============================================================
// BIRTHDAY TRIVIA QUESTIONS — edit this file to add real content
//
// Each question supports these fields:
//   question  (required) — what the MC reads aloud
//   answer    (required) — shown on the REVEAL screen
//   imageSrc  (optional) — path like "/images/q1.jpeg" (drop file in public/images/)
//   imageAlt  (optional) — screen-reader description of the image
//   hint      (optional) — shown automatically after 10 s on the QUESTION screen
// ============================================================

export interface Question {
  id: number;
  question: string;
  answer: string;
  imageSrc?: string;
  imageAlt?: string;
  hint?: string;
}

export const ALL_QUESTIONS: Question[] = [
  {
    id: 1,
    imageSrc: "/images/1.jpeg",
    imageAlt: "Photo for question 1",
    question: "Cuando viajo a México la cumpleañera tuvo un incidente que no le permitió disfrutar al 100% del viaje. ¿Cuál fue el incidente?",
    answer: "La pico una medusa",
    hint: "Fue un incidente inesperado durante el viaje.",
  },
  {
    id: 2,
    question: "Nombre los dos tipos de comida favorita de la cumpleañera.",
    answer: "mexicana e italiana",
    hint: "Son dos cocinas distintas.",
  },
  {
    id: 3,
    imageSrc: "/images/3.jpeg",
    imageAlt: "Photo for question 3",
    question: "¿Cuál es el celebrity crush de la cumpleañera desde adolescente?",
    answer: "Robert Pattinson",
  },
  {
    id: 4,
    imageSrc: "/images/4.jpeg",
    imageAlt: "Photo for question 4",
    question: "Mucha de nuestras mascotas tiene segundo nombre, ¿Cuál es el segundo nombre de Isis o de Morgan?",
    answer: "Eduardo y Marisel",
    hint: "Son nombres de señor o señora.",
  },
  {
    id: 5,
    question: "¿De dónde vienen los dos nombres de la cumpleañera?",
    answer: "Esperanza por la Mamá y María por la Virgen",
    hint: "Cada nombre tiene un origen especial relacionado con personas importantes en su vida.",
  },
  {
    id: 6,
    imageSrc: "/images/6.jpeg",
    imageAlt: "Photo for question 6",
    question: "¿Cuantos herman@s tiene la cumpleañera?",
    answer: "3",
  },
  {
    id: 7,
    imageSrc: "/images/7.jpeg",
    imageAlt: "Photo for question 7",
    question: "¿Cuál es la canción mundialmente famosa canción lanzada por las spice girls en 1996?",
    answer: "Wannabe",
    hint: "Es una canción icónica de los 90s.",
  },
  {
    id: 8,
    question: "Ya que muchos acá son fans ¿Cuál es el nombre real Karol G?",
    answer: "Carolina Giraldo",
  },
  {
    id: 9,
    imageSrc: "/images/9.jpeg",
    imageAlt: "Photo for question 9",
    question: "¿Qué Princesa de la familia real británica utilizo el icónico 'vestido de la venganza' negro la misma noche que su esposo admitió una infidelidad?",
    answer: "Lady Diana",
    hint: "Fue una princesa muy conocida y querida.",
  },
  {
    id: 10,
    imageSrc: "/images/10.jpeg",
    imageAlt: "Photo for question 10",
    question: "Cuál es el nombre a los 3 miembros de los Jonas Brothers?",
    answer: "Nick, Kevin, Joe",
    hint: "Son hermanos y músicos.",
  },
  {
    id: 11,
    imageSrc: "/images/11.jpeg",
    imageAlt: "Photo for question 11",
    question: "¿Quién es la actual pareja de Justin Trudeau?",
    answer: "Katy Perry",
  },
  {
    id: 12,
    imageSrc: "/images/12.jpeg",
    imageAlt: "Photo for question 12",
    question: "Nombre al futbolista más famoso que ha portado la camiseta con el numero 30",
    answer: "Messi",
    hint: "Juega como delantero.",
  },
  {
    id: 13,
    question: "¿Qué selección nacional ganó la Eurocopa de fútbol en el año 1996?",
    answer: "Alemania",
  },
  {
    id: 14,
    question: "Menciona las tres marcas de cerveza colombiana que todo el mundo conoce",
    answer: "Águila, Poker, Club Colombia",
  },
  {
    id: 15,
    question: "¿Cómo se llama el máximo anotador de la historia de la NBA?",
    answer: "LeBron James",
    hint: "Es estadounidense y de color de piel oscura.",
  },
  {
    id: 16,
    question: "¿Cómo se llama el boxeador que le arrancó un pedazo de oreja a su oponente en plena pelea en 1997?",
    answer: "Mike Tyson",
  },
  {
    id: 17,
    imageSrc: "/images/17.jpeg",
    imageAlt: "Photo for question 17",
    question: "¿Quién es el personaje histórico que aparece en el billete de 50 mil pesos colombianos?",
    answer: "Gabriel García Márquez",
    hint: "Sus putas son muy famosas",
  },
  {
    id: 18,
    imageSrc: "/images/18.png",
    imageAlt: "Photo for question 18",
    question: "¿Cuál es el animal nacional de Colombia?",
    answer: "El cóndor de los Andes",
  },
  {
    id: 19,
    question: "¿Cuál es el nombre del río más largo del mundo (que también pasa por Colombia)?",
    answer: "Río Amazonas",
    hint: "Pasa por varios países sudamericanos.",
  },
  {
    id: 20,
    question: "¿Qué famoso animal fue el primer mamífero clonado en el año en que naciste?",
    answer: "La oveja Dolly",
    hint: "Fue un hito en la historia de la biología.",
  },
  {
    id: 21,
    imageSrc: "/images/21.jpeg",
    imageAlt: "Photo for question 21",
    question: "¿Cómo se llama el paso de baile de Michael Jackson, donde parece que camina hacia atrás?",
    answer: "Moonwalk",
    hint: "Andres sabe hacerlo",
  },
];
