const defaultOptions = {
	minPrefixes: 0,
	maxPrefixes: 2,
	minSuffixes: 1,
	maxSuffixes: 1,
	outputSelector: '#genre',
	buttonSelector: '#button',
};

const dictionary = {
	prefixes: [
		'8-bit',
		'Abstract',
		'Acid',
		'Acoustic',
		'Adult',
		'African',
		'Afro',
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
		'Brazilian',
		'Bubblegum',
		'Business',
		'Cajun',
		'Canadian',
		'Caribbean',
		'Celtic',
		'Chamber',
		'Children\'s',
		'Choral',
		'Christian',
		'Christmas',
		'Classic',
		'Classical',
		'College',
		'Commercial',
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
		'High',
		'High-Energy',
		'Himalayan',
		'Holiday',
		'House',
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
		'New Wave',
		'Nordic',
		'Nu',
		'Old-School',
		'Orchestral',
		'Organic',
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
		"I'm so over it.",
		"Isn't that a thing already?",
		"Sellout.",
		"So 2000 and late.",
		"Ugh, hipsters.",
		"Who are you, my grandpa?",
	],
};

const pageThemes = {
	themes: [
		'teal',
		'red',
		'purple',
		'jade',
		'avocado',
		'mustard',
	]
};

function randomArray(array) {
	const index = Math.round(Math.random() * (array.length - 1));
	return array[index];
}

function randomUniqueElements(array, min, max) {
	const count = Math.round(min + (max-min) * Math.random());
	let output = [];

	while (output.length < count) {
		let element = randomArray(array);
		if (output.indexOf(element) === -1) {
			output.push(element);
		}
	}

	return output;
}

function genrenate(dictionary, options) {
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

function regenrenate(defaultOptions) {
	let options = JSON.parse(JSON.stringify(defaultOptions));

	if (Math.random() > 0.65) {
		options.minPrefixes = 0;
		options.maxPrefixes = 0;
	} else {
		options.minSuffixes = 0;
		options.maxSuffixes = 0;
	}

	let segments = transformGenre(genrenate(dictionary, options));
	let htmlGenre = makeHtmlGenre(segments);

	console.log(htmlGenre.innerText);
	let outputContainer = document.querySelector(options.outputSelector);
	outputContainer.innerHTML = '';
	outputContainer.appendChild(htmlGenre);

	let button = document.querySelector(options.buttonSelector);
	button.innerText = randomArray(dictionary.buttonLabels);
}

document.addEventListener("DOMContentLoaded", function(event) { 
	regenrenate(defaultOptions);
});