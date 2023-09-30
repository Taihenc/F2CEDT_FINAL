export default function breed(page_id, is_show) {
	let class_list = '';
	if (is_show) {
		class_list = 'content-on-show';
	} else {
		class_list = 'content-on-right';
	}
	let breed = `
<div id="page-id-${page_id}" class="content-breed ${class_list}">
    <div class="breed-tools">
        <div id="breed-filter">
            <div id='breed-filter-icon'></div>
            <div id='breed-filter-text' class='text-para-light'>Filter</div>
        </div>
        <div id="breed-search">
            <div id='breed-search-icon'></div>
            <input type='text' id="breed-input" placeholder='What are you looking for'>
        </div>
        <div id="breed-sort">
            <div id='breed-sort-icon'></div>
            <div id='breed-sort-text' class='text-para-light'>Sort</div>
        </div>
    </div>
    <div class="breed-cards">
        <!-- replace me! -->
    </div>
</div>
    `;
	const breed_cards = `
<div class="card-breed">
    <div class="card-breed-top">
        <div class="card-breed-img">
            <img src="../img/02_breed/angus_img.png" alt="Angus">
        </div>
        <div class="card-breed-info">
            <div class="card-breed-def">
                <div class="card-breed-land text-sub-header">
                    <img src="./img/country/scotland.png" alt="">
                    Scotland
                </div>
                <div class="card-breed-name text-header">Angus</div>
            </div>
            <div class="card-breed-stats">
                <div class="card-breed-stat-price">
                    <div class="stat-and-value text-sub-header">
                        <span class='stat-name text-header'>Price Rating</span>
                        Moderate to high
                    </div>
                    <div class="stat-bar">
                        <div class="stat-bar-percent" style='width: 80%;'></div>
                    </div>
                </div>
                <div class="card-breed-stat-price">
                    <div class="stat-and-value text-sub-header">
                        <span class='stat-name text-header'>Marbling</span>
                        Moderate to high
                    </div>
                    <div class="stat-bar">
                        <div class="stat-bar-percent" style='width: 80%;'></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-breed-expand-button"></div>
    </div>
    <div class="card-breed-more-info" style='height: 0px;'>
        <div class='text-para-light'>
            The Angus breed of cattle is known for its exceptional meat quality and marbling. These cattle
            are
            black in color and have a distinct appearance with a smooth and muscular body. They are docile
            in
            nature and adapt well to various climates. Angus beef is highly regarded for its tenderness,
            juiciness, and rich flavor.
        </div>
    </div>
</div>`;

	let append = '';
	for (let i = 0; i < 10; i++) {
		append += breed_cards;
	}

	return breed.replace('<!-- replace me! -->', append);
}
