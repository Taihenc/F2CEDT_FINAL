import fs from 'fs';
import path from 'path';
let svg = '';

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

export default async function cooking(page_id, is_show) {
	let class_list = '';
	let style = '';
	if (is_show) {
		class_list = 'content-on-show';
	} else {
		style = 'style="display: none;"';
		class_list = 'content-on-right';
	}
	const cooking = `<div id="page-id-${page_id}" class="content-cooking ${class_list}" draggable="false" ondragstart="return false;">
    <div class='cooking-wrap'>
    <div class="cooking-bg">
    <img src="./img/04_cooking/sauce_2.png" alt="">
    <img src="./img/04_cooking/sauce_1.png" alt="">
    <img src="./img/04_cooking/veggy.png" alt="">
</div>
<div class="cut-plate">
        <div class="cut-pannel">
            <div class="cut-pannel-button">
                <button id='cut-pannel-button'>🐄</button>
            </div>
            <div style='top: -100%;' class="cut-pannel-wrap">
                ${svg}
                <button id='close-pannel-button'>❌</button>
            </div>
        </div>
        <img class="plate" src="./img/04_cooking/plate.png" alt="">
    </div>
    <div class="pan-panel">
        <div id='range-slider' class="range-slider">
            <div class="range-slider_line">
                <div id="slider_thumb" class="range-slider_thumb"><span>🔥</span></div>
                <div id="slider_line" class="range-slider_line-fill"></div>
            </div>
            <input id="slider_input" class="range-slider_input" type="range" value="50" min="0" max="100">
            <div class="heat-slider-text text-header high">High</div>
            <div class="heat-slider-text text-header medium">Medium</div>
            <div class="heat-slider-text text-header low">Low</div>
        </div>
        <div class="pan">
            <div class="pan-hitbox hitbox"></div>
            <img class="pan-img" src="./img/04_cooking/pan.png" alt="">
            <div class="cooking-timer" style='opacity: 0;'>
                <span>
                    <img src="./img/04_cooking/clock.svg" alt="">
                </span>
                <span id='cooking-time' class='text-header'>60:60 s</span>
                <span class='cooking-time-multipy'>
                    <button id='time-multipy-down'>
                        <img src="./img/04_cooking/arrow_left_on.png" alt="">
                    </button>
                    <span>
                        <img src="./img/04_cooking/x_mark.png" alt="">
                        <span id='time-multipy-number' class=' text-header'>1</span>
                    </span>
                    <button id='time-multipy-up'>
                        <img src="./img/04_cooking/arrow_rigth_on.png" alt="">
                    </button>
                </span>
            </div>
        </div>
    </div>
    <div class="cut-info">
        <div id='cut-name' class="cut-name text-header">Short Rib</div>
        <div class="cut-property-info">
            <div class="property text-header">
                Size
                <span>
                    <img src="./img/04_cooking/knife.svg" alt="">
                </span>
            </div>
            <div id='cut-size-info' class="property-info text-sub-header">1/4 to 1/2 inch thick slices</div>
        </div>
        <div class="cut-property-info">
            <div class="property text-header">
                Temperature
                <span>
                    <img src="./img/04_cooking/thermometer.svg" alt="">
                </span>
            </div>
            <div id='cut-temp-info' class="property-info text-sub-header">Medium-high to high heat</div>
        </div>
        <div class="cut-property-info">
            <div class="property text-header">
                Time
                <span>
                    <img src="./img/04_cooking/clock.svg" alt="">
                </span>
            </div>
            <div class="property-info text-sub-header">
                <div id='cut-time-info' class="property-info">1 to 2 minutes per side
                    <br>for medium-rare to medium doneness
                </div>
            </div>
        </div>
    </div>
    <div class="wood-plate">
        <div class="wood-plate-hitbox hitbox"></div>
        <img class="wood-plate-img" src="./img/04_cooking/wood_plate.png" alt="">
    </div>
    </div>
        <div class="cooking-score">
            <img class="score perfect" style="display: none;" src="./img/04_cooking/score_perfect.png" alt="">
            <img class="score good" style="display: none;" src="./img/04_cooking/score_good.png" alt="">
            <img class="score ok" style="display: none;" src="./img/04_cooking/score_ok.png" alt="">
            <img class="score bad" style="display: none;" src="./img/04_cooking/score_bad.png" alt="">
        </div>
</div>`;
	return cooking;
}
