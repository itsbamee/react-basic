import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import Visual from './components/main/visual/Visual';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Community from './components/sub/community/Community';
import Gallery from './components/sub/gallery/Gallery';
import Members from './components/sub/members/Members';
import Detail from './components/sub/youtube/Detail';
import Youtube from './components/sub/youtube/Youtube';
import { useMedia } from './hooks/useMedia';
import './styles/Global.scss';
import { Route } from 'react-router-dom';
import News from './components/main/news/News';

function App() {
	return (
		<main className={useMedia()}>
			<Header />
			<Route exact path='/'>
				<Visual />
				<News />
			</Route>
			<Route path='/department' component={Department} />
			<Route path='/community' component={Community} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/members' component={Members} />
			<Route path='/contact' component={Contact} />
			{/* 특정 URL 라우터 설정시 유튜브의 고유 아이디값을 params로 전달 */}
			<Route path='/detail/:id' component={Detail} />
			<Footer />
		</main>
	);
}

/*
-긁어서 ctrl i -> div로 감싸짐 -> Route path='/경로'
-라우터를 붙이면 분리된 페이지를 만들 수 있음
-<Route exact path='/'> exact 붙이면 해당 주소가 아닐때는 보이지 않음
	<Route path='/youtube'>
		<Youtube />
	</Route>
	-->
	<Route path='/youtube' component={Youtube}/>

축약됨
*/

export default App;
