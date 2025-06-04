import React from "react";
import {CheckboxCard} from "@chakra-ui/react";
import { CloseButton } from "@chakra-ui/react"


const TodoItem: React.FC<{text: string; done: boolean; onRemoveTodo: () => void; onToggleDone: () => void; }> = (props) => {
    return (
        <CheckboxCard.Root
            justify={'center'}
            align={'center'}
            size={'lg'}
            isChecked={props.done}
        >
            <CheckboxCard.HiddenInput onClick={props.onToggleDone} />
            <CheckboxCard.Control >
                <CheckboxCard.Indicator />

                <CheckboxCard.Label>
                    {props.text}
                </CheckboxCard.Label>

                <CloseButton variant={'solid'} size={'xs'} onClick={props.onRemoveTodo} />
            </CheckboxCard.Control>
        </CheckboxCard.Root>
    )
};

export default TodoItem;