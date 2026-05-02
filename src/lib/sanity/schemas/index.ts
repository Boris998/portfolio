import { imageWithCaption, codeBlock, callout, metricGrid, pullQuote, beforeAfter } from './blocks';
import { experiment } from './experiment';
import { post } from './post';
import { project } from './project';
import { settings } from './settings';
import { techStack } from './techStack';
import { testimonial } from './testimonial';

export const schemaTypes = [
	// Documents
	settings,
	project,
	testimonial,
	post,
	techStack,
	experiment,
	// Portable text object types
	imageWithCaption,
	codeBlock,
	callout,
	metricGrid,
	pullQuote,
	beforeAfter
];
