import './Header.scss';
import { NavLink, Link } from 'react-router-dom';
import { HiBars4 } from 'react-icons/hi2';

export default function Header() {
	return (
		<header>
			<h1>
				<Link to='/'>Positive Bamee</Link>
			</h1>

			<ul>
				<li>
					<NavLink to='/department' activeClassName={'on'}>
						Department
					</NavLink>
				</li>
				<li>
					<NavLink to='/gallery' activeClassName={'on'}>
						Gallery
					</NavLink>
				</li>
				<li>
					<NavLink to='/youtube' activeClassName={'on'}>
						Youtube
					</NavLink>
				</li>
				<li>
					<NavLink to='/members' activeClassName={'on'}>
						Members
					</NavLink>
				</li>
				<li>
					<NavLink to='/contact' activeClassName={'on'}>
						Contact
					</NavLink>
				</li>
			</ul>
			<HiBars4 fontSize={20} color={'#777'} />
		</header>
	);
}

//navlink 쓰는 이유
