import React, {useState} from "react";
import UseQuizData from "./quizGetData";
import {Box, Button, Flex, Group, Heading} from "@chakra-ui/react";
import {getCategories, getDifficulties, getQuestionTitles} from "./api/quizParser";
import GetDropdown from "./categoryDropdown";
import QuizAccordion from "./QuizAccordion";
type SourceType = "api" | "local";

const QuizDataComponent: React.FC = () => {
    const [params, setParams] = useState<any | null>(null);
    const [source, setSource] = useState<SourceType>("local");

    // Only call the hook if params is set
    const { quizData, loading, error } = UseQuizData(params || undefined, source);

    const handleLoadQuiz = (selectedSource: SourceType) => {
        setSource(selectedSource);
        setParams({
            limit: 10,
            category: "Linux",
            difficulty: "easy",
        });
    };

    let questionData: string[] = [];
    let categories: string[] = [];
    let difficulties: string[] = [];

    if (quizData) {
        questionData = getQuestionTitles(quizData);
        categories = getCategories(quizData);
        difficulties = getDifficulties(quizData);
    }

    // Filter quizData based on selected params
    const filteredQuizData = quizData
        ? quizData.filter((item: any) => {
            return params?.category ? item.category === params.category : true;
        })
        : [];

    return (
        <>
            <Box>
                {/*// chakra button wrapper*/}
                <Group my={4}>
                    {/*<Button onClick={() => handleLoadQuiz("api")}>Load from API</Button>*/}
                    <Button onClick={() => handleLoadQuiz("local")}>Load from Local</Button>
                </Group>
            </Box>

            {/* Categories list */}

            <Box mb={4}>
                <Flex direction="column" gap={4}>
                    {quizData && (
                        <>
                            <Heading>Categories:</Heading>

                            <GetDropdown categories={categories} onCategoryChange={(category: any) => setParams((prev: any) => ({ ...prev, category }))} />
                        </>
                    )}
                </Flex>
            </Box>


            <Box>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}

                {quizData && (
                    <Box>
                        <QuizAccordion quizData={filteredQuizData} />
                    </Box>
                )}
            </Box>
        </>
    );
};

export default QuizDataComponent;