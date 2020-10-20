import React from 'react';
import { TodoItemBlock, CheckCircle, Text, Remove } from './styledcomponents/TodoItemStyle';
import { MdDone, MdDelete } from 'react-icons/md';
import { useTodoDispatch } from '../TodoContext';

const TodoItem = ({ id, done, text }) => {
    const dispatch = useTodoDispatch();
    const onToggle = () => dispatch({ type: 'TOGGLE', id });    // onToggle 함수는 type을 TOGGLE로 바꿔주는 역할을 한다.
    const onRemove = () => dispatch({ type: 'REMOVE', id });    // onRemove 함수는 type을 REMOVE로 바꿔주는 역할을 한다.

    return (
        /*
            done는 체크박스의 true, false 체크를 확인하는 것이고 onClick 하면 onToggle을 통하여 값을 반전시켜준다.
            done가 true면 MdDone(체크모양)을 표시한다.
            Text done를 가져온 이유는 값이 true일 경우 글자색도 바꿔야 하기 때문이다.
            Remove를 클릭하면 type이 REMOVE로 바뀌면서 삭제된다.
            TodoItemBlock에 hover 이벤트를 만들어놔서 마우스를 올리면 MdDelete(휴지통)아이콘이 생긴다.
        */
        <TodoItemBlock>
            <CheckCircle done={done} onClick={onToggle}>
                {done && <MdDone />}
            </CheckCircle>

            <Text done={done}>{text}</Text>
            <Remove onClick={onRemove}>
                <MdDelete />
            </Remove>
        </TodoItemBlock>
    )
}

// memo 다른 항목이 업데이트 될 때 불필요한 리렌더링을 방지하게 되어 성능을 최적화 할 수 있게 된다.
// 다른 파일에서도 TodoItem을 사용할 수 있도록 export 해주었다.
export default React.memo(TodoItem);