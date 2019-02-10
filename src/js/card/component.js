import { getCard } from './service';

export class CardComponent extends HTMLElement {
	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open' });
		this.render();
	}

	async render() {
		this.clean();
		const card = document.createElement('card');
		card.innerHTML = `<div>${(await getCard())}</div>`;
		this.shadow.appendChild(card);
		console.log((await getCard()));
	}

	clean() {
		this.shadow.childNodes.forEach(child => child.remove());
	}
}
