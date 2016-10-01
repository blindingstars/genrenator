const defaultOptions = {
	minPrefixes: 0,
	maxPrefixes: 2,
	minSuffixes: 1,
	maxSuffixes: 1,
	outputSelector: '#genre',
	buttonSelector: '#button',
	pageSelector: '#genrenator',
	linkboxSelector: '#linkbox',
	enableTwitter: true,
	enableSearch: true,
	twitterIcon: 'twitter',
	searchIcon: 'search',

	themes: [
		'teal',
		'red',
		'purple',
		'jade',
		'avocado',
		'mustard',
	],

	dictionary: {
		prefixes: [
			'8-bit',
			'Abstract',
			'Acid',
			'Acoustic',
			'Adult',
			'African',
			'Alternative',
			'Ambient',
			'American',
			'Anime',
			'Australian',
			'Avant-Garde',
			'Ayurvedic',
			'Barbershop',
			'Baroque',
			'Bedroom',
			'Belgian',
			'Brazilian',
			'Bubblegum',
			'Business',
			'Cabaret',
			'Cajun',
			'Canadian',
			'Caribbean',
			'Celtic',
			'Chamber',
			'Chicago',
			'Children\'s',
			'Choral',
			'Christian',
			'Christmas',
			'Classic',
			'Classical',
			'College',
			'Commercial',
			'Conscious',
			'Contemporary',
			'Corporate',
			'Country',
			'Crossover',
			'Dancehall',
			'Danish',
			'Death',
			'Deep',
			'Dirty',
			'Doom',
			'Downtempo',
			'Early',
			'East Coast',
			'Eco-Friendly',
			'Electric',
			'Electronic',
			'Emo',
			'Ethereal',
			'European',
			'Experimental',
			'Feminist',
			'Folk',
			'French',
			'Future',
			'Gangsta',
			'Garage',
			'German',
			'Glam',
			'Gothic',
			'Gypsy',
			'Halloween',
			'Hardcore',
			'Harsh',
			'High',
			'High-Energy',
			'Himalayan',
			'Holiday',
			'House',
			'Icelandic',
			'Indian',
			'Indie',
			'Industrial',
			'Inspirational',
			'Instrumental',
			'Japanese',
			'Jurassic',
			'Korean',
			'Late',
			'Latin',
			'LGBTQ',
			'Lounge',
			'Mainstream',
			'Medieval',
			'Melodic',
			'Middle Eastern',
			'Minimal',
			'Modern',
			'Neo-',
			'New Age',
			'New York',
			'New Wave',
			'Nordic',
			'Nu',
			'Old-School',
			'Orchestral',
			'Organic',
			'Poetic',
			'Post-',
			'Power',
			'Pre-',
			'Progressive',
			'Proto-',
			'Psychedelic',
			'Ragtime',
			'Regional',
			'Religious',
			'Renaissance',
			'Romantic',
			'Russian',
			'Screamo',
			'Sensual',
			'Sing-Along',
			'Smooth',
			'Soft',
			'Southern',
			'Spoken Word',
			'Stoner',
			'Swedish',
			'Symphonic',
			'Thrash',
			'Traditional',
			'Tribal',
			'Tropical',
			'Underground',
			'Urban',
			'Vocal',
			'West Coast',
		],

		firstHalves: [
			'Afro',
			'Blue',
			'Break',
			'Brit',
			'Bro',
			'Chill',
			'Chip',
			'Clown',
			'Club',
			'Dark',
			'Dream',
			'Dub',
			'Electro',
			'Freak',
			'Ghost',
			'Glitch',
			'Glo',
			'Grind',
			'Hip',
			'Horror',
			'J-',
			'Jungle',
			'K-',
			'Lo-',
			'Math',
			'Metal',
			'Micro',
			'Noise',
			'Political',
			'Prog',
			'Psycho',
			'Retro',
			'Shoe',
			'Soul',
			'Space',
			'Steam',
			'Swing',
			'Synth',
			'Techno',
			'Thrill',
			'Trip',
			'Twee',
			'Vapor',
			'Visual',
		],

		secondHalves: [
			'beat',
			'billy',
			'bop',
			'core',
			'dance',
			'funk',
			'gaze',
			'grass',
			'hop',
			'polka',
			'pop',
			'punk',
			'rock',
			'ska',
			'step',
			'trance',
			'trash',
			'tune',
			'wave',
		],

		suffixes: [
			'Americana',
			'Bebop',
			'Blues',
			'Comedy Duo',
			'Concerto',
			'Covers',
			'Disco',
			'for Cats',
			'for Kids',
			'Fusion',
			'Jazz',
			'on Vinyl',
			'Opera',
			'Rap',
			'Reggae',
			'Tango',
			'Throat Singing',
		],

		buttonLabels: [
			"I liked that before it was cool.",
			"I'm already over it.",
			"Isn't that a thing already?",
			"Literally the worst.",
			"Sellout.",
			"So 2000 and late.",
			"Ugh, hipsters.",
			"Who are you, my grandpa?",
			"Yeah, no.",
		],

		twitterTemplates: [
			"Yo bae, want to come over for some ${genre} and chill?",
			"Totally over ${genre}",
			"Thinking of starting a ${genre} band. Who's in?",
			"Listening to: ${genre}",
			"${genre} is lit af %F0%9F%94%A5%F0%9F%94%A5%F0%9F%94%A5",
		],
	},
};

function randomArray(array) {
	const index = Math.round(Math.random() * (array.length - 1));
	return array[index];
}

function randomArrayExclude(array, excludeValues=[]) {
	while(true) {
		let value = randomArray(array);
		if (excludeValues.indexOf(value) === -1) {
			return value;
		}
	}
}

