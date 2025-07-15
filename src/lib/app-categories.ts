export const APP_CATEGORIES = [
	'wtv',
	'accessories',
	'education',
	'games',
	'graphics',
	'internet',
	'office',
	'programming',
	'sound-and-video',
	'system-tools',
	'utilities',
	'other',
] as const;

export type AppCategory = (typeof APP_CATEGORIES)[number];

interface CategoryMapping {
	category: Exclude<AppCategory, 'wtv'>;
	keywords: string[];
}

export function get_primary_category(categories?: string[]): AppCategory {
	if (!categories || categories.length === 0) {
		return 'other';
	}

	categories = categories.map((cat) => cat.toLowerCase());

	const categoryMap: CategoryMapping[] = [
		{ category: 'games', keywords: ['game'] },
		{ category: 'graphics', keywords: ['graphics', 'photography'] },
		{ category: 'sound-and-video', keywords: ['audio', 'video'] },
		{ category: 'programming', keywords: ['development', 'ide'] },
		{ category: 'internet', keywords: ['network', 'web', 'email'] },
		{ category: 'office', keywords: ['office', 'document'] },
		{ category: 'education', keywords: ['education', 'science'] },
		{ category: 'system-tools', keywords: ['system', 'settings'] },
		{ category: 'utilities', keywords: ['utility', 'tool'] },
		{ category: 'accessories', keywords: ['accessories'] },
	];

	for (const { category, keywords } of categoryMap) {
		// prettier-ignore
		if (categories.some((cat) => keywords.some((key) => cat.includes(key)))) {
			return category;
		}
	}

	return 'other';
}
