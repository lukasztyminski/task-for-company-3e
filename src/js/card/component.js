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
			:host(.card) {
				color: red;
			}
		`;
		card.classList.add('card');
		(await getCard()).forEach((item, index) => {
			console.log(index);
			card.innerHTML += `
			<div class="card__item">
				<div class="card__left">
					<img src="public/images/84.png" class="card__left--img card-img-top" alt="image ${
						item.name
					}">
				</div>
				<div class="card__right">
					<h5 class="card__title">${item.name}</h5>
					<span class="card__price">$${item.price}</span>
					<div class="card__rates">
						<input type="radio" name="rate" id="5" value="${item.rate}">
						<label for="5"></label>
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
