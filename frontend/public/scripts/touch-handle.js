let touchPos = { x: 0, y: 0 }; // Initialize touch position

export default function getTouchPosition() {
	return { ...touchPos }; // Return a copy to avoid unintended modifications
}

function handleTouchMove(event) {
	// event.preventDefault(); // Prevent default touch behavior

	const touch = event.touches[0]; // Get the first touch (assumes only one touch)
	touchPos.x = touch.clientX;
	touchPos.y = touch.clientY;
}

export function updateTouchPosition(callback) {
	function update() {
		if (callback(getTouchPosition())) requestAnimationFrame(update);
	}
	update();
	// You can use the touchPos here for any real-time processing or rendering
}

document.addEventListener('touchmove', handleTouchMove); // Start updating touch position
document.addEventListener('touchstart', handleTouchMove); // Start updating touch position
