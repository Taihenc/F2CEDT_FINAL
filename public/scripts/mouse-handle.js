let mousePos = { x: 0, y: 0 }; // Initialize mouse position

export default function getMousePosition() {
	return { ...mousePos }; // Return a copy to avoid unintended modifications
}

function handleMouseMove(event) {
	event = event || window.event; // Handle IE event

	if (event.type === 'mousemove') {
		mousePos.x = event.clientX;
		mousePos.y = event.clientY;
	}
}

export function updateMousePosition(callback) {
	function update() {
		if (callback(getMousePosition())) requestAnimationFrame(update);
	}
	update();
}

document.addEventListener('mousemove', handleMouseMove);
