export default class Timer {
	constructor(element) {
		this.element = element;
		this.time = 0;
		this.timer = null;
		this.timer_update = null;
	}
	start(cooking_cut, cooking_threshold) {
		const self = this;
		self.updateDisplay();
		this.element.parentNode.style.opacity = 1;
		this.timer_update = setInterval(function () {
			if (cooking_cut.cut.style.height != '') return;
			if (cooking_cut.side != 'front') {
				cooking_cut.front_time++;
			} else {
				cooking_cut.back_time++;
			}
			cooking_threshold();
		}, 100);
		this.timer = setInterval(function () {
			self.time = Math.floor(
				(cooking_cut.front_time + cooking_cut.back_time) / 10
			);
			self.updateDisplay();
		}, 1000);
	}
	stop() {
		clearInterval(this.timer);
		clearInterval(this.timer_update);
		this.element.parentNode.style.opacity = 0;
		this.reset();
	}
	reset() {
		this.time = 0;
		this.updateDisplay();
	}
	updateDisplay() {
		const hours = Math.floor(this.time / 3600);
		const minutes = Math.floor((this.time % 3600) / 60);
		const seconds = this.time % 60;
		const formattedTime =
			// ${String(hours).padStart(2, '0')}:
			`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
				2,
				'0'
			)} s`;
		this.element.textContent = formattedTime;
	}
}
