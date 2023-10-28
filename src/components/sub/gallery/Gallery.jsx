import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import Masonry from 'react-masonry-component';
import { useState, useEffect, useRef } from 'react';

export default function Gallery() {
	const myID = '197119297@N02';
	const [Pics, setPics] = useState([]);
	let [IsUser, setIsUser] = useState(myID);
	const refElBtnSet = useRef(null);

	const fetchFlickr = async (opt) => {
		console.log('fetching again...');
		const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
		const key = process.env.REACT_APP_FLICKR_KEY;
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';
		const num = 40;
		let url = '';
		const url_interest = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
		const url_user = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.id}`;
		const url_search = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${opt.keyword}`;

		opt.type === 'user' && (url = url_user);
		opt.type === 'interest' && (url = url_interest);
		opt.type === 'search' && (url = url_search);

		const data = await fetch(url);
		const json = await data.json();
		setPics(json.photos.photo);
	};

	const activateBtn = (e) => {
		const btns = refElBtnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		if (e.target.nodeName === 'BUTTON') e.target.classList.add('on');
	};

	const handleClickInterest = (e) => {
		if (e.target.classList.contains('on')) return;
		//inertestGallery함수가 호출시 IsUser값을 빈문자열 처리 (falsy)
		setIsUser('');
		activateBtn(e);
		fetchFlickr({ type: 'interest' });
	};

	const handleClickMine = (e) => {
		//마이갤러리 함수 호출시에는 IsUser의 문자값이 담겨있더라도 내아이디값이랑 똑같지 않으면 핸들러 호출함
		//다른 사용자 갤러리를 갔다가 My Gallery 함수 호출시 이미 IsUser값이 담겨있기 때문에 해당 함수가 호출되지 않는 문제 해결위함
		if (e.target.classList.contains('on') || IsUser === myID) return;
		setIsUser(myID);
		activateBtn(e);
		fetchFlickr({ type: 'user', id: myID });
	};

	const handleClickUser = (e) => {
		//IsUser값이 있기만 하면 핸들러함수 호출 중지
		if (IsUser) return;
		setIsUser(e.target.innerText);
		activateBtn(e);
		fetchFlickr({ type: 'user', id: e.target.innerText });
	};

	useEffect(() => {
		fetchFlickr({ type: 'user', id: myID });
		//fetchFlickr({ type: 'search', keyword: 'ocean' });
	}, []);

	return (
		<Layout title={'Gallery'}>
			<article className='controls'>
				<nav className='btnSet' ref={refElBtnSet}>
					<button onClick={handleClickInterest}>Interest Gallery</button>
					<button className='on' onClick={handleClickMine}>
						My Gallery
					</button>
				</nav>
			</article>

			<div className='frame'>
				<Masonry elementType={'div'} options={{ transitionDuration: '0.5s' }} disableImagesLoaded={false} updateOnEachImageLoad={false}>
					{Pics.map((pic, idx) => {
						return (
							<article key={idx}>
								<div className='inner'>
									<div className='pic'>
										<img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_w.jpg`} alt={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`} />
									</div>
									<h2>{pic.title}</h2>

									<div className='profile'>
										<img
											src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
											alt={pic.owner}
											onError={(e) => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
										/>
										<span onClick={handleClickUser}>{pic.owner}</span>
									</div>
								</div>
							</article>
						);
					})}
				</Masonry>
			</div>
		</Layout>
	);
}
