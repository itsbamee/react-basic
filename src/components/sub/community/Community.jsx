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

		const korTime = new Date().getTime() + 1000 * 60 * 60 * 9;

		setPosts([
			{
				title: refInput.current.value,
				content: refTextarea.current.value,
				date: new Date(korTime),
			},
			...Posts,
		]);
		resetPost();
	};

	const deletePost = (delIndex) => {
		console.log(delIndex);
		setPosts(Posts.filter((_, idx) => delIndex !== idx));
	};

	const enableUpdate = (editIndex) => {
		setPosts(
			//기존의 Posts 배열을 반복돌면서 파라미터 전달된 editIndex 순번에 해당하는 post 객체에만 enableUpdate = true값을 추가한 객체의 배열값을 다시 기존 Posts에 변경
			Posts.map((post, idx) => {
				if (editIndex === idx) post.enableUpdate = true;
				return post;
			})
		);
	};

	useEffect(() => {
		localStorage.setItem('posts', JSON.stringify(Posts));
	}, [Posts]);

	return (
		<Layout title={'Community'}>
			<div className='wrap'>
				<div className='inputBox'>
					<input type='text' placeholder='Write Title' ref={refInput} />
					<textarea
						cols='30'
						rows='5'
						placeholder='Write Content Message'
						ref={refTextarea}
					></textarea>

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
					{Posts.map((post, idx) => {
						const stringDate = JSON.stringify(post.date);
						const textedDate = stringDate.split('T')[0].split('"')[1].split('-').join('.');
						if (post.enableUpdate) {
							//true일 때 수정모드
							return (
								<article key={idx}>
									<div className='txt'>
										<input type='text' defaultValue={post.title} />
										<textarea defaultValue={post.content}></textarea>
									</div>
									<nav>
										<button>Cancel</button>
										<button>Update</button>
									</nav>
								</article>
							);
						} else {
							//출력모드
							return (
								<article key={idx}>
									<div className='txt'>
										<h2>{post.title}</h2>
										<p>{post.content}</p>
										<span>{textedDate}</span>
									</div>
									<nav>
										<button onClick={() => enableUpdate(idx)}>Edit</button>
										<button onClick={() => deletePost(idx)}>Delete</button>
									</nav>
								</article>
							);
						}
					})}
				</div>
			</div>
		</Layout>
	);
}

export default Community;

/*
	글 수정 로직 단계
	1. 각 포스트에서 수정버튼 클릭 시 해당 객체에 enableUpdate = true라는 프로퍼티 추가 후 state 저장
	2. 반복돌며 렌더링 시 반복도는 객체에 enableUpdate값이 true면 제목, 본문을 form요소로 감싸서 출력하도록 분기처리
	3. 수정모드 일때는 수정취소, 수정완료 버튼 생성
	4. 수정 취소버튼 클릭 시 출력모드로 변경 (enableUpdate = false처리)
	5. 수정 완료버튼 클릭 시 수정모드에 있는 value값을 가져와서 state에 저장한 뒤 다시 출력모드로 변경처리
*/
