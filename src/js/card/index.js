import { CardComponent } from './component';

export default () => {
	let isIE =
		'-ms-scroll-limit' in document.documentElement.style &&
		'-ms-ime-align' in document.documentElement.style;
	if (!isIE) {
		customElements.define('shopping-carts', CardComponent);
	} else {
		document.querySelector('shopping-carts').remove();
	}
};
