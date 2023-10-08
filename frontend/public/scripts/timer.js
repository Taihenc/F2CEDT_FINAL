export default class Timer {
	constructor(element) {
		this.element = element;
		this.time = 0;
		this.timer = null;
	}
	start() {
		const self = this;
		self.updateDisplay();
		this.timer = setInterval(function () {
			self.time++;
			self.updateDisplay();
		}, 1000);
	}
	stop() {
		clearInterval(this.timer);
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
