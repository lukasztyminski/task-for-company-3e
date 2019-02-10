export class ItemCard {
	constructor({ name, price, rate }) {
		this.name = name;
		this.price = price;
		this.rate = rate;
	}

	get ratesInfo() {
		return this.rate;
	}
}
