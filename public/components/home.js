export default function home(page_id, is_show) {
	let class_list = '';
	let style = '';
	if (is_show) {
		class_list = 'content-on-show';
	} else {
		style = 'style="display: none;"';
		class_list = 'content-on-right';
	}
	const home = `
	<div id='page-id-${page_id}' class='content-home ${class_list}' ${style}>
        <div class="home-card">
            <div class="home-card-backdrop">
                <img src="./img/common/leaf.png" alt="">
                <img src="./img/common/leaf.png" alt="">
                <img src="./img/common/leaf.png" alt="">
                <img src="./img/common/leaf.png" alt="">
            </div>
            <div class='card-left'>
                <div class='card-header text-header'>The Artisty of Beef</div>
                <div class='card-para-text text-para-light'>we believe that beef is more than just a meal</div>
                <div class='card-ul'>
                    <div class='card-para-dot text-sub-header'>Explore Beef Breeds</div>
                    <div class='card-para-dot text-sub-header'>Discover Unique</div>
                    <div class='card-para-dot text-sub-header'>Cooking Techiques</div>
                </div>
                <button id='start-now-button' class='card-button text-para-light'>START NOW</button>
            </div>
            <div id='svg-grill'>
                <img src="./img/01_home/pan.png" alt="" />
            </div>
            <button id='start-now-button' class='card-button card-button-mobile text-para-light'>START NOW</button>
            <div class='card-right'>
                <div class='card-header text-header'>WHY BEEF?</div>
                <div class='card-sub-header text-sub-header'>THE KING OF ALL MEAT.</div>
                <div class='card-cow-img'>
                    <img src="./img/01_home/cowicon.png" alt="">
                </div>
                <div class='card-para-text text-para-light'>
                    Beef's rich history spans centuries. Its enduring popularity is rooted in its flavor, nutrition,
                    and versatility, captivating culinary enthusiasts worldwide.
                </div>
            </div>
        </div>
    </div>
    `;
	return home;
}
