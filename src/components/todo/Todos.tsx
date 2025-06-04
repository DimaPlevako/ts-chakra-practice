import React, {useContext, useState } from "react";
import TodoItem from "./TodoItem";
import {TodosContext} from "store/todos-context";
import classes from "./TodoItem.module.css";
import {CheckboxGroup, Text, Flex, Box, Button, ButtonGroup } from "@chakra-ui/react";

const Todos: React.FC = () => {
    const todosCtx = useContext(TodosContext);
    const [filter, setFilter] = useState<"all" | "active" | "done">("all");

    // Assume each item has a `done` boolean property
    const activeCount = todosCtx.items.filter((item: any) => !item.done).length;
    const doneCount = todosCtx.items.filter((item: any) => item.done).length;

    let filteredItems = todosCtx.items;
    if (filter === "active") filteredItems = todosCtx.items.filter((item: any) => !item.done);
    if (filter === "done") filteredItems = todosCtx.items.filter((item: any) => item.done);

    if (todosCtx.items.length === 0) {
        return <Text>No todos found.</Text>;
    }

    return (
        <CheckboxGroup>
            <Text textStyle="sm" fontWeight="medium">
                My List
            </Text>
            <Flex align="center" justify="space-between" mb={2}>
                <ButtonGroup size="sm">
                    <Button onClick={() => setFilter("all")} variant={filter === "all" ? "solid" : "outline"}>
                        All ({todosCtx.items.length})
                    </Button>
                    <Button onClick={() => setFilter("active")} variant={filter === "active" ? "solid" : "outline"}>
                        Active ({activeCount})
                    </Button>
                    <Button onClick={() => setFilter("done")} variant={filter === "done" ? "solid" : "outline"}>
                        Done ({doneCount})
                    </Button>
                </ButtonGroup>
            </Flex>
            <Box overflow={'auto'} maxHeight="300px" padding="2" borderRadius="md">
                <Flex direction={'column'} gap="2">
                    {filteredItems.map((item: any) =>
                        <TodoItem
                            text={item.text}
                            key={item.id}
                            done={item.done}
                            onToggleDone={() => todosCtx.toggleDone(item.id)}
                            onRemoveTodo={todosCtx.removeTodo.bind(null, item.id)}
                        />
                    )}
                </Flex>
            </Box>

        </CheckboxGroup>
    )
}

export default Todos;
