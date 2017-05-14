const hex = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F'
];

const bin = [
  '1010',
  '1011',
  '1100',
  '1101',
  '1110',
  '1111'
];

export class Question {
  text: string;
  answer: string;

  constructor() {
    let direction = Math.random() < 0.5;
    let index = Math.floor(Math.random() * hex.length);
    this.text = direction ? hex[index] : bin[index];
    this.answer = direction ? bin[index] : hex[index];
  }
}
