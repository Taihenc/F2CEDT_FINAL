import getMousePosition from './mouse-handle.js';
import getTouchPosition from './touch-handle.js';
import { updateMousePosition } from './mouse-handle.js';
import { updateTouchPosition } from './touch-handle.js';
import Timer from './timer.js';
import GenerateCookingCut from '../components/cooking-cut.js';
import { get_cookings } from '../scripts/api.js';

/**
 * @typedef {import('../scripts/config.js').Cooking_cut} Cooking_cut
 */

const cookings = await get_cookings();

const hitboxs = document.getElementsByClassName('hitbox');

const cut_plate = document.getElementsByClassName('cut-plate')[0];

const pan = document.getElementsByClassName('pan')[0];
const pan_hitbox = document.getElementsByClassName('pan-hitbox')[0];

const wood_plate = document.getElementsByClassName('wood-plate')[0];
const wood_plate_hitbox =
	document.getElementsByClassName('wood-plate-hitbox')[0];

const cut_pannel_button = document.getElementById('cut-pannel-button');
const close_pannel_button = document.getElementById('close-pannel-button');
const cut_pannel_wrap = document.getElementsByClassName('cut-pannel-wrap')[0];
const cut_paths = document.querySelectorAll('.cut-pannel-wrap svg path');

const cooking_time = document.getElementById('cooking-time');
const timer = new Timer(cooking_time);

cookingPanelInit();
InitSlider();

document.getElementsByClassName('content-cooking')[0].addEventListener(
	'touchmove',
	(event) => {
		if (event.target.id != 'slider_input') {
			event.preventDefault(); // Prevent default touchmove behavior for elements that don't have the class
		}
	},
	{ passive: false }
);

/**
 *
 * @param {Element} obj
 * @param {Element} destination
 * @param {Element} hitbox
 * @param {function} callback
    
 }}
 */
function MovableObject(
	obj,
	destination = null,
	hitbox = null,
	callback = null,
	callback2 = null
) {
	let mouseDown = { value: false };
	const obj_mousedown = () => {
		obj.style = `
		    height: ${obj.offsetHeight}px;
		    width: ${obj.offsetWidth}px;
	        z-index: 2;
		    `;
		mouseDown.value = true;
		updateMousePosition((client) => {
			if (mouseDown.value == true) {
				AnimateObjToStickWithMouse(obj, client);
				if (callback2 != null) callback2(obj, destination, hitbox);
				return true;
			} else {
				return false;
			}
		});
	};
	const obj_mouseup = () => {
		if (mouseDown.value == true) {
			requestAnimationFrame(() => {
				obj.animate(
					{
						position: 'static',
					},
					{ duration: 0, fill: 'forwards' }
				);
			});
			obj.style = null;
			mouseDown.value = false;
			if (destination != null && hitbox != null) {
				if (hitbox.matches(':hover')) {
					if (callback != null) {
						callback(obj, destination, hitbox);
					}
					document.removeEventListener('mouseup', obj_mouseup);
					obj.removeEventListener('mousedown', obj_mousedown);
					hitboxsDisplayBlockExcept(hitbox);
				}
			}
		}
	};

	const obj_touchstart = () => {
		obj.style = `
		    height: ${obj.offsetHeight}px;
		    width: ${obj.offsetWidth}px;
			z-index: 2;
			`;
		mouseDown.value = true;
		updateTouchPosition((client) => {
			if (mouseDown.value == true) {
				AnimateObjToStickWithMouse(obj, client);
				if (callback2 != null) callback2(obj, destination, hitbox);
				return true;
			} else {
				return false;
			}
		});
	};
	const obj_touchend = () => {
		if (mouseDown.value == true) {
			requestAnimationFrame(() => {
				obj.animate(
					{
						position: 'static',
					},
					{ duration: 0, fill: 'forwards' }
				);
			});
			obj.style = null;
			mouseDown.value = false;
			if (destination != null && hitbox != null) {
				if (detectDragOverElement(getTouchPosition(), hitbox)) {
					if (callback != null) {
						callback(obj, destination, hitbox);
					}
					obj.removeEventListener('touchstart', obj_touchstart);
					document.removeEventListener('touchend', obj_touchend);
					hitboxsDisplayBlockExcept(hitbox);
				}
			}
		}
	};

	obj.addEventListener('mousedown', obj_mousedown);
	document.addEventListener('mouseup', obj_mouseup);
	obj.addEventListener('touchstart', obj_touchstart);
	document.addEventListener('touchend', obj_touchend);
}

