class QuizApp {
    constructor() {
        this.currentUser = null;
        this.currentQuiz = null;
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        this.quizResults = JSON.parse(localStorage.getItem('quizResults')) || [];
        this.userAttempts = JSON.parse(localStorage.getItem('userAttempts')) || {};
        
        this.initializeApp();
    }

    initializeApp() {
        this.bindEvents();
        this.showPage('landingPage');
    }

    bindEvents() {
        // Landing page
        document.getElementById('startBtn').addEventListener('click', () => {
            this.showPage('registrationPage');
        });

        // Registration
        document.getElementById('registrationForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegistration();
        });

        // Quiz navigation
        document.getElementById('nextBtn').addEventListener('click', () => {
            this.handleNextQuestion();
        });

        // Results page
        document.getElementById('viewLeaderboardBtn').addEventListener('click', () => {
            this.showLeaderboard();
        });

        document.getElementById('takeAnotherQuizBtn').addEventListener('click', () => {
            this.showPage('quizSelectionPage');
        });

        // Leaderboard
        document.getElementById('backToQuizzesBtn').addEventListener('click', () => {
            this.showPage('quizSelectionPage');
        });

        // Leaderboard tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchLeaderboardTab(e.target.dataset.quiz);
            });
        });
    }

    showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');
    }

    handleRegistration() {
        const name = document.getElementById('studentName').value.trim();
        const enrollment = document.getElementById('enrollmentNo').value.trim();

        if (!name || !enrollment) {
            alert('Please fill in all fields');
            return;
        }

        this.currentUser = { name, enrollment };
        
        // Display user info
        document.getElementById('userNameDisplay').textContent = name;
        document.getElementById('enrollmentDisplay').textContent = enrollment;

        this.loadQuizSelection();
        this.showPage('quizSelectionPage');
    }

    loadQuizSelection() {
        const quizGrid = document.getElementById('quizGrid');
        quizGrid.innerHTML = '';

        Object.keys(quizData).forEach(quizId => {
            const quiz = quizData[quizId];
            const userKey = `${this.currentUser.enrollment}_${quizId}`;
            const hasAttempted = this.userAttempts[userKey];

            const quizCard = document.createElement('div');
            quizCard.className = 'quiz-card';
            quizCard.innerHTML = `
                <h3>${quiz.title}</h3>
                <p>${quiz.description}</p>
                <div class="quiz-meta">
                    <span>${quiz.questions.length} Questions</span>
                    <span>${hasAttempted ? '✅ Completed' : '📝 Not Attempted'}</span>
                </div>
            `;

            if (!hasAttempted) {
                quizCard.addEventListener('click', () => {
                    this.startQuiz(quizId);
                });
            } else {
                quizCard.style.opacity = '0.6';
                quizCard.style.cursor = 'not-allowed';
                quizCard.title = 'You have already taken this quiz';
            }

            quizGrid.appendChild(quizCard);
        });
    }

    startQuiz(quizId) {
        this.currentQuiz = quizData[quizId];
        this.currentQuizId = quizId;
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;

        document.getElementById('currentQuizTitle').textContent = this.currentQuiz.title;
        document.getElementById('totalQuestions').textContent = this.currentQuiz.questions.length;

        this.loadQuestion();
        this.showPage('quizPage');
    }

    loadQuestion() {
        const question = this.currentQuiz.questions[this.currentQuestionIndex];
        const questionNumber = this.currentQuestionIndex + 1;
        const totalQuestions = this.currentQuiz.questions.length;

        // Update progress
        document.getElementById('currentQuestion').textContent = questionNumber;
        const progressPercent = (questionNumber / totalQuestions) * 100;
        document.getElementById('progressFill').style.width = `${progressPercent}%`;

        // Load question
        document.getElementById('questionText').textContent = question.question;

        // Load options
        const optionsContainer = document.getElementById('optionsContainer');
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.textContent = option;
            optionDiv.addEventListener('click', () => {
                this.selectOption(index);
            });
            optionsContainer.appendChild(optionDiv);
        });

        // Reset next button
        document.getElementById('nextBtn').disabled = true;
        document.getElementById('nextBtn').textContent = 
            questionNumber === totalQuestions ? 'Finish Quiz' : 'Next Question';
    }

    selectOption(selectedIndex) {
        // Remove previous selections
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
        });

        // Add selection to clicked option
        document.querySelectorAll('.option')[selectedIndex].classList.add('selected');

        // Store answer
        this.userAnswers[this.currentQuestionIndex] = selectedIndex;

        // Enable next button
        document.getElementById('nextBtn').disabled = false;
    }

    handleNextQuestion() {
        const currentQuestion = this.currentQuiz.questions[this.currentQuestionIndex];
        const userAnswer = this.userAnswers[this.currentQuestionIndex];
        
        // Check if answer is correct
        if (userAnswer === currentQuestion.correct) {
            this.score++;
        }

        // Move to next question or finish quiz
        if (this.currentQuestionIndex < this.currentQuiz.questions.length - 1) {
            this.currentQuestionIndex++;
            this.loadQuestion();
        } else {
            this.finishQuiz();
        }
    }

    finishQuiz() {
        const totalQuestions = this.currentQuiz.questions.length;
        const percentage = Math.round((this.score / totalQuestions) * 100);

        // Mark quiz as attempted
        const userKey = `${this.currentUser.enrollment}_${this.currentQuizId}`;
        this.userAttempts[userKey] = true;
        localStorage.setItem('userAttempts', JSON.stringify(this.userAttempts));

        // Store result
        const result = {
            user: this.currentUser,
            quiz: this.currentQuizId,
            quizTitle: this.currentQuiz.title,
            score: this.score,
            totalQuestions: totalQuestions,
            percentage: percentage,
            timestamp: new Date().toISOString()
        };

        this.quizResults.push(result);
        localStorage.setItem('quizResults', JSON.stringify(this.quizResults));

        // Show results
        this.showResults(percentage, totalQuestions);
    }

    showResults(percentage, totalQuestions) {
        document.getElementById('scorePercentage').textContent = `${percentage}%`;
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('totalScore').textContent = totalQuestions;

        // Performance message
        let performanceMessage = '';
        if (percentage >= 90) {
            performanceMessage = '🎉 Excellent! Outstanding performance!';
        } else if (percentage >= 75) {
            performanceMessage = '👏 Great job! Well done!';
        } else if (percentage >= 60) {
            performanceMessage = '👍 Good work! Keep practicing!';
        } else {
            performanceMessage = '📚 Keep studying! You can do better!';
        }

        document.getElementById('performanceMessage').textContent = performanceMessage;
        this.showPage('resultsPage');
    }

    showLeaderboard() {
        this.switchLeaderboardTab('all');
        this.showPage('leaderboardPage');
    }

    switchLeaderboardTab(tabType) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-quiz="${tabType}"]`).classList.add('active');

        // Filter results
        let results = [...this.quizResults];
        if (tabType === 'current') {
            results = results.filter(result => result.quiz === this.currentQuizId);
        }

        // Sort by score (descending) then by timestamp (ascending for same scores)
        results.sort((a, b) => {
            if (b.percentage !== a.percentage) {
                return b.percentage - a.percentage;
            }
            return new Date(a.timestamp) - new Date(b.timestamp);
        });

        this.displayLeaderboard(results);
    }

    displayLeaderboard(results) {
        const container = document.getElementById('leaderboardContainer');
        container.innerHTML = '';

        if (results.length === 0) {
            container.innerHTML = '<p style="text-align: center; padding: 20px;">No results yet!</p>';
            return;
        }

        results.forEach((result, index) => {
            const rank = index + 1;
            let rankClass = '';
            let rankDisplay = `#${rank}`;

            if (rank === 1) {
                rankClass = 'gold';
                rankDisplay = '🥇';
            } else if (rank === 2) {
                rankClass = 'silver';
                rankDisplay = '🥈';
            } else if (rank === 3) {
                rankClass = 'bronze';
                rankDisplay = '🥉';
            }

            const item = document.createElement('div');
            item.className = 'leaderboard-item';
            item.innerHTML = `
                <div class="rank ${rankClass}">${rankDisplay}</div>
                <div class="student-info">
                    <div class="student-name">${result.user.name}</div>
                    <div class="enrollment">${result.user.enrollment}</div>
                </div>
                <div class="score">${result.percentage}%</div>
            `;

            container.appendChild(item);
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});
