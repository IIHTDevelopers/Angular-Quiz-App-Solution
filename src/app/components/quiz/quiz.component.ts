import { Component } from '@angular/core';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  selectedAnswer: number | null = null;
  score: number = 0;
  addingQuestion: boolean = false;
  newQuestion: Question = {
    text: '',
    options: ['', '', '', ''],
    correctAnswer: 0
  };

  constructor() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.questions = [
      {
        text: 'What is the capital of France?',
        options: ['Paris', 'Berlin', 'Madrid', 'Rome'],
        correctAnswer: 0
      },
      {
        text: 'Which planet is known as the Red Planet?',
        options: ['Mars', 'Venus', 'Earth', 'Jupiter'],
        correctAnswer: 0
      },
      {
        text: 'What is the largest mammal?',
        options: ['Elephant', 'Giraffe', 'Blue Whale', 'Lion'],
        correctAnswer: 2
      },
    ];
  }

  selectAnswer(index: number) {
    this.selectedAnswer = index;
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedAnswer = null;
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.selectedAnswer = null;
    }
  }

  submitQuiz() {
    if (this.selectedAnswer !== null) {
      if (this.selectedAnswer === this.questions[this.currentQuestionIndex].correctAnswer) {
        this.score++;
      }
    }
    alert('Quiz submitted! Your score: ' + this.score + ' out of ' + this.questions.length);
  }

  resetQuiz() {
    this.currentQuestionIndex = 0;
    this.selectedAnswer = null;
    this.score = 0;
  }

  showAddQuestionForm() {
    this.addingQuestion = true;
    this.newQuestion = {
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    };
  }

  addNewQuestion() {
    if (this.newQuestion.text && this.newQuestion.options.every((option) => option)) {
      this.questions.push({ ...this.newQuestion });
      this.cancelAddQuestionForm();
    }
  }

  isAddButtonDisabled(): boolean {
    return !(this.newQuestion.text && this.newQuestion.options.every((option) => option));
  }

  cancelAddQuestionForm() {
    this.addingQuestion = false;
    this.newQuestion = {
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    };
  }
}
