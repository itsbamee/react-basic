import Layout from '../../common/layout/Layout';
import { useEffect, useState } from 'react';
import './Department.scss';

/*
	React에서 외부 데이터 fetching 작업 흐름 (공식으로 외워라)
	1. 컴포넌트 함수가 호출되고 외부데이터를 받을 state 초기화
	2. 의존성 배열이 비어있는 useEffect hook 안쪽에서 fetch 함수로 비동기 데이터를 받은 다음에 state에 넘겨줌
	3. useEffect 안쪽에서 fetch문을 써야되는 이유는 fetch 자체가 (fetch 자체가 클라이언트 기반으로 호출되는 데이터 방식) web api를 통해서 클라이언트 기반으로 데이터를 전달받는 방식이기 때문에, 무조건 컴포넌트가 마운트 되야지만 호출 가능
	4. useEffect에 의해서 데이터가 받아지고 state에 전달되면 자동으로 컴포넌트는 재렌더링됨
	5. 비동기 데이터를 활용해서 실제 JSX로 동적 DOM을 생성하는 시점은 2번째 렌더링 타임
*/

const path = process.env.PUBLIC_URL;

export default function Department() {
	const [Title, setTitle] = useState('');
	const [Department, setDepartment] = useState([]);

	const fetchData = (url, setValue, setKey) => {
		fetch(url)
			.then((data) => data.json())
			.then((json) => {
				setKey && setKey(Object.keys(json)[0]);
				setValue(Object.values(json)[0]);
			});
	};

	useEffect(() => {
		fetchData(`${path}/DB/Department.json`, setDepartment, setTitle);
	}, []);

	return (
		<Layout title={'Department'}>
			<section id='historyBox'>
				{Department.map((history, idx) => {
					return (
						<article>
							<h3></h3>
							<ul>
								<li></li>
							</ul>
						</article>
					);
				})}
			</section>

			<section id='memberBox'>
				<h2>{Title.charAt(0).toUpperCase() + Title.slice(1)}</h2>

				{Department.map((member, idx) => {
					return (
						<article key={idx}>
							<div className='pic'>
								<img src={`${path}/img/${member.pic}`} alt='{member.pic}' />
								<h2>{member.name}</h2>
								<p>{member.position}</p>
							</div>
						</article>
					);
				})}
			</section>
		</Layout>
	);
}
