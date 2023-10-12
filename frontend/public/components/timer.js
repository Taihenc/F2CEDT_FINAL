export default class Timer {
	constructor(element, time_up, time_down, time_text) {
		this.element = element;
		this.time = 0;
		this.timer = null;
		this.timer_update = null;
		this.time_up = time_up;
		this.time_down = time_down;
		this.time_text = time_text;
		this.time_multiplier = 1;
	}
	start(cooking_cut, cooking_threshold) {
		const self = this;
		self.time_multiplier = 1;
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
		}, 100 / self.time_multiplier);
		this.timer = setInterval(function () {
			self.time = Math.floor(
				(cooking_cut.front_time + cooking_cut.back_time) / 10
			);
			self.updateDisplay();
		}, 1000 / self.time_multiplier);

		this.time_up.addEventListener('click', function () {
			self.time_multiplier++;
			self.time_text.textContent = self.time_multiplier;
			clearInterval(self.timer);
			clearInterval(self.timer_update);
			self.timer_update = setInterval(function () {
				if (cooking_cut.cut.style.height != '') return;
				if (cooking_cut.side != 'front') {
					cooking_cut.front_time++;
				} else {
					cooking_cut.back_time++;
				}
				cooking_threshold();
			}, 100 / self.time_multiplier);
			self.timer = setInterval(function () {
				self.time = Math.floor(
					(cooking_cut.front_time + cooking_cut.back_time) / 10
				);
				self.updateDisplay();
			}, 1000 / self.time_multiplier);
		});
		this.time_down.addEventListener('click', function () {
			self.time_multiplier -= self.time_multiplier > 1 ? 1 : 0;
			self.time_text.textContent = self.time_multiplier;
			clearInterval(self.timer);
			clearInterval(self.timer_update);
			self.timer_update = setInterval(function () {
				if (cooking_cut.cut.style.height != '') return;
				if (cooking_cut.side != 'front') {
					cooking_cut.front_time++;
				} else {
					cooking_cut.back_time++;
				}
				cooking_threshold();
			}, 100 / self.time_multiplier);
			self.timer = setInterval(function () {
				self.time = Math.floor(
					(cooking_cut.front_time + cooking_cut.back_time) / 10
				);
				self.updateDisplay();
			}, 1000 / self.time_multiplier);
		});
	}
	stop() {
		clearInterval(this.timer);
		clearInterval(this.timer_update);
		self.time_multiplier = 1;
		this.element.parentNode.style.opacity = 0;
		this.time_multiplier = 1;
		this.reset();
	}
	reset() {
		this.time = 0;
		this.time_multiplier = 1;
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
		this.time_text.textContent = this.time_multiplier;
	}
}
