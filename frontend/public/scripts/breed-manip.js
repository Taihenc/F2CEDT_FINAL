const buttons = document.getElementsByClassName('card-breed-expand-button');
// add click event to each button
for (let i = 0; i < buttons.length; i++) {
	buttons[i].parentElement.addEventListener('click', function () {
		let info = buttons[i];
		info = info.parentElement.parentElement.getElementsByClassName(
			'card-breed-more-info'
		)[0];
		if (info.style.height != '0px') {
			info.style.height = 0;
			buttons[i].classList.remove('card-breed-expand-button-active');
		} else {
			buttons[i].classList.add('card-breed-expand-button-active');
			info.childNodes.forEach((node) => {
				if (node.tagName == 'DIV') {
					const height_in_em =
						node.offsetHeight /
						parseInt(
							window
								.getComputedStyle(node)
								.getPropertyValue('font-size')
						);
					info.style.height = height_in_em + 'em';
				}
			});
		}
	});
}
