export default class Timer {
	constructor(element, time_up_button, time_down_button, time_text) {
		this.element = element;
		this.time = 0;
		this.timer = null;
		this.timer_update = null;
		this.time_mul_up = null;
		this.time_mul_down = null;
		this.time_up_button = time_up_button;
		this.time_down_button = time_down_button;
		this.time_text = time_text;
		this.time_multiplier = 1;
	}
	start(cooking_cut, cooking_threshold) {
		this.updateDisplay();
		this.element.parentNode.style.opacity = 1;
		this.timer_update = this.updatefunc(cooking_cut, cooking_threshold);
		this.timer = this.timerfunc(cooking_cut);
		this.time_mul_up = () => this.time_multiplier_dir(cooking_cut, cooking_threshold, 'UP');
		this.time_mul_down = () => this.time_multiplier_dir(cooking_cut, cooking_threshold, 'DOWN');
		this.time_up_button.addEventListener('click', this.time_mul_up);
		this.time_down_button.addEventListener('click', this.time_mul_down);
	}
	stop() {
		this.clearInterval();
		this.reset();
	}
	reset() {
		this.time = 0;
		this.time_multiplier = 1;
		this.element.parentNode.style.opacity = 0;
		this.time_up_button.removeEventListener('click', this.time_mul_up);
		this.time_down_button.removeEventListener('click', this.time_mul_down);
		this.clearInterval();
		this.updateDisplay();
	}
	clearInterval() {
		clearInterval(this.timer);
		clearInterval(this.timer_update);
	}
	updateDisplay() {
		const hours = Math.floor(this.time / 3600);
		const minutes = Math.floor((this.time % 3600) / 60);
		const seconds = this.time % 60;
		const formattedTime =
			// ${String(hours).padStart(2, '0')}:
			`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} s`;
		this.element.textContent = formattedTime;
		this.time_text.textContent = this.time_multiplier;
	}
	updatefunc(cooking_cut, cooking_threshold) {
		return setInterval(function () {
			if (cooking_cut.cut.style.height != '') return;
			if (cooking_cut.side != 'front') {
				cooking_cut.front_time++;
			} else {
				cooking_cut.back_time++;
			}
			cooking_threshold();
		}, 100 / this.time_multiplier);
	}
	timerfunc(cooking_cut) {
		const self = this;
		return setInterval(function () {
			self.time = Math.floor((cooking_cut.front_time + cooking_cut.back_time) / 10);
			self.updateDisplay();
		}, 1000 / this.time_multiplier);
	}
	/**
	 *
	 * @param {element} cooking_cut
	 * @param {function} cooking_threshold
	 * @param {"UP"|"DOWN"} direction
	 */
	time_multiplier_dir(cooking_cut, cooking_threshold, direction) {
		const self = this;
		if (direction == 'UP') {
			this.time_multiplier++;
		} else {
			this.time_multiplier -= this.time_multiplier > 1 ? 1 : 0;
		}
		this.updateDisplay();
		this.clearInterval();
		this.timer_update = this.updatefunc(cooking_cut, cooking_threshold);
		this.timer = this.timerfunc(cooking_cut);
	}
}
