import { QuizQuestion } from '../types/quiz';

export const getQuestionTitles = (quizData: QuizQuestion[]): string[] => {
    return quizData.map(q => q.question);
};

export const getCategories = (quizData: QuizQuestion[]): string[] => {
    return Array.from(new Set(quizData.map(q => q.category)));
};

export const getDifficulties = (quizData: QuizQuestion[]): string[] => {
    return Array.from(new Set(quizData.map(q => q.difficulty)));
};

/*
quizData: QuizQuestion[] - Array of quiz title, questions and answers.
* */
export const getUniqueQuestionData = (quizData: QuizQuestion[]): string[] => {
    const data = new Set<string>();
    if (!quizData || !Array.isArray(quizData)) {
        return [];
    }

    quizData.forEach(q => {
        if (q.question) {
            data.add(q.question);
        }
        if (q.description) {
            data.add(q.description);
        }
        if (q.explanation) {
            data.add(q.explanation);
        }
        if (q.tip) {
            data.add(q.tip);
        }
        if (q.tags) {
            q.tags.forEach(tag => {
                if (tag.name) {
                    data.add(tag.name);
                }
            });
        }
        if (q.category) {
            data.add(q.category);
        }
        if (q.difficulty) {
            data.add(q.difficulty);
        }
        if (q.correct_answer) {
            data.add(q.correct_answer);
        }
        if (q.correct_answers) {
            Object.values(q.correct_answers).forEach(answer => {
                if (answer) {
                    data.add(answer);
                }
            });
        }
        if (q.answers) {
            Object.values(q.answers).forEach(answer => {
                if (answer) {
                    data.add(answer);
                }
            });
        }
    });
    return Array.from(data);
};