function randomArrayExceptLocalStorage(array, localStorageKey) {
	let previous = localStorage[localStorageKey];
	let value = randomArrayExclude(array, [previous]);
	localStorage[localStorageKey] = value;
	return value;
}

function randomUniqueElements(array, min, max) {
	const count = Math.round(min + (max-min) * Math.random());
	let output = [];

	for(let i=0; i < count; i++) {
		output.push(randomArrayExclude(array, output));
	}

	return output;
}

function makeGenre(options) {
	let dictionary = options.dictionary;
	let prefixes = randomUniqueElements(dictionary.prefixes, options.minPrefixes, options.maxPrefixes);
	let firstHalf = randomArray(dictionary.firstHalves);
	let secondHalf = randomArray(dictionary.secondHalves);
	let suffixes = randomUniqueElements(dictionary.suffixes, options.minSuffixes, options.maxSuffixes);
	return {prefixes, firstHalf, secondHalf, suffixes};
}

function transformGenre({prefixes, firstHalf, secondHalf, suffixes}) {
	let segments = [];

	prefixes.forEach(prefix => {
		let thisSegment = {
			content: prefix,
			type: 'prefix',
		};

		if (prefix[prefix.length - 1] !== '-') {
			thisSegment.extraChar = ' ';
		}

		segments.push(thisSegment);
	});

	let firstSegment = {
		content: firstHalf,
		type: 'firstHalf',
		lastLetter: firstHalf[firstHalf.length - 1],
	};

	let secondSegment = {
		content: secondHalf,
		type: 'secondHalf',
		firstLetter: secondHalf[0],
	};

	if (secondHalf === 'billy') {
		if (firstSegment.lastLetter.match(/[^-aeiouyr]/)) {
			firstSegment.extraChar = 'a';
		}
	} else if (firstSegment.lastLetter === secondSegment.firstLetter) {
		firstSegment.extraChar = '-';
	}

	segments.push(firstSegment, secondSegment);

	if (suffixes.length) {
		secondSegment.extraChar = ' ';
	}

	suffixes.forEach(suffix => {
		let thisSegment = {
			content: suffix,
			type: 'suffix',
			extraChar: ' ',
		};

		segments.push(thisSegment);
	});

	delete segments[segments.length - 1].extraChar;

	let i = 0;
	while (i < segments.length) {
		let thisSegment = segments[i];
		if (thisSegment.extraChar) {
			let newSegment = {
				content: thisSegment.extraChar,
				type: 'extra',
			};

			segments.splice(i+1, 0, newSegment);
			delete thisSegment.extraChar;
		}

		i++;
	}

	return segments;
}

function makeHtmlGenre(segments) {
	let output = document.createElement('div');
	output.classList.add('genre');

	segments.forEach(segment => {
		let element = document.createElement('span');
		element.innerText = segment.content;
		element.classList.add(segment.type);
		output.appendChild(element);
	});

	return output;
}

function assignTheme(options) {
	let themes = options.themes;
	let colorClasses = themes.map(c => `${c}-theme`);
	let randomColor = randomArrayExceptLocalStorage(themes, 'genrenatorPreviousTheme');
	let page = document.querySelector(options.pageSelector);
	page.classList.remove(...colorClasses);
	page.classList.add(randomColor + '-theme');
}

function createLinks(genre, options) {
	let twitterTemplates = options.dictionary.twitterTemplates;
	let links = [];

	if (options.enableTwitter) {
		const createTweetUrl = tweet => `https://twitter.com/intent/tweet?text=${tweet}%20%23genrenator%20http%3A%2F%2Fgenrenator.surge.sh`

		let icon = document.createElement('i');
		icon.classList.add('fa', `fa-${options.twitterIcon}`);

		let link = document.createElement('a');
		let tweet = randomArrayExceptLocalStorage(twitterTemplates, 'genrenatorPreviousTweet').replace('${genre}', genre);
		link.setAttribute('href', createTweetUrl(tweet));
		link.setAttribute('target', '_blank');

		link.appendChild(icon);
		links.push(link);
	}

	if (options.enableSearch) {
		const createSearchUrl = genre => `https://www.google.com/search?q=${genre}`

		let icon = document.createElement('i');
		icon.classList.add('fa', `fa-${options.searchIcon}`);

		let link = document.createElement('a');
		link.setAttribute('href', createSearchUrl(genre));
		link.setAttribute('target', '_blank');

		link.appendChild(icon);
		links.push(link);
	}

	return links;
}

function genrenate(defaultOptions) {
	// Prepare options
	let options = JSON.parse(JSON.stringify(defaultOptions));
	if (Math.random() > 0.65) {
		options.minPrefixes = 0;
		options.maxPrefixes = 0;
	} else {
		options.minSuffixes = 0;
		options.maxSuffixes = 0;
	}

	// Create genre and main output
	let segments = transformGenre(makeGenre(options));
	let htmlGenre = makeHtmlGenre(segments);
	let outputContainer = document.querySelector(options.outputSelector);
	outputContainer.innerHTML = '';
	outputContainer.appendChild(htmlGenre);

	// Prepare button
	let button = document.querySelector(options.buttonSelector);
	button.innerText = randomArrayExceptLocalStorage(options.dictionary.buttonLabels, 'genrenatorPreviousButton');

	assignTheme(options);

	// Generate links
	let links = createLinks(htmlGenre.innerText, options);
	let linkbox = document.querySelector(options.linkboxSelector);
	linkbox.innerHTML = '';
	links.forEach(link => linkbox.appendChild(link));
}

document.addEventListener("DOMContentLoaded", function(event) { 
	genrenate(defaultOptions);
});