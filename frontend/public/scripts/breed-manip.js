import { query } from '../components/breed.js';
import { get_breeds } from '../scripts/api.js';
import { generateBreedCard } from '../components/breed.js';

const breed_input = document.getElementById('breed-input');
const breed_cards = document.getElementsByClassName('breed-cards')[0];

function addClickExpand() {
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
							parseFloat(
								window
									.getComputedStyle(info)
									.getPropertyValue('font-size')
							);
						info.style.height = height_in_em + 'em';
					}
				});
			}
		});
	}
}

breed_input.addEventListener('keydown', async (event) => {
	if (event.key === 'Enter') {
		const breed_name = breed_input.value;
		const breeds = await get_breeds(
			`{ "$or": [
				{"breed_name": {"$regex": "${breed_name}", "$options": "i"}},
				{"breed_country": {"$regex": "${breed_name}", "$options": "i"}},
				{"breed_info": {"$regex": "${breed_name}", "$options": "i"}}
				]}`
		);
		const append = breeds.map((breed) => generateBreedCard(breed)).join('');
		breed_cards.innerHTML = append;
		addClickExpand();
	}
});

addClickExpand();
