const cut_paths = document.querySelectorAll('.cut-selection svg path');
const cut_cards = document.querySelectorAll('.cut-card');

cut_paths.forEach((path) => {
	path.addEventListener('click', (event) => {
		if (path.id != '') {
			const cut_card = document.querySelector(`#${path.id}.cut-card`);
			console.log(path.id, cut_card);
			cut_paths.forEach((path) => {
				path.classList.remove('selected-cut');
			});
			path.classList.add('selected-cut');

			cut_card.classList.add('selected-cut');
			cut_card.style = 'z-index: 3;';
			setTimeout(() => {
				cut_cards.forEach((card) => {
					if (card != cut_card) card.classList.remove('selected-cut');
					cut_card.style = null;
				});
			}, 500);
		}
	});
});
