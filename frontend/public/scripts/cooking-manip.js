import getMousePosition from './mouse-handle.js';
import getTouchPosition from './touch-handle.js';
import { updateMousePosition } from './mouse-handle.js';
import { updateTouchPosition } from './touch-handle.js';

const cut_on_plate = document.getElementsByClassName('cut-on-plate')[0];

const hitboxs = document.getElementsByClassName('hitbox');

const pan = document.getElementsByClassName('pan')[0];
const pan_hitbox = document.getElementsByClassName('pan-hitbox')[0];

const wood_plate = document.getElementsByClassName('wood-plate')[0];
const wood_plate_hitbox =
	document.getElementsByClassName('wood-plate-hitbox')[0];

const cut_pannel_button = document.getElementById('cut-pannel-button');
const close_pannel_button = document.getElementById('close-pannel-button');
const cut_pannel_wrap = document.getElementsByClassName('cut-pannel-wrap')[0];
const cut_paths = document.querySelectorAll('.cut-pannel-wrap svg path');

cookingPanelInit();

cut_on_plate.addEventListener('contextmenu', (event) => {
	event.preventDefault();
});

cut_on_plate.addEventListener('touchstart', (event) => {
	event.preventDefault();
});

document.getElementsByClassName('content-cooking')[0].addEventListener(
	'touchmove',
	(event) => {
		if (event.target.id != 'slider_input') {
			event.preventDefault(); // Prevent default touchmove behavior for elements that don't have the class
		}
	},
	{ passive: false }
);

MovableObject(cut_on_plate, pan, pan_hitbox, (obj, dest, hit) => {
	dest.appendChild(obj);
	MovableObject(
		obj,
		wood_plate,
		wood_plate_hitbox,
		(obj, dest, hit) => {
			dest.appendChild(obj);
			dest.style = null;
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
	// StartCooking(obj);
});

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
	obj.addEventListener('click', () => {
		console.log('clicked');
	});
}

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
		if (path.id != '') {
			path.addEventListener('click', () => {
				closePanel();
				hitboxsDisplayBlockExcept();
			});
		}
	});
}

function closePanel() {
	hitboxsDisplayBlockExcept();
	cut_pannel_wrap.style.top = '-100%';
}

function openPanel() {
	hitboxsDisplayNoneExcept(cut_pannel_wrap);
	cut_pannel_wrap.style = null;
}
