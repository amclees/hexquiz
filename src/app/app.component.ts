import { Component } from '@angular/core';
import { Question } from './question';

function getQuestions(number) {
  if (number > 12) {
    return [];
  }
  let questions = [];
  let used = [];
  for(let i = 0; i < number; i++) {
    questions[i] = new Question;
    if (used.includes(questions[i].text)) {
      i--;
    } else {
      used.push(questions[i].text);
    }
  }
  return questions;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./main.css']
})

export class AppComponent {
  title = 'Hex Quiz';
  questions = getQuestions(10);
  verifying = false;
  button = 'Finish';
  scoring: string;

  continue () {
    if (this.verifying) {
      this.questions = getQuestions(10);
      this.button = 'Finish';
    } else {
      this.button = 'New Quiz';
      let right = this.questions.reduce(function(acc, question) {
        return acc + (question.correct() ? 1 : 0);
      }, 0);
      let percentage = Math.floor(100 * right / this.questions.length);
      this.scoring = `You scored a ${right}/${this.questions.length} - ${percentage}%.`;
    }
    this.verifying = this.verifying ? false : true;
  }
}
