import { backend_url } from '../scripts/config.js';
/**@typedef {import('../scripts/config.js').Cooking_cut} Cooking_cut */

/**
 * @param {Cooking_cut} cooking_cut
 */
export default function GenerateCookingCut(cooking_cut) {
	const cooking_cut_template = `<div class="cooking-cut cut">
        <div id='cut-flip' class="cooking-cut__wrapper">
            <div class="cooking-cut__side is-active">
                <img src="${backend_url}${cooking_cut.cooking_path_img[0]}" alt="">
                <img src="${backend_url}${cooking_cut.cooking_path_img[1]}" alt="">
                <img src="${backend_url}${cooking_cut.cooking_path_img[2]}" alt="">
            </div>
            <div class="cooking-cut__side cooking-cut__side--back">
                <img src="${backend_url}${cooking_cut.cooking_path_img[0]}" alt="">
                <img src="${backend_url}${cooking_cut.cooking_path_img[1]}" alt="">
                <img src="${backend_url}${cooking_cut.cooking_path_img[2]}" alt="">
            </div>
        </div>
    </div>`;
	const cooking_cut_element = document.createElement('div');
	cooking_cut_element.innerHTML = cooking_cut_template;

	cooking_cut_element.addEventListener('contextmenu', (event) => {
		event.preventDefault();
	});

	cooking_cut_element.addEventListener('touchstart', (event) => {
		event.preventDefault();
	});

	return cooking_cut_element.childNodes[0];
}
