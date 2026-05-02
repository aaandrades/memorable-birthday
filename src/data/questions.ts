// ============================================================
// BIRTHDAY TRIVIA QUESTIONS — edit this file to add real content
//
// Each question supports these fields:
//   question  (required) — what the MC reads aloud
//   answer    (required) — shown on the REVEAL screen
//   imageSrc  (optional) — path like "/images/q1.jpg" (drop file in public/images/)
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
    question: "[QUESTION_1]",
    answer: "[ANSWER_1]",
    imageSrc: "/images/q1.jpg",
    imageAlt: "Photo for question 1",
    hint: "[HINT_1]",
  },
  {
    id: 2,
    question: "[QUESTION_2]",
    answer: "[ANSWER_2]",
    hint: "[HINT_2]",
  },
  {
    id: 3,
    question: "[QUESTION_3]",
    answer: "[ANSWER_3]",
    imageSrc: "/images/q3.jpg",
    imageAlt: "Photo for question 3",
  },
  {
    id: 4,
    question: "[QUESTION_4]",
    answer: "[ANSWER_4]",
    hint: "[HINT_4]",
  },
  {
    id: 5,
    question: "[QUESTION_5]",
    answer: "[ANSWER_5]",
    imageSrc: "/images/q5.jpg",
    imageAlt: "Photo for question 5",
    hint: "[HINT_5]",
  },
  {
    id: 6,
    question: "[QUESTION_6]",
    answer: "[ANSWER_6]",
  },
  {
    id: 7,
    question: "[QUESTION_7]",
    answer: "[ANSWER_7]",
    hint: "[HINT_7]",
  },
  {
    id: 8,
    question: "[QUESTION_8]",
    answer: "[ANSWER_8]",
    imageSrc: "/images/q8.jpg",
    imageAlt: "Photo for question 8",
  },
  {
    id: 9,
    question: "[QUESTION_9]",
    answer: "[ANSWER_9]",
    hint: "[HINT_9]",
  },
  {
    id: 10,
    question: "[QUESTION_10]",
    answer: "[ANSWER_10]",
    imageSrc: "/images/q10.jpg",
    imageAlt: "Photo for question 10",
    hint: "[HINT_10]",
  },
  {
    id: 11,
    question: "[QUESTION_11]",
    answer: "[ANSWER_11]",
  },
  {
    id: 12,
    question: "[QUESTION_12]",
    answer: "[ANSWER_12]",
    hint: "[HINT_12]",
  },
  {
    id: 13,
    question: "[QUESTION_13]",
    answer: "[ANSWER_13]",
    imageSrc: "/images/q13.jpg",
    imageAlt: "Photo for question 13",
  },
  {
    id: 14,
    question: "[QUESTION_14]",
    answer: "[ANSWER_14]",
    hint: "[HINT_14]",
  },
  {
    id: 15,
    question: "[QUESTION_15]",
    answer: "[ANSWER_15]",
    imageSrc: "/images/q15.jpg",
    imageAlt: "Photo for question 15",
    hint: "[HINT_15]",
  },
  {
    id: 16,
    question: "[QUESTION_16]",
    answer: "[ANSWER_16]",
  },
  {
    id: 17,
    question: "[QUESTION_17]",
    answer: "[ANSWER_17]",
    hint: "[HINT_17]",
  },
  {
    id: 18,
    question: "[QUESTION_18]",
    answer: "[ANSWER_18]",
    imageSrc: "/images/q18.jpg",
    imageAlt: "Photo for question 18",
  },
  {
    id: 19,
    question: "[QUESTION_19]",
    answer: "[ANSWER_19]",
    hint: "[HINT_19]",
  },
  {
    id: 20,
    question: "[QUESTION_20]",
    answer: "[ANSWER_20]",
    imageSrc: "/images/q20.jpg",
    imageAlt: "Photo for question 20",
    hint: "[HINT_20]",
  },
  {
    id: 21,
    question: "[QUESTION_21]",
    answer: "[ANSWER_21]",
    hint: "[HINT_21]",
  },
];
