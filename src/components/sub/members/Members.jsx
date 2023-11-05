import Layout from '../../common/layout/Layout';

export default function Members() {
	return (
		<Layout title={'Members'}>
			<div className='infoBox'>
				<h1>Join Members</h1>
			</div>
			<div className='formBox'>
				<form>
					<fieldset>
						<legend className='h'>회원가입</legend>
						<table>
							<tbody>
								<tr>
									<td>
										<input type='text' name='userid' placeholder='userId' />
									</td>
									<td>
										<input type='text' name='email' placeholder='email' />
									</td>
								</tr>
								<tr>
									<td>
										<input type='text' name='pwd1' placeholder='password' />
									</td>
									<td>
										<input type='text' name='pwd2' placeholder='re-password' />
									</td>
								</tr>
								<tr>
									<td colSpan='2'>
										<select name='edu'>
											<option value=''>학력을 선택하세요.</option>
											<option value='elementary-school'>초등학교 졸업</option>
											<option value='middle-shcool'>중학교 졸업</option>
											<option value='high-school'>고등학교 졸업</option>
											<option value='college'>대학교 졸업</option>
										</select>
									</td>
								</tr>
								<tr>
									<td colSpan='2'>
										<input type='radio' value='female' id='female' name='gender' />
										<label htmlFor='female'>Female</label>
										<input type='radio' value='male' id='male' name='gender' />
										<label htmlFor='male'>Male</label>
									</td>
								</tr>
								<tr>
									<td colSpan='2'>
										<input type='checkbox' name='interest' id='sports' />
										<label htmlFor='sports'>Sports</label>
										<input type='checkbox' name='interest' id='yoga' />
										<label htmlFor='yoga'>Yoga</label>
										<input type='checkbox' name='interest' id='game' />
										<label htmlFor='game'>Game</label>
										<input type='checkbox' name='interest' id='nap' />
										<label htmlFor='nap'>Nap</label>
									</td>
								</tr>
								<tr>
									<td colSpan='2'>
										<textarea
											name='comments'
											cols='30'
											rows='5'
											placeholder='Leave a comment'
										></textarea>
									</td>
								</tr>
								<tr>
									<td colSpan='2'>
										<button>Cancel</button>
										<button>Submit</button>
									</td>
								</tr>
							</tbody>
						</table>
					</fieldset>
				</form>
			</div>
		</Layout>
	);
}
