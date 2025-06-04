import React, {useRef, useContext} from 'react';
import classes from 'components/todo/NewTodo.module.css';
import { TodosContext } from 'store/todos-context';
import { Button, Input, Field, HStack, Stack, Fieldset } from "@chakra-ui/react"

const NewTodo: React.FC = () => {
    const todosCtx = useContext(TodosContext);

    const todoTextInputRef = useRef<HTMLInputElement>(null);
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const enteredText = todoTextInputRef.current!.value;

        if (enteredText.trim().length === 0) {
            return;
        }

        todosCtx.addTodo(enteredText);
        todoTextInputRef.current!.value = ""; // Clear the input field after submission
    }

    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <Fieldset.Root size="lg" maxW="md">
                <Field.Root>
                    <Field.Label>
                        Todo text
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <Stack direction="row" gap={4} h='20' align="center">
                        <Input variant="subtle" p={'3'} size={"md"} type="text" id='text' placeholder="Enter a new todo" ref={todoTextInputRef} />
                        <Field.HelperText />
                        <Field.ErrorText />
                        <Button variant="outline" type="submit" >Add new Item</Button>
                    </Stack>
                </Field.Root>
            </Fieldset.Root>
        </form>
    )
};

export default NewTodo;