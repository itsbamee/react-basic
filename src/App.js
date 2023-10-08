import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import Visual from './components/main/visual/Visual';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Gallery from './components/sub/gallery/Gallery';
import Members from './components/sub/members/Members';
import Youtube from './components/sub/youtube/Youtube';
import './styles/Global.scss';
import { Route } from 'react-router-dom';

function App() {
	return (
		<>
			<Header />

			<Route exact path='/' component={Visual} />
			<Route path='/department' component={Department} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/members' component={Members} />
			<Route path='/contact' component={Contact} />

			<Footer />
		</>
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
