export default class Slider {
	/**
	 *
	 * @param {Element} element
	 */
	constructor(element) {
		this.slider_input =
			element.getElementsByClassName('range-slider_input')[0];
		this.slider_thumb =
			element.getElementsByClassName('range-slider_thumb')[0];
		this.slider_line =
			element.getElementsByClassName('range-slider_line')[0];

		this.showSliderValue(); // Initial call to set initial slider value

		window.addEventListener('resize', this.showSliderValue.bind(this));
		this.slider_input.addEventListener(
			'input',
			this.showSliderValue.bind(this),
			false
		);
	}

	mapValue(x) {
		if (x >= 0 && x <= 35) {
			return 0;
		} else if (x > 36 && x <= 66) {
			return 50;
		} else if (x > 87 && x <= 100) {
			return 100;
		}
	}

	showSliderValue() {
		const bulletPosition =
			this.mapValue(this.slider_input.value) / this.slider_input.max;
		const space =
			this.slider_input.offsetWidth - this.slider_thumb.offsetWidth;

		this.slider_thumb.style.left = bulletPosition * space + 'px';
		this.slider_line.style.width =
			this.mapValue(this.slider_input.value) + '%';
	}
}
