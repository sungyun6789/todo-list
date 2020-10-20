import React, { useState } from 'react';
import { InsertFormPositioner, InsertForm, Input, CircleButton } from './styledcomponents/TodoCreateStyled';
import { MdAdd } from 'react-icons/md';
import { useTodoDispatch, useTodoNextId } from '../TodoContext';

// TogoCreate는 Template아래 + 버튼을 클릭할 경우에 어떤식으로 작동할지에 대한 코드이다.
const TodoCreate = () => {
    /*
        open에 기본적으로 false를 넣어서 클릭됐을때만 참으로 변경하도록 기본설정을 해줬다.
        value는 내가 입력할 text 부분이다.
        TodoContext에서 커스텀훅을 2개 가져왔다.
    */
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const dispatch = useTodoDispatch();
    const nextId = useTodoNextId();


    /*
        onToggle하면 open값이 반전되면서 (+ X) 버튼을 바꿔준다.
        onChange(이벤트가 발생하면) setValue를 통해서 e.target.value로 실시간 값을 가져온다.
        onSubmit(폼의 데이터가 데이터 전송 될 때 발생하는 이벤트) dispatch에서 type을 CREATE로 바꾸고 todo 객체에 값을 넣는다. 
        id는 useRef(5)했던 거에서부터 올라가니까 5가 될 것이고 text는 value에 e.target.value값이 들어올 것이고 done에는 아직 할 일을 끝내지 못했으니 false 가 들어오는 것이다.
    */
    const onToggle = () => setOpen(!open);
    const onChange = (e) => setValue(e.target.value);
    const onSubmit = (e) => {
        e.preventDefault();     // onSumbit을 하고 새로고침 되지 않기 위해 사용
        dispatch({
            type: 'CREATE',
            todo: {
                id: nextId.current,     // 여기서 current는 nextId를 수정하기 위해 붙여진것이다. 아래 42Line도 동일
                text: value,
                done: false
            }
        });


        /*
            e.target.value를 통해 value에 값을 넣어줬으니 초기화를 시켜준다.
            CREATE를 한번 했기 때문에 default값인 false로 바꿔준다.
            nextId.current += 1; 다음 Id값은 current + 1 인 것이다.
        */
        setValue('');
        setOpen(false);
        nextId.current += 1;
    };

    return (
        <>
            {open && (  // open이 참일 경우 아래를 실행 open이 참이 아닐경우는 클릭을 하지 않은 상태이기 때문에 CREATE를 할 수가 없다.
                <InsertFormPositioner>
                    <InsertForm onSubmit={onSubmit}>
                        <Input
                            autoFocus
                            placeholder='할 일을 입력 후, Enter 를 누르세요'
                            onChange={onChange}
                            value={value}
                        />
                    </InsertForm>
                </InsertFormPositioner>
            )}
            <CircleButton onClick={onToggle} open={open}>
                <MdAdd />
            </CircleButton>
        </>
    );
};

// memo 다른 항목이 업데이트 될 때 불필요한 리렌더링을 방지하게 되어 성능을 최적화 할 수 있게 된다.
// 다른 파일에서도 TodoCreate를 사용할 수 있도록 export 해주었다.
export default React.memo(TodoCreate);