/**
 *
 * @param {Element} obj
 */
function AnimateObjToStickWithMouse(obj, client) {
	obj.animate(
		{
			top: client.y - obj.offsetHeight / 2 + 'px',
			left: client.x - obj.offsetWidth / 2 + 'px',
			position: 'fixed',
		},
		{ duration: 500, fill: 'none' }
	);
}

/**
 *
 * @param {Element} obj
 */
function StartCooking(obj) {
	let front = true;
	let mouseDownTime, mouseUpTime;

	timer.start((time) => {
		if (time > 8) {
			if (front) {
				ChangeDoneness(obj, 'burned', 'back');
			} else {
				ChangeDoneness(obj, 'burned', 'front');
			}
		} else if (time > 5) {
			if (front) {
				ChangeDoneness(obj, 'cooked', 'back');
			} else {
				ChangeDoneness(obj, 'cooked', 'front');
			}
		}
	});
	cooking_time.parentNode.style.opacity = 1;
	const cut_flip = document.getElementById('cut-flip');

	const clickEvent = () => {
		if (obj.style.position == 'fixed') return;
		if (front) {
			cut_flip.style.animation = 'rotate-first' + ' 0.5s'; // Adjust the duration as needed
			front = false;
		} else {
			front = true;
			cut_flip.style.animation = 'rotate-second' + ' 0.5s'; // Adjust the duration as needed
		}
		cut_flip.style.animationFillMode = 'forwards';
	};

	const handleMouseDown = () => {
		mouseDownTime = new Date().getTime();
	};

	const handleMouseUp = () => {
		mouseUpTime = new Date().getTime();
		if (mouseUpTime - mouseDownTime < 100) {
			clickEvent();
		} else if (mouseUpTime - mouseDownTime < 1000) {
			timer.stop();
		}
	};

	MovableObject(
		obj,
		wood_plate,
		wood_plate_hitbox,
		(obj, dest, hit) => {
			cut_flip.style = null;
			cut_flip.removeEventListener('mousedown', handleMouseDown);
			cut_flip.removeEventListener('touchstart', handleMouseDown);
			cut_flip.removeEventListener('mouseup', handleMouseUp);
			cut_flip.removeEventListener('touchend', handleMouseUp);
			dest.style = null;
			dest.appendChild(obj);
		},
		(obj, dest, hit) => {
			if (
				detectDragOverElement(getMousePosition(), hit) |
				detectDragOverElement(getTouchPosition(), hit)
			) {
				dest.style.top = '-10em';
			} else {
				dest.style = null;
			}
		}
	);
	cut_flip.addEventListener('mousedown', handleMouseDown);
	cut_flip.addEventListener('touchstart', handleMouseDown);
	cut_flip.addEventListener('mouseup', handleMouseUp);
	cut_flip.addEventListener('touchend', handleMouseUp);
}

function InitSlider() {
	const slider_input = document.getElementById('slider_input'),
		slider_thumb = document.getElementById('slider_thumb'),
		slider_line = document.getElementById('slider_line');
	function showSliderValue() {
		// slider_thumb.innerHTML = slider_input.value;
		const bulletPosition = mapValue(slider_input.value) / slider_input.max,
			space = slider_input.offsetWidth - slider_thumb.offsetWidth;

		slider_thumb.style.left = bulletPosition * space + 'px';
		slider_line.style.width = mapValue(slider_input.value) + '%';
	}
	showSliderValue();
	window.addEventListener('resize', showSliderValue);
	slider_input.addEventListener('input', showSliderValue, false);
	function mapValue(x) {
		if (x >= 0 && x <= 35) {
			// Map [0, 33.33] to [10, 50]
			return 0;
		} else if (x > 36 && x <= 66) {
			// Map (33.33, 66.66] to [50, 100]
			return 50;
		} else if (x > 87 && x <= 100) {
			// Map (66.66, 100] to [100]
			return 100;
		}
	}
}

