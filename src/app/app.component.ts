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
  getQuestions = getQuestions;
}
