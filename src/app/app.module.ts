import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { IntroComponent } from './intro.component';
import { QuizComponent } from './quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    QuizComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: IntroComponent
      },
      {
        path: 'quiz',
        component: QuizComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
