import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
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
  styleUrls: ['./main.css'],
  animations: [
    trigger('questionIn', [
      state('unfinished', style({
        transform: 'translateX(0)'
      })),
      state('finished', style({
        opacity: 0
      })),
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('400ms ease-in')
      ]),
      transition('* => finished', [
        animate('400ms ease-out')
      ])
    ])
  ]
})

export class QuizComponent {
  questions: Question[];
  verifying = false;
  button = 'New Quiz';
  scoring: string;
  timer = 0;

  constructor() {
    this.verifying = true;
    this.continue();
    setInterval(() => {
      if(!this.verifying) {
        this.timer += 1
      }
    }, 1000);
  }

  continue () {
    if (this.verifying) {
      this.questions = [];
      let questions = getQuestions(10);
      var questionIntervalId = setInterval(() => {
        this.questions.push(questions.pop());
        if(questions.length === 0) {
          clearInterval(questionIntervalId);
        }
      }, 100);
    } else {
      for (let question of this.questions) {
        question.finished = false;
      }
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

  handleAnimationEnd (event, question) {
    if (event.toState === 'finished') {
      question.finished = true;
      if (this.questions.reduce(function(acc, question) {
        return acc && question.finished;
      }, true)) {
        this.continue();
      }
    }
  }
}
