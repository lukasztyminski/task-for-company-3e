import { getCard } from './service';

export class CardComponent extends HTMLElement {
	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open' });
		this.render();
	}

	async render() {
		this.clean();
		let card = document.createElement('div');
		let style = document.createElement('style');
		style.textContent = `
			.card {
				width: 100%;
			}
			.card__item {
				display: flex;
				align-items: center;
				padding: 1rem 0;
				border-bottom: 1px solid #CCCCCC;
				color: #CCCCCC;
				position: relative;
			}
			.card__item:hover::before {
				content: "\\f00d";
				font-family: 'Font Awesome 5 Free';
    			font-weight: 900;
				color: #D94728;
				display: inline-flex;
				position: absolute;
				right: 5px;
				top: 5px;
				cursor: pointer;
			}
			.card__item:first-child {
				padding-top: 0;
			}
			.card__left {
				position: relative;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				text-align: center;
				margin-right: 1rem;
			}
			.card__left--size {
				font: 900 1.7rem "LatoBlack", sans-serif;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				color: #000000;
			}
			.card__right {
				padding: .5rem 0;
				padding-left: 1rem;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: space-between;
				border-left: 1px solid #CCCCCC;
				height: 84px;
			}
			.card__title {
				font-size: 1.4rem;
				color: #D94728;
				margin: 0;
				font: 400 1.4rem "Lato", sans-serif;
			}
			.card__price {
				font-size: 2rem;
				font: 700 2rem "LatoBold", sans-serif;
				color: #8a8a8a;
			}
			.card__rates {
				display: flex;
				align-items: center;
				flex-direction: row-reverse;
			}
			.card__rates input {
				position: absolute;
    			left: -99999px;
			}
			.card__rates input:checked ~ label {
				color: #F9B700;
				font-weight: 900;
			}
			.card__rates label {
				font-family: 'Font Awesome 5 Free';
    			font-weight: 400;
				cursor: pointer;
				color: #F9B700;
				font-size: 1.6rem;
				margin-right: 2px;
			}
			.card__rates label::before {
				content: "\\f005";
    			display: inline-flex;
			}
			.card__rates label:hover,
			.card__rates label:hover ~ label {
				color: #F9B700;
				font-weight: 900;
			}
		`;
		card.classList.add('card');
		(await getCard()).forEach((item, index) => {
			card.innerHTML += `
			<div class="card__item">
				<div class="card__left">
					<img src="public/images/84.png" class="card__left--img card-img-top" alt="image ${
						item.name
					}">
					<div class="card__left--size">84px x 84px</div>
				</div>
				<div class="card__right">
					<h5 class="card__title">${item.name}</h5>
					<span class="card__price">$${item.price}</span>
					<div class="card__rates">
						<input type="radio" name="${index}" id="0${index}" value="${item.rate}">
						<label for="0${index}"></label>
						<input type="radio" name="${index}" id="1${index}" value="${item.rate}">
						<label for="1${index}"></label>
						<input type="radio" name="${index}" id="2${index}" value="${item.rate}">
						<label for="2${index}"></label>
						<input type="radio" name="${index}" id="3${index}" value="${item.rate}">
						<label for="3${index}"></label>
						<input type="radio" name="${index}" id="4${index}" value="${item.rate}">
						<label for="4${index}"></label>
					</div>
				</div>
			</div>

			`;
		});
		this.shadow.appendChild(style);
		this.shadow.appendChild(card);
	}

	clean() {
		this.shadow.childNodes.forEach(child => child.remove());
	}
}
