import { getCard } from './service';

export class CardComponent extends HTMLElement {
	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open' });
		this.render();
	}

	async render() {
		this.clean();
		let card = document.createElement('card');
		card.classList.add('card');
		(await getCard()).forEach(item => {
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
						<input type="radio" name="${item.rate}" id="" value="">
						<label for=""></label>
					</div>
				</div>
			</div>
			`;
		});
		this.shadow.appendChild(card);
	}

	clean() {
		this.shadow.childNodes.forEach(child => child.remove());
	}
}
