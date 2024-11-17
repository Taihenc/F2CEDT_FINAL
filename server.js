import home from './public/components/home.js';
import breed from './public/components/breed.js';
import cut from './public/components/cut.js';
import cooking from './public/components/cooking.js';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// let html = data;
const breedManip_script = document.createElement('script');
breedManip_script.type = 'module';
breedManip_script.src = './scripts/breed-manip.js';

const cutManip_script = document.createElement('script');
cutManip_script.type = 'module';
cutManip_script.src = './scripts/cut-manip.js';

const cookingManip_script = document.createElement('script');
cookingManip_script.type = 'module';
cookingManip_script.src = './scripts/cooking-manip.js';

const navigation_script = document.createElement('script');
navigation_script.type = 'module';
navigation_script.src = './scripts/navigation.js';

const loading = document.getElementById('loading');

let append = '';
(async () => {
	append += home(0, true);
	append += await breed(1, false);
	append += await cut(2, false);
	append += await cooking(3, false);
	document.querySelector('#replace-me').outerHTML = append;
	document.body.appendChild(breedManip_script);
	document.body.appendChild(cutManip_script);
	document.body.appendChild(cookingManip_script);
	document.body.appendChild(navigation_script);
	// slowly reduce opacity of loading screen
	loading.classList.add('disappear');
	// remove loading screen after 1s
	setTimeout(() => {
		loading.remove();
	}, 1000);

})();