function detectDragOverElement(client, targetElement) {
	const targetRect = targetElement.getBoundingClientRect();

	return (
		client.x >= targetRect.left &&
		client.x <= targetRect.right &&
		client.y >= targetRect.top &&
		client.y <= targetRect.bottom
	);
}

function hitboxsDisplayNoneExcept(element = null) {
	for (let i = 0; i < hitboxs.length; i++) {
		if (element == null || (element != null && hitboxs[i] != element))
			hitboxs[i].style.display = 'none';
		else hitboxs[i].style.display = 'block';
	}
}

function hitboxsDisplayBlockExcept(element = null) {
	for (let i = 0; i < hitboxs.length; i++) {
		if (element == null || (element != null && hitboxs[i] != element))
			hitboxs[i].style.display = 'block';
		else hitboxs[i].style.display = 'none';
	}
}

function cookingPanelInit() {
	cut_pannel_button.addEventListener('click', () => {
		openPanel();
		hitboxsDisplayNoneExcept();
	});

	close_pannel_button.addEventListener('click', () => {
		closePanel();
		hitboxsDisplayBlockExcept();
	});

	cut_paths.forEach((path) => {
		path.style.opacity = 0.5;
		if (path.id != '') {
			// if id is valud
			if (!cookings.some((cooking) => cooking.cut_id === path.id)) {
				return;
			}
			path.style.opacity = 1;
			path.classList.add('clickable');
			path.addEventListener('click', () => {
				// gernate new cooking cut and append to cut-on-plate
				/**
				 * @type {Cooking_cut}
				 */
				const cooking_cut = cookings.find((cooking) => {
					return cooking.cut_id == path.id;
				});
				const cooking_cut_element = GenerateCookingCut(cooking_cut);
				ChangeDoneness(cooking_cut_element, 'raw', 'both');
				cut_plate.appendChild(cooking_cut_element);
				MovableObject(
					cooking_cut_element,
					pan,
					pan_hitbox,
					(obj, dest, hit) => {
						dest.appendChild(obj);
						StartCooking(obj);
					}
				);
				closePanel();
				hitboxsDisplayBlockExcept();
			});
		}
	});

	function closePanel() {
		hitboxsDisplayBlockExcept();
		cut_pannel_wrap.style.top = '-100%';
	}

	function openPanel() {
		hitboxsDisplayNoneExcept(cut_pannel_wrap);
		cut_pannel_wrap.style = null;
	}
}

/**
 * @param {Element} cooking_cut
 * @param {"raw" | "cooked" | "burned"} doneness
 * @param {"front" | "back" | "both"} option
 */
function ChangeDoneness(cooking_cut, doneness, option) {
	const cooking_img = cooking_cut.getElementsByTagName('img');
	let opacityValues;

	if (option === 'front') {
		opacityValues = {
			raw: [1, 0, 0],
			cooked: [0, 1, 0],
			burned: [0, 0, 1],
		};
		for (let i = 0; i < 3; i++) {
			cooking_img[i].style.opacity = opacityValues[doneness][i];
		}
	} else if (option === 'back') {
		opacityValues = {
			raw: [1, 0, 0],
			cooked: [0, 1, 0],
			burned: [0, 0, 1],
		};
		for (let i = 3; i < 6; i++) {
			cooking_img[i].style.opacity = opacityValues[doneness][i - 3];
		}
	} else if (option === 'both') {
		opacityValues = {
			raw: [1, 0, 0, 1, 0, 0],
			cooked: [0, 1, 0, 0, 1, 0],
			burned: [0, 0, 1, 0, 0, 1],
		};
		for (let i = 0; i < 6; i++) {
			cooking_img[i].style.opacity = opacityValues[doneness][i];
		}
	}
}
