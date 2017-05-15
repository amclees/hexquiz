import { Component } from '@angular/core';
import { Question } from './question';

function getQuestions(number, length = null) {
  if (number > Question.hex_strings.length) {
    return [];
  }
  let questions = [];
  let used = [];
  for (let i = 0; i < number; i++) {
    questions[i] = length ? new Question(length) : new Question;
    if (used.includes(questions[i].text)) {
      i--;
    } else {
      used.push(questions[i].text);
    }
  }
  return questions;
}

@Component({
  selector: 'hexquiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./main.css']
})

export class QuizComponent {
  questions = getQuestions(10);
  verifying = false;
  button = 'Finish';
  scoring: string;
  timer = 0;

  constructor() {
    setInterval(() => {
      if(!this.verifying) {
        this.timer += 1
      }
    }, 1000);
  }

  continue () {
    if (this.verifying) {
      this.questions = getQuestions(10);
      this.button = 'Finish';
    } else {
      this.button = 'New Quiz';
      let right = this.questions.reduce(function(acc, question) {
        return acc + (question.correct() ? 1 : 0);
      }, 0);
      let totalCharacters = this.questions.reduce(function(acc, question) {
        return acc + question.length;
      }, 0);
      let percentage = Math.floor(100 * right / this.questions.length);
      let rate = Math.round(100 * this.timer / totalCharacters) / 100;
      this.scoring = `You scored a ${right}/${this.questions.length} - ${percentage}% in ${this.timer} seconds. It took you ${rate} seconds to convert each hex digit.`;
      //this.conversionsPerSecond = ${}
      this.timer = 0;
    }
    this.verifying = this.verifying ? false : true;
  }
}
