import React from 'react';
import TodoItem from './TodoItem';
import { TodoListBlock } from './styledcomponents/TodoListStyle';
import { useTodoState } from '../TodoContext';

const TodoList = () => {
    const todos = useTodoState();

    return (
        <TodoListBlock>
            {todos.map(todo => (    // TodoContext에서 initialTodos 배열을 가져오는 것이다.
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    text={todo.text}
                    done={todo.done}
                />
            ))}
        </TodoListBlock>
    );
};

// 다른 파일에서도 TodoList를 사용할 수 있도록 export 해주었다.
export default TodoList;