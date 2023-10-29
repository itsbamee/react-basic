import './Community.scss';
import Layout from '../../common/layout/Layout';
import { TfiWrite } from 'react-icons/tfi';
import { RxReset } from 'react-icons/rx';
import { useRef, useState, useEffect } from 'react';

function Community() {
	const getLocalData = () => {
		const data = localStorage.getItem('posts');

		if (data) return JSON.parse(data);
		else return [];
	};

	const refInput = useRef(null);
	const refTextarea = useRef(null);
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

		//현재 시간값에서 getTime()을 호출하면 표준 시간값을 millisecond 단위의 숫자값으로 반환
		//표준시 값에 한국 시간대가 9시간 빠르므로 9시가넹 대한 밀리세컨드 값을 더해줌(korTime)
		//korTime : 한국시간대를 밀리세컨드로 반환한 값 (1초 * 60 = 1분, *60 = 1시간, 9 = 9시간)
		const korTime = new Date().getTime() + 1000 * 60 * 60 * 9;

		//new Date(한국 밀리세컨드 시간값) -> 한국 시간값을 기준으로 해서 시간객체값 반환

		setPosts([{ title: refInput.current.value, content: refTextarea.current.value, date: new Date(korTime) }, ...Posts]);
		resetPost();
	};

	const deletePost = (delIndex) => {
		console.log(delIndex);
		//Post.filter로 전달되는 삭제순번과 현재 반복되는 값의 순번이 같지가 않은 것만 배열로 반환 (삭제순번 값만 제외하고 반환하기 떄문에 결과적으로 삭제와 동일한 기능)
		//삭제 순번글만 제외한 나머지 배열 값을 다시 setPosts로 기존 Posts값을 변경하면 컴포넌트가 재렌더링되면서 해당 글만 제외된 나머지 글만 출력
		//해당 구문에서는 filter자체가 불변성을 유지하면서 새로운 배열을 리턴하기 때문에 굳이 전개연산자로 기존 state값을 복사할 (deep copy)할 필요가 없음 (= ..안쓰는 이유 전개연산자 안쓰는 이유 : 이미 복사된 값이기 때문에)
		//아래 Posts.filter((post, idx) -> Posts.filter((_, idx) 변경되는 이유 -> 안쓰는 값임을 인지하기 위해 _로 치환
		setPosts(Posts.filter((_, idx) => delIndex !== idx));
	};

	useEffect(() => {
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
						<button onClick={createPost}>
							<TfiWrite fontSize={20} color={'#555'} />
						</button>
					</nav>
				</div>

				<div className='showBox'>
					{Posts.map((post, idx) => (
						<article key={idx}>
							<div className='txt'>
								<h2>{post.title}</h2>
								<p>{post.content}</p>
							</div>
							<nav>
								<button>Edit</button>
								<button onClick={() => deletePost(idx)}>Delete</button>
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
