const cut_paths = document.querySelectorAll('.cut-selection svg path');
const cut_cards = document.querySelectorAll('.cut-card');
let timeOutID;
let zindex = 3;

cut_paths.forEach((path) => {
	path.addEventListener('click', (event) => {
		if (path.id != '') {
			const cut_card = document.querySelector(`#${path.id}.cut-card`);
			cut_paths.forEach((path) => {
				path.classList.remove('selected-cut');
			});
			path.classList.add('selected-cut');

			clearTimeout(timeOutID);
			console.log(cut_card);
			cut_card.classList.add('selected-cut');
			cut_card.style = `z-index: ${zindex++};`;
			timeOutID = setTimeout(() => {
				cut_cards.forEach((card) => {
					zindex = 3;
					if (card != cut_card) card.classList.remove('selected-cut');
					cut_card.style = null;
				});
			}, 500);
		}
	});
});
