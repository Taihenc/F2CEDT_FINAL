import breed, { query } from '../components/breed.js';
import { get_breeds, get_breeds_sorted } from '../scripts/api.js';
import { generateBreedCard } from '../components/breed.js';
import { backend_url } from './config.js';

const breed_input = document.getElementById('breed-input');
const breed_cards = document.getElementsByClassName('breed-cards')[0];

const tools_panel = document.getElementsByClassName('breed-tools-pannel')[0];
const filter_selected = document.getElementsByClassName('filter-selected')[0];
const filter_options = document.getElementsByClassName('filter-options')[0];
const filter_button = document.getElementById('breed-filter');

const sort_button = document.getElementById('breed-sort');
const sort_pannel = document.getElementsByClassName('sort-pannel')[0];

let isFilterOpen = false;
let isSortOpen = false;

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

const filters = get_breeds().then((breeds) => {
	const filters = new Set();
	breeds.forEach((breed) => {
		if (filters.has(breed.breed_country)) return;
		filter_options.innerHTML += generateFilterOption(breed);
		filters.add(breed.breed_country);
	});
	filter_options.childNodes.forEach((option) => {
		option.addEventListener('click', () => {
			if (option.parentNode.classList.contains('filter-options')) {
				filter_selected.appendChild(option);
			} else {
				filter_options.appendChild(option);
			}
		});
	});
});

function generateFilterOption(breed) {
	return `
	<div id='${breed.breed_country}' class="text-sub-header">
		<img src="${backend_url}${breed.breed_country_img}" alt="">
		${breed.breed_country}
	</div>
	`;
}

filter_button.addEventListener('click', async () => {
	if (isFilterOpen == false) {
		isFilterOpen = true;
		tools_panel.style.display = null;
		tools_panel.animate([{ opacity: 0 }, { opacity: 1 }], {
			duration: 200,
			fill: 'forwards',
		});
		tools_panel.style = null;
	} else {
		isFilterOpen = false;
		const animation = tools_panel.animate(
			[{ opacity: 1 }, { opacity: 0 }],
			{
				duration: 200,
				fill: 'forwards',
			}
		);
		animation.onfinish = () => {
			tools_panel.style.display = 'none';
		};

		const filters_selected = new Set();
		filter_selected.childNodes.forEach((option) => {
			filters_selected.add(option.id);
		});
		let query = '';
		filters_selected.forEach((filter) => {
			query += `{"breed_country": {"$regex": "${filter}", "$options": "i"}},`;
		});
		if (filters_selected.size != 1) {
			const breeds = await get_breeds(
				`{ "$or": [${query.substring(0, query.length - 1)}]}`
			);
			const append = breeds
				.map((breed) => generateBreedCard(breed))
				.join('');
			breed_cards.innerHTML = append;
			addClickExpand();
		} else {
			const breeds = await get_breeds();
			const append = breeds
				.map((breed) => generateBreedCard(breed))
				.join('');
			breed_cards.innerHTML = append;
			addClickExpand();
		}
	}
});

sort_button.addEventListener('click', async () => {
	if (isSortOpen == false) {
		isSortOpen = true;
		sort_pannel.style.display = null;
		sort_pannel.animate([{ opacity: 0 }, { opacity: 1 }], {
			duration: 200,
			fill: 'forwards',
		});
		sort_pannel.style = null;
	} else {
		isSortOpen = false;
		const animation = sort_pannel.animate(
			[{ opacity: 1 }, { opacity: 0 }],
			{
				duration: 200,
				fill: 'forwards',
			}
		);
		animation.onfinish = () => {
			sort_pannel.style.display = 'none';
		};

		const sort_option =
			sort_pannel.getElementsByClassName('sort-option-active')[0];
		const sort_order = sort_option.classList.contains('ascending') ? 1 : -1;
		const breeds = await get_breeds_sorted(
			`{"${sort_option.dataset.field}": "${sort_order}"}`
		);
		const append = breeds.map((breed) => generateBreedCard(breed)).join('');
		breed_cards.innerHTML = append;
		addClickExpand();
	}
	sort_pannel.childNodes.forEach((option) => {
		option.addEventListener('click', (event) => {
			event.stopPropagation();
			if (!option.classList.contains('sort-option')) return;
			if (option.classList.contains('ascending')) {
				option.classList.remove('ascending');
				option.classList.add('descending');
			} else {
				option.classList.remove('descending');
				option.classList.add('ascending');
			}

			sort_pannel.childNodes.forEach((option) => {
				option?.classList?.remove('sort-option-active');
			});
			option.classList.add('sort-option-active');
		});
	});
});
