import { get_cuts } from '../scripts/api.js';
import { toPercentage, backend_url } from '../scripts/config.js';
import fs from 'fs';
import path from 'path';
let svg = '';

/**@typedef {import('../scripts/config.js').Cut_card} Cut_card */

fs.readFile(
	path.resolve('./public/img/03_cuts/cow_cut.svg'),
	'utf-8',
	(err, data) => {
		if (err) {
			console.log('Cant read cow_cut.svg', err);
		}
		svg = data;
	}
);

export default async function cut(page_id, is_show) {
	let class_list = '';
	let style = '';
	if (is_show) {
		class_list = 'content-on-show';
	} else {
		style = 'style="display: none;"';
		class_list = 'content-on-right';
	}
	const cut = `<div id="page-id-${page_id}" class="content-cut ${class_list}" ${style}>
        <div class="cut-selection">
        ${svg}
        </div>
            <div class="cut-selected-card">
                <div class="cut-selected-card-backdrop">
                    <img src="./img/common/leaf.png" alt="">
                    <img src="./img/common/leaf.png" alt="">
                </div>
                <!-- replace me! -->
            </div>
</div>`;
	let append = '';
	try {
		/**
		 * @type {Cut_card[]}
		 */
		const cards = await get_cuts();
		append = cards.map((cut) => generateCutCard(cut)).join('');
	} catch (error) {
		console.log('Error fetching cuts', error);
	}
	return cut.replace('<!-- replace me! -->', append);
}

/**
 *
 * @param {Cut_card} cut
 */
function generateCutCard(cut) {
	const selected_cut = 'cut_tenderloin';
	let classList = '';
	if (cut.cut_id == selected_cut) {
		classList += 'selected-cut';
	}
	const cut_card_template = `
    <div id='${cut.cut_id}' class="cut-card ${classList}">
        <div class="cut-selected-card-img">
            <img src="${backend_url}${cut.cut_path_img}" alt="">
        </div>
        <div class="cut-selected-info">
            <div class="cut-selected-header text-header">${cut.cut_name}</div>
            <div class="cut-selected-stats">
                <div class="cut-stat-price">
                    <div class="cut-stat-and-value text-sub-header">
                        <span class="stat-name text-header">Price</span>
                        ${cut.cut_price_level}
                    </div>
                    <div class="cut-stat-bar">
                        <div class="stat-bar-percent" style="width: ${
							toPercentage[cut.cut_price_level]
						}%;"></div>
                    </div>
                </div>
                <div class="cut-stat-price">
                    <div class="cut-stat-and-value text-sub-header">
                        <span class="stat-name text-header">Marbling</span>
                        ${cut.cut_marbling_level}
                    </div>
                    <div class="cut-stat-bar">
                        <div class="stat-bar-percent" style="width: ${
							toPercentage[cut.cut_marbling_level]
						}%;"></div>
                    </div>
                </div>
            </div>
            <div class="cut-selected-text text-para-light">
                ${cut.cut_info}
            </div>
        </div>
    </div>
    `;
	return cut_card_template;
}
