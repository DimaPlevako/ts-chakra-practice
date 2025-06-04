import React from 'react';
import {getQuestionTitles} from "./api/quizParser";
import { Box, Button, Flex, Text, Group, Heading, Accordion } from "@chakra-ui/react";

function QuizAccordion(props: { quizData: any[] }) {
    const { quizData } = props;
    const filteredQuestionTitles = getQuestionTitles(quizData);
    {console.log('QuizData:', JSON.stringify(quizData, null, 2))}

    return (
        <div>
            <Heading size="md" mb={4}>Quiz Questions:</Heading>
            {/*{quizData.map((quiz, index) => (*/}
            {/*    <div key={index} className="quiz-item">*/}
            {/*        <h3>{quiz.title}</h3>*/}
            {/*        <p>{quiz.description}</p>*/}
            {/*        /!* Add more quiz details as needed *!/*/}
            {/*    </div>*/}
            {/*))}*/}

            <Accordion.Root multiple>
                {quizData.map((quiz, index) => (
                    <Accordion.Item key={index} id={quiz.id} value={quiz.value}>
                        <Accordion.ItemTrigger>
                            <Flex justifyContent="space-between" alignItems="center">
                                <Heading size="sm">
                                    {'Question #' + (index + 1) + ': '}
                                    <Text textStyle="sm">
                                        {quiz.question}
                                    </Text>
                                </Heading>
                                <Accordion.ItemIndicator />
                            </Flex>
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent>
                            <Accordion.ItemBody>
                                <Box p={4}>
                                    {quiz.description}
                                    {/* Add more quiz details as needed */}
                                </Box>
                            </Accordion.ItemBody>
                        </Accordion.ItemContent>
                    </Accordion.Item>
                ))}
                {/*<div key={index} className="quiz-item">*/}
                {/*    <h3>{quiz.title}</h3>*/}
                {/*    <p>{quiz.description}</p>*/}
                {/*    /!* Add more quiz details as needed *!/*/}
                {/*</div>*/}
                {/*{items.map((item, index) => (*/}
                {/*    <Accordion.Item key={index} value={item.value}>*/}
                {/*        <Accordion.ItemTrigger>*/}
                {/*            <Span flex="1">{item.title}</Span>*/}
                {/*            <Accordion.ItemIndicator />*/}
                {/*        </Accordion.ItemTrigger>*/}
                {/*        <Accordion.ItemContent>*/}
                {/*            <Accordion.ItemBody>{item.text}</Accordion.ItemBody>*/}
                {/*        </Accordion.ItemContent>*/}
                {/*    </Accordion.Item>*/}
                {/*))}*/}
            </Accordion.Root>
        </div>
    );
}

export default QuizAccordion;


