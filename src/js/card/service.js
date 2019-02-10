import { ItemCard } from './model';

const CARD_URL =
	'https://raw.githubusercontent.com/lukasztyminski/lukasztyminski.github.io/master/example-api/';

// Destructoring object to properties model
const convert = ({ name, price, rating_count: rate }) =>
	new ItemCard({
		name,
		price,
		rate,
	});

async function getRawFileContent(pathToFile) {
	try {
		const response = await fetch(`${CARD_URL}${pathToFile}`);
		if (response.ok) {
			return (await response.json()).map(r => convert(r));
		}
		throw Error('Response not 200');
	} catch (err) {
		console.warn(err);
		return [];
	}
}

export async function getCard() {
	return getRawFileContent('card.json');
}
