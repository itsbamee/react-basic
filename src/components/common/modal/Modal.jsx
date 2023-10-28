import './Modal.scss';
import { useEffect } from 'react';

export default function Modal({ IsOpen, setIsOpen }) {
	useEffect(() => {
		document.body.style.overflow = IsOpen ? 'hidden' : 'auto';
	}, [IsOpen]);
	return (
		<>
			{IsOpen && (
				<aside className='modal'>
					<div className='con'></div>
					<span onClick={() => setIsOpen(false)}>close</span>
				</aside>
			)}
		</>
	);
}
