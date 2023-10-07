import Layout from '../../common/layout/Layout';
import { useState } from 'react';

export default function Department() {
	console.log('re-render');

	//리액트 컴포넌트는 무조건 state에 담겨있는 값만 변화점을 인지해서 컴포넌트를 재호출하면서 화면갱신, 공식 [값, set값]
	//useState는 2개의 값이 담겨있는 배열을 반환
	//첫번째 값은 인수에 전달된 값을 초기값으로 활용한 State값
	//두번째 값은 해당 State를 변경할 수 있는 State 변경전용 함수, 무조건 State는 전용함수로만 변경가능
	//const [State값, State 변경함수] = useState(초기값);

	const [Num, setNum] = useState(0);

	// console.log(Num);
	// console.log(setNum);
	return (
		<Layout title={'Department'}>
			<button onClick={() => setNum(Num + 1)}>plus</button>
			<button onClick={() => setNum(Num - 1)}>minus</button>
			<h2>{Num}</h2>
		</Layout>
	);
}

/*
	리액트 대표적인 hook 3대장
	1. useState
		- 화면 렌더링을 담당하는 중요 데이터를 관리해주는 그릇
		- 화면의 모든 변경사항은 State에 담아서 관리 및 렌더링
		- State값이 변경이 되면 REACT는 무조건 컴포넌트를 재호출해서 화면을 다시 랜더링

	2. useEffect
		- 어떤 컴포넌트의 생명주기 관리 (Life Cycle)
		- 컴포넌트의 생성 (Mount)
		- 컴포넌트의 변경 (State Change)
		- 컴포넌트의 소멸 (UnMount)
		- 컴포넌트의 생성 변경, 소멸 시 특정 이벤트에 호출해야할 때 주로 사용

	3. useRef
		- 컴포넌트가 재호출 되더라도 변경되거나 사라지면 안되는 값을 담는 그릇
		- 메모리상에만 존재하는 최신 가상돔을 선택해야될 때 담는 용도
*/
