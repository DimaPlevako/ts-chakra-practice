
import Todos from "components/todo/Todos";
import NewTodo from "components/todo/NewTodo";
import {TodosContextProvider} from "store/todos-context";
import { Provider } from 'components/ui/provider';
import HeadingComponent from "components/general/heading";
import FormLayout from "./components/chakraComponents/formLayout";
import {Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import classes from 'components/chakraComponents/chakraStyles.module.css';
import SimpleQuizzComponent from "./components/quizz/simpleQuizzComponent";

function App() {
  return (
      <>
        <HeadingComponent />
        <Provider>
              <Grid templateColumns={["1fr", null, "repeat(3, 1fr)"]} gap="6" padding="4" maxWidth="1200px" margin="0 auto">
                  <GridItem>
                      <TodosContextProvider>
                          <Box padding="4" border={'1px solid'} borderColor={'gray.700'} borderRadius="md">
                              <Heading className={classes.tileModule_title__color} size="4xl" my={4} textAlign="center">Todos</Heading>
                              <NewTodo />
                              <Todos/>
                          </Box>
                      </TodosContextProvider>
                  </GridItem>
                  <GridItem>
                      <Box padding="4" border={'1px solid'} borderColor={'gray.700'} borderRadius="md">
                          <Heading className={classes.tileModule_title__color} size="4xl" my={4} textAlign="center"> Form layout </Heading>

                          <FormLayout />
                      </Box>
                  </GridItem>
                  <GridItem>
                      <Box padding="4" border={'1px solid'} borderColor={'gray.700'} borderRadius="md">
                          <Heading className={classes.tileModule_title__color} size="4xl" my={4} textAlign="center"> Simple Quizz </Heading>
                          <Heading size="sm" my={4} textAlign="center"> Generate Quizzz with free API </Heading>

                          <SimpleQuizzComponent />
                      </Box>
                  </GridItem>
              </Grid>
        </Provider>
      </>
  );
}

export default App;
