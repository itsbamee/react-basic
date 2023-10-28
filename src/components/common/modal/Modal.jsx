import './Modal.scss';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
/*
  motion : 모션을 걸고 싶은 JSX요소 앞쪽에 motion.를 추가하면 initial, animate, exti라는 속성으로 모션설정 가능케하는 컴포넌트
  AnimatePresence : 모션을 적용할 컴포넌트의 wrapping 컴포넌트 - 자식요소의 모션이 끝날 때 까지 언마운트되는 시점을 holding처리
  적용가능한 모션 속성 : opacity, scale, rotate, x, y
*/

export default function Modal({ IsOpen, setIsOpen, children }) {
	useEffect(() => {
		document.body.style.overflow = IsOpen ? 'hidden' : 'auto';
	}, [IsOpen]);

	return (
		<AnimatePresence>
			{IsOpen && (
				//{{jsx가 마운트되기 전상태의 스타일}}, {{jsx가 마운트 된 후 스타일}}, {{jsx가 앞으로 언마운트될때의 스타일}}, {{스타일이 변경될 때의 전환시간}}
				<motion.aside
					className='modal'
					initial={{ opacity: 0, x: '100%', scale: 0.5 }}
					animate={{ opacity: 1, x: '0%', scale: 1 }}
					exit={{ opacity: 0, x: '-100%', scale: 1.5 }}
					transition={{ duration: 0.5 }}
				>
					<motion.div className='con' initial={{ opactiy: 0 }} animate={{ opacity: 1, transition: { delay: 0.5 } }} exit={{ opacity: 0 }}>
						{children}
					</motion.div>
					<motion.span onClick={() => setIsOpen(false)} initial={{ opacity: 0, x: 200 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.8 } }} exit={{ opacity: 0, x: 200 }}>
						close
					</motion.span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}
