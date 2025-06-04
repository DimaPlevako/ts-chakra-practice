export interface QuizQuestion {
    id: number;
    question: string;
    description: string;
    answers: Record<string, string | null>;
    multiple_correct_answers: string;
    correct_answers: Record<string, string>;
    correct_answer: string | null;
    explanation: string | null;
    tip: string | null;
    tags: { name: string }[];
    category: string;
    difficulty: string;
}