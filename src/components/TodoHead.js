import React from 'react';
import { TodoHeadBlock } from './styledcomponents/TodoHeadStyle';
import { useTodoState } from '../TodoContext';

const TodoHead = () => {
    /*
        todos에 커스텀 훅을 가져왔다. useTodoState는 ~ 를 가져와 todos에 담는다.
        todos.filter 를 사용해 todo를 매개변수로 받은 다음 !todo.done 현재 상태를 반전시킨다. 그리고 반전시킨 배열을 undoneTasks에 담는다.
        today 변수에 오늘 날짜를 가져온다.
        dateString에 오늘날짜를 한국을 기준으로 한다음 연도, 월, 일을 표시하는 내용이다.
    */
    const todos = useTodoState();
    const undoneTasks = todos.filter(todo => !todo.done);

    const today = new Date();
    const dateString = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });


    // dayName은 요일을 가져오는 내용인데 today(오늘날짜).ko-KR 한국을 기준으로 요일을 표시
    const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });

    return (
        /*
            년, 월, 일 표시
            요일 표시
            done이 true인걸 제외하고 남은 length를 계산해 남은 할 일을 보여준다.
        */
        <TodoHeadBlock>
            <h1>{dateString}</h1>
            <div className="day">{dayName}</div>
            <div className="tasks-left">할 일 {undoneTasks.length}개 남음</div>
        </TodoHeadBlock>
    );
}

// 다른 파일에서도 TodoHead를 사용할 수 있도록 export 해주었다.
export default TodoHead;