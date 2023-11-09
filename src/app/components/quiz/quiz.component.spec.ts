import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { QuizComponent } from './quiz.component';
import { FormsModule } from '@angular/forms';

describe('QuizComponent', () => {
  let fixture: ComponentFixture<QuizComponent>;
  let component: QuizComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizComponent],
      imports: [FormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  window.alert = (message: string) => { };

  describe('boundary', () => {
    it('should create the QuizComponent', () => {
      expect(component).toBeTruthy();
    });

    it('should load questions', () => {
      expect(component.questions.length).toBeGreaterThan(0);
    });

    it('should handle question selection', () => {
      component.selectAnswer(1);
      expect(component.selectedAnswer).toBe(1);
    });

    it('should handle next question', () => {
      const initialQuestionIndex = component.currentQuestionIndex;
      component.nextQuestion();
      expect(component.currentQuestionIndex).toBe(initialQuestionIndex + 1);
    });

    it('should handle previous question', () => {
      component.currentQuestionIndex = 1;
      component.previousQuestion();
      expect(component.currentQuestionIndex).toBe(0);
    });

    it('should submit the quiz with correct answer', () => {
      component.selectAnswer(0);
      component.submitQuiz();
      expect(component.score).toBe(1);
    });

    it('should submit the quiz with incorrect answer', () => {
      component.selectAnswer(2);
      component.submitQuiz();
      expect(component.score).toBe(0);
    });

    it('should reset the quiz', () => {
      component.currentQuestionIndex = 2;
      component.selectAnswer(3);
      component.score = 1;
      component.resetQuiz();
      expect(component.currentQuestionIndex).toBe(0);
      expect(component.selectedAnswer).toBeNull();
      expect(component.score).toBe(0);
    });

    it('should show the "Add Question" form', () => {
      component.showAddQuestionForm();
      expect(component.addingQuestion).toBe(true);
    });

    it('should add a new question', () => {
      component.newQuestion.text = 'What is 2 + 2?';
      component.newQuestion.options = ['3', '4', '5', '6'];
      component.newQuestion.correctAnswer = 1;
      component.addNewQuestion();
      expect(component.questions.length).toBeGreaterThan(3);
    });

    it('should disable "Add" button when fields are not filled', () => {
      component.newQuestion.text = '';
      component.newQuestion.options = ['', '', '', ''];
      component.newQuestion.correctAnswer = 0;
      const addButton = fixture.nativeElement.querySelector('button[name="Add"]');
      fixture.detectChanges();
      if (addButton) {
        expect(addButton.disabled).toBe(true);
      }
    });

    it('should cancel the "Add Question" form', () => {
      component.showAddQuestionForm();
      component.cancelAddQuestionForm();
      expect(component.addingQuestion).toBe(false);
    });

    it('should disable "Previous" button on the first question', () => {
      component.currentQuestionIndex = 0;
      const previousButton = fixture.nativeElement.querySelector('.controls button:nth-child(1)');
      fixture.detectChanges();
      expect(previousButton.disabled).toBe(true);
    });

    it('should disable "Next" button on the last question', () => {
      component.currentQuestionIndex = component.questions.length - 1;
      const nextButton = fixture.nativeElement.querySelector('.controls button:nth-child(2)');
      fixture.detectChanges();
      expect(nextButton.disabled).toBe(true);
    });

    it('should not display the "Add Question" form initially', () => {
      const addQuestionForm = fixture.nativeElement.querySelector('.add-question-form');
      expect(addQuestionForm).toBeNull();
    });

    it('should reset the "Add Question" form after adding a question', () => {
      component.showAddQuestionForm();
      component.addNewQuestion();
      const addQuestionForm = fixture.nativeElement.querySelector('.add-question-form');
      expect(addQuestionForm).toBeNull();
    });

    it('should not add a new question when fields are not filled', () => {
      component.newQuestion.text = 'What is the answer?';
      component.newQuestion.options = ['', '', '', ''];
      component.newQuestion.correctAnswer = 0;
      component.addNewQuestion();
      expect(component.questions.length).toBe(3);
    });

    it('should not show the "Add Question" form after adding a question', () => {
      component.newQuestion.text = 'What is 2 + 2?';
      component.newQuestion.options = ['3', '4', '5', '6'];
      component.newQuestion.correctAnswer = 1;
      component.addNewQuestion();
      expect(component.addingQuestion).toBe(false);
    });
  });
});
