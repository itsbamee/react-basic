import Layout from '../../common/layout/Layout';
import { useState, useRef } from 'react';
import './Department.scss';

export default function Department() {
	console.log('re-render');
	//만약, 리액트에서 state 변경이 일어나면 컴포넌트는 재랜더링 됨
	//바뀐 state값은 다음번 렌더링 사이클 시 변경된 값이 적용됨 (중요) 그래서 초깃값..0부터 시작함..
	//화면의 정보값을 갱신해야되는 중요한 변경사항이 아닌 요소를 State로 변경하면 계속해서 컴포넌트가 재렌더링 되므로 비효율적
	//대표적인 사례 : 단순한 모션처리를 위한 state적용
	const rotate = useRef(0);
	//가상돔 요소는 핸들러안쪽에서 호출하고 싶을 때에는 document.querySelector가 아닌
	//useRef를 통한 참조객체에 담아서 호출

	//document.querySelector로 리액트에서 돔 요소를 선택하면 안되는 이유
	const box = useRef(null);

	const minus = () => {
		--rotate.current;
		box.current.style.transform = `rotate(${45 * rotate.current}deg)`;
	};
	const plus = () => {
		++rotate.current;
		box.current.style.transform = `rotate(${45 * rotate.current}deg)`;
	};

	return (
		<Layout title={'Department'}>
			<button onClick={minus}>left</button>
			<button onClick={plus}>right</button>

			<article ref={box}></article>
		</Layout>
	);
}

/*
	useRef : 특정값을 담기위한 참조객체를 만드는 hook
	[특징]
	- useRef를 통한 참조객체에 담겨있는 값은 컴포넌트가 재호출되더라도 값이 초기화되지 않고 유지가 됨
	- useRef를 통한 참조객체의 값이 변경되더라도 컴포넌트를 재호출하지 않음
	- useRef를 통한 참조객체의 값이 변경되면 그 값은 해당 렌더링 사이클에서 바로 적용됨

	[useRef를 사용하는 실사례]
	1. 가상돔요소를 선택해서 제어해야 될 때
	2. 특정 값을 변경처리 할 때 불필요하게 컴포넌트를 재호출하고 싶지 않을 때
*/
