import React, { Component } from 'react'

export class Footer extends Component {
	render() {
		return (
			<>
			<footer className="footer">
				<div className="footer__title title">smachna</div>
				<div className="footer__email">smacnha@gmail.com</div>
				<div className="footer__social">
					<a href="https://tiktok.com"><img src="/img/social/tiktok.svg" alt='tiktok-img' /></a>
					<a href="https://instagram.com"><img src="/img/social/instagram.svg" alt='instagram-img' /></a>
					<a href="https://web.telegram.org"><img src="/img/social/telegram.svg" alt='telegram-img'/></a>
					<a href="https://vk.com"><img src="/img/social/vk.svg"alt='vk-img' /></a>
				</div>
				<div className="footer__copyright">
					<img src="/img/social/copyright.svg" alt='copyright-img' />
					<p>smachnaTeam, 2023</p>
				</div>
			</footer>
			</>
		)
	}
}

export default Footer