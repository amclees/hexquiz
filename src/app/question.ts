const hex = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F'
];

const bin = [
  '0000',
  '0001',
  '0010',
  '0011',
  '0100',
  '0101',
  '0110',
  '0111',
  '1000',
  '1001',
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
  input: string;
  static hex_strings: string[];
  static bin_strings: string[];

  constructor(length?: number) {
    let direction = Math.random() < 0.5;
    this.text = '';
    this.answer = '';
    if(!length) {
      length = Math.random() * 5;
    }
    for(var i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * hex.length);
      this.text += direction ? hex[index] : bin[index];
      this.answer += direction ? bin[index] : hex[index];
    }
    this.input = '';
  }

  correct() {
    return this.answer === this.input.trim().toUpperCase();
  }
}

Question.hex_strings = hex;
Question.bin_strings = bin;
