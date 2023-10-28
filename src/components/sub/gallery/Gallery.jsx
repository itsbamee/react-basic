import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import Masonry from 'react-masonry-component';
import { useState, useEffect, useRef } from 'react';
import { LuSearch } from 'react-icons/lu';

export default function Gallery() {
	const [Pics, setPics] = useState([]);
	const [IsUser, setIsUser] = useState(true);
	const refElBtnSet = useRef(null);
	const myId = '199361154@N05';
	const refElInput = useRef(null);

	const fetchFlickr = async (opt) => {
		console.log('fetching again...');
		const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
		const key = process.env.REACT_APP_FLICKER_KEY;
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
		if (json.photos.photo.length === 0) return alert('해당 검색어의 결과값이 없습니다.');
		setPics(json.photos.photo);
	};

	const activateBtn = (e) => {
		const btns = refElBtnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		if (e.target.nodeName === 'BUTTON') e.target.classList.add('on');
	};

	const handleClickInterest = (e) => {
		if (e.target.classList.contains('on')) return;
		setIsUser(false);
		activateBtn(e);
		fetchFlickr({ type: 'interest' });
	};

	const handleClickMine = (e) => {
		if (e.target.classList.contains('on') && IsUser) return;
		setIsUser(true);
		activateBtn(e);
		fetchFlickr({ type: 'user', id: myId });
	};

	const handleClickUser = (e) => {
		if (IsUser) return;
		setIsUser(true);
		activateBtn(e);
		fetchFlickr({ type: 'user', id: e.target.innerText });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const tags = refElInput.current.value;
		refElInput.current.value = '';
		if (!tags.trim()) return;
		setIsUser('');
		activateBtn(e);
		fetchFlickr({ type: 'search', keyword: tags });
	};

	useEffect(() => {
		fetchFlickr({ type: 'user', id: myId });
		//fetchFlickr({ type: 'search', keyword: 'landscape' });
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

				<form onSubmit={handleSubmit}>
					<input type='text' placeholder='Search' ref={refElInput} />
					<button className='btnSearch'>
						<LuSearch fontSize={20} color={'#bbb'} />
					</button>
				</form>
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
