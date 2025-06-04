import React from "react";
import { Provider } from 'components/ui/provider';
import QuizDataComponent from "./QuizDataComponent";
import {Box, Button, Group, Heading, Text} from "@chakra-ui/react";

function SimpleQuizzComponent() {
    return (
        <Provider>
            <Box>
                <Heading>Quiz Data Component</Heading>
                <Text>This component fetches quiz data from either an API or local JSON file.</Text>
            </Box>

            <QuizDataComponent/>
        </Provider>
    );
}

export default SimpleQuizzComponent;