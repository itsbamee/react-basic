import Layout from '../../common/layout/Layout';

export default function Department() {
	return (
		<Layout title={'Department'}>
			<ul>
				<li>list1</li>
				<li>list2</li>
				<li>list3</li>
				<li>list4</li>
				<li>list5</li>
			</ul>
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
