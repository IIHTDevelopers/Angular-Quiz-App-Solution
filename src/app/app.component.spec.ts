import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { QuizComponent } from './components/quiz/quiz.component';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, QuizComponent],
        });

        fixture = TestBed.createComponent(AppComponent);
    });

    describe('boundary', () => {
        it('should display the title', () => {
            const titleElement: HTMLElement = fixture.nativeElement.querySelector('h2');
            expect(titleElement.textContent).toContain('Welcome to QuizMaster');
        });

        it('should contain the app-quiz component', () => {
            const quizComponent = fixture.nativeElement.querySelector('app-quiz');
            expect(quizComponent).not.toBeNull();
        });

    });
});
