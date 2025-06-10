import React, {useState} from 'react';
import { QuizQuestion } from './types/quiz';
import {Box, Button, Flex, Text, Heading, Accordion, CheckboxCard, Stack} from "@chakra-ui/react";

interface QuizAccordionProps {
    onSubmitAnswer: (selected: string[]) => void;
    quizData: QuizQuestion[];
}

const QuizAccordion: React.FC<QuizAccordionProps> = ({ onSubmitAnswer, quizData }) => {
    const [selected, setSelected] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submittedQuestionId, setSubmittedQuestionId] = useState<string | null>(null);

    if (!quizData || quizData.length === 0) {
        return <Text>No quiz questions available.</Text>;
    }

    const handleCheckboxChange = (value: string) => {
        setSelected([...selected, value]);
    }

    const handleSubmit = (questionId: string) => {
        setIsSubmitting(true);
        setSubmittedQuestionId(questionId);
        onSubmitAnswer(selected);

        const result = compareAnswer(questionId, selected, quizData);
        console.log(result.isCorrect, result.correctAnswers, result.userAnswers);
    };

    const getCheckboxClass = (
        quiz: QuizQuestion,
        answerKey: string,
        submittedQuestionId: string | null
    ) => {
        if (submittedQuestionId !== String(quiz.id)) return '';
        const isCorrect = quiz.correct_answers[`${answerKey}_correct`] === "true";
        return isCorrect ? 'green' : 'red';
    };

    const compareAnswer = (
        questionId: string,
        selected: string[],
        quizData: QuizQuestion[]
    ) => {
        const quiz = quizData.find(q => String(q.id) === questionId);
        if (!quiz) return { isCorrect: false, correctAnswers: [], userAnswers: selected };

        // Get correct answer keys (e.g., answer_b)
        const correctKeys = Object.entries(quiz.correct_answers)
            .filter(([_, v]) => v === "true")
            .map(([k]) => k.replace('_correct', ''));

        // Map selected keys to answer keys (e.g., answer_b)
        const selectedKeys = selected.map(key => key.startsWith('answer_') ? key : `answer_${key}`);

        // For multiple correct answers
        if (quiz.multiple_correct_answers === "true") {
            const allCorrect = correctKeys.length === selectedKeys.length &&
                correctKeys.every(k => selectedKeys.includes(k));
            return { isCorrect: allCorrect, correctAnswers: correctKeys, userAnswers: selectedKeys };
        } else {
            // Single correct answer
            const isCorrect = selectedKeys.length === 1 && correctKeys.includes(selectedKeys[0]);
            return { isCorrect, correctAnswers: correctKeys, userAnswers: selectedKeys };
        }
    };
    return (
        <div>
            <Heading size="md" mb={4}>Quiz Questions:</Heading>

            <Accordion.Root multiple>
                {quizData.map((quiz, index) => (
                    <Accordion.Item key={quiz.id} id={quiz.id} value={quiz.question}>
                        <Accordion.ItemTrigger my={'3'} bg='orange' color={'black'} border="1px solid" borderColor="gray.200"  p={4}>
                            <Flex w="100%" justifyContent="space-between" alignItems="center">
                                <Heading size="sm">
                                    {'Question #' + (index + 1) + ': '}
                                    <Text textStyle="sm">
                                        {quiz.question}
                                    </Text>
                                    <Text textStyle="xs">
                                        {'(' + quiz.description + ')'}
                                    </Text>
                                </Heading>
                                <Accordion.ItemIndicator color={'black'} />
                            </Flex>
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent>
                            <Accordion.ItemBody p={2} bg='gray.600'>
                                <Stack>
                                    {Object.entries(quiz.answers).map(([key, value]) => (
                                        value ? (
                                            <Box >
                                                <CheckboxCard.Root
                                                    size={'md'}
                                                    flex={1}
                                                    key={key}
                                                    value={value}
                                                    bg='orange' color={'black'}
                                                    colorPalette={getCheckboxClass(quiz, key, submittedQuestionId)}

                                                    onChange={() => handleCheckboxChange(key)}
                                                    disabled={submittedQuestionId === String(quiz.id)}
                                                >
                                                    <CheckboxCard.HiddenInput />
                                                    <CheckboxCard.Control >
                                                        <CheckboxCard.Indicator />

                                                        <CheckboxCard.Content>
                                                            <CheckboxCard.Label>
                                                                {value}
                                                            </CheckboxCard.Label>
                                                        </CheckboxCard.Content>
                                                    </CheckboxCard.Control>
                                                </CheckboxCard.Root>
                                            </Box>
                                        ) : null
                                    ))}
                                    <Box>
                                        {/* submit quiz choose */}
                                        <Button
                                            colorScheme="blue"
                                            onClick={() => handleSubmit(String(quiz.id))}
                                            width="100%"
                                            mt={2}
                                            disabled={submittedQuestionId === String(quiz.id)}
                                        >
                                            Submit
                                        </Button>
                                    </Box>
                                </Stack>
                            </Accordion.ItemBody>
                        </Accordion.ItemContent>
                    </Accordion.Item>
                ))}
            </Accordion.Root>
        </div>
    );
}

export default QuizAccordion;


