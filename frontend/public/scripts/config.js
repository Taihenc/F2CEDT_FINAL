export let backend_url = 'http://localhost:81';

/**
 * @typedef {Object} Breed_card
 * @property {string} _id
 * @property {string} breed_path_img
 * @property {string} breed_name
 * @property {string} breed_country
 * @property {string} breed_country_img
 * @property {string} breed_price_level
 * @property {string} breed_marbling_level
 * @property {string} breed_info
 */

/**
 * @typedef {Object} Cut_card
 * @property {string} _id
 * @property {string} cut_id
 * @property {string} cut_path_img
 * @property {string} cut_name
 * @property {string} cut_price_level
 * @property {string} cut_marbling_level
 * @property {string} cut_info
 */

/**
 * @typedef {Object} Cooking_cut
 * @property {string} _id
 * @property {string} cut_id
 * @property {string} cooking_id
 * @property {Array} cooking_path_img
 * @property {string} cooking_name
 * @property {string} cooking_size_text
 * @property {string} cooking_temperature_text
 * @property {string} cooking_time_text
 * @property {number} cooking_perfect_min_value
 * @property {number} cooking_perfect_max_value
 *  */

export const toPercentage = {
	'Low': 0,
	'Low to moderate': 25,
	'Moderate': 50,
	'Moderate to high': 75,
	'High': 100,
};

export function Set_backend_url(url) {
	backend_url = url;
}
