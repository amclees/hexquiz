import { Component } from '@angular/core';
import { Question } from './question';

function getQuestions(number) {
  let questions = [];
  for(let i = 0; i < number; i++) {
    questions[i] = new Question;
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
