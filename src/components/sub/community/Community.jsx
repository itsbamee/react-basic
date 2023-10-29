import './Community.scss';
import Layout from '../../common/layout/Layout';
import { TfiWrite } from 'react-icons/tfi';
import { RxReset } from 'react-icons/rx';
import { useRef, useState, useEffect } from 'react';

function Community() {
	//순서1. 로컬저장소의 값을 가져와서 객체화 한다음 리턴하는 함수
	const getLocalData = () => {
		const data = localStorage.getItem('posts');
		return JSON.parse(data);
	};

	const refInput = useRef(null);
	const refTextarea = useRef(null);
	//순서2. 컴포넌트가 마운트 되자마자 로컬저장소에서 가져온 배열값을 posts state에 옮겨담음
	const [Posts, setPosts] = useState(getLocalData());
	console.log(Posts);

	const resetPost = () => {
		refInput.current.value = '';
		refTextarea.current.value = '';
	};

	const createPost = () => {
		if (!refInput.current.value.trim() || !refTextarea.current.value.trim()) {
			resetPost();
			return alert('제목과 본문을 모두 입력하세요.');
		}
		setPosts([{ title: refInput.current.value, content: refTextarea.current.value }, ...Posts]);
		resetPost();
	};

	useEffect(() => {
		// 순서5. Posts값이 변경될 때마다 해당값을 문자화해서 로컬저장소에 저장
		localStorage.setItem('posts', JSON.stringify(Posts));
	}, [Posts]);

	return (
		<Layout title={'Community'}>
			<div className='wrap'>
				<div className='inputBox'>
					<input type='text' placeholder='Write Title' ref={refInput} />
					<textarea cols='30' rows='5' placeholder='Write Content Message' ref={refTextarea}></textarea>

					<nav>
						<button onClick={resetPost}>
							<RxReset fontSize={20} color={'#555'} />
						</button>
						{/* 순서4. 글 작정 시 state값 변경처리 */}
						<button onClick={createPost}>
							<TfiWrite fontSize={20} color={'#555'} />
						</button>
					</nav>
				</div>

				<div className='showBox'>
					{/* 순서3. 로컬저장소로부터 옮겨담아진 state 값을 반복돌면서 글 목록 출력 */}
					{Posts.map((post, idx) => (
						<article key={idx}>
							<div className='txt'>
								<h2>{post.title}</h2>
								<p>{post.content}</p>
							</div>
							<nav>
								<button>Edit</button>
								<button>Delete</button>
							</nav>
						</article>
					))}
				</div>
			</div>
		</Layout>
	);
}

export default Community;

/*
  C (create : 글작성) "POST"
  R (read : 글 불러오기) "GET"
  U (update : 글 수정) "PUT"
  D (delete : 글 삭제) "DELETE"

  RESTful API : DB의 데이이터를 구조적으로 변경하기 위한 개발 방법론

  로컬저장소(LocalStorage)
  - 모든 브라우저가 내장하고 있는 경량의 저장공간
  - 문자값만 저장가능 (5MB)
  - 객체값을 문자화시켜서 저장
  - 로컬저장소 값을 불러올때는 반대로 JSON형태로 객체로 parsing해서 가져와야 함

  localStorage 메서드
  localStorage.setItem('키', 문자화된 데이터) : 로컬저장소에 데이터 저장
  localStorage.getItem('키') : 해당 데이터는 문자값으로 리턴되기 때문에 다시 객체형태로 parsing처리 필요
*/
