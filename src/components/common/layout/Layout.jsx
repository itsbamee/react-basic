import './Layout.scss';

export default function Layout({ children, title }) {
	let newClass = title.toLowerCase().split(' ').join('_');
	//문자열.split(구분자) : 구분자 기준으로 배열로 반환
	//배열.join(구분자) : 배열을 구분자로 연결해서 하나의 문자로 반환
	// newClass = newClass.split(' ');
	// newClass = newClass.join('_');
	// newClass = newClass.split(' ').join('_');
	console.log(newClass);
	return (
		<section className={`layout ${newClass}`}>
			<h1>{title}</h1>
			{children}
		</section>
	);
}

//자식컴포넌트에서 props.children은 해당컴포넌트로 wrapping되고 있는 자식요소가 전달

/*
리액트 : 단방향 데이터 바인딩
-> 데이터가 무조건 부모에서 자식으로만 전달 가능

부모에서 자식컴포넌트로 데이터를 전달하는 방법?
1. 자식컴포넌트에 전달되는 props객체의 children 프로퍼티 활용
-- 부모컴포넌트가 감싸고있는 모든 요소들이 전달 됨

2. 부모컴포넌트에서 커스텀 props라는 속성에 직접 값을 대입해서 전달
-- 컴포넌트 호출시 커스텀속성으로 원하는 값을 전달
*/
