declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"posts": {
"10-days-to-tech-mogul--huawei-s-wajir-pr-circus-is-giving-major-delusion.md": {
	id: "10-days-to-tech-mogul--huawei-s-wajir-pr-circus-is-giving-major-delusion.md";
  slug: "10-days-to-tech-mogul--huawei-s-wajir-pr-circus-is-giving-major-delusion";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"10-mind-blowing-facts-about-safaricom.md": {
	id: "10-mind-blowing-facts-about-safaricom.md";
  slug: "10-mind-blowing-facts-about-safaricom";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"110-million-for-who--the-african-music-boom-is-just-a-fancy-way-to-go-broke.md": {
	id: "110-million-for-who--the-african-music-boom-is-just-a-fancy-way-to-go-broke.md";
  slug: "110-million-for-who--the-african-music-boom-is-just-a-fancy-way-to-go-broke";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"15-kenyans-pulled-from-iran-s-mess-via-turkey--because-what-else-is-new.md": {
	id: "15-kenyans-pulled-from-iran-s-mess-via-turkey--because-what-else-is-new.md";
  slug: "15-kenyans-pulled-from-iran-s-mess-via-turkey--because-what-else-is-new";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"18-years-of-shooting-blanks--kdf-finally-finds-a-working-gun.md": {
	id: "18-years-of-shooting-blanks--kdf-finally-finds-a-working-gun.md";
  slug: "18-years-of-shooting-blanks--kdf-finally-finds-a-working-gun";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2-shot-dead-after-botched-attempt-to-storm-police-station.md": {
	id: "2-shot-dead-after-botched-attempt-to-storm-police-station.md";
  slug: "2-shot-dead-after-botched-attempt-to-storm-police-station";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2026-triumph-scrambler-400-xc-in-malaysia-this-march--priced-at-rm34-200--bookings-taken-now.md": {
	id: "2026-triumph-scrambler-400-xc-in-malaysia-this-march--priced-at-rm34-200--bookings-taken-now.md";
  slug: "2026-triumph-scrambler-400-xc-in-malaysia-this-march--priced-at-rm34-200--bookings-taken-now";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2027--the-early-bird-catches-the-kenyan-taxpayer-s-lungs.md": {
	id: "2027--the-early-bird-catches-the-kenyan-taxpayer-s-lungs.md";
  slug: "2027--the-early-bird-catches-the-kenyan-taxpayer-s-lungs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2027-vote-battle-zones--iebc-voter-enrolment-targets-a-sham.md": {
	id: "2027-vote-battle-zones--iebc-voter-enrolment-targets-a-sham.md";
  slug: "2027-vote-battle-zones--iebc-voter-enrolment-targets-a-sham";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"30-years-to-the-first-world--we-can-t-even-cross-the-road-without-a-bribe.md": {
	id: "30-years-to-the-first-world--we-can-t-even-cross-the-road-without-a-bribe.md";
  slug: "30-years-to-the-first-world--we-can-t-even-cross-the-road-without-a-bribe";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"33-year-old-flees-nyc-for-florida-retirement-haven--finds-predictable-solace-in-age-gap.md": {
	id: "33-year-old-flees-nyc-for-florida-retirement-haven--finds-predictable-solace-in-age-gap.md";
  slug: "33-year-old-flees-nyc-for-florida-retirement-haven--finds-predictable-solace-in-age-gap";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"37-petty-and-ruthless--i-caught-my-partner-cheating--stories-expose-human-folly.md": {
	id: "37-petty-and-ruthless--i-caught-my-partner-cheating--stories-expose-human-folly.md";
  slug: "37-petty-and-ruthless--i-caught-my-partner-cheating--stories-expose-human-folly";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"49-dead--16-police-stations-flooded--nairobi-realist-s-take-on-another-disaster.md": {
	id: "49-dead--16-police-stations-flooded--nairobi-realist-s-take-on-another-disaster.md";
  slug: "49-dead--16-police-stations-flooded--nairobi-realist-s-take-on-another-disaster";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"5-million-visitors-or-5-million-delusions--kenya-s-new-tourism-wonder-is-just-influencer-bait.md": {
	id: "5-million-visitors-or-5-million-delusions--kenya-s-new-tourism-wonder-is-just-influencer-bait.md";
  slug: "5-million-visitors-or-5-million-delusions--kenya-s-new-tourism-wonder-is-just-influencer-bait";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"55-million-up-in-smoke--why-your-taxes-are-just-a-suggestion.md": {
	id: "55-million-up-in-smoke--why-your-taxes-are-just-a-suggestion.md";
  slug: "55-million-up-in-smoke--why-your-taxes-are-just-a-suggestion";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"64-year-old-divorcee-buys-tiny-home-in-netherlands--claims--affordable-fresh-start--amidst-economic-realities.md": {
	id: "64-year-old-divorcee-buys-tiny-home-in-netherlands--claims--affordable-fresh-start--amidst-economic-realities.md";
  slug: "64-year-old-divorcee-buys-tiny-home-in-netherlands--claims--affordable-fresh-start--amidst-economic-realities";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"64-year-old-retiree-s-divorce-fueled-tiny-home-purchase--a--fresh-start--or-financial-necessity.md": {
	id: "64-year-old-retiree-s-divorce-fueled-tiny-home-purchase--a--fresh-start--or-financial-necessity.md";
  slug: "64-year-old-retiree-s-divorce-fueled-tiny-home-purchase--a--fresh-start--or-financial-necessity";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"66-dead-in-kenya-floods--heavy-rains-continue--nairobi-drowning-in-its-own-mess.md": {
	id: "66-dead-in-kenya-floods--heavy-rains-continue--nairobi-drowning-in-its-own-mess.md";
  slug: "66-dead-in-kenya-floods--heavy-rains-continue--nairobi-drowning-in-its-own-mess";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"7-day-ultimatum--opposition-threatens-protests-over--fuel-scandal.md": {
	id: "7-day-ultimatum--opposition-threatens-protests-over--fuel-scandal.md";
  slug: "7-day-ultimatum--opposition-threatens-protests-over--fuel-scandal";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"August-deadliest-month-in-kenya.md": {
	id: "August-deadliest-month-in-kenya.md";
  slug: "august-deadliest-month-in-kenya";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"BBC-Kenya-Child-Sex-Trafficking-Scandle.md": {
	id: "BBC-Kenya-Child-Sex-Trafficking-Scandle.md";
  slug: "bbc-kenya-child-sex-trafficking-scandle";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Benni-McCarthy.md": {
	id: "Benni-McCarthy.md";
  slug: "benni-mccarthy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Billy-Mwangi.md": {
	id: "Billy-Mwangi.md";
  slug: "billy-mwangi";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"CAT-ticketing-suspended.md": {
	id: "CAT-ticketing-suspended.md";
  slug: "cat-ticketing-suspended";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"CHAN-tickets-Scam.md": {
	id: "CHAN-tickets-Scam.md";
  slug: "chan-tickets-scam";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Cheating-in-relationshios.md": {
	id: "Cheating-in-relationshios.md";
  slug: "cheating-in-relationshios";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"FKF-fined-by-CAF.md": {
	id: "FKF-fined-by-CAF.md";
  slug: "fkf-fined-by-caf";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Gor-mahia-new-signings.md": {
	id: "Gor-mahia-new-signings.md";
  slug: "gor-mahia-new-signings";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"In-the-eyes-of-a-blind-man-andrew.md": {
	id: "In-the-eyes-of-a-blind-man-andrew.md";
  slug: "in-the-eyes-of-a-blind-man-andrew";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Inside-Kenya-online-war-against-activists.md": {
	id: "Inside-Kenya-online-war-against-activists.md";
  slug: "inside-kenya-online-war-against-activists";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Is-Ruto-The-Face-of-CHAN.md": {
	id: "Is-Ruto-The-Face-of-CHAN.md";
  slug: "is-ruto-the-face-of-chan";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Kenya-Vs-Morocco.md": {
	id: "Kenya-Vs-Morocco.md";
  slug: "kenya-vs-morocco";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Kenya-and-Tanzania-knocked-out-of-CHAN2024.md": {
	id: "Kenya-and-Tanzania-knocked-out-of-CHAN2024.md";
  slug: "kenya-and-tanzania-knocked-out-of-chan2024";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Kenya-the-singapore-of-africa.md": {
	id: "Kenya-the-singapore-of-africa.md";
  slug: "ruto-cannot-make-kenya-singapore";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Kenyan-parliament-is-sodom-and-gomorrah.md": {
	id: "Kenyan-parliament-is-sodom-and-gomorrah.md";
  slug: "kenyan-parliament-is-sodom-and-gomorrah";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Kugongewa-Na-Kasongo-1.md": {
	id: "Kugongewa-Na-Kasongo-1.md";
  slug: "kugongewa-na-kasongo-1";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Madam-Esther-chapter-1.md": {
	id: "Madam-Esther-chapter-1.md";
  slug: "madam-esther-chapter-1";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Madam-Wangui-and-her-steamy-affair.md": {
	id: "Madam-Wangui-and-her-steamy-affair.md";
  slug: "madam-wangui-and-her-steamy-affair";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Nairobis-prettiest-gangster.md": {
	id: "Nairobis-prettiest-gangster.md";
  slug: "nairobis-prettiest-gangster";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Raila-odinga-political-betrayal-analysis.md": {
	id: "Raila-odinga-political-betrayal-analysis.md";
  slug: "raila-odinga-political-betrayal-analysis";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Rest-in-peace-mc-fullstop.md": {
	id: "Rest-in-peace-mc-fullstop.md";
  slug: "rest-in-peace-mc-fullstop";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Rutos-strategic-reelection-psyops.md": {
	id: "Rutos-strategic-reelection-psyops.md";
  slug: "rutos-strategic-reelection-psyops";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Samia-suluhu-the-dictator.md": {
	id: "Samia-suluhu-the-dictator.md";
  slug: "samia-suluhu-the-dictator";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Sex-positions-in-chritianity.md": {
	id: "Sex-positions-in-chritianity.md";
  slug: "sex-positions-in-chritianity";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"The-Kenyan-Parlianment-building.md": {
	id: "The-Kenyan-Parlianment-building.md";
  slug: "stone-sentinel-history-kenyan-parliament";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Top-10-richest-Kenyan-OnlyFans-models.md": {
	id: "Top-10-richest-Kenyan-OnlyFans-models.md";
  slug: "richest-kenyan-onlyfans-creators-2025";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Toxic-lyrikali-is-toxic.md": {
	id: "Toxic-lyrikali-is-toxic.md";
  slug: "toxic-lyrikali-is-toxic";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"UK-to-pay-ksh-500-million-to-laikipia-county-residents.md": {
	id: "UK-to-pay-ksh-500-million-to-laikipia-county-residents.md";
  slug: "uk-to-pay-ksh-500-million-to-laikipia-county-residents";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Western-pharmaceuticals-in-kenya.md": {
	id: "Western-pharmaceuticals-in-kenya.md";
  slug: "western-pharmaceuticals-in-kenya";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"\"why-fear-women-culture-is-masking-a-deep-crisis-among-kenyan-men.md": {
	id: "\"why-fear-women-culture-is-masking-a-deep-crisis-among-kenyan-men.md";
  slug: "why-fear-women-culture-is-masking-a-deep-crisis-among-kenyan-men";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"a-dead-kingpin-changes-nothing-in-the-era-of-algorithmic-terror.md": {
	id: "a-dead-kingpin-changes-nothing-in-the-era-of-algorithmic-terror.md";
  slug: "a-dead-kingpin-changes-nothing-in-the-era-of-algorithmic-terror";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"a-death-in-the-lagoon--the-futility-of-taxpayer-funded-marine-tagging.md": {
	id: "a-death-in-the-lagoon--the-futility-of-taxpayer-funded-marine-tagging.md";
  slug: "a-death-in-the-lagoon--the-futility-of-taxpayer-funded-marine-tagging";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"a-guide-to-marriage-certificates.md": {
	id: "a-guide-to-marriage-certificates.md";
  slug: "complete-guide-marriage-certificates-kenya-2026";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"a-nation-of-middlemen-starving-in-the-cold.md": {
	id: "a-nation-of-middlemen-starving-in-the-cold.md";
  slug: "a-nation-of-middlemen-starving-in-the-cold";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"a-plus-eye-dci-revenge--but-miricho-s-chemistry-talk-rings-hollow.md": {
	id: "a-plus-eye-dci-revenge--but-miricho-s-chemistry-talk-rings-hollow.md";
  slug: "a-plus-eye-dci-revenge--but-miricho-s-chemistry-talk-rings-hollow";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"a-selection-of-first-party-nintendo-switch-games-now-on-sale.md": {
	id: "a-selection-of-first-party-nintendo-switch-games-now-on-sale.md";
  slug: "a-selection-of-first-party-nintendo-switch-games-now-on-sale";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"a-south-african-win-and-a-president-s-photo-op--the-green-grass-of-karen-hides-the-brown-reality.md": {
	id: "a-south-african-win-and-a-president-s-photo-op--the-green-grass-of-karen-hides-the-brown-reality.md";
  slug: "a-south-african-win-and-a-president-s-photo-op--the-green-grass-of-karen-hides-the-brown-reality";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"a-stock-market-doom-loop-is-hitting-everything-that-touches-ai.md": {
	id: "a-stock-market-doom-loop-is-hitting-everything-that-touches-ai.md";
  slug: "a-stock-market-doom-loop-is-hitting-everything-that-touches-ai";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"a-two-line-shield--the-royal-family-uses-epstein-victims-to-buy-silence-for-saudi-oil.md": {
	id: "a-two-line-shield--the-royal-family-uses-epstein-victims-to-buy-silence-for-saudi-oil.md";
  slug: "a-two-line-shield--the-royal-family-uses-epstein-victims-to-buy-silence-for-saudi-oil";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"abandoned-baby-monkey-s-ikea-plushie-fetches-hundreds--exposing-human-greed.md": {
	id: "abandoned-baby-monkey-s-ikea-plushie-fetches-hundreds--exposing-human-greed.md";
  slug: "abandoned-baby-monkey-s-ikea-plushie-fetches-hundreds--exposing-human-greed";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"abandoned-baby-monkey-s-ikea-plushie-fuels-ebay-scalpers--exposes-animal-welfare-deficiencies.md": {
	id: "abandoned-baby-monkey-s-ikea-plushie-fuels-ebay-scalpers--exposes-animal-welfare-deficiencies.md";
  slug: "abandoned-baby-monkey-s-ikea-plushie-fuels-ebay-scalpers--exposes-animal-welfare-deficiencies";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"abbas-kubbaf-reveals-kes-10-million-state-payday---streamlinefeed-co-ke.md": {
	id: "abbas-kubbaf-reveals-kes-10-million-state-payday---streamlinefeed-co-ke.md";
  slug: "abbas-kubbaf-reveals-kes-10-million-state-payday---streamlinefeed-co-ke";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"abundantia-entertainment-and-invideo-launch--11-million-ai-driven-film-studio-in-india.md": {
	id: "abundantia-entertainment-and-invideo-launch--11-million-ai-driven-film-studio-in-india.md";
  slug: "abundantia-entertainment-and-invideo-launch--11-million-ai-driven-film-studio-in-india";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ac-milan-confronts-parma-in-pivotal-pursuit-of-serie-a-leaders.md": {
	id: "ac-milan-confronts-parma-in-pivotal-pursuit-of-serie-a-leaders.md";
  slug: "ac-milan-confronts-parma-in-pivotal-pursuit-of-serie-a-leaders";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"addis-appetizers-and-nairobi-funerals--ruto-s-sha-fairy-tale.md": {
	id: "addis-appetizers-and-nairobi-funerals--ruto-s-sha-fairy-tale.md";
  slug: "addis-appetizers-and-nairobi-funerals--ruto-s-sha-fairy-tale";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"afc-leopards-close-gap-on-gor--shabana-wins-again---but-does-anyone-really-care.md": {
	id: "afc-leopards-close-gap-on-gor--shabana-wins-again---but-does-anyone-really-care.md";
  slug: "afc-leopards-close-gap-on-gor--shabana-wins-again---but-does-anyone-really-care";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"afcon-2025-morocco-vs-afcon-2027-east-africa-ambitions.md": {
	id: "afcon-2025-morocco-vs-afcon-2027-east-africa-ambitions.md";
  slug: "afcon-2025-morocco-vs-afcon-2027-east-africa-ambitions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"afcon-2027--a-45-billion-shilling-gold-plated-heist.md": {
	id: "afcon-2027--a-45-billion-shilling-gold-plated-heist.md";
  slug: "afcon-2027--a-45-billion-shilling-gold-plated-heist";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"afcon-2027--kenya-s-stadiums-still-a-joke--caf-says.md": {
	id: "afcon-2027--kenya-s-stadiums-still-a-joke--caf-says.md";
  slug: "afcon-2027--kenya-s-stadiums-still-a-joke--caf-says";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"africa-2026--navigating-the-new-frontiers-of-energy--finance--and-strategic-sovereignty.md": {
	id: "africa-2026--navigating-the-new-frontiers-of-energy--finance--and-strategic-sovereignty.md";
  slug: "africa-2026--navigating-the-new-frontiers-of-energy--finance--and-strategic-sovereignty";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"africa-countries-eye-united-digital-strategy--another-talk-shop.md": {
	id: "africa-countries-eye-united-digital-strategy--another-talk-shop.md";
  slug: "africa-countries-eye-united-digital-strategy--another-talk-shop";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"africa-jet-fuel-costs-skyrocket---your-flights-are-about-to-get-even-more-expensive.md": {
	id: "africa-jet-fuel-costs-skyrocket---your-flights-are-about-to-get-even-more-expensive.md";
  slug: "africa-jet-fuel-costs-skyrocket---your-flights-are-about-to-get-even-more-expensive";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"africa-s-desperate-oil-scramble--hormuz-closure-means-pain.md": {
	id: "africa-s-desperate-oil-scramble--hormuz-closure-means-pain.md";
  slug: "africa-s-desperate-oil-scramble--hormuz-closure-means-pain";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"africa-s-trade-order-needs-a-real-shakeup-as-global-chaos-mounts-despite-agoa-extension.md": {
	id: "africa-s-trade-order-needs-a-real-shakeup-as-global-chaos-mounts-despite-agoa-extension.md";
  slug: "africa-s-trade-order-needs-a-real-shakeup-as-global-chaos-mounts-despite-agoa-extension";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"african-giant-or-corporate-puppet--the-messy-war-for-burna-boy-s-soul.md": {
	id: "african-giant-or-corporate-puppet--the-messy-war-for-burna-boy-s-soul.md";
  slug: "african-giant-or-corporate-puppet--the-messy-war-for-burna-boy-s-soul";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"african-legend-backs-yamal-amidst-racism-fiasco.md": {
	id: "african-legend-backs-yamal-amidst-racism-fiasco.md";
  slug: "african-legend-backs-yamal-amidst-racism-fiasco";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"african-maritime-leaders-urged-to-support-global-shipping-emissions-rule.md": {
	id: "african-maritime-leaders-urged-to-support-global-shipping-emissions-rule.md";
  slug: "african-maritime-leaders-urged-to-support-global-shipping-emissions-rule";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"african-soccer-announces-reforms-amid-afcon-title-scandal---thescore-com.md": {
	id: "african-soccer-announces-reforms-amid-afcon-title-scandal---thescore-com.md";
  slug: "african-soccer-announces-reforms-amid-afcon-title-scandal---thescore-com";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"afrobeats--global-takeover--is-it-culture-or-just-a-very-expensive-marketing-campaign.md": {
	id: "afrobeats--global-takeover--is-it-culture-or-just-a-very-expensive-marketing-campaign.md";
  slug: "afrobeats--global-takeover--is-it-culture-or-just-a-very-expensive-marketing-campaign";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ai-agents-are-now-running-the-back-office-at-insurance-giants.md": {
	id: "ai-agents-are-now-running-the-back-office-at-insurance-giants.md";
  slug: "ai-agents-are-now-running-the-back-office-at-insurance-giants";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ai-cameras-and-first-world-dreams--murkomen-s-latest-nairobi-fairy-tale.md": {
	id: "ai-cameras-and-first-world-dreams--murkomen-s-latest-nairobi-fairy-tale.md";
  slug: "ai-cameras-and-first-world-dreams--murkomen-s-latest-nairobi-fairy-tale";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ai-chatbots-manipulated-in-minutes--a-new-threat-to-information-accuracy.md": {
	id: "ai-chatbots-manipulated-in-minutes--a-new-threat-to-information-accuracy.md";
  slug: "ai-chatbots-manipulated-in-minutes--a-new-threat-to-information-accuracy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ai-fuels-teen-slander-pages-targeting-teachers-with-baseless-mockery.md": {
	id: "ai-fuels-teen-slander-pages-targeting-teachers-with-baseless-mockery.md";
  slug: "ai-fuels-teen-slander-pages-targeting-teachers-with-baseless-mockery";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ai-giants-invest-heavily-in-super-bowl-60-advertisements.md": {
	id: "ai-giants-invest-heavily-in-super-bowl-60-advertisements.md";
  slug: "ai-giants-invest-heavily-in-super-bowl-60-advertisements";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ai-integration-and-data-privacy-standards-redefine-sports-media-distribution.md": {
	id: "ai-integration-and-data-privacy-standards-redefine-sports-media-distribution.md";
  slug: "ai-integration-and-data-privacy-standards-redefine-sports-media-distribution";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ai-layoffs--most--at-risk--workers-are-just-better-at-playing-the-game.md": {
	id: "ai-layoffs--most--at-risk--workers-are-just-better-at-playing-the-game.md";
  slug: "ai-layoffs--most--at-risk--workers-are-just-better-at-playing-the-game";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ai-layoffs--the--well-positioned--workers-are-still-expendable.md": {
	id: "ai-layoffs--the--well-positioned--workers-are-still-expendable.md";
  slug: "ai-layoffs--the--well-positioned--workers-are-still-expendable";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ai-political-resistance-meeting-reveals-predictable-power-grabs-under-guise-of-humanity.md": {
	id: "ai-political-resistance-meeting-reveals-predictable-power-grabs-under-guise-of-humanity.md";
  slug: "ai-political-resistance-meeting-reveals-predictable-power-grabs-under-guise-of-humanity";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ai-slander-pages--teens-weaponize-deepfakes-to-demolish-teacher-reputations.md": {
	id: "ai-slander-pages--teens-weaponize-deepfakes-to-demolish-teacher-reputations.md";
  slug: "ai-slander-pages--teens-weaponize-deepfakes-to-demolish-teacher-reputations";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ai-tools-effortlessly-unmasking-anonymous-accounts--the-end-of-online-privacy.md": {
	id: "ai-tools-effortlessly-unmasking-anonymous-accounts--the-end-of-online-privacy.md";
  slug: "ai-tools-effortlessly-unmasking-anonymous-accounts--the-end-of-online-privacy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ai-tools-expose-anonymous-accounts--privacy-s-funeral-bell-rings-louder.md": {
	id: "ai-tools-expose-anonymous-accounts--privacy-s-funeral-bell-rings-louder.md";
  slug: "ai-tools-expose-anonymous-accounts--privacy-s-funeral-bell-rings-louder";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ai-tools-now-capable-of-unmasking-anonymous-accounts--exposing-digital-cowards.md": {
	id: "ai-tools-now-capable-of-unmasking-anonymous-accounts--exposing-digital-cowards.md";
  slug: "ai-tools-now-capable-of-unmasking-anonymous-accounts--exposing-digital-cowards";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ai-wedding-pics-fool-many--zendaya-reveals-public-s-gullibility.md": {
	id: "ai-wedding-pics-fool-many--zendaya-reveals-public-s-gullibility.md";
  slug: "ai-wedding-pics-fool-many--zendaya-reveals-public-s-gullibility";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"aidin-caye-s-unreleased-hustle--veteran-dj-or-just-another-nasrec-dust-kicker.md": {
	id: "aidin-caye-s-unreleased-hustle--veteran-dj-or-just-another-nasrec-dust-kicker.md";
  slug: "aidin-caye-s-unreleased-hustle--veteran-dj-or-just-another-nasrec-dust-kicker";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"airbnb-brothel-crisis-nairobi-short-term-rentals-koinange.md": {
	id: "airbnb-brothel-crisis-nairobi-short-term-rentals-koinange.md";
  slug: "airbnb-brothel-crisis-nairobi-short-term-rentals-koinange";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"airline-bans-two--disruptive--passengers-for-life-after-mid-air-brawl-diverts-flight.md": {
	id: "airline-bans-two--disruptive--passengers-for-life-after-mid-air-brawl-diverts-flight.md";
  slug: "airline-bans-two--disruptive--passengers-for-life-after-mid-air-brawl-diverts-flight";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"aiu-doping-fight-gets--anonymous--tools--more-theatre-than-truth.md": {
	id: "aiu-doping-fight-gets--anonymous--tools--more-theatre-than-truth.md";
  slug: "aiu-doping-fight-gets--anonymous--tools--more-theatre-than-truth";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"al-sisi-nods-about-nile-water-with-ruto--because-everyone-wants-their-slice.md": {
	id: "al-sisi-nods-about-nile-water-with-ruto--because-everyone-wants-their-slice.md";
  slug: "al-sisi-nods-about-nile-water-with-ruto--because-everyone-wants-their-slice";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"algorithmic-media-and-biometric-analytics--the-tech-infrastructure-behind-premier-league-volatility.md": {
	id: "algorithmic-media-and-biometric-analytics--the-tech-infrastructure-behind-premier-league-volatility.md";
  slug: "algorithmic-media-and-biometric-analytics--the-tech-infrastructure-behind-premier-league-volatility";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"allen-kagina-s--ordinary-girl--rebrand-is-the-corporate-version-of-a-pop-star-s-humble-era.md": {
	id: "allen-kagina-s--ordinary-girl--rebrand-is-the-corporate-version-of-a-pop-star-s-humble-era.md";
  slug: "allen-kagina-s--ordinary-girl--rebrand-is-the-corporate-version-of-a-pop-star-s-humble-era";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"alphabet-sells-rare-100-year-bond-to-fund-ai-expansion.md": {
	id: "alphabet-sells-rare-100-year-bond-to-fund-ai-expansion.md";
  slug: "alphabet-sells-rare-100-year-bond-to-fund-ai-expansion";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"amapiano-s-death-rattle-or-just-a-mid-life-crisis--the-ego-battle-behind-the-log-drums.md": {
	id: "amapiano-s-death-rattle-or-just-a-mid-life-crisis--the-ego-battle-behind-the-log-drums.md";
  slug: "amapiano-s-death-rattle-or-just-a-mid-life-crisis--the-ego-battle-behind-the-log-drums";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"amazon-buys-oprah-winfrey-s-podcast---another-celebrity-cash-grab.md": {
	id: "amazon-buys-oprah-winfrey-s-podcast---another-celebrity-cash-grab.md";
  slug: "amazon-buys-oprah-winfrey-s-podcast---another-celebrity-cash-grab";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"amazon-s-presidents--day-sale-goes-live--unlocking-significant-savings-across-key-categories.md": {
	id: "amazon-s-presidents--day-sale-goes-live--unlocking-significant-savings-across-key-categories.md";
  slug: "amazon-s-presidents--day-sale-goes-live--unlocking-significant-savings-across-key-categories";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"amber-glenn-receives-widespread-support-following-criticism-of-trump-administration-lgbtq--policies.md": {
	id: "amber-glenn-receives-widespread-support-following-criticism-of-trump-administration-lgbtq--policies.md";
  slug: "amber-glenn-receives-widespread-support-following-criticism-of-trump-administration-lgbtq--policies";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"amd-signals-readiness-for-2027-next-generation-xbox-launch.md": {
	id: "amd-signals-readiness-for-2027-next-generation-xbox-launch.md";
  slug: "amd-signals-readiness-for-2027-next-generation-xbox-launch";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"american-consumers-burn-on-the-altar-of-global-energy-dominance.md": {
	id: "american-consumers-burn-on-the-altar-of-global-energy-dominance.md";
  slug: "american-consumers-burn-on-the-altar-of-global-energy-dominance";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"amnesty-kenya-s-public-safety-advisory-to-police--another-day--another-protest-over-fuel-prices.md": {
	id: "amnesty-kenya-s-public-safety-advisory-to-police--another-day--another-protest-over-fuel-prices.md";
  slug: "amnesty-kenya-s-public-safety-advisory-to-police--another-day--another-protest-over-fuel-prices";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"an-update-on-recent-exploits-and-corrective-actions-in-arc-raiders.md": {
	id: "an-update-on-recent-exploits-and-corrective-actions-in-arc-raiders.md";
  slug: "an-update-on-recent-exploits-and-corrective-actions-in-arc-raiders";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"android-17-release-schedule-accelerates--targets-june-2026-stable-launch.md": {
	id: "android-17-release-schedule-accelerates--targets-june-2026-stable-launch.md";
  slug: "android-17-release-schedule-accelerates--targets-june-2026-stable-launch";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"anker-s-x1-pro--a-home-theater-that-shouldn-t-exist--yet-impresses.md": {
	id: "anker-s-x1-pro--a-home-theater-that-shouldn-t-exist--yet-impresses.md";
  slug: "anker-s-x1-pro--a-home-theater-that-shouldn-t-exist--yet-impresses";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"anna-murdoch-mann--strategic-force-and-matriarch-of-media-dynasty--dies-at-81.md": {
	id: "anna-murdoch-mann--strategic-force-and-matriarch-of-media-dynasty--dies-at-81.md";
  slug: "anna-murdoch-mann--strategic-force-and-matriarch-of-media-dynasty--dies-at-81";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"another-contingent-of-police-officers-arrive-in-kenya-as-haiti-mission-wraps-up--for-now.md": {
	id: "another-contingent-of-police-officers-arrive-in-kenya-as-haiti-mission-wraps-up--for-now.md";
  slug: "another-contingent-of-police-officers-arrive-in-kenya-as-haiti-mission-wraps-up--for-now";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"another-day--another-billion-shilling-heist-put-on-ice.md": {
	id: "another-day--another-billion-shilling-heist-put-on-ice.md";
  slug: "another-day--another-billion-shilling-heist-put-on-ice";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"another-paper-shield-for-a-leaking-roof--the-sacco-reform-scam.md": {
	id: "another-paper-shield-for-a-leaking-roof--the-sacco-reform-scam.md";
  slug: "another-paper-shield-for-a-leaking-roof--the-sacco-reform-scam";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"another-racism-scandal--spanish-club-chairman-harasses-his-muslim-players-with-pork.md": {
	id: "another-racism-scandal--spanish-club-chairman-harasses-his-muslim-players-with-pork.md";
  slug: "another-racism-scandal--spanish-club-chairman-harasses-his-muslim-players-with-pork";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"another-round-of-tea-and-tired-buzzwords-for-kenya-s-disenfranchised-youth.md": {
	id: "another-round-of-tea-and-tired-buzzwords-for-kenya-s-disenfranchised-youth.md";
  slug: "another-round-of-tea-and-tired-buzzwords-for-kenya-s-disenfranchised-youth";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"another-whatsapp-hit--da-moon-and-blaq-major-ride-the--mjolo--trauma-train.md": {
	id: "another-whatsapp-hit--da-moon-and-blaq-major-ride-the--mjolo--trauma-train.md";
  slug: "another-whatsapp-hit--da-moon-and-blaq-major-ride-the--mjolo--trauma-train";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ant-and-dec-court-order-reveals-intermediary-s-suspected--secret-profits--in-banksy-deals.md": {
	id: "ant-and-dec-court-order-reveals-intermediary-s-suspected--secret-profits--in-banksy-deals.md";
  slug: "ant-and-dec-court-order-reveals-intermediary-s-suspected--secret-profits--in-banksy-deals";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ant-and-dec-trail--secret-profits--in-banksy-deals-via-court-order.md": {
	id: "ant-and-dec-trail--secret-profits--in-banksy-deals-via-court-order.md";
  slug: "ant-and-dec-trail--secret-profits--in-banksy-deals-via-court-order";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"antarctic--danger-zone--expedition-stumbles-upon-another-uncharted-island--proving-global-mapping-still-lacks-basic-awareness.md": {
	id: "antarctic--danger-zone--expedition-stumbles-upon-another-uncharted-island--proving-global-mapping-still-lacks-basic-awareness.md";
  slug: "antarctic--danger-zone--expedition-stumbles-upon-another-uncharted-island--proving-global-mapping-still-lacks-basic-awareness";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"antarctic--danger-zone--expedition-stumbles-upon-yet-another-uncharted-island--proving-global-maps-remain-incomplete.md": {
	id: "antarctic--danger-zone--expedition-stumbles-upon-yet-another-uncharted-island--proving-global-maps-remain-incomplete.md";
  slug: "antarctic--danger-zone--expedition-stumbles-upon-yet-another-uncharted-island--proving-global-maps-remain-incomplete";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"antarctica-s--blood-falls--mystery-solved---a-gush-of-salty-iron--not-algae.md": {
	id: "antarctica-s--blood-falls--mystery-solved---a-gush-of-salty-iron--not-algae.md";
  slug: "antarctica-s--blood-falls--mystery-solved---a-gush-of-salty-iron--not-algae";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"antarctica-s--blood-falls--mystery-solved--another-pointless-scientific-distraction.md": {
	id: "antarctica-s--blood-falls--mystery-solved--another-pointless-scientific-distraction.md";
  slug: "antarctica-s--blood-falls--mystery-solved--another-pointless-scientific-distraction";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"anthropic-s--scarily-powerful--new-model--a-manufactured-crisis-for-profit.md": {
	id: "anthropic-s--scarily-powerful--new-model--a-manufactured-crisis-for-profit.md";
  slug: "anthropic-s--scarily-powerful--new-model--a-manufactured-crisis-for-profit";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"appeals-court-shields-ruto-s-21-advisers-from-removal--again.md": {
	id: "appeals-court-shields-ruto-s-21-advisers-from-removal--again.md";
  slug: "appeals-court-shields-ruto-s-21-advisers-from-removal--again";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"apple-presidents--day-sales-feature-apple-watch-series-11-at--299--alongside-other-device-discounts.md": {
	id: "apple-presidents--day-sales-feature-apple-watch-series-11-at--299--alongside-other-device-discounts.md";
  slug: "apple-presidents--day-sales-feature-apple-watch-series-11-at--299--alongside-other-device-discounts";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"apple-s-privacy-branding-is-a-cloak-for-global-predatory-networks.md": {
	id: "apple-s-privacy-branding-is-a-cloak-for-global-predatory-networks.md";
  slug: "apple-s-privacy-branding-is-a-cloak-for-global-predatory-networks";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"apple-s-privacy-shield--a-high-tech-fortress-for-the-indefensible.md": {
	id: "apple-s-privacy-shield--a-high-tech-fortress-for-the-indefensible.md";
  slug: "apple-s-privacy-shield--a-high-tech-fortress-for-the-indefensible";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"apple-updates-phone-app-in-ios-26-with-call-screening.md": {
	id: "apple-updates-phone-app-in-ios-26-with-call-screening.md";
  slug: "apple-updates-phone-app-in-ios-26-with-call-screening";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"armed-gang-raids-kikuyu-liquor-store-in-brutal-ksh-500-000-heist.md": {
	id: "armed-gang-raids-kikuyu-liquor-store-in-brutal-ksh-500-000-heist.md";
  slug: "armed-gang-raids-kikuyu-liquor-store-in-brutal-ksh-500-000-heist";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"arrest-now--invent-the-crime-later--the-mwabili-mwagodi-special.md": {
	id: "arrest-now--invent-the-crime-later--the-mwabili-mwagodi-special.md";
  slug: "arrest-now--invent-the-crime-later--the-mwabili-mwagodi-special";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"arsenal-s-pursuit-of-julian-alvarez-triggers-defensive-contract-maneuvers-at-atletico-madrid.md": {
	id: "arsenal-s-pursuit-of-julian-alvarez-triggers-defensive-contract-maneuvers-at-atletico-madrid.md";
  slug: "arsenal-s-pursuit-of-julian-alvarez-triggers-defensive-contract-maneuvers-at-atletico-madrid";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"arteta-defends-arsenal-resilience-as-title-race-intensifies.md": {
	id: "arteta-defends-arsenal-resilience-as-title-race-intensifies.md";
  slug: "arteta-defends-arsenal-resilience-as-title-race-intensifies";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"arusha-s-high-stakes-begging-bowl--why-the-eac-is-a-house-of-cards.md": {
	id: "arusha-s-high-stakes-begging-bowl--why-the-eac-is-a-house-of-cards.md";
  slug: "arusha-s-high-stakes-begging-bowl--why-the-eac-is-a-house-of-cards";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"asia-stocks-climb-as-tech-recoups-some-ai-fueled-losses.md": {
	id: "asia-stocks-climb-as-tech-recoups-some-ai-fueled-losses.md";
  slug: "asia-stocks-climb-as-tech-recoups-some-ai-fueled-losses";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"at-33--she-moved-from-new-york-to-a-florida-island-of-retirees--found-a-divorce-support-system.md": {
	id: "at-33--she-moved-from-new-york-to-a-florida-island-of-retirees--found-a-divorce-support-system.md";
  slug: "at-33--she-moved-from-new-york-to-a-florida-island-of-retirees--found-a-divorce-support-system";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"at-risk-workers--well-positioned--for-ai-layoffs--a-study-in-delusion.md": {
	id: "at-risk-workers--well-positioned--for-ai-layoffs--a-study-in-delusion.md";
  slug: "at-risk-workers--well-positioned--for-ai-layoffs--a-study-in-delusion";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"at-un-security-council--kenya--again--defends-its-police-deployed-to-haiti.md": {
	id: "at-un-security-council--kenya--again--defends-its-police-deployed-to-haiti.md";
  slug: "at-un-security-council--kenya--again--defends-its-police-deployed-to-haiti";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"atwoli-whines-to-ruto--ban-rallies-till-campaigns-officially-start--or-else.md": {
	id: "atwoli-whines-to-ruto--ban-rallies-till-campaigns-officially-start--or-else.md";
  slug: "atwoli-whines-to-ruto--ban-rallies-till-campaigns-officially-start--or-else";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"au-s-new-foreign-policy--five-suits-and-a-pdf-won-t-save-us.md": {
	id: "au-s-new-foreign-policy--five-suits-and-a-pdf-won-t-save-us.md";
  slug: "au-s-new-foreign-policy--five-suits-and-a-pdf-won-t-save-us";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"australia-chokes-on-commodity-dust-as-the-opec-mirage-evaporates.md": {
	id: "australia-chokes-on-commodity-dust-as-the-opec-mirage-evaporates.md";
  slug: "australia-chokes-on-commodity-dust-as-the-opec-mirage-evaporates";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"australian-sunscreen-regulator-proposes--reforms--after-exposing-its-own-incompetence-in-product-scandal.md": {
	id: "australian-sunscreen-regulator-proposes--reforms--after-exposing-its-own-incompetence-in-product-scandal.md";
  slug: "australian-sunscreen-regulator-proposes--reforms--after-exposing-its-own-incompetence-in-product-scandal";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"australian-sunscreen-regulator-proposes-rules-after-scandals-expose-faulty-products.md": {
	id: "australian-sunscreen-regulator-proposes-rules-after-scandals-expose-faulty-products.md";
  slug: "australian-sunscreen-regulator-proposes-rules-after-scandals-expose-faulty-products";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"australian-sunscreen-regulator-s--shakeup--is-a-band-aid-on-a-bullet-wound-after-product-scandal.md": {
	id: "australian-sunscreen-regulator-s--shakeup--is-a-band-aid-on-a-bullet-wound-after-product-scandal.md";
  slug: "australian-sunscreen-regulator-s--shakeup--is-a-band-aid-on-a-bullet-wound-after-product-scandal";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"avast-premium--the--smart--cheap-antivirus-is-still-a-compromise.md": {
	id: "avast-premium--the--smart--cheap-antivirus-is-still-a-compromise.md";
  slug: "avast-premium--the--smart--cheap-antivirus-is-still-a-compromise";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"avast-premium--the--smartest--cheap-antivirus-for-suckers-who-don-t-know-better.md": {
	id: "avast-premium--the--smartest--cheap-antivirus-for-suckers-who-don-t-know-better.md";
  slug: "avast-premium--the--smartest--cheap-antivirus-for-suckers-who-don-t-know-better";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"avast-premium--the--smartest--cheap-antivirus-is-just-another-compromise.md": {
	id: "avast-premium--the--smartest--cheap-antivirus-is-just-another-compromise.md";
  slug: "avast-premium--the--smartest--cheap-antivirus-is-just-another-compromise";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"awinja-s-so-called--stunner--gown-at-king-kaka-s-launch--another-night--another-outfit.md": {
	id: "awinja-s-so-called--stunner--gown-at-king-kaka-s-launch--another-night--another-outfit.md";
  slug: "awinja-s-so-called--stunner--gown-at-king-kaka-s-launch--another-night--another-outfit";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"azeezah-hashim-says-she-s-19---you-want-to-argue-with-my-mother.md": {
	id: "azeezah-hashim-says-she-s-19---you-want-to-argue-with-my-mother.md";
  slug: "azeezah-hashim-says-she-s-19---you-want-to-argue-with-my-mother";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"baba-is-gone-and-the-vultures-are-having-a-field-day.md": {
	id: "baba-is-gone-and-the-vultures-are-having-a-field-day.md";
  slug: "baba-is-gone-and-the-vultures-are-having-a-field-day";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"backrooms--trailer-drains-hope-with-predictable-endless-dread.md": {
	id: "backrooms--trailer-drains-hope-with-predictable-endless-dread.md";
  slug: "backrooms--trailer-drains-hope-with-predictable-endless-dread";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"backrooms--trailer-offers-just-more-endless--pointless-dread.md": {
	id: "backrooms--trailer-offers-just-more-endless--pointless-dread.md";
  slug: "backrooms--trailer-offers-just-more-endless--pointless-dread";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bad-gal--bad-neighborhood--rihanna-s-beverly-hills-fortress-proves-even-billions-can-t-buy-real-peace.md": {
	id: "bad-gal--bad-neighborhood--rihanna-s-beverly-hills-fortress-proves-even-billions-can-t-buy-real-peace.md";
  slug: "bad-gal--bad-neighborhood--rihanna-s-beverly-hills-fortress-proves-even-billions-can-t-buy-real-peace";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"baggage-blues-and-bollywood-busts--kq-s-mumbai-meltdown.md": {
	id: "baggage-blues-and-bollywood-busts--kq-s-mumbai-meltdown.md";
  slug: "baggage-blues-and-bollywood-busts--kq-s-mumbai-meltdown";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bahati-s-dna-drama--when-being-an-orphan-is-your-only-profitable-brand.md": {
	id: "bahati-s-dna-drama--when-being-an-orphan-is-your-only-profitable-brand.md";
  slug: "bahati-s-dna-drama--when-being-an-orphan-is-your-only-profitable-brand";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"banned-for-life--the-mls--stars--who-traded-their-careers-for-a-yellow-card-and-a-quick-buck.md": {
	id: "banned-for-life--the-mls--stars--who-traded-their-careers-for-a-yellow-card-and-a-quick-buck.md";
  slug: "banned-for-life--the-mls--stars--who-traded-their-careers-for-a-yellow-card-and-a-quick-buck";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"barcelona-navigates-fiscal-constraints-in-strategic-pursuit-of-juli-n--lvarez.md": {
	id: "barcelona-navigates-fiscal-constraints-in-strategic-pursuit-of-juli-n--lvarez.md";
  slug: "barcelona-navigates-fiscal-constraints-in-strategic-pursuit-of-juli-n--lvarez";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bash-luks--the--multidimensional--rebrand-or-just-another-artist-doing-too-much.md": {
	id: "bash-luks--the--multidimensional--rebrand-or-just-another-artist-doing-too-much.md";
  slug: "bash-luks--the--multidimensional--rebrand-or-just-another-artist-doing-too-much";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"basketball-s-bureaucratic-decay.md": {
	id: "basketball-s-bureaucratic-decay.md";
  slug: "basketball-s-bureaucratic-decay";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bb-bread-vs--kenya-police--another-cup-dream--same-old-nairobi-grime.md": {
	id: "bb-bread-vs--kenya-police--another-cup-dream--same-old-nairobi-grime.md";
  slug: "bb-bread-vs--kenya-police--another-cup-dream--same-old-nairobi-grime";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"be-mi-s-political-pivot--from-master-s-degrees-to-reality-tv-rejection.md": {
	id: "be-mi-s-political-pivot--from-master-s-degrees-to-reality-tv-rejection.md";
  slug: "be-mi-s-political-pivot--from-master-s-degrees-to-reality-tv-rejection";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"beef--season-2-returns-to-netflix--more-resentment-and-insecurity-on-the-horizon.md": {
	id: "beef--season-2-returns-to-netflix--more-resentment-and-insecurity-on-the-horizon.md";
  slug: "beef--season-2-returns-to-netflix--more-resentment-and-insecurity-on-the-horizon";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"beef--when-to-watch-season-2-on-netflix.md": {
	id: "beef--when-to-watch-season-2-on-netflix.md";
  slug: "beef--when-to-watch-season-2-on-netflix";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"beijing-s-currency-dreams-drown-in-crude-oil.md": {
	id: "beijing-s-currency-dreams-drown-in-crude-oil.md";
  slug: "beijing-s-currency-dreams-drown-in-crude-oil";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"beijing-s-currency-gamble-falters-under-global-fire.md": {
	id: "beijing-s-currency-gamble-falters-under-global-fire.md";
  slug: "beijing-s-currency-gamble-falters-under-global-fire";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"benni-mccarthy--harambee-stars-showed-character--lost-anyway.md": {
	id: "benni-mccarthy--harambee-stars-showed-character--lost-anyway.md";
  slug: "benni-mccarthy--harambee-stars-showed-character--lost-anyway";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"berlinale-s-identity-crisis--hypocrisy--lip-locks--and-hollywood-paydays.md": {
	id: "berlinale-s-identity-crisis--hypocrisy--lip-locks--and-hollywood-paydays.md";
  slug: "berlinale-s-identity-crisis--hypocrisy--lip-locks--and-hollywood-paydays";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bernard-kibet-koech-receives-four-year-doping-ban.md": {
	id: "bernard-kibet-koech-receives-four-year-doping-ban.md";
  slug: "bernard-kibet-koech-receives-four-year-doping-ban";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"beth-rigby--you-know-me-best-as-sky-s-political-editor---my-job-at-home-might-be-even-harder.md": {
	id: "beth-rigby--you-know-me-best-as-sky-s-political-editor---my-job-at-home-might-be-even-harder.md";
  slug: "beth-rigby--you-know-me-best-as-sky-s-political-editor---my-job-at-home-might-be-even-harder";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"better-late-than-never--anna-camp-s-mid-life--evolution--is-the-ultimate-rebrand.md": {
	id: "better-late-than-never--anna-camp-s-mid-life--evolution--is-the-ultimate-rebrand.md";
  slug: "better-late-than-never--anna-camp-s-mid-life--evolution--is-the-ultimate-rebrand";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"beyond-the-gates--melinda-french-gates-and-the-price-of-private-betrayal.md": {
	id: "beyond-the-gates--melinda-french-gates-and-the-price-of-private-betrayal.md";
  slug: "beyond-the-gates--melinda-french-gates-and-the-price-of-private-betrayal";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bgt-s-desperate-thirst-for-ratings-features-tanzanian-abs-and-simon-cowell-s-faux-awe.md": {
	id: "bgt-s-desperate-thirst-for-ratings-features-tanzanian-abs-and-simon-cowell-s-faux-awe.md";
  slug: "bgt-s-desperate-thirst-for-ratings-features-tanzanian-abs-and-simon-cowell-s-faux-awe";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"big-balls--coristine-now-aiding-fraud-videos--tying-government-data-to-right-wing-narrative.md": {
	id: "big-balls--coristine-now-aiding-fraud-videos--tying-government-data-to-right-wing-narrative.md";
  slug: "big-balls--coristine-now-aiding-fraud-videos--tying-government-data-to-right-wing-narrative";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"big-tech-stocks-lose-1-trillion-amid-ai-spending-concerns.md": {
	id: "big-tech-stocks-lose-1-trillion-amid-ai-spending-concerns.md";
  slug: "big-tech-stocks-lose-1-trillion-amid-ai-spending-concerns";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bill-and-hillary-clinton-s--enduring--marriage--a-calculated-alliance-forged-in-ambition-and-scandal.md": {
	id: "bill-and-hillary-clinton-s--enduring--marriage--a-calculated-alliance-forged-in-ambition-and-scandal.md";
  slug: "bill-and-hillary-clinton-s--enduring--marriage--a-calculated-alliance-forged-in-ambition-and-scandal";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"billboard-s-colonizer-energy--rema-is-not-your-charity-case.md": {
	id: "billboard-s-colonizer-energy--rema-is-not-your-charity-case.md";
  slug: "billboard-s-colonizer-energy--rema-is-not-your-charity-case";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"billion-dollar-brands-prefer-landfills-over-human-compassion.md": {
	id: "billion-dollar-brands-prefer-landfills-over-human-compassion.md";
  slug: "billion-dollar-brands-prefer-landfills-over-human-compassion";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"billion-shilling-bad-fuel-scandal-gets-another-twist.md": {
	id: "billion-shilling-bad-fuel-scandal-gets-another-twist.md";
  slug: "billion-shilling-bad-fuel-scandal-gets-another-twist";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"billion-shilling-badges--the-high-cost-of-police--prosperity.md": {
	id: "billion-shilling-badges--the-high-cost-of-police--prosperity.md";
  slug: "billion-shilling-badges--the-high-cost-of-police--prosperity";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"billion-shilling-zombies--why-the-og-scammers-put-your-favorite-influencers-to-shame.md": {
	id: "billion-shilling-zombies--why-the-og-scammers-put-your-favorite-influencers-to-shame.md";
  slug: "billion-shilling-zombies--why-the-og-scammers-put-your-favorite-influencers-to-shame";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"billionaire-besties-or-brazen-bagmen--the-adani-family-s--3-billion-secret-inner-circle-exposed.md": {
	id: "billionaire-besties-or-brazen-bagmen--the-adani-family-s--3-billion-secret-inner-circle-exposed.md";
  slug: "billionaire-besties-or-brazen-bagmen--the-adani-family-s--3-billion-secret-inner-circle-exposed";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"billionaire-billionaire-billionaire--tanzanian-tycoon-snags-kenya-s-biggest-press--president-s-pocket-reportedly-involved.md": {
	id: "billionaire-billionaire-billionaire--tanzanian-tycoon-snags-kenya-s-biggest-press--president-s-pocket-reportedly-involved.md";
  slug: "billionaire-billionaire-billionaire--tanzanian-tycoon-snags-kenya-s-biggest-press--president-s-pocket-reportedly-involved";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"billionaire-blues-and-blind-ambition--the-ruparelia-pr-machine-hits-bukedea.md": {
	id: "billionaire-blues-and-blind-ambition--the-ruparelia-pr-machine-hits-bukedea.md";
  slug: "billionaire-blues-and-blind-ambition--the-ruparelia-pr-machine-hits-bukedea";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"billionaire-boys-club-and-the-desperate-housewives-of-government.md": {
	id: "billionaire-boys-club-and-the-desperate-housewives-of-government.md";
  slug: "billionaire-boys-club-and-the-desperate-housewives-of-government";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"billionaire-saviors-and-baby-bribes--why-2026-is-the-year-of-brain-rot-drama.md": {
	id: "billionaire-saviors-and-baby-bribes--why-2026-is-the-year-of-brain-rot-drama.md";
  slug: "billionaire-saviors-and-baby-bribes--why-2026-is-the-year-of-brain-rot-drama";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"billions-down-the-drain--these--travel-agents--are-robbing-you-blind--honey.md": {
	id: "billions-down-the-drain--these--travel-agents--are-robbing-you-blind--honey.md";
  slug: "billions-down-the-drain--these--travel-agents--are-robbing-you-blind--honey";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"billions-siphoned--energy-bosses-nabbed--nairobi-s-oil-smokescreen-lifts.md": {
	id: "billions-siphoned--energy-bosses-nabbed--nairobi-s-oil-smokescreen-lifts.md";
  slug: "billions-siphoned--energy-bosses-nabbed--nairobi-s-oil-smokescreen-lifts";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bio-mining--the-new-frontier-for-corporate-plunder-and-biological-contamination.md": {
	id: "bio-mining--the-new-frontier-for-corporate-plunder-and-biological-contamination.md";
  slug: "bio-mining--the-new-frontier-for-corporate-plunder-and-biological-contamination";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"birthday-cake-and-handcuffs--the-fall-of-the-duke-of-disgrace.md": {
	id: "birthday-cake-and-handcuffs--the-fall-of-the-duke-of-disgrace.md";
  slug: "birthday-cake-and-handcuffs--the-fall-of-the-duke-of-disgrace";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bishop-auckland-mystery-baby-s-funeral--a-cynical-farewell-to-the-unexplained.md": {
	id: "bishop-auckland-mystery-baby-s-funeral--a-cynical-farewell-to-the-unexplained.md";
  slug: "bishop-auckland-mystery-baby-s-funeral--a-cynical-farewell-to-the-unexplained";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bitcoin-faces-identity-crisis-as-institutional-capital-migrates-to-traditional-havens.md": {
	id: "bitcoin-faces-identity-crisis-as-institutional-capital-migrates-to-traditional-havens.md";
  slug: "bitcoin-faces-identity-crisis-as-institutional-capital-migrates-to-traditional-havens";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bitcoin-falls-below-70-000-to-wipe-out-trump-rally.md": {
	id: "bitcoin-falls-below-70-000-to-wipe-out-trump-rally.md";
  slug: "bitcoin-falls-below-70-000-to-wipe-out-trump-rally";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bitcoin-market-enters-extended-consolidation-as-speculative-excess-recedes.md": {
	id: "bitcoin-market-enters-extended-consolidation-as-speculative-excess-recedes.md";
  slug: "bitcoin-market-enters-extended-consolidation-as-speculative-excess-recedes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bitcoin-price-declines-to-69-101-during-asian-trading-hours.md": {
	id: "bitcoin-price-declines-to-69-101-during-asian-trading-hours.md";
  slug: "bitcoin-price-declines-to-69-101-during-asian-trading-hours";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bitcoin-remains-a-fragile-puppet-of-the-global-energy-cartel.md": {
	id: "bitcoin-remains-a-fragile-puppet-of-the-global-energy-cartel.md";
  slug: "bitcoin-remains-a-fragile-puppet-of-the-global-energy-cartel";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bitcoin-s-fragile-rebound-depends-entirely-on-cheap-energy-and-false-geopolitical-peace.md": {
	id: "bitcoin-s-fragile-rebound-depends-entirely-on-cheap-energy-and-false-geopolitical-peace.md";
  slug: "bitcoin-s-fragile-rebound-depends-entirely-on-cheap-energy-and-false-geopolitical-peace";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"blackpink-s-jisoo-and-seo-in-guk-spill-the-virtual-tea-on--boyfriend-on-demand----is-this-k-drama-just-another-escape.md": {
	id: "blackpink-s-jisoo-and-seo-in-guk-spill-the-virtual-tea-on--boyfriend-on-demand----is-this-k-drama-just-another-escape.md";
  slug: "blackpink-s-jisoo-and-seo-in-guk-spill-the-virtual-tea-on--boyfriend-on-demand----is-this-k-drama-just-another-escape";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"blood--billions--and-the-big-lie--kenya-s-road-carnage-industry.md": {
	id: "blood--billions--and-the-big-lie--kenya-s-road-carnage-industry.md";
  slug: "blood--billions--and-the-big-lie--kenya-s-road-carnage-industry";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"blood--ego--and-the-poisoned-chalice-of-alego.md": {
	id: "blood--ego--and-the-poisoned-chalice-of-alego.md";
  slug: "blood--ego--and-the-poisoned-chalice-of-alego";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"blood-and-oil-fuel-the-dollar-s-hegemony.md": {
	id: "blood-and-oil-fuel-the-dollar-s-hegemony.md";
  slug: "blood-and-oil-fuel-the-dollar-s-hegemony";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"blood-in-the-strait-and-red-on-the-balance-sheet.md": {
	id: "blood-in-the-strait-and-red-on-the-balance-sheet.md";
  slug: "blood-in-the-strait-and-red-on-the-balance-sheet";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"blood-in-the-water-and-tea-in-the-bin--why-your-shamba-is-a-bad-investment.md": {
	id: "blood-in-the-water-and-tea-in-the-bin--why-your-shamba-is-a-bad-investment.md";
  slug: "blood-in-the-water-and-tea-in-the-bin--why-your-shamba-is-a-bad-investment";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"blood-is-thicker-than-water--but-clout-is-thicker-than-blood--ming-li-vs--the-barbz.md": {
	id: "blood-is-thicker-than-water--but-clout-is-thicker-than-blood--ming-li-vs--the-barbz.md";
  slug: "blood-is-thicker-than-water--but-clout-is-thicker-than-blood--ming-li-vs--the-barbz";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"blood-money-and-frozen-trenches--the-great-kenyan-export.md": {
	id: "blood-money-and-frozen-trenches--the-great-kenyan-export.md";
  slug: "blood-money-and-frozen-trenches--the-great-kenyan-export";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"blood-money-for-the-boys-in-blue--why-a-40-percent-raise-won-t-buy-our-safety.md": {
	id: "blood-money-for-the-boys-in-blue--why-a-40-percent-raise-won-t-buy-our-safety.md";
  slug: "blood-money-for-the-boys-in-blue--why-a-40-percent-raise-won-t-buy-our-safety";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"blood-money-in-the-blockchain-casino.md": {
	id: "blood-money-in-the-blockchain-casino.md";
  slug: "blood-money-in-the-blockchain-casino";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"blood-money-or-a-bonus--the-cost-of-keeping-the-cops-happy.md": {
	id: "blood-money-or-a-bonus--the-cost-of-keeping-the-cops-happy.md";
  slug: "blood-money-or-a-bonus--the-cost-of-keeping-the-cops-happy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"blood-on-the-south-lawn--the-brutal-coronation-of-america-s-new-state-religion.md": {
	id: "blood-on-the-south-lawn--the-brutal-coronation-of-america-s-new-state-religion.md";
  slug: "blood-on-the-south-lawn--the-brutal-coronation-of-america-s-new-state-religion";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"blue-owl-liquidity-strain-signals-potential-systematic-risks-for-private-credit-and-digital-assets.md": {
	id: "blue-owl-liquidity-strain-signals-potential-systematic-risks-for-private-credit-and-digital-assets.md";
  slug: "blue-owl-liquidity-strain-signals-potential-systematic-risks-for-private-credit-and-digital-assets";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bongo-s-new-divas--the-glitter--the-ghostwriters--and-the-diamond-factor.md": {
	id: "bongo-s-new-divas--the-glitter--the-ghostwriters--and-the-diamond-factor.md";
  slug: "bongo-s-new-divas--the-glitter--the-ghostwriters--and-the-diamond-factor";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"boni-s-big-reveal--as-if-we-didn-t-know-the-state-was-already-in-our-pockets.md": {
	id: "boni-s-big-reveal--as-if-we-didn-t-know-the-state-was-already-in-our-pockets.md";
  slug: "boni-s-big-reveal--as-if-we-didn-t-know-the-state-was-already-in-our-pockets";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"boniface-mwangi-s--what-if--career--history-teacher-for-a-corrupt-kenya.md": {
	id: "boniface-mwangi-s--what-if--career--history-teacher-for-a-corrupt-kenya.md";
  slug: "boniface-mwangi-s--what-if--career--history-teacher-for-a-corrupt-kenya";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bored-bishops-and-bus-cousins--the-elites-are-panicking-over-your-tiktok-war-memes.md": {
	id: "bored-bishops-and-bus-cousins--the-elites-are-panicking-over-your-tiktok-war-memes.md";
  slug: "bored-bishops-and-bus-cousins--the-elites-are-panicking-over-your-tiktok-war-memes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"boring-kenyan-jobs-paying-60k-plus.md": {
	id: "boring-kenyan-jobs-paying-60k-plus.md";
  slug: "boring-kenyan-jobs-paying-60k-plus";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"borrowed-light--kenya-s--independence--is-now-a-subscription-service-to-ethiopia.md": {
	id: "borrowed-light--kenya-s--independence--is-now-a-subscription-service-to-ethiopia.md";
  slug: "borrowed-light--kenya-s--independence--is-now-a-subscription-service-to-ethiopia";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"botox--betrayal--and-bottom-tier-fame--the-la-casa-de-los-famosos-mess.md": {
	id: "botox--betrayal--and-bottom-tier-fame--the-la-casa-de-los-famosos-mess.md";
  slug: "botox--betrayal--and-bottom-tier-fame--the-la-casa-de-los-famosos-mess";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"boyi-the-boogeyman--dci-finally-bags-a-small-fish-with-big-boots.md": {
	id: "boyi-the-boogeyman--dci-finally-bags-a-small-fish-with-big-boots.md";
  slug: "boyi-the-boogeyman--dci-finally-bags-a-small-fish-with-big-boots";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bp-toxic-waste-lawsuit-allowed-to-proceed-in-kenya---prepare-for-more-kenyan-court-drama.md": {
	id: "bp-toxic-waste-lawsuit-allowed-to-proceed-in-kenya---prepare-for-more-kenyan-court-drama.md";
  slug: "bp-toxic-waste-lawsuit-allowed-to-proceed-in-kenya---prepare-for-more-kenyan-court-drama";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"brand-protection-over-blood--the-monarchy-s-calculated-abandonment-of-andrew.md": {
	id: "brand-protection-over-blood--the-monarchy-s-calculated-abandonment-of-andrew.md";
  slug: "brand-protection-over-blood--the-monarchy-s-calculated-abandonment-of-andrew";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"brian-kagoro-gets-the-boot--kenya-s-newest-reality-drama-is-giving-dictatorship-chic.md": {
	id: "brian-kagoro-gets-the-boot--kenya-s-newest-reality-drama-is-giving-dictatorship-chic.md";
  slug: "brian-kagoro-gets-the-boot--kenya-s-newest-reality-drama-is-giving-dictatorship-chic";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bribes--bets--and-the-new-boardroom-boss--can-george-kithi-fix-this-mess.md": {
	id: "bribes--bets--and-the-new-boardroom-boss--can-george-kithi-fix-this-mess.md";
  slug: "bribes--bets--and-the-new-boardroom-boss--can-george-kithi-fix-this-mess";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bribes-and-backstabbing--mp-loses-watchdog-post-amidst-allegations.md": {
	id: "bribes-and-backstabbing--mp-loses-watchdog-post-amidst-allegations.md";
  slug: "bribes-and-backstabbing--mp-loses-watchdog-post-amidst-allegations";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"britain-s-bankruptcy-of-goods.md": {
	id: "britain-s-bankruptcy-of-goods.md";
  slug: "britain-s-bankruptcy-of-goods";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"britain-s-hunger-games--the-high-cost-of-living-on-a-global-credit-card.md": {
	id: "britain-s-hunger-games--the-high-cost-of-living-on-a-global-credit-card.md";
  slug: "britain-s-hunger-games--the-high-cost-of-living-on-a-global-credit-card";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"broadway-s-rehearsal-room--the-2026-olivier-nominations-are-just-hollywood-in-a-trench-coat.md": {
	id: "broadway-s-rehearsal-room--the-2026-olivier-nominations-are-just-hollywood-in-a-trench-coat.md";
  slug: "broadway-s-rehearsal-room--the-2026-olivier-nominations-are-just-hollywood-in-a-trench-coat";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"broken-brothers-and-bollywood-beefs--the-week-the-gloss-stripped-away.md": {
	id: "broken-brothers-and-bollywood-beefs--the-week-the-gloss-stripped-away.md";
  slug: "broken-brothers-and-bollywood-beefs--the-week-the-gloss-stripped-away";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bullets-in-beverly-hills--even-billionaires-can-not-buy-peace.md": {
	id: "bullets-in-beverly-hills--even-billionaires-can-not-buy-peace.md";
  slug: "bullets-in-beverly-hills--even-billionaires-can-not-buy-peace";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bungie-s-one-strike-charade--a-desperate-pr-shield-for-a-sinking-genre.md": {
	id: "bungie-s-one-strike-charade--a-desperate-pr-shield-for-a-sinking-genre.md";
  slug: "bungie-s-one-strike-charade--a-desperate-pr-shield-for-a-sinking-genre";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bureaucratic-cannibalism--minnesota-funds-its-own-gender-war.md": {
	id: "bureaucratic-cannibalism--minnesota-funds-its-own-gender-war.md";
  slug: "bureaucratic-cannibalism--minnesota-funds-its-own-gender-war";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"busia-drug-seizure-shows-police-crackdown-is-just-dancing-in-circles.md": {
	id: "busia-drug-seizure-shows-police-crackdown-is-just-dancing-in-circles.md";
  slug: "busia-drug-seizure-shows-police-crackdown-is-just-dancing-in-circles";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"business-players-tell-govt-to-make-economy-growth-environment-or-else.md": {
	id: "business-players-tell-govt-to-make-economy-growth-environment-or-else.md";
  slug: "business-players-tell-govt-to-make-economy-growth-environment-or-else";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"businessman-devani-seeks-report-on-status-of-triton-petroleum.md": {
	id: "businessman-devani-seeks-report-on-status-of-triton-petroleum.md";
  slug: "businessman-devani-seeks-report-on-status-of-triton-petroleum";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"buying-bravado--why-your-favorite-travel-influencer-might-be-a-fraud-with-a-fake-passport.md": {
	id: "buying-bravado--why-your-favorite-travel-influencer-might-be-a-fraud-with-a-fake-passport.md";
  slug: "buying-bravado--why-your-favorite-travel-influencer-might-be-a-fraud-with-a-fake-passport";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"buying-loyalty-with-our-grandchildren-s-taxes.md": {
	id: "buying-loyalty-with-our-grandchildren-s-taxes.md";
  slug: "buying-loyalty-with-our-grandchildren-s-taxes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bytedance-s-seedance-2-0-escalates-global-tensions-over-ai-copyright-and-creative-ownership.md": {
	id: "bytedance-s-seedance-2-0-escalates-global-tensions-over-ai-copyright-and-creative-ownership.md";
  slug: "bytedance-s-seedance-2-0-escalates-global-tensions-over-ai-copyright-and-creative-ownership";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"caf-raises-red-flag-on-kenya-s-preparations-towards-hosting-2027-afcon.md": {
	id: "caf-raises-red-flag-on-kenya-s-preparations-towards-hosting-2027-afcon.md";
  slug: "caf-raises-red-flag-on-kenya-s-preparations-towards-hosting-2027-afcon";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cailabs-targets-indian-space-expansion-amid-growing-indo-french-innovation-ties.md": {
	id: "cailabs-targets-indian-space-expansion-amid-growing-indo-french-innovation-ties.md";
  slug: "cailabs-targets-indian-space-expansion-amid-growing-indo-french-innovation-ties";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cal-poly-professors-dally-as-students-master-ai-without-them.md": {
	id: "cal-poly-professors-dally-as-students-master-ai-without-them.md";
  slug: "cal-poly-professors-dally-as-students-master-ai-without-them";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cal-poly-professors-lag-behind-students-on-ai-integration.md": {
	id: "cal-poly-professors-lag-behind-students-on-ai-integration.md";
  slug: "cal-poly-professors-lag-behind-students-on-ai-integration";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cal-poly-professors-lagging-behind-students-on-ai-integration.md": {
	id: "cal-poly-professors-lagging-behind-students-on-ai-integration.md";
  slug: "cal-poly-professors-lagging-behind-students-on-ai-integration";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"caleb-amisi--kenya-needs-accountable-mps-who-can-challenge-executive.md": {
	id: "caleb-amisi--kenya-needs-accountable-mps-who-can-challenge-executive.md";
  slug: "caleb-amisi--kenya-needs-accountable-mps-who-can-challenge-executive";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"california-bear-suit-luxury-car-scam-ends-in-insurance-fraud-sentences-for-3---another-day--another-dollar-stolen.md": {
	id: "california-bear-suit-luxury-car-scam-ends-in-insurance-fraud-sentences-for-3---another-day--another-dollar-stolen.md";
  slug: "california-bear-suit-luxury-car-scam-ends-in-insurance-fraud-sentences-for-3---another-day--another-dollar-stolen";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"california-luxury-car-insurance-scam-ends-in-fraud-sentences-for-3--illustrating-grandparent-vulnerability.md": {
	id: "california-luxury-car-insurance-scam-ends-in-fraud-sentences-for-3--illustrating-grandparent-vulnerability.md";
  slug: "california-luxury-car-insurance-scam-ends-in-fraud-sentences-for-3--illustrating-grandparent-vulnerability";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cambodian-scam-compounds-exposed--fake-police-stations-and-the-rot-beneath-the-surface.md": {
	id: "cambodian-scam-compounds-exposed--fake-police-stations-and-the-rot-beneath-the-surface.md";
  slug: "cambodian-scam-compounds-exposed--fake-police-stations-and-the-rot-beneath-the-surface";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cambodian-scam-compounds-exposed--fake-police-stations-serve-as-fronts-for-global-fraud.md": {
	id: "cambodian-scam-compounds-exposed--fake-police-stations-serve-as-fronts-for-global-fraud.md";
  slug: "cambodian-scam-compounds-exposed--fake-police-stations-serve-as-fronts-for-global-fraud";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"can-t-even-lead-a-cow---ruto-slams-opposition--urges-more-voters-to-register-in-northern-kenya.md": {
	id: "can-t-even-lead-a-cow---ruto-slams-opposition--urges-more-voters-to-register-in-northern-kenya.md";
  slug: "can-t-even-lead-a-cow---ruto-slams-opposition--urges-more-voters-to-register-in-northern-kenya";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"canvas-down--shinyhunters-threatens-schools--data-leak-amidst-incompetence.md": {
	id: "canvas-down--shinyhunters-threatens-schools--data-leak-amidst-incompetence.md";
  slug: "canvas-down--shinyhunters-threatens-schools--data-leak-amidst-incompetence";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"capitalizing-on-primate-trauma-and-the-market-of-misery.md": {
	id: "capitalizing-on-primate-trauma-and-the-market-of-misery.md";
  slug: "capitalizing-on-primate-trauma-and-the-market-of-misery";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"caroli-omondi-tells-governors-to-report-extortion-claims-to-dci--eacc-instead-of-public-allegations---capitalfm-co-ke.md": {
	id: "caroli-omondi-tells-governors-to-report-extortion-claims-to-dci--eacc-instead-of-public-allegations---capitalfm-co-ke.md";
  slug: "caroli-omondi-tells-governors-to-report-extortion-claims-to-dci--eacc-instead-of-public-allegations---capitalfm-co-ke";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cartels-infiltrate-ruto-subsidised-fertiliser-plan--threaten-food-security.md": {
	id: "cartels-infiltrate-ruto-subsidised-fertiliser-plan--threaten-food-security.md";
  slug: "cartels-infiltrate-ruto-subsidised-fertiliser-plan--threaten-food-security";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cash-bribes-dominate-as-police-and-civil-registration-lead-corruption-cases.md": {
	id: "cash-bribes-dominate-as-police-and-civil-registration-lead-corruption-cases.md";
  slug: "cash-bribes-dominate-as-police-and-civil-registration-lead-corruption-cases";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cashless-corruption--the-new-digital-toll-on-nairobi-roads.md": {
	id: "cashless-corruption--the-new-digital-toll-on-nairobi-roads.md";
  slug: "cashless-corruption--the-new-digital-toll-on-nairobi-roads";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"catch-flights--not-feelings-unless-those-feelings-are-regret-over-your-auto-renewal.md": {
	id: "catch-flights--not-feelings-unless-those-feelings-are-regret-over-your-auto-renewal.md";
  slug: "catch-flights--not-feelings-unless-those-feelings-are-regret-over-your-auto-renewal";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cbk-turns-to-imf--world-bank-amid-turf-war-over-kenya-s-bond-market-reforms.md": {
	id: "cbk-turns-to-imf--world-bank-amid-turf-war-over-kenya-s-bond-market-reforms.md";
  slug: "cbk-turns-to-imf--world-bank-amid-turf-war-over-kenya-s-bond-market-reforms";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cemetery-land-kickback--ex-city-official-owes-sh13-million-after-fraudulent-deal.md": {
	id: "cemetery-land-kickback--ex-city-official-owes-sh13-million-after-fraudulent-deal.md";
  slug: "cemetery-land-kickback--ex-city-official-owes-sh13-million-after-fraudulent-deal";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"central-bank-minutes-show-deep-divide-over-rate-decisions.md": {
	id: "central-bank-minutes-show-deep-divide-over-rate-decisions.md";
  slug: "central-bank-minutes-show-deep-divide-over-rate-decisions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cera-imani-s-privacy-blunder--the-high-cost-of-being-a-spon-con-queen.md": {
	id: "cera-imani-s-privacy-blunder--the-high-cost-of-being-a-spon-con-queen.md";
  slug: "cera-imani-s-privacy-blunder--the-high-cost-of-being-a-spon-con-queen";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cera-imani-s-privacy-blunder--when-influencing-becomes-illegal.md": {
	id: "cera-imani-s-privacy-blunder--when-influencing-becomes-illegal.md";
  slug: "cera-imani-s-privacy-blunder--when-influencing-becomes-illegal";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"chad-police-headed-to-haiti-gang-fight--another-african-show-of-force--for-whose-benefit.md": {
	id: "chad-police-headed-to-haiti-gang-fight--another-african-show-of-force--for-whose-benefit.md";
  slug: "chad-police-headed-to-haiti-gang-fight--another-african-show-of-force--for-whose-benefit";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"chad-s-800-cops-head-to-haiti-as-kenya-s-guys-get-the-boot.md": {
	id: "chad-s-800-cops-head-to-haiti-as-kenya-s-guys-get-the-boot.md";
  slug: "chad-s-800-cops-head-to-haiti-as-kenya-s-guys-get-the-boot";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"chadian-troops-replacing-kenyans-in-haiti--good-luck-with-that.md": {
	id: "chadian-troops-replacing-kenyans-in-haiti--good-luck-with-that.md";
  slug: "chadian-troops-replacing-kenyans-in-haiti--good-luck-with-that";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"chan-scandal--mariga-calls-for-speedy-probe-on-sh42-million-insurance-saga---standardmedia-co-ke.md": {
	id: "chan-scandal--mariga-calls-for-speedy-probe-on-sh42-million-insurance-saga---standardmedia-co-ke.md";
  slug: "chan-scandal--mariga-calls-for-speedy-probe-on-sh42-million-insurance-saga---standardmedia-co-ke";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"chan-scandal--riskwell-insurance-got-sh42m-without-bidding.md": {
	id: "chan-scandal--riskwell-insurance-got-sh42m-without-bidding.md";
  slug: "chan-scandal--riskwell-insurance-got-sh42m-without-bidding";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"character-development--the-nairobi-circus-after-the-leak.md": {
	id: "character-development--the-nairobi-circus-after-the-leak.md";
  slug: "character-development--the-nairobi-circus-after-the-leak";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"charisma-tells-youth--see-you-at-the-ballot----prepare-for-more-of-the-same.md": {
	id: "charisma-tells-youth--see-you-at-the-ballot----prepare-for-more-of-the-same.md";
  slug: "charisma-tells-youth--see-you-at-the-ballot----prepare-for-more-of-the-same";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cheating-at-tetris--the-inevitable-collapse-of-your-friend-s-futile-efforts.md": {
	id: "cheating-at-tetris--the-inevitable-collapse-of-your-friend-s-futile-efforts.md";
  slug: "cheating-at-tetris--the-inevitable-collapse-of-your-friend-s-futile-efforts";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cheating-biathlete-laegreid-apologizes-to-ex-and-teammate--blames-olympic-pressure.md": {
	id: "cheating-biathlete-laegreid-apologizes-to-ex-and-teammate--blames-olympic-pressure.md";
  slug: "cheating-biathlete-laegreid-apologizes-to-ex-and-teammate--blames-olympic-pressure";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"chelsea-s--million-miles-off--champions-league-glory-because-of-goalkeeping-mess--carragher-declares.md": {
	id: "chelsea-s--million-miles-off--champions-league-glory-because-of-goalkeeping-mess--carragher-declares.md";
  slug: "chelsea-s--million-miles-off--champions-league-glory-because-of-goalkeeping-mess--carragher-declares";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cherfilus-mccormick-digs-in---5-million-scandal-won-t-make-this-dem-resign.md": {
	id: "cherfilus-mccormick-digs-in---5-million-scandal-won-t-make-this-dem-resign.md";
  slug: "cherfilus-mccormick-digs-in---5-million-scandal-won-t-make-this-dem-resign";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"chess-pieces-and-clout-chasers--the-messy-after-party-of-kenyan-politics.md": {
	id: "chess-pieces-and-clout-chasers--the-messy-after-party-of-kenyan-politics.md";
  slug: "chess-pieces-and-clout-chasers--the-messy-after-party-of-kenyan-politics";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"chicago-bus-driver-a-casualty-of--1-5-billion-scam-against-americans.md": {
	id: "chicago-bus-driver-a-casualty-of--1-5-billion-scam-against-americans.md";
  slug: "chicago-bus-driver-a-casualty-of--1-5-billion-scam-against-americans";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"chicago-bus-driver-s---1-5-billion-scam----a-testament-to-human-gullibility-and-corporate-negligence.md": {
	id: "chicago-bus-driver-s---1-5-billion-scam----a-testament-to-human-gullibility-and-corporate-negligence.md";
  slug: "chicago-bus-driver-s---1-5-billion-scam----a-testament-to-human-gullibility-and-corporate-negligence";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"china-kenya-power-play--great-rift-valley-geothermal-gets-a-chinese-makeover.md": {
	id: "china-kenya-power-play--great-rift-valley-geothermal-gets-a-chinese-makeover.md";
  slug: "china-kenya-power-play--great-rift-valley-geothermal-gets-a-chinese-makeover";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"china-zero-tariff-policy--kenya-s-export-economy-transformation--don-t-hold-your-breath.md": {
	id: "china-zero-tariff-policy--kenya-s-export-economy-transformation--don-t-hold-your-breath.md";
  slug: "china-zero-tariff-policy--kenya-s-export-economy-transformation--don-t-hold-your-breath";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"chinese-worker-dead-at-talanta-stadium--police-launch-another-inquiry.md": {
	id: "chinese-worker-dead-at-talanta-stadium--police-launch-another-inquiry.md";
  slug: "chinese-worker-dead-at-talanta-stadium--police-launch-another-inquiry";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"choppers--committees--and-the-high-cost-of-dying-large--the-ng-eno-tragedy.md": {
	id: "choppers--committees--and-the-high-cost-of-dying-large--the-ng-eno-tragedy.md";
  slug: "choppers--committees--and-the-high-cost-of-dying-large--the-ng-eno-tragedy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"choppers-in-the-clouds--corpses-on-the-ground.md": {
	id: "choppers-in-the-clouds--corpses-on-the-ground.md";
  slug: "choppers-in-the-clouds--corpses-on-the-ground";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"church-of-england-halts-same-sex-blessing-reforms--signalling-institutional-pivot-amid-global-pressure.md": {
	id: "church-of-england-halts-same-sex-blessing-reforms--signalling-institutional-pivot-amid-global-pressure.md";
  slug: "church-of-england-halts-same-sex-blessing-reforms--signalling-institutional-pivot-amid-global-pressure";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"city-hall-finally-bows-down--will-cough-up-sh1-55bn-to-kenya-power--after-much-theatre.md": {
	id: "city-hall-finally-bows-down--will-cough-up-sh1-55bn-to-kenya-power--after-much-theatre.md";
  slug: "city-hall-finally-bows-down--will-cough-up-sh1-55bn-to-kenya-power--after-much-theatre";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cjng-drug-cartel-s-ai--drones--and-social-media-embrace--a-technological-escalation-of-criminal-enterprise.md": {
	id: "cjng-drug-cartel-s-ai--drones--and-social-media-embrace--a-technological-escalation-of-criminal-enterprise.md";
  slug: "cjng-drug-cartel-s-ai--drones--and-social-media-embrace--a-technological-escalation-of-criminal-enterprise";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ckay-calls--afrobeats--a-lazy-excuse--exposes-industry-s-sound-snobbery.md": {
	id: "ckay-calls--afrobeats--a-lazy-excuse--exposes-industry-s-sound-snobbery.md";
  slug: "ckay-calls--afrobeats--a-lazy-excuse--exposes-industry-s-sound-snobbery";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ckay-challenges-afrobeats-label-and-promotes-emo-afrobeats-evolution---mezha-net.md": {
	id: "ckay-challenges-afrobeats-label-and-promotes-emo-afrobeats-evolution---mezha-net.md";
  slug: "ckay-challenges-afrobeats-label-and-promotes-emo-afrobeats-evolution---mezha-net";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ckay-claims-he-s--redefining--african-music--but-is-it-just-another-generic-label.md": {
	id: "ckay-claims-he-s--redefining--african-music--but-is-it-just-another-generic-label.md";
  slug: "ckay-claims-he-s--redefining--african-music--but-is-it-just-another-generic-label";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"claude-code-leak-exposes-tamagotchi-pet-and-always-on-agent---more-corporate-incompetence-revealed.md": {
	id: "claude-code-leak-exposes-tamagotchi-pet-and-always-on-agent---more-corporate-incompetence-revealed.md";
  slug: "claude-code-leak-exposes-tamagotchi-pet-and-always-on-agent---more-corporate-incompetence-revealed";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"claude-code-leak-reveals-tamagotchi-pet-and-always-on-agent--the-cost-of-corporate-incompetence.md": {
	id: "claude-code-leak-reveals-tamagotchi-pet-and-always-on-agent--the-cost-of-corporate-incompetence.md";
  slug: "claude-code-leak-reveals-tamagotchi-pet-and-always-on-agent--the-cost-of-corporate-incompetence";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"clergy-call-for-unity--warn-against-divisive-politics-in-good-friday-messages.md": {
	id: "clergy-call-for-unity--warn-against-divisive-politics-in-good-friday-messages.md";
  slug: "clergy-call-for-unity--warn-against-divisive-politics-in-good-friday-messages";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"climate-resilience-is-just-another-pdf-for-the-suits-to-file.md": {
	id: "climate-resilience-is-just-another-pdf-for-the-suits-to-file.md";
  slug: "climate-resilience-is-just-another-pdf-for-the-suits-to-file";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cloud-cuckoo-land--the--raila-airways--grift-is-high-altitude-delusion.md": {
	id: "cloud-cuckoo-land--the--raila-airways--grift-is-high-altitude-delusion.md";
  slug: "cloud-cuckoo-land--the--raila-airways--grift-is-high-altitude-delusion";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"clout--caps--and-chaos--the-drill-beef-nobody-asked-for.md": {
	id: "clout--caps--and-chaos--the-drill-beef-nobody-asked-for.md";
  slug: "clout--caps--and-chaos--the-drill-beef-nobody-asked-for";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"clout--chaos--and-concaves--why-the-carter-efe-vs-portable-fight-is-just-a-glorified-circus.md": {
	id: "clout--chaos--and-concaves--why-the-carter-efe-vs-portable-fight-is-just-a-glorified-circus.md";
  slug: "clout--chaos--and-concaves--why-the-carter-efe-vs-portable-fight-is-just-a-glorified-circus";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"clout--chaos--and-corpses--why-kenya-s-social-media-feed-is-a-crime-scene.md": {
	id: "clout--chaos--and-corpses--why-kenya-s-social-media-feed-is-a-crime-scene.md";
  slug: "clout--chaos--and-corpses--why-kenya-s-social-media-feed-is-a-crime-scene";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"clout--coffins--and-cabinets--nuru-okanga-s-latest-political-performance.md": {
	id: "clout--coffins--and-cabinets--nuru-okanga-s-latest-political-performance.md";
  slug: "clout--coffins--and-cabinets--nuru-okanga-s-latest-political-performance";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"clout-chasing-comes-with-a-bill--cera-imani-and-the-odpc-reality-check.md": {
	id: "clout-chasing-comes-with-a-bill--cera-imani-and-the-odpc-reality-check.md";
  slug: "clout-chasing-comes-with-a-bill--cera-imani-and-the-odpc-reality-check";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"clout-chasing-or-just-plain-broke--tiktoker-trades-likes-for-handcuffs-over-shilling-stunt.md": {
	id: "clout-chasing-or-just-plain-broke--tiktoker-trades-likes-for-handcuffs-over-shilling-stunt.md";
  slug: "clout-chasing-or-just-plain-broke--tiktoker-trades-likes-for-handcuffs-over-shilling-stunt";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"clout-comes-with-a-court-order--kenyan-influencers-finally-learn-to-read-the-fine-print.md": {
	id: "clout-comes-with-a-court-order--kenyan-influencers-finally-learn-to-read-the-fine-print.md";
  slug: "clout-comes-with-a-court-order--kenyan-influencers-finally-learn-to-read-the-fine-print";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"coast-police-commander-issues-shoot-to-kill-directive-against-machete-gangs.md": {
	id: "coast-police-commander-issues-shoot-to-kill-directive-against-machete-gangs.md";
  slug: "coast-police-commander-issues-shoot-to-kill-directive-against-machete-gangs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"colonial-ghosts-haunt-the-shattered-eredivisie-illusion.md": {
	id: "colonial-ghosts-haunt-the-shattered-eredivisie-illusion.md";
  slug: "colonial-ghosts-haunt-the-shattered-eredivisie-illusion";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"colton-underwood-wants-us-to-believe-he-is-the-victim--again.md": {
	id: "colton-underwood-wants-us-to-believe-he-is-the-victim--again.md";
  slug: "colton-underwood-wants-us-to-believe-he-is-the-victim--again";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"congo-cobalt-spill-shines-light-on-dirty-global-scramble.md": {
	id: "congo-cobalt-spill-shines-light-on-dirty-global-scramble.md";
  slug: "congo-cobalt-spill-shines-light-on-dirty-global-scramble";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"connected-africa-summit-2026-opens-in-nairobi---more-hot-air-than-actual-connection.md": {
	id: "connected-africa-summit-2026-opens-in-nairobi---more-hot-air-than-actual-connection.md";
  slug: "connected-africa-summit-2026-opens-in-nairobi---more-hot-air-than-actual-connection";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"constitution-frees-us--more-like-it-chains-us-back-to-old-ways.md": {
	id: "constitution-frees-us--more-like-it-chains-us-back-to-old-ways.md";
  slug: "constitution-frees-us--more-like-it-chains-us-back-to-old-ways";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"content-vultures-and-seizures--nairobi-s-fake-sympathy-on-display.md": {
	id: "content-vultures-and-seizures--nairobi-s-fake-sympathy-on-display.md";
  slug: "content-vultures-and-seizures--nairobi-s-fake-sympathy-on-display";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cookie-cutter-scandals--why-your-privacy-settings-won-t-save-your-favorite-flop.md": {
	id: "cookie-cutter-scandals--why-your-privacy-settings-won-t-save-your-favorite-flop.md";
  slug: "cookie-cutter-scandals--why-your-privacy-settings-won-t-save-your-favorite-flop";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"copied-iphone-moon-trick--astronauts-just-fly-closer--good-luck-with-that.md": {
	id: "copied-iphone-moon-trick--astronauts-just-fly-closer--good-luck-with-that.md";
  slug: "copied-iphone-moon-trick--astronauts-just-fly-closer--good-luck-with-that";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"coristine--big-balls--funds-fraud-videos--predictably-blurring-lines.md": {
	id: "coristine--big-balls--funds-fraud-videos--predictably-blurring-lines.md";
  slug: "coristine--big-balls--funds-fraud-videos--predictably-blurring-lines";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"corporate-musical-chairs--risper-ohaga-swaps-beer-bottles-for-insurance-policies.md": {
	id: "corporate-musical-chairs--risper-ohaga-swaps-beer-bottles-for-insurance-policies.md";
  slug: "corporate-musical-chairs--risper-ohaga-swaps-beer-bottles-for-insurance-policies";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"corporate-parasites-demand-a-war-chest-for-the-coming-collapse.md": {
	id: "corporate-parasites-demand-a-war-chest-for-the-coming-collapse.md";
  slug: "corporate-parasites-demand-a-war-chest-for-the-coming-collapse";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"county-round-ups--week-ended-27th-march--more-hot-air--less-action.md": {
	id: "county-round-ups--week-ended-27th-march--more-hot-air--less-action.md";
  slug: "county-round-ups--week-ended-27th-march--more-hot-air--less-action";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"court-declares-tea-spilling-legal--keyboard-warriors-1--gag-orders-0.md": {
	id: "court-declares-tea-spilling-legal--keyboard-warriors-1--gag-orders-0.md";
  slug: "court-declares-tea-spilling-legal--keyboard-warriors-1--gag-orders-0";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"court-filings-skyrocket-past-620-000-as-judiciary-drowns-in-cases---report.md": {
	id: "court-filings-skyrocket-past-620-000-as-judiciary-drowns-in-cases---report.md";
  slug: "court-filings-skyrocket-past-620-000-as-judiciary-drowns-in-cases---report";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cow-gifts-and-potato-paradoxes--the-messy-exit-of-kabale-s-medical-mainstay.md": {
	id: "cow-gifts-and-potato-paradoxes--the-messy-exit-of-kabale-s-medical-mainstay.md";
  slug: "cow-gifts-and-potato-paradoxes--the-messy-exit-of-kabale-s-medical-mainstay";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"creative-economy-law-s-hidden-costs-and-content-take-down-powers--another-ruto-masterpiece.md": {
	id: "creative-economy-law-s-hidden-costs-and-content-take-down-powers--another-ruto-masterpiece.md";
  slug: "creative-economy-law-s-hidden-costs-and-content-take-down-powers--another-ruto-masterpiece";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"crookhaven--family-friendly-drama-aims-for-book-fan-adaptation-and-box-office-gold.md": {
	id: "crookhaven--family-friendly-drama-aims-for-book-fan-adaptation-and-box-office-gold.md";
  slug: "crookhaven--family-friendly-drama-aims-for-book-fan-adaptation-and-box-office-gold";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"crookhaven-s-family-friendly-tv-drama-fails-to-conceal-adaptation-woes.md": {
	id: "crookhaven-s-family-friendly-tv-drama-fails-to-conceal-adaptation-woes.md";
  slug: "crookhaven-s-family-friendly-tv-drama-fails-to-conceal-adaptation-woes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"crunchyroll-announces-price-increases-across-all-tiers.md": {
	id: "crunchyroll-announces-price-increases-across-all-tiers.md";
  slug: "crunchyroll-announces-price-increases-across-all-tiers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cruz-beckham-launches-music-career-amid-family-drama--a-nepo-baby-s-predictable-play-for-stardom.md": {
	id: "cruz-beckham-launches-music-career-amid-family-drama--a-nepo-baby-s-predictable-play-for-stardom.md";
  slug: "cruz-beckham-launches-music-career-amid-family-drama--a-nepo-baby-s-predictable-play-for-stardom";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cruz-beckham-s-music-career-launch-amid-family-drama--a-predictable-spectacle.md": {
	id: "cruz-beckham-s-music-career-launch-amid-family-drama--a-predictable-spectacle.md";
  slug: "cruz-beckham-s-music-career-launch-amid-family-drama--a-predictable-spectacle";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cryptic-moms--brad-pitt-rejection--and-the-reality-tv-to-music-pipeline.md": {
	id: "cryptic-moms--brad-pitt-rejection--and-the-reality-tv-to-music-pipeline.md";
  slug: "cryptic-moms--brad-pitt-rejection--and-the-reality-tv-to-music-pipeline";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"crypto-clergy-kenyan-prophets-blockchain-tithing.md": {
	id: "crypto-clergy-kenyan-prophets-blockchain-tithing.md";
  slug: "crypto-clergy-kenyan-prophets-blockchain-tithing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cuba-counts-cost-of-alliance-after-32-troops-killed-in-venezuela.md": {
	id: "cuba-counts-cost-of-alliance-after-32-troops-killed-in-venezuela.md";
  slug: "cuba-counts-cost-of-alliance-after-32-troops-killed-in-venezuela";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"culiac-n-s--fear-is-everywhere--amidst-escalating-cartel-war--bbc-reports-on-a-city-in-turmoil.md": {
	id: "culiac-n-s--fear-is-everywhere--amidst-escalating-cartel-war--bbc-reports-on-a-city-in-turmoil.md";
  slug: "culiac-n-s--fear-is-everywhere--amidst-escalating-cartel-war--bbc-reports-on-a-city-in-turmoil";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cult-of-the-strongman-replaces-the-myth-of-the-athlete.md": {
	id: "cult-of-the-strongman-replaces-the-myth-of-the-athlete.md";
  slug: "cult-of-the-strongman-replaces-the-myth-of-the-athlete";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cultural-satire-and-political-friction--an-analysis-of-the--get-off-my-land--discourse.md": {
	id: "cultural-satire-and-political-friction--an-analysis-of-the--get-off-my-land--discourse.md";
  slug: "cultural-satire-and-political-friction--an-analysis-of-the--get-off-my-land--discourse";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cup-pressure-mounts-as-shabana-hosts-kenya-police-in-a-predictable-quarter-final.md": {
	id: "cup-pressure-mounts-as-shabana-hosts-kenya-police-in-a-predictable-quarter-final.md";
  slug: "cup-pressure-mounts-as-shabana-hosts-kenya-police-in-a-predictable-quarter-final";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"curling-scandal-tarnishes-olympic-ice.md": {
	id: "curling-scandal-tarnishes-olympic-ice.md";
  slug: "curling-scandal-tarnishes-olympic-ice";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cyber-security-ammendment-bill.md": {
	id: "cyber-security-ammendment-bill.md";
  slug: "kenya-cybercrime-bill-2025-reject";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"czi-cuts-70-jobs-to-focus-on-ai-driven-medical-research.md": {
	id: "czi-cuts-70-jobs-to-focus-on-ai-driven-medical-research.md";
  slug: "czi-cuts-70-jobs-to-focus-on-ai-driven-medical-research";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dar-and-lagos-play-nice--is-this-a-real-collab-or-just-another-clout-chase.md": {
	id: "dar-and-lagos-play-nice--is-this-a-real-collab-or-just-another-clout-chase.md";
  slug: "dar-and-lagos-play-nice--is-this-a-real-collab-or-just-another-clout-chase";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"daredevil-born-again-death-changed-after-filming--a-tale-of-creative-indecision.md": {
	id: "daredevil-born-again-death-changed-after-filming--a-tale-of-creative-indecision.md";
  slug: "daredevil-born-again-death-changed-after-filming--a-tale-of-creative-indecision";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"darrien-luke-s--woza---a-brave-cultural-fusion-or-just-another-durban-clich.md": {
	id: "darrien-luke-s--woza---a-brave-cultural-fusion-or-just-another-durban-clich.md";
  slug: "darrien-luke-s--woza---a-brave-cultural-fusion-or-just-another-durban-clich";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dashboard-drama--tanzania-s-officials-get-a-reality-check-after-trading-truth-for-tea.md": {
	id: "dashboard-drama--tanzania-s-officials-get-a-reality-check-after-trading-truth-for-tea.md";
  slug: "dashboard-drama--tanzania-s-officials-get-a-reality-check-after-trading-truth-for-tea";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"data-infrastructure-efficiency-becomes-critical-pillar-for-global-enterprise-scalability.md": {
	id: "data-infrastructure-efficiency-becomes-critical-pillar-for-global-enterprise-scalability.md";
  slug: "data-infrastructure-efficiency-becomes-critical-pillar-for-global-enterprise-scalability";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"data-sovereignty-and-the-ad-tech-pivot--navigating-the-new-regulatory-frontier.md": {
	id: "data-sovereignty-and-the-ad-tech-pivot--navigating-the-new-regulatory-frontier.md";
  slug: "data-sovereignty-and-the-ad-tech-pivot--navigating-the-new-regulatory-frontier";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"daughters-in-law-get-abuse--displacement--and-broken-relationships--it-s-all-about-land--money--and-lineage.md": {
	id: "daughters-in-law-get-abuse--displacement--and-broken-relationships--it-s-all-about-land--money--and-lineage.md";
  slug: "daughters-in-law-get-abuse--displacement--and-broken-relationships--it-s-all-about-land--money--and-lineage";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dci--crackdown--shows-road-gangs-still-terrorizing-nairobi-motorists.md": {
	id: "dci--crackdown--shows-road-gangs-still-terrorizing-nairobi-motorists.md";
  slug: "dci--crackdown--shows-road-gangs-still-terrorizing-nairobi-motorists";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dci-arrests-3-suspects-after-migori-armed-robbery.md": {
	id: "dci-arrests-3-suspects-after-migori-armed-robbery.md";
  slug: "dci-arrests-3-suspects-after-migori-armed-robbery";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dci-discovers-the-internet--the-russian--content-creator--scandal.md": {
	id: "dci-discovers-the-internet--the-russian--content-creator--scandal.md";
  slug: "dci-discovers-the-internet--the-russian--content-creator--scandal";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dci-flags-reputational-risks-linked-to-kenya-s-grey-listing-status.md": {
	id: "dci-flags-reputational-risks-linked-to-kenya-s-grey-listing-status.md";
  slug: "dci-flags-reputational-risks-linked-to-kenya-s-grey-listing-status";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dci-narok-drug-bust--two-arrested--enough-stuff-to-keep-half-the-youth-busy.md": {
	id: "dci-narok-drug-bust--two-arrested--enough-stuff-to-keep-half-the-youth-busy.md";
  slug: "dci-narok-drug-bust--two-arrested--enough-stuff-to-keep-half-the-youth-busy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dci-officers--foil--drug-trafficking-plot-on-nairobi-nakuru-highway---another-day--another-shakedown.md": {
	id: "dci-officers--foil--drug-trafficking-plot-on-nairobi-nakuru-highway---another-day--another-shakedown.md";
  slug: "dci-officers--foil--drug-trafficking-plot-on-nairobi-nakuru-highway---another-day--another-shakedown";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dci-s-tea-and-mandazi-seminars-won-t-scrub-our-dirty-money-clean.md": {
	id: "dci-s-tea-and-mandazi-seminars-won-t-scrub-our-dirty-money-clean.md";
  slug: "dci-s-tea-and-mandazi-seminars-won-t-scrub-our-dirty-money-clean";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dci-slaps-down-gachagua-s-fuel-scandal-grumbles--threatens-legal-bashing.md": {
	id: "dci-slaps-down-gachagua-s-fuel-scandal-grumbles--threatens-legal-bashing.md";
  slug: "dci-slaps-down-gachagua-s-fuel-scandal-grumbles--threatens-legal-bashing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"de-rossi-fires-back--genoa-boss-blasts--vicious-gossip--after-roma-win.md": {
	id: "de-rossi-fires-back--genoa-boss-blasts--vicious-gossip--after-roma-win.md";
  slug: "de-rossi-fires-back--genoa-boss-blasts--vicious-gossip--after-roma-win";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"de-rossi-s-roma--swap-deal--whinge--people-just-love-to-gossip--it-s-unbelievable--darling.md": {
	id: "de-rossi-s-roma--swap-deal--whinge--people-just-love-to-gossip--it-s-unbelievable--darling.md";
  slug: "de-rossi-s-roma--swap-deal--whinge--people-just-love-to-gossip--it-s-unbelievable--darling";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"deadbeat-dads-and-the-audacity-of-the--proud-father--rebrand.md": {
	id: "deadbeat-dads-and-the-audacity-of-the--proud-father--rebrand.md";
  slug: "deadbeat-dads-and-the-audacity-of-the--proud-father--rebrand";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"deadpool-exploits-magic--the-gathering-classics-for-profit-grab.md": {
	id: "deadpool-exploits-magic--the-gathering-classics-for-profit-grab.md";
  slug: "deadpool-exploits-magic--the-gathering-classics-for-profit-grab";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"deadpool-s-taint-marks--magic--the-gathering--staples-for-capitalist-exploitation.md": {
	id: "deadpool-s-taint-marks--magic--the-gathering--staples-for-capitalist-exploitation.md";
  slug: "deadpool-s-taint-marks--magic--the-gathering--staples-for-capitalist-exploitation";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"deadpool-to-vandalize--magic--the-gathering--staples-for-yet-another-secret-lair.md": {
	id: "deadpool-to-vandalize--magic--the-gathering--staples-for-yet-another-secret-lair.md";
  slug: "deadpool-to-vandalize--magic--the-gathering--staples-for-yet-another-secret-lair";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"death--choppers--and-the-high-cost-of-political-saint-making.md": {
	id: "death--choppers--and-the-high-cost-of-political-saint-making.md";
  slug: "death--choppers--and-the-high-cost-of-political-saint-making";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"death-before-regulation--the-kisumu-quarry-ban-is-a-pr-stunt-built-on-graves.md": {
	id: "death-before-regulation--the-kisumu-quarry-ban-is-a-pr-stunt-built-on-graves.md";
  slug: "death-before-regulation--the-kisumu-quarry-ban-is-a-pr-stunt-built-on-graves";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"debt-for-breakfast--the-government-s-plan-to-borrow-us-into-oblivion.md": {
	id: "debt-for-breakfast--the-government-s-plan-to-borrow-us-into-oblivion.md";
  slug: "debt-for-breakfast--the-government-s-plan-to-borrow-us-into-oblivion";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"decaying-diplomacy-and-the-myth-of-technocratic-independence.md": {
	id: "decaying-diplomacy-and-the-myth-of-technocratic-independence.md";
  slug: "decaying-diplomacy-and-the-myth-of-technocratic-independence";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dechambeau-s-liv-singapore-win--a-spectacle-of-stumbles-and-stupendous-payouts.md": {
	id: "dechambeau-s-liv-singapore-win--a-spectacle-of-stumbles-and-stupendous-payouts.md";
  slug: "dechambeau-s-liv-singapore-win--a-spectacle-of-stumbles-and-stupendous-payouts";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dechambeau-s-liv-singapore-win--another-expensive-spectacle-of-sporting-absurdity.md": {
	id: "dechambeau-s-liv-singapore-win--another-expensive-spectacle-of-sporting-absurdity.md";
  slug: "dechambeau-s-liv-singapore-win--another-expensive-spectacle-of-sporting-absurdity";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dechambeau-wins-liv-singapore-in-predictable-play-off-meltdown.md": {
	id: "dechambeau-wins-liv-singapore-in-predictable-play-off-meltdown.md";
  slug: "dechambeau-wins-liv-singapore-in-predictable-play-off-meltdown";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"decriminalizing-consensual-adolescent-relationships-in-kenya--good-luck-with-that.md": {
	id: "decriminalizing-consensual-adolescent-relationships-in-kenya--good-luck-with-that.md";
  slug: "decriminalizing-consensual-adolescent-relationships-in-kenya--good-luck-with-that";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"degrees-in-deception--how-your-tuition-funded-a-vc-s-new-v8.md": {
	id: "degrees-in-deception--how-your-tuition-funded-a-vc-s-new-v8.md";
  slug: "degrees-in-deception--how-your-tuition-funded-a-vc-s-new-v8";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"del-monte-kenya-gets-police-unit--because-apparently-pineapples-need-bodyguards-now.md": {
	id: "del-monte-kenya-gets-police-unit--because-apparently-pineapples-need-bodyguards-now.md";
  slug: "del-monte-kenya-gets-police-unit--because-apparently-pineapples-need-bodyguards-now";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dell-xps-14-core-ultra-7-355--still-great--but-not-nearly-as-special.md": {
	id: "dell-xps-14-core-ultra-7-355--still-great--but-not-nearly-as-special.md";
  slug: "dell-xps-14-core-ultra-7-355--still-great--but-not-nearly-as-special";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"demographics-as-code--the-logic-behind-bhagwat-s-population-warning.md": {
	id: "demographics-as-code--the-logic-behind-bhagwat-s-population-warning.md";
  slug: "demographics-as-code--the-logic-behind-bhagwat-s-population-warning";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dhaka-sells-the-sovereignty-myth-to-survive-the-debt-trap.md": {
	id: "dhaka-sells-the-sovereignty-myth-to-survive-the-debt-trap.md";
  slug: "dhaka-sells-the-sovereignty-myth-to-survive-the-debt-trap";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"diamond-platnumz-s--natulizana--is-just-another-boring-ballad-in-his-catalogue.md": {
	id: "diamond-platnumz-s--natulizana--is-just-another-boring-ballad-in-his-catalogue.md";
  slug: "diamond-platnumz-s--natulizana--is-just-another-boring-ballad-in-his-catalogue";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"diamond-platnumz-wants-you-to--nail-down--your-partner-while-he-keeps-his-tools-moving.md": {
	id: "diamond-platnumz-wants-you-to--nail-down--your-partner-while-he-keeps-his-tools-moving.md";
  slug: "diamond-platnumz-wants-you-to--nail-down--your-partner-while-he-keeps-his-tools-moving";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"diamond-s-content-factory--is--natulizana--just-another-corporate-paycheck.md": {
	id: "diamond-s-content-factory--is--natulizana--just-another-corporate-paycheck.md";
  slug: "diamond-s-content-factory--is--natulizana--just-another-corporate-paycheck";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"diana-marua-demands-ksh-10-million-from-bahati-before-baby-number-five----not-a-delivering-machine.md": {
	id: "diana-marua-demands-ksh-10-million-from-bahati-before-baby-number-five----not-a-delivering-machine.md";
  slug: "diana-marua-demands-ksh-10-million-from-bahati-before-baby-number-five----not-a-delivering-machine";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"diapers-and-disasters--why-duale-s-vaccine-shortage-is-the-ultimate-pr-nightmare.md": {
	id: "diapers-and-disasters--why-duale-s-vaccine-shortage-is-the-ultimate-pr-nightmare.md";
  slug: "diapers-and-disasters--why-duale-s-vaccine-shortage-is-the-ultimate-pr-nightmare";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dig-promises-schools-safe-in-kitui---because-the-police-never-fail--right.md": {
	id: "dig-promises-schools-safe-in-kitui---because-the-police-never-fail--right.md";
  slug: "dig-promises-schools-safe-in-kitui---because-the-police-never-fail--right";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"digital-badges-for-a-broken-system.md": {
	id: "digital-badges-for-a-broken-system.md";
  slug: "digital-badges-for-a-broken-system";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"digital-drivers--pockets-get-squeezed-after-fuel-hikes.md": {
	id: "digital-drivers--pockets-get-squeezed-after-fuel-hikes.md";
  slug: "digital-drivers--pockets-get-squeezed-after-fuel-hikes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"digital-judas-and-the-sh10-000-justice-fee.md": {
	id: "digital-judas-and-the-sh10-000-justice-fee.md";
  slug: "digital-judas-and-the-sh10-000-justice-fee";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"digital-scrutiny-follows-kevin-durant-amid-houston-rockets-playoff-push.md": {
	id: "digital-scrutiny-follows-kevin-durant-amid-houston-rockets-playoff-push.md";
  slug: "digital-scrutiny-follows-kevin-durant-amid-houston-rockets-playoff-push";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"digital-voyeurism-at-scale--why-darpa-s-x-ray-vision-is-a-lethal-guessing-game.md": {
	id: "digital-voyeurism-at-scale--why-darpa-s-x-ray-vision-is-a-lethal-guessing-game.md";
  slug: "digital-voyeurism-at-scale--why-darpa-s-x-ray-vision-is-a-lethal-guessing-game";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"diplomatic-blunder-as-suluhu-openly-reprimands-ruto-over--tanga-refinery--gaffe.md": {
	id: "diplomatic-blunder-as-suluhu-openly-reprimands-ruto-over--tanga-refinery--gaffe.md";
  slug: "diplomatic-blunder-as-suluhu-openly-reprimands-ruto-over--tanga-refinery--gaffe";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"diplomats-and-dirty-tapes--why-ghana-is-fighting-for-her-girls-while-kenya-ghosted-the-chat.md": {
	id: "diplomats-and-dirty-tapes--why-ghana-is-fighting-for-her-girls-while-kenya-ghosted-the-chat.md";
  slug: "diplomats-and-dirty-tapes--why-ghana-is-fighting-for-her-girls-while-kenya-ghosted-the-chat";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"director-of--hoppers--admits-disney-cowardice-nearly-sanitized-shocking-moment.md": {
	id: "director-of--hoppers--admits-disney-cowardice-nearly-sanitized-shocking-moment.md";
  slug: "director-of--hoppers--admits-disney-cowardice-nearly-sanitized-shocking-moment";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"disclosure-day--trailer--spielberg-s-alien-mystery-just-another-hollywood-distraction.md": {
	id: "disclosure-day--trailer--spielberg-s-alien-mystery-just-another-hollywood-distraction.md";
  slug: "disclosure-day--trailer--spielberg-s-alien-mystery-just-another-hollywood-distraction";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"discord-nitro-bundles-leaked-xbox-game-pass--starter-edition--for-cynical-gamers.md": {
	id: "discord-nitro-bundles-leaked-xbox-game-pass--starter-edition--for-cynical-gamers.md";
  slug: "discord-nitro-bundles-leaked-xbox-game-pass--starter-edition--for-cynical-gamers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"discovering-the-optimal-electric-toothbrush-for-sensitive-teeth.md": {
	id: "discovering-the-optimal-electric-toothbrush-for-sensitive-teeth.md";
  slug: "discovering-the-optimal-electric-toothbrush-for-sensitive-teeth";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"disney-plus-and-hulu-bundle-for--15--a-trap-for-the-unwary.md": {
	id: "disney-plus-and-hulu-bundle-for--15--a-trap-for-the-unwary.md";
  slug: "disney-plus-and-hulu-bundle-for--15--a-trap-for-the-unwary";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"distrokid-finally-discovers-south-africa--maskandi-artists-get-a-label-while-the-suits-grab-the-data.md": {
	id: "distrokid-finally-discovers-south-africa--maskandi-artists-get-a-label-while-the-suits-grab-the-data.md";
  slug: "distrokid-finally-discovers-south-africa--maskandi-artists-get-a-label-while-the-suits-grab-the-data";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"distrokid-s-new--labels---because-your-uncle-s-maskandi-is-finally-worth-a-subscription-fee.md": {
	id: "distrokid-s-new--labels---because-your-uncle-s-maskandi-is-finally-worth-a-subscription-fee.md";
  slug: "distrokid-s-new--labels---because-your-uncle-s-maskandi-is-finally-worth-a-subscription-fee";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"divergent-paths-at-india-ai-summit--openai-and-anthropic-navigate-global-governance.md": {
	id: "divergent-paths-at-india-ai-summit--openai-and-anthropic-navigate-global-governance.md";
  slug: "divergent-paths-at-india-ai-summit--openai-and-anthropic-navigate-global-governance";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"divorce-regret-statistics-mental-health-statistics.md": {
	id: "divorce-regret-statistics-mental-health-statistics.md";
  slug: "divorce-regret-statistics-mental-health-statistics";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dj-gasket--is-he-a-musical-philanthropist-or-just-desperate-for-a-viral-hit.md": {
	id: "dj-gasket--is-he-a-musical-philanthropist-or-just-desperate-for-a-viral-hit.md";
  slug: "dj-gasket--is-he-a-musical-philanthropist-or-just-desperate-for-a-viral-hit";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dj-pinye-s-childhood-home--where-it-all-began---a-nostalgic-look-at-the-past.md": {
	id: "dj-pinye-s-childhood-home--where-it-all-began---a-nostalgic-look-at-the-past.md";
  slug: "dj-pinye-s-childhood-home--where-it-all-began---a-nostalgic-look-at-the-past";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dna-results-settle-bahati-s-mother-drama---now-about-your-digital-privacy.md": {
	id: "dna-results-settle-bahati-s-mother-drama---now-about-your-digital-privacy.md";
  slug: "dna-results-settle-bahati-s-mother-drama---now-about-your-digital-privacy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dockers-adrift--bandari-fc-s--big-changes--are-just-the-same-old-coastal-delusions.md": {
	id: "dockers-adrift--bandari-fc-s--big-changes--are-just-the-same-old-coastal-delusions.md";
  slug: "dockers-adrift--bandari-fc-s--big-changes--are-just-the-same-old-coastal-delusions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"doctors-fail-to-detect-ai-x-ray-forgeries--exposing-systemic-scam-risk.md": {
	id: "doctors-fail-to-detect-ai-x-ray-forgeries--exposing-systemic-scam-risk.md";
  slug: "doctors-fail-to-detect-ai-x-ray-forgeries--exposing-systemic-scam-risk";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"doctors-fail-to-spot-ai-x-rays--scam-risks-escalate.md": {
	id: "doctors-fail-to-spot-ai-x-rays--scam-risks-escalate.md";
  slug: "doctors-fail-to-spot-ai-x-rays--scam-risks-escalate";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"doge-operatives--new-haunts--a-cynical-look-at-where-the--efficiency--experts-landed.md": {
	id: "doge-operatives--new-haunts--a-cynical-look-at-where-the--efficiency--experts-landed.md";
  slug: "doge-operatives--new-haunts--a-cynical-look-at-where-the--efficiency--experts-landed";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"doge-operatives--new-haunts--from-government-wreckage-to-silicon-valley-shadows.md": {
	id: "doge-operatives--new-haunts--from-government-wreckage-to-silicon-valley-shadows.md";
  slug: "doge-operatives--new-haunts--from-government-wreckage-to-silicon-valley-shadows";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"doha-diaries--when-the-glitter-meets-the-grime-and-the-embassy-panics.md": {
	id: "doha-diaries--when-the-glitter-meets-the-grime-and-the-embassy-panics.md";
  slug: "doha-diaries--when-the-glitter-meets-the-grime-and-the-embassy-panics";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"doja-cat-s-global-citizen-rebrand--from-internet-troll-to-african-activist.md": {
	id: "doja-cat-s-global-citizen-rebrand--from-internet-troll-to-african-activist.md";
  slug: "doja-cat-s-global-citizen-rebrand--from-internet-troll-to-african-activist";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dow-futures-waver-as-markets-await-amazon-earnings-report.md": {
	id: "dow-futures-waver-as-markets-await-amazon-earnings-report.md";
  slug: "dow-futures-waver-as-markets-await-amazon-earnings-report";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dp-kindiki--cs-wandayi-defend-g-to-g-deal--link-fuel-price-surge-to-global-crisis.md": {
	id: "dp-kindiki--cs-wandayi-defend-g-to-g-deal--link-fuel-price-surge-to-global-crisis.md";
  slug: "dp-kindiki--cs-wandayi-defend-g-to-g-deal--link-fuel-price-surge-to-global-crisis";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dp-kindiki-demands-sh450m-more-for-fancy-rides-and-fancy-meals--while-the-rest-of-us-scrape-by.md": {
	id: "dp-kindiki-demands-sh450m-more-for-fancy-rides-and-fancy-meals--while-the-rest-of-us-scrape-by.md";
  slug: "dp-kindiki-demands-sh450m-more-for-fancy-rides-and-fancy-meals--while-the-rest-of-us-scrape-by";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dpp-secures-arrest-warrant-for-immigration-officer-over-human-trafficking-charges.md": {
	id: "dpp-secures-arrest-warrant-for-immigration-officer-over-human-trafficking-charges.md";
  slug: "dpp-secures-arrest-warrant-for-immigration-officer-over-human-trafficking-charges";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dr--o-bwaka-s-final-errand--woman-detained-after-doctor-collapses-in-kitengela.md": {
	id: "dr--o-bwaka-s-final-errand--woman-detained-after-doctor-collapses-in-kitengela.md";
  slug: "dr--o-bwaka-s-final-errand--woman-detained-after-doctor-collapses-in-kitengela";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"duale-s-digital-dreams-vs--the-reality-of-empty-shelves.md": {
	id: "duale-s-digital-dreams-vs--the-reality-of-empty-shelves.md";
  slug: "duale-s-digital-dreams-vs--the-reality-of-empty-shelves";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dubai-dreams-turn-into-nightmares-as-our--blessed--influencers-scramble-for-safety.md": {
	id: "dubai-dreams-turn-into-nightmares-as-our--blessed--influencers-scramble-for-safety.md";
  slug: "dubai-dreams-turn-into-nightmares-as-our--blessed--influencers-scramble-for-safety";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dublin-s-gaelic-football-dynasty-faces-critical-succession-test-ahead-of-kerry-showdown.md": {
	id: "dublin-s-gaelic-football-dynasty-faces-critical-succession-test-ahead-of-kerry-showdown.md";
  slug: "dublin-s-gaelic-football-dynasty-faces-critical-succession-test-ahead-of-kerry-showdown";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dudley-library-book-loaned-and-returned--down-under----a-testament-to-global-indifference.md": {
	id: "dudley-library-book-loaned-and-returned--down-under----a-testament-to-global-indifference.md";
  slug: "dudley-library-book-loaned-and-returned--down-under----a-testament-to-global-indifference";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dudley-library-book-returns-down-under--a-monument-to-global-incompetence.md": {
	id: "dudley-library-book-returns-down-under--a-monument-to-global-incompetence.md";
  slug: "dudley-library-book-returns-down-under--a-monument-to-global-incompetence";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dudley-library-book-s--incredible-journey--to-australia---a-monument-to-incompetence.md": {
	id: "dudley-library-book-s--incredible-journey--to-australia---a-monument-to-incompetence.md";
  slug: "dudley-library-book-s--incredible-journey--to-australia---a-monument-to-incompetence";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"e-waste-report-exposes-nairobi-s-toxic-dumping-ground--korogocho-suffers.md": {
	id: "e-waste-report-exposes-nairobi-s-toxic-dumping-ground--korogocho-suffers.md";
  slug: "e-waste-report-exposes-nairobi-s-toxic-dumping-ground--korogocho-suffers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"early-galaxy-s26-ultra-acquisition-reveals-privacy-display--design--more--gallery.md": {
	id: "early-galaxy-s26-ultra-acquisition-reveals-privacy-display--design--more--gallery.md";
  slug: "early-galaxy-s26-ultra-acquisition-reveals-privacy-display--design--more--gallery";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"eastern-conference-leaders-face-critical-test-as-nba-season-resumes.md": {
	id: "eastern-conference-leaders-face-critical-test-as-nba-season-resumes.md";
  slug: "eastern-conference-leaders-face-critical-test-as-nba-season-resumes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"eddy-kenzo-s-ego-trip--is-he-really-uganda-s-biggest-export.md": {
	id: "eddy-kenzo-s-ego-trip--is-he-really-uganda-s-biggest-export.md";
  slug: "eddy-kenzo-s-ego-trip--is-he-really-uganda-s-biggest-export";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"edward--big-balls--coristine-aids-viral-fraud-videos--exposing-government-incompetence.md": {
	id: "edward--big-balls--coristine-aids-viral-fraud-videos--exposing-government-incompetence.md";
  slug: "edward--big-balls--coristine-aids-viral-fraud-videos--exposing-government-incompetence";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"eighty-year-old-scammed-out-of--285k--blames-schwab-for-negligence.md": {
	id: "eighty-year-old-scammed-out-of--285k--blames-schwab-for-negligence.md";
  slug: "eighty-year-old-scammed-out-of--285k--blames-schwab-for-negligence";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ekuru-aukot--kenya-police-misused-in-haiti-mission--some-people-claim.md": {
	id: "ekuru-aukot--kenya-police-misused-in-haiti-mission--some-people-claim.md";
  slug: "ekuru-aukot--kenya-police-misused-in-haiti-mission--some-people-claim";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"el-clasico--more-like-el-chaos-ico--madrid-s-petty-war-on-barca-is-the-messiest-tea-in-europe.md": {
	id: "el-clasico--more-like-el-chaos-ico--madrid-s-petty-war-on-barca-is-the-messiest-tea-in-europe.md";
  slug: "el-clasico--more-like-el-chaos-ico--madrid-s-petty-war-on-barca-is-the-messiest-tea-in-europe";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"el-clasico-or-el-scandal--real-madrid-is-playing-the-ultimate-mean-girl-in-barcelona-s-referee-nightmare.md": {
	id: "el-clasico-or-el-scandal--real-madrid-is-playing-the-ultimate-mean-girl-in-barcelona-s-referee-nightmare.md";
  slug: "el-clasico-or-el-scandal--real-madrid-is-playing-the-ultimate-mean-girl-in-barcelona-s-referee-nightmare";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"eliud-kipchoge-embarks-on-new-olympic-journey-as-flag-bearer-at-milano-cortina-2026-winter-games.md": {
	id: "eliud-kipchoge-embarks-on-new-olympic-journey-as-flag-bearer-at-milano-cortina-2026-winter-games.md";
  slug: "eliud-kipchoge-embarks-on-new-olympic-journey-as-flag-bearer-at-milano-cortina-2026-winter-games";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ella-mai-s-south-african-debut--more-than-just-boo-d-up-tears.md": {
	id: "ella-mai-s-south-african-debut--more-than-just-boo-d-up-tears.md";
  slug: "ella-mai-s-south-african-debut--more-than-just-boo-d-up-tears";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"elon-s-18-2-billion-shilling-meltdown--when--free-speech--hits-a-very-expensive-wall.md": {
	id: "elon-s-18-2-billion-shilling-meltdown--when--free-speech--hits-a-very-expensive-wall.md";
  slug: "elon-s-18-2-billion-shilling-meltdown--when--free-speech--hits-a-very-expensive-wall";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"elsevier-retracts-papers-amidst-citation-cartel-allegations-tied-to-professor-lucey.md": {
	id: "elsevier-retracts-papers-amidst-citation-cartel-allegations-tied-to-professor-lucey.md";
  slug: "elsevier-retracts-papers-amidst-citation-cartel-allegations-tied-to-professor-lucey";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"embattled-fkf-boss-rejects-suspension--reveals-reason-behind-chan-scandal.md": {
	id: "embattled-fkf-boss-rejects-suspension--reveals-reason-behind-chan-scandal.md";
  slug: "embattled-fkf-boss-rejects-suspension--reveals-reason-behind-chan-scandal";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"empty-trophies-and-zero-point-shame--the-kenyan-football-circus.md": {
	id: "empty-trophies-and-zero-point-shame--the-kenyan-football-circus.md";
  slug: "empty-trophies-and-zero-point-shame--the-kenyan-football-circus";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"energy-top-brass-arrested--ps-liban--epra-boss--md-sang-nabbed-in-fuel-scam.md": {
	id: "energy-top-brass-arrested--ps-liban--epra-boss--md-sang-nabbed-in-fuel-scam.md";
  slug: "energy-top-brass-arrested--ps-liban--epra-boss--md-sang-nabbed-in-fuel-scam";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"england-based-duo-vyner--obiero-get-harambee-stars-call-ups---for-what-exactly.md": {
	id: "england-based-duo-vyner--obiero-get-harambee-stars-call-ups---for-what-exactly.md";
  slug: "england-based-duo-vyner--obiero-get-harambee-stars-call-ups---for-what-exactly";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"english-press-rips-apart--destroyed--manchester-city--calls-guardiola-a-tactical-novice.md": {
	id: "english-press-rips-apart--destroyed--manchester-city--calls-guardiola-a-tactical-novice.md";
  slug: "english-press-rips-apart--destroyed--manchester-city--calls-guardiola-a-tactical-novice";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"epstein-files-release-investigation-launched-by-us-government-watchdog--as-usual.md": {
	id: "epstein-files-release-investigation-launched-by-us-government-watchdog--as-usual.md";
  slug: "epstein-files-release-investigation-launched-by-us-government-watchdog--as-usual";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"equities-advance-ahead-of-fed-minutes--tech-sector--led-by-nvidia--shows-strength.md": {
	id: "equities-advance-ahead-of-fed-minutes--tech-sector--led-by-nvidia--shows-strength.md";
  slug: "equities-advance-ahead-of-fed-minutes--tech-sector--led-by-nvidia--shows-strength";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"eric-omondi-s-polygamous-family-saga--another-comedian-s--real--life-revealed.md": {
	id: "eric-omondi-s-polygamous-family-saga--another-comedian-s--real--life-revealed.md";
  slug: "eric-omondi-s-polygamous-family-saga--another-comedian-s--real--life-revealed";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"eternal-delusions--a-quiet-ep-for-a-country-loudly-drowning.md": {
	id: "eternal-delusions--a-quiet-ep-for-a-country-loudly-drowning.md";
  slug: "eternal-delusions--a-quiet-ep-for-a-country-loudly-drowning";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ethiopia-s-economic-path--reform-momentum--regional-comparisons--and-the-usual-lies.md": {
	id: "ethiopia-s-economic-path--reform-momentum--regional-comparisons--and-the-usual-lies.md";
  slug: "ethiopia-s-economic-path--reform-momentum--regional-comparisons--and-the-usual-lies";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"eu-fisheries-failure-senegal-policy-collapse.md": {
	id: "eu-fisheries-failure-senegal-policy-collapse.md";
  slug: "eu-fisheries-failure-senegal-policy-collapse";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"eu-launches-formal-investigation-into-shein-over-alleged-illegal-products--including-childlike-sex-dolls-and-weapons.md": {
	id: "eu-launches-formal-investigation-into-shein-over-alleged-illegal-products--including-childlike-sex-dolls-and-weapons.md";
  slug: "eu-launches-formal-investigation-into-shein-over-alleged-illegal-products--including-childlike-sex-dolls-and-weapons";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"eu-orders-tiktok-to-fix--addictive--design-or-face-massive-fines.md": {
	id: "eu-orders-tiktok-to-fix--addictive--design-or-face-massive-fines.md";
  slug: "eu-orders-tiktok-to-fix--addictive--design-or-face-massive-fines";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ex-police--magician--tyson-otieno-squeezes-into-afc-leopards--but-will-it-last.md": {
	id: "ex-police--magician--tyson-otieno-squeezes-into-afc-leopards--but-will-it-last.md";
  slug: "ex-police--magician--tyson-otieno-squeezes-into-afc-leopards--but-will-it-last";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ex-rift-valley-boss-tom-odero-now-in-charge-of-nairobi-metropolitan---what-could-go-wrong.md": {
	id: "ex-rift-valley-boss-tom-odero-now-in-charge-of-nairobi-metropolitan---what-could-go-wrong.md";
  slug: "ex-rift-valley-boss-tom-odero-now-in-charge-of-nairobi-metropolitan---what-could-go-wrong";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"exporting-meat-and-importing-impunity.md": {
	id: "exporting-meat-and-importing-impunity.md";
  slug: "exporting-meat-and-importing-impunity";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"exporting-souls-and-empty-bonds.md": {
	id: "exporting-souls-and-empty-bonds.md";
  slug: "exporting-souls-and-empty-bonds";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"exporting-the-unemployed-into-a-war-zone.md": {
	id: "exporting-the-unemployed-into-a-war-zone.md";
  slug: "exporting-the-unemployed-into-a-war-zone";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"exposed--the-secret-corporate-scam-behind-afrofuture-s-new--friendship--anthem.md": {
	id: "exposed--the-secret-corporate-scam-behind-afrofuture-s-new--friendship--anthem.md";
  slug: "exposed--the-secret-corporate-scam-behind-afrofuture-s-new--friendship--anthem";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"exposing-the--soft-life--scam--vicky-ajok-and-the-syrian-death-trap.md": {
	id: "exposing-the--soft-life--scam--vicky-ajok-and-the-syrian-death-trap.md";
  slug: "exposing-the--soft-life--scam--vicky-ajok-and-the-syrian-death-trap";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"facebook--whatsapp--and-messenger-get-new-scams--a-study-in-futility.md": {
	id: "facebook--whatsapp--and-messenger-get-new-scams--a-study-in-futility.md";
  slug: "facebook--whatsapp--and-messenger-get-new-scams--a-study-in-futility";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"facing-the-fallout-a-womans-guide-to-healing-after-infidelity-and-reconciliation.md": {
	id: "facing-the-fallout-a-womans-guide-to-healing-after-infidelity-and-reconciliation.md";
  slug: "facing-the-fallout-a-womans-guide-to-healing-after-infidelity-and-reconciliation";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fades--fame--and-foreigners--joseph-cutz-s-thirst-for-the-ultimate-clout-cut.md": {
	id: "fades--fame--and-foreigners--joseph-cutz-s-thirst-for-the-ultimate-clout-cut.md";
  slug: "fades--fame--and-foreigners--joseph-cutz-s-thirst-for-the-ultimate-clout-cut";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fai-maintains-fixture-commitments-amid-political-calls-for-israel-boycott.md": {
	id: "fai-maintains-fixture-commitments-amid-political-calls-for-israel-boycott.md";
  slug: "fai-maintains-fixture-commitments-amid-political-calls-for-israel-boycott";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"faith-kipyegon-s-exit-strategy--is-the-track-too-small-for-the-smiling-assassin-s-ego.md": {
	id: "faith-kipyegon-s-exit-strategy--is-the-track-too-small-for-the-smiling-assassin-s-ego.md";
  slug: "faith-kipyegon-s-exit-strategy--is-the-track-too-small-for-the-smiling-assassin-s-ego";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"faith-over-frets--1-000--students-flock-to-nakuru-for-another-faith-and-leadership-rally--because-apparently--social-media-isn-t-enough.md": {
	id: "faith-over-frets--1-000--students-flock-to-nakuru-for-another-faith-and-leadership-rally--because-apparently--social-media-isn-t-enough.md";
  slug: "faith-over-frets--1-000--students-flock-to-nakuru-for-another-faith-and-leadership-rally--because-apparently--social-media-isn-t-enough";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fake-ai-videos-of-uk-urban-decline--the-digital-deception-for-social-media-dominance.md": {
	id: "fake-ai-videos-of-uk-urban-decline--the-digital-deception-for-social-media-dominance.md";
  slug: "fake-ai-videos-of-uk-urban-decline--the-digital-deception-for-social-media-dominance";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"family-friendly-tv-drama-crookhaven-s-hopeful-bid-to-become-latest-book-adaptation-hit--a-shallow-endeavor.md": {
	id: "family-friendly-tv-drama-crookhaven-s-hopeful-bid-to-become-latest-book-adaptation-hit--a-shallow-endeavor.md";
  slug: "family-friendly-tv-drama-crookhaven-s-hopeful-bid-to-become-latest-book-adaptation-hit--a-shallow-endeavor";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fast-food-fame--why-yang-ke-and-chongqing-s-content-mill-are-the-death-of-cinema.md": {
	id: "fast-food-fame--why-yang-ke-and-chongqing-s-content-mill-are-the-death-of-cinema.md";
  slug: "fast-food-fame--why-yang-ke-and-chongqing-s-content-mill-are-the-death-of-cinema";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"faster-than-the-law--kenya-s-doping-hall-of-shame-grows.md": {
	id: "faster-than-the-law--kenya-s-doping-hall-of-shame-grows.md";
  slug: "faster-than-the-law--kenya-s-doping-hall-of-shame-grows";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fbi-releases-photos-of-armed--masked-man-outside-nancy-guthrie-s-home.md": {
	id: "fbi-releases-photos-of-armed--masked-man-outside-nancy-guthrie-s-home.md";
  slug: "fbi-releases-photos-of-armed--masked-man-outside-nancy-guthrie-s-home";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fbi-s-epstein-files-breached-by-incompetent-hacker.md": {
	id: "fbi-s-epstein-files-breached-by-incompetent-hacker.md";
  slug: "fbi-s-epstein-files-breached-by-incompetent-hacker";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fbi-s-epstein-files-exposed-by-accidental-hacker-break-in--revealing-bureau-s-own-incompetence.md": {
	id: "fbi-s-epstein-files-exposed-by-accidental-hacker-break-in--revealing-bureau-s-own-incompetence.md";
  slug: "fbi-s-epstein-files-exposed-by-accidental-hacker-break-in--revealing-bureau-s-own-incompetence";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fbi-s-epstein-files-exposed-by-incompetent-hacker.md": {
	id: "fbi-s-epstein-files-exposed-by-incompetent-hacker.md";
  slug: "fbi-s-epstein-files-exposed-by-incompetent-hacker";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fede-valverde-opens-up-on-real-madrid-captaincy-difficulties.md": {
	id: "fede-valverde-opens-up-on-real-madrid-captaincy-difficulties.md";
  slug: "fede-valverde-opens-up-on-real-madrid-captaincy-difficulties";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"felista-mugo--kenya-s-first-female-mma-fighter-in-pfl-africa---is-it-history-or-just-more-hot-air.md": {
	id: "felista-mugo--kenya-s-first-female-mma-fighter-in-pfl-africa---is-it-history-or-just-more-hot-air.md";
  slug: "felista-mugo--kenya-s-first-female-mma-fighter-in-pfl-africa---is-it-history-or-just-more-hot-air";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fencing-queen-or-pr-puppet--alexandra-ndolo-s-golden-medals-can-t-buy-competent-officials.md": {
	id: "fencing-queen-or-pr-puppet--alexandra-ndolo-s-golden-medals-can-t-buy-competent-officials.md";
  slug: "fencing-queen-or-pr-puppet--alexandra-ndolo-s-golden-medals-can-t-buy-competent-officials";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ferdinand-omanyala-building-next-generation-of-kenyan-sprinters---with-a-side-of-holiday-camp.md": {
	id: "ferdinand-omanyala-building-next-generation-of-kenyan-sprinters---with-a-side-of-holiday-camp.md";
  slug: "ferdinand-omanyala-building-next-generation-of-kenyan-sprinters---with-a-side-of-holiday-camp";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fifa-s-48-team-bloat--the-death-of-quality-for-profit.md": {
	id: "fifa-s-48-team-bloat--the-death-of-quality-for-profit.md";
  slug: "fifa-s-48-team-bloat--the-death-of-quality-for-profit";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fifa-series--kenya-s-starlets-face-the-heat-against-australia--india-in-nairobi.md": {
	id: "fifa-series--kenya-s-starlets-face-the-heat-against-australia--india-in-nairobi.md";
  slug: "fifa-series--kenya-s-starlets-face-the-heat-against-australia--india-in-nairobi";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fifa-steps-in-amid-ksh42-million-fkf-scandal--shocker.md": {
	id: "fifa-steps-in-amid-ksh42-million-fkf-scandal--shocker.md";
  slug: "fifa-steps-in-amid-ksh42-million-fkf-scandal--shocker";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"final-kenyan-cops-return-from-22-month-haiti-mission--call-it-a-win.md": {
	id: "final-kenyan-cops-return-from-22-month-haiti-mission--call-it-a-win.md";
  slug: "final-kenyan-cops-return-from-22-month-haiti-mission--call-it-a-win";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"finance-daily-2026-02-01.md": {
	id: "finance-daily-2026-02-01.md";
  slug: "imf-sick-obsession-kenyan-taxes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"first-world-problems--third-world-solutions--germany-discovers-the-thika-tunnel.md": {
	id: "first-world-problems--third-world-solutions--germany-discovers-the-thika-tunnel.md";
  slug: "first-world-problems--third-world-solutions--germany-discovers-the-thika-tunnel";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fkf-awards--ghost--walkovers-amidst-wpl-boycott-crisis---nairobi-realist.md": {
	id: "fkf-awards--ghost--walkovers-amidst-wpl-boycott-crisis---nairobi-realist.md";
  slug: "fkf-awards--ghost--walkovers-amidst-wpl-boycott-crisis---nairobi-realist";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fkf-premier-league-title-race-blazes-on---as-if-anyone-cares.md": {
	id: "fkf-premier-league-title-race-blazes-on---as-if-anyone-cares.md";
  slug: "fkf-premier-league-title-race-blazes-on---as-if-anyone-cares";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fkf-president-suspended-over-ksh42-million-scandal.md": {
	id: "fkf-president-suspended-over-ksh42-million-scandal.md";
  slug: "fkf-president-suspended-over-ksh42-million-scandal";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fkf-sportpesa-league-round-24--referees-confirmed-while-we-all-just-watch.md": {
	id: "fkf-sportpesa-league-round-24--referees-confirmed-while-we-all-just-watch.md";
  slug: "fkf-sportpesa-league-round-24--referees-confirmed-while-we-all-just-watch";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fkf-suspension-of-hussein-mohammed-over-sh42-million-scandal-is-just-another-day-in-kenyan-football-chaos.md": {
	id: "fkf-suspension-of-hussein-mohammed-over-sh42-million-scandal-is-just-another-day-in-kenyan-football-chaos.md";
  slug: "fkf-suspension-of-hussein-mohammed-over-sh42-million-scandal-is-just-another-day-in-kenyan-football-chaos";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fkf-women-s-premier-league-teams-threaten-match-boycott-over-unresolved-funding-issues.md": {
	id: "fkf-women-s-premier-league-teams-threaten-match-boycott-over-unresolved-funding-issues.md";
  slug: "fkf-women-s-premier-league-teams-threaten-match-boycott-over-unresolved-funding-issues";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"flirty-emails-and-fire-sales--casey-wasserman-s-epstein-hangover.md": {
	id: "flirty-emails-and-fire-sales--casey-wasserman-s-epstein-hangover.md";
  slug: "flirty-emails-and-fire-sales--casey-wasserman-s-epstein-hangover";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"flo-s--bombastic--new-era--a-desperate-attempt-to-revive-fading-chart-fortunes.md": {
	id: "flo-s--bombastic--new-era--a-desperate-attempt-to-revive-fading-chart-fortunes.md";
  slug: "flo-s--bombastic--new-era--a-desperate-attempt-to-revive-fading-chart-fortunes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"florida-panther-lucy-dies-after-cancer-fight.md": {
	id: "florida-panther-lucy-dies-after-cancer-fight.md";
  slug: "florida-panther-lucy-dies-after-cancer-fight";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"flying-high-on-your-empty-pockets--the-pararescue-circus.md": {
	id: "flying-high-on-your-empty-pockets--the-pararescue-circus.md";
  slug: "flying-high-on-your-empty-pockets--the-pararescue-circus";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fog-s-mysterious-demise--our-last-chance-to-understand-it-is-slipping-away.md": {
	id: "fog-s-mysterious-demise--our-last-chance-to-understand-it-is-slipping-away.md";
  slug: "fog-s-mysterious-demise--our-last-chance-to-understand-it-is-slipping-away";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fog-s-mystery-deepens-as-climate-change-threatens-our-last-chance-to-understand-it.md": {
	id: "fog-s-mystery-deepens-as-climate-change-threatens-our-last-chance-to-understand-it.md";
  slug: "fog-s-mystery-deepens-as-climate-change-threatens-our-last-chance-to-understand-it";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"for-all-mankind--season-5-transitions-away-from-what-made-it-great--delays-any-real-excitement.md": {
	id: "for-all-mankind--season-5-transitions-away-from-what-made-it-great--delays-any-real-excitement.md";
  slug: "for-all-mankind--season-5-transitions-away-from-what-made-it-great--delays-any-real-excitement";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"for-all-mankind-season-5--a-beautifully-mediocre-setup-for-a-series-running-on-fumes.md": {
	id: "for-all-mankind-season-5--a-beautifully-mediocre-setup-for-a-series-running-on-fumes.md";
  slug: "for-all-mankind-season-5--a-beautifully-mediocre-setup-for-a-series-running-on-fumes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"for-all-mankind-season-5-beautifully-sets-the-series-up-for-the-future---for-a-future-you-ll-likely-pay-for.md": {
	id: "for-all-mankind-season-5-beautifully-sets-the-series-up-for-the-future---for-a-future-you-ll-likely-pay-for.md";
  slug: "for-all-mankind-season-5-beautifully-sets-the-series-up-for-the-future---for-a-future-you-ll-likely-pay-for";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"for-sale--one-kenyan-sovereignty--slightly-used-by-warlords.md": {
	id: "for-sale--one-kenyan-sovereignty--slightly-used-by-warlords.md";
  slug: "for-sale--one-kenyan-sovereignty--slightly-used-by-warlords";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"foreign-suspect-busted-with-heroin-in-mombasa--dci-claims-operation-success.md": {
	id: "foreign-suspect-busted-with-heroin-in-mombasa--dci-claims-operation-success.md";
  slug: "foreign-suspect-busted-with-heroin-in-mombasa--dci-claims-operation-success";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"forged-for-fortune--ex-ag-karugu-s-will-row-over-sh400m-bonds--land.md": {
	id: "forged-for-fortune--ex-ag-karugu-s-will-row-over-sh400m-bonds--land.md";
  slug: "forged-for-fortune--ex-ag-karugu-s-will-row-over-sh400m-bonds--land";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"forget-the-blue-tick--the-kenyan-passport-is-the-new-vip-access-for-the-international-sanctioned-elite.md": {
	id: "forget-the-blue-tick--the-kenyan-passport-is-the-new-vip-access-for-the-international-sanctioned-elite.md";
  slug: "forget-the-blue-tick--the-kenyan-passport-is-the-new-vip-access-for-the-international-sanctioned-elite";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"forget-the-boarding-pass-flex--the-klia-mystery-is-the-only-viral-content-we-didn-t-ask-for.md": {
	id: "forget-the-boarding-pass-flex--the-klia-mystery-is-the-only-viral-content-we-didn-t-ask-for.md";
  slug: "forget-the-boarding-pass-flex--the-klia-mystery-is-the-only-viral-content-we-didn-t-ask-for";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"former-energy-chiefs-held-over-sh4-8-billion-fuel-import-scandal-released-on-police-bail.md": {
	id: "former-energy-chiefs-held-over-sh4-8-billion-fuel-import-scandal-released-on-police-bail.md";
  slug: "former-energy-chiefs-held-over-sh4-8-billion-fuel-import-scandal-released-on-police-bail";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"former-french-minister-jack-lang-denies-epstein-linked-allegations-amid-new-financial-probe.md": {
	id: "former-french-minister-jack-lang-denies-epstein-linked-allegations-amid-new-financial-probe.md";
  slug: "former-french-minister-jack-lang-denies-epstein-linked-allegations-amid-new-financial-probe";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"former-laikipia-north-mp-matthew-lempurkel-is-dead.md": {
	id: "former-laikipia-north-mp-matthew-lempurkel-is-dead.md";
  slug: "former-laikipia-north-mp-matthew-lempurkel-is-dead";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"former-xbox-president-sarah-bond-bids-farewell-amid-leadership-transition.md": {
	id: "former-xbox-president-sarah-bond-bids-farewell-amid-leadership-transition.md";
  slug: "former-xbox-president-sarah-bond-bids-farewell-amid-leadership-transition";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fossil-fuel-feudalism--washington-bets-american-wallets-on-global-energy-hegemony.md": {
	id: "fossil-fuel-feudalism--washington-bets-american-wallets-on-global-energy-hegemony.md";
  slug: "fossil-fuel-feudalism--washington-bets-american-wallets-on-global-energy-hegemony";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"found--mystery-science-theater-3000--episode--another-relic-surfaces-in-a-world-drowning-in-content.md": {
	id: "found--mystery-science-theater-3000--episode--another-relic-surfaces-in-a-world-drowning-in-content.md";
  slug: "found--mystery-science-theater-3000--episode--another-relic-surfaces-in-a-world-drowning-in-content";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"four-arrested-over-scottish-businessman-murder-in-kenya---another-day--another-sack.md": {
	id: "four-arrested-over-scottish-businessman-murder-in-kenya---another-day--another-sack.md";
  slug: "four-arrested-over-scottish-businessman-murder-in-kenya---another-day--another-sack";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fourth-contingent-of-kenyan-police-officers-return-from-haiti-as-mission-drawdown-turns-into-another-un-shambles.md": {
	id: "fourth-contingent-of-kenyan-police-officers-return-from-haiti-as-mission-drawdown-turns-into-another-un-shambles.md";
  slug: "fourth-contingent-of-kenyan-police-officers-return-from-haiti-as-mission-drawdown-turns-into-another-un-shambles";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"france-africa-summit--kenya-defends-inviting-paris--while-the-continent-reels.md": {
	id: "france-africa-summit--kenya-defends-inviting-paris--while-the-continent-reels.md";
  slug: "france-africa-summit--kenya-defends-inviting-paris--while-the-continent-reels";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"france-africa-summit--west-african-designers-turn-to-nairobi.md": {
	id: "france-africa-summit--west-african-designers-turn-to-nairobi.md";
  slug: "france-africa-summit--west-african-designers-turn-to-nairobi";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"france-and-kenya-team-up-to--fix--online-creeps---but-is-it-just-for-show.md": {
	id: "france-and-kenya-team-up-to--fix--online-creeps---but-is-it-just-for-show.md";
  slug: "france-and-kenya-team-up-to--fix--online-creeps---but-is-it-just-for-show";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"france-s--ghost-car--scandal--a-million-illegally-registered-vehicles-underscore-state-incompetence.md": {
	id: "france-s--ghost-car--scandal--a-million-illegally-registered-vehicles-underscore-state-incompetence.md";
  slug: "france-s--ghost-car--scandal--a-million-illegally-registered-vehicles-underscore-state-incompetence";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"france-s--ghost-car--scandal--a-million-unsafe-vehicles--billions-lost--and-criminals-rewarded.md": {
	id: "france-s--ghost-car--scandal--a-million-unsafe-vehicles--billions-lost--and-criminals-rewarded.md";
  slug: "france-s--ghost-car--scandal--a-million-unsafe-vehicles--billions-lost--and-criminals-rewarded";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"france-s-ghost-car-scandal--one-million-illegal-vehicles-expose-systemic-rot.md": {
	id: "france-s-ghost-car-scandal--one-million-illegal-vehicles-expose-systemic-rot.md";
  slug: "france-s-ghost-car-scandal--one-million-illegal-vehicles-expose-systemic-rot";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"francis-galluppi-s-mystery--evil-dead--movie-has-found-its-cast.md": {
	id: "francis-galluppi-s-mystery--evil-dead--movie-has-found-its-cast.md";
  slug: "francis-galluppi-s-mystery--evil-dead--movie-has-found-its-cast";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fredy-jakadongo-music-exit-official-statement--an-era-ends--or-just-a-pause.md": {
	id: "fredy-jakadongo-music-exit-official-statement--an-era-ends--or-just-a-pause.md";
  slug: "fredy-jakadongo-music-exit-official-statement--an-era-ends--or-just-a-pause";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"free-sha-for-inmates-while-you-starve--zakayo-s-newest-pr-stunt-is-a-prison-break-for-logic.md": {
	id: "free-sha-for-inmates-while-you-starve--zakayo-s-newest-pr-stunt-is-a-prison-break-for-logic.md";
  slug: "free-sha-for-inmates-while-you-starve--zakayo-s-newest-pr-stunt-is-a-prison-break-for-logic";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"french-investors-eye-kenya-s-digital--creative-economy---more-likely-to-extract-than-create.md": {
	id: "french-investors-eye-kenya-s-digital--creative-economy---more-likely-to-extract-than-create.md";
  slug: "french-investors-eye-kenya-s-digital--creative-economy---more-likely-to-extract-than-create";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"french-national-jailed-10-years-azerbaijan-for-spying---just-another-pawn-in-geopolitical-chess.md": {
	id: "french-national-jailed-10-years-azerbaijan-for-spying---just-another-pawn-in-geopolitical-chess.md";
  slug: "french-national-jailed-10-years-azerbaijan-for-spying---just-another-pawn-in-geopolitical-chess";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"french-national-sacrificed-in-azerbaijan-spy-charade--10-years-for-unwitting-diplomatic-pawns.md": {
	id: "french-national-sacrificed-in-azerbaijan-spy-charade--10-years-for-unwitting-diplomatic-pawns.md";
  slug: "french-national-sacrificed-in-azerbaijan-spy-charade--10-years-for-unwitting-diplomatic-pawns";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"french-spy-jailed-10-years-in-azerbaijan-amidst-diplomatic-firestorm.md": {
	id: "french-spy-jailed-10-years-in-azerbaijan-amidst-diplomatic-firestorm.md";
  slug: "french-spy-jailed-10-years-in-azerbaijan-amidst-diplomatic-firestorm";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"from-bondo-to-bamburi--the-ak-47-tour-nobody-asked-for.md": {
	id: "from-bondo-to-bamburi--the-ak-47-tour-nobody-asked-for.md";
  slug: "from-bondo-to-bamburi--the-ak-47-tour-nobody-asked-for";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"from-courts-to-courts--why-a-lawyer-running-the-sports-fund-is-the-ultimate-kenyan-joke.md": {
	id: "from-courts-to-courts--why-a-lawyer-running-the-sports-fund-is-the-ultimate-kenyan-joke.md";
  slug: "from-courts-to-courts--why-a-lawyer-running-the-sports-fund-is-the-ultimate-kenyan-joke";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"from-doctor-to-fraud-the-rise-of-fake-honorary-degrees-among-kenyas-political-and-business-class.md": {
	id: "from-doctor-to-fraud-the-rise-of-fake-honorary-degrees-among-kenyas-political-and-business-class.md";
  slug: "from-doctor-to-fraud-the-rise-of-fake-honorary-degrees-among-kenyas-political-and-business-class";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"from-fife-with-love--why-is-kenya-s-national-team-scavenging-on-facebook-marketplace.md": {
	id: "from-fife-with-love--why-is-kenya-s-national-team-scavenging-on-facebook-marketplace.md";
  slug: "from-fife-with-love--why-is-kenya-s-national-team-scavenging-on-facebook-marketplace";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"from-flexing-on-ig-to-filtering-jail-bars--the-27--entrepreneurs--interpol-just-dragged.md": {
	id: "from-flexing-on-ig-to-filtering-jail-bars--the-27--entrepreneurs--interpol-just-dragged.md";
  slug: "from-flexing-on-ig-to-filtering-jail-bars--the-27--entrepreneurs--interpol-just-dragged";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"from-guatemala-s-stolen-babies-to-runda-s-gated-illusions.md": {
	id: "from-guatemala-s-stolen-babies-to-runda-s-gated-illusions.md";
  slug: "from-guatemala-s-stolen-babies-to-runda-s-gated-illusions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"from-hero-to-puppet--victor-osimhen-spills-the-tea-on-napoli-s-social-media-meltdown.md": {
	id: "from-hero-to-puppet--victor-osimhen-spills-the-tea-on-napoli-s-social-media-meltdown.md";
  slug: "from-hero-to-puppet--victor-osimhen-spills-the-tea-on-napoli-s-social-media-meltdown";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"from-job-seekers-to-cannon-fodder--the-zuma-special.md": {
	id: "from-job-seekers-to-cannon-fodder--the-zuma-special.md";
  slug: "from-job-seekers-to-cannon-fodder--the-zuma-special";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"from-koinange-street-to-the-kremlin--selling-kenyan-meat-for-russian-rubles.md": {
	id: "from-koinange-street-to-the-kremlin--selling-kenyan-meat-for-russian-rubles.md";
  slug: "from-koinange-street-to-the-kremlin--selling-kenyan-meat-for-russian-rubles";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"from-nairobi-driver-to-russian-cannon-fodder--the-ultimate-hustle-gone-wrong.md": {
	id: "from-nairobi-driver-to-russian-cannon-fodder--the-ultimate-hustle-gone-wrong.md";
  slug: "from-nairobi-driver-to-russian-cannon-fodder--the-ultimate-hustle-gone-wrong";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"from-nairobi-hustle-to-russian-meat-grinders--the-ultimate-scammer-season.md": {
	id: "from-nairobi-hustle-to-russian-meat-grinders--the-ultimate-scammer-season.md";
  slug: "from-nairobi-hustle-to-russian-meat-grinders--the-ultimate-scammer-season";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"from-pulpits-to-ponzis--the-holy-hustle-of-optcoin.md": {
	id: "from-pulpits-to-ponzis--the-holy-hustle-of-optcoin.md";
  slug: "from-pulpits-to-ponzis--the-holy-hustle-of-optcoin";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"from-red-carpet-crashers-to-novelists--how-my-stint-as-a-gossip-reporter-landed-me-a-book-deal.md": {
	id: "from-red-carpet-crashers-to-novelists--how-my-stint-as-a-gossip-reporter-landed-me-a-book-deal.md";
  slug: "from-red-carpet-crashers-to-novelists--how-my-stint-as-a-gossip-reporter-landed-me-a-book-deal";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"from-sidelines-to-search-engines--the-desperate-pivot-of-the-multi-hyphenate-reporter.md": {
	id: "from-sidelines-to-search-engines--the-desperate-pivot-of-the-multi-hyphenate-reporter.md";
  slug: "from-sidelines-to-search-engines--the-desperate-pivot-of-the-multi-hyphenate-reporter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"from-soweto-to-soldier-field--why-mbekezeli-mbokazi-s-american-dream-is-giving-low-budget-sequel.md": {
	id: "from-soweto-to-soldier-field--why-mbekezeli-mbokazi-s-american-dream-is-giving-low-budget-sequel.md";
  slug: "from-soweto-to-soldier-field--why-mbekezeli-mbokazi-s-american-dream-is-giving-low-budget-sequel";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"from-street-hero-to-apartment-puppet--the-short-reign-of-bradley-marongo.md": {
	id: "from-street-hero-to-apartment-puppet--the-short-reign-of-bradley-marongo.md";
  slug: "from-street-hero-to-apartment-puppet--the-short-reign-of-bradley-marongo";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"from-the-ballroom-to-the-bottom-of-your-feed--maksim-chmerkovskiy-pivots-to-vertical-soap-operas.md": {
	id: "from-the-ballroom-to-the-bottom-of-your-feed--maksim-chmerkovskiy-pivots-to-vertical-soap-operas.md";
  slug: "from-the-ballroom-to-the-bottom-of-your-feed--maksim-chmerkovskiy-pivots-to-vertical-soap-operas";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"from-the-morgue-to-the-mainstream--is-collo-blue-s-viral-hit-genuine-healing-or-just-morbid-marketing.md": {
	id: "from-the-morgue-to-the-mainstream--is-collo-blue-s-viral-hit-genuine-healing-or-just-morbid-marketing.md";
  slug: "from-the-morgue-to-the-mainstream--is-collo-blue-s-viral-hit-genuine-healing-or-just-morbid-marketing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"from-tiktok-tiaras-to-handcuffs--the-nasir-egeh-comedy-show.md": {
	id: "from-tiktok-tiaras-to-handcuffs--the-nasir-egeh-comedy-show.md";
  slug: "from-tiktok-tiaras-to-handcuffs--the-nasir-egeh-comedy-show";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"frustrations-as-kenyan-petrol-stations-start-rationing-fuel-ahead-of-epra-review.md": {
	id: "frustrations-as-kenyan-petrol-stations-start-rationing-fuel-ahead-of-epra-review.md";
  slug: "frustrations-as-kenyan-petrol-stations-start-rationing-fuel-ahead-of-epra-review";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fuel-crisis-steals-kenya-s-gains--economy-bleeds---streamline-reports.md": {
	id: "fuel-crisis-steals-kenya-s-gains--economy-bleeds---streamline-reports.md";
  slug: "fuel-crisis-steals-kenya-s-gains--economy-bleeds---streamline-reports";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fuel-price-spike-costs-kenya-20b-in-two-months-as-renewable-push-grows.md": {
	id: "fuel-price-spike-costs-kenya-20b-in-two-months-as-renewable-push-grows.md";
  slug: "fuel-price-spike-costs-kenya-20b-in-two-months-as-renewable-push-grows";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fuel-prices-skyrocket--not-nairobi-s-fault--just-global-chaos-hitting-your-pocket.md": {
	id: "fuel-prices-skyrocket--not-nairobi-s-fault--just-global-chaos-hitting-your-pocket.md";
  slug: "fuel-prices-skyrocket--not-nairobi-s-fault--just-global-chaos-hitting-your-pocket";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fuel-saga--the-tough-questions-that-await-cs-opiyo-wandayi-in-date-with-mps.md": {
	id: "fuel-saga--the-tough-questions-that-await-cs-opiyo-wandayi-in-date-with-mps.md";
  slug: "fuel-saga--the-tough-questions-that-await-cs-opiyo-wandayi-in-date-with-mps";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fuel-scandal--company-reveals-how-it-lost-ksh3-2b-after-govt-cancellation-order.md": {
	id: "fuel-scandal--company-reveals-how-it-lost-ksh3-2b-after-govt-cancellation-order.md";
  slug: "fuel-scandal--company-reveals-how-it-lost-ksh3-2b-after-govt-cancellation-order";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fuel-scandal--liban--sang--bargoria-face-10-years---another-day--another-corrupt-kenyan-official.md": {
	id: "fuel-scandal--liban--sang--bargoria-face-10-years---another-day--another-corrupt-kenyan-official.md";
  slug: "fuel-scandal--liban--sang--bargoria-face-10-years---another-day--another-corrupt-kenyan-official";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fuel-scandal--wandayi-denies-substandard-fuel-entry-claims--cites--controlled-breach.md": {
	id: "fuel-scandal--wandayi-denies-substandard-fuel-entry-claims--cites--controlled-breach.md";
  slug: "fuel-scandal--wandayi-denies-substandard-fuel-entry-claims--cites--controlled-breach";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fuel-scandal--what-do-css-opiyo-wandayi--lee-kinyanjui-really-know.md": {
	id: "fuel-scandal--what-do-css-opiyo-wandayi--lee-kinyanjui-really-know.md";
  slug: "fuel-scandal--what-do-css-opiyo-wandayi--lee-kinyanjui-really-know";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fuel-scandal-files-still-missing--dci-playing-games-with-sang--kiptoo.md": {
	id: "fuel-scandal-files-still-missing--dci-playing-games-with-sang--kiptoo.md";
  slug: "fuel-scandal-files-still-missing--dci-playing-games-with-sang--kiptoo";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fuel-scandal-sees-3-top-energy-officials-resign---what-else-is-new.md": {
	id: "fuel-scandal-sees-3-top-energy-officials-resign---what-else-is-new.md";
  slug: "fuel-scandal-sees-3-top-energy-officials-resign---what-else-is-new";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fuel-shortage--kenyans-need-to-know-the-truth.md": {
	id: "fuel-shortage--kenyans-need-to-know-the-truth.md";
  slug: "fuel-shortage--kenyans-need-to-know-the-truth";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"fueling-the-drama--uganda-s-energy-queen-vs--the-greedy-corporate-clout-chasers.md": {
	id: "fueling-the-drama--uganda-s-energy-queen-vs--the-greedy-corporate-clout-chasers.md";
  slug: "fueling-the-drama--uganda-s-energy-queen-vs--the-greedy-corporate-clout-chasers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gachagua--duale-s-ksh-103b-sha-mess--just-another-nairobi-scam.md": {
	id: "gachagua--duale-s-ksh-103b-sha-mess--just-another-nairobi-scam.md";
  slug: "gachagua--duale-s-ksh-103b-sha-mess--just-another-nairobi-scam";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gachagua-defends-energy-bosses--claims-they-were-importing-cheap-fuel-against-ruto-s-wish.md": {
	id: "gachagua-defends-energy-bosses--claims-they-were-importing-cheap-fuel-against-ruto-s-wish.md";
  slug: "gachagua-defends-energy-bosses--claims-they-were-importing-cheap-fuel-against-ruto-s-wish";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gachagua-whines-about-police--pretending--after-kikuyu-chaos--citizens-do-the-work.md": {
	id: "gachagua-whines-about-police--pretending--after-kikuyu-chaos--citizens-do-the-work.md";
  slug: "gachagua-whines-about-police--pretending--after-kikuyu-chaos--citizens-do-the-work";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"galaxy-ai-transforms-into-multi-agent-ecosystem--integrates-perplexity-ai.md": {
	id: "galaxy-ai-transforms-into-multi-agent-ecosystem--integrates-perplexity-ai.md";
  slug: "galaxy-ai-transforms-into-multi-agent-ecosystem--integrates-perplexity-ai";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"garissa-s-sh731m-ghost-worker-scandal--321--employees--vanish--eacc-recommends-prosecutions.md": {
	id: "garissa-s-sh731m-ghost-worker-scandal--321--employees--vanish--eacc-recommends-prosecutions.md";
  slug: "garissa-s-sh731m-ghost-worker-scandal--321--employees--vanish--eacc-recommends-prosecutions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"garmin-s-trademark-filing-signals-another-me-too-wearable-to-milk-consumers.md": {
	id: "garmin-s-trademark-filing-signals-another-me-too-wearable-to-milk-consumers.md";
  slug: "garmin-s-trademark-filing-signals-another-me-too-wearable-to-milk-consumers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"garmin-trademark-filing-hints-at-yet-another-wearable-copycat.md": {
	id: "garmin-trademark-filing-hints-at-yet-another-wearable-copycat.md";
  slug: "garmin-trademark-filing-hints-at-yet-another-wearable-copycat";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gas--planes--and-audacity--why-kcaa-is-giving--i-don-t-care--energy.md": {
	id: "gas--planes--and-audacity--why-kcaa-is-giving--i-don-t-care--energy.md";
  slug: "gas--planes--and-audacity--why-kcaa-is-giving--i-don-t-care--energy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gemma-collins--mo-farah--scarlett-moffatt--jungle-reunion-or-just-another-grasp-for-relevance.md": {
	id: "gemma-collins--mo-farah--scarlett-moffatt--jungle-reunion-or-just-another-grasp-for-relevance.md";
  slug: "gemma-collins--mo-farah--scarlett-moffatt--jungle-reunion-or-just-another-grasp-for-relevance";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"generational-shift--kenya-s-leaders-stuck-in-the-mud--gen-z-wants-out.md": {
	id: "generational-shift--kenya-s-leaders-stuck-in-the-mud--gen-z-wants-out.md";
  slug: "generational-shift--kenya-s-leaders-stuck-in-the-mud--gen-z-wants-out";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"genoa--de-rossi---a-swap-deal-with-roma--people-just-love-to-gossip---it-s-unbelievable.md": {
	id: "genoa--de-rossi---a-swap-deal-with-roma--people-just-love-to-gossip---it-s-unbelievable.md";
  slug: "genoa--de-rossi---a-swap-deal-with-roma--people-just-love-to-gossip---it-s-unbelievable";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"genomic-diversity-study-on-african-ancestry-and-leukemia-signals-shift-in-precision-medicine-investment.md": {
	id: "genomic-diversity-study-on-african-ancestry-and-leukemia-signals-shift-in-precision-medicine-investment.md";
  slug: "genomic-diversity-study-on-african-ancestry-and-leukemia-signals-shift-in-precision-medicine-investment";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"george-were-s-widow-learned-of-his-chopper-crash-death-via-social-media--shocking--but-are-we-surprised.md": {
	id: "george-were-s-widow-learned-of-his-chopper-crash-death-via-social-media--shocking--but-are-we-surprised.md";
  slug: "george-were-s-widow-learned-of-his-chopper-crash-death-via-social-media--shocking--but-are-we-surprised";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"geospatial-sovereignty--dynamic-map-platform-achieves-coast-to-coast-hd-coverage-in-canada.md": {
	id: "geospatial-sovereignty--dynamic-map-platform-achieves-coast-to-coast-hd-coverage-in-canada.md";
  slug: "geospatial-sovereignty--dynamic-map-platform-achieves-coast-to-coast-hd-coverage-in-canada";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ghana-acts-while-kenya-naps--the-cowardice-of-our-diplomacy.md": {
	id: "ghana-acts-while-kenya-naps--the-cowardice-of-our-diplomacy.md";
  slug: "ghana-acts-while-kenya-naps--the-cowardice-of-our-diplomacy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ghanaian-woman-arrested-trying-to-traffic-child-to-kenya---another-day--another-hustle.md": {
	id: "ghanaian-woman-arrested-trying-to-traffic-child-to-kenya---another-day--another-hustle.md";
  slug: "ghanaian-woman-arrested-trying-to-traffic-child-to-kenya---another-day--another-hustle";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ghosts-of-goldenberg--the-dead-don-t-just-tell-tales--they-send-invoices.md": {
	id: "ghosts-of-goldenberg--the-dead-don-t-just-tell-tales--they-send-invoices.md";
  slug: "ghosts-of-goldenberg--the-dead-don-t-just-tell-tales--they-send-invoices";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gikomba--kenya-s-national-wardrobe-autopsy---another-stab-in-the-back.md": {
	id: "gikomba--kenya-s-national-wardrobe-autopsy---another-stab-in-the-back.md";
  slug: "gikomba--kenya-s-national-wardrobe-autopsy---another-stab-in-the-back";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"girls-paradox-why-women-want-you-more-when-taken.md": {
	id: "girls-paradox-why-women-want-you-more-when-taken.md";
  slug: "girls-paradox-why-women-want-you-more-when-taken";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"glasgow-gets-a-glimpse-of-richard-gadd-and-jamie-bell-s--half-man----but-is-it-worth-the-hype.md": {
	id: "glasgow-gets-a-glimpse-of-richard-gadd-and-jamie-bell-s--half-man----but-is-it-worth-the-hype.md";
  slug: "glasgow-gets-a-glimpse-of-richard-gadd-and-jamie-bell-s--half-man----but-is-it-worth-the-hype";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"glasner-signals-potential-early-exit-as-crystal-palace-slump-deepens.md": {
	id: "glasner-signals-potential-early-exit-as-crystal-palace-slump-deepens.md";
  slug: "glasner-signals-potential-early-exit-as-crystal-palace-slump-deepens";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"global-animal-wound-care-market-projected-to-reach--1-79-billion-by-2030.md": {
	id: "global-animal-wound-care-market-projected-to-reach--1-79-billion-by-2030.md";
  slug: "global-animal-wound-care-market-projected-to-reach--1-79-billion-by-2030";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"global-capital-feasts-on-the-rust-belt-s-last-breath.md": {
	id: "global-capital-feasts-on-the-rust-belt-s-last-breath.md";
  slug: "global-capital-feasts-on-the-rust-belt-s-last-breath";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"global-conflicts-rewrite-kenya-s-economic-playbook---get-ready-for-higher-prices.md": {
	id: "global-conflicts-rewrite-kenya-s-economic-playbook---get-ready-for-higher-prices.md";
  slug: "global-conflicts-rewrite-kenya-s-economic-playbook---get-ready-for-higher-prices";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"global-cx-outsourcing-market-projected-to-reach--171-billion-by-2028-driven-by-ai-integration.md": {
	id: "global-cx-outsourcing-market-projected-to-reach--171-billion-by-2028-driven-by-ai-integration.md";
  slug: "global-cx-outsourcing-market-projected-to-reach--171-billion-by-2028-driven-by-ai-integration";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"global-otc-commodity-trading-market-forecast-to-reach-4-6-billion-dollars-by-2030.md": {
	id: "global-otc-commodity-trading-market-forecast-to-reach-4-6-billion-dollars-by-2030.md";
  slug: "global-otc-commodity-trading-market-forecast-to-reach-4-6-billion-dollars-by-2030";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"global-sports-medicine-braces-for-rising-costs-as-rheumatoid-arthritis-drug-market-surpasses-37-billion-dollars.md": {
	id: "global-sports-medicine-braces-for-rising-costs-as-rheumatoid-arthritis-drug-market-surpasses-37-billion-dollars.md";
  slug: "global-sports-medicine-braces-for-rising-costs-as-rheumatoid-arthritis-drug-market-surpasses-37-billion-dollars";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"glovo-opens-nairobi-hq--promises-ksh-10-billion-by-2030---don-t-hold-your-breath.md": {
	id: "glovo-opens-nairobi-hq--promises-ksh-10-billion-by-2030---don-t-hold-your-breath.md";
  slug: "glovo-opens-nairobi-hq--promises-ksh-10-billion-by-2030---don-t-hold-your-breath";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gold-safety-myth-shatters-in-the-heat-of-war.md": {
	id: "gold-safety-myth-shatters-in-the-heat-of-war.md";
  slug: "gold-safety-myth-shatters-in-the-heat-of-war";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"google-asserts-dominance-in-generative-ai-with-launch-of-gemini-3-1-pro.md": {
	id: "google-asserts-dominance-in-generative-ai-with-launch-of-gemini-3-1-pro.md";
  slug: "google-asserts-dominance-in-generative-ai-with-launch-of-gemini-3-1-pro";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"google-court-filings-indicate-future-end-for-chromeos.md": {
	id: "google-court-filings-indicate-future-end-for-chromeos.md";
  slug: "google-court-filings-indicate-future-end-for-chromeos";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"google-disables-take-a-message-on-older-pixel-phones-amid-audio-leak-bug.md": {
	id: "google-disables-take-a-message-on-older-pixel-phones-amid-audio-leak-bug.md";
  slug: "google-disables-take-a-message-on-older-pixel-phones-amid-audio-leak-bug";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"google-home-introduces-physical-control-interface-upgrades.md": {
	id: "google-home-introduces-physical-control-interface-upgrades.md";
  slug: "google-home-introduces-physical-control-interface-upgrades";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"google-s-android-17-preview-unveils-minor-pixel-11-pro-fold-tweaks--predictably.md": {
	id: "google-s-android-17-preview-unveils-minor-pixel-11-pro-fold-tweaks--predictably.md";
  slug: "google-s-android-17-preview-unveils-minor-pixel-11-pro-fold-tweaks--predictably";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"google-s-pixel-10a-arrives-march-5-for--499-with-specs-and-design-of-yesteryear.md": {
	id: "google-s-pixel-10a-arrives-march-5-for--499-with-specs-and-design-of-yesteryear.md";
  slug: "google-s-pixel-10a-arrives-march-5-for--499-with-specs-and-design-of-yesteryear";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gor-mahia-wins-again-while-our-afcon-dreams-drown-in-the-mud.md": {
	id: "gor-mahia-wins-again-while-our-afcon-dreams-drown-in-the-mud.md";
  slug: "gor-mahia-wins-again-while-our-afcon-dreams-drown-in-the-mud";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gordon-ramsay-s-plastic-secret--the-king-of-freshness-caught-serving-mass-produced-meals.md": {
	id: "gordon-ramsay-s-plastic-secret--the-king-of-freshness-caught-serving-mass-produced-meals.md";
  slug: "gordon-ramsay-s-plastic-secret--the-king-of-freshness-caught-serving-mass-produced-meals";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gospel-or-assault--embarambamba-s-clout-chasing-reaches-a-new-low.md": {
	id: "gospel-or-assault--embarambamba-s-clout-chasing-reaches-a-new-low.md";
  slug: "gospel-or-assault--embarambamba-s-clout-chasing-reaches-a-new-low";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"governance-by-vibes--how-fkf-turned-the-league-into-a-village-kiosk.md": {
	id: "governance-by-vibes--how-fkf-turned-the-league-into-a-village-kiosk.md";
  slug: "governance-by-vibes--how-fkf-turned-the-league-into-a-village-kiosk";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"governing-inequality--kenya-s-state--aid-politics--and-the-endless-humanitarian-mess.md": {
	id: "governing-inequality--kenya-s-state--aid-politics--and-the-endless-humanitarian-mess.md";
  slug: "governing-inequality--kenya-s-state--aid-politics--and-the-endless-humanitarian-mess";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"government-ghosting--why-the-cabinet-s-femicide-memo-is-giving-major-toxic-ex-vibes.md": {
	id: "government-ghosting--why-the-cabinet-s-femicide-memo-is-giving-major-toxic-ex-vibes.md";
  slug: "government-ghosting--why-the-cabinet-s-femicide-memo-is-giving-major-toxic-ex-vibes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"govt-under-pressure-as-lobby-groups-demand-accountability-over-fuel-scandal.md": {
	id: "govt-under-pressure-as-lobby-groups-demand-accountability-over-fuel-scandal.md";
  slug: "govt-under-pressure-as-lobby-groups-demand-accountability-over-fuel-scandal";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"grammarly-s-ai-charlatanism-exposed--lawsuit-targets--expert-review--impersonations.md": {
	id: "grammarly-s-ai-charlatanism-exposed--lawsuit-targets--expert-review--impersonations.md";
  slug: "grammarly-s-ai-charlatanism-exposed--lawsuit-targets--expert-review--impersonations";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"grammy-awards-president-to-hold-high-level-talks-with-ruto-in-nairobi.md": {
	id: "grammy-awards-president-to-hold-high-level-talks-with-ruto-in-nairobi.md";
  slug: "grammy-awards-president-to-hold-high-level-talks-with-ruto-in-nairobi";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"grammy-guilt-and-nigerian-tears--the-late--late-show-for-fela-kuti.md": {
	id: "grammy-guilt-and-nigerian-tears--the-late--late-show-for-fela-kuti.md";
  slug: "grammy-guilt-and-nigerian-tears--the-late--late-show-for-fela-kuti";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"grammys--streams--and-the-great-african-sellout--is-2026-the-year-music-died.md": {
	id: "grammys--streams--and-the-great-african-sellout--is-2026-the-year-music-died.md";
  slug: "grammys--streams--and-the-great-african-sellout--is-2026-the-year-music-died";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"grass-and-greed--the-high-cost-of-ruto-s-sporting-dreams.md": {
	id: "grass-and-greed--the-high-cost-of-ruto-s-sporting-dreams.md";
  slug: "grass-and-greed--the-high-cost-of-ruto-s-sporting-dreams";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gravity-always-wins--another-vip-chopper-becomes-a-nandi-bonfire.md": {
	id: "gravity-always-wins--another-vip-chopper-becomes-a-nandi-bonfire.md";
  slug: "gravity-always-wins--another-vip-chopper-becomes-a-nandi-bonfire";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gravity-always-wins-while-the-elite-fly-over-our-mess.md": {
	id: "gravity-always-wins-while-the-elite-fly-over-our-mess.md";
  slug: "gravity-always-wins-while-the-elite-fly-over-our-mess";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"greatest-political-cowards---gachagua-tells-ruto-and-ichung-wah-after--heroic--kikuyu-welcome.md": {
	id: "greatest-political-cowards---gachagua-tells-ruto-and-ichung-wah-after--heroic--kikuyu-welcome.md";
  slug: "greatest-political-cowards---gachagua-tells-ruto-and-ichung-wah-after--heroic--kikuyu-welcome";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"greek-patronage-and-corporate-cannibalism-under-the-european-shield.md": {
	id: "greek-patronage-and-corporate-cannibalism-under-the-european-shield.md";
  slug: "greek-patronage-and-corporate-cannibalism-under-the-european-shield";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"green-dreams-and-dry-pockets--ruto-s-addis-ababa-fairytale.md": {
	id: "green-dreams-and-dry-pockets--ruto-s-addis-ababa-fairytale.md";
  slug: "green-dreams-and-dry-pockets--ruto-s-addis-ababa-fairytale";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gridlock-for-games-nobody-asked-for.md": {
	id: "gridlock-for-games-nobody-asked-for.md";
  slug: "gridlock-for-games-nobody-asked-for";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"grounded-pride--when-uncle-sam-sneezes--kq-catches-a-bullet.md": {
	id: "grounded-pride--when-uncle-sam-sneezes--kq-catches-a-bullet.md";
  slug: "grounded-pride--when-uncle-sam-sneezes--kq-catches-a-bullet";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gruesome-war-bets-expose-prediction-market-s-cynical-core--fueling-calls-for-crackdown.md": {
	id: "gruesome-war-bets-expose-prediction-market-s-cynical-core--fueling-calls-for-crackdown.md";
  slug: "gruesome-war-bets-expose-prediction-market-s-cynical-core--fueling-calls-for-crackdown";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gta-6-hackers-will-release-breached-data-after-ransom-not-met---predictable-outcome-of-corporate-arrogance.md": {
	id: "gta-6-hackers-will-release-breached-data-after-ransom-not-met---predictable-outcome-of-corporate-arrogance.md";
  slug: "gta-6-hackers-will-release-breached-data-after-ransom-not-met---predictable-outcome-of-corporate-arrogance";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gta-6-hackers-will-release-breached-data-after-ransom-not-met--predictable-outcome.md": {
	id: "gta-6-hackers-will-release-breached-data-after-ransom-not-met--predictable-outcome.md";
  slug: "gta-6-hackers-will-release-breached-data-after-ransom-not-met--predictable-outcome";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"guilds-raise-antitrust-concerns-over-warner-bros-sale.md": {
	id: "guilds-raise-antitrust-concerns-over-warner-bros-sale.md";
  slug: "guilds-raise-antitrust-concerns-over-warner-bros-sale";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"guinea-and-kenya-explore-strategic-digital-cooperation-at-connected-africa-summit.md": {
	id: "guinea-and-kenya-explore-strategic-digital-cooperation-at-connected-africa-summit.md";
  slug: "guinea-and-kenya-explore-strategic-digital-cooperation-at-connected-africa-summit";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"gulf-war-again-exposes-africa-s-economic-vulnerability--standardmedia-co-ke-reports.md": {
	id: "gulf-war-again-exposes-africa-s-economic-vulnerability--standardmedia-co-ke-reports.md";
  slug: "gulf-war-again-exposes-africa-s-economic-vulnerability--standardmedia-co-ke-reports";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"guyana-energy-underdog-defies-the-superpowers.md": {
	id: "guyana-energy-underdog-defies-the-superpowers.md";
  slug: "guyana-energy-underdog-defies-the-superpowers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"haiti-mission-ends--kenyan-cops-home--but-for-what.md": {
	id: "haiti-mission-ends--kenyan-cops-home--but-for-what.md";
  slug: "haiti-mission-ends--kenyan-cops-home--but-for-what";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"haiti-mission-ends-for-215-kenyan-police-as-tour-of-duty-concludes--what-now.md": {
	id: "haiti-mission-ends-for-215-kenyan-police-as-tour-of-duty-concludes--what-now.md";
  slug: "haiti-mission-ends-for-215-kenyan-police-as-tour-of-duty-concludes--what-now";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"hallelujah-for-the-heist--lindelani-mkhize-plays-the-innocence-card-amid-joyous-celebration-financial-drama.md": {
	id: "hallelujah-for-the-heist--lindelani-mkhize-plays-the-innocence-card-amid-joyous-celebration-financial-drama.md";
  slug: "hallelujah-for-the-heist--lindelani-mkhize-plays-the-innocence-card-amid-joyous-celebration-financial-drama";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"hallelujah-hair-or-just-hype--the-tanzanian-salon-trading-tea-for-tabernacles.md": {
	id: "hallelujah-hair-or-just-hype--the-tanzanian-salon-trading-tea-for-tabernacles.md";
  slug: "hallelujah-hair-or-just-hype--the-tanzanian-salon-trading-tea-for-tabernacles";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"halos--hood-vibes--and-the-holy-cash-grab--the-new-face-of-christian-afrobeats.md": {
	id: "halos--hood-vibes--and-the-holy-cash-grab--the-new-face-of-christian-afrobeats.md";
  slug: "halos--hood-vibes--and-the-holy-cash-grab--the-new-face-of-christian-afrobeats";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"hansi-flick-bolsters-barcelona-roster-as-key-players-return-amid-title-race-pressure.md": {
	id: "hansi-flick-bolsters-barcelona-roster-as-key-players-return-amid-title-race-pressure.md";
  slug: "hansi-flick-bolsters-barcelona-roster-as-key-players-return-amid-title-race-pressure";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"happy-birthday-to-the-king-of-denials--andrew-finally-gets-his-cuffs.md": {
	id: "happy-birthday-to-the-king-of-denials--andrew-finally-gets-his-cuffs.md";
  slug: "happy-birthday-to-the-king-of-denials--andrew-finally-gets-his-cuffs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"harambee-starlets-new-provisional-squad-for-fifa-women-s-series--another-chance-to-shine--or-just-more-training.md": {
	id: "harambee-starlets-new-provisional-squad-for-fifa-women-s-series--another-chance-to-shine--or-just-more-training.md";
  slug: "harambee-starlets-new-provisional-squad-for-fifa-women-s-series--another-chance-to-shine--or-just-more-training";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"harambee-stars--where-professionalism-goes-to-die.md": {
	id: "harambee-stars--where-professionalism-goes-to-die.md";
  slug: "harambee-stars--where-professionalism-goes-to-die";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"harry-potter-actor-s--babies--drama--a-cynical-plea-to-break-pregnancy-loss-silence--likely-falling-on-deaf-ears.md": {
	id: "harry-potter-actor-s--babies--drama--a-cynical-plea-to-break-pregnancy-loss-silence--likely-falling-on-deaf-ears.md";
  slug: "harry-potter-actor-s--babies--drama--a-cynical-plea-to-break-pregnancy-loss-silence--likely-falling-on-deaf-ears";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"harry-potter-star-paapa-essiedu-s-tv-drama--babies--aims-to-break-pregnancy-loss-silence---a-predictable-morality-play.md": {
	id: "harry-potter-star-paapa-essiedu-s-tv-drama--babies--aims-to-break-pregnancy-loss-silence---a-predictable-morality-play.md";
  slug: "harry-potter-star-paapa-essiedu-s-tv-drama--babies--aims-to-break-pregnancy-loss-silence---a-predictable-morality-play";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"harry-potter-star-s--babies--drama--another-empty-gesture-to-break-pregnancy-loss-silence.md": {
	id: "harry-potter-star-s--babies--drama--another-empty-gesture-to-break-pregnancy-loss-silence.md";
  slug: "harry-potter-star-s--babies--drama--another-empty-gesture-to-break-pregnancy-loss-silence";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"harvard-s-billion-dollar-ego--how-institutional-hubris-collides-with-federal-retribution.md": {
	id: "harvard-s-billion-dollar-ego--how-institutional-hubris-collides-with-federal-retribution.md";
  slug: "harvard-s-billion-dollar-ego--how-institutional-hubris-collides-with-federal-retribution";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"hbo-s--the-pitt---revolutionizing-emergency-care-or-just-more-expensive-gimmicks.md": {
	id: "hbo-s--the-pitt---revolutionizing-emergency-care-or-just-more-expensive-gimmicks.md";
  slug: "hbo-s--the-pitt---revolutionizing-emergency-care-or-just-more-expensive-gimmicks";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"hbo-s--the-pitt--showcases--revolutionary--er-tech--but-don-t-hold-your-breath.md": {
	id: "hbo-s--the-pitt--showcases--revolutionary--er-tech--but-don-t-hold-your-breath.md";
  slug: "hbo-s--the-pitt--showcases--revolutionary--er-tech--but-don-t-hold-your-breath";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"he-was-diabolical---helenio-herrera--football-revolutionary-and-master-of-the-dark-arts.md": {
	id: "he-was-diabolical---helenio-herrera--football-revolutionary-and-master-of-the-dark-arts.md";
  slug: "he-was-diabolical---helenio-herrera--football-revolutionary-and-master-of-the-dark-arts";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"healing-the-nation-or-just-healing-their-bank-accounts--the-divas-festival-cash-grab.md": {
	id: "healing-the-nation-or-just-healing-their-bank-accounts--the-divas-festival-cash-grab.md";
  slug: "healing-the-nation-or-just-healing-their-bank-accounts--the-divas-festival-cash-grab";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"health-cs-aden-duale-plays-hide-and-seek-while-sha-sh11-billion-vanishes.md": {
	id: "health-cs-aden-duale-plays-hide-and-seek-while-sha-sh11-billion-vanishes.md";
  slug: "health-cs-aden-duale-plays-hide-and-seek-while-sha-sh11-billion-vanishes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"helb-scammers-are-giving-more-effort-than-your-favorite--soft-life--influencers.md": {
	id: "helb-scammers-are-giving-more-effort-than-your-favorite--soft-life--influencers.md";
  slug: "helb-scammers-are-giving-more-effort-than-your-favorite--soft-life--influencers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"hidden-hustle-kenyan-creators-money-online.md": {
	id: "hidden-hustle-kenyan-creators-money-online.md";
  slug: "hidden-hustle-kenyan-creators-money-online";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"high-flying-rhetoric-and-empty-pockets--the-addis-ababa-special.md": {
	id: "high-flying-rhetoric-and-empty-pockets--the-addis-ababa-special.md";
  slug: "high-flying-rhetoric-and-empty-pockets--the-addis-ababa-special";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"high-level-hallucinations--nairobi-prepares-for-another-digital-talkfest.md": {
	id: "high-level-hallucinations--nairobi-prepares-for-another-digital-talkfest.md";
  slug: "high-level-hallucinations--nairobi-prepares-for-another-digital-talkfest";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"high-seas-cocktails-and-ghost-ships--the-navy-s-grand-mauritius-vacation.md": {
	id: "high-seas-cocktails-and-ghost-ships--the-navy-s-grand-mauritius-vacation.md";
  slug: "high-seas-cocktails-and-ghost-ships--the-navy-s-grand-mauritius-vacation";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"high-seas-crime-and-turbulent-times--the-french-navy-s-big-show-in-mombasa.md": {
	id: "high-seas-crime-and-turbulent-times--the-french-navy-s-big-show-in-mombasa.md";
  slug: "high-seas-crime-and-turbulent-times--the-french-navy-s-big-show-in-mombasa";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"high-street-mini-marts-exposed--cocaine--cannabis--and-prescription-drugs-sold-openly--bbc-filming-reveals.md": {
	id: "high-street-mini-marts-exposed--cocaine--cannabis--and-prescription-drugs-sold-openly--bbc-filming-reveals.md";
  slug: "high-street-mini-marts-exposed--cocaine--cannabis--and-prescription-drugs-sold-openly--bbc-filming-reveals";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"higher-learning-or-tribal-training-grounds.md": {
	id: "higher-learning-or-tribal-training-grounds.md";
  slug: "higher-learning-or-tribal-training-grounds";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"hii-kitu-imechezwa---bahati-s-alleged-mum-tearfully-denies-dna-results.md": {
	id: "hii-kitu-imechezwa---bahati-s-alleged-mum-tearfully-denies-dna-results.md";
  slug: "hii-kitu-imechezwa---bahati-s-alleged-mum-tearfully-denies-dna-results";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"hillary-and-bill-clinton-s-50-year-marriage--a-masterclass-in-political-survival-and-personal-compromise.md": {
	id: "hillary-and-bill-clinton-s-50-year-marriage--a-masterclass-in-political-survival-and-personal-compromise.md";
  slug: "hillary-and-bill-clinton-s-50-year-marriage--a-masterclass-in-political-survival-and-personal-compromise";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"hobbes--ruto--gachagua--and-the-cheap-thrills-of-political-theatre.md": {
	id: "hobbes--ruto--gachagua--and-the-cheap-thrills-of-political-theatre.md";
  slug: "hobbes--ruto--gachagua--and-the-cheap-thrills-of-political-theatre";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"hollywood-heartbreak-or-just-good-tv--reynolds-and-mcelhenney-s-wrexham-script-hits-a-snag.md": {
	id: "hollywood-heartbreak-or-just-good-tv--reynolds-and-mcelhenney-s-wrexham-script-hits-a-snag.md";
  slug: "hollywood-heartbreak-or-just-good-tv--reynolds-and-mcelhenney-s-wrexham-script-hits-a-snag";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"hollywood-s-creative-exhaustion--the-endless-cycle-of-reboots-and-relatives.md": {
	id: "hollywood-s-creative-exhaustion--the-endless-cycle-of-reboots-and-relatives.md";
  slug: "hollywood-s-creative-exhaustion--the-endless-cycle-of-reboots-and-relatives";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"hollywood-s-favorite--private--couple--are-zendaya-and-tom-actually-married-or-just-bored.md": {
	id: "hollywood-s-favorite--private--couple--are-zendaya-and-tom-actually-married-or-just-bored.md";
  slug: "hollywood-s-favorite--private--couple--are-zendaya-and-tom-actually-married-or-just-bored";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"homa-bay-leaders-to-ruto--turn-raila-odinga-college-dream-into-reality.md": {
	id: "homa-bay-leaders-to-ruto--turn-raila-odinga-college-dream-into-reality.md";
  slug: "homa-bay-leaders-to-ruto--turn-raila-odinga-college-dream-into-reality";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"hoppers--director-s-shocking-moment--corporate-timidity-versus-artistic-integrity.md": {
	id: "hoppers--director-s-shocking-moment--corporate-timidity-versus-artistic-integrity.md";
  slug: "hoppers--director-s-shocking-moment--corporate-timidity-versus-artistic-integrity";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"hops-koskei--cs-chirchir-show-up-for-kpa-boss-ruto-s-family---because-of-course-they-did.md": {
	id: "hops-koskei--cs-chirchir-show-up-for-kpa-boss-ruto-s-family---because-of-course-they-did.md";
  slug: "hops-koskei--cs-chirchir-show-up-for-kpa-boss-ruto-s-family---because-of-course-they-did";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"hormuz-chokepoint-strangles-the-bitcoin-myth.md": {
	id: "hormuz-chokepoint-strangles-the-bitcoin-myth.md";
  slug: "hormuz-chokepoint-strangles-the-bitcoin-myth";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"hothfield-highland-cows-relocated-amidst-predictable-tiktok-fueled-visitor-deluge.md": {
	id: "hothfield-highland-cows-relocated-amidst-predictable-tiktok-fueled-visitor-deluge.md";
  slug: "hothfield-highland-cows-relocated-amidst-predictable-tiktok-fueled-visitor-deluge";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-global-cybercrime-syndicates-are-stealing-hearts---and-billions.md": {
	id: "how-global-cybercrime-syndicates-are-stealing-hearts---and-billions.md";
  slug: "how-global-cybercrime-syndicates-are-stealing-hearts---and-billions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-i-made-ksh-450000-from-tiktok-live.md": {
	id: "how-i-made-ksh-450000-from-tiktok-live.md";
  slug: "how-i-made-ksh-450000-from-tiktok-live";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-kenyan-talent-is-powering-south-africa-s-economy.md": {
	id: "how-kenyan-talent-is-powering-south-africa-s-economy.md";
  slug: "how-kenyan-talent-is-powering-south-africa-s-economy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-the-creative-economy-bill-excludes-most-kenyan-creatives---hapakenya.md": {
	id: "how-the-creative-economy-bill-excludes-most-kenyan-creatives---hapakenya.md";
  slug: "how-the-creative-economy-bill-excludes-most-kenyan-creatives---hapakenya";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-to--bear--your-loneliness--a-grim--inevitable-reality.md": {
	id: "how-to--bear--your-loneliness--a-grim--inevitable-reality.md";
  slug: "how-to--bear--your-loneliness--a-grim--inevitable-reality";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-to-guard-kenya-s-cement-gains-in-an-era-of-global-competition--according-to-those-who-stand-to-profit.md": {
	id: "how-to-guard-kenya-s-cement-gains-in-an-era-of-global-competition--according-to-those-who-stand-to-profit.md";
  slug: "how-to-guard-kenya-s-cement-gains-in-an-era-of-global-competition--according-to-those-who-stand-to-profit";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-to-stop-losing-bets-and-start-winning.md": {
	id: "how-to-stop-losing-bets-and-start-winning.md";
  slug: "how-to-stop-losing-bets-and-start-winning";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"hr-folders-and-dead-end-dockets--why-your-boss-is-getting-away-with-it.md": {
	id: "hr-folders-and-dead-end-dockets--why-your-boss-is-getting-away-with-it.md";
  slug: "hr-folders-and-dead-end-dockets--why-your-boss-is-getting-away-with-it";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"huduma-kenya-to-content-creators--shut-up-and-put-the-phone-away-or-face-14-years-in-the-bin.md": {
	id: "huduma-kenya-to-content-creators--shut-up-and-put-the-phone-away-or-face-14-years-in-the-bin.md";
  slug: "huduma-kenya-to-content-creators--shut-up-and-put-the-phone-away-or-face-14-years-in-the-bin";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"hundreds-contact-bbc-about-mystery-skin-condition--hell----doctors-still-can-t-agree-it-exists.md": {
	id: "hundreds-contact-bbc-about-mystery-skin-condition--hell----doctors-still-can-t-agree-it-exists.md";
  slug: "hundreds-contact-bbc-about-mystery-skin-condition--hell----doctors-still-can-t-agree-it-exists";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"hundreds-contact-bbc-about-mystery-skin-condition--hell--as-doctors-fail-to-agree-on-its-existence.md": {
	id: "hundreds-contact-bbc-about-mystery-skin-condition--hell--as-doctors-fail-to-agree-on-its-existence.md";
  slug: "hundreds-contact-bbc-about-mystery-skin-condition--hell--as-doctors-fail-to-agree-on-its-existence";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"husband-demands-divorce--then-embarks-on--romantic--getaway-with-wife.md": {
	id: "husband-demands-divorce--then-embarks-on--romantic--getaway-with-wife.md";
  slug: "husband-demands-divorce--then-embarks-on--romantic--getaway-with-wife";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"husband-demands-divorce--then-takes-wife-on-post-breakup-vacation.md": {
	id: "husband-demands-divorce--then-takes-wife-on-post-breakup-vacation.md";
  slug: "husband-demands-divorce--then-takes-wife-on-post-breakup-vacation";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"hydrograph-qualifies-hubron-international-for-fractal-graphene-tm--compounding-partner-program.md": {
	id: "hydrograph-qualifies-hubron-international-for-fractal-graphene-tm--compounding-partner-program.md";
  slug: "hydrograph-qualifies-hubron-international-for-fractal-graphene-tm--compounding-partner-program";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"i-completely-lost-my-temper---uli-hoene--couldn-t-stop-bayern-s-medical-scandal.md": {
	id: "i-completely-lost-my-temper---uli-hoene--couldn-t-stop-bayern-s-medical-scandal.md";
  slug: "i-completely-lost-my-temper---uli-hoene--couldn-t-stop-bayern-s-medical-scandal";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"i-don-t-eat-your-wife-s-food---matiang-i-snaps-back-at-ruto-s-gym-jab.md": {
	id: "i-don-t-eat-your-wife-s-food---matiang-i-snaps-back-at-ruto-s-gym-jab.md";
  slug: "i-don-t-eat-your-wife-s-food---matiang-i-snaps-back-at-ruto-s-gym-jab";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"i-m-a-celebrity-all-stars-2026--the-desperate-lineup-and-pre-recorded-sham.md": {
	id: "i-m-a-celebrity-all-stars-2026--the-desperate-lineup-and-pre-recorded-sham.md";
  slug: "i-m-a-celebrity-all-stars-2026--the-desperate-lineup-and-pre-recorded-sham";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"i-m-a-celebrity-fans-are-losing-it-over-south-africa-teaser---another-twist-confirmed-for-the--legends.md": {
	id: "i-m-a-celebrity-fans-are-losing-it-over-south-africa-teaser---another-twist-confirmed-for-the--legends.md";
  slug: "i-m-a-celebrity-fans-are-losing-it-over-south-africa-teaser---another-twist-confirmed-for-the--legends";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"i-m-a-celebrity-south-africa-2026--longest-trial-ever--and-probably-the-most-painful-breakups.md": {
	id: "i-m-a-celebrity-south-africa-2026--longest-trial-ever--and-probably-the-most-painful-breakups.md";
  slug: "i-m-a-celebrity-south-africa-2026--longest-trial-ever--and-probably-the-most-painful-breakups";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"i-probably-should-ve-gone-to-prison---37-petty-and-ruthless--i-caught-my-partner-cheating--stories---the-predictable-fallout-of-human-frailty.md": {
	id: "i-probably-should-ve-gone-to-prison---37-petty-and-ruthless--i-caught-my-partner-cheating--stories---the-predictable-fallout-of-human-frailty.md";
  slug: "i-probably-should-ve-gone-to-prison---37-petty-and-ruthless--i-caught-my-partner-cheating--stories---the-predictable-fallout-of-human-frailty";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ice-cold-deception--the-olympic-collapse-of-curling-s-moral-mirage.md": {
	id: "ice-cold-deception--the-olympic-collapse-of-curling-s-moral-mirage.md";
  slug: "ice-cold-deception--the-olympic-collapse-of-curling-s-moral-mirage";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ice-is-expanding-across-the-us-at-breakneck-speed--here-s-where-it-s-going-next.md": {
	id: "ice-is-expanding-across-the-us-at-breakneck-speed--here-s-where-it-s-going-next.md";
  slug: "ice-is-expanding-across-the-us-at-breakneck-speed--here-s-where-it-s-going-next";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ice-s-secret-expansion-plans-meet-palantir-s-ethical-theater-and-ai-s-uselessness.md": {
	id: "ice-s-secret-expansion-plans-meet-palantir-s-ethical-theater-and-ai-s-uselessness.md";
  slug: "ice-s-secret-expansion-plans-meet-palantir-s-ethical-theater-and-ai-s-uselessness";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ichung-wah-s-turf-tears--goons--and-bullets--gachagua-s-rally-scuttled.md": {
	id: "ichung-wah-s-turf-tears--goons--and-bullets--gachagua-s-rally-scuttled.md";
  slug: "ichung-wah-s-turf-tears--goons--and-bullets--gachagua-s-rally-scuttled";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"icone-2026--nuclear-energy-s-african--development--is-just-another-mirage.md": {
	id: "icone-2026--nuclear-energy-s-african--development--is-just-another-mirage.md";
  slug: "icone-2026--nuclear-energy-s-african--development--is-just-another-mirage";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"identity-theft-protection-services--a-costly-illusion-for-the-gullible.md": {
	id: "identity-theft-protection-services--a-costly-illusion-for-the-gullible.md";
  slug: "identity-theft-protection-services--a-costly-illusion-for-the-gullible";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"iebc-commissioner-aduol-caught-up-in-sh39-million-tuk-retirees-shambles.md": {
	id: "iebc-commissioner-aduol-caught-up-in-sh39-million-tuk-retirees-shambles.md";
  slug: "iebc-commissioner-aduol-caught-up-in-sh39-million-tuk-retirees-shambles";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"iebc-officer-caught-with-two-jobs-loses-dismissal-appeal.md": {
	id: "iebc-officer-caught-with-two-jobs-loses-dismissal-appeal.md";
  slug: "iebc-officer-caught-with-two-jobs-loses-dismissal-appeal";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"iebc-staffer-with-two-jobs-loses-bid-to-overturn-dismissal.md": {
	id: "iebc-staffer-with-two-jobs-loses-bid-to-overturn-dismissal.md";
  slug: "iebc-staffer-with-two-jobs-loses-bid-to-overturn-dismissal";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"iebc-voter-enrolment-targets--2027-vote-battle-zones-full-of-intrigue.md": {
	id: "iebc-voter-enrolment-targets--2027-vote-battle-zones-full-of-intrigue.md";
  slug: "iebc-voter-enrolment-targets--2027-vote-battle-zones-full-of-intrigue";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"in-africa--the-cost-of-jet-fuel-is-changing-faster-than-you-can-fly.md": {
	id: "in-africa--the-cost-of-jet-fuel-is-changing-faster-than-you-can-fly.md";
  slug: "in-africa--the-cost-of-jet-fuel-is-changing-faster-than-you-can-fly";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"in-case-of-emergencies-during-floods---eric-omondi-launches-boat-rescue-plan.md": {
	id: "in-case-of-emergencies-during-floods---eric-omondi-launches-boat-rescue-plan.md";
  slug: "in-case-of-emergencies-during-floods---eric-omondi-launches-boat-rescue-plan";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"in-kenya--even-getting-robbed-is-a-taxable-event.md": {
	id: "in-kenya--even-getting-robbed-is-a-taxable-event.md";
  slug: "in-kenya--even-getting-robbed-is-a-taxable-event";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"incest-abuse-kenya-festive-season-normalization.md": {
	id: "incest-abuse-kenya-festive-season-normalization.md";
  slug: "incest-abuse-kenya-festive-season-normalization";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"india-challenges-us-china-ai-duopoly-with-new-delhi-impact-summit.md": {
	id: "india-challenges-us-china-ai-duopoly-with-new-delhi-impact-summit.md";
  slug: "india-challenges-us-china-ai-duopoly-with-new-delhi-impact-summit";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"india-confronts-strategic-vulnerabilities-in-the-global-artificial-intelligence-race.md": {
	id: "india-confronts-strategic-vulnerabilities-in-the-global-artificial-intelligence-race.md";
  slug: "india-confronts-strategic-vulnerabilities-in-the-global-artificial-intelligence-race";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"india-s-central-bank-retreats-into-survival-mode.md": {
	id: "india-s-central-bank-retreats-into-survival-mode.md";
  slug: "india-s-central-bank-retreats-into-survival-mode";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"india-s-currency-death-spiral-and-the-myth-of-market-recovery.md": {
	id: "india-s-currency-death-spiral-and-the-myth-of-market-recovery.md";
  slug: "india-s-currency-death-spiral-and-the-myth-of-market-recovery";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"india-s-desperate-fortress--subsidizing-stability-in-a-burning-world.md": {
	id: "india-s-desperate-fortress--subsidizing-stability-in-a-burning-world.md";
  slug: "india-s-desperate-fortress--subsidizing-stability-in-a-burning-world";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"india-s-domestic-shield-is-a-paper-umbrella-in-a-global-firestorm.md": {
	id: "india-s-domestic-shield-is-a-paper-umbrella-in-a-global-firestorm.md";
  slug: "india-s-domestic-shield-is-a-paper-umbrella-in-a-global-firestorm";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"india-s-growth-mirage-dissolves-in-the-crude-reality-of-war.md": {
	id: "india-s-growth-mirage-dissolves-in-the-crude-reality-of-war.md";
  slug: "india-s-growth-mirage-dissolves-in-the-crude-reality-of-war";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"india-s-industrial-begging-bowl-disguised-as-resilience.md": {
	id: "india-s-industrial-begging-bowl-disguised-as-resilience.md";
  slug: "india-s-industrial-begging-bowl-disguised-as-resilience";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"india-s-market-mirage-hides-a-global-capital-exodus.md": {
	id: "india-s-market-mirage-hides-a-global-capital-exodus.md";
  slug: "india-s-market-mirage-hides-a-global-capital-exodus";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"india-s-power-must-protect-democracy-beyond-borders--author-marianne-williamson-at-et-now-gbs-2026.md": {
	id: "india-s-power-must-protect-democracy-beyond-borders--author-marianne-williamson-at-et-now-gbs-2026.md";
  slug: "india-s-power-must-protect-democracy-beyond-borders--author-marianne-williamson-at-et-now-gbs-2026";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"india-sets-ai-impact-agenda-as-regulatory-challenges-persist-at-home.md": {
	id: "india-sets-ai-impact-agenda-as-regulatory-challenges-persist-at-home.md";
  slug: "india-sets-ai-impact-agenda-as-regulatory-challenges-persist-at-home";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"india-showcases-ai-integration-in-agriculture-and-heritage-preservation-at-global-summit.md": {
	id: "india-showcases-ai-integration-in-agriculture-and-heritage-preservation-at-global-summit.md";
  slug: "india-showcases-ai-integration-in-agriculture-and-heritage-preservation-at-global-summit";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"infinix-targets-kenya-s-creator-economy-with-new-phone--expect-more-digital-dust.md": {
	id: "infinix-targets-kenya-s-creator-economy-with-new-phone--expect-more-digital-dust.md";
  slug: "infinix-targets-kenya-s-creator-economy-with-new-phone--expect-more-digital-dust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"inflationary-warfare--the-new-global-normal.md": {
	id: "inflationary-warfare--the-new-global-normal.md";
  slug: "inflationary-warfare--the-new-global-normal";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"infrasound--the-latest-excuse-for-human-idiocy-masquerading-as-ghosts.md": {
	id: "infrasound--the-latest-excuse-for-human-idiocy-masquerading-as-ghosts.md";
  slug: "infrasound--the-latest-excuse-for-human-idiocy-masquerading-as-ghosts";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"inheritance-hustle--why-your-rich-uncle-s-will-is-probably-a-photoshopped-lie.md": {
	id: "inheritance-hustle--why-your-rich-uncle-s-will-is-probably-a-photoshopped-lie.md";
  slug: "inheritance-hustle--why-your-rich-uncle-s-will-is-probably-a-photoshopped-lie";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"inheritance-wars-genz-opts-out-land-feuds-crypto.md": {
	id: "inheritance-wars-genz-opts-out-land-feuds-crypto.md";
  slug: "inheritance-wars-genz-opts-out-land-feuds-crypto";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"insecure-moms--arrested-princes--and-the-never-ending-cycle-of-tyler-perry-s-trauma-porn.md": {
	id: "insecure-moms--arrested-princes--and-the-never-ending-cycle-of-tyler-perry-s-trauma-porn.md";
  slug: "insecure-moms--arrested-princes--and-the-never-ending-cycle-of-tyler-perry-s-trauma-porn";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"inside-the-meeting-felix-koskei-chaired--fuel-scandal--ruto-s-big-mess.md": {
	id: "inside-the-meeting-felix-koskei-chaired--fuel-scandal--ruto-s-big-mess.md";
  slug: "inside-the-meeting-felix-koskei-chaired--fuel-scandal--ruto-s-big-mess";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"instagram-chat-privacy-vanishes-as-encryption-disappears-soon.md": {
	id: "instagram-chat-privacy-vanishes-as-encryption-disappears-soon.md";
  slug: "instagram-chat-privacy-vanishes-as-encryption-disappears-soon";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"instagram-s-encrypted-messages-are-toast--meta-finally-admits-what-we-already-knew.md": {
	id: "instagram-s-encrypted-messages-are-toast--meta-finally-admits-what-we-already-knew.md";
  slug: "instagram-s-encrypted-messages-are-toast--meta-finally-admits-what-we-already-knew";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"intense-rainfall-brings-floods-across-iberian-peninsula.md": {
	id: "intense-rainfall-brings-floods-across-iberian-peninsula.md";
  slug: "intense-rainfall-brings-floods-across-iberian-peninsula";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"inter-s-dream-diminishes--nico-paz-dines-with-zanetti-and-milito--but-his-real-madrid-return-is-set.md": {
	id: "inter-s-dream-diminishes--nico-paz-dines-with-zanetti-and-milito--but-his-real-madrid-return-is-set.md";
  slug: "inter-s-dream-diminishes--nico-paz-dines-with-zanetti-and-milito--but-his-real-madrid-return-is-set";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"international-firms-sever-ice-ties-amid-global-pressure.md": {
	id: "international-firms-sever-ice-ties-amid-global-pressure.md";
  slug: "international-firms-sever-ice-ties-amid-global-pressure";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"interpol-fraud-threat-report-signals-a-new--even-worse-era-of-global-financial-crime.md": {
	id: "interpol-fraud-threat-report-signals-a-new--even-worse-era-of-global-financial-crime.md";
  slug: "interpol-fraud-threat-report-signals-a-new--even-worse-era-of-global-financial-crime";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"invest-kenya-advances-strategic-investment-partnerships-at-italy-kenya-economic-forum-in-rome.md": {
	id: "invest-kenya-advances-strategic-investment-partnerships-at-italy-kenya-economic-forum-in-rome.md";
  slug: "invest-kenya-advances-strategic-investment-partnerships-at-italy-kenya-economic-forum-in-rome";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"iphone-moon-photos--an-uncopyable-trick-for-those-with-infinite-budgets.md": {
	id: "iphone-moon-photos--an-uncopyable-trick-for-those-with-infinite-budgets.md";
  slug: "iphone-moon-photos--an-uncopyable-trick-for-those-with-infinite-budgets";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"iran-conflict-dries-up-east-africa-s-fuel--governments-grab-at-straws.md": {
	id: "iran-conflict-dries-up-east-africa-s-fuel--governments-grab-at-straws.md";
  slug: "iran-conflict-dries-up-east-africa-s-fuel--governments-grab-at-straws";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"iran-s-cluster-warheads-on-tel-aviv--just-another-tuesday-in-the-middle-east-mess.md": {
	id: "iran-s-cluster-warheads-on-tel-aviv--just-another-tuesday-in-the-middle-east-mess.md";
  slug: "iran-s-cluster-warheads-on-tel-aviv--just-another-tuesday-in-the-middle-east-mess";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"iran-us-war-persists--analysts-say-high-oil-prices-will-hammer-kenya-s-already-stressed-economy.md": {
	id: "iran-us-war-persists--analysts-say-high-oil-prices-will-hammer-kenya-s-already-stressed-economy.md";
  slug: "iran-us-war-persists--analysts-say-high-oil-prices-will-hammer-kenya-s-already-stressed-economy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"iran-war-forces-kenya-s-economy-to-shake--two-months-in.md": {
	id: "iran-war-forces-kenya-s-economy-to-shake--two-months-in.md";
  slug: "iran-war-forces-kenya-s-economy-to-shake--two-months-in";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"iran-war-means-fertilizer-drought-for-africa--big-guys-grab-everything--again.md": {
	id: "iran-war-means-fertilizer-drought-for-africa--big-guys-grab-everything--again.md";
  slug: "iran-war-means-fertilizer-drought-for-africa--big-guys-grab-everything--again";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"iran-war-s-economic-punch-lands-hard-on-africa---just-another-tuesday.md": {
	id: "iran-war-s-economic-punch-lands-hard-on-africa---just-another-tuesday.md";
  slug: "iran-war-s-economic-punch-lands-hard-on-africa---just-another-tuesday";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"iranian-nobel-laureate-suffers-suspected-heart-attack-in-prison--authorities-remain-indifferent.md": {
	id: "iranian-nobel-laureate-suffers-suspected-heart-attack-in-prison--authorities-remain-indifferent.md";
  slug: "iranian-nobel-laureate-suffers-suspected-heart-attack-in-prison--authorities-remain-indifferent";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"irawma-nominations--redsan-and-willy-paul-go-begging-for-validation-again.md": {
	id: "irawma-nominations--redsan-and-willy-paul-go-begging-for-validation-again.md";
  slug: "irawma-nominations--redsan-and-willy-paul-go-begging-for-validation-again";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"is-going-commando-un-african-the-cultural-clash-over-kenyan-womens-modern-choices.md": {
	id: "is-going-commando-un-african-the-cultural-clash-over-kenyan-womens-modern-choices.md";
  slug: "is-going-commando-un-african-the-cultural-clash-over-kenyan-womens-modern-choices";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"is-the-government-using-bots.md": {
	id: "is-the-government-using-bots.md";
  slug: "is-the-government-using-bots";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"is-usikimye-by-njeri-migwi-a-scam.md": {
	id: "is-usikimye-by-njeri-migwi-a-scam.md";
  slug: "usikimye-investigation-transparency-questions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ishiara-hospital-chaos--police-blame-criminals--ipoa-probe-to-confirm-the-obvious.md": {
	id: "ishiara-hospital-chaos--police-blame-criminals--ipoa-probe-to-confirm-the-obvious.md";
  slug: "ishiara-hospital-chaos--police-blame-criminals--ipoa-probe-to-confirm-the-obvious";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"iss-microbes--the-unreliable--tiny-hope-for-asteroid-mining.md": {
	id: "iss-microbes--the-unreliable--tiny-hope-for-asteroid-mining.md";
  slug: "iss-microbes--the-unreliable--tiny-hope-for-asteroid-mining";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"istanbul-mayor-imamoglu-faces-trial-amidst-politically-motivated-corruption-charges.md": {
	id: "istanbul-mayor-imamoglu-faces-trial-amidst-politically-motivated-corruption-charges.md";
  slug: "istanbul-mayor-imamoglu-faces-trial-amidst-politically-motivated-corruption-charges";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"istanbul-mayor-imamoglu-s-corruption-trial--another-political-pawn-on-the-board.md": {
	id: "istanbul-mayor-imamoglu-s-corruption-trial--another-political-pawn-on-the-board.md";
  slug: "istanbul-mayor-imamoglu-s-corruption-trial--another-political-pawn-on-the-board";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"istanbul-s-mayor-imamoglu-faces-corrupt-trial--predictably.md": {
	id: "istanbul-s-mayor-imamoglu-faces-corrupt-trial--predictably.md";
  slug: "istanbul-s-mayor-imamoglu-faces-corrupt-trial--predictably";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"it-is-not-starfield-2-0----todd-howard-squashes-starfield-update-excitement--but-insists-work-on-the-space-game-will-not-stop--for-a-while.md": {
	id: "it-is-not-starfield-2-0----todd-howard-squashes-starfield-update-excitement--but-insists-work-on-the-space-game-will-not-stop--for-a-while.md";
  slug: "it-is-not-starfield-2-0----todd-howard-squashes-starfield-update-excitement--but-insists-work-on-the-space-game-will-not-stop--for-a-while";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"it-s-been-a-big----but-rocky----week-for-ai-models-from-china--here-s-what-s-happened.md": {
	id: "it-s-been-a-big----but-rocky----week-for-ai-models-from-china--here-s-what-s-happened.md";
  slug: "it-s-been-a-big----but-rocky----week-for-ai-models-from-china--here-s-what-s-happened";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"it-sustainability-think-tank--the-digital-diet-and-the-growing-cost-of-ai-energy-use.md": {
	id: "it-sustainability-think-tank--the-digital-diet-and-the-growing-cost-of-ai-energy-use.md";
  slug: "it-sustainability-think-tank--the-digital-diet-and-the-growing-cost-of-ai-energy-use";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"jalisco-cartel-co-founder-pleads-guilty--another-pawn-sacrificed-in-the-war-on-drugs.md": {
	id: "jalisco-cartel-co-founder-pleads-guilty--another-pawn-sacrificed-in-the-war-on-drugs.md";
  slug: "jalisco-cartel-co-founder-pleads-guilty--another-pawn-sacrificed-in-the-war-on-drugs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"jalisco-cartel-co-founder-s-plea--just-another-pawn-in-the-global-drug-game.md": {
	id: "jalisco-cartel-co-founder-s-plea--just-another-pawn-in-the-global-drug-game.md";
  slug: "jalisco-cartel-co-founder-s-plea--just-another-pawn-in-the-global-drug-game";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"jalisco-new-generation-cartel-co-founder-admits-guilt-in-us-court--another-pawn-in-the-game.md": {
	id: "jalisco-new-generation-cartel-co-founder-admits-guilt-in-us-court--another-pawn-in-the-game.md";
  slug: "jalisco-new-generation-cartel-co-founder-admits-guilt-in-us-court--another-pawn-in-the-game";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"james-harden-identified-as-primary-2026-nba-trade-candidate.md": {
	id: "james-harden-identified-as-primary-2026-nba-trade-candidate.md";
  slug: "james-harden-identified-as-primary-2026-nba-trade-candidate";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"jams--jihads--and-just-us--why-your-premium-chili-paste-tastes-like-exploitation.md": {
	id: "jams--jihads--and-just-us--why-your-premium-chili-paste-tastes-like-exploitation.md";
  slug: "jams--jihads--and-just-us--why-your-premium-chili-paste-tastes-like-exploitation";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"japan-s-foreign-minister-motegi-visits-kenya--a-statement-on--friendly-relations--and-global-ambitions.md": {
	id: "japan-s-foreign-minister-motegi-visits-kenya--a-statement-on--friendly-relations--and-global-ambitions.md";
  slug: "japan-s-foreign-minister-motegi-visits-kenya--a-statement-on--friendly-relations--and-global-ambitions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"jessie-buckley-s-chanel-scented-pity-party--spanx--breast-pumps--and-the-art-of-being-relatable.md": {
	id: "jessie-buckley-s-chanel-scented-pity-party--spanx--breast-pumps--and-the-art-of-being-relatable.md";
  slug: "jessie-buckley-s-chanel-scented-pity-party--spanx--breast-pumps--and-the-art-of-being-relatable";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"jetblue-accused-of-fleecing-passengers-via-data-exploitation-in-new-lawsuit.md": {
	id: "jetblue-accused-of-fleecing-passengers-via-data-exploitation-in-new-lawsuit.md";
  slug: "jetblue-accused-of-fleecing-passengers-via-data-exploitation-in-new-lawsuit";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"jkia-s-new-fund--now-they-are-raiding-your-pension-to-fix-a-leaking-roof.md": {
	id: "jkia-s-new-fund--now-they-are-raiding-your-pension-to-fix-a-leaking-roof.md";
  slug: "jkia-s-new-fund--now-they-are-raiding-your-pension-to-fix-a-leaking-roof";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"joeboy-s-quarter-life-crisis--discovering-tiktok-is-the-new-overlord.md": {
	id: "joeboy-s-quarter-life-crisis--discovering-tiktok-is-the-new-overlord.md";
  slug: "joeboy-s-quarter-life-crisis--discovering-tiktok-is-the-new-overlord";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"jon-prosser-s-ios-26--heist---a-cynical-look-at-leaks--lawsuits--and-the-tech-echo-chamber.md": {
	id: "jon-prosser-s-ios-26--heist---a-cynical-look-at-leaks--lawsuits--and-the-tech-echo-chamber.md";
  slug: "jon-prosser-s-ios-26--heist---a-cynical-look-at-leaks--lawsuits--and-the-tech-echo-chamber";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"jordon-hudson-plans-event-after-belichick-hof-snub.md": {
	id: "jordon-hudson-plans-event-after-belichick-hof-snub.md";
  slug: "jordon-hudson-plans-event-after-belichick-hof-snub";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"joseph-mutati-mwingi-crypto-genius.md": {
	id: "joseph-mutati-mwingi-crypto-genius.md";
  slug: "joseph-mutati-mwingi-crypto-genius";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"journalist-pleads--don-t-kill-me--after-uda-meeting-attack.md": {
	id: "journalist-pleads--don-t-kill-me--after-uda-meeting-attack.md";
  slug: "journalist-pleads--don-t-kill-me--after-uda-meeting-attack";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"joyce-s-energetic-moves-at-event--who-s-really-watching-this-dance-for-dollars.md": {
	id: "joyce-s-energetic-moves-at-event--who-s-really-watching-this-dance-for-dollars.md";
  slug: "joyce-s-energetic-moves-at-event--who-s-really-watching-this-dance-for-dollars";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"jpmorgan-concedes-closing-trump-s-accounts-after-jan--6-attack.md": {
	id: "jpmorgan-concedes-closing-trump-s-accounts-after-jan--6-attack.md";
  slug: "jpmorgan-concedes-closing-trump-s-accounts-after-jan--6-attack";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"judge-gonzalez-rogers--the-unseen-hand-deciding-musk-v-altman-s-fate.md": {
	id: "judge-gonzalez-rogers--the-unseen-hand-deciding-musk-v-altman-s-fate.md";
  slug: "judge-gonzalez-rogers--the-unseen-hand-deciding-musk-v-altman-s-fate";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"junk-choppers-and-stolen-sheets--the-messy--influence--of-east-african-power-players.md": {
	id: "junk-choppers-and-stolen-sheets--the-messy--influence--of-east-african-power-players.md";
  slug: "junk-choppers-and-stolen-sheets--the-messy--influence--of-east-african-power-players";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"justice-ibrahim-is-dead--and-the-hyenas-are-mourning.md": {
	id: "justice-ibrahim-is-dead--and-the-hyenas-are-mourning.md";
  slug: "justice-ibrahim-is-dead--and-the-hyenas-are-mourning";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"k-12-private-education-analysis-report-2026---663-09-bn-market-opportunities--trends--competitive-landscape--strategies--and-forecasts--2020-2025--2025-2030f--2035f.md": {
	id: "k-12-private-education-analysis-report-2026---663-09-bn-market-opportunities--trends--competitive-landscape--strategies--and-forecasts--2020-2025--2025-2030f--2035f.md";
  slug: "k-12-private-education-analysis-report-2026---663-09-bn-market-opportunities--trends--competitive-landscape--strategies--and-forecasts--2020-2025--2025-2030f--2035f";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"k-ogalo-s-broke-era--gor-mahia-fails-to-hit-ksh-1m-gate-target-as-fans-ghost-nyayo-stadium.md": {
	id: "k-ogalo-s-broke-era--gor-mahia-fails-to-hit-ksh-1m-gate-target-as-fans-ghost-nyayo-stadium.md";
  slug: "k-ogalo-s-broke-era--gor-mahia-fails-to-hit-ksh-1m-gate-target-as-fans-ghost-nyayo-stadium";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"k-ogalo-s-crumbs--when-giants-lose-to-a-bakery.md": {
	id: "k-ogalo-s-crumbs--when-giants-lose-to-a-bakery.md";
  slug: "k-ogalo-s-crumbs--when-giants-lose-to-a-bakery";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kabogo-talks-responsible-ai-governance-while-africa-s-digital-economy-stumbles.md": {
	id: "kabogo-talks-responsible-ai-governance-while-africa-s-digital-economy-stumbles.md";
  slug: "kabogo-talks-responsible-ai-governance-while-africa-s-digital-economy-stumbles";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kabogo-vs--the-algorithm--is-the-government-finally-ending-the-tiktok-party.md": {
	id: "kabogo-vs--the-algorithm--is-the-government-finally-ending-the-tiktok-party.md";
  slug: "kabogo-vs--the-algorithm--is-the-government-finally-ending-the-tiktok-party";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kadhi-courts--kenya-s-last-bastion-of-male-dominance--and-guess-who-s-not-invited.md": {
	id: "kadhi-courts--kenya-s-last-bastion-of-male-dominance--and-guess-who-s-not-invited.md";
  slug: "kadhi-courts--kenya-s-last-bastion-of-male-dominance--and-guess-who-s-not-invited";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kajiado-women-empowerment-fund-scandal--ghost-groups--missing-millions--same-old-story.md": {
	id: "kajiado-women-empowerment-fund-scandal--ghost-groups--missing-millions--same-old-story.md";
  slug: "kajiado-women-empowerment-fund-scandal--ghost-groups--missing-millions--same-old-story";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kaley-s-16-hours-on-instagram--is-meta-to-blame--a-jury-s-got-to-decide--honey.md": {
	id: "kaley-s-16-hours-on-instagram--is-meta-to-blame--a-jury-s-got-to-decide--honey.md";
  slug: "kaley-s-16-hours-on-instagram--is-meta-to-blame--a-jury-s-got-to-decide--honey";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kamene-goro-s-icu-scare--hubby-bonez-s--hard--story-sparks-backlash.md": {
	id: "kamene-goro-s-icu-scare--hubby-bonez-s--hard--story-sparks-backlash.md";
  slug: "kamene-goro-s-icu-scare--hubby-bonez-s--hard--story-sparks-backlash";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kanairo-s-flesh-trade--from-ruai-basements-to-russian-trenches.md": {
	id: "kanairo-s-flesh-trade--from-ruai-basements-to-russian-trenches.md";
  slug: "kanairo-s-flesh-trade--from-ruai-basements-to-russian-trenches";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kane-becomes-first-englishman-with-500-career-goals.md": {
	id: "kane-becomes-first-englishman-with-500-career-goals.md";
  slug: "kane-becomes-first-englishman-with-500-career-goals";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kanja-and-rwanda-police-chief-convene-in-nairobi-to-discuss-cross-border-crime--likely-achieve-nothing.md": {
	id: "kanja-and-rwanda-police-chief-convene-in-nairobi-to-discuss-cross-border-crime--likely-achieve-nothing.md";
  slug: "kanja-and-rwanda-police-chief-convene-in-nairobi-to-discuss-cross-border-crime--likely-achieve-nothing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kanja-claims-8-4pc-crime-drop-since-2023--official-data-says-so--apparently.md": {
	id: "kanja-claims-8-4pc-crime-drop-since-2023--official-data-says-so--apparently.md";
  slug: "kanja-claims-8-4pc-crime-drop-since-2023--official-data-says-so--apparently";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kano-scholarship-scandal--ex-commissioner-s-35-bank-accounts-exposed.md": {
	id: "kano-scholarship-scandal--ex-commissioner-s-35-bank-accounts-exposed.md";
  slug: "kano-scholarship-scandal--ex-commissioner-s-35-bank-accounts-exposed";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kanye-offers-perfunctory-meeting-with-jewish-community-amidst-wireless-fallout.md": {
	id: "kanye-offers-perfunctory-meeting-with-jewish-community-amidst-wireless-fallout.md";
  slug: "kanye-offers-perfunctory-meeting-with-jewish-community-amidst-wireless-fallout";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kanye-west-offers-empty-gestures-to-uk-jewish-community-amidst-wireless-controversy.md": {
	id: "kanye-west-offers-empty-gestures-to-uk-jewish-community-amidst-wireless-controversy.md";
  slug: "kanye-west-offers-empty-gestures-to-uk-jewish-community-amidst-wireless-controversy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kapsabet-high--where-presidents-are-made--and-the-rest-of-us-just-pay-taxes.md": {
	id: "kapsabet-high--where-presidents-are-made--and-the-rest-of-us-just-pay-taxes.md";
  slug: "kapsabet-high--where-presidents-are-made--and-the-rest-of-us-just-pay-taxes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"karua-demands-cs-wandayi-s-resignation-over-fuel-scandal---because-kenyans-are-still-broke.md": {
	id: "karua-demands-cs-wandayi-s-resignation-over-fuel-scandal---because-kenyans-are-still-broke.md";
  slug: "karua-demands-cs-wandayi-s-resignation-over-fuel-scandal---because-kenyans-are-still-broke";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kasarani-tourism-and-the-wafcon-pipe-dream.md": {
	id: "kasarani-tourism-and-the-wafcon-pipe-dream.md";
  slug: "kasarani-tourism-and-the-wafcon-pipe-dream";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"katherine-heigl-fires-back-after-being-told-she--was-hated-on-grey-s-anatomy----surprise--surprise.md": {
	id: "katherine-heigl-fires-back-after-being-told-she--was-hated-on-grey-s-anatomy----surprise--surprise.md";
  slug: "katherine-heigl-fires-back-after-being-told-she--was-hated-on-grey-s-anatomy----surprise--surprise";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"katseye-chaos--when-stage-dads-attack-and-sisterhood-fails.md": {
	id: "katseye-chaos--when-stage-dads-attack-and-sisterhood-fails.md";
  slug: "katseye-chaos--when-stage-dads-attack-and-sisterhood-fails";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kbc-s-desperate-facelift--why-club-1-extra-s-rebrand-is-just-new-wine-in-a-dusty-bottle.md": {
	id: "kbc-s-desperate-facelift--why-club-1-extra-s-rebrand-is-just-new-wine-in-a-dusty-bottle.md";
  slug: "kbc-s-desperate-facelift--why-club-1-extra-s-rebrand-is-just-new-wine-in-a-dusty-bottle";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kdc-dangles-creative-economy-and-youth-innovation-promises-at-africa-forward-summit-in-nairobi--again.md": {
	id: "kdc-dangles-creative-economy-and-youth-innovation-promises-at-africa-forward-summit-in-nairobi--again.md";
  slug: "kdc-dangles-creative-economy-and-youth-innovation-promises-at-africa-forward-summit-in-nairobi--again";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kdf-plants-trees--but-who-s-really-sowing-service.md": {
	id: "kdf-plants-trees--but-who-s-really-sowing-service.md";
  slug: "kdf-plants-trees--but-who-s-really-sowing-service";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kdf-s-defaba-crowned-2026-national-boxing-champions-amidst-fan-admiration-and-police-loss.md": {
	id: "kdf-s-defaba-crowned-2026-national-boxing-champions-amidst-fan-admiration-and-police-loss.md";
  slug: "kdf-s-defaba-crowned-2026-national-boxing-champions-amidst-fan-admiration-and-police-loss";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kdf-s-laikipia--security-efforts---more-talk--less-action.md": {
	id: "kdf-s-laikipia--security-efforts---more-talk--less-action.md";
  slug: "kdf-s-laikipia--security-efforts---more-talk--less-action";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"keir-starmer--a-week-of-mandelsonian-peril--or-just-more-political-flotsam.md": {
	id: "keir-starmer--a-week-of-mandelsonian-peril--or-just-more-political-flotsam.md";
  slug: "keir-starmer--a-week-of-mandelsonian-peril--or-just-more-political-flotsam";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"keir-starmer-s-perilous-week--the-mandelson-shadow-looms-large.md": {
	id: "keir-starmer-s-perilous-week--the-mandelson-shadow-looms-large.md";
  slug: "keir-starmer-s-perilous-week--the-mandelson-shadow-looms-large";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"keith-urban-is-the-human-version-of-a-hot-mic-and-we-are-all-living-for-the-mess.md": {
	id: "keith-urban-is-the-human-version-of-a-hot-mic-and-we-are-all-living-for-the-mess.md";
  slug: "keith-urban-is-the-human-version-of-a-hot-mic-and-we-are-all-living-for-the-mess";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ken-watanabe-s-kabuki-movie-doubts-were-justified.md": {
	id: "ken-watanabe-s-kabuki-movie-doubts-were-justified.md";
  slug: "ken-watanabe-s-kabuki-movie-doubts-were-justified";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenha-announces-eight-day-night-closure-of-uhuru-highway-section-for-maintenance.md": {
	id: "kenha-announces-eight-day-night-closure-of-uhuru-highway-section-for-maintenance.md";
  slug: "kenha-announces-eight-day-night-closure-of-uhuru-highway-section-for-maintenance";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenha-urges-motorists-to-observe-road-safety-ahead-of-safari-rally.md": {
	id: "kenha-urges-motorists-to-observe-road-safety-ahead-of-safari-rally.md";
  slug: "kenha-urges-motorists-to-observe-road-safety-ahead-of-safari-rally";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya---4-security-and-trade-agreements-signed-with-mozambique.md": {
	id: "kenya---4-security-and-trade-agreements-signed-with-mozambique.md";
  slug: "kenya---4-security-and-trade-agreements-signed-with-mozambique";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya--ruto-s-eid-message---unity-and-compassion-or-just-hot-air-for-kenyans.md": {
	id: "kenya--ruto-s-eid-message---unity-and-compassion-or-just-hot-air-for-kenyans.md";
  slug: "kenya--ruto-s-eid-message---unity-and-compassion-or-just-hot-air-for-kenyans";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya--sisters-confront-human-trafficking-in-the-digital-age.md": {
	id: "kenya--sisters-confront-human-trafficking-in-the-digital-age.md";
  slug: "kenya--sisters-confront-human-trafficking-in-the-digital-age";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya--uganda-double-down-on-chinese-rail-debt--we-re-all-paying.md": {
	id: "kenya--uganda-double-down-on-chinese-rail-debt--we-re-all-paying.md";
  slug: "kenya--uganda-double-down-on-chinese-rail-debt--we-re-all-paying";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-airways--full-planes--empty-pockets--same-old-mess.md": {
	id: "kenya-airways--full-planes--empty-pockets--same-old-mess.md";
  slug: "kenya-airways--full-planes--empty-pockets--same-old-mess";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-airways-blames-iran-war-for-full-flights---just-don-t-ask-about-fuel.md": {
	id: "kenya-airways-blames-iran-war-for-full-flights---just-don-t-ask-about-fuel.md";
  slug: "kenya-airways-blames-iran-war-for-full-flights---just-don-t-ask-about-fuel";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-and-uganda-launch-sgr-to-link-mombasa-to-great-lakes--but-who-s-picking-up-the-tab.md": {
	id: "kenya-and-uganda-launch-sgr-to-link-mombasa-to-great-lakes--but-who-s-picking-up-the-tab.md";
  slug: "kenya-and-uganda-launch-sgr-to-link-mombasa-to-great-lakes--but-who-s-picking-up-the-tab";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-bishops--marriage-certificates-scarce--civil-registration-a-mess--lives-worthless.md": {
	id: "kenya-bishops--marriage-certificates-scarce--civil-registration-a-mess--lives-worthless.md";
  slug: "kenya-bishops--marriage-certificates-scarce--civil-registration-a-mess--lives-worthless";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-celebrates-sawe-s-sub-two-run--more-state-shambles--less-real-change.md": {
	id: "kenya-celebrates-sawe-s-sub-two-run--more-state-shambles--less-real-change.md";
  slug: "kenya-celebrates-sawe-s-sub-two-run--more-state-shambles--less-real-change";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-court-reverses-abortion-rights--women-still-facing-dangerous-back-alleys.md": {
	id: "kenya-court-reverses-abortion-rights--women-still-facing-dangerous-back-alleys.md";
  slug: "kenya-court-reverses-abortion-rights--women-still-facing-dangerous-back-alleys";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-creative-economy-sucks-up-global-cash--nairobi-investors-eyeing-the-spoils.md": {
	id: "kenya-creative-economy-sucks-up-global-cash--nairobi-investors-eyeing-the-spoils.md";
  slug: "kenya-creative-economy-sucks-up-global-cash--nairobi-investors-eyeing-the-spoils";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-defence-forces-planting-trees-along-kiu-river--another-photo-op-for--nurturing-nature.md": {
	id: "kenya-defence-forces-planting-trees-along-kiu-river--another-photo-op-for--nurturing-nature.md";
  slug: "kenya-defence-forces-planting-trees-along-kiu-river--another-photo-op-for--nurturing-nature";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-diaspora-economy--billions-flow-in--but-investment-hits-walls-and-trust-deficits.md": {
	id: "kenya-diaspora-economy--billions-flow-in--but-investment-hits-walls-and-trust-deficits.md";
  slug: "kenya-diaspora-economy--billions-flow-in--but-investment-hits-walls-and-trust-deficits";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-economy--power--not-people--as-2027-election-looms--treasury---parliament-tear-it-apart.md": {
	id: "kenya-economy--power--not-people--as-2027-election-looms--treasury---parliament-tear-it-apart.md";
  slug: "kenya-economy--power--not-people--as-2027-election-looms--treasury---parliament-tear-it-apart";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-energy-big-shots--resign--over-shady-fuel-deal---dawan-africa.md": {
	id: "kenya-energy-big-shots--resign--over-shady-fuel-deal---dawan-africa.md";
  slug: "kenya-energy-big-shots--resign--over-shady-fuel-deal---dawan-africa";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-energy-execs-step-down-amid-fuel-manipulation-probe.md": {
	id: "kenya-energy-execs-step-down-amid-fuel-manipulation-probe.md";
  slug: "kenya-energy-execs-step-down-amid-fuel-manipulation-probe";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-energy-sector-on-edge--substandard-fuel-scandal-sparks-political-circus-and-market-shockwaves.md": {
	id: "kenya-energy-sector-on-edge--substandard-fuel-scandal-sparks-political-circus-and-market-shockwaves.md";
  slug: "kenya-energy-sector-on-edge--substandard-fuel-scandal-sparks-political-circus-and-market-shockwaves";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-energy-sector-s-fuel-data-scheme-exposed--more-corrupt-officials-playing-games.md": {
	id: "kenya-energy-sector-s-fuel-data-scheme-exposed--more-corrupt-officials-playing-games.md";
  slug: "kenya-energy-sector-s-fuel-data-scheme-exposed--more-corrupt-officials-playing-games";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-eyes-china-partnership-for-nairobi-thika-overpass-to-ease-congestion---china-daily.md": {
	id: "kenya-eyes-china-partnership-for-nairobi-thika-overpass-to-ease-congestion---china-daily.md";
  slug: "kenya-eyes-china-partnership-for-nairobi-thika-overpass-to-ease-congestion---china-daily";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-eyes-trade--investment-opportunities-in-ruto-s-italy-visit---more-hot-air.md": {
	id: "kenya-eyes-trade--investment-opportunities-in-ruto-s-italy-visit---more-hot-air.md";
  slug: "kenya-eyes-trade--investment-opportunities-in-ruto-s-italy-visit---more-hot-air";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-football-is-just-a-scripted-soap-opera-for-asian-bookies.md": {
	id: "kenya-football-is-just-a-scripted-soap-opera-for-asian-bookies.md";
  slug: "kenya-football-is-just-a-scripted-soap-opera-for-asian-bookies";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-fuel-retailers-running-short-of-supplies-due-to-middle-east-war---thecitizen-co-tz.md": {
	id: "kenya-fuel-retailers-running-short-of-supplies-due-to-middle-east-war---thecitizen-co-tz.md";
  slug: "kenya-fuel-retailers-running-short-of-supplies-due-to-middle-east-war---thecitizen-co-tz";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-gazette-2nd-april-2026--more-appointments--same-old-circus.md": {
	id: "kenya-gazette-2nd-april-2026--more-appointments--same-old-circus.md";
  slug: "kenya-gazette-2nd-april-2026--more-appointments--same-old-circus";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-government-s-russia-recruitment-mess--citizens-fighting-abroad--officials-dodging-blame.md": {
	id: "kenya-government-s-russia-recruitment-mess--citizens-fighting-abroad--officials-dodging-blame.md";
  slug: "kenya-government-s-russia-recruitment-mess--citizens-fighting-abroad--officials-dodging-blame";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-hiv-surge-2025-reckless-gen-z.md": {
	id: "kenya-hiv-surge-2025-reckless-gen-z.md";
  slug: "kenya-hiv-surge-2025-reckless-gen-z";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-hospital-morgue-bodies-found-in-mass-grave--police-say--so-what-else-is-new.md": {
	id: "kenya-hospital-morgue-bodies-found-in-mass-grave--police-say--so-what-else-is-new.md";
  slug: "kenya-hospital-morgue-bodies-found-in-mass-grave--police-say--so-what-else-is-new";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-in-transition--economic-hurdles--political-fractures--and-global-security-shifts.md": {
	id: "kenya-in-transition--economic-hurdles--political-fractures--and-global-security-shifts.md";
  slug: "kenya-in-transition--economic-hurdles--political-fractures--and-global-security-shifts";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-is-not-a-country--it-s-a-limited-liability-company.md": {
	id: "kenya-is-not-a-country--it-s-a-limited-liability-company.md";
  slug: "kenya-is-not-a-country--it-s-a-limited-liability-company";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-justice-negotiations-with-power-means-more-disappointment.md": {
	id: "kenya-justice-negotiations-with-power-means-more-disappointment.md";
  slug: "kenya-justice-negotiations-with-power-means-more-disappointment";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-maintains-civic-freedom-as-uganda-tightens-control.md": {
	id: "kenya-maintains-civic-freedom-as-uganda-tightens-control.md";
  slug: "kenya-maintains-civic-freedom-as-uganda-tightens-control";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-moore-s-hair-spa-evicted--brit-eady-smirks--quad-webb-issues-karma-warning.md": {
	id: "kenya-moore-s-hair-spa-evicted--brit-eady-smirks--quad-webb-issues-karma-warning.md";
  slug: "kenya-moore-s-hair-spa-evicted--brit-eady-smirks--quad-webb-issues-karma-warning";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-mourns-educationist-raphael-munavu-as-president-ruto-leads-tributes.md": {
	id: "kenya-mourns-educationist-raphael-munavu-as-president-ruto-leads-tributes.md";
  slug: "kenya-mourns-educationist-raphael-munavu-as-president-ruto-leads-tributes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-navigates-great-power-rivalry--a-cynical-look-at-ruto-s-global-game.md": {
	id: "kenya-navigates-great-power-rivalry--a-cynical-look-at-ruto-s-global-game.md";
  slug: "kenya-navigates-great-power-rivalry--a-cynical-look-at-ruto-s-global-game";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-parliament--can-they-actually-order-anyone-to-do-anything.md": {
	id: "kenya-parliament--can-they-actually-order-anyone-to-do-anything.md";
  slug: "kenya-parliament--can-they-actually-order-anyone-to-do-anything";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-police-bullets-still-chasing-glory-while-vihiga-queens-just-pretending--standard-reports.md": {
	id: "kenya-police-bullets-still-chasing-glory-while-vihiga-queens-just-pretending--standard-reports.md";
  slug: "kenya-police-bullets-still-chasing-glory-while-vihiga-queens-just-pretending--standard-reports";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-police-fc-kinanga--harmony-built-on-laughter--not-force--apparently.md": {
	id: "kenya-police-fc-kinanga--harmony-built-on-laughter--not-force--apparently.md";
  slug: "kenya-police-fc-kinanga--harmony-built-on-laughter--not-force--apparently";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-police-fc-s-fkf-cup-title-dreams--muyoti-s-bullish-claims-face-reality.md": {
	id: "kenya-police-fc-s-fkf-cup-title-dreams--muyoti-s-bullish-claims-face-reality.md";
  slug: "kenya-police-fc-s-fkf-cup-title-dreams--muyoti-s-bullish-claims-face-reality";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-police-fc-steal-three-points-off-kcb-fc--because-of-course-they-did.md": {
	id: "kenya-police-fc-steal-three-points-off-kcb-fc--because-of-course-they-did.md";
  slug: "kenya-police-fc-steal-three-points-off-kcb-fc--because-of-course-they-did";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-police-get-new-training-guide-for-sgbv--but-will-it-actually-work.md": {
	id: "kenya-police-get-new-training-guide-for-sgbv--but-will-it-actually-work.md";
  slug: "kenya-police-get-new-training-guide-for-sgbv--but-will-it-actually-work";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-police-posts-left-in-the-dark-by-duty-shadows---streamlinefeed-co-ke.md": {
	id: "kenya-police-posts-left-in-the-dark-by-duty-shadows---streamlinefeed-co-ke.md";
  slug: "kenya-police-posts-left-in-the-dark-by-duty-shadows---streamlinefeed-co-ke";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-police-sexual-exploitation-claims-in-haiti--they-say-it-s-not-true--what-else-is-new.md": {
	id: "kenya-police-sexual-exploitation-claims-in-haiti--they-say-it-s-not-true--what-else-is-new.md";
  slug: "kenya-police-sexual-exploitation-claims-in-haiti--they-say-it-s-not-true--what-else-is-new";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-police-unearth-mass-grave-with-33-bodies---surprise--surprise.md": {
	id: "kenya-police-unearth-mass-grave-with-33-bodies---surprise--surprise.md";
  slug: "kenya-police-unearth-mass-grave-with-33-bodies---surprise--surprise";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-ports-authority--explains--role-in-ksh4-8-billion-fuel-import-scandal--dodges-blame.md": {
	id: "kenya-ports-authority--explains--role-in-ksh4-8-billion-fuel-import-scandal--dodges-blame.md";
  slug: "kenya-ports-authority--explains--role-in-ksh4-8-billion-fuel-import-scandal--dodges-blame";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-ports-authority-announces-12-month-internship-program---age-and-experience-a-no-go.md": {
	id: "kenya-ports-authority-announces-12-month-internship-program---age-and-experience-a-no-go.md";
  slug: "kenya-ports-authority-announces-12-month-internship-program---age-and-experience-a-no-go";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-power-plunges-nyamira-into-darkness-march-15--blackout-or-just-another-excuse.md": {
	id: "kenya-power-plunges-nyamira-into-darkness-march-15--blackout-or-just-another-excuse.md";
  slug: "kenya-power-plunges-nyamira-into-darkness-march-15--blackout-or-just-another-excuse";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-power-s--blackout-list---are-we-all-just-pawns-in-their-upgrade-game.md": {
	id: "kenya-power-s--blackout-list---are-we-all-just-pawns-in-their-upgrade-game.md";
  slug: "kenya-power-s--blackout-list---are-we-all-just-pawns-in-their-upgrade-game";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-power-s-pole-dancing-for-wifi--elderly-electrocuted-in-kisii.md": {
	id: "kenya-power-s-pole-dancing-for-wifi--elderly-electrocuted-in-kisii.md";
  slug: "kenya-power-s-pole-dancing-for-wifi--elderly-electrocuted-in-kisii";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-prisons-issues-warning-over-fake-accounts-impersonating-commissioner-general.md": {
	id: "kenya-prisons-issues-warning-over-fake-accounts-impersonating-commissioner-general.md";
  slug: "kenya-prisons-issues-warning-over-fake-accounts-impersonating-commissioner-general";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-private-sector-activity-contracts-for-second-month--fuel-price-hike-hits-consumers-hard.md": {
	id: "kenya-private-sector-activity-contracts-for-second-month--fuel-price-hike-hits-consumers-hard.md";
  slug: "kenya-private-sector-activity-contracts-for-second-month--fuel-price-hike-hits-consumers-hard";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-pulls-troops-from-haiti--un-reveals-african-replacements.md": {
	id: "kenya-pulls-troops-from-haiti--un-reveals-african-replacements.md";
  slug: "kenya-pulls-troops-from-haiti--un-reveals-african-replacements";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-rastafarians-high-court-cannabis-ban-challenge--spiritual-right-or-just-another-hustle.md": {
	id: "kenya-rastafarians-high-court-cannabis-ban-challenge--spiritual-right-or-just-another-hustle.md";
  slug: "kenya-rastafarians-high-court-cannabis-ban-challenge--spiritual-right-or-just-another-hustle";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s--black-gold--is-just-another-black-hole-for-your-taxes.md": {
	id: "kenya-s--black-gold--is-just-another-black-hole-for-your-taxes.md";
  slug: "kenya-s--black-gold--is-just-another-black-hole-for-your-taxes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s--gangsta-s-paradise---goons-are-the-new-vips--darling.md": {
	id: "kenya-s--gangsta-s-paradise---goons-are-the-new-vips--darling.md";
  slug: "kenya-s--gangsta-s-paradise---goons-are-the-new-vips--darling";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s--road-to-singapore---beware-of-rhetorical-exoticism.md": {
	id: "kenya-s--road-to-singapore---beware-of-rhetorical-exoticism.md";
  slug: "kenya-s--road-to-singapore---beware-of-rhetorical-exoticism";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-12-million-silent-voters--get-ready-for-the-usual-circus.md": {
	id: "kenya-s-12-million-silent-voters--get-ready-for-the-usual-circus.md";
  slug: "kenya-s-12-million-silent-voters--get-ready-for-the-usual-circus";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-2027-race-reopens-old-fault-lines--another-round-of-empty-promises.md": {
	id: "kenya-s-2027-race-reopens-old-fault-lines--another-round-of-empty-promises.md";
  slug: "kenya-s-2027-race-reopens-old-fault-lines--another-round-of-empty-promises";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-ai-bill--women-exposed-while-governing-the-ungovernable.md": {
	id: "kenya-s-ai-bill--women-exposed-while-governing-the-ungovernable.md";
  slug: "kenya-s-ai-bill--women-exposed-while-governing-the-ungovernable";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-borders--ministry-of-health-s-mpox-dance-with-truckers-and-sex-workers.md": {
	id: "kenya-s-borders--ministry-of-health-s-mpox-dance-with-truckers-and-sex-workers.md";
  slug: "kenya-s-borders--ministry-of-health-s-mpox-dance-with-truckers-and-sex-workers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-card-production-dreams--more-promises--less-progress.md": {
	id: "kenya-s-card-production-dreams--more-promises--less-progress.md";
  slug: "kenya-s-card-production-dreams--more-promises--less-progress";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-climate-risk-insurance--another-fancy-idea-for-the-same-old-mess.md": {
	id: "kenya-s-climate-risk-insurance--another-fancy-idea-for-the-same-old-mess.md";
  slug: "kenya-s-climate-risk-insurance--another-fancy-idea-for-the-same-old-mess";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-digital-economy--retention-is-the-new-growth-engine---nairobi-pays-the-price.md": {
	id: "kenya-s-digital-economy--retention-is-the-new-growth-engine---nairobi-pays-the-price.md";
  slug: "kenya-s-digital-economy--retention-is-the-new-growth-engine---nairobi-pays-the-price";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-digital-hub-dreams--another-summit--more-hot-air.md": {
	id: "kenya-s-digital-hub-dreams--another-summit--more-hot-air.md";
  slug: "kenya-s-digital-hub-dreams--another-summit--more-hot-air";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-digital-welfare-shift--a-scam-cloaked-in-mobile-money-for-the-elderly.md": {
	id: "kenya-s-digital-welfare-shift--a-scam-cloaked-in-mobile-money-for-the-elderly.md";
  slug: "kenya-s-digital-welfare-shift--a-scam-cloaked-in-mobile-money-for-the-elderly";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-domestic-debt-scandal--the-elite-s-personal-atm.md": {
	id: "kenya-s-domestic-debt-scandal--the-elite-s-personal-atm.md";
  slug: "kenya-s-domestic-debt-scandal--the-elite-s-personal-atm";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-economic-surge--record-trades--policy-shifts--and-a-bold-leap-into-the-future.md": {
	id: "kenya-s-economic-surge--record-trades--policy-shifts--and-a-bold-leap-into-the-future.md";
  slug: "kenya-s-economic-surge--record-trades--policy-shifts--and-a-bold-leap-into-the-future";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-empty-rhetoric--unite-or-watch-africa-s-moment-become-a-nightmare.md": {
	id: "kenya-s-empty-rhetoric--unite-or-watch-africa-s-moment-become-a-nightmare.md";
  slug: "kenya-s-empty-rhetoric--unite-or-watch-africa-s-moment-become-a-nightmare";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-expanding-economy-of-violence--a-goons--paradise-fueled-by-power-and-impunity.md": {
	id: "kenya-s-expanding-economy-of-violence--a-goons--paradise-fueled-by-power-and-impunity.md";
  slug: "kenya-s-expanding-economy-of-violence--a-goons--paradise-fueled-by-power-and-impunity";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-fuel-market-under-strain-as-tanzania-holds-its-own-against-shipping-chaos.md": {
	id: "kenya-s-fuel-market-under-strain-as-tanzania-holds-its-own-against-shipping-chaos.md";
  slug: "kenya-s-fuel-market-under-strain-as-tanzania-holds-its-own-against-shipping-chaos";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-gems-waiting-for-you-to-find--enjoy-and-experience---standardmedia-co-ke.md": {
	id: "kenya-s-gems-waiting-for-you-to-find--enjoy-and-experience---standardmedia-co-ke.md";
  slug: "kenya-s-gems-waiting-for-you-to-find--enjoy-and-experience---standardmedia-co-ke";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-iran-plane-shenanigans--another-day--another-scandal.md": {
	id: "kenya-s-iran-plane-shenanigans--another-day--another-scandal.md";
  slug: "kenya-s-iran-plane-shenanigans--another-day--another-scandal";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-ivory-bust--another-110-kilos--same-old-story-of-follow-through-questions.md": {
	id: "kenya-s-ivory-bust--another-110-kilos--same-old-story-of-follow-through-questions.md";
  slug: "kenya-s-ivory-bust--another-110-kilos--same-old-story-of-follow-through-questions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-jet-fuel-crisis-means-pricier-flights--as-african-nations-get-squeezed.md": {
	id: "kenya-s-jet-fuel-crisis-means-pricier-flights--as-african-nations-get-squeezed.md";
  slug: "kenya-s-jet-fuel-crisis-means-pricier-flights--as-african-nations-get-squeezed";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-meat-grinder--how-river-road-agents-are-shipping-our-boys-to-die-in-russia.md": {
	id: "kenya-s-meat-grinder--how-river-road-agents-are-shipping-our-boys-to-die-in-russia.md";
  slug: "kenya-s-meat-grinder--how-river-road-agents-are-shipping-our-boys-to-die-in-russia";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-new-bangkok---jakarta-envoys--more-than-just-pretty-faces-amidst-scam-scandals.md": {
	id: "kenya-s-new-bangkok---jakarta-envoys--more-than-just-pretty-faces-amidst-scam-scandals.md";
  slug: "kenya-s-new-bangkok---jakarta-envoys--more-than-just-pretty-faces-amidst-scam-scandals";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-oldest-teenager--dr--oburu-oginga-and-the-odm-circus.md": {
	id: "kenya-s-oldest-teenager--dr--oburu-oginga-and-the-odm-circus.md";
  slug: "kenya-s-oldest-teenager--dr--oburu-oginga-and-the-odm-circus";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-passport-gate--when-your-bank-account-vets-you-better-than-the-nis.md": {
	id: "kenya-s-passport-gate--when-your-bank-account-vets-you-better-than-the-nis.md";
  slug: "kenya-s-passport-gate--when-your-bank-account-vets-you-better-than-the-nis";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-password-theft-and-spyware-attacks-skyrocket-83----another-day--another-way-to-get-ripped-off.md": {
	id: "kenya-s-password-theft-and-spyware-attacks-skyrocket-83----another-day--another-way-to-get-ripped-off.md";
  slug: "kenya-s-password-theft-and-spyware-attacks-skyrocket-83----another-day--another-way-to-get-ripped-off";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-president-william-ruto-faces-backlash-after-mocking-nigerians--spoken-english---bbc.md": {
	id: "kenya-s-president-william-ruto-faces-backlash-after-mocking-nigerians--spoken-english---bbc.md";
  slug: "kenya-s-president-william-ruto-faces-backlash-after-mocking-nigerians--spoken-english---bbc";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-ruto-s-security-apparatus--the-inner-circle-exposed.md": {
	id: "kenya-s-ruto-s-security-apparatus--the-inner-circle-exposed.md";
  slug: "kenya-s-ruto-s-security-apparatus--the-inner-circle-exposed";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-sacco-sector-overhaul--experts-demand-legal-and-regulatory-makeover--but-who-s-really-listening.md": {
	id: "kenya-s-sacco-sector-overhaul--experts-demand-legal-and-regulatory-makeover--but-who-s-really-listening.md";
  slug: "kenya-s-sacco-sector-overhaul--experts-demand-legal-and-regulatory-makeover--but-who-s-really-listening";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-safari-rally-roars-again--makes-same-old-case-for-wrc-future.md": {
	id: "kenya-s-safari-rally-roars-again--makes-same-old-case-for-wrc-future.md";
  slug: "kenya-s-safari-rally-roars-again--makes-same-old-case-for-wrc-future";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-security-sector-reform-push--another-round-of-hot-air-and-empty-promises.md": {
	id: "kenya-s-security-sector-reform-push--another-round-of-hot-air-and-empty-promises.md";
  slug: "kenya-s-security-sector-reform-push--another-round-of-hot-air-and-empty-promises";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-sex-for-jobs--services-scandal--eacc-report-exposes-the-nasty-truth.md": {
	id: "kenya-s-sex-for-jobs--services-scandal--eacc-report-exposes-the-nasty-truth.md";
  slug: "kenya-s-sex-for-jobs--services-scandal--eacc-report-exposes-the-nasty-truth";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-top-energy-officials-resign-amidst-fuel-scandal-fabrications.md": {
	id: "kenya-s-top-energy-officials-resign-amidst-fuel-scandal-fabrications.md";
  slug: "kenya-s-top-energy-officials-resign-amidst-fuel-scandal-fabrications";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-track-stars-or-pharmacy-posters--the-messy-truth-behind-the-latest-doping-ban.md": {
	id: "kenya-s-track-stars-or-pharmacy-posters--the-messy-truth-behind-the-latest-doping-ban.md";
  slug: "kenya-s-track-stars-or-pharmacy-posters--the-messy-truth-behind-the-latest-doping-ban";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-truckers-eye-14--hike-as-diesel-prices-reach-new-heights.md": {
	id: "kenya-s-truckers-eye-14--hike-as-diesel-prices-reach-new-heights.md";
  slug: "kenya-s-truckers-eye-14--hike-as-diesel-prices-reach-new-heights";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-viral-gossip-industrial-complex--the-economy-of-rumor-and-media-s-shameful-bargain.md": {
	id: "kenya-s-viral-gossip-industrial-complex--the-economy-of-rumor-and-media-s-shameful-bargain.md";
  slug: "kenya-s-viral-gossip-industrial-complex--the-economy-of-rumor-and-media-s-shameful-bargain";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-volleyball-coach-recalls-10-players-for-africa-cup-of-nations.md": {
	id: "kenya-s-volleyball-coach-recalls-10-players-for-africa-cup-of-nations.md";
  slug: "kenya-s-volleyball-coach-recalls-10-players-for-africa-cup-of-nations";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-young-climate-influencers-driving-real-change---dw-com.md": {
	id: "kenya-s-young-climate-influencers-driving-real-change---dw-com.md";
  slug: "kenya-s-young-climate-influencers-driving-real-change---dw-com";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-youth-are-getting-cyberbullied-into-oblivion--the-digital-scars-nobody-s-talking-about.md": {
	id: "kenya-s-youth-are-getting-cyberbullied-into-oblivion--the-digital-scars-nobody-s-talking-about.md";
  slug: "kenya-s-youth-are-getting-cyberbullied-into-oblivion--the-digital-scars-nobody-s-talking-about";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-s-youth-empowerment-drive--the-paradox-of-funding-vs--sustainability---streamlinefeed-co-ke.md": {
	id: "kenya-s-youth-empowerment-drive--the-paradox-of-funding-vs--sustainability---streamlinefeed-co-ke.md";
  slug: "kenya-s-youth-empowerment-drive--the-paradox-of-funding-vs--sustainability---streamlinefeed-co-ke";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-sgr-to-kisumu--more-tracks--more-debt--same-old-story.md": {
	id: "kenya-sgr-to-kisumu--more-tracks--more-debt--same-old-story.md";
  slug: "kenya-sgr-to-kisumu--more-tracks--more-debt--same-old-story";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-sports-bill-seeks-to-criminalize-match-fixing--but-don-t-hold-your-breath.md": {
	id: "kenya-sports-bill-seeks-to-criminalize-match-fixing--but-don-t-hold-your-breath.md";
  slug: "kenya-sports-bill-seeks-to-criminalize-match-fixing--but-don-t-hold-your-breath";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-stock-market-mobile-mpesa.md": {
	id: "kenya-stock-market-mobile-mpesa.md";
  slug: "kenya-stock-market-mobile-mpesa";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-told-to-back-local-drug-making-as-africa-eyes-2040-medicine-target---health-business.md": {
	id: "kenya-told-to-back-local-drug-making-as-africa-eyes-2040-medicine-target---health-business.md";
  slug: "kenya-told-to-back-local-drug-making-as-africa-eyes-2040-medicine-target---health-business";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-top-energy-officials-out-over-g2g-fuel-scam.md": {
	id: "kenya-top-energy-officials-out-over-g2g-fuel-scam.md";
  slug: "kenya-top-energy-officials-out-over-g2g-fuel-scam";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-turns-to-mozambique-for-gas-as-gulf-turmoil-deepens.md": {
	id: "kenya-turns-to-mozambique-for-gas-as-gulf-turmoil-deepens.md";
  slug: "kenya-turns-to-mozambique-for-gas-as-gulf-turmoil-deepens";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-violence-escalates-as-politicians-stoke-fears-of-return-to-unrest.md": {
	id: "kenya-violence-escalates-as-politicians-stoke-fears-of-return-to-unrest.md";
  slug: "kenya-violence-escalates-as-politicians-stoke-fears-of-return-to-unrest";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-vs-morocco-1-0.md": {
	id: "kenya-vs-morocco-1-0.md";
  slug: "kenya-vs-morocco-1-0";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-women-governors-woman-rep-useless-verdict.md": {
	id: "kenya-women-governors-woman-rep-useless-verdict.md";
  slug: "kenya-women-governors-woman-rep-useless-verdict";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenya-youth-protests--dissent-or-danger--state-s-brutal-response-exposed.md": {
	id: "kenya-youth-protests--dissent-or-danger--state-s-brutal-response-exposed.md";
  slug: "kenya-youth-protests--dissent-or-danger--state-s-brutal-response-exposed";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenyan--top-influencers--grab-sh296m-as-creator-economy-hits-sh1bn---mostly-hot-air.md": {
	id: "kenyan--top-influencers--grab-sh296m-as-creator-economy-hits-sh1bn---mostly-hot-air.md";
  slug: "kenyan--top-influencers--grab-sh296m-as-creator-economy-hits-sh1bn---mostly-hot-air";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenyan-bishops-lament-politicians--insults---scandal-to-kids--trauma-for-youth.md": {
	id: "kenyan-bishops-lament-politicians--insults---scandal-to-kids--trauma-for-youth.md";
  slug: "kenyan-bishops-lament-politicians--insults---scandal-to-kids--trauma-for-youth";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenyan-blood-is-the-new-export-for-nairobi-s-greedy-elite.md": {
	id: "kenyan-blood-is-the-new-export-for-nairobi-s-greedy-elite.md";
  slug: "kenyan-blood-is-the-new-export-for-nairobi-s-greedy-elite";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenyan-celebs--arsenal-meltdown-after-man-city-s-title-race-blow-up.md": {
	id: "kenyan-celebs--arsenal-meltdown-after-man-city-s-title-race-blow-up.md";
  slug: "kenyan-celebs--arsenal-meltdown-after-man-city-s-title-race-blow-up";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenyan-cheetahs-shipped-off-to-gujarat-s-banni-grasslands--another-wild-goose-chase.md": {
	id: "kenyan-cheetahs-shipped-off-to-gujarat-s-banni-grasslands--another-wild-goose-chase.md";
  slug: "kenyan-cheetahs-shipped-off-to-gujarat-s-banni-grasslands--another-wild-goose-chase";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenyan-football-is-just-a-betting-app-with-human-props.md": {
	id: "kenyan-football-is-just-a-betting-app-with-human-props.md";
  slug: "kenyan-football-is-just-a-betting-app-with-human-props";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenyan-merchants-on-amazon--another-digital-wall-they-can-t-climb.md": {
	id: "kenyan-merchants-on-amazon--another-digital-wall-they-can-t-climb.md";
  slug: "kenyan-merchants-on-amazon--another-digital-wall-they-can-t-climb";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenyan-passport-scandal--state-denial-meets-us-sanction-data---big-mess.md": {
	id: "kenyan-passport-scandal--state-denial-meets-us-sanction-data---big-mess.md";
  slug: "kenyan-passport-scandal--state-denial-meets-us-sanction-data---big-mess";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenyan-police-officer-s-bigamy-saga--proof-the-law-is-just-a-suggestion.md": {
	id: "kenyan-police-officer-s-bigamy-saga--proof-the-law-is-just-a-suggestion.md";
  slug: "kenyan-police-officer-s-bigamy-saga--proof-the-law-is-just-a-suggestion";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenyan-police-return-from-haiti-mission--another-exercise-in-futility.md": {
	id: "kenyan-police-return-from-haiti-mission--another-exercise-in-futility.md";
  slug: "kenyan-police-return-from-haiti-mission--another-exercise-in-futility";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenyan-rastas-demand-holy-herb-rights-in-high-court--claiming-spiritual-necessity.md": {
	id: "kenyan-rastas-demand-holy-herb-rights-in-high-court--claiming-spiritual-necessity.md";
  slug: "kenyan-rastas-demand-holy-herb-rights-in-high-court--claiming-spiritual-necessity";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenyan-ship-held-in-tanzania--another-diplomatic-scramble-amidst-smuggling-suspicions.md": {
	id: "kenyan-ship-held-in-tanzania--another-diplomatic-scramble-amidst-smuggling-suspicions.md";
  slug: "kenyan-ship-held-in-tanzania--another-diplomatic-scramble-amidst-smuggling-suspicions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenyan-streamer-vindee-ranked-3rd-in-africa---don-t-hold-your-breath-for-no-1.md": {
	id: "kenyan-streamer-vindee-ranked-3rd-in-africa---don-t-hold-your-breath-for-no-1.md";
  slug: "kenyan-streamer-vindee-ranked-3rd-in-africa---don-t-hold-your-breath-for-no-1";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenyan-troop-withdrawal-leaves-security-vacuum-as-haitian-police-face-intensifying-gang-threats.md": {
	id: "kenyan-troop-withdrawal-leaves-security-vacuum-as-haitian-police-face-intensifying-gang-threats.md";
  slug: "kenyan-troop-withdrawal-leaves-security-vacuum-as-haitian-police-face-intensifying-gang-threats";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenyan-youngster-wilson-embraces-swedish-tactical-rigmarole---probably-for-the-scraps.md": {
	id: "kenyan-youngster-wilson-embraces-swedish-tactical-rigmarole---probably-for-the-scraps.md";
  slug: "kenyan-youngster-wilson-embraces-swedish-tactical-rigmarole---probably-for-the-scraps";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenyans-abandon-bars-for-cars--another-sign-we-re-broke-and-scared.md": {
	id: "kenyans-abandon-bars-for-cars--another-sign-we-re-broke-and-scared.md";
  slug: "kenyans-abandon-bars-for-cars--another-sign-we-re-broke-and-scared";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenyans-back-from-haiti--but-one-officer-s-fate-remains-a-sick-joke.md": {
	id: "kenyans-back-from-haiti--but-one-officer-s-fate-remains-a-sick-joke.md";
  slug: "kenyans-back-from-haiti--but-one-officer-s-fate-remains-a-sick-joke";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenyans-feel-the-fuel-price--pain--again---ruto-says-it-s-global-forces--of-course.md": {
	id: "kenyans-feel-the-fuel-price--pain--again---ruto-says-it-s-global-forces--of-course.md";
  slug: "kenyans-feel-the-fuel-price--pain--again---ruto-says-it-s-global-forces--of-course";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenyans-in-haiti--mission--hearts-won--is-a-punchline--locals-now-block-police-exit.md": {
	id: "kenyans-in-haiti--mission--hearts-won--is-a-punchline--locals-now-block-police-exit.md";
  slug: "kenyans-in-haiti--mission--hearts-won--is-a-punchline--locals-now-block-police-exit";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenyans-urged-to--drive--trade-and-investment---which-means-more-meetings-and-less-cash-for-us.md": {
	id: "kenyans-urged-to--drive--trade-and-investment---which-means-more-meetings-and-less-cash-for-us.md";
  slug: "kenyans-urged-to--drive--trade-and-investment---which-means-more-meetings-and-less-cash-for-us";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenyans-use-google-search-and-ai-to-master-the-technical-skills-needed-for-the-future--apparently.md": {
	id: "kenyans-use-google-search-and-ai-to-master-the-technical-skills-needed-for-the-future--apparently.md";
  slug: "kenyans-use-google-search-and-ai-to-master-the-technical-skills-needed-for-the-future--apparently";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kenyas-oldest-hustle-in-5g.md": {
	id: "kenyas-oldest-hustle-in-5g.md";
  slug: "kenyas-oldest-hustle-in-5g";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kericho-mass-grave-shocker--more-bodies-than-expected--mostly-little-ones--dug-up-in-kenya.md": {
	id: "kericho-mass-grave-shocker--more-bodies-than-expected--mostly-little-ones--dug-up-in-kenya.md";
  slug: "kericho-mass-grave-shocker--more-bodies-than-expected--mostly-little-ones--dug-up-in-kenya";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kericho-s-makaburini--head-injuries--medical-neglect-revealed-for-8-victims--more-bodies-found-than-expected.md": {
	id: "kericho-s-makaburini--head-injuries--medical-neglect-revealed-for-8-victims--more-bodies-found-than-expected.md";
  slug: "kericho-s-makaburini--head-injuries--medical-neglect-revealed-for-8-victims--more-bodies-found-than-expected";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"keringet-cops-nab-140-bags-of-fertiliser-that-was-meant-for-farmers--now-just-for-profiteers.md": {
	id: "keringet-cops-nab-140-bags-of-fertiliser-that-was-meant-for-farmers--now-just-for-profiteers.md";
  slug: "keringet-cops-nab-140-bags-of-fertiliser-that-was-meant-for-farmers--now-just-for-profiteers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"key-economic-data--retail-power-shift--and-urban-housing-challenges-in-focus.md": {
	id: "key-economic-data--retail-power-shift--and-urban-housing-challenges-in-focus.md";
  slug: "key-economic-data--retail-power-shift--and-urban-housing-challenges-in-focus";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kim-kardashian-s-latest--no-bull--campaign-is-actually-piling-it-higher-than-ever.md": {
	id: "kim-kardashian-s-latest--no-bull--campaign-is-actually-piling-it-higher-than-ever.md";
  slug: "kim-kardashian-s-latest--no-bull--campaign-is-actually-piling-it-higher-than-ever";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kindiki--waiguru-pledge-mt-kenya-support-for-ruto---the-star-co-ke.md": {
	id: "kindiki--waiguru-pledge-mt-kenya-support-for-ruto---the-star-co-ke.md";
  slug: "kindiki--waiguru-pledge-mt-kenya-support-for-ruto---the-star-co-ke";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kip-keino-innocent-but-reputation-has-suffered--lawyer-says.md": {
	id: "kip-keino-innocent-but-reputation-has-suffered--lawyer-says.md";
  slug: "kip-keino-innocent-but-reputation-has-suffered--lawyer-says";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kipchoge-keino-stadium--a-decade-of-dust-and-33-percent-progress.md": {
	id: "kipchoge-keino-stadium--a-decade-of-dust-and-33-percent-progress.md";
  slug: "kipchoge-keino-stadium--a-decade-of-dust-and-33-percent-progress";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kipchoge-keino-stadium--a-ten-year-tease-that-costs-billions-while-our-stars-run-on-dirt.md": {
	id: "kipchoge-keino-stadium--a-ten-year-tease-that-costs-billions-while-our-stars-run-on-dirt.md";
  slug: "kipchoge-keino-stadium--a-ten-year-tease-that-costs-billions-while-our-stars-run-on-dirt";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kisumu-all-starlets--broke-and-busted--while-police-bullets-take-the-top-spot.md": {
	id: "kisumu-all-starlets--broke-and-busted--while-police-bullets-take-the-top-spot.md";
  slug: "kisumu-all-starlets--broke-and-busted--while-police-bullets-take-the-top-spot";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kisumu-dci-nabs-ex-boyfriend-in-riat-student-s-gang-rape--murder.md": {
	id: "kisumu-dci-nabs-ex-boyfriend-in-riat-student-s-gang-rape--murder.md";
  slug: "kisumu-dci-nabs-ex-boyfriend-in-riat-student-s-gang-rape--murder";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kisumu-launch-pad--ruto-and-museveni-sell-us-another-rails-to-riches-pipedream.md": {
	id: "kisumu-launch-pad--ruto-and-museveni-sell-us-another-rails-to-riches-pipedream.md";
  slug: "kisumu-launch-pad--ruto-and-museveni-sell-us-another-rails-to-riches-pipedream";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kisumu-nightlife-s-fading-heartbeat--the-dance-floor-s-slow-death.md": {
	id: "kisumu-nightlife-s-fading-heartbeat--the-dance-floor-s-slow-death.md";
  slug: "kisumu-nightlife-s-fading-heartbeat--the-dance-floor-s-slow-death";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kitchens--kangaroo-testicles--and-cold-whatsapp-groups--the-i-m-a-celeb-all-star-circus.md": {
	id: "kitchens--kangaroo-testicles--and-cold-whatsapp-groups--the-i-m-a-celeb-all-star-circus.md";
  slug: "kitchens--kangaroo-testicles--and-cold-whatsapp-groups--the-i-m-a-celeb-all-star-circus";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kitengela--from-cow-path-to-concrete-graveyard.md": {
	id: "kitengela--from-cow-path-to-concrete-graveyard.md";
  slug: "kitengela--from-cow-path-to-concrete-graveyard";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kitengela-family-cries-foul--produce-him-in-court--cctv-shows-businessman-abducted.md": {
	id: "kitengela-family-cries-foul--produce-him-in-court--cctv-shows-businessman-abducted.md";
  slug: "kitengela-family-cries-foul--produce-him-in-court--cctv-shows-businessman-abducted";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kitiro---kobuthi--the--fuliza-republic--is-austerity-s-street-level-reckoning.md": {
	id: "kitiro---kobuthi--the--fuliza-republic--is-austerity-s-street-level-reckoning.md";
  slug: "kitiro---kobuthi--the--fuliza-republic--is-austerity-s-street-level-reckoning";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kjsea-2025-results-and-perfomance.md": {
	id: "kjsea-2025-results-and-perfomance.md";
  slug: "kjsea-2025-results-and-perfomance";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kjsea-grade10-placement-chaos-2025.md": {
	id: "kjsea-grade10-placement-chaos-2025.md";
  slug: "kjsea-grade10-placement-chaos-2025";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kncci-hosts-singapore-s-high-commissioner--more-handshakes--less-cash.md": {
	id: "kncci-hosts-singapore-s-high-commissioner--more-handshakes--less-cash.md";
  slug: "kncci-hosts-singapore-s-high-commissioner--more-handshakes--less-cash";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"knh--sh867m-unpaid-bills---18-000-patients-vanish--what-s-new.md": {
	id: "knh--sh867m-unpaid-bills---18-000-patients-vanish--what-s-new.md";
  slug: "knh--sh867m-unpaid-bills---18-000-patients-vanish--what-s-new";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"knh-and-moi-university--nairobi-s-payroll-sham-exposed-as-hundreds-paid-off-books.md": {
	id: "knh-and-moi-university--nairobi-s-payroll-sham-exposed-as-hundreds-paid-off-books.md";
  slug: "knh-and-moi-university--nairobi-s-payroll-sham-exposed-as-hundreds-paid-off-books";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"koto-kawaguchi--the-deaflympics-champ-who-accidentally-landed-in-hollywood-s--marty-supreme--mess.md": {
	id: "koto-kawaguchi--the-deaflympics-champ-who-accidentally-landed-in-hollywood-s--marty-supreme--mess.md";
  slug: "koto-kawaguchi--the-deaflympics-champ-who-accidentally-landed-in-hollywood-s--marty-supreme--mess";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kpa-boss-capt--william-ruto-s-daughter-laid-to-rest-after-fatal-crash.md": {
	id: "kpa-boss-capt--william-ruto-s-daughter-laid-to-rest-after-fatal-crash.md";
  slug: "kpa-boss-capt--william-ruto-s-daughter-laid-to-rest-after-fatal-crash";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kpa-boss-william-ruto-injured--daughter-loses-life-in-taita-taveta-road-crash.md": {
	id: "kpa-boss-william-ruto-injured--daughter-loses-life-in-taita-taveta-road-crash.md";
  slug: "kpa-boss-william-ruto-injured--daughter-loses-life-in-taita-taveta-road-crash";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kpc-gets-acting-md-after-joe-sang-arrest-over-fuel-fiasco.md": {
	id: "kpc-gets-acting-md-after-joe-sang-arrest-over-fuel-fiasco.md";
  slug: "kpc-gets-acting-md-after-joe-sang-arrest-over-fuel-fiasco";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kpc-ipo--a-desperate-three-day-prayer-for-your-pocket.md": {
	id: "kpc-ipo--a-desperate-three-day-prayer-for-your-pocket.md";
  slug: "kpc-ipo--a-desperate-three-day-prayer-for-your-pocket";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kps-band-hire-rates-revealed--price-tag-for-your-wedding--but-don-t-expect-miracles.md": {
	id: "kps-band-hire-rates-revealed--price-tag-for-your-wedding--but-don-t-expect-miracles.md";
  slug: "kps-band-hire-rates-revealed--price-tag-for-your-wedding--but-don-t-expect-miracles";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kpsea-clout-chasing--why-your-social-media--leakers--are-more-fraudulent-than-a-lip-syncing-pop-star.md": {
	id: "kpsea-clout-chasing--why-your-social-media--leakers--are-more-fraudulent-than-a-lip-syncing-pop-star.md";
  slug: "kpsea-clout-chasing--why-your-social-media--leakers--are-more-fraudulent-than-a-lip-syncing-pop-star";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kq-manager-s-dismissal-exposes-engine-tender-skew.md": {
	id: "kq-manager-s-dismissal-exposes-engine-tender-skew.md";
  slug: "kq-manager-s-dismissal-exposes-engine-tender-skew";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kra-s-ai-spies-on-social-media-to-nab-tax-cheats---because-apparently--your-insta-life-is-now-a-taxable-offense.md": {
	id: "kra-s-ai-spies-on-social-media-to-nab-tax-cheats---because-apparently--your-insta-life-is-now-a-taxable-offense.md";
  slug: "kra-s-ai-spies-on-social-media-to-nab-tax-cheats---because-apparently--your-insta-life-is-now-a-taxable-offense";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ksh-44-52-million--unsanctioned-spending--by-deputy-president-s-spouse-s-office--shocking-oversight-or-business-as-usual.md": {
	id: "ksh-44-52-million--unsanctioned-spending--by-deputy-president-s-spouse-s-office--shocking-oversight-or-business-as-usual.md";
  slug: "ksh-44-52-million--unsanctioned-spending--by-deputy-president-s-spouse-s-office--shocking-oversight-or-business-as-usual";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ksh5-trillion-dreams-and-the-same-old-nightmare.md": {
	id: "ksh5-trillion-dreams-and-the-same-old-nightmare.md";
  slug: "ksh5-trillion-dreams-and-the-same-old-nightmare";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ksh6-3-billion-ecitizen-cash-vanishes-into-private-account---just-another-day-in-kenya.md": {
	id: "ksh6-3-billion-ecitizen-cash-vanishes-into-private-account---just-another-day-in-kenya.md";
  slug: "ksh6-3-billion-ecitizen-cash-vanishes-into-private-account---just-another-day-in-kenya";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ksi-s-newest-plaything--why-the-dagenham-and-redbridge-buyout-smells-like-a-pr-stunt.md": {
	id: "ksi-s-newest-plaything--why-the-dagenham-and-redbridge-buyout-smells-like-a-pr-stunt.md";
  slug: "ksi-s-newest-plaything--why-the-dagenham-and-redbridge-buyout-smells-like-a-pr-stunt";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kuccps-cut-off-points-for-bachelor-of-laws-and-universities-offering-it---a-stairway-to-nowhere.md": {
	id: "kuccps-cut-off-points-for-bachelor-of-laws-and-universities-offering-it---a-stairway-to-nowhere.md";
  slug: "kuccps-cut-off-points-for-bachelor-of-laws-and-universities-offering-it---a-stairway-to-nowhere";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kugongewa-na-kasongo-2.md": {
	id: "kugongewa-na-kasongo-2.md";
  slug: "kugongewa-na-kasongo-2";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kulture-festival-2026--south-africa-s--celebration--of-african-creativity---or-just-another-cookie-cutter-event.md": {
	id: "kulture-festival-2026--south-africa-s--celebration--of-african-creativity---or-just-another-cookie-cutter-event.md";
  slug: "kulture-festival-2026--south-africa-s--celebration--of-african-creativity---or-just-another-cookie-cutter-event";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kuscco-faces-sh108-8-million-debt-winding-up-petition-after-sh17-billion-scandal.md": {
	id: "kuscco-faces-sh108-8-million-debt-winding-up-petition-after-sh17-billion-scandal.md";
  slug: "kuscco-faces-sh108-8-million-debt-winding-up-petition-after-sh17-billion-scandal";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kws-whines-about-ant-trafficking-verdict--says-it-s-serious-business-now.md": {
	id: "kws-whines-about-ant-trafficking-verdict--says-it-s-serious-business-now.md";
  slug: "kws-whines-about-ant-trafficking-verdict--says-it-s-serious-business-now";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kyiv-s-revolving-door-of-graft--the-energy-minister-who-tried-to-run.md": {
	id: "kyiv-s-revolving-door-of-graft--the-energy-minister-who-tried-to-run.md";
  slug: "kyiv-s-revolving-door-of-graft--the-energy-minister-who-tried-to-run";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"lagos-is-selling-an-afrobeats-dream-but-the-reality-is-still-a-nightmare.md": {
	id: "lagos-is-selling-an-afrobeats-dream-but-the-reality-is-still-a-nightmare.md";
  slug: "lagos-is-selling-an-afrobeats-dream-but-the-reality-is-still-a-nightmare";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"larry-madowo--edith-kimani--lulu-hassan--rashid-abdalla--kenyan-media-s--couples----for-show--or-for-real.md": {
	id: "larry-madowo--edith-kimani--lulu-hassan--rashid-abdalla--kenyan-media-s--couples----for-show--or-for-real.md";
  slug: "larry-madowo--edith-kimani--lulu-hassan--rashid-abdalla--kenyan-media-s--couples----for-show--or-for-real";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"lawyers--scientists-training-ai-to-steal-careers--the-inevitable-career-obituary.md": {
	id: "lawyers--scientists-training-ai-to-steal-careers--the-inevitable-career-obituary.md";
  slug: "lawyers--scientists-training-ai-to-steal-careers--the-inevitable-career-obituary";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"leadership-or-just-a-bad-rebrand--the-messy-truth-behind-the-2027-pre-game.md": {
	id: "leadership-or-just-a-bad-rebrand--the-messy-truth-behind-the-2027-pre-game.md";
  slug: "leadership-or-just-a-bad-rebrand--the-messy-truth-behind-the-2027-pre-game";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ledama-olekina--ruto-fuel-hike-defenders-silent--gachagua-and-maraga-just-whining.md": {
	id: "ledama-olekina--ruto-fuel-hike-defenders-silent--gachagua-and-maraga-just-whining.md";
  slug: "ledama-olekina--ruto-fuel-hike-defenders-silent--gachagua-and-maraga-just-whining";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ledama-tells-opposition-to--stop-blaming-ruto-for-everything--amid-fuel-price-debate---because-roads-need-cash.md": {
	id: "ledama-tells-opposition-to--stop-blaming-ruto-for-everything--amid-fuel-price-debate---because-roads-need-cash.md";
  slug: "ledama-tells-opposition-to--stop-blaming-ruto-for-everything--amid-fuel-price-debate---because-roads-need-cash";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"legal-challenge-over-vaccine-mandates-in-major-league-baseball--a-landmark-liability-suit.md": {
	id: "legal-challenge-over-vaccine-mandates-in-major-league-baseball--a-landmark-liability-suit.md";
  slug: "legal-challenge-over-vaccine-mandates-in-major-league-baseball--a-landmark-liability-suit";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"legislation-introduced-to-ban-surveillance-and-surge-pricing-in-grocery-stores.md": {
	id: "legislation-introduced-to-ban-surveillance-and-surge-pricing-in-grocery-stores.md";
  slug: "legislation-introduced-to-ban-surveillance-and-surge-pricing-in-grocery-stores";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"lessons-from-azziad-life-decisions-shape-your-destiny.md": {
	id: "lessons-from-azziad-life-decisions-shape-your-destiny.md";
  slug: "lessons-from-azziad-life-decisions-shape-your-destiny";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"lgbtq--visibility-and-ethical-governance-reshape-the-global-sports-landscape.md": {
	id: "lgbtq--visibility-and-ethical-governance-reshape-the-global-sports-landscape.md";
  slug: "lgbtq--visibility-and-ethical-governance-reshape-the-global-sports-landscape";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"license-to-spill--why-your-favorite-online-trolls-just-won-the-lottery.md": {
	id: "license-to-spill--why-your-favorite-online-trolls-just-won-the-lottery.md";
  slug: "license-to-spill--why-your-favorite-online-trolls-just-won-the-lottery";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"linda-mwananchi-to-ruto--you-ve-betrayed-raila-in-death--again.md": {
	id: "linda-mwananchi-to-ruto--you-ve-betrayed-raila-in-death--again.md";
  slug: "linda-mwananchi-to-ruto--you-ve-betrayed-raila-in-death--again";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"liquidity-is-a-ghost-and-the-exit-is-narrowing.md": {
	id: "liquidity-is-a-ghost-and-the-exit-is-narrowing.md";
  slug: "liquidity-is-a-ghost-and-the-exit-is-narrowing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"lisbon-stoppage-highlights-systemic-pressures-on-uefa-s-anti-racism-framework.md": {
	id: "lisbon-stoppage-highlights-systemic-pressures-on-uefa-s-anti-racism-framework.md";
  slug: "lisbon-stoppage-highlights-systemic-pressures-on-uefa-s-anti-racism-framework";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"log-drums-and-lattes--kenya-s-identity-crisis-and-the-new-dating-app-for-the--vetted--narcissist.md": {
	id: "log-drums-and-lattes--kenya-s-identity-crisis-and-the-new-dating-app-for-the--vetted--narcissist.md";
  slug: "log-drums-and-lattes--kenya-s-identity-crisis-and-the-new-dating-app-for-the--vetted--narcissist";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"long-lost--mystery-science-theater-3000--episode-found---another-dustbin-of-pop-culture-unearthed.md": {
	id: "long-lost--mystery-science-theater-3000--episode-found---another-dustbin-of-pop-culture-unearthed.md";
  slug: "long-lost--mystery-science-theater-3000--episode-found---another-dustbin-of-pop-culture-unearthed";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"long-lost--mystery-science-theater-3000--episode-found---another-relic-unearthed-from-mediocrity.md": {
	id: "long-lost--mystery-science-theater-3000--episode-found---another-relic-unearthed-from-mediocrity.md";
  slug: "long-lost--mystery-science-theater-3000--episode-found---another-relic-unearthed-from-mediocrity";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"love-goals-and-ref-regrets--lamine-yamal-s-new--friend--and-barcelona-s-endless-tears.md": {
	id: "love-goals-and-ref-regrets--lamine-yamal-s-new--friend--and-barcelona-s-endless-tears.md";
  slug: "love-goals-and-ref-regrets--lamine-yamal-s-new--friend--and-barcelona-s-endless-tears";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"love-is-a-death-sentence-in-the-254--1-069-reasons-to-stay-single.md": {
	id: "love-is-a-death-sentence-in-the-254--1-069-reasons-to-stay-single.md";
  slug: "love-is-a-death-sentence-in-the-254--1-069-reasons-to-stay-single";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"lucy-kabuu-s-ex-husband-fights-back-against-sh70m-matrimonial-property-ruling--cites-ruin.md": {
	id: "lucy-kabuu-s-ex-husband-fights-back-against-sh70m-matrimonial-property-ruling--cites-ruin.md";
  slug: "lucy-kabuu-s-ex-husband-fights-back-against-sh70m-matrimonial-property-ruling--cites-ruin";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"luka-doncic-to-undergo-mri-following-left-hamstring-injury.md": {
	id: "luka-doncic-to-undergo-mri-following-left-hamstring-injury.md";
  slug: "luka-doncic-to-undergo-mri-following-left-hamstring-injury";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"lydia-wanyoto-s--clean--campaign--the-ultimate-political-pr-stunt.md": {
	id: "lydia-wanyoto-s--clean--campaign--the-ultimate-political-pr-stunt.md";
  slug: "lydia-wanyoto-s--clean--campaign--the-ultimate-political-pr-stunt";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mac-productivity-tools-evolve-as-slidepad-1-6-1-targets-multitasking-efficiency.md": {
	id: "mac-productivity-tools-evolve-as-slidepad-1-6-1-targets-multitasking-efficiency.md";
  slug: "mac-productivity-tools-evolve-as-slidepad-1-6-1-targets-multitasking-efficiency";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"madelyn-cline-and-luka-doncic-s--romance----fianc-e-drama-already-brewing.md": {
	id: "madelyn-cline-and-luka-doncic-s--romance----fianc-e-drama-already-brewing.md";
  slug: "madelyn-cline-and-luka-doncic-s--romance----fianc-e-drama-already-brewing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"madison-square-garden-s-surveillance-machine--another-slick-operation-built-on-deception.md": {
	id: "madison-square-garden-s-surveillance-machine--another-slick-operation-built-on-deception.md";
  slug: "madison-square-garden-s-surveillance-machine--another-slick-operation-built-on-deception";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"madison-square-garden-s-surveillance-machine--dolan-s-shocking-secrets-revealed.md": {
	id: "madison-square-garden-s-surveillance-machine--dolan-s-shocking-secrets-revealed.md";
  slug: "madison-square-garden-s-surveillance-machine--dolan-s-shocking-secrets-revealed";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"major-league-baseball-talent-valuations-shift-as-zips-projections-highlight-2026-performance-volatility.md": {
	id: "major-league-baseball-talent-valuations-shift-as-zips-projections-highlight-2026-performance-volatility.md";
  slug: "major-league-baseball-talent-valuations-shift-as-zips-projections-highlight-2026-performance-volatility";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"major-league-soccer-strategic-expansion--werner-and-rodriguez-transfers-draw-critical-scrutiny.md": {
	id: "major-league-soccer-strategic-expansion--werner-and-rodriguez-transfers-draw-critical-scrutiny.md";
  slug: "major-league-soccer-strategic-expansion--werner-and-rodriguez-transfers-draw-critical-scrutiny";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"major-security-crackdown-at-jkia-leads-to-arrest-of-human-traffickers-and-fraudsters.md": {
	id: "major-security-crackdown-at-jkia-leads-to-arrest-of-human-traffickers-and-fraudsters.md";
  slug: "major-security-crackdown-at-jkia-leads-to-arrest-of-human-traffickers-and-fraudsters";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"male-sexworkers-in-kenya.md": {
	id: "male-sexworkers-in-kenya.md";
  slug: "male-sexworkers-in-kenya";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"malik-lemuel--kenyan-actor-celebrates-emotional-reunion-with-father-abroad.md": {
	id: "malik-lemuel--kenyan-actor-celebrates-emotional-reunion-with-father-abroad.md";
  slug: "malik-lemuel--kenyan-actor-celebrates-emotional-reunion-with-father-abroad";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"malindi-abduction--17-year-old-girl--rescued--after-ransom-demand--one-suspect-nabbed.md": {
	id: "malindi-abduction--17-year-old-girl--rescued--after-ransom-demand--one-suspect-nabbed.md";
  slug: "malindi-abduction--17-year-old-girl--rescued--after-ransom-demand--one-suspect-nabbed";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"malindi-s-smallest-export--the-child-trafficking-economy.md": {
	id: "malindi-s-smallest-export--the-child-trafficking-economy.md";
  slug: "malindi-s-smallest-export--the-child-trafficking-economy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"man-united--chelsea-held--tottenham-gloom-deepens.md": {
	id: "man-united--chelsea-held--tottenham-gloom-deepens.md";
  slug: "man-united--chelsea-held--tottenham-gloom-deepens";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mandago-s-sh1-1-billion-loan-saga---eat-now--pay-never--for-taxpayers.md": {
	id: "mandago-s-sh1-1-billion-loan-saga---eat-now--pay-never--for-taxpayers.md";
  slug: "mandago-s-sh1-1-billion-loan-saga---eat-now--pay-never--for-taxpayers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mandelson-vetting-fears--foreign-secretary-concerned-ministers-ignorantly-endorsed-security-risk.md": {
	id: "mandelson-vetting-fears--foreign-secretary-concerned-ministers-ignorantly-endorsed-security-risk.md";
  slug: "mandelson-vetting-fears--foreign-secretary-concerned-ministers-ignorantly-endorsed-security-risk";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mandelson-vetting-fears--ministers-ignored--starmer-blindfolded-in-foreign-office-shenanigans.md": {
	id: "mandelson-vetting-fears--ministers-ignored--starmer-blindfolded-in-foreign-office-shenanigans.md";
  slug: "mandelson-vetting-fears--ministers-ignored--starmer-blindfolded-in-foreign-office-shenanigans";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mangoes--mandates--and-premium-tears--the-kenyan-cycle-of-theft.md": {
	id: "mangoes--mandates--and-premium-tears--the-kenyan-cycle-of-theft.md";
  slug: "mangoes--mandates--and-premium-tears--the-kenyan-cycle-of-theft";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mangoes--millions--and-the-same-old-script.md": {
	id: "mangoes--millions--and-the-same-old-script.md";
  slug: "mangoes--millions--and-the-same-old-script";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"manners-for-the-elite--bills-for-the-rest-of-us.md": {
	id: "manners-for-the-elite--bills-for-the-rest-of-us.md";
  slug: "manners-for-the-elite--bills-for-the-rest-of-us";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"maraga--kenya-heads-for-state-failure-amid-kikuyu-clashes-and-southern-bypass-chaos.md": {
	id: "maraga--kenya-heads-for-state-failure-amid-kikuyu-clashes-and-southern-bypass-chaos.md";
  slug: "maraga--kenya-heads-for-state-failure-amid-kikuyu-clashes-and-southern-bypass-chaos";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"marathon-cheaters-plague-top-players--bungie-offers-platitudes.md": {
	id: "marathon-cheaters-plague-top-players--bungie-offers-platitudes.md";
  slug: "marathon-cheaters-plague-top-players--bungie-offers-platitudes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"marathon-s--fair-play--is-just-another-illusion-arc-raiders-can-t-afford.md": {
	id: "marathon-s--fair-play--is-just-another-illusion-arc-raiders-can-t-afford.md";
  slug: "marathon-s--fair-play--is-just-another-illusion-arc-raiders-can-t-afford";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"marathon-s--top-players--pathetically-beg-bungie-to-address-inevitable-cheating-spiral.md": {
	id: "marathon-s--top-players--pathetically-beg-bungie-to-address-inevitable-cheating-spiral.md";
  slug: "marathon-s--top-players--pathetically-beg-bungie-to-address-inevitable-cheating-spiral";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"march-7-aftermath--who-really-won-in-the-ruto-raila-broad-based-govt-pact--don-t-hold-your-breath.md": {
	id: "march-7-aftermath--who-really-won-in-the-ruto-raila-broad-based-govt-pact--don-t-hold-your-breath.md";
  slug: "march-7-aftermath--who-really-won-in-the-ruto-raila-broad-based-govt-pact--don-t-hold-your-breath";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mark-zuckerberg-buys-ai-agent--slop--social-network-for-meta.md": {
	id: "mark-zuckerberg-buys-ai-agent--slop--social-network-for-meta.md";
  slug: "mark-zuckerberg-buys-ai-agent--slop--social-network-for-meta";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mark-zuckerberg-s-meta-acquires-ai-agent-social-network-for-more-slop.md": {
	id: "mark-zuckerberg-s-meta-acquires-ai-agent-social-network-for-more-slop.md";
  slug: "mark-zuckerberg-s-meta-acquires-ai-agent-social-network-for-more-slop";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"market-greed-outpaces-global-ruin.md": {
	id: "market-greed-outpaces-global-ruin.md";
  slug: "market-greed-outpaces-global-ruin";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"martha-karua-calls-for-energy-cs-opiyo-wandayi-to-resign-over-fuel-crisis.md": {
	id: "martha-karua-calls-for-energy-cs-opiyo-wandayi-to-resign-over-fuel-crisis.md";
  slug: "martha-karua-calls-for-energy-cs-opiyo-wandayi-to-resign-over-fuel-crisis";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"martha-njoki-politics-of-rescue.md": {
	id: "martha-njoki-politics-of-rescue.md";
  slug: "martha-njoki-politics-of-rescue";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"marvel-s--secret-wars--is-just-another-desperate--avengers--doomsday--sequel.md": {
	id: "marvel-s--secret-wars--is-just-another-desperate--avengers--doomsday--sequel.md";
  slug: "marvel-s--secret-wars--is-just-another-desperate--avengers--doomsday--sequel";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"marvel-s-decades-long-movie-plan-shows-desperate-grasp-for-relevance.md": {
	id: "marvel-s-decades-long-movie-plan-shows-desperate-grasp-for-relevance.md";
  slug: "marvel-s-decades-long-movie-plan-shows-desperate-grasp-for-relevance";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"marvel-s-endless-movie-pipeline-now-dangles-precariously-near-the-next-decade.md": {
	id: "marvel-s-endless-movie-pipeline-now-dangles-precariously-near-the-next-decade.md";
  slug: "marvel-s-endless-movie-pipeline-now-dangles-precariously-near-the-next-decade";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"marvel-s-upcoming-movies-extend-into-next-decade--promising-more-of-the-same-cynical-exploitation.md": {
	id: "marvel-s-upcoming-movies-extend-into-next-decade--promising-more-of-the-same-cynical-exploitation.md";
  slug: "marvel-s-upcoming-movies-extend-into-next-decade--promising-more-of-the-same-cynical-exploitation";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mary-atieno-gets-sh11-million-nairobi-house-after-years-of-rent-pains---guess-who-paid.md": {
	id: "mary-atieno-gets-sh11-million-nairobi-house-after-years-of-rent-pains---guess-who-paid.md";
  slug: "mary-atieno-gets-sh11-million-nairobi-house-after-years-of-rent-pains---guess-who-paid";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"master-wong-arrested--kenya-s-influencer--beef--escalates-to-robbery-claims---is-this-what-clout-looks-like.md": {
	id: "master-wong-arrested--kenya-s-influencer--beef--escalates-to-robbery-claims---is-this-what-clout-looks-like.md";
  slug: "master-wong-arrested--kenya-s-influencer--beef--escalates-to-robbery-claims---is-this-what-clout-looks-like";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"master-wong-busted-for-robbery--from-viral-content-to-police-cell-in-nairobi-s-shady-influencer-scene.md": {
	id: "master-wong-busted-for-robbery--from-viral-content-to-police-cell-in-nairobi-s-shady-influencer-scene.md";
  slug: "master-wong-busted-for-robbery--from-viral-content-to-police-cell-in-nairobi-s-shady-influencer-scene";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mathenge-pr-machine--why-tumiso-s-woke-dating-advice-is-just-rich-kid-delusions.md": {
	id: "mathenge-pr-machine--why-tumiso-s-woke-dating-advice-is-just-rich-kid-delusions.md";
  slug: "mathenge-pr-machine--why-tumiso-s-woke-dating-advice-is-just-rich-kid-delusions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"maua-rapper-flamieh-flames-accuses-mc-laingo-assault.md": {
	id: "maua-rapper-flamieh-flames-accuses-mc-laingo-assault.md";
  slug: "maua-rapper-flamieh-flames-accuses-mc-laingo-assault";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mauritanian-military-claims-no-fighters-crossed-borders--but-who-s-buying.md": {
	id: "mauritanian-military-claims-no-fighters-crossed-borders--but-who-s-buying.md";
  slug: "mauritanian-military-claims-no-fighters-crossed-borders--but-who-s-buying";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mbadi-s-statistical-fairytales-cannot-fill-empty-stomachs.md": {
	id: "mbadi-s-statistical-fairytales-cannot-fill-empty-stomachs.md";
  slug: "mbadi-s-statistical-fairytales-cannot-fill-empty-stomachs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mcas-under-probe-over-ksh95m-tender-scandal.md": {
	id: "mcas-under-probe-over-ksh95m-tender-scandal.md";
  slug: "mcas-under-probe-over-ksh95m-tender-scandal";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mccarthy-names-23-man-harambee-stars-squad-for-fifa-series-friendlies---expect-more-of-the-same.md": {
	id: "mccarthy-names-23-man-harambee-stars-squad-for-fifa-series-friendlies---expect-more-of-the-same.md";
  slug: "mccarthy-names-23-man-harambee-stars-squad-for-fifa-series-friendlies---expect-more-of-the-same";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mcdreamy-or-mcopportunist--patrick-dempsey-hits-the-baftas-while-eric-dane-s-body-is-barely-cold.md": {
	id: "mcdreamy-or-mcopportunist--patrick-dempsey-hits-the-baftas-while-eric-dane-s-body-is-barely-cold.md";
  slug: "mcdreamy-or-mcopportunist--patrick-dempsey-hits-the-baftas-while-eric-dane-s-body-is-barely-cold";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"meet-the-grandmother-living-out-of-a-400-ft--granny-pod--to-save-money-and-help-with-child-care--it-s-become-an-american--economic-necessity.md": {
	id: "meet-the-grandmother-living-out-of-a-400-ft--granny-pod--to-save-money-and-help-with-child-care--it-s-become-an-american--economic-necessity.md";
  slug: "meet-the-grandmother-living-out-of-a-400-ft--granny-pod--to-save-money-and-help-with-child-care--it-s-become-an-american--economic-necessity";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"melody-house---nairobi-s-so-called--premier--music---film-hub--more-hype-than-hit.md": {
	id: "melody-house---nairobi-s-so-called--premier--music---film-hub--more-hype-than-hit.md";
  slug: "melody-house---nairobi-s-so-called--premier--music---film-hub--more-hype-than-hit";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"meru-banditry--police-crackdown-in-isiolo--samburu--laikipia-looks-like-another-show.md": {
	id: "meru-banditry--police-crackdown-in-isiolo--samburu--laikipia-looks-like-another-show.md";
  slug: "meru-banditry--police-crackdown-in-isiolo--samburu--laikipia-looks-like-another-show";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"meru-county-crisis-victimhood-politics-kawira-mwangaza.md": {
	id: "meru-county-crisis-victimhood-politics-kawira-mwangaza.md";
  slug: "meru-county-crisis-victimhood-politics-kawira-mwangaza";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"meru-leaders--grand-plan--police-training-camps-to--curb--banditry--good-luck.md": {
	id: "meru-leaders--grand-plan--police-training-camps-to--curb--banditry--good-luck.md";
  slug: "meru-leaders--grand-plan--police-training-camps-to--curb--banditry--good-luck";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"meta-acquires-moltbook--the-reddit-like-network-for-ai-agents--another-playground-for-the-already-powerful.md": {
	id: "meta-acquires-moltbook--the-reddit-like-network-for-ai-agents--another-playground-for-the-already-powerful.md";
  slug: "meta-acquires-moltbook--the-reddit-like-network-for-ai-agents--another-playground-for-the-already-powerful";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"meta-acquires-moltbook-s-ai-agents-amidst-security-failures-and-human-deception.md": {
	id: "meta-acquires-moltbook-s-ai-agents-amidst-security-failures-and-human-deception.md";
  slug: "meta-acquires-moltbook-s-ai-agents-amidst-security-failures-and-human-deception";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"meta-contractors-who-exposed-ray-ban-glasses-privacy-scandal-fired.md": {
	id: "meta-contractors-who-exposed-ray-ban-glasses-privacy-scandal-fired.md";
  slug: "meta-contractors-who-exposed-ray-ban-glasses-privacy-scandal-fired";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"meta-nvidia-alliance--a-multibillion-dollar-bet-on--personal-superintelligence.md": {
	id: "meta-nvidia-alliance--a-multibillion-dollar-bet-on--personal-superintelligence.md";
  slug: "meta-nvidia-alliance--a-multibillion-dollar-bet-on--personal-superintelligence";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"meta-readies-real-time-facial-recognition-for-smart-glasses--reportedly-timing-launch-with-political-turmoil.md": {
	id: "meta-readies-real-time-facial-recognition-for-smart-glasses--reportedly-timing-launch-with-political-turmoil.md";
  slug: "meta-readies-real-time-facial-recognition-for-smart-glasses--reportedly-timing-launch-with-political-turmoil";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"meta-s-crimes-against-decency-require-cover-up-just-like-actual-crimes.md": {
	id: "meta-s-crimes-against-decency-require-cover-up-just-like-actual-crimes.md";
  slug: "meta-s-crimes-against-decency-require-cover-up-just-like-actual-crimes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"meta-s-instagram-dm-encryption-retreat--a-calculated-betrayal-of-privacy.md": {
	id: "meta-s-instagram-dm-encryption-retreat--a-calculated-betrayal-of-privacy.md";
  slug: "meta-s-instagram-dm-encryption-retreat--a-calculated-betrayal-of-privacy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"meta-s-instagram-dm-encryption-retreat--a-cynical-ploy-precedent.md": {
	id: "meta-s-instagram-dm-encryption-retreat--a-cynical-ploy-precedent.md";
  slug: "meta-s-instagram-dm-encryption-retreat--a-cynical-ploy-precedent";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"meta-s-instagram-dm-encryption-retreat--a-precedent-for-global-surveillance.md": {
	id: "meta-s-instagram-dm-encryption-retreat--a-precedent-for-global-surveillance.md";
  slug: "meta-s-instagram-dm-encryption-retreat--a-precedent-for-global-surveillance";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"meta-sued-over-rampant-scam-ads-on-facebook-and-instagram--exploiting-users-for-profit.md": {
	id: "meta-sued-over-rampant-scam-ads-on-facebook-and-instagram--exploiting-users-for-profit.md";
  slug: "meta-sued-over-rampant-scam-ads-on-facebook-and-instagram--exploiting-users-for-profit";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"meta-sued-over-scam-ads-on-facebook-and-instagram--another-day--another-dollar-for-digital-charlatans.md": {
	id: "meta-sued-over-scam-ads-on-facebook-and-instagram--another-day--another-dollar-for-digital-charlatans.md";
  slug: "meta-sued-over-scam-ads-on-facebook-and-instagram--another-day--another-dollar-for-digital-charlatans";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"meta-urges-ireland-to-lobby-against-eu-crackdown-on-addictive-social-media-features.md": {
	id: "meta-urges-ireland-to-lobby-against-eu-crackdown-on-addictive-social-media-features.md";
  slug: "meta-urges-ireland-to-lobby-against-eu-crackdown-on-addictive-social-media-features";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"metal-gear-s-solid-snake-joins-rainbow-six-siege-roster--fulfilling-crossover-with-splinter-cell-s-sam-fisher.md": {
	id: "metal-gear-s-solid-snake-joins-rainbow-six-siege-roster--fulfilling-crossover-with-splinter-cell-s-sam-fisher.md";
  slug: "metal-gear-s-solid-snake-joins-rainbow-six-siege-roster--fulfilling-crossover-with-splinter-cell-s-sam-fisher";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"metro-fm-awards-2026--sam-deep-leads-the-pack-while-the-usual-suspects-play-musical-chairs.md": {
	id: "metro-fm-awards-2026--sam-deep-leads-the-pack-while-the-usual-suspects-play-musical-chairs.md";
  slug: "metro-fm-awards-2026--sam-deep-leads-the-pack-while-the-usual-suspects-play-musical-chairs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mexico-s-cjng-cartel--ai--drones--and-social-media-drive-its-inevitable--brutal-evolution.md": {
	id: "mexico-s-cjng-cartel--ai--drones--and-social-media-drive-its-inevitable--brutal-evolution.md";
  slug: "mexico-s-cjng-cartel--ai--drones--and-social-media-drive-its-inevitable--brutal-evolution";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"microsoft-gaming-ceo-asha-sharma-outlines-vision-for-xbox-future.md": {
	id: "microsoft-gaming-ceo-asha-sharma-outlines-vision-for-xbox-future.md";
  slug: "microsoft-gaming-ceo-asha-sharma-outlines-vision-for-xbox-future";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"microsoft-previews-next-windows-11-feature-drop-for-imminent-release.md": {
	id: "microsoft-previews-next-windows-11-feature-drop-for-imminent-release.md";
  slug: "microsoft-previews-next-windows-11-feature-drop-for-imminent-release";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"microstrategy-chairman-addresses-bitcoin-price-and-quantum-risks.md": {
	id: "microstrategy-chairman-addresses-bitcoin-price-and-quantum-risks.md";
  slug: "microstrategy-chairman-addresses-bitcoin-price-and-quantum-risks";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"middle-east-bloodshed-becomes-the-new-global-tax.md": {
	id: "middle-east-bloodshed-becomes-the-new-global-tax.md";
  slug: "middle-east-bloodshed-becomes-the-new-global-tax";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"middle-east-conflict-deepens-hunger-in-east-africa.md": {
	id: "middle-east-conflict-deepens-hunger-in-east-africa.md";
  slug: "middle-east-conflict-deepens-hunger-in-east-africa";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"middle-east-conflict-ripples-through-african-economies--making-life-a-hell-of-a-lot-more-expensive.md": {
	id: "middle-east-conflict-ripples-through-african-economies--making-life-a-hell-of-a-lot-more-expensive.md";
  slug: "middle-east-conflict-ripples-through-african-economies--making-life-a-hell-of-a-lot-more-expensive";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"middle-east-crisis-sh400m-plea--kenyans-in-iran-and-russia-face-exodus-amid-war.md": {
	id: "middle-east-crisis-sh400m-plea--kenyans-in-iran-and-russia-face-exodus-amid-war.md";
  slug: "middle-east-crisis-sh400m-plea--kenyans-in-iran-and-russia-face-exodus-amid-war";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"middle-east-mayhem-means-kenya-s-economy-is-toast---streamlinefeed.md": {
	id: "middle-east-mayhem-means-kenya-s-economy-is-toast---streamlinefeed.md";
  slug: "middle-east-mayhem-means-kenya-s-economy-is-toast---streamlinefeed";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"middle-east-mess-means-kenya-exports-feeling-the-pinch--again.md": {
	id: "middle-east-mess-means-kenya-exports-feeling-the-pinch--again.md";
  slug: "middle-east-mess-means-kenya-exports-feeling-the-pinch--again";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"middle-east-tantrums-don-t-touch-nairobi-fuel-prices--for-now.md": {
	id: "middle-east-tantrums-don-t-touch-nairobi-fuel-prices--for-now.md";
  slug: "middle-east-tantrums-don-t-touch-nairobi-fuel-prices--for-now";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mike-mutebi-s-scare--football-s-cruel-afterlife-and-uganda-s-forgotten-heroes.md": {
	id: "mike-mutebi-s-scare--football-s-cruel-afterlife-and-uganda-s-forgotten-heroes.md";
  slug: "mike-mutebi-s-scare--football-s-cruel-afterlife-and-uganda-s-forgotten-heroes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mike-mutyaba--express-fc-ceo-in-trouble-over-match-fixing-scandal.md": {
	id: "mike-mutyaba--express-fc-ceo-in-trouble-over-match-fixing-scandal.md";
  slug: "mike-mutyaba--express-fc-ceo-in-trouble-over-match-fixing-scandal";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"miles-bridges--isaiah-stewart--jalen-duren--moussa-diabate-all-suspended-by-nba-after-outright-wild-brawl.md": {
	id: "miles-bridges--isaiah-stewart--jalen-duren--moussa-diabate-all-suspended-by-nba-after-outright-wild-brawl.md";
  slug: "miles-bridges--isaiah-stewart--jalen-duren--moussa-diabate-all-suspended-by-nba-after-outright-wild-brawl";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"military-games-and-broken-teeth--the-samburu-medical-circus.md": {
	id: "military-games-and-broken-teeth--the-samburu-medical-circus.md";
  slug: "military-games-and-broken-teeth--the-samburu-medical-circus";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"millicent-ndoro--kenya-police-corporal-speeding-past-records--still-stuck-in-mud.md": {
	id: "millicent-ndoro--kenya-police-corporal-speeding-past-records--still-stuck-in-mud.md";
  slug: "millicent-ndoro--kenya-police-corporal-speeding-past-records--still-stuck-in-mud";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"minnesota-cartel-feeding-our-future-kenya-laundering.md": {
	id: "minnesota-cartel-feeding-our-future-kenya-laundering.md";
  slug: "minnesota-cartel-feeding-our-future-kenya-laundering";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"minnesota-lawmakers-and-police-push-crypto-atm-ban-amidst-scammer-rampage.md": {
	id: "minnesota-lawmakers-and-police-push-crypto-atm-ban-amidst-scammer-rampage.md";
  slug: "minnesota-lawmakers-and-police-push-crypto-atm-ban-amidst-scammer-rampage";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"minnesota-twins-accelerate-bullpen-restructuring-with-merryweather-acquisition.md": {
	id: "minnesota-twins-accelerate-bullpen-restructuring-with-merryweather-acquisition.md";
  slug: "minnesota-twins-accelerate-bullpen-restructuring-with-merryweather-acquisition";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"minute-maid-to-discontinue-frozen-juice-cans-after-80-years.md": {
	id: "minute-maid-to-discontinue-frozen-juice-cans-after-80-years.md";
  slug: "minute-maid-to-discontinue-frozen-juice-cans-after-80-years";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"miracles--millions--and-migrations--major-1-plays-the-victim-card-again.md": {
	id: "miracles--millions--and-migrations--major-1-plays-the-victim-card-again.md";
  slug: "miracles--millions--and-migrations--major-1-plays-the-victim-card-again";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mishra-s-medical-empire-hits-the-auction-block--the-bill-is-finally-due.md": {
	id: "mishra-s-medical-empire-hits-the-auction-block--the-bill-is-finally-due.md";
  slug: "mishra-s-medical-empire-hits-the-auction-block--the-bill-is-finally-due";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"missing-dci-officer-declared-dead--another-nairobi-ghost-story.md": {
	id: "missing-dci-officer-declared-dead--another-nairobi-ghost-story.md";
  slug: "missing-dci-officer-declared-dead--another-nairobi-ghost-story";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"missing-voices-2025--another-year--same-old-story-of-kenyan-lives-vanishing.md": {
	id: "missing-voices-2025--another-year--same-old-story-of-kenyan-lives-vanishing.md";
  slug: "missing-voices-2025--another-year--same-old-story-of-kenyan-lives-vanishing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mitsotakis-from-the-informal-european-summit--european-bureaucracy-must-be-reduced--we-need-greater-integration-in-the-european-energy-market.md": {
	id: "mitsotakis-from-the-informal-european-summit--european-bureaucracy-must-be-reduced--we-need-greater-integration-in-the-european-energy-market.md";
  slug: "mitsotakis-from-the-informal-european-summit--european-bureaucracy-must-be-reduced--we-need-greater-integration-in-the-european-energy-market";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mjaka-mfine--transforms--into-man--ladies-drooling---another-day--another-stunt.md": {
	id: "mjaka-mfine--transforms--into-man--ladies-drooling---another-day--another-stunt.md";
  slug: "mjaka-mfine--transforms--into-man--ladies-drooling---another-day--another-stunt";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mk-productions--from-body-slams-to--nature--beats---is-it-art-or-just-good-pr.md": {
	id: "mk-productions--from-body-slams-to--nature--beats---is-it-art-or-just-good-pr.md";
  slug: "mk-productions--from-body-slams-to--nature--beats---is-it-art-or-just-good-pr";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mobilising-pension-savings-for-development-without-risking-workers--futures.md": {
	id: "mobilising-pension-savings-for-development-without-risking-workers--futures.md";
  slug: "mobilising-pension-savings-for-development-without-risking-workers--futures";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"modi-positions-india-as-global-ai-powerhouse-with-strategic-tax-incentives.md": {
	id: "modi-positions-india-as-global-ai-powerhouse-with-strategic-tax-incentives.md";
  slug: "modi-positions-india-as-global-ai-powerhouse-with-strategic-tax-incentives";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"moi-forces-academy-career-day--more-fancy-talk-than-future-fortune.md": {
	id: "moi-forces-academy-career-day--more-fancy-talk-than-future-fortune.md";
  slug: "moi-forces-academy-career-day--more-fancy-talk-than-future-fortune";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mombasa-tea-exporters-drowning--mid-east-chaos-meets-port-greed.md": {
	id: "mombasa-tea-exporters-drowning--mid-east-chaos-meets-port-greed.md";
  slug: "mombasa-tea-exporters-drowning--mid-east-chaos-meets-port-greed";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"money--murder--and-makeup--the-vbs-bank-scandal-is-now-showmax-content.md": {
	id: "money--murder--and-makeup--the-vbs-bank-scandal-is-now-showmax-content.md";
  slug: "money--murder--and-makeup--the-vbs-bank-scandal-is-now-showmax-content";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"montreux-jazz-invades-franschhoek--high-class-hype-or-just-overpriced-swiss-leftovers.md": {
	id: "montreux-jazz-invades-franschhoek--high-class-hype-or-just-overpriced-swiss-leftovers.md";
  slug: "montreux-jazz-invades-franschhoek--high-class-hype-or-just-overpriced-swiss-leftovers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"moon-photo-trick--iphone-users-duped-while-astronauts-get-real-ride.md": {
	id: "moon-photo-trick--iphone-users-duped-while-astronauts-get-real-ride.md";
  slug: "moon-photo-trick--iphone-users-duped-while-astronauts-get-real-ride";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"more-coins-for-the-boys-in-blue--a-price-tag-on-our-silence.md": {
	id: "more-coins-for-the-boys-in-blue--a-price-tag-on-our-silence.md";
  slug: "more-coins-for-the-boys-in-blue--a-price-tag-on-our-silence";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"moscow-s-newest-plumbing-project--kenyan-bodies-on-the-front-line.md": {
	id: "moscow-s-newest-plumbing-project--kenyan-bodies-on-the-front-line.md";
  slug: "moscow-s-newest-plumbing-project--kenyan-bodies-on-the-front-line";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mount-everest-climbers--poisoned--by-guides-for-profit-in-elaborate-insurance-scam.md": {
	id: "mount-everest-climbers--poisoned--by-guides-for-profit-in-elaborate-insurance-scam.md";
  slug: "mount-everest-climbers--poisoned--by-guides-for-profit-in-elaborate-insurance-scam";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mount-everest-climbers--poisoned--by-guides-in-insurance-fraud-scheme---nepal-s-greed-knows-no-summit.md": {
	id: "mount-everest-climbers--poisoned--by-guides-in-insurance-fraud-scheme---nepal-s-greed-knows-no-summit.md";
  slug: "mount-everest-climbers--poisoned--by-guides-in-insurance-fraud-scheme---nepal-s-greed-knows-no-summit";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mozart-ai-raises--6m-to-bring-generative-ai-music-creation-to-the-masses.md": {
	id: "mozart-ai-raises--6m-to-bring-generative-ai-music-creation-to-the-masses.md";
  slug: "mozart-ai-raises--6m-to-bring-generative-ai-music-creation-to-the-masses";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mozzart-bet-cup-round-of-16--mfalme-still-scores-big-while-kenya-police-crush-bb-bread-s-pipe-dream.md": {
	id: "mozzart-bet-cup-round-of-16--mfalme-still-scores-big-while-kenya-police-crush-bb-bread-s-pipe-dream.md";
  slug: "mozzart-bet-cup-round-of-16--mfalme-still-scores-big-while-kenya-police-crush-bb-bread-s-pipe-dream";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mozzartbet-cup--another-circus-for-the-hungry-to-watch-the-broke.md": {
	id: "mozzartbet-cup--another-circus-for-the-hungry-to-watch-the-broke.md";
  slug: "mozzartbet-cup--another-circus-for-the-hungry-to-watch-the-broke";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mp-wamboka-kicked-out-as-pic-chair-for-bribery--intimidation-probe---another-day--another-scandal.md": {
	id: "mp-wamboka-kicked-out-as-pic-chair-for-bribery--intimidation-probe---another-day--another-scandal.md";
  slug: "mp-wamboka-kicked-out-as-pic-chair-for-bribery--intimidation-probe---another-day--another-scandal";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mps--iebc-plot-new-rules-for-2027-elections-as-ruto-seeks-second-and-final-term.md": {
	id: "mps--iebc-plot-new-rules-for-2027-elections-as-ruto-seeks-second-and-final-term.md";
  slug: "mps--iebc-plot-new-rules-for-2027-elections-as-ruto-seeks-second-and-final-term";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mps-back-ipoa-plan-to-punish-police-chiefs-for-atrocities-by-juniors.md": {
	id: "mps-back-ipoa-plan-to-punish-police-chiefs-for-atrocities-by-juniors.md";
  slug: "mps-back-ipoa-plan-to-punish-police-chiefs-for-atrocities-by-juniors";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mps-give-nod-to-defence-pacts-with-france--china--ethiopia--czech-republic--zimbabwe---just-don-t-expect-miracles.md": {
	id: "mps-give-nod-to-defence-pacts-with-france--china--ethiopia--czech-republic--zimbabwe---just-don-t-expect-miracles.md";
  slug: "mps-give-nod-to-defence-pacts-with-france--china--ethiopia--czech-republic--zimbabwe---just-don-t-expect-miracles";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"msaki-s-musical-summer-camp--is-amagroove-2026-innovation-or-just-a-tax-funded-vacation.md": {
	id: "msaki-s-musical-summer-camp--is-amagroove-2026-innovation-or-just-a-tax-funded-vacation.md";
  slug: "msaki-s-musical-summer-camp--is-amagroove-2026-innovation-or-just-a-tax-funded-vacation";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mt--kenya-politics-exposes-gachagua-s-kalonzo-gambit-as-a-2027-pawn-play.md": {
	id: "mt--kenya-politics-exposes-gachagua-s-kalonzo-gambit-as-a-2027-pawn-play.md";
  slug: "mt--kenya-politics-exposes-gachagua-s-kalonzo-gambit-as-a-2027-pawn-play";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mt-kenya-unity-faces-eight-political-battles--prepare-for-the-usual-mess.md": {
	id: "mt-kenya-unity-faces-eight-political-battles--prepare-for-the-usual-mess.md";
  slug: "mt-kenya-unity-faces-eight-political-battles--prepare-for-the-usual-mess";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mudavadi-in-moscow--inside-plans-to-rescue-kenyans-in-russia-ukraine-war.md": {
	id: "mudavadi-in-moscow--inside-plans-to-rescue-kenyans-in-russia-ukraine-war.md";
  slug: "mudavadi-in-moscow--inside-plans-to-rescue-kenyans-in-russia-ukraine-war";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"muddy-wigs-and-flooded-subarus--the-mam-rain-season-is-here-to-humble-your-faves.md": {
	id: "muddy-wigs-and-flooded-subarus--the-mam-rain-season-is-here-to-humble-your-faves.md";
  slug: "muddy-wigs-and-flooded-subarus--the-mam-rain-season-is-here-to-humble-your-faves";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"muka-wa-ruto---kenya-s-petty-obsession-with-feminising-bad-governance.md": {
	id: "muka-wa-ruto---kenya-s-petty-obsession-with-feminising-bad-governance.md";
  slug: "muka-wa-ruto---kenya-s-petty-obsession-with-feminising-bad-governance";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"murkomen-assures-continued-government-support-for-police-welfare-and-training.md": {
	id: "murkomen-assures-continued-government-support-for-police-welfare-and-training.md";
  slug: "murkomen-assures-continued-government-support-for-police-welfare-and-training";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"murkomen-claims-kenya-crime-fell--but-urban-violence-and-banditry-still-reign-supreme.md": {
	id: "murkomen-claims-kenya-crime-fell--but-urban-violence-and-banditry-still-reign-supreme.md";
  slug: "murkomen-claims-kenya-crime-fell--but-urban-violence-and-banditry-still-reign-supreme";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"murkomen-orders-paramilitary-training-for-sergeants-at-arms--kenya-s-legislators-get-tougher-bodyguards.md": {
	id: "murkomen-orders-paramilitary-training-for-sergeants-at-arms--kenya-s-legislators-get-tougher-bodyguards.md";
  slug: "murkomen-orders-paramilitary-training-for-sergeants-at-arms--kenya-s-legislators-get-tougher-bodyguards";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"museveni-did-not-tell-ruto-to--lethal-force--opposition---graphics-fabricated.md": {
	id: "museveni-did-not-tell-ruto-to--lethal-force--opposition---graphics-fabricated.md";
  slug: "museveni-did-not-tell-ruto-to--lethal-force--opposition---graphics-fabricated";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mutoriah-s-litfest-gig--another-nairobi-party-to-forget.md": {
	id: "mutoriah-s-litfest-gig--another-nairobi-party-to-forget.md";
  slug: "mutoriah-s-litfest-gig--another-nairobi-party-to-forget";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mutua-s-main-character-energy-and-the-new--gig--in-ukraine.md": {
	id: "mutua-s-main-character-energy-and-the-new--gig--in-ukraine.md";
  slug: "mutua-s-main-character-energy-and-the-new--gig--in-ukraine";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"muturi-sees-another--mega-scandal--brewing-in-kenya-s-new-infrastructure-fund.md": {
	id: "muturi-sees-another--mega-scandal--brewing-in-kenya-s-new-infrastructure-fund.md";
  slug: "muturi-sees-another--mega-scandal--brewing-in-kenya-s-new-infrastructure-fund";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mwangi-s-math-and-the-great-kenyan-private-property-scam.md": {
	id: "mwangi-s-math-and-the-great-kenyan-private-property-scam.md";
  slug: "mwangi-s-math-and-the-great-kenyan-private-property-scam";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mwaura--give-ruto-time--he-has-delivered-more-in-3-years-than-any-other-president.md": {
	id: "mwaura--give-ruto-time--he-has-delivered-more-in-3-years-than-any-other-president.md";
  slug: "mwaura--give-ruto-time--he-has-delivered-more-in-3-years-than-any-other-president";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"my-hero-academia-voice-actor-mocks-cheating-streamer-s-apology--proving-online-morality-is-a-joke.md": {
	id: "my-hero-academia-voice-actor-mocks-cheating-streamer-s-apology--proving-online-morality-is-a-joke.md";
  slug: "my-hero-academia-voice-actor-mocks-cheating-streamer-s-apology--proving-online-morality-is-a-joke";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"myanmar-job-scam-trap--over-100-kenyans-stuck--39-jailed.md": {
	id: "myanmar-job-scam-trap--over-100-kenyans-stuck--39-jailed.md";
  slug: "myanmar-job-scam-trap--over-100-kenyans-stuck--39-jailed";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mzukulu-s-big-top-maskandi-album-tour--is-this-real-progress-or-just-more-casino-glitz.md": {
	id: "mzukulu-s-big-top-maskandi-album-tour--is-this-real-progress-or-just-more-casino-glitz.md";
  slug: "mzukulu-s-big-top-maskandi-album-tour--is-this-real-progress-or-just-more-casino-glitz";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi--where-the-only-thing-that-trickles-down-is-blood.md": {
	id: "nairobi--where-the-only-thing-that-trickles-down-is-blood.md";
  slug: "nairobi--where-the-only-thing-that-trickles-down-is-blood";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-braces-for-deluge--infrastructure-fails-again-as-officials-dither.md": {
	id: "nairobi-braces-for-deluge--infrastructure-fails-again-as-officials-dither.md";
  slug: "nairobi-braces-for-deluge--infrastructure-fails-again-as-officials-dither";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-club-hosting--more-hustle-than-hope-in-the-city-s-nightlife-industry.md": {
	id: "nairobi-club-hosting--more-hustle-than-hope-in-the-city-s-nightlife-industry.md";
  slug: "nairobi-club-hosting--more-hustle-than-hope-in-the-city-s-nightlife-industry";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-factory-churns-out-7-500-smartphones-daily---don-t-get-too-excited.md": {
	id: "nairobi-factory-churns-out-7-500-smartphones-daily---don-t-get-too-excited.md";
  slug: "nairobi-factory-churns-out-7-500-smartphones-daily---don-t-get-too-excited";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-fuel-shortage--global-shenanigans-hit-kenya-s-pumps.md": {
	id: "nairobi-fuel-shortage--global-shenanigans-hit-kenya-s-pumps.md";
  slug: "nairobi-fuel-shortage--global-shenanigans-hit-kenya-s-pumps";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-hospital-director-job-obwaka-dead--police-nab-last-seen-woman.md": {
	id: "nairobi-hospital-director-job-obwaka-dead--police-nab-last-seen-woman.md";
  slug: "nairobi-hospital-director-job-obwaka-dead--police-nab-last-seen-woman";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-hospital-directors-defiant--ruto-s--crackdown--is-old-news.md": {
	id: "nairobi-hospital-directors-defiant--ruto-s--crackdown--is-old-news.md";
  slug: "nairobi-hospital-directors-defiant--ruto-s--crackdown--is-old-news";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-hospital-officials-arrested-amidst-escalating-leadership-wranglers.md": {
	id: "nairobi-hospital-officials-arrested-amidst-escalating-leadership-wranglers.md";
  slug: "nairobi-hospital-officials-arrested-amidst-escalating-leadership-wranglers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-hustle-economy--the-unvarnished-cost-of-hope.md": {
	id: "nairobi-hustle-economy--the-unvarnished-cost-of-hope.md";
  slug: "nairobi-hustle-economy--the-unvarnished-cost-of-hope";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-infrastructure.md": {
	id: "nairobi-infrastructure.md";
  slug: "nairobi-infrastructure";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-is-a-crime-scene-and-nobody-is-coming-to-save-you.md": {
	id: "nairobi-is-a-crime-scene-and-nobody-is-coming-to-save-you.md";
  slug: "nairobi-is-a-crime-scene-and-nobody-is-coming-to-save-you";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-is-drowning-and-the-politicians-are-only-floating-words.md": {
	id: "nairobi-is-drowning-and-the-politicians-are-only-floating-words.md";
  slug: "nairobi-is-drowning-and-the-politicians-are-only-floating-words";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-is-drowning-while-the--blessed--crowd-scrambles-for-dry-ground.md": {
	id: "nairobi-is-drowning-while-the--blessed--crowd-scrambles-for-dry-ground.md";
  slug: "nairobi-is-drowning-while-the--blessed--crowd-scrambles-for-dry-ground";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-is-just-a-giant-drainage-clog-with-a-pr-team.md": {
	id: "nairobi-is-just-a-giant-drainage-clog-with-a-pr-team.md";
  slug: "nairobi-is-just-a-giant-drainage-clog-with-a-pr-team";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-is-no-sanctuary-for-the-brave.md": {
	id: "nairobi-is-no-sanctuary-for-the-brave.md";
  slug: "nairobi-is-no-sanctuary-for-the-brave";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-man-s--two-kambas--living-arrangement--netizens-suspect-lesbians-using-him-for-shelter.md": {
	id: "nairobi-man-s--two-kambas--living-arrangement--netizens-suspect-lesbians-using-him-for-shelter.md";
  slug: "nairobi-man-s--two-kambas--living-arrangement--netizens-suspect-lesbians-using-him-for-shelter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-matatus--boda-bodas-double-down-on-pain-for-commuters.md": {
	id: "nairobi-matatus--boda-bodas-double-down-on-pain-for-commuters.md";
  slug: "nairobi-matatus--boda-bodas-double-down-on-pain-for-commuters";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-police-back-from-south-sudan-chaos--ready-to--improve-policing.md": {
	id: "nairobi-police-back-from-south-sudan-chaos--ready-to--improve-policing.md";
  slug: "nairobi-police-back-from-south-sudan-chaos--ready-to--improve-policing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-rallies-africa-to-build-its-digital-future--and-we-ll-probably-pay-for-it.md": {
	id: "nairobi-rallies-africa-to-build-its-digital-future--and-we-ll-probably-pay-for-it.md";
  slug: "nairobi-rallies-africa-to-build-its-digital-future--and-we-ll-probably-pay-for-it";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-s--soft-life--founders-just-got-a-new-address--the-remand-home.md": {
	id: "nairobi-s--soft-life--founders-just-got-a-new-address--the-remand-home.md";
  slug: "nairobi-s--soft-life--founders-just-got-a-new-address--the-remand-home";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-s--soft-life--goes-underwater-as-clogged-drains-expose-the-messy-truth.md": {
	id: "nairobi-s--soft-life--goes-underwater-as-clogged-drains-expose-the-messy-truth.md";
  slug: "nairobi-s--soft-life--goes-underwater-as-clogged-drains-expose-the-messy-truth";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-s-annual--swamp-edition---while-you-wade-through-sewage--your-faves-are-staying-dry-in-kilimani.md": {
	id: "nairobi-s-annual--swamp-edition---while-you-wade-through-sewage--your-faves-are-staying-dry-in-kilimani.md";
  slug: "nairobi-s-annual--swamp-edition---while-you-wade-through-sewage--your-faves-are-staying-dry-in-kilimani";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-s-annual-baptism--pay-the-price-or-learn-to-tread-water.md": {
	id: "nairobi-s-annual-baptism--pay-the-price-or-learn-to-tread-water.md";
  slug: "nairobi-s-annual-baptism--pay-the-price-or-learn-to-tread-water";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-s-annual-baptism-by-sewage--28-dead-while-the-big-men-play-rescue.md": {
	id: "nairobi-s-annual-baptism-by-sewage--28-dead-while-the-big-men-play-rescue.md";
  slug: "nairobi-s-annual-baptism-by-sewage--28-dead-while-the-big-men-play-rescue";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-s-annual-drowning--23-dead-in-the-city-of-failed-concrete.md": {
	id: "nairobi-s-annual-drowning--23-dead-in-the-city-of-failed-concrete.md";
  slug: "nairobi-s-annual-drowning--23-dead-in-the-city-of-failed-concrete";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-s-cartel-chorus--gakuya-sings-a-song-we-already-know.md": {
	id: "nairobi-s-cartel-chorus--gakuya-sings-a-song-we-already-know.md";
  slug: "nairobi-s-cartel-chorus--gakuya-sings-a-song-we-already-know";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-s-favorite-game--hunt-the-whistleblower-while-the-thief-escapes.md": {
	id: "nairobi-s-favorite-game--hunt-the-whistleblower-while-the-thief-escapes.md";
  slug: "nairobi-s-favorite-game--hunt-the-whistleblower-while-the-thief-escapes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-s-mathare-mothers-get-no-rest-after-birth--just-more-sufferings.md": {
	id: "nairobi-s-mathare-mothers-get-no-rest-after-birth--just-more-sufferings.md";
  slug: "nairobi-s-mathare-mothers-get-no-rest-after-birth--just-more-sufferings";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-s-new-alcohol-board--more-hot-air-than-cold-beer.md": {
	id: "nairobi-s-new-alcohol-board--more-hot-air-than-cold-beer.md";
  slug: "nairobi-s-new-alcohol-board--more-hot-air-than-cold-beer";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-s-office-market-is-chasing-shadows-while-kampala-cashes-in.md": {
	id: "nairobi-s-office-market-is-chasing-shadows-while-kampala-cashes-in.md";
  slug: "nairobi-s-office-market-is-chasing-shadows-while-kampala-cashes-in";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-s-passport-bazaar--selling-the-soul-of-the-city-for-sudan-s-warlords.md": {
	id: "nairobi-s-passport-bazaar--selling-the-soul-of-the-city-for-sudan-s-warlords.md";
  slug: "nairobi-s-passport-bazaar--selling-the-soul-of-the-city-for-sudan-s-warlords";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-s-rising-towers--human-stories.md": {
	id: "nairobi-s-rising-towers--human-stories.md";
  slug: "nairobi-s-rising-towers--human-stories";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-summit-gathers-africa-s-big-shots-for-another-digital-chat.md": {
	id: "nairobi-summit-gathers-africa-s-big-shots-for-another-digital-chat.md";
  slug: "nairobi-summit-gathers-africa-s-big-shots-for-another-digital-chat";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nairobi-woman-drowns-in-plastic-waste-while-chasing-green-dreams.md": {
	id: "nairobi-woman-drowns-in-plastic-waste-while-chasing-green-dreams.md";
  slug: "nairobi-woman-drowns-in-plastic-waste-while-chasing-green-dreams";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nakuru-hostel-shuttered--job-seekers-rescued-amid-abuse-claims--don-t-expect-real-change.md": {
	id: "nakuru-hostel-shuttered--job-seekers-rescued-amid-abuse-claims--don-t-expect-real-change.md";
  slug: "nakuru-hostel-shuttered--job-seekers-rescued-amid-abuse-claims--don-t-expect-real-change";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nameless-and-wahu--rebranding-as-teachers-because-the-music-charts-are-cold.md": {
	id: "nameless-and-wahu--rebranding-as-teachers-because-the-music-charts-are-cold.md";
  slug: "nameless-and-wahu--rebranding-as-teachers-because-the-music-charts-are-cold";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nanyuki-s-badminton-circus--another--youth-empowerment--scam.md": {
	id: "nanyuki-s-badminton-circus--another--youth-empowerment--scam.md";
  slug: "nanyuki-s-badminton-circus--another--youth-empowerment--scam";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"narcissism-on-ice--laegreid-hijacks-olympic-glory-for-personal-damage-control.md": {
	id: "narcissism-on-ice--laegreid-hijacks-olympic-glory-for-personal-damage-control.md";
  slug: "narcissism-on-ice--laegreid-hijacks-olympic-glory-for-personal-damage-control";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nasa-satellite-reveals-mexico-city-s-rapid-sinking--the-inevitable-consequence-of-human-greed.md": {
	id: "nasa-satellite-reveals-mexico-city-s-rapid-sinking--the-inevitable-consequence-of-human-greed.md";
  slug: "nasa-satellite-reveals-mexico-city-s-rapid-sinking--the-inevitable-consequence-of-human-greed";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nba-all-star-game--durant-claims-donic-and-jokic--don-t-care--amid-questions-about-competitiveness.md": {
	id: "nba-all-star-game--durant-claims-donic-and-jokic--don-t-care--amid-questions-about-competitiveness.md";
  slug: "nba-all-star-game--durant-claims-donic-and-jokic--don-t-care--amid-questions-about-competitiveness";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nba-mid-season-analysis--the-40-20-rule-and-the-evolution-of-league-parity.md": {
	id: "nba-mid-season-analysis--the-40-20-rule-and-the-evolution-of-league-parity.md";
  slug: "nba-mid-season-analysis--the-40-20-rule-and-the-evolution-of-league-parity";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nba-youngboy-deletes-his-accounts-after-proving-he-is-father-of-the-year--not.md": {
	id: "nba-youngboy-deletes-his-accounts-after-proving-he-is-father-of-the-year--not.md";
  slug: "nba-youngboy-deletes-his-accounts-after-proving-he-is-father-of-the-year--not";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"necromancy-and-net-worth--the-kuscco-heist.md": {
	id: "necromancy-and-net-worth--the-kuscco-heist.md";
  slug: "necromancy-and-net-worth--the-kuscco-heist";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"negative-points-and-empty-pockets--the-sad-state-of-the--premier--league.md": {
	id: "negative-points-and-empty-pockets--the-sad-state-of-the--premier--league.md";
  slug: "negative-points-and-empty-pockets--the-sad-state-of-the--premier--league";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nepo-babies-in-handcuffs-and-lax-pr-walks--the-week-the-rich-forgot-how-to-act.md": {
	id: "nepo-babies-in-handcuffs-and-lax-pr-walks--the-week-the-rich-forgot-how-to-act.md";
  slug: "nepo-babies-in-handcuffs-and-lax-pr-walks--the-week-the-rich-forgot-how-to-act";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nepotism-as-artistic-process--the-financial-desperation-of-the-icelandic-auteur.md": {
	id: "nepotism-as-artistic-process--the-financial-desperation-of-the-icelandic-auteur.md";
  slug: "nepotism-as-artistic-process--the-financial-desperation-of-the-icelandic-auteur";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"new--backrooms--trailer-offers-little-more-than-predictable-dread.md": {
	id: "new--backrooms--trailer-offers-little-more-than-predictable-dread.md";
  slug: "new--backrooms--trailer-offers-little-more-than-predictable-dread";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"new--supremo---same-old-hunger--the-manufacturing-of-george-natembeya.md": {
	id: "new--supremo---same-old-hunger--the-manufacturing-of-george-natembeya.md";
  slug: "new--supremo---same-old-hunger--the-manufacturing-of-george-natembeya";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"new-delhi-ai-summit--silicon-valley-titans-converge-as-india-asserts-tech-superpower-ambitions.md": {
	id: "new-delhi-ai-summit--silicon-valley-titans-converge-as-india-asserts-tech-superpower-ambitions.md";
  slug: "new-delhi-ai-summit--silicon-valley-titans-converge-as-india-asserts-tech-superpower-ambitions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"new-delhi-s-desperate-shield--propping-up-a-fragile-economy-amid-west-asian-chaos.md": {
	id: "new-delhi-s-desperate-shield--propping-up-a-fragile-economy-amid-west-asian-chaos.md";
  slug: "new-delhi-s-desperate-shield--propping-up-a-fragile-economy-amid-west-asian-chaos";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"new-microsoft-gaming-ceo-asha-sharma-on-defining--great-games---ai-stance--and-succeeding-phil-spencer.md": {
	id: "new-microsoft-gaming-ceo-asha-sharma-on-defining--great-games---ai-stance--and-succeeding-phil-spencer.md";
  slug: "new-microsoft-gaming-ceo-asha-sharma-on-defining--great-games---ai-stance--and-succeeding-phil-spencer";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"new-post.md": {
	id: "new-post.md";
  slug: "new-post";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"new-wash-wash-20-nairobi-scammers-ai-deepfakes-mulot.md": {
	id: "new-wash-wash-20-nairobi-scammers-ai-deepfakes-mulot.md";
  slug: "new-wash-wash-20-nairobi-scammers-ai-deepfakes-mulot";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"newsguard-files-lawsuit-against-ftc-over-alleged-censorship.md": {
	id: "newsguard-files-lawsuit-against-ftc-over-alleged-censorship.md";
  slug: "newsguard-files-lawsuit-against-ftc-over-alleged-censorship";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nfc-secures-66-52-victory-in-2026-pro-bowl-games.md": {
	id: "nfc-secures-66-52-victory-in-2026-pro-bowl-games.md";
  slug: "nfc-secures-66-52-victory-in-2026-pro-bowl-games";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nicole-kidman-s-leopard-print-look-is-a-distraction-from-the-210-million-pound-divorce-dust-up.md": {
	id: "nicole-kidman-s-leopard-print-look-is-a-distraction-from-the-210-million-pound-divorce-dust-up.md";
  slug: "nicole-kidman-s-leopard-print-look-is-a-distraction-from-the-210-million-pound-divorce-dust-up";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nigeria-s-prophetic-influencers--ring-lights--holy-water--and-the-search-for-viral-amens.md": {
	id: "nigeria-s-prophetic-influencers--ring-lights--holy-water--and-the-search-for-viral-amens.md";
  slug: "nigeria-s-prophetic-influencers--ring-lights--holy-water--and-the-search-for-viral-amens";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nigerian-national-arrested-amid-ongoing-nairobi-drug-bust---surprise--surprise.md": {
	id: "nigerian-national-arrested-amid-ongoing-nairobi-drug-bust---surprise--surprise.md";
  slug: "nigerian-national-arrested-amid-ongoing-nairobi-drug-bust---surprise--surprise";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"niko-kadi---the-latest-gimmick-to-make-politics-barely-less-boring-for-the-youth.md": {
	id: "niko-kadi---the-latest-gimmick-to-make-politics-barely-less-boring-for-the-youth.md";
  slug: "niko-kadi---the-latest-gimmick-to-make-politics-barely-less-boring-for-the-youth";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nintendo-is-releasing-pok-mon-firered-and-leafgreen-on-switch-consoles--but-you-ll-have-to-buy-them-as-they-are-skipping-nintendo-switch-online.md": {
	id: "nintendo-is-releasing-pok-mon-firered-and-leafgreen-on-switch-consoles--but-you-ll-have-to-buy-them-as-they-are-skipping-nintendo-switch-online.md";
  slug: "nintendo-is-releasing-pok-mon-firered-and-leafgreen-on-switch-consoles--but-you-ll-have-to-buy-them-as-they-are-skipping-nintendo-switch-online";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"njoro-police--rescue--67-girls-from-gulf-job-trap---don-t-hold-your-breath.md": {
	id: "njoro-police--rescue--67-girls-from-gulf-job-trap---don-t-hold-your-breath.md";
  slug: "njoro-police--rescue--67-girls-from-gulf-job-trap---don-t-hold-your-breath";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"no-amount-of-insults--noise-will-chase-me-from-mt--kenya---ruto-tells-opposition.md": {
	id: "no-amount-of-insults--noise-will-chase-me-from-mt--kenya---ruto-tells-opposition.md";
  slug: "no-amount-of-insults--noise-will-chase-me-from-mt--kenya---ruto-tells-opposition";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"no-phone--no-clout--iebc-tries-to-stop-the-tiktok-ification-of-kenyan-elections.md": {
	id: "no-phone--no-clout--iebc-tries-to-stop-the-tiktok-ification-of-kenyan-elections.md";
  slug: "no-phone--no-clout--iebc-tries-to-stop-the-tiktok-ification-of-kenyan-elections";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"noah-wyle-returns-to-a-e-with--the-pitt----a-cynical-look-at-america-s-healthcare-wasteland.md": {
	id: "noah-wyle-returns-to-a-e-with--the-pitt----a-cynical-look-at-america-s-healthcare-wasteland.md";
  slug: "noah-wyle-returns-to-a-e-with--the-pitt----a-cynical-look-at-america-s-healthcare-wasteland";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"noah-wyle-s--the-pitt---a-e-drama-exposes-healthcare-s-grim-reality-amidst-producer-s-naivete.md": {
	id: "noah-wyle-s--the-pitt---a-e-drama-exposes-healthcare-s-grim-reality-amidst-producer-s-naivete.md";
  slug: "noah-wyle-s--the-pitt---a-e-drama-exposes-healthcare-s-grim-reality-amidst-producer-s-naivete";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"noah-wyle-s--the-pitt--on-a-e--a-cynical-mirror-to-society-s-discarded-and-exploited.md": {
	id: "noah-wyle-s--the-pitt--on-a-e--a-cynical-mirror-to-society-s-discarded-and-exploited.md";
  slug: "noah-wyle-s--the-pitt--on-a-e--a-cynical-mirror-to-society-s-discarded-and-exploited";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"north-london-derby--arsenal-and-tottenham-face-pivotal-clash-amidst-title-race-and-relegation-fears.md": {
	id: "north-london-derby--arsenal-and-tottenham-face-pivotal-clash-amidst-title-race-and-relegation-fears.md";
  slug: "north-london-derby--arsenal-and-tottenham-face-pivotal-clash-amidst-title-race-and-relegation-fears";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"northern-kenya-drought-worse-than-ever--new-report-confirms---surprise--surprise.md": {
	id: "northern-kenya-drought-worse-than-ever--new-report-confirms---surprise--surprise.md";
  slug: "northern-kenya-drought-worse-than-ever--new-report-confirms---surprise--surprise";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nostalgia-is-the-only-currency-left-for-our-aging-music-stars.md": {
	id: "nostalgia-is-the-only-currency-left-for-our-aging-music-stars.md";
  slug: "nostalgia-is-the-only-currency-left-for-our-aging-music-stars";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"not-fit-for-purpose---the-exhausting--endless-cycle-of-state-incompetence.md": {
	id: "not-fit-for-purpose---the-exhausting--endless-cycle-of-state-incompetence.md";
  slug: "not-fit-for-purpose---the-exhausting--endless-cycle-of-state-incompetence";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"not-fit-for-purpose---the-secret--cynical-history-of-a-deadly-political-catchphrase.md": {
	id: "not-fit-for-purpose---the-secret--cynical-history-of-a-deadly-political-catchphrase.md";
  slug: "not-fit-for-purpose---the-secret--cynical-history-of-a-deadly-political-catchphrase";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nps-calls-for-calm-as-security-reinforced-in-tseikuru-following-deadly-attacks.md": {
	id: "nps-calls-for-calm-as-security-reinforced-in-tseikuru-following-deadly-attacks.md";
  slug: "nps-calls-for-calm-as-security-reinforced-in-tseikuru-following-deadly-attacks";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ntsa-s-new-price-list--how-much-it-costs-to-breathe-on-nairobi-roads.md": {
	id: "ntsa-s-new-price-list--how-much-it-costs-to-breathe-on-nairobi-roads.md";
  slug: "ntsa-s-new-price-list--how-much-it-costs-to-breathe-on-nairobi-roads";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nudie-jeans-accelerates-direct-to-consumer-shift-with-paris-debut-and-repair-centric-retail-model.md": {
	id: "nudie-jeans-accelerates-direct-to-consumer-shift-with-paris-debut-and-repair-centric-retail-model.md";
  slug: "nudie-jeans-accelerates-direct-to-consumer-shift-with-paris-debut-and-repair-centric-retail-model";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nusu-mkate-necromancy--the-odm-uda-pact-is-a-walking-corpse.md": {
	id: "nusu-mkate-necromancy--the-odm-uda-pact-is-a-walking-corpse.md";
  slug: "nusu-mkate-necromancy--the-odm-uda-pact-is-a-walking-corpse";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nvidia-s-100-billion-openai-deal-reportedly-collapses.md": {
	id: "nvidia-s-100-billion-openai-deal-reportedly-collapses.md";
  slug: "nvidia-s-100-billion-openai-deal-reportedly-collapses";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nvidia-stock-faces-reality-check-over-100-billion-investment.md": {
	id: "nvidia-stock-faces-reality-check-over-100-billion-investment.md";
  slug: "nvidia-stock-faces-reality-check-over-100-billion-investment";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nyalenya-station--where-the-uniform-is-just-a-bullseye.md": {
	id: "nyalenya-station--where-the-uniform-is-just-a-bullseye.md";
  slug: "nyalenya-station--where-the-uniform-is-just-a-bullseye";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nyayo-house-clearance-sale--your-identity-for-the-highest-bidder.md": {
	id: "nyayo-house-clearance-sale--your-identity-for-the-highest-bidder.md";
  slug: "nyayo-house-clearance-sale--your-identity-for-the-highest-bidder";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nyayo-house-special--buy-a-passport--lose-a-country.md": {
	id: "nyayo-house-special--buy-a-passport--lose-a-country.md";
  slug: "nyayo-house-special--buy-a-passport--lose-a-country";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nyayo-mud-and-misery--gor-mahia-s-easy-walk-over-nairobi-s-broken-dreams.md": {
	id: "nyayo-mud-and-misery--gor-mahia-s-easy-walk-over-nairobi-s-broken-dreams.md";
  slug: "nyayo-mud-and-misery--gor-mahia-s-easy-walk-over-nairobi-s-broken-dreams";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"oburu-oginga-s-cynical-smile--raila--odm--and-the-greek-tragedy-of-kenyan-politics.md": {
	id: "oburu-oginga-s-cynical-smile--raila--odm--and-the-greek-tragedy-of-kenyan-politics.md";
  slug: "oburu-oginga-s-cynical-smile--raila--odm--and-the-greek-tragedy-of-kenyan-politics";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"oburu-oginga-s-new-riverside-drive--power-seat---just-another-seat-of-rot.md": {
	id: "oburu-oginga-s-new-riverside-drive--power-seat---just-another-seat-of-rot.md";
  slug: "oburu-oginga-s-new-riverside-drive--power-seat---just-another-seat-of-rot";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"oburu-takes-odm-helm--osotsi-axed--more-musical-chairs-in-the-political-circus.md": {
	id: "oburu-takes-odm-helm--osotsi-axed--more-musical-chairs-in-the-political-circus.md";
  slug: "oburu-takes-odm-helm--osotsi-axed--more-musical-chairs-in-the-political-circus";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"odm-leadership-disowns-activist-oketch-salah-amid-growing-internal-friction.md": {
	id: "odm-leadership-disowns-activist-oketch-salah-amid-growing-internal-friction.md";
  slug: "odm-leadership-disowns-activist-oketch-salah-amid-growing-internal-friction";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"odm-s-two-theatres--one-divided-party--raila-s--pawa--struggle-continues.md": {
	id: "odm-s-two-theatres--one-divided-party--raila-s--pawa--struggle-continues.md";
  slug: "odm-s-two-theatres--one-divided-party--raila-s--pawa--struggle-continues";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"office-of-the-president-ambulance-scam--sh62-million-down-the-drain--swedes-left-holding-empty-pockets.md": {
	id: "office-of-the-president-ambulance-scam--sh62-million-down-the-drain--swedes-left-holding-empty-pockets.md";
  slug: "office-of-the-president-ambulance-scam--sh62-million-down-the-drain--swedes-left-holding-empty-pockets";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"oga-obinna-s-viral-parenting--kenyan-celebrity-culture-s-latest-gimmick.md": {
	id: "oga-obinna-s-viral-parenting--kenyan-celebrity-culture-s-latest-gimmick.md";
  slug: "oga-obinna-s-viral-parenting--kenyan-celebrity-culture-s-latest-gimmick";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ohio-state-defeats-iowa-24-9-in-record-breaking-dual-meet.md": {
	id: "ohio-state-defeats-iowa-24-9-in-record-breaking-dual-meet.md";
  slug: "ohio-state-defeats-iowa-24-9-in-record-breaking-dual-meet";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"oil-giants-double-down-on-plastics--a-cynical-future-of-profit-over-planet.md": {
	id: "oil-giants-double-down-on-plastics--a-cynical-future-of-profit-over-planet.md";
  slug: "oil-giants-double-down-on-plastics--a-cynical-future-of-profit-over-planet";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"oil-industry-bets-big-on-plastic--a-cynical-look-at-the-future.md": {
	id: "oil-industry-bets-big-on-plastic--a-cynical-look-at-the-future.md";
  slug: "oil-industry-bets-big-on-plastic--a-cynical-look-at-the-future";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"oil-industry-s-plastic-gamble--a-cynical-look-at-the-future.md": {
	id: "oil-industry-s-plastic-gamble--a-cynical-look-at-the-future.md";
  slug: "oil-industry-s-plastic-gamble--a-cynical-look-at-the-future";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"oil-scandal-turns-political--uda-now-targets-gachagua--claims-mombasa-money-man-behind-it.md": {
	id: "oil-scandal-turns-political--uda-now-targets-gachagua--claims-mombasa-money-man-behind-it.md";
  slug: "oil-scandal-turns-political--uda-now-targets-gachagua--claims-mombasa-money-man-behind-it";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"old-radios--new-lies--kbc-s-ai-pr-stunt-won-t-save-a-sinking-ship.md": {
	id: "old-radios--new-lies--kbc-s-ai-pr-stunt-won-t-save-a-sinking-ship.md";
  slug: "old-radios--new-lies--kbc-s-ai-pr-stunt-won-t-save-a-sinking-ship";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"olympic-choreographer-beno-t-richaud-s-viral-jacket-swaps--a-spectacle-masking-deeper-realities.md": {
	id: "olympic-choreographer-beno-t-richaud-s-viral-jacket-swaps--a-spectacle-masking-deeper-realities.md";
  slug: "olympic-choreographer-beno-t-richaud-s-viral-jacket-swaps--a-spectacle-masking-deeper-realities";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"omanga-s-big-switch--ruto-s-broken-promises-led-her-straight-to-gachagua-s-door.md": {
	id: "omanga-s-big-switch--ruto-s-broken-promises-led-her-straight-to-gachagua-s-door.md";
  slug: "omanga-s-big-switch--ruto-s-broken-promises-led-her-straight-to-gachagua-s-door";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"one-life-sentence-won-t-wash-away-the-blood-on-the-beret.md": {
	id: "one-life-sentence-won-t-wash-away-the-blood-on-the-beret.md";
  slug: "one-life-sentence-won-t-wash-away-the-blood-on-the-beret";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"one-petroleum-speaks-after-government-blocks-fuel-shipment--but-we-all-know-how-this-ends.md": {
	id: "one-petroleum-speaks-after-government-blocks-fuel-shipment--but-we-all-know-how-this-ends.md";
  slug: "one-petroleum-speaks-after-government-blocks-fuel-shipment--but-we-all-know-how-this-ends";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"open-borders--closed-eyes--the-mandera-gamble.md": {
	id: "open-borders--closed-eyes--the-mandera-gamble.md";
  slug: "open-borders--closed-eyes--the-mandera-gamble";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"openai-s-reported-troubles-loom-over-big-tech-s-earnings-as-ai-hype-falters.md": {
	id: "openai-s-reported-troubles-loom-over-big-tech-s-earnings-as-ai-hype-falters.md";
  slug: "openai-s-reported-troubles-loom-over-big-tech-s-earnings-as-ai-hype-falters";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"openai-sidesteps-xai-trade-secret-claims--another-tech-titan-s-legal-shuffle.md": {
	id: "openai-sidesteps-xai-trade-secret-claims--another-tech-titan-s-legal-shuffle.md";
  slug: "openai-sidesteps-xai-trade-secret-claims--another-tech-titan-s-legal-shuffle";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"openai-sidesteps-xai-trade-secret-lawsuit--exposing-weak-claims.md": {
	id: "openai-sidesteps-xai-trade-secret-lawsuit--exposing-weak-claims.md";
  slug: "openai-sidesteps-xai-trade-secret-lawsuit--exposing-weak-claims";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"openai-wins-the-right-to-plunder-talent-while-xai-fumbles-the-legal-ball.md": {
	id: "openai-wins-the-right-to-plunder-talent-while-xai-fumbles-the-legal-ball.md";
  slug: "openai-wins-the-right-to-plunder-talent-while-xai-fumbles-the-legal-ball";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"opening-the-gates-to-god-knows-what.md": {
	id: "opening-the-gates-to-god-knows-what.md";
  slug: "opening-the-gates-to-god-knows-what";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"operation-epic-fail--why-our-social-media-stars-think-they-are-going-to-war.md": {
	id: "operation-epic-fail--why-our-social-media-stars-think-they-are-going-to-war.md";
  slug: "operation-epic-fail--why-our-social-media-stars-think-they-are-going-to-war";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"opposition-leaders-demand-recall-of-kenyan-youth-from-russia.md": {
	id: "opposition-leaders-demand-recall-of-kenyan-youth-from-russia.md";
  slug: "opposition-leaders-demand-recall-of-kenyan-youth-from-russia";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"orengo-s-complex-dance-with-the-odinga-dynasty--a-cynical-breakdown.md": {
	id: "orengo-s-complex-dance-with-the-odinga-dynasty--a-cynical-breakdown.md";
  slug: "orengo-s-complex-dance-with-the-odinga-dynasty--a-cynical-breakdown";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"osotsi-attack--police-name-hooded-goons--but-who-s-really-pulling-strings.md": {
	id: "osotsi-attack--police-name-hooded-goons--but-who-s-really-pulling-strings.md";
  slug: "osotsi-attack--police-name-hooded-goons--but-who-s-really-pulling-strings";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"our-identity-for-sale--why-your-kenyan-passport-is-now-a-red-flag-at-every-border.md": {
	id: "our-identity-for-sale--why-your-kenyan-passport-is-now-a-red-flag-at-every-border.md";
  slug: "our-identity-for-sale--why-your-kenyan-passport-is-now-a-red-flag-at-every-border";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"our-national-security-is-just-a-side-hustle-for-nyayo-house-cartels.md": {
	id: "our-national-security-is-just-a-side-hustle-for-nyayo-house-cartels.md";
  slug: "our-national-security-is-just-a-side-hustle-for-nyayo-house-cartels";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"our-passport-is-just-a-vip-pass-for-genocidaires.md": {
	id: "our-passport-is-just-a-vip-pass-for-genocidaires.md";
  slug: "our-passport-is-just-a-vip-pass-for-genocidaires";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"over-30-turkana-ecde--inclusive-education--coordinators-trained---prepare-for-more-empty-promises.md": {
	id: "over-30-turkana-ecde--inclusive-education--coordinators-trained---prepare-for-more-empty-promises.md";
  slug: "over-30-turkana-ecde--inclusive-education--coordinators-trained---prepare-for-more-empty-promises";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"overwatch-2-launches-jetpack-cat-as-new-playable-hero.md": {
	id: "overwatch-2-launches-jetpack-cat-as-new-playable-hero.md";
  slug: "overwatch-2-launches-jetpack-cat-as-new-playable-hero";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"page-six-spills-royal-tea--meghan-brainwashed--zendaya-married--hollywood-s-messy-underbelly-exposed.md": {
	id: "page-six-spills-royal-tea--meghan-brainwashed--zendaya-married--hollywood-s-messy-underbelly-exposed.md";
  slug: "page-six-spills-royal-tea--meghan-brainwashed--zendaya-married--hollywood-s-messy-underbelly-exposed";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"palantir-shares-decline-29-ahead-of-key-earnings-report.md": {
	id: "palantir-shares-decline-29-ahead-of-key-earnings-report.md";
  slug: "palantir-shares-decline-29-ahead-of-key-earnings-report";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"parliament-clears-safaricom-stake-sale-with-six-conditions.md": {
	id: "parliament-clears-safaricom-stake-sale-with-six-conditions.md";
  slug: "parliament-clears-safaricom-stake-sale-with-six-conditions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"parliament-to-grill-energy-cs-wandayi-over-disputed-60-000-tonne-petrol-import-amid-fuel-crisis-probe.md": {
	id: "parliament-to-grill-energy-cs-wandayi-over-disputed-60-000-tonne-petrol-import-amid-fuel-crisis-probe.md";
  slug: "parliament-to-grill-energy-cs-wandayi-over-disputed-60-000-tonne-petrol-import-amid-fuel-crisis-probe";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"passaris-to-ngunyi--kenya-still-stuck-on-tribe-politics--passaris-says.md": {
	id: "passaris-to-ngunyi--kenya-still-stuck-on-tribe-politics--passaris-says.md";
  slug: "passaris-to-ngunyi--kenya-still-stuck-on-tribe-politics--passaris-says";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"passport-to-chaos--why-nairobi-is-the-ultimate-hideout-for-problematic-paramilitary-princes.md": {
	id: "passport-to-chaos--why-nairobi-is-the-ultimate-hideout-for-problematic-paramilitary-princes.md";
  slug: "passport-to-chaos--why-nairobi-is-the-ultimate-hideout-for-problematic-paramilitary-princes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"passport-to-purgatory--warlords--diamonds--and-the-ultimate-identity-crisis.md": {
	id: "passport-to-purgatory--warlords--diamonds--and-the-ultimate-identity-crisis.md";
  slug: "passport-to-purgatory--warlords--diamonds--and-the-ultimate-identity-crisis";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"passport-to-the-vip-club--why-your-identity-is-cheaper-than-a-bottle-of-mo-t.md": {
	id: "passport-to-the-vip-club--why-your-identity-is-cheaper-than-a-bottle-of-mo-t.md";
  slug: "passport-to-the-vip-club--why-your-identity-is-cheaper-than-a-bottle-of-mo-t";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"passports-for-the-genocidal-elite--kenya-s-newest-vip-guest-list.md": {
	id: "passports-for-the-genocidal-elite--kenya-s-newest-vip-guest-list.md";
  slug: "passports-for-the-genocidal-elite--kenya-s-newest-vip-guest-list";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"passports-for-warlords--how-our-sovereignty-became-a-side-hustle.md": {
	id: "passports-for-warlords--how-our-sovereignty-became-a-side-hustle.md";
  slug: "passports-for-warlords--how-our-sovereignty-became-a-side-hustle";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"passports-for-warlords--the-ultimate-vip-access-nobody-asked-for.md": {
	id: "passports-for-warlords--the-ultimate-vip-access-nobody-asked-for.md";
  slug: "passports-for-warlords--the-ultimate-vip-access-nobody-asked-for";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"patsy-ouma-karanja--the-captain-who-decides-if-you-re-fit-to-crash.md": {
	id: "patsy-ouma-karanja--the-captain-who-decides-if-you-re-fit-to-crash.md";
  slug: "patsy-ouma-karanja--the-captain-who-decides-if-you-re-fit-to-crash";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"paypal-shares-drop-as-enrique-lores-named-ceo-amid-profit-miss.md": {
	id: "paypal-shares-drop-as-enrique-lores-named-ceo-amid-profit-miss.md";
  slug: "paypal-shares-drop-as-enrique-lores-named-ceo-amid-profit-miss";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"pentagon-s-anthropic-feud--congress-s-inaction-exposed-again.md": {
	id: "pentagon-s-anthropic-feud--congress-s-inaction-exposed-again.md";
  slug: "pentagon-s-anthropic-feud--congress-s-inaction-exposed-again";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"pentagon-s-anthropic-feud-proves-congress-s-paralysis-a-wake-up-call-for-the-obvious.md": {
	id: "pentagon-s-anthropic-feud-proves-congress-s-paralysis-a-wake-up-call-for-the-obvious.md";
  slug: "pentagon-s-anthropic-feud-proves-congress-s-paralysis-a-wake-up-call-for-the-obvious";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"pentagon-s-surveillance-overreach--why-anthropic-s-distrust-is-justified.md": {
	id: "pentagon-s-surveillance-overreach--why-anthropic-s-distrust-is-justified.md";
  slug: "pentagon-s-surveillance-overreach--why-anthropic-s-distrust-is-justified";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"pentagon-wants-x-ray-vision-for-hidden-threats-half-a-mile-away---more-expensive-toys-for-the-warmongers.md": {
	id: "pentagon-wants-x-ray-vision-for-hidden-threats-half-a-mile-away---more-expensive-toys-for-the-warmongers.md";
  slug: "pentagon-wants-x-ray-vision-for-hidden-threats-half-a-mile-away---more-expensive-toys-for-the-warmongers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"performative-romance--the-heavy-cost-of-kenya-s-influencer-industrial-complex---streamlinefeed-co-ke.md": {
	id: "performative-romance--the-heavy-cost-of-kenya-s-influencer-industrial-complex---streamlinefeed-co-ke.md";
  slug: "performative-romance--the-heavy-cost-of-kenya-s-influencer-industrial-complex---streamlinefeed-co-ke";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"period-piece-or-thirst-trap--madam-beja-is-giving-us-recycled-drama.md": {
	id: "period-piece-or-thirst-trap--madam-beja-is-giving-us-recycled-drama.md";
  slug: "period-piece-or-thirst-trap--madam-beja-is-giving-us-recycled-drama";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"pete-hegseth-s-alpha-dad-ego-lift-is-the-cringe-content-nobody-asked-for.md": {
	id: "pete-hegseth-s-alpha-dad-ego-lift-is-the-cringe-content-nobody-asked-for.md";
  slug: "pete-hegseth-s-alpha-dad-ego-lift-is-the-cringe-content-nobody-asked-for";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"petroleum-ps--kpc--epra-bosses-out-amid-fuel-shortage-lies.md": {
	id: "petroleum-ps--kpc--epra-bosses-out-amid-fuel-shortage-lies.md";
  slug: "petroleum-ps--kpc--epra-bosses-out-amid-fuel-shortage-lies";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"pets-in-kenya--another-way-nairobi-is-selling-your-loneliness.md": {
	id: "pets-in-kenya--another-way-nairobi-is-selling-your-loneliness.md";
  slug: "pets-in-kenya--another-way-nairobi-is-selling-your-loneliness";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"pfas-contamination-in-pet-food-signals-regulatory-shifts-for-global-manufacturers.md": {
	id: "pfas-contamination-in-pet-food-signals-regulatory-shifts-for-global-manufacturers.md";
  slug: "pfas-contamination-in-pet-food-signals-regulatory-shifts-for-global-manufacturers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"pheelz-thinks-your-playlist-needs-an-exorcism--the-producer-s-crusade-against-robot-beats.md": {
	id: "pheelz-thinks-your-playlist-needs-an-exorcism--the-producer-s-crusade-against-robot-beats.md";
  slug: "pheelz-thinks-your-playlist-needs-an-exorcism--the-producer-s-crusade-against-robot-beats";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"philippines-declares-energy-emergency-over-iran-conflict---another-ill-prepared-nation-stumbles.md": {
	id: "philippines-declares-energy-emergency-over-iran-conflict---another-ill-prepared-nation-stumbles.md";
  slug: "philippines-declares-energy-emergency-over-iran-conflict---another-ill-prepared-nation-stumbles";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"philippines-energy-emergency-declared--another-nation-caught-in-global-oil-charades.md": {
	id: "philippines-energy-emergency-declared--another-nation-caught-in-global-oil-charades.md";
  slug: "philippines-energy-emergency-declared--another-nation-caught-in-global-oil-charades";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"phori-s-preaching-and-royal-raids--the-hypocrisy-of-the-industry-s-biggest-egos.md": {
	id: "phori-s-preaching-and-royal-raids--the-hypocrisy-of-the-industry-s-biggest-egos.md";
  slug: "phori-s-preaching-and-royal-raids--the-hypocrisy-of-the-industry-s-biggest-egos";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"pixel-10-and-pixel-watch-4-discounts-return-to-google-store.md": {
	id: "pixel-10-and-pixel-watch-4-discounts-return-to-google-store.md";
  slug: "pixel-10-and-pixel-watch-4-discounts-return-to-google-store";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"pixel-11-leak--slimmer-bezels-and-black-camera-bar---more-of-the-same-predictable-iteration.md": {
	id: "pixel-11-leak--slimmer-bezels-and-black-camera-bar---more-of-the-same-predictable-iteration.md";
  slug: "pixel-11-leak--slimmer-bezels-and-black-camera-bar---more-of-the-same-predictable-iteration";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"pixel-11-leak-reveals-marginal-design-tweaks--predictable-camera-bar-evolution.md": {
	id: "pixel-11-leak-reveals-marginal-design-tweaks--predictable-camera-bar-evolution.md";
  slug: "pixel-11-leak-reveals-marginal-design-tweaks--predictable-camera-bar-evolution";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"poison-at-the-pump--kenya-s-fuel-marking-system-a-cancer-risk--millions-exposed.md": {
	id: "poison-at-the-pump--kenya-s-fuel-marking-system-a-cancer-risk--millions-exposed.md";
  slug: "poison-at-the-pump--kenya-s-fuel-marking-system-a-cancer-risk--millions-exposed";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"policare-pr--new-police-manuals-wont-fix-the-internets-ugly-heart.md": {
	id: "policare-pr--new-police-manuals-wont-fix-the-internets-ugly-heart.md";
  slug: "policare-pr--new-police-manuals-wont-fix-the-internets-ugly-heart";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"police-brutality--compensation-team-warns-of-fraudulent-claims.md": {
	id: "police-brutality--compensation-team-warns-of-fraudulent-claims.md";
  slug: "police-brutality--compensation-team-warns-of-fraudulent-claims";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"police-fc-coach-explains-abud-omar-at-center-back---more-games--more-money--same-old-story.md": {
	id: "police-fc-coach-explains-abud-omar-at-center-back---more-games--more-money--same-old-story.md";
  slug: "police-fc-coach-explains-abud-omar-at-center-back---more-games--more-money--same-old-story";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"police-federation-fraud-arrests-expose-another-layer-of-institutional-decay.md": {
	id: "police-federation-fraud-arrests-expose-another-layer-of-institutional-decay.md";
  slug: "police-federation-fraud-arrests-expose-another-layer-of-institutional-decay";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"police-federation-men-arrested-for-fraud--exposing-internal-rot.md": {
	id: "police-federation-men-arrested-for-fraud--exposing-internal-rot.md";
  slug: "police-federation-men-arrested-for-fraud--exposing-internal-rot";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"police-free-energy-officials-fired-over-fuel-imports-as-odpp-remains-silent-on-charges---capitalfm-co-ke.md": {
	id: "police-free-energy-officials-fired-over-fuel-imports-as-odpp-remains-silent-on-charges---capitalfm-co-ke.md";
  slug: "police-free-energy-officials-fired-over-fuel-imports-as-odpp-remains-silent-on-charges---capitalfm-co-ke";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"police-gift-title-advantage-to-gor-after-clobbering-afc-leopards.md": {
	id: "police-gift-title-advantage-to-gor-after-clobbering-afc-leopards.md";
  slug: "police-gift-title-advantage-to-gor-after-clobbering-afc-leopards";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"police-hold-vehicles--new-bill-offers-motorists-a-glimmer-of-hope--but-don-t-hold-your-breath.md": {
	id: "police-hold-vehicles--new-bill-offers-motorists-a-glimmer-of-hope--but-don-t-hold-your-breath.md";
  slug: "police-hold-vehicles--new-bill-offers-motorists-a-glimmer-of-hope--but-don-t-hold-your-breath";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"police-hunting-nairobi-governor-sakaja--senate-summons-ignored.md": {
	id: "police-hunting-nairobi-governor-sakaja--senate-summons-ignored.md";
  slug: "police-hunting-nairobi-governor-sakaja--senate-summons-ignored";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"police-killings-2025--kenya-s-gender-breakdown-is-a-man-s-problem.md": {
	id: "police-killings-2025--kenya-s-gender-breakdown-is-a-man-s-problem.md";
  slug: "police-killings-2025--kenya-s-gender-breakdown-is-a-man-s-problem";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"police-on-floods--49-dead--over-2-600-families-displaced-across-kenya---hiiraan-com.md": {
	id: "police-on-floods--49-dead--over-2-600-families-displaced-across-kenya---hiiraan-com.md";
  slug: "police-on-floods--49-dead--over-2-600-families-displaced-across-kenya---hiiraan-com";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"police-s-boring-win-over-shabana--tactics-or-just-luck.md": {
	id: "police-s-boring-win-over-shabana--tactics-or-just-luck.md";
  slug: "police-s-boring-win-over-shabana--tactics-or-just-luck";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"polishing-the-brass-on-a-sinking-continent--the-un-s-nigerian-delusion.md": {
	id: "polishing-the-brass-on-a-sinking-continent--the-un-s-nigerian-delusion.md";
  slug: "polishing-the-brass-on-a-sinking-continent--the-un-s-nigerian-delusion";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"political-instability-in-the-united-states-and-its-consequences-for-the-open-source-ecosystem.md": {
	id: "political-instability-in-the-united-states-and-its-consequences-for-the-open-source-ecosystem.md";
  slug: "political-instability-in-the-united-states-and-its-consequences-for-the-open-source-ecosystem";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"political-tensions-escalate-amidst-utah-redistricting-disputes-and-international-diplomatic-deadlines.md": {
	id: "political-tensions-escalate-amidst-utah-redistricting-disputes-and-international-diplomatic-deadlines.md";
  slug: "political-tensions-escalate-amidst-utah-redistricting-disputes-and-international-diplomatic-deadlines";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"politicians-play-pilot-s-pr-team-while-the-internet-keeps-receipts.md": {
	id: "politicians-play-pilot-s-pr-team-while-the-internet-keeps-receipts.md";
  slug: "politicians-play-pilot-s-pr-team-while-the-internet-keeps-receipts";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"politics-or-pr-stunt--sifuna-s-fanboy-moment-with-orengo-is-giving-major-nepo-baby-energy.md": {
	id: "politics-or-pr-stunt--sifuna-s-fanboy-moment-with-orengo-is-giving-major-nepo-baby-energy.md";
  slug: "politics-or-pr-stunt--sifuna-s-fanboy-moment-with-orengo-is-giving-major-nepo-baby-energy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"port-deals-and-pedophiles--the-sultan-s-dirty-laundry-finally-hits-the-fan.md": {
	id: "port-deals-and-pedophiles--the-sultan-s-dirty-laundry-finally-hits-the-fan.md";
  slug: "port-deals-and-pedophiles--the-sultan-s-dirty-laundry-finally-hits-the-fan";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"posh-classrooms-and-petty-crimes--the-international-school-scam.md": {
	id: "posh-classrooms-and-petty-crimes--the-international-school-scam.md";
  slug: "posh-classrooms-and-petty-crimes--the-international-school-scam";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"post-ruling-violent-protest-policing-must-change--or-what.md": {
	id: "post-ruling-violent-protest-policing-must-change--or-what.md";
  slug: "post-ruling-violent-protest-policing-must-change--or-what";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"post-ruling-violent-protest-policing-must-change.md": {
	id: "post-ruling-violent-protest-policing-must-change.md";
  slug: "post-ruling-violent-protest-policing-must-change";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"posta-rangers-vs-kenya-police--another-bet-to-lose.md": {
	id: "posta-rangers-vs-kenya-police--another-bet-to-lose.md";
  slug: "posta-rangers-vs-kenya-police--another-bet-to-lose";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"pr-scripts-and--team-soldiers---aiden-markram-s-masterclass-in-saying-absolutely-nothing.md": {
	id: "pr-scripts-and--team-soldiers---aiden-markram-s-masterclass-in-saying-absolutely-nothing.md";
  slug: "pr-scripts-and--team-soldiers---aiden-markram-s-masterclass-in-saying-absolutely-nothing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"prayers--pains--and-plastic-vibes--the-latest-music--healers.md": {
	id: "prayers--pains--and-plastic-vibes--the-latest-music--healers.md";
  slug: "prayers--pains--and-plastic-vibes--the-latest-music--healers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"precious-to-us---eric-omondi-serenades-lynne-njihia-on-her-birthday.md": {
	id: "precious-to-us---eric-omondi-serenades-lynne-njihia-on-her-birthday.md";
  slug: "precious-to-us---eric-omondi-serenades-lynne-njihia-on-her-birthday";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"predatory-patents-and-placebo-pills--the-ugly-truth-of-the-wegovy-lawsuit.md": {
	id: "predatory-patents-and-placebo-pills--the-ugly-truth-of-the-wegovy-lawsuit.md";
  slug: "predatory-patents-and-placebo-pills--the-ugly-truth-of-the-wegovy-lawsuit";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"premier-league-market-escalates-amid-milano-cortina-2026-winter-success.md": {
	id: "premier-league-market-escalates-amid-milano-cortina-2026-winter-success.md";
  slug: "premier-league-market-escalates-amid-milano-cortina-2026-winter-success";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"president-lee-jae-myung-s-thirst-for-tiktok-fame-is-the-ultimate-cringe-fest.md": {
	id: "president-lee-jae-myung-s-thirst-for-tiktok-fame-is-the-ultimate-cringe-fest.md";
  slug: "president-lee-jae-myung-s-thirst-for-tiktok-fame-is-the-ultimate-cringe-fest";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"president-ruto--govt-to-do-everything-possible-to-cushion-kenyans-from-oil-price-surge.md": {
	id: "president-ruto--govt-to-do-everything-possible-to-cushion-kenyans-from-oil-price-surge.md";
  slug: "president-ruto--govt-to-do-everything-possible-to-cushion-kenyans-from-oil-price-surge";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"president-ruto--mt-kenya-friendship-built-over-years--not-shaken-by-gachagua-s-petty-politics.md": {
	id: "president-ruto--mt-kenya-friendship-built-over-years--not-shaken-by-gachagua-s-petty-politics.md";
  slug: "president-ruto--mt-kenya-friendship-built-over-years--not-shaken-by-gachagua-s-petty-politics";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"president-ruto--the--ceo--rewriting-kenya-s-development-financing-agenda.md": {
	id: "president-ruto--the--ceo--rewriting-kenya-s-development-financing-agenda.md";
  slug: "president-ruto--the--ceo--rewriting-kenya-s-development-financing-agenda";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"president-ruto--why-kenya-is-the-best-place-to-invest.md": {
	id: "president-ruto--why-kenya-is-the-best-place-to-invest.md";
  slug: "president-ruto--why-kenya-is-the-best-place-to-invest";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"president-ruto-signs-law-overhauling-kenya-s-coffee-sector.md": {
	id: "president-ruto-signs-law-overhauling-kenya-s-coffee-sector.md";
  slug: "president-ruto-signs-law-overhauling-kenya-s-coffee-sector";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"president-ruto-urges-diplomats-to-turn-kenya-s-potential-into-real-economic-gains.md": {
	id: "president-ruto-urges-diplomats-to-turn-kenya-s-potential-into-real-economic-gains.md";
  slug: "president-ruto-urges-diplomats-to-turn-kenya-s-potential-into-real-economic-gains";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"president-ruto-warns-no-mercy-for-oil-cartels-as-fuel-scandal-investigation-deepens.md": {
	id: "president-ruto-warns-no-mercy-for-oil-cartels-as-fuel-scandal-investigation-deepens.md";
  slug: "president-ruto-warns-no-mercy-for-oil-cartels-as-fuel-scandal-investigation-deepens";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"presidents--day-2026--curated-tech-deals-from-apple--anker--and-other-leading-brands.md": {
	id: "presidents--day-2026--curated-tech-deals-from-apple--anker--and-other-leading-brands.md";
  slug: "presidents--day-2026--curated-tech-deals-from-apple--anker--and-other-leading-brands";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"price-caps-and-panic--south-korea-braces-for-an-energy-induced-implosion.md": {
	id: "price-caps-and-panic--south-korea-braces-for-an-energy-induced-implosion.md";
  slug: "price-caps-and-panic--south-korea-braces-for-an-energy-induced-implosion";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"prince-harry-s-latest-feud-with-the-press-ends--for-now---revealing-only-predictable-greed-and-futility.md": {
	id: "prince-harry-s-latest-feud-with-the-press-ends--for-now---revealing-only-predictable-greed-and-futility.md";
  slug: "prince-harry-s-latest-feud-with-the-press-ends--for-now---revealing-only-predictable-greed-and-futility";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"prince-harry-s-latest-press-feud-fizzles--a-familiar-saga-of-entitlement-and-empty-threats.md": {
	id: "prince-harry-s-latest-press-feud-fizzles--a-familiar-saga-of-entitlement-and-empty-threats.md";
  slug: "prince-harry-s-latest-press-feud-fizzles--a-familiar-saga-of-entitlement-and-empty-threats";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"prison-time-for-banknote-mutilators--ex-tycoon-s-downfall-proves-scrutiny-bites.md": {
	id: "prison-time-for-banknote-mutilators--ex-tycoon-s-downfall-proves-scrutiny-bites.md";
  slug: "prison-time-for-banknote-mutilators--ex-tycoon-s-downfall-proves-scrutiny-bites";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"private-equity-s-multi-billion-dollar-ai-infrastructure-push-faces-growing-grassroots-friction.md": {
	id: "private-equity-s-multi-billion-dollar-ai-infrastructure-push-faces-growing-grassroots-friction.md";
  slug: "private-equity-s-multi-billion-dollar-ai-infrastructure-push-faces-growing-grassroots-friction";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"pro-iran-meme-machine-exploits-trump-with-ai-lego-cartoons.md": {
	id: "pro-iran-meme-machine-exploits-trump-with-ai-lego-cartoons.md";
  slug: "pro-iran-meme-machine-exploits-trump-with-ai-lego-cartoons";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"pro-iran-meme-machine-trolls-trump-with-ai-lego-cartoons--a-cynical-take-on-digital-warfare.md": {
	id: "pro-iran-meme-machine-trolls-trump-with-ai-lego-cartoons--a-cynical-take-on-digital-warfare.md";
  slug: "pro-iran-meme-machine-trolls-trump-with-ai-lego-cartoons--a-cynical-take-on-digital-warfare";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"profit-over-pulse--the-dystopian-reality-behind-the-pitt-s-medical-gadgetry.md": {
	id: "profit-over-pulse--the-dystopian-reality-behind-the-pitt-s-medical-gadgetry.md";
  slug: "profit-over-pulse--the-dystopian-reality-behind-the-pitt-s-medical-gadgetry";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"project-fame-or-project-ancient--kitay-is-still-selling-us-2016-vibes-in-2024.md": {
	id: "project-fame-or-project-ancient--kitay-is-still-selling-us-2016-vibes-in-2024.md";
  slug: "project-fame-or-project-ancient--kitay-is-still-selling-us-2016-vibes-in-2024";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"prophet-david-owuor-false-miracles-billion-shilling-fraud.md": {
	id: "prophet-david-owuor-false-miracles-billion-shilling-fraud.md";
  slug: "prophet-david-owuor-false-miracles-billion-shilling-fraud";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"prophets--profits--and-the-politics-of-the-pulpit--why-your-favorite-preacher-is-just-an-influencer-in-a-suit.md": {
	id: "prophets--profits--and-the-politics-of-the-pulpit--why-your-favorite-preacher-is-just-an-influencer-in-a-suit.md";
  slug: "prophets--profits--and-the-politics-of-the-pulpit--why-your-favorite-preacher-is-just-an-influencer-in-a-suit";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ps-stephen-isaboke-briefs-national-assembly-comittee-on-supplementary-budget.md": {
	id: "ps-stephen-isaboke-briefs-national-assembly-comittee-on-supplementary-budget.md";
  slug: "ps-stephen-isaboke-briefs-national-assembly-comittee-on-supplementary-budget";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"psychology-facts-about-human-nature.md": {
	id: "psychology-facts-about-human-nature.md";
  slug: "psychology-facts-about-human-nature";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"pwc-loses-one-of-its--finest-boys-in-finance.md": {
	id: "pwc-loses-one-of-its--finest-boys-in-finance.md";
  slug: "pwc-loses-one-of-its--finest-boys-in-finance";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"pwc-loses-pwc-employee-once-touted-as-one-of-finance-s--finest-boys.md": {
	id: "pwc-loses-pwc-employee-once-touted-as-one-of-finance-s--finest-boys.md";
  slug: "pwc-loses-pwc-employee-once-touted-as-one-of-finance-s--finest-boys";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"pwc-s--finest-boy-in-finance--demarre-johnson-exits-firm.md": {
	id: "pwc-s--finest-boy-in-finance--demarre-johnson-exits-firm.md";
  slug: "pwc-s--finest-boy-in-finance--demarre-johnson-exits-firm";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"qci-formalizes-ai-driven-operational-standards-for-global-gaming-sector-with-compendium-release.md": {
	id: "qci-formalizes-ai-driven-operational-standards-for-global-gaming-sector-with-compendium-release.md";
  slug: "qci-formalizes-ai-driven-operational-standards-for-global-gaming-sector-with-compendium-release";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"queen-tiwa-s-new--foundation---pure-altruism-or-just-another-pr-play.md": {
	id: "queen-tiwa-s-new--foundation---pure-altruism-or-just-another-pr-play.md";
  slug: "queen-tiwa-s-new--foundation---pure-altruism-or-just-another-pr-play";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"rachel-zegler-s-snow-white-drama--her--obvious--solution-is-hilarious.md": {
	id: "rachel-zegler-s-snow-white-drama--her--obvious--solution-is-hilarious.md";
  slug: "rachel-zegler-s-snow-white-drama--her--obvious--solution-is-hilarious";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"rachel-zoe-s-brand-rebuild--a-divorce-fueled-rebranding-effort-for-financial-survival.md": {
	id: "rachel-zoe-s-brand-rebuild--a-divorce-fueled-rebranding-effort-for-financial-survival.md";
  slug: "rachel-zoe-s-brand-rebuild--a-divorce-fueled-rebranding-effort-for-financial-survival";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"raila-odinga-s--love-story--with-arsenal--another-distraction-from-the-real-problems.md": {
	id: "raila-odinga-s--love-story--with-arsenal--another-distraction-from-the-real-problems.md";
  slug: "raila-odinga-s--love-story--with-arsenal--another-distraction-from-the-real-problems";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"raila-scarface-legend-comparison.md": {
	id: "raila-scarface-legend-comparison.md";
  slug: "raila-scarface-legend-comparison";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"raphael-tuju--police-scramble-after-foreign-minister-vanishes-amid-abduction-claims.md": {
	id: "raphael-tuju--police-scramble-after-foreign-minister-vanishes-amid-abduction-claims.md";
  slug: "raphael-tuju--police-scramble-after-foreign-minister-vanishes-amid-abduction-claims";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"real-madrid-s-pr-machine-churns-as-dean-huijsen-discovers-racism-isn-t-a--vibe.md": {
	id: "real-madrid-s-pr-machine-churns-as-dean-huijsen-discovers-racism-isn-t-a--vibe.md";
  slug: "real-madrid-s-pr-machine-churns-as-dean-huijsen-discovers-racism-isn-t-a--vibe";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"real-madrid-strengthens-title-position-following-strategic-victories.md": {
	id: "real-madrid-strengthens-title-position-following-strategic-victories.md";
  slug: "real-madrid-strengthens-title-position-following-strategic-victories";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"receipts--regrets--and-red-carpets--trevor-noah-s-satire-fails-the-epstein-test.md": {
	id: "receipts--regrets--and-red-carpets--trevor-noah-s-satire-fails-the-epstein-test.md";
  slug: "receipts--regrets--and-red-carpets--trevor-noah-s-satire-fails-the-epstein-test";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"receipts-or-retractions--the-messy-tech-drama-in-the-matlala-case.md": {
	id: "receipts-or-retractions--the-messy-tech-drama-in-the-matlala-case.md";
  slug: "receipts-or-retractions--the-messy-tech-drama-in-the-matlala-case";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"recycled--legends--and-desperate-paychecks--itv-reheats-the-south-african-leftovers.md": {
	id: "recycled--legends--and-desperate-paychecks--itv-reheats-the-south-african-leftovers.md";
  slug: "recycled--legends--and-desperate-paychecks--itv-reheats-the-south-african-leftovers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"recycled-reality--why-itv-is-dragging-us-back-to-south-africa-for-more-scripted-drama.md": {
	id: "recycled-reality--why-itv-is-dragging-us-back-to-south-africa-for-more-scripted-drama.md";
  slug: "recycled-reality--why-itv-is-dragging-us-back-to-south-africa-for-more-scripted-drama";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"recycled-scandals-and-pocket-change-bail--the-judicial-joke-continues.md": {
	id: "recycled-scandals-and-pocket-change-bail--the-judicial-joke-continues.md";
  slug: "recycled-scandals-and-pocket-change-bail--the-judicial-joke-continues";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"red-bull-back2beyond--durban-gets-its-dose-of-musical-mayhem--again.md": {
	id: "red-bull-back2beyond--durban-gets-its-dose-of-musical-mayhem--again.md";
  slug: "red-bull-back2beyond--durban-gets-its-dose-of-musical-mayhem--again";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"red-cards-and-razzle-dazzle--why-your-favorite--hustlers--are-actually-just-common-thieves.md": {
	id: "red-cards-and-razzle-dazzle--why-your-favorite--hustlers--are-actually-just-common-thieves.md";
  slug: "red-cards-and-razzle-dazzle--why-your-favorite--hustlers--are-actually-just-common-thieves";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"red-carpets-and-ruined-kiosks--the-great-diplomatic-masquerade.md": {
	id: "red-carpets-and-ruined-kiosks--the-great-diplomatic-masquerade.md";
  slug: "red-carpets-and-ruined-kiosks--the-great-diplomatic-masquerade";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"red-v-blue-school-wars---the-phantom-threat-exposing-the-chasm-between-panicked-parents-and-disconnected-youth.md": {
	id: "red-v-blue-school-wars---the-phantom-threat-exposing-the-chasm-between-panicked-parents-and-disconnected-youth.md";
  slug: "red-v-blue-school-wars---the-phantom-threat-exposing-the-chasm-between-panicked-parents-and-disconnected-youth";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"red-v-blue-school-wars--expose-parental-social-media-delusion--not-youth-rebellion.md": {
	id: "red-v-blue-school-wars--expose-parental-social-media-delusion--not-youth-rebellion.md";
  slug: "red-v-blue-school-wars--expose-parental-social-media-delusion--not-youth-rebellion";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"red-v-blue-school-wars--social-media-gap-fuels-parental-panic--exposing-generational-disconnect.md": {
	id: "red-v-blue-school-wars--social-media-gap-fuels-parental-panic--exposing-generational-disconnect.md";
  slug: "red-v-blue-school-wars--social-media-gap-fuels-parental-panic--exposing-generational-disconnect";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"reforms-needed-for-sh19-5-billion-pig-industry--don-t-hold-your-breath.md": {
	id: "reforms-needed-for-sh19-5-billion-pig-industry--don-t-hold-your-breath.md";
  slug: "reforms-needed-for-sh19-5-billion-pig-industry--don-t-hold-your-breath";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"religion--the-ultimate-get-out-of-jail-free-card-for-failed-politicians.md": {
	id: "religion--the-ultimate-get-out-of-jail-free-card-for-failed-politicians.md";
  slug: "religion--the-ultimate-get-out-of-jail-free-card-for-failed-politicians";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"remarkable-s-next-tablet--a--mass-market--ploy-built-on-compromise.md": {
	id: "remarkable-s-next-tablet--a--mass-market--ploy-built-on-compromise.md";
  slug: "remarkable-s-next-tablet--a--mass-market--ploy-built-on-compromise";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"remarkable-tablet-leak-promises--mass-market----prepare-for-compromises.md": {
	id: "remarkable-tablet-leak-promises--mass-market----prepare-for-compromises.md";
  slug: "remarkable-tablet-leak-promises--mass-market----prepare-for-compromises";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"remarkable-tablet-leak-suggests-another-attempt-to-trick-consumers-with-a--mass-market--e-paper-device.md": {
	id: "remarkable-tablet-leak-suggests-another-attempt-to-trick-consumers-with-a--mass-market--e-paper-device.md";
  slug: "remarkable-tablet-leak-suggests-another-attempt-to-trick-consumers-with-a--mass-market--e-paper-device";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"rent-a-sovereignty--how-the-imf-is-turning-kenya-into-a-private-subsidiary.md": {
	id: "rent-a-sovereignty--how-the-imf-is-turning-kenya-into-a-private-subsidiary.md";
  slug: "rent-a-sovereignty--how-the-imf-is-turning-kenya-into-a-private-subsidiary";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"report--catarina-macario-offered-contract-from-barcelona-but-others-are-still-interested.md": {
	id: "report--catarina-macario-offered-contract-from-barcelona-but-others-are-still-interested.md";
  slug: "report--catarina-macario-offered-contract-from-barcelona-but-others-are-still-interested";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"resilience-in-the-relegation-battle--burnley-secures-crucial-point-against-ten-man-chelsea.md": {
	id: "resilience-in-the-relegation-battle--burnley-secures-crucial-point-against-ten-man-chelsea.md";
  slug: "resilience-in-the-relegation-battle--burnley-secures-crucial-point-against-ten-man-chelsea";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"restore-britain-refunds-crypto-project-s-donations-amidst-suspicious-scrutiny.md": {
	id: "restore-britain-refunds-crypto-project-s-donations-amidst-suspicious-scrutiny.md";
  slug: "restore-britain-refunds-crypto-project-s-donations-amidst-suspicious-scrutiny";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"revealed--leaked-chats-expose-the-daily-life-of-a-scam-compound-s-enslaved-workforce.md": {
	id: "revealed--leaked-chats-expose-the-daily-life-of-a-scam-compound-s-enslaved-workforce.md";
  slug: "revealed--leaked-chats-expose-the-daily-life-of-a-scam-compound-s-enslaved-workforce";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"rich-men-shouting-in-suits--the-negreira-circus-is-just-a-power-trip.md": {
	id: "rich-men-shouting-in-suits--the-negreira-circus-is-just-a-power-trip.md";
  slug: "rich-men-shouting-in-suits--the-negreira-circus-is-just-a-power-trip";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"rich-suits-and--ubuntu--boots--the-high-stakes-hypocrisy-at-karen-country-club.md": {
	id: "rich-suits-and--ubuntu--boots--the-high-stakes-hypocrisy-at-karen-country-club.md";
  slug: "rich-suits-and--ubuntu--boots--the-high-stakes-hypocrisy-at-karen-country-club";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"riding-into-the-sunset--kristi-noem-s--220-million-vanity-project-ends-in-a-trump-sized-rejection.md": {
	id: "riding-into-the-sunset--kristi-noem-s--220-million-vanity-project-ends-in-a-trump-sized-rejection.md";
  slug: "riding-into-the-sunset--kristi-noem-s--220-million-vanity-project-ends-in-a-trump-sized-rejection";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"riggy-g-s-new-gospel--same-wolves--different-sheepskin.md": {
	id: "riggy-g-s-new-gospel--same-wolves--different-sheepskin.md";
  slug: "riggy-g-s-new-gospel--same-wolves--different-sheepskin";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"riggy-g-s-pharmacy-fail--when-your-chemist-is-just-a-quack-with-a-smartphone.md": {
	id: "riggy-g-s-pharmacy-fail--when-your-chemist-is-just-a-quack-with-a-smartphone.md";
  slug: "riggy-g-s-pharmacy-fail--when-your-chemist-is-just-a-quack-with-a-smartphone";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"rip-showmax--the-african-netflix-delusion-finally-collapses-under-its-own-hype.md": {
	id: "rip-showmax--the-african-netflix-delusion-finally-collapses-under-its-own-hype.md";
  slug: "rip-showmax--the-african-netflix-delusion-finally-collapses-under-its-own-hype";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"rita-ora-s-missing-ring--just-another-scene-in-the-never-ending-pr-play.md": {
	id: "rita-ora-s-missing-ring--just-another-scene-in-the-never-ending-pr-play.md";
  slug: "rita-ora-s-missing-ring--just-another-scene-in-the-never-ending-pr-play";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"rivian-adds-a-sport-mode-to-all-r1-evs-on-the-road.md": {
	id: "rivian-adds-a-sport-mode-to-all-r1-evs-on-the-road.md";
  slug: "rivian-adds-a-sport-mode-to-all-r1-evs-on-the-road";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"rivian-launches-new-apple-watch-application.md": {
	id: "rivian-launches-new-apple-watch-application.md";
  slug: "rivian-launches-new-apple-watch-application";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"roadside-chaos-and-digital-delusions--kenha-enters-the-chat.md": {
	id: "roadside-chaos-and-digital-delusions--kenha-enters-the-chat.md";
  slug: "roadside-chaos-and-digital-delusions--kenha-enters-the-chat";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"roadside-tyrants--why-the-kenyan-prado-is-a-rolling-symptom-of-our-national-decay.md": {
	id: "roadside-tyrants--why-the-kenyan-prado-is-a-rolling-symptom-of-our-national-decay.md";
  slug: "roadside-tyrants--why-the-kenyan-prado-is-a-rolling-symptom-of-our-national-decay";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"robots-in-the-studio--is-wits-university--saving--african-music-or-just-harvesting-data.md": {
	id: "robots-in-the-studio--is-wits-university--saving--african-music-or-just-harvesting-data.md";
  slug: "robots-in-the-studio--is-wits-university--saving--african-music-or-just-harvesting-data";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"rockstar-games-hacked--data-ransom-threat-looms-again-amidst-corporate-incompetence.md": {
	id: "rockstar-games-hacked--data-ransom-threat-looms-again-amidst-corporate-incompetence.md";
  slug: "rockstar-games-hacked--data-ransom-threat-looms-again-amidst-corporate-incompetence";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"rockstar-games-reportedly-hacked--group-demands-ransom-to-avoid-massive-data-leak.md": {
	id: "rockstar-games-reportedly-hacked--group-demands-ransom-to-avoid-massive-data-leak.md";
  slug: "rockstar-games-reportedly-hacked--group-demands-ransom-to-avoid-massive-data-leak";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ronney-onyango-s-career-glow-up-hits-a-brick-wall-of-irony-and-incompetence.md": {
	id: "ronney-onyango-s-career-glow-up-hits-a-brick-wall-of-irony-and-incompetence.md";
  slug: "ronney-onyango-s-career-glow-up-hits-a-brick-wall-of-irony-and-incompetence";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"roses-are-red--but-the-bruises-are-still-purple.md": {
	id: "roses-are-red--but-the-bruises-are-still-purple.md";
  slug: "roses-are-red--but-the-bruises-are-still-purple";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"rotavirus-roulette--the-ministry-s-plan-is-to-wash-your-hands-and-pray.md": {
	id: "rotavirus-roulette--the-ministry-s-plan-is-to-wash-your-hands-and-pray.md";
  slug: "rotavirus-roulette--the-ministry-s-plan-is-to-wash-your-hands-and-pray";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"royal-tea-and-the-same-old-lies--why-sophie-s-visit-changes-nothing-for-the-common-kenyan.md": {
	id: "royal-tea-and-the-same-old-lies--why-sophie-s-visit-changes-nothing-for-the-common-kenyan.md";
  slug: "royal-tea-and-the-same-old-lies--why-sophie-s-visit-changes-nothing-for-the-common-kenyan";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruai-is-the-new-human-warehouse-and-nobody-is-surprised.md": {
	id: "ruai-is-the-new-human-warehouse-and-nobody-is-surprised.md";
  slug: "ruai-is-the-new-human-warehouse-and-nobody-is-surprised";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruai-s-guesthouse-of-horrors--when-the-police-finally-find-the-basement.md": {
	id: "ruai-s-guesthouse-of-horrors--when-the-police-finally-find-the-basement.md";
  slug: "ruai-s-guesthouse-of-horrors--when-the-police-finally-find-the-basement";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruai-s-human-cargo--another-day-in-the-trafficking-hub-of-africa.md": {
	id: "ruai-s-human-cargo--another-day-in-the-trafficking-hub-of-africa.md";
  slug: "ruai-s-human-cargo--another-day-in-the-trafficking-hub-of-africa";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"rubio-signals-transatlantic--restoration--in-munich--seeking-institutional-reform-over-disruption.md": {
	id: "rubio-signals-transatlantic--restoration--in-munich--seeking-institutional-reform-over-disruption.md";
  slug: "rubio-signals-transatlantic--restoration--in-munich--seeking-institutional-reform-over-disruption";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"runda-is-just-a-fancy-name-for-a-crime-scene.md": {
	id: "runda-is-just-a-fancy-name-for-a-crime-scene.md";
  slug: "runda-is-just-a-fancy-name-for-a-crime-scene";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"russian-state-hackers-exploit-microsoft-office-vulnerability.md": {
	id: "russian-state-hackers-exploit-microsoft-office-vulnerability.md";
  slug: "russian-state-hackers-exploit-microsoft-office-vulnerability";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"rust-belt-relics-for-sale-to-the-highest-global-bidder.md": {
	id: "rust-belt-relics-for-sale-to-the-highest-global-bidder.md";
  slug: "rust-belt-relics-for-sale-to-the-highest-global-bidder";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto--activates--response-as-floods-hit-kenya---expect-more-drip--less-drop.md": {
	id: "ruto--activates--response-as-floods-hit-kenya---expect-more-drip--less-drop.md";
  slug: "ruto--activates--response-as-floods-hit-kenya---expect-more-drip--less-drop";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto--ends--northern-kenya-s-60-year-neglect-with-promises--again.md": {
	id: "ruto--ends--northern-kenya-s-60-year-neglect-with-promises--again.md";
  slug: "ruto--ends--northern-kenya-s-60-year-neglect-with-promises--again";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto--fuel-prices-in-kenya-reflect-its-middle-income-status.md": {
	id: "ruto--fuel-prices-in-kenya-reflect-its-middle-income-status.md";
  slug: "ruto--fuel-prices-in-kenya-reflect-its-middle-income-status";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto--itare-dam-issues-resolved--promises-renewed--scrutiny-remains.md": {
	id: "ruto--itare-dam-issues-resolved--promises-renewed--scrutiny-remains.md";
  slug: "ruto--itare-dam-issues-resolved--promises-renewed--scrutiny-remains";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto--pledges--nairobi-hospital-fix---expect-more-drama-than-delivery.md": {
	id: "ruto--pledges--nairobi-hospital-fix---expect-more-drama-than-delivery.md";
  slug: "ruto--pledges--nairobi-hospital-fix---expect-more-drama-than-delivery";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-2027-problem-electoral-backlash.md": {
	id: "ruto-2027-problem-electoral-backlash.md";
  slug: "ruto-2027-problem-electoral-backlash";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-admits-mt-kenya-headache--places-fate-in-god-s-hands.md": {
	id: "ruto-admits-mt-kenya-headache--places-fate-in-god-s-hands.md";
  slug: "ruto-admits-mt-kenya-headache--places-fate-in-god-s-hands";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-and-friends-ksh-2-trillion-theft-from-2022-to-2025.md": {
	id: "ruto-and-friends-ksh-2-trillion-theft-from-2022-to-2025.md";
  slug: "ruto-and-friends-ksh-2-trillion-theft-from-2022-to-2025";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-and-italy-s-president-mattarella-meet-in-rome---more-handshakes--same-old-promises.md": {
	id: "ruto-and-italy-s-president-mattarella-meet-in-rome---more-handshakes--same-old-promises.md";
  slug: "ruto-and-italy-s-president-mattarella-meet-in-rome---more-handshakes--same-old-promises";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-and-mbarire-s-nadco-report-jitters--gender-rule-ignored--again.md": {
	id: "ruto-and-mbarire-s-nadco-report-jitters--gender-rule-ignored--again.md";
  slug: "ruto-and-mbarire-s-nadco-report-jitters--gender-rule-ignored--again";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-appoints-justice-warsame-to-supreme-court-after--approval.md": {
	id: "ruto-appoints-justice-warsame-to-supreme-court-after--approval.md";
  slug: "ruto-appoints-justice-warsame-to-supreme-court-after--approval";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-asks-spy-chiefs-to-unravel-au-reform-deadlock--because-talking-to-bureaucrats-didn-t-work.md": {
	id: "ruto-asks-spy-chiefs-to-unravel-au-reform-deadlock--because-talking-to-bureaucrats-didn-t-work.md";
  slug: "ruto-asks-spy-chiefs-to-unravel-au-reform-deadlock--because-talking-to-bureaucrats-didn-t-work";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-assents-to-meteorology-bill--creating-yet-another-authority.md": {
	id: "ruto-assents-to-meteorology-bill--creating-yet-another-authority.md";
  slug: "ruto-assents-to-meteorology-bill--creating-yet-another-authority";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-blames-gachagua-for-kikuyu-chaos--opposition-cries--police-goon-alliance.md": {
	id: "ruto-blames-gachagua-for-kikuyu-chaos--opposition-cries--police-goon-alliance.md";
  slug: "ruto-blames-gachagua-for-kikuyu-chaos--opposition-cries--police-goon-alliance";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-bullish-no-one-can-threaten-him-in-2027-race---capitalfm-co-ke.md": {
	id: "ruto-bullish-no-one-can-threaten-him-in-2027-race---capitalfm-co-ke.md";
  slug: "ruto-bullish-no-one-can-threaten-him-in-2027-race---capitalfm-co-ke";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-carries-africa-s-voice-from-nairobi-to-g7---don-t-hold-your-breath.md": {
	id: "ruto-carries-africa-s-voice-from-nairobi-to-g7---don-t-hold-your-breath.md";
  slug: "ruto-carries-africa-s-voice-from-nairobi-to-g7---don-t-hold-your-breath";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-cedes-kenya-pipeline-control-to-uganda-s-museveni--standardmedia-co-ke-reports-shocking-deal.md": {
	id: "ruto-cedes-kenya-pipeline-control-to-uganda-s-museveni--standardmedia-co-ke-reports-shocking-deal.md";
  slug: "ruto-cedes-kenya-pipeline-control-to-uganda-s-museveni--standardmedia-co-ke-reports-shocking-deal";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-cheers-controversial--majembe--win--promises-boxing-revival.md": {
	id: "ruto-cheers-controversial--majembe--win--promises-boxing-revival.md";
  slug: "ruto-cheers-controversial--majembe--win--promises-boxing-revival";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-claims-kenya-beats-other-countries-on-fuel--while-we-still-see-shocks.md": {
	id: "ruto-claims-kenya-beats-other-countries-on-fuel--while-we-still-see-shocks.md";
  slug: "ruto-claims-kenya-beats-other-countries-on-fuel--while-we-still-see-shocks";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-cries--60-years-of-neglect--over-northern-kenya-development-woes.md": {
	id: "ruto-cries--60-years-of-neglect--over-northern-kenya-development-woes.md";
  slug: "ruto-cries--60-years-of-neglect--over-northern-kenya-development-woes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-explains-why-fuel-costs-more-in-kenya---because-we-re--middle-income---apparently.md": {
	id: "ruto-explains-why-fuel-costs-more-in-kenya---because-we-re--middle-income---apparently.md";
  slug: "ruto-explains-why-fuel-costs-more-in-kenya---because-we-re--middle-income---apparently";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-forms-panels-to-pick-ipoa--tsc--and-igrtc-bosses---more-chairs-to-warm.md": {
	id: "ruto-forms-panels-to-pick-ipoa--tsc--and-igrtc-bosses---more-chairs-to-warm.md";
  slug: "ruto-forms-panels-to-pick-ipoa--tsc--and-igrtc-bosses---more-chairs-to-warm";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-gen-z-problem-2027-election-won-on-the-feed.md": {
	id: "ruto-gen-z-problem-2027-election-won-on-the-feed.md";
  slug: "ruto-gen-z-problem-2027-election-won-on-the-feed";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-grants-wage-rise--falls-short-of-union-demands.md": {
	id: "ruto-grants-wage-rise--falls-short-of-union-demands.md";
  slug: "ruto-grants-wage-rise--falls-short-of-union-demands";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-hosts-us-lawmakers--kenya-chasing-deeper-trade-and-security-ties--again.md": {
	id: "ruto-hosts-us-lawmakers--kenya-chasing-deeper-trade-and-security-ties--again.md";
  slug: "ruto-hosts-us-lawmakers--kenya-chasing-deeper-trade-and-security-ties--again";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-in-five-day-nyanza-tour-with-goodies-to-plead-case-for-2027-pre-election-pact.md": {
	id: "ruto-in-five-day-nyanza-tour-with-goodies-to-plead-case-for-2027-pre-election-pact.md";
  slug: "ruto-in-five-day-nyanza-tour-with-goodies-to-plead-case-for-2027-pre-election-pact";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-in-rome--kenyans-abroad-told-to-ignore-social-media--hear-about--good-things--back-home.md": {
	id: "ruto-in-rome--kenyans-abroad-told-to-ignore-social-media--hear-about--good-things--back-home.md";
  slug: "ruto-in-rome--kenyans-abroad-told-to-ignore-social-media--hear-about--good-things--back-home";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-inspects-ciumbu-market-project-amidst-600-empty-promises-nationwide.md": {
	id: "ruto-inspects-ciumbu-market-project-amidst-600-empty-promises-nationwide.md";
  slug: "ruto-inspects-ciumbu-market-project-amidst-600-empty-promises-nationwide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-launches-sgr-extension-to-kisumu-and-malaba--another-elephant-in-the-room.md": {
	id: "ruto-launches-sgr-extension-to-kisumu-and-malaba--another-elephant-in-the-room.md";
  slug: "ruto-launches-sgr-extension-to-kisumu-and-malaba--another-elephant-in-the-room";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-leads-labour-day-festivities-in-vihiga--while-city-drowns-and-pockets-empty.md": {
	id: "ruto-leads-labour-day-festivities-in-vihiga--while-city-drowns-and-pockets-empty.md";
  slug: "ruto-leads-labour-day-festivities-in-vihiga--while-city-drowns-and-pockets-empty";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-leads-nation-in-mourning-ol-kalou-mp-kiaraho---another-one-bites-the-dust.md": {
	id: "ruto-leads-nation-in-mourning-ol-kalou-mp-kiaraho---another-one-bites-the-dust.md";
  slug: "ruto-leads-nation-in-mourning-ol-kalou-mp-kiaraho---another-one-bites-the-dust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-macron-summit--30-heads-of-state-flock-to-nairobi--france-africa-deals-keep-coming.md": {
	id: "ruto-macron-summit--30-heads-of-state-flock-to-nairobi--france-africa-deals-keep-coming.md";
  slug: "ruto-macron-summit--30-heads-of-state-flock-to-nairobi--france-africa-deals-keep-coming";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-meets-chinese-contractor-ahead-of-sgr-extension-launches---another-white-elephant-on-the-horizon.md": {
	id: "ruto-meets-chinese-contractor-ahead-of-sgr-extension-launches---another-white-elephant-on-the-horizon.md";
  slug: "ruto-meets-chinese-contractor-ahead-of-sgr-extension-launches---another-white-elephant-on-the-horizon";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-mocks-mt-kenya--cartels--over-2027-game-plan-while-posing-for-development-photos.md": {
	id: "ruto-mocks-mt-kenya--cartels--over-2027-game-plan-while-posing-for-development-photos.md";
  slug: "ruto-mocks-mt-kenya--cartels--over-2027-game-plan-while-posing-for-development-photos";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-names-national-infrastructure-fund-council-members--who-gets-the-pie.md": {
	id: "ruto-names-national-infrastructure-fund-council-members--who-gets-the-pie.md";
  slug: "ruto-names-national-infrastructure-fund-council-members--who-gets-the-pie";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-names-new-chancellors-for-pwani--kibabii-and-kabianga-universities.md": {
	id: "ruto-names-new-chancellors-for-pwani--kibabii-and-kabianga-universities.md";
  slug: "ruto-names-new-chancellors-for-pwani--kibabii-and-kabianga-universities";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-offers-empty-words-to-kamket-and-kassait-after-son-s-death.md": {
	id: "ruto-offers-empty-words-to-kamket-and-kassait-after-son-s-death.md";
  slug: "ruto-offers-empty-words-to-kamket-and-kassait-after-son-s-death";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-outlines-measures-to-shield-kenya-from-middle-east-crisis-shocks---the-star-co-ke.md": {
	id: "ruto-outlines-measures-to-shield-kenya-from-middle-east-crisis-shocks---the-star-co-ke.md";
  slug: "ruto-outlines-measures-to-shield-kenya-from-middle-east-crisis-shocks---the-star-co-ke";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-plays-global-main-character-while-iran-slides-into-the-mentions-with-a-reality-check.md": {
	id: "ruto-plays-global-main-character-while-iran-slides-into-the-mentions-with-a-reality-check.md";
  slug: "ruto-plays-global-main-character-while-iran-slides-into-the-mentions-with-a-reality-check";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-promises-nuclear-power-plant-for-siaya-in-2027---hope-or-more-hot-air.md": {
	id: "ruto-promises-nuclear-power-plant-for-siaya-in-2027---hope-or-more-hot-air.md";
  slug: "ruto-promises-nuclear-power-plant-for-siaya-in-2027---hope-or-more-hot-air";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-ready-to-account-for-all-commitments-to-kenyans--apparently.md": {
	id: "ruto-ready-to-account-for-all-commitments-to-kenyans--apparently.md";
  slug: "ruto-ready-to-account-for-all-commitments-to-kenyans--apparently";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-reaffirms--stronger--kenya-singapore-ties--more-handshakes-than-harvests.md": {
	id: "ruto-reaffirms--stronger--kenya-singapore-ties--more-handshakes-than-harvests.md";
  slug: "ruto-reaffirms--stronger--kenya-singapore-ties--more-handshakes-than-harvests";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-reveals-sector-that-will-produce-kenya-s-next-billionaires.md": {
	id: "ruto-reveals-sector-that-will-produce-kenya-s-next-billionaires.md";
  slug: "ruto-reveals-sector-that-will-produce-kenya-s-next-billionaires";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s--broad-based-pact---unity-promises-for-kisii-and-nyamira--but-don-t-hold-your-breath.md": {
	id: "ruto-s--broad-based-pact---unity-promises-for-kisii-and-nyamira--but-don-t-hold-your-breath.md";
  slug: "ruto-s--broad-based-pact---unity-promises-for-kisii-and-nyamira--but-don-t-hold-your-breath";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s--cartel-crackdown--speech--nairobi-mcas-get-the-bitter-pill.md": {
	id: "ruto-s--cartel-crackdown--speech--nairobi-mcas-get-the-bitter-pill.md";
  slug: "ruto-s--cartel-crackdown--speech--nairobi-mcas-get-the-bitter-pill";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s--fast--passport-promises--another-mirage-for-kenyans.md": {
	id: "ruto-s--fast--passport-promises--another-mirage-for-kenyans.md";
  slug: "ruto-s--fast--passport-promises--another-mirage-for-kenyans";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s--generosity---a-12--salary-hike-that-won-t-even-buy-you-a-decent-matatu-ride.md": {
	id: "ruto-s--generosity---a-12--salary-hike-that-won-t-even-buy-you-a-decent-matatu-ride.md";
  slug: "ruto-s--generosity---a-12--salary-hike-that-won-t-even-buy-you-a-decent-matatu-ride";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s--stable--economy--inflation-down--cartels-still-cashing-in.md": {
	id: "ruto-s--stable--economy--inflation-down--cartels-still-cashing-in.md";
  slug: "ruto-s--stable--economy--inflation-down--cartels-still-cashing-in";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s--whatever-it-takes--against-drugs--more-hot-air-than-concrete-plans.md": {
	id: "ruto-s--whatever-it-takes--against-drugs--more-hot-air-than-concrete-plans.md";
  slug: "ruto-s--whatever-it-takes--against-drugs--more-hot-air-than-concrete-plans";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-2026-payday--a-carrot-on-a-very-long-stick-for-kenya-prisons.md": {
	id: "ruto-s-2026-payday--a-carrot-on-a-very-long-stick-for-kenya-prisons.md";
  slug: "ruto-s-2026-payday--a-carrot-on-a-very-long-stick-for-kenya-prisons";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-21--advisers--get-a-stay-of-execution---for-now.md": {
	id: "ruto-s-21--advisers--get-a-stay-of-execution---for-now.md";
  slug: "ruto-s-21--advisers--get-a-stay-of-execution---for-now";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-affordable-housing-pitch--building-houses-to-save-farms--don-t-make-me-laugh.md": {
	id: "ruto-s-affordable-housing-pitch--building-houses-to-save-farms--don-t-make-me-laugh.md";
  slug: "ruto-s-affordable-housing-pitch--building-houses-to-save-farms--don-t-make-me-laugh";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-akorino-funding-pledge-under-scrutiny-as-gachagua-claims-sh100mn-cash-deal.md": {
	id: "ruto-s-akorino-funding-pledge-under-scrutiny-as-gachagua-claims-sh100mn-cash-deal.md";
  slug: "ruto-s-akorino-funding-pledge-under-scrutiny-as-gachagua-claims-sh100mn-cash-deal";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-boys-hunt-for-ways-to-cut-gachagua-down-to-size-in-mt-kenya.md": {
	id: "ruto-s-boys-hunt-for-ways-to-cut-gachagua-down-to-size-in-mt-kenya.md";
  slug: "ruto-s-boys-hunt-for-ways-to-cut-gachagua-down-to-size-in-mt-kenya";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-china-trade-deal--duty-free-access--but-for-whose-benefit.md": {
	id: "ruto-s-china-trade-deal--duty-free-access--but-for-whose-benefit.md";
  slug: "ruto-s-china-trade-deal--duty-free-access--but-for-whose-benefit";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-chopper-cash-gone--cop-s-job-hunt--a-classic-kenyan-comedy-of-errors.md": {
	id: "ruto-s-chopper-cash-gone--cop-s-job-hunt--a-classic-kenyan-comedy-of-errors.md";
  slug: "ruto-s-chopper-cash-gone--cop-s-job-hunt--a-classic-kenyan-comedy-of-errors";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-coastal-land-grab-ahead-of-election--because-why-not.md": {
	id: "ruto-s-coastal-land-grab-ahead-of-election--because-why-not.md";
  slug: "ruto-s-coastal-land-grab-ahead-of-election--because-why-not";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-development-promises--silencing-critics-with-roads-and-rhetoric.md": {
	id: "ruto-s-development-promises--silencing-critics-with-roads-and-rhetoric.md";
  slug: "ruto-s-development-promises--silencing-critics-with-roads-and-rhetoric";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-dodoma-speech--more-hot-air-for-tanzania-parliament.md": {
	id: "ruto-s-dodoma-speech--more-hot-air-for-tanzania-parliament.md";
  slug: "ruto-s-dodoma-speech--more-hot-air-for-tanzania-parliament";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-empty-rhetoric--africa-s-capital-needs-aren-t-being-met.md": {
	id: "ruto-s-empty-rhetoric--africa-s-capital-needs-aren-t-being-met.md";
  slug: "ruto-s-empty-rhetoric--africa-s-capital-needs-aren-t-being-met";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-fuel-price-pain--the--middle-income--lie-and-nairobi-s-empty-roads.md": {
	id: "ruto-s-fuel-price-pain--the--middle-income--lie-and-nairobi-s-empty-roads.md";
  slug: "ruto-s-fuel-price-pain--the--middle-income--lie-and-nairobi-s-empty-roads";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-fuel-shock-plan--a-cushion-or-just-hot-air.md": {
	id: "ruto-s-fuel-shock-plan--a-cushion-or-just-hot-air.md";
  slug: "ruto-s-fuel-shock-plan--a-cushion-or-just-hot-air";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-grand-10-point-plan-hits-the-wall-of-gender-inequality.md": {
	id: "ruto-s-grand-10-point-plan-hits-the-wall-of-gender-inequality.md";
  slug: "ruto-s-grand-10-point-plan-hits-the-wall-of-gender-inequality";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-mau-mau-road--60--done--ksh-2-billion-more-for-another-two-years.md": {
	id: "ruto-s-mau-mau-road--60--done--ksh-2-billion-more-for-another-two-years.md";
  slug: "ruto-s-mau-mau-road--60--done--ksh-2-billion-more-for-another-two-years";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-meltdown-over-weight-reveals-kenya-s-2027-election-fever.md": {
	id: "ruto-s-meltdown-over-weight-reveals-kenya-s-2027-election-fever.md";
  slug: "ruto-s-meltdown-over-weight-reveals-kenya-s-2027-election-fever";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-ministry-shuffle--a-sh13-5-billion-disaster-for-public-service-elites.md": {
	id: "ruto-s-ministry-shuffle--a-sh13-5-billion-disaster-for-public-service-elites.md";
  slug: "ruto-s-ministry-shuffle--a-sh13-5-billion-disaster-for-public-service-elites";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-nairobi--different-by-december---roads--lights--garbage-trucks---and-your-doubts.md": {
	id: "ruto-s-nairobi--different-by-december---roads--lights--garbage-trucks---and-your-doubts.md";
  slug: "ruto-s-nairobi--different-by-december---roads--lights--garbage-trucks---and-your-doubts";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-new-land-commission--six-years-of-the-same-old-story.md": {
	id: "ruto-s-new-land-commission--six-years-of-the-same-old-story.md";
  slug: "ruto-s-new-land-commission--six-years-of-the-same-old-story";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-personal-confession-on-film-career--a-mistake-acknowledged--but-what-about-the-industry-s-woes.md": {
	id: "ruto-s-personal-confession-on-film-career--a-mistake-acknowledged--but-what-about-the-industry-s-woes.md";
  slug: "ruto-s-personal-confession-on-film-career--a-mistake-acknowledged--but-what-about-the-industry-s-woes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-sh3-1-billion-foreign-trips--from-nairobi-to-a-global-money-pit.md": {
	id: "ruto-s-sh3-1-billion-foreign-trips--from-nairobi-to-a-global-money-pit.md";
  slug: "ruto-s-sh3-1-billion-foreign-trips--from-nairobi-to-a-global-money-pit";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-sh500-billion-sgr-gamble---another-train-to-nowhere.md": {
	id: "ruto-s-sh500-billion-sgr-gamble---another-train-to-nowhere.md";
  slug: "ruto-s-sh500-billion-sgr-gamble---another-train-to-nowhere";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-silence-on-passport-scandal--darling--we-expected-better-than-this.md": {
	id: "ruto-s-silence-on-passport-scandal--darling--we-expected-better-than-this.md";
  slug: "ruto-s-silence-on-passport-scandal--darling--we-expected-better-than-this";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-tanzania-jaunt--another-pr-stunt-to-mend-broken-trade-chains.md": {
	id: "ruto-s-tanzania-jaunt--another-pr-stunt-to-mend-broken-trade-chains.md";
  slug: "ruto-s-tanzania-jaunt--another-pr-stunt-to-mend-broken-trade-chains";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-tanzania-trip--more-empty-promises-about-unity--less-about-real-solutions.md": {
	id: "ruto-s-tanzania-trip--more-empty-promises-about-unity--less-about-real-solutions.md";
  slug: "ruto-s-tanzania-trip--more-empty-promises-about-unity--less-about-real-solutions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-tax-breaks--kenya-targets-deals--but-don-t-hold-your-breath.md": {
	id: "ruto-s-tax-breaks--kenya-targets-deals--but-don-t-hold-your-breath.md";
  slug: "ruto-s-tax-breaks--kenya-targets-deals--but-don-t-hold-your-breath";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-tribalism-ban--another-day--another-empty-promise-for-kenya.md": {
	id: "ruto-s-tribalism-ban--another-day--another-empty-promise-for-kenya.md";
  slug: "ruto-s-tribalism-ban--another-day--another-empty-promise-for-kenya";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-wage-raise--low-paid-workers-get-a-paltry-sh4-360-extra--if-you-re-lucky.md": {
	id: "ruto-s-wage-raise--low-paid-workers-get-a-paltry-sh4-360-extra--if-you-re-lucky.md";
  slug: "ruto-s-wage-raise--low-paid-workers-get-a-paltry-sh4-360-extra--if-you-re-lucky";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-western-kenya-gamble--mountains-of-promises--molehills-of-progress.md": {
	id: "ruto-s-western-kenya-gamble--mountains-of-promises--molehills-of-progress.md";
  slug: "ruto-s-western-kenya-gamble--mountains-of-promises--molehills-of-progress";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-western-tour--new-lights-for-old-promises.md": {
	id: "ruto-s-western-tour--new-lights-for-old-promises.md";
  slug: "ruto-s-western-tour--new-lights-for-old-promises";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-s-yellow-wave--a-new-script-for-the-same-old-play.md": {
	id: "ruto-s-yellow-wave--a-new-script-for-the-same-old-play.md";
  slug: "ruto-s-yellow-wave--a-new-script-for-the-same-old-play";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-says-kenya-s-economy-stable-despite-hints-of-cartel-chaos.md": {
	id: "ruto-says-kenya-s-economy-stable-despite-hints-of-cartel-chaos.md";
  slug: "ruto-says-kenya-s-economy-stable-despite-hints-of-cartel-chaos";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-scraps-government-safari-rally-funding-post-2026-wrc--expects-others-to-foot-bill.md": {
	id: "ruto-scraps-government-safari-rally-funding-post-2026-wrc--expects-others-to-foot-bill.md";
  slug: "ruto-scraps-government-safari-rally-funding-post-2026-wrc--expects-others-to-foot-bill";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-sh5-5-billion-railway-revival-for-voi-taveta--more-hot-air-for-regional-trade.md": {
	id: "ruto-sh5-5-billion-railway-revival-for-voi-taveta--more-hot-air-for-regional-trade.md";
  slug: "ruto-sh5-5-billion-railway-revival-for-voi-taveta--more-hot-air-for-regional-trade";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-signs-coffee-act--new-board--same-old-squeeze.md": {
	id: "ruto-signs-coffee-act--new-board--same-old-squeeze.md";
  slug: "ruto-signs-coffee-act--new-board--same-old-squeeze";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-storms-matiang-i-turf-in-gusii-land--four-day-tour-is-a-political-acid-test.md": {
	id: "ruto-storms-matiang-i-turf-in-gusii-land--four-day-tour-is-a-political-acid-test.md";
  slug: "ruto-storms-matiang-i-turf-in-gusii-land--four-day-tour-is-a-political-acid-test";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-swears-in-37-judges--another-day--another-shambles.md": {
	id: "ruto-swears-in-37-judges--another-day--another-shambles.md";
  slug: "ruto-swears-in-37-judges--another-day--another-shambles";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-tasks-diplomats--sell-kenya-as-investment-hub-and-global-partner--but-don-t-forget-the-home-truths.md": {
	id: "ruto-tasks-diplomats--sell-kenya-as-investment-hub-and-global-partner--but-don-t-forget-the-home-truths.md";
  slug: "ruto-tasks-diplomats--sell-kenya-as-investment-hub-and-global-partner--but-don-t-forget-the-home-truths";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-tells-coast-leaders--unite-or-state-power-and--fire--go.md": {
	id: "ruto-tells-coast-leaders--unite-or-state-power-and--fire--go.md";
  slug: "ruto-tells-coast-leaders--unite-or-state-power-and--fire--go";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-to-ambassadors--sell-kenya--new-sh5trn--singapore--plan-abroad.md": {
	id: "ruto-to-ambassadors--sell-kenya--new-sh5trn--singapore--plan-abroad.md";
  slug: "ruto-to-ambassadors--sell-kenya--new-sh5trn--singapore--plan-abroad";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-to-gachagua--you-do-not-carry-mt-kenya-votes-in-your-pocket.md": {
	id: "ruto-to-gachagua--you-do-not-carry-mt-kenya-votes-in-your-pocket.md";
  slug: "ruto-to-gachagua--you-do-not-carry-mt-kenya-votes-in-your-pocket";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-urges-compassion-and-unity-in-eid-message.md": {
	id: "ruto-urges-compassion-and-unity-in-eid-message.md";
  slug: "ruto-urges-compassion-and-unity-in-eid-message";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-versus-gachagua--kenya-s-2027-fight---who-will-be-the-last-man-standing.md": {
	id: "ruto-versus-gachagua--kenya-s-2027-fight---who-will-be-the-last-man-standing.md";
  slug: "ruto-versus-gachagua--kenya-s-2027-fight---who-will-be-the-last-man-standing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-wants-envoys-to-tout-kenya-abroad--as-if-anyone-s-buying.md": {
	id: "ruto-wants-envoys-to-tout-kenya-abroad--as-if-anyone-s-buying.md";
  slug: "ruto-wants-envoys-to-tout-kenya-abroad--as-if-anyone-s-buying";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ruto-welcomes-new-ambassadors--urges-stronger-ties---because-we-need-more-handouts.md": {
	id: "ruto-welcomes-new-ambassadors--urges-stronger-ties---because-we-need-more-handouts.md";
  slug: "ruto-welcomes-new-ambassadors--urges-stronger-ties---because-we-need-more-handouts";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sacco-dreams-or-shylock-nightmares--the-great-east-african-savings-heist.md": {
	id: "sacco-dreams-or-shylock-nightmares--the-great-east-african-savings-heist.md";
  slug: "sacco-dreams-or-shylock-nightmares--the-great-east-african-savings-heist";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"saccos-ripe-for-overhaul--experts-see-messy-legal-and-regulatory-shakeup-ahead.md": {
	id: "saccos-ripe-for-overhaul--experts-see-messy-legal-and-regulatory-shakeup-ahead.md";
  slug: "saccos-ripe-for-overhaul--experts-see-messy-legal-and-regulatory-shakeup-ahead";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sacrifice-at-the-louvre--a-director-resigns-to-mask-institutional-rot.md": {
	id: "sacrifice-at-the-louvre--a-director-resigns-to-mask-institutional-rot.md";
  slug: "sacrifice-at-the-louvre--a-director-resigns-to-mask-institutional-rot";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sacrificial-scion--the-monarchy-s-calculated-disposal-of-the-mountbatten-windsor-asset.md": {
	id: "sacrificial-scion--the-monarchy-s-calculated-disposal-of-the-mountbatten-windsor-asset.md";
  slug: "sacrificial-scion--the-monarchy-s-calculated-disposal-of-the-mountbatten-windsor-asset";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"safaricom-caught-in-4k--the-snitch-era-is-officially-upon-us.md": {
	id: "safaricom-caught-in-4k--the-snitch-era-is-officially-upon-us.md";
  slug: "safaricom-caught-in-4k--the-snitch-era-is-officially-upon-us";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"safety-of-money-market-funds.md": {
	id: "safety-of-money-market-funds.md";
  slug: "safety-of-money-market-funds";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sakaja-s-nairobi-lands-shuffle--another-day--another-drama.md": {
	id: "sakaja-s-nairobi-lands-shuffle--another-day--another-drama.md";
  slug: "sakaja-s-nairobi-lands-shuffle--another-day--another-drama";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"saltwater-magic-and-the-great-kenyan-fire-sale.md": {
	id: "saltwater-magic-and-the-great-kenyan-fire-sale.md";
  slug: "saltwater-magic-and-the-great-kenyan-fire-sale";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"same-faces--different-pulpit--the-2027-deception-begins.md": {
	id: "same-faces--different-pulpit--the-2027-deception-begins.md";
  slug: "same-faces--different-pulpit--the-2027-deception-begins";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"same-forest--same-monkeys--how-nick-mwendwa-and-friends--ate--chan-2018.md": {
	id: "same-forest--same-monkeys--how-nick-mwendwa-and-friends--ate--chan-2018.md";
  slug: "same-forest--same-monkeys--how-nick-mwendwa-and-friends--ate--chan-2018";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"same-old-song--ruto-s-border-gamble-is-a-disaster-in-waiting.md": {
	id: "same-old-song--ruto-s-border-gamble-is-a-disaster-in-waiting.md";
  slug: "same-old-song--ruto-s-border-gamble-is-a-disaster-in-waiting";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"same-old-wine--slightly-dustier-bottles--ruto-s-gazette-of-rewards.md": {
	id: "same-old-wine--slightly-dustier-bottles--ruto-s-gazette-of-rewards.md";
  slug: "same-old-wine--slightly-dustier-bottles--ruto-s-gazette-of-rewards";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"same-script--different-date--nairobi-s-annual-near-miss-with-disaster.md": {
	id: "same-script--different-date--nairobi-s-annual-near-miss-with-disaster.md";
  slug: "same-script--different-date--nairobi-s-annual-near-miss-with-disaster";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"same-script--different-year--kindiki-and-matiang-i-dust-off-the-ruaraka-file.md": {
	id: "same-script--different-year--kindiki-and-matiang-i-dust-off-the-ruaraka-file.md";
  slug: "same-script--different-year--kindiki-and-matiang-i-dust-off-the-ruaraka-file";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"samia-suluhu-matatu.md": {
	id: "samia-suluhu-matatu.md";
  slug: "samia-suluhu-matatu";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"samidoh-hints-at-political-hustle---called-to-serve--as-mp-in-2027.md": {
	id: "samidoh-hints-at-political-hustle---called-to-serve--as-mp-in-2027.md";
  slug: "samidoh-hints-at-political-hustle---called-to-serve--as-mp-in-2027";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"samro-s-2026-music-business-lab--teaching-artists-to-beg-for-their-own-royalties.md": {
	id: "samro-s-2026-music-business-lab--teaching-artists-to-beg-for-their-own-royalties.md";
  slug: "samro-s-2026-music-business-lab--teaching-artists-to-beg-for-their-own-royalties";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"samsung-abandons-trifold--predictable-retreat-from-costly-tech-experiment.md": {
	id: "samsung-abandons-trifold--predictable-retreat-from-costly-tech-experiment.md";
  slug: "samsung-abandons-trifold--predictable-retreat-from-costly-tech-experiment";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"samsung-abandons-z-trifold--the-predictable-end-of-another-expensive-gimmick.md": {
	id: "samsung-abandons-z-trifold--the-predictable-end-of-another-expensive-gimmick.md";
  slug: "samsung-abandons-z-trifold--the-predictable-end-of-another-expensive-gimmick";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"samsung-galaxy-s26-ultra-battery-specifications-leaked.md": {
	id: "samsung-galaxy-s26-ultra-battery-specifications-leaked.md";
  slug: "samsung-galaxy-s26-ultra-battery-specifications-leaked";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"samsung-s-ai--experience--exposed--the-secret-cost-of-your-privacy-in-kanairo.md": {
	id: "samsung-s-ai--experience--exposed--the-secret-cost-of-your-privacy-in-kanairo.md";
  slug: "samsung-s-ai--experience--exposed--the-secret-cost-of-your-privacy-in-kanairo";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"samsung-s-galaxy-glasses--more-echo-than-innovation--copying-meta-s-blueprint.md": {
	id: "samsung-s-galaxy-glasses--more-echo-than-innovation--copying-meta-s-blueprint.md";
  slug: "samsung-s-galaxy-glasses--more-echo-than-innovation--copying-meta-s-blueprint";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"san-diego-s-expensive-descent-into-irrelevance.md": {
	id: "san-diego-s-expensive-descent-into-irrelevance.md";
  slug: "san-diego-s-expensive-descent-into-irrelevance";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"san-diego-s-expensive-implosion--the-high-price-of-chasing-ghosts.md": {
	id: "san-diego-s-expensive-implosion--the-high-price-of-chasing-ghosts.md";
  slug: "san-diego-s-expensive-implosion--the-high-price-of-chasing-ghosts";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"san-siro-meltdown--udinese-smashes-weak-milan-into-oblivion.md": {
	id: "san-siro-meltdown--udinese-smashes-weak-milan-into-oblivion.md";
  slug: "san-siro-meltdown--udinese-smashes-weak-milan-into-oblivion";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sandpaper--secrets--and-shamelessness--australia-s-messiest-boys-return-to-south-africa.md": {
	id: "sandpaper--secrets--and-shamelessness--australia-s-messiest-boys-return-to-south-africa.md";
  slug: "sandpaper--secrets--and-shamelessness--australia-s-messiest-boys-return-to-south-africa";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sandpaper--sins--and-selective-memory--australia-s-cricket--gentlemen--return-to-the-scene-of-the-crime.md": {
	id: "sandpaper--sins--and-selective-memory--australia-s-cricket--gentlemen--return-to-the-scene-of-the-crime.md";
  slug: "sandpaper--sins--and-selective-memory--australia-s-cricket--gentlemen--return-to-the-scene-of-the-crime";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sandpaper-and-sad-excuses--australia-toxically-reunites-with-south-africa.md": {
	id: "sandpaper-and-sad-excuses--australia-toxically-reunites-with-south-africa.md";
  slug: "sandpaper-and-sad-excuses--australia-toxically-reunites-with-south-africa";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sarz-s-humbling-us-moment--is-the-afrobeats-icon-finally-admitting-he-was-just-a-big-fish-in-a-small-pond.md": {
	id: "sarz-s-humbling-us-moment--is-the-afrobeats-icon-finally-admitting-he-was-just-a-big-fish-in-a-small-pond.md";
  slug: "sarz-s-humbling-us-moment--is-the-afrobeats-icon-finally-admitting-he-was-just-a-big-fish-in-a-small-pond";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sasini-avocado-processing-plant-sale-signals-nairobi-strategy-chaos.md": {
	id: "sasini-avocado-processing-plant-sale-signals-nairobi-strategy-chaos.md";
  slug: "sasini-avocado-processing-plant-sale-signals-nairobi-strategy-chaos";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sasini-sells-kiambu-estate-for-sh7-9bn-as-nse-stocks-rise.md": {
	id: "sasini-sells-kiambu-estate-for-sh7-9bn-as-nse-stocks-rise.md";
  slug: "sasini-sells-kiambu-estate-for-sh7-9bn-as-nse-stocks-rise";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"saudi-capital-and-tko-dismantle-boxing-to-build-a-corporate-monopoly.md": {
	id: "saudi-capital-and-tko-dismantle-boxing-to-build-a-corporate-monopoly.md";
  slug: "saudi-capital-and-tko-dismantle-boxing-to-build-a-corporate-monopoly";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"savage-level-or-just-savage-marketing.md": {
	id: "savage-level-or-just-savage-marketing.md";
  slug: "savage-level-or-just-savage-marketing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"scholarship-won-t-fix-the-potholes--the-great-public-finance-myth.md": {
	id: "scholarship-won-t-fix-the-potholes--the-great-public-finance-myth.md";
  slug: "scholarship-won-t-fix-the-potholes--the-great-public-finance-myth";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"scientists-exploring-bat-vaccination-to-curb-deadly-human-outbreaks.md": {
	id: "scientists-exploring-bat-vaccination-to-curb-deadly-human-outbreaks.md";
  slug: "scientists-exploring-bat-vaccination-to-curb-deadly-human-outbreaks";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"scientists-finally-solve-mystery-of--golden-orb--found-on-alaskan-seafloor---after-years-of-futile-effort.md": {
	id: "scientists-finally-solve-mystery-of--golden-orb--found-on-alaskan-seafloor---after-years-of-futile-effort.md";
  slug: "scientists-finally-solve-mystery-of--golden-orb--found-on-alaskan-seafloor---after-years-of-futile-effort";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"seattle-convention-centre-depletes-158-million-reserves.md": {
	id: "seattle-convention-centre-depletes-158-million-reserves.md";
  slug: "seattle-convention-centre-depletes-158-million-reserves";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"second-contingent-of-kenya-police-return-home-as-haiti-mission-ends.md": {
	id: "second-contingent-of-kenya-police-return-home-as-haiti-mission-ends.md";
  slug: "second-contingent-of-kenya-police-return-home-as-haiti-mission-ends";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"secret-ai-meeting-reveals-political-resistance-s-futile-grandstanding.md": {
	id: "secret-ai-meeting-reveals-political-resistance-s-futile-grandstanding.md";
  slug: "secret-ai-meeting-reveals-political-resistance-s-futile-grandstanding";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"secret-wars--is-just-another-cash-grab-masking-marvel-s-multiverse-malaise.md": {
	id: "secret-wars--is-just-another-cash-grab-masking-marvel-s-multiverse-malaise.md";
  slug: "secret-wars--is-just-another-cash-grab-masking-marvel-s-multiverse-malaise";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"selling-our-secrets-for-a-ten-percent-surcharge.md": {
	id: "selling-our-secrets-for-a-ten-percent-surcharge.md";
  slug: "selling-our-secrets-for-a-ten-percent-surcharge";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"selling-the-family-silver--ruto-s-5-trillion-shilling-pawn-shop.md": {
	id: "selling-the-family-silver--ruto-s-5-trillion-shilling-pawn-shop.md";
  slug: "selling-the-family-silver--ruto-s-5-trillion-shilling-pawn-shop";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"selling-the-family-silver-to-fix-a-leaking-roof.md": {
	id: "selling-the-family-silver-to-fix-a-leaking-roof.md";
  slug: "selling-the-family-silver-to-fix-a-leaking-roof";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"selling-the-green-giant-for-spare-change.md": {
	id: "selling-the-green-giant-for-spare-change.md";
  slug: "selling-the-green-giant-for-spare-change";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"selling-the-kitchen-to-buy-a-meal--the-kpc-fire-sale.md": {
	id: "selling-the-kitchen-to-buy-a-meal--the-kpc-fire-sale.md";
  slug: "selling-the-kitchen-to-buy-a-meal--the-kpc-fire-sale";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"selling-the-pipe-for-a-trillion-shilling-pipe-dream.md": {
	id: "selling-the-pipe-for-a-trillion-shilling-pipe-dream.md";
  slug: "selling-the-pipe-for-a-trillion-shilling-pipe-dream";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"selling-wi-fi-dreams-to-a-hungry-generation.md": {
	id: "selling-wi-fi-dreams-to-a-hungry-generation.md";
  slug: "selling-wi-fi-dreams-to-a-hungry-generation";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"selling-your-soul-for-a-russian-passport-and-a-shallow-grave.md": {
	id: "selling-your-soul-for-a-russian-passport-and-a-shallow-grave.md";
  slug: "selling-your-soul-for-a-russian-passport-and-a-shallow-grave";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"senate-health-committee-flags-congestion-and-staffing-gaps-in-rift-valley-counties.md": {
	id: "senate-health-committee-flags-congestion-and-staffing-gaps-in-rift-valley-counties.md";
  slug: "senate-health-committee-flags-congestion-and-staffing-gaps-in-rift-valley-counties";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"senate-probes-sh9-4-billion-ecitizen-rip-off--summons-big-fish.md": {
	id: "senate-probes-sh9-4-billion-ecitizen-rip-off--summons-big-fish.md";
  slug: "senate-probes-sh9-4-billion-ecitizen-rip-off--summons-big-fish";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"senator-jon-ossoff-faces-criticism-over-campaign-event-id-requirements-amid-opposition-to-voter-id-legislation.md": {
	id: "senator-jon-ossoff-faces-criticism-over-campaign-event-id-requirements-amid-opposition-to-voter-id-legislation.md";
  slug: "senator-jon-ossoff-faces-criticism-over-campaign-event-id-requirements-amid-opposition-to-voter-id-legislation";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"senator-threatens-standard-over-harambee-house-scam-claims.md": {
	id: "senator-threatens-standard-over-harambee-house-scam-claims.md";
  slug: "senator-threatens-standard-over-harambee-house-scam-claims";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"senior-police-officer-found-dead-inside-locked-vehicle-in-nyamira---another-one-bites-the-dust.md": {
	id: "senior-police-officer-found-dead-inside-locked-vehicle-in-nyamira---another-one-bites-the-dust.md";
  slug: "senior-police-officer-found-dead-inside-locked-vehicle-in-nyamira---another-one-bites-the-dust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sensex-down-230-pts--nifty-loses-100-pts-in-early-trade-as-markets-open-on-cautious-note-amid-us-iran-tensions.md": {
	id: "sensex-down-230-pts--nifty-loses-100-pts-in-early-trade-as-markets-open-on-cautious-note-amid-us-iran-tensions.md";
  slug: "sensex-down-230-pts--nifty-loses-100-pts-in-early-trade-as-markets-open-on-cautious-note-amid-us-iran-tensions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"seoul-panic--price-caps-and-empty-promises-in-the-shadow-of-the-strait.md": {
	id: "seoul-panic--price-caps-and-empty-promises-in-the-shadow-of-the-strait.md";
  slug: "seoul-panic--price-caps-and-empty-promises-in-the-shadow-of-the-strait";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"seoul-revives-soviet-style-controls-as-middle-east-fires-burn-global-trade.md": {
	id: "seoul-revives-soviet-style-controls-as-middle-east-fires-burn-global-trade.md";
  slug: "seoul-revives-soviet-style-controls-as-middle-east-fires-burn-global-trade";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"seoul-s-desperate-price-caps-signal-the-end-of-the-energy-illusion.md": {
	id: "seoul-s-desperate-price-caps-signal-the-end-of-the-energy-illusion.md";
  slug: "seoul-s-desperate-price-caps-signal-the-end-of-the-energy-illusion";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"seoul-s-desperate-price-fix-signals-the-end-of-the-free-market-charade.md": {
	id: "seoul-s-desperate-price-fix-signals-the-end-of-the-free-market-charade.md";
  slug: "seoul-s-desperate-price-fix-signals-the-end-of-the-free-market-charade";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"seoul-s-price-cap-gambit--desperation-in-the-shadow-of-global-collapse.md": {
	id: "seoul-s-price-cap-gambit--desperation-in-the-shadow-of-global-collapse.md";
  slug: "seoul-s-price-cap-gambit--desperation-in-the-shadow-of-global-collapse";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"seoul-s-price-cap-gambit-signals-the-death-of-market-logic.md": {
	id: "seoul-s-price-cap-gambit-signals-the-death-of-market-logic.md";
  slug: "seoul-s-price-cap-gambit-signals-the-death-of-market-logic";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"seoul-s-price-caps-are-a-band-aid-on-a-severed-global-artery.md": {
	id: "seoul-s-price-caps-are-a-band-aid-on-a-severed-global-artery.md";
  slug: "seoul-s-price-caps-are-a-band-aid-on-a-severed-global-artery";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"set-books--nairobi-s-new-weekend-hangout--don-t-hold-your-breath.md": {
	id: "set-books--nairobi-s-new-weekend-hangout--don-t-hold-your-breath.md";
  slug: "set-books--nairobi-s-new-weekend-hangout--don-t-hold-your-breath";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sewing-hope-while-the-city-burns.md": {
	id: "sewing-hope-while-the-city-burns.md";
  slug: "sewing-hope-while-the-city-burns";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sex-power-videos-and-baltasar-ebang-engonga.md": {
	id: "sex-power-videos-and-baltasar-ebang-engonga.md";
  slug: "sex-power-videos-and-baltasar-ebang-engonga";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sgr-travel-hacks-and-the-audacity-of-clout--why-kenyans-love-a-good-scam.md": {
	id: "sgr-travel-hacks-and-the-audacity-of-clout--why-kenyans-love-a-good-scam.md";
  slug: "sgr-travel-hacks-and-the-audacity-of-clout--why-kenyans-love-a-good-scam";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sh12bn-bad-fuel-scandal-gets-another-nairobi-twist.md": {
	id: "sh12bn-bad-fuel-scandal-gets-another-nairobi-twist.md";
  slug: "sh12bn-bad-fuel-scandal-gets-another-nairobi-twist";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sh14-47bn-deficit--kenya-s-afcon-dreams-crumble-under-budget-black-hole.md": {
	id: "sh14-47bn-deficit--kenya-s-afcon-dreams-crumble-under-budget-black-hole.md";
  slug: "sh14-47bn-deficit--kenya-s-afcon-dreams-crumble-under-budget-black-hole";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sh2bn-for-victims-of-police-brutality-as-ruto-and-oburu-form-coalition-team---expect-more-empty-promises.md": {
	id: "sh2bn-for-victims-of-police-brutality-as-ruto-and-oburu-form-coalition-team---expect-more-empty-promises.md";
  slug: "sh2bn-for-victims-of-police-brutality-as-ruto-and-oburu-form-coalition-team---expect-more-empty-promises";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sh4-8-billion-fuel-fiasco--how-corrupt-officials-and-tycoons-pulled-off-their-scheme.md": {
	id: "sh4-8-billion-fuel-fiasco--how-corrupt-officials-and-tycoons-pulled-off-their-scheme.md";
  slug: "sh4-8-billion-fuel-fiasco--how-corrupt-officials-and-tycoons-pulled-off-their-scheme";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sh5-trillion-for-the-boys--the-new-national-infrastructure-fund-is-just-a-bigger-plate.md": {
	id: "sh5-trillion-for-the-boys--the-new-national-infrastructure-fund-is-just-a-bigger-plate.md";
  slug: "sh5-trillion-for-the-boys--the-new-national-infrastructure-fund-is-just-a-bigger-plate";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sh70-million-for-west-pokot--big-titles-for-small-change.md": {
	id: "sh70-million-for-west-pokot--big-titles-for-small-change.md";
  slug: "sh70-million-for-west-pokot--big-titles-for-small-change";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sha-scandle-ruto-duale-on-the-spotlight.md": {
	id: "sha-scandle-ruto-duale-on-the-spotlight.md";
  slug: "sha-scandle-ruto-duale-on-the-spotlight";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"shabana--kenya-police-draw-at-gusii-stadium--another-day--another-0-0-borefest.md": {
	id: "shabana--kenya-police-draw-at-gusii-stadium--another-day--another-0-0-borefest.md";
  slug: "shabana--kenya-police-draw-at-gusii-stadium--another-day--another-0-0-borefest";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"shabana-face-kenya-police-as-bandari-host-ulinzi-in-key-fkf-premier-league-clashes.md": {
	id: "shabana-face-kenya-police-as-bandari-host-ulinzi-in-key-fkf-premier-league-clashes.md";
  slug: "shabana-face-kenya-police-as-bandari-host-ulinzi-in-key-fkf-premier-league-clashes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"shabana-holds-kenya-police-draw-at-rain-soaked-gusii-stadium--relegation-battle-reshaped.md": {
	id: "shabana-holds-kenya-police-draw-at-rain-soaked-gusii-stadium--relegation-battle-reshaped.md";
  slug: "shabana-holds-kenya-police-draw-at-rain-soaked-gusii-stadium--relegation-battle-reshaped";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"shadow-capital-and-stadiums--how-foreign-funded-advocacy-shapes-the-american-sports-landscape.md": {
	id: "shadow-capital-and-stadiums--how-foreign-funded-advocacy-shapes-the-american-sports-landscape.md";
  slug: "shadow-capital-and-stadiums--how-foreign-funded-advocacy-shapes-the-american-sports-landscape";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"shanta-gold--state-repression--corporate-greed--and-a-whole-lotta-injustice-in-siaya.md": {
	id: "shanta-gold--state-repression--corporate-greed--and-a-whole-lotta-injustice-in-siaya.md";
  slug: "shanta-gold--state-repression--corporate-greed--and-a-whole-lotta-injustice-in-siaya";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sheffield-law-firm-pm-law-ltd-s--39-5m-fraud-probe--predictable-collapse-of-greed.md": {
	id: "sheffield-law-firm-pm-law-ltd-s--39-5m-fraud-probe--predictable-collapse-of-greed.md";
  slug: "sheffield-law-firm-pm-law-ltd-s--39-5m-fraud-probe--predictable-collapse-of-greed";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"shell-s-safari-rally-drivers--just-another-shell-game.md": {
	id: "shell-s-safari-rally-drivers--just-another-shell-game.md";
  slug: "shell-s-safari-rally-drivers--just-another-shell-game";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"shingles--another-human-frailty-we-ignore-until-it-burns.md": {
	id: "shingles--another-human-frailty-we-ignore-until-it-burns.md";
  slug: "shingles--another-human-frailty-we-ignore-until-it-burns";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"shingles--why-your-complacency-is-the-real-disease.md": {
	id: "shingles--why-your-complacency-is-the-real-disease.md";
  slug: "shingles--why-your-complacency-is-the-real-disease";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"shiny-portals--same-old-thieves--the-egp-scam.md": {
	id: "shiny-portals--same-old-thieves--the-egp-scam.md";
  slug: "shiny-portals--same-old-thieves--the-egp-scam";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"shiny-rocks-and-shady-bots--why-kenya-s-elite-are-panicking-over-their-legacy.md": {
	id: "shiny-rocks-and-shady-bots--why-kenya-s-elite-are-panicking-over-their-legacy.md";
  slug: "shiny-rocks-and-shady-bots--why-kenya-s-elite-are-panicking-over-their-legacy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"shoday-s-africa-rising-moment--real-talent-or-just-another-apple-music-industry-plant.md": {
	id: "shoday-s-africa-rising-moment--real-talent-or-just-another-apple-music-industry-plant.md";
  slug: "shoday-s-africa-rising-moment--real-talent-or-just-another-apple-music-industry-plant";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"should-parenting-be-lincensed.md": {
	id: "should-parenting-be-lincensed.md";
  slug: "should-parenting-be-lincensed";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"shujaa-s-tough-pool-in-valladolid---another-rugby-sevens-test-we-probably-won-t-win.md": {
	id: "shujaa-s-tough-pool-in-valladolid---another-rugby-sevens-test-we-probably-won-t-win.md";
  slug: "shujaa-s-tough-pool-in-valladolid---another-rugby-sevens-test-we-probably-won-t-win";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"siasa-ni-vurugu--why-kenyan-politics-is-a-death-trap-for-disabled-women.md": {
	id: "siasa-ni-vurugu--why-kenyan-politics-is-a-death-trap-for-disabled-women.md";
  slug: "siasa-ni-vurugu--why-kenyan-politics-is-a-death-trap-for-disabled-women";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sifuna-s-high-stakes-drama--the-lawyer-who-learned-to-shout.md": {
	id: "sifuna-s-high-stakes-drama--the-lawyer-who-learned-to-shout.md";
  slug: "sifuna-s-high-stakes-drama--the-lawyer-who-learned-to-shout";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sifuna-s-kakamega-roadshow--when-political-clout-chasing-becomes-a-bad-music-video.md": {
	id: "sifuna-s-kakamega-roadshow--when-political-clout-chasing-becomes-a-bad-music-video.md";
  slug: "sifuna-s-kakamega-roadshow--when-political-clout-chasing-becomes-a-bad-music-video";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sifuna-s-kakamega-tour--high-drama--low-protocol--and-a-smashed-windscreen.md": {
	id: "sifuna-s-kakamega-tour--high-drama--low-protocol--and-a-smashed-windscreen.md";
  slug: "sifuna-s-kakamega-tour--high-drama--low-protocol--and-a-smashed-windscreen";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sifuna-s-main-character-syndrome--from-political-identity-to-tiktok-brand.md": {
	id: "sifuna-s-main-character-syndrome--from-political-identity-to-tiktok-brand.md";
  slug: "sifuna-s-main-character-syndrome--from-political-identity-to-tiktok-brand";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sifuna-s-teargas-circus--just-another-day-in-the-kenyan-political-playbook.md": {
	id: "sifuna-s-teargas-circus--just-another-day-in-the-kenyan-political-playbook.md";
  slug: "sifuna-s-teargas-circus--just-another-day-in-the-kenyan-political-playbook";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sifuna-says-ruto-s-govt-lied-about-fuel-prices-as-pump-costs-skyrocket.md": {
	id: "sifuna-says-ruto-s-govt-lied-about-fuel-prices-as-pump-costs-skyrocket.md";
  slug: "sifuna-says-ruto-s-govt-lied-about-fuel-prices-as-pump-costs-skyrocket";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"silicon-savannah-or-digital-slaughterhouse.md": {
	id: "silicon-savannah-or-digital-slaughterhouse.md";
  slug: "silicon-savannah-or-digital-slaughterhouse";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"silicon-valuations-surge-amid-global-market-volatility-and-hardware-constraints.md": {
	id: "silicon-valuations-surge-amid-global-market-volatility-and-hardware-constraints.md";
  slug: "silicon-valuations-surge-amid-global-market-volatility-and-hardware-constraints";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"silver-analysts-reverse-stance-following-31-per-cent-crash.md": {
	id: "silver-analysts-reverse-stance-following-31-per-cent-crash.md";
  slug: "silver-analysts-reverse-stance-following-31-per-cent-crash";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"single-mom-in-hamptons-leans-on-parents-to-rebuild-after-divorce--exposing-financial-precarity.md": {
	id: "single-mom-in-hamptons-leans-on-parents-to-rebuild-after-divorce--exposing-financial-precarity.md";
  slug: "single-mom-in-hamptons-leans-on-parents-to-rebuild-after-divorce--exposing-financial-precarity";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"single-mom-s-hamptons-housing-crisis-solved-by-parental-subsidization-post-divorce.md": {
	id: "single-mom-s-hamptons-housing-crisis-solved-by-parental-subsidization-post-divorce.md";
  slug: "single-mom-s-hamptons-housing-crisis-solved-by-parental-subsidization-post-divorce";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"single-motherhood-after-divorce--a-gilded-cage-of-isolation-and-forced-friendship.md": {
	id: "single-motherhood-after-divorce--a-gilded-cage-of-isolation-and-forced-friendship.md";
  slug: "single-motherhood-after-divorce--a-gilded-cage-of-isolation-and-forced-friendship";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sister-act-or-legal-prowess--the-nun-suing-her-way-to-heaven.md": {
	id: "sister-act-or-legal-prowess--the-nun-suing-her-way-to-heaven.md";
  slug: "sister-act-or-legal-prowess--the-nun-suing-her-way-to-heaven";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"six-runners-and-a-prayer--the--elite--poland-squad-is-giving-budget-cuts.md": {
	id: "six-runners-and-a-prayer--the--elite--poland-squad-is-giving-budget-cuts.md";
  slug: "six-runners-and-a-prayer--the--elite--poland-squad-is-giving-budget-cuts";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"slaps--screams--and-shoddy-scripts--the-rise-of-the-60-second-brain-rot.md": {
	id: "slaps--screams--and-shoddy-scripts--the-rise-of-the-60-second-brain-rot.md";
  slug: "slaps--screams--and-shoddy-scripts--the-rise-of-the-60-second-brain-rot";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"smart-vodka-and-stupid-risks--the-dci-s-latest-performance.md": {
	id: "smart-vodka-and-stupid-risks--the-dci-s-latest-performance.md";
  slug: "smart-vodka-and-stupid-risks--the-dci-s-latest-performance";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"smiling--fossil-s-mundane-origins-exposed-on-northumberland-coast.md": {
	id: "smiling--fossil-s-mundane-origins-exposed-on-northumberland-coast.md";
  slug: "smiling--fossil-s-mundane-origins-exposed-on-northumberland-coast";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"smugglers--socialites--and-secret-apps--the-high-price-of-nairobi-s-fake--elite--life.md": {
	id: "smugglers--socialites--and-secret-apps--the-high-price-of-nairobi-s-fake--elite--life.md";
  slug: "smugglers--socialites--and-secret-apps--the-high-price-of-nairobi-s-fake--elite--life";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"snatched-or-snatched-away--the-deadly-cost-of-nairobi-s-secret--skinny-girl--injection.md": {
	id: "snatched-or-snatched-away--the-deadly-cost-of-nairobi-s-secret--skinny-girl--injection.md";
  slug: "snatched-or-snatched-away--the-deadly-cost-of-nairobi-s-secret--skinny-girl--injection";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"social-democrats-signal-growth-ambitions-at-landmark-cork-conference.md": {
	id: "social-democrats-signal-growth-ambitions-at-landmark-cork-conference.md";
  slug: "social-democrats-signal-growth-ambitions-at-landmark-cork-conference";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"soldier-cosplay-and-party-purges--the-messy-week-in-nairobi-and-dar.md": {
	id: "soldier-cosplay-and-party-purges--the-messy-week-in-nairobi-and-dar.md";
  slug: "soldier-cosplay-and-party-purges--the-messy-week-in-nairobi-and-dar";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"soldiers-get-suites-while-citizens-get-taxed-to-death.md": {
	id: "soldiers-get-suites-while-citizens-get-taxed-to-death.md";
  slug: "soldiers-get-suites-while-citizens-get-taxed-to-death";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"solid-snake-joins-rainbow-six-siege-in-operation-silent-hunt.md": {
	id: "solid-snake-joins-rainbow-six-siege-in-operation-silent-hunt.md";
  slug: "solid-snake-joins-rainbow-six-siege-in-operation-silent-hunt";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"solv-energy-shares-surge-23--in-nasdaq-debut-as-ai-power-demand-intensifies.md": {
	id: "solv-energy-shares-surge-23--in-nasdaq-debut-as-ai-power-demand-intensifies.md";
  slug: "solv-energy-shares-surge-23--in-nasdaq-debut-as-ai-power-demand-intensifies";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"somer-club-murder--nairobi-nightlife-security-s-bloody-failure.md": {
	id: "somer-club-murder--nairobi-nightlife-security-s-bloody-failure.md";
  slug: "somer-club-murder--nairobi-nightlife-security-s-bloody-failure";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sonko-s-kes-609-000-phone-purchase-exposes-kenya-s-political-theater-of-greed.md": {
	id: "sonko-s-kes-609-000-phone-purchase-exposes-kenya-s-political-theater-of-greed.md";
  slug: "sonko-s-kes-609-000-phone-purchase-exposes-kenya-s-political-theater-of-greed";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sonko-s-sh537-million-unfrozen--court-cries--no-proof---nairobi-still-drowning-in-chaos.md": {
	id: "sonko-s-sh537-million-unfrozen--court-cries--no-proof---nairobi-still-drowning-in-chaos.md";
  slug: "sonko-s-sh537-million-unfrozen--court-cries--no-proof---nairobi-still-drowning-in-chaos";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sony-s-fairgames-marches-on--crudely-mimicking-dying-extraction-shooter-genre.md": {
	id: "sony-s-fairgames-marches-on--crudely-mimicking-dying-extraction-shooter-genre.md";
  slug: "sony-s-fairgames-marches-on--crudely-mimicking-dying-extraction-shooter-genre";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sophie-turner-on-why-being-at-your-lowest-is-liberating.md": {
	id: "sophie-turner-on-why-being-at-your-lowest-is-liberating.md";
  slug: "sophie-turner-on-why-being-at-your-lowest-is-liberating";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"south-africa-s-elite-school-drama--when-tennis-skirts-meet-political-pr-suicide.md": {
	id: "south-africa-s-elite-school-drama--when-tennis-skirts-meet-political-pr-suicide.md";
  slug: "south-africa-s-elite-school-drama--when-tennis-skirts-meet-political-pr-suicide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"south-b--drug-hub--bust--another-pr-win-for-the-boys-in-blue.md": {
	id: "south-b--drug-hub--bust--another-pr-win-for-the-boys-in-blue.md";
  slug: "south-b--drug-hub--bust--another-pr-win-for-the-boys-in-blue";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"south-c-building-collapse-corruption-incompetency-kenya.md": {
	id: "south-c-building-collapse-corruption-incompetency-kenya.md";
  slug: "south-c-building-collapse-corruption-incompetency-kenya";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"south-korea-s-pathetic-wolf-hunt--a-viral-farce-of-incompetence.md": {
	id: "south-korea-s-pathetic-wolf-hunt--a-viral-farce-of-incompetence.md";
  slug: "south-korea-s-pathetic-wolf-hunt--a-viral-farce-of-incompetence";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"south-korea-s-viral-hunt-for-a-runaway-wolf--an-exercise-in-futility-and-incompetence.md": {
	id: "south-korea-s-viral-hunt-for-a-runaway-wolf--an-exercise-in-futility-and-incompetence.md";
  slug: "south-korea-s-viral-hunt-for-a-runaway-wolf--an-exercise-in-futility-and-incompetence";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"spacex-files-for-1-million-solar-satellite-data-centres.md": {
	id: "spacex-files-for-1-million-solar-satellite-data-centres.md";
  slug: "spacex-files-for-1-million-solar-satellite-data-centres";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"spain-s-goya-awards--where-the-oscar-darlings-go-to-die-and-politics-take-center-stage.md": {
	id: "spain-s-goya-awards--where-the-oscar-darlings-go-to-die-and-politics-take-center-stage.md";
  slug: "spain-s-goya-awards--where-the-oscar-darlings-go-to-die-and-politics-take-center-stage";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"speculation-over-early-lagarde-exit-reshapes-european-central-bank-succession-race.md": {
	id: "speculation-over-early-lagarde-exit-reshapes-european-central-bank-succession-race.md";
  slug: "speculation-over-early-lagarde-exit-reshapes-european-central-bank-succession-race";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"spider-man--brand-new-day-villains-revealed-in-leaked-merch---more-mediocrity-on-the-horizon.md": {
	id: "spider-man--brand-new-day-villains-revealed-in-leaked-merch---more-mediocrity-on-the-horizon.md";
  slug: "spider-man--brand-new-day-villains-revealed-in-leaked-merch---more-mediocrity-on-the-horizon";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"spielberg-s--disclosure-day--trailer--another-alien-mystery-cracked-open--another-summer-cash-grab.md": {
	id: "spielberg-s--disclosure-day--trailer--another-alien-mystery-cracked-open--another-summer-cash-grab.md";
  slug: "spielberg-s--disclosure-day--trailer--another-alien-mystery-cracked-open--another-summer-cash-grab";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"spielberg-s--disclosure-day--trailer-offers-more-smoke-than-fire-on-alien-mystery.md": {
	id: "spielberg-s--disclosure-day--trailer-offers-more-smoke-than-fire-on-alien-mystery.md";
  slug: "spielberg-s--disclosure-day--trailer-offers-more-smoke-than-fire-on-alien-mystery";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sportpesa-league-round-25-officials-confirmed---another-weekend--same-old-mess.md": {
	id: "sportpesa-league-round-25-officials-confirmed---another-weekend--same-old-mess.md";
  slug: "sportpesa-league-round-25-officials-confirmed---another-weekend--same-old-mess";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"spy-and-qqq-etfs-decline-as-us-labour-data-weakens.md": {
	id: "spy-and-qqq-etfs-decline-as-us-labour-data-weakens.md";
  slug: "spy-and-qqq-etfs-decline-as-us-labour-data-weakens";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"st-johnstone-draw-highlights-tactical-volatility-in-scottish-championship-race.md": {
	id: "st-johnstone-draw-highlights-tactical-volatility-in-scottish-championship-race.md";
  slug: "st-johnstone-draw-highlights-tactical-volatility-in-scottish-championship-race";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"staged-engagements-and-receipt-dresses--the-desperation-of-modern-fame.md": {
	id: "staged-engagements-and-receipt-dresses--the-desperation-of-modern-fame.md";
  slug: "staged-engagements-and-receipt-dresses--the-desperation-of-modern-fame";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stagnation-as-strategy--the-cinematic-industrial-complex-mines-the-corpse-of-creativity.md": {
	id: "stagnation-as-strategy--the-cinematic-industrial-complex-mines-the-corpse-of-creativity.md";
  slug: "stagnation-as-strategy--the-cinematic-industrial-complex-mines-the-corpse-of-creativity";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stagnation-by-design--the-ecb-s-managed-surrender-to-the-dollar.md": {
	id: "stagnation-by-design--the-ecb-s-managed-surrender-to-the-dollar.md";
  slug: "stagnation-by-design--the-ecb-s-managed-surrender-to-the-dollar";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stalkerware-nightmare-scenario--celebrity-data-exposed-online.md": {
	id: "stalkerware-nightmare-scenario--celebrity-data-exposed-online.md";
  slug: "stalkerware-nightmare-scenario--celebrity-data-exposed-online";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"star-studded-ruto-wedding--another-karen-bazaar-for-political-heavyweights-and-tycoons.md": {
	id: "star-studded-ruto-wedding--another-karen-bazaar-for-political-heavyweights-and-tycoons.md";
  slug: "star-studded-ruto-wedding--another-karen-bazaar-for-political-heavyweights-and-tycoons";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stardew-valley-1-7-update-to-add-marriage-options-and-child-upgrades.md": {
	id: "stardew-valley-1-7-update-to-add-marriage-options-and-child-upgrades.md";
  slug: "stardew-valley-1-7-update-to-add-marriage-options-and-child-upgrades";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"starlink-latency-in-kenya-plummets-87-percent-following-nairobi-infrastructure-upgrade.md": {
	id: "starlink-latency-in-kenya-plummets-87-percent-following-nairobi-infrastructure-upgrade.md";
  slug: "starlink-latency-in-kenya-plummets-87-percent-following-nairobi-infrastructure-upgrade";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"starmer-s-mandelson-mess--a-recurring-nightmare-of-incompetence.md": {
	id: "starmer-s-mandelson-mess--a-recurring-nightmare-of-incompetence.md";
  slug: "starmer-s-mandelson-mess--a-recurring-nightmare-of-incompetence";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"starmer-s-mandelson-mess-continues-to-haunt-him--incompetence-laid-bare.md": {
	id: "starmer-s-mandelson-mess-continues-to-haunt-him--incompetence-laid-bare.md";
  slug: "starmer-s-mandelson-mess-continues-to-haunt-him--incompetence-laid-bare";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"state-house-tea--museveni-and-anna-mkapa-play-besties-while-the-region-burns.md": {
	id: "state-house-tea--museveni-and-anna-mkapa-play-besties-while-the-region-burns.md";
  slug: "state-house-tea--museveni-and-anna-mkapa-play-besties-while-the-region-burns";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"steam-deck-oled-faces-intermittent-stock-issues-amid-memory-shortages.md": {
	id: "steam-deck-oled-faces-intermittent-stock-issues-amid-memory-shortages.md";
  slug: "steam-deck-oled-faces-intermittent-stock-issues-amid-memory-shortages";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stocks-slide-amid-walmart-earnings-assessment-and-iran-tensions.md": {
	id: "stocks-slide-amid-walmart-earnings-assessment-and-iran-tensions.md";
  slug: "stocks-slide-amid-walmart-earnings-assessment-and-iran-tensions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stolen-ballots--power-plays--kenya-pushed-to-the-brink-by-phone-calls-and-politics.md": {
	id: "stolen-ballots--power-plays--kenya-pushed-to-the-brink-by-phone-calls-and-politics.md";
  slug: "stolen-ballots--power-plays--kenya-pushed-to-the-brink-by-phone-calls-and-politics";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stolen-clanger-puppet-returned-after-50-year-mystery---sentimental-baggage-surfaces.md": {
	id: "stolen-clanger-puppet-returned-after-50-year-mystery---sentimental-baggage-surfaces.md";
  slug: "stolen-clanger-puppet-returned-after-50-year-mystery---sentimental-baggage-surfaces";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stolen-clanger-puppet-returned-after-50-year-mystery--another-petty-theft-elevated-to-nostalgic-drama.md": {
	id: "stolen-clanger-puppet-returned-after-50-year-mystery--another-petty-theft-elevated-to-nostalgic-drama.md";
  slug: "stolen-clanger-puppet-returned-after-50-year-mystery--another-petty-theft-elevated-to-nostalgic-drama";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"strategic-evolution--how-multi-tier-scoring-is-redefining-gaelic-football-analytics.md": {
	id: "strategic-evolution--how-multi-tier-scoring-is-redefining-gaelic-football-analytics.md";
  slug: "strategic-evolution--how-multi-tier-scoring-is-redefining-gaelic-football-analytics";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"strategic-recalibration--india-s-defense-surge-and-the-evolution-of-south-asian-markets.md": {
	id: "strategic-recalibration--india-s-defense-surge-and-the-evolution-of-south-asian-markets.md";
  slug: "strategic-recalibration--india-s-defense-surge-and-the-evolution-of-south-asian-markets";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"strava-fitness-app-exposes-french-aircraft-carrier-s-location---another-nail-in-the-coffin-of-military-secrecy.md": {
	id: "strava-fitness-app-exposes-french-aircraft-carrier-s-location---another-nail-in-the-coffin-of-military-secrecy.md";
  slug: "strava-fitness-app-exposes-french-aircraft-carrier-s-location---another-nail-in-the-coffin-of-military-secrecy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"strava-fitness-app-exposes-french-aircraft-carrier-s-location---military-incompetence-on-full-display.md": {
	id: "strava-fitness-app-exposes-french-aircraft-carrier-s-location---military-incompetence-on-full-display.md";
  slug: "strava-fitness-app-exposes-french-aircraft-carrier-s-location---military-incompetence-on-full-display";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"strava-fitness-app-exposes-french-aircraft-carrier-s-location-amid-global-tensions.md": {
	id: "strava-fitness-app-exposes-french-aircraft-carrier-s-location-amid-global-tensions.md";
  slug: "strava-fitness-app-exposes-french-aircraft-carrier-s-location-amid-global-tensions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"streaming-s-sci-fi-season--a-predictable-treadmill-of-mediocrity.md": {
	id: "streaming-s-sci-fi-season--a-predictable-treadmill-of-mediocrity.md";
  slug: "streaming-s-sci-fi-season--a-predictable-treadmill-of-mediocrity";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stricter-police-recruitment-measures-coming--state-s-latest--fix.md": {
	id: "stricter-police-recruitment-measures-coming--state-s-latest--fix.md";
  slug: "stricter-police-recruitment-measures-coming--state-s-latest--fix";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"subban-defends-gretzky-as-geopolitical-tensions-reshape-north-american-hockey-dynamics.md": {
	id: "subban-defends-gretzky-as-geopolitical-tensions-reshape-north-american-hockey-dynamics.md";
  slug: "subban-defends-gretzky-as-geopolitical-tensions-reshape-north-american-hockey-dynamics";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"subnautica-2-launch-marred-by-corporate-greed-and-legal-wrangling.md": {
	id: "subnautica-2-launch-marred-by-corporate-greed-and-legal-wrangling.md";
  slug: "subnautica-2-launch-marred-by-corporate-greed-and-legal-wrangling";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"suit-up-for-the-sellout--the-short-shelf-life-of-nairobi-heroes.md": {
	id: "suit-up-for-the-sellout--the-short-shelf-life-of-nairobi-heroes.md";
  slug: "suit-up-for-the-sellout--the-short-shelf-life-of-nairobi-heroes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"supreme-court-overturns-trump-tariffs--injecting-fresh-volatility-into-global-supply-chains.md": {
	id: "supreme-court-overturns-trump-tariffs--injecting-fresh-volatility-into-global-supply-chains.md";
  slug: "supreme-court-overturns-trump-tariffs--injecting-fresh-volatility-into-global-supply-chains";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"supreme-court-shuffle--more-vacancies-than-sense-before-2027-polls.md": {
	id: "supreme-court-shuffle--more-vacancies-than-sense-before-2027-polls.md";
  slug: "supreme-court-shuffle--more-vacancies-than-sense-before-2027-polls";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"surrey-s-farrant-forced-to-retire-with-back-injury.md": {
	id: "surrey-s-farrant-forced-to-retire-with-back-injury.md";
  slug: "surrey-s-farrant-forced-to-retire-with-back-injury";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"switch-2-price--playstation-6-release-dates-face-pressure-amid-memory-shortage.md": {
	id: "switch-2-price--playstation-6-release-dates-face-pressure-amid-memory-shortage.md";
  slug: "switch-2-price--playstation-6-release-dates-face-pressure-amid-memory-shortage";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"switch-2-usb-c-dock-rip-off--great-ones-under--50--don-t-be-naive.md": {
	id: "switch-2-usb-c-dock-rip-off--great-ones-under--50--don-t-be-naive.md";
  slug: "switch-2-usb-c-dock-rip-off--great-ones-under--50--don-t-be-naive";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"switch-2-usb-c-docks--the-illusion-of-choice-for-the-gullible-gamer.md": {
	id: "switch-2-usb-c-docks--the-illusion-of-choice-for-the-gullible-gamer.md";
  slug: "switch-2-usb-c-docks--the-illusion-of-choice-for-the-gullible-gamer";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"systems--spite--and-secret-tapes--the-uda-circus-hits-the-road-again.md": {
	id: "systems--spite--and-secret-tapes--the-uda-circus-hits-the-road-again.md";
  slug: "systems--spite--and-secret-tapes--the-uda-circus-hits-the-road-again";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tactical-empathy--the-royal-family-s-calculated-shield-against-the-epstein-fallout.md": {
	id: "tactical-empathy--the-royal-family-s-calculated-shield-against-the-epstein-fallout.md";
  slug: "tactical-empathy--the-royal-family-s-calculated-shield-against-the-epstein-fallout";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"talanta-s--final-phase----another-shiny-project--same-old-promises.md": {
	id: "talanta-s--final-phase----another-shiny-project--same-old-promises.md";
  slug: "talanta-s--final-phase----another-shiny-project--same-old-promises";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"talanta-stadium-or-talanta-scam--kenya-s-afcon-dreams-are-giving-broke-influencer-vibes.md": {
	id: "talanta-stadium-or-talanta-scam--kenya-s-afcon-dreams-are-giving-broke-influencer-vibes.md";
  slug: "talanta-stadium-or-talanta-scam--kenya-s-afcon-dreams-are-giving-broke-influencer-vibes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tanzanian-held-in-kenya-allegedly-over-brutal-killing-of-11-year-old-schoolgirl.md": {
	id: "tanzanian-held-in-kenya-allegedly-over-brutal-killing-of-11-year-old-schoolgirl.md";
  slug: "tanzanian-held-in-kenya-allegedly-over-brutal-killing-of-11-year-old-schoolgirl";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tarmac-you-can-t-eat--the-ksh-100-billion-mirage-in-the-north.md": {
	id: "tarmac-you-can-t-eat--the-ksh-100-billion-mirage-in-the-north.md";
  slug: "tarmac-you-can-t-eat--the-ksh-100-billion-mirage-in-the-north";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"taxman-sacco-dumps-kuscco-investments--more-coop-chaos-for-your-savings.md": {
	id: "taxman-sacco-dumps-kuscco-investments--more-coop-chaos-for-your-savings.md";
  slug: "taxman-sacco-dumps-kuscco-investments--more-coop-chaos-for-your-savings";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"taxpayer-funded-goons--the-curious-case-of-siaya-s-loudest-mouthpiece.md": {
	id: "taxpayer-funded-goons--the-curious-case-of-siaya-s-loudest-mouthpiece.md";
  slug: "taxpayer-funded-goons--the-curious-case-of-siaya-s-loudest-mouthpiece";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tea--tears--and-the-art-of-the-kenyan-heist.md": {
	id: "tea--tears--and-the-art-of-the-kenyan-heist.md";
  slug: "tea--tears--and-the-art-of-the-kenyan-heist";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tea--tweets--and-tomahawks--nairobi-s-geopolitical-juggling-act-falls-flat.md": {
	id: "tea--tweets--and-tomahawks--nairobi-s-geopolitical-juggling-act-falls-flat.md";
  slug: "tea--tweets--and-tomahawks--nairobi-s-geopolitical-juggling-act-falls-flat";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tea-sector-abusers-sacked-as-courts-back-dismissals-of-managers.md": {
	id: "tea-sector-abusers-sacked-as-courts-back-dismissals-of-managers.md";
  slug: "tea-sector-abusers-sacked-as-courts-back-dismissals-of-managers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"teacher-couple-nabbed-over-sh2-4-million-land-scam-pulled-off-at-ardhi-house.md": {
	id: "teacher-couple-nabbed-over-sh2-4-million-land-scam-pulled-off-at-ardhi-house.md";
  slug: "teacher-couple-nabbed-over-sh2-4-million-land-scam-pulled-off-at-ardhi-house";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"team-gb-s-winter-of-discontent--a-masterclass-in-subsidized-mediocrity.md": {
	id: "team-gb-s-winter-of-discontent--a-masterclass-in-subsidized-mediocrity.md";
  slug: "team-gb-s-winter-of-discontent--a-masterclass-in-subsidized-mediocrity";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech-companies-design-robots-with-cute-features-to-foster-human-acceptance.md": {
	id: "tech-companies-design-robots-with-cute-features-to-foster-human-acceptance.md";
  slug: "tech-companies-design-robots-with-cute-features-to-foster-human-acceptance";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech-daily-2026-01-31.md": {
	id: "tech-daily-2026-01-31.md";
  slug: "starlink-vs-safaricom-internet-war";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech-giants-announce-toothless-accord-amidst-surge-in-scams.md": {
	id: "tech-giants-announce-toothless-accord-amidst-surge-in-scams.md";
  slug: "tech-giants-announce-toothless-accord-amidst-surge-in-scams";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech-giants-reshape-infrastructure-as-meta-expands-nvidia-partnership.md": {
	id: "tech-giants-reshape-infrastructure-as-meta-expands-nvidia-partnership.md";
  slug: "tech-giants-reshape-infrastructure-as-meta-expands-nvidia-partnership";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech-giants-unite-to-fight-online-scams--a-voluntary-sham.md": {
	id: "tech-giants-unite-to-fight-online-scams--a-voluntary-sham.md";
  slug: "tech-giants-unite-to-fight-online-scams--a-voluntary-sham";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tech-titans-pivot--ai-infrastructure-overtakes-stock-buybacks-in-strategic-realignment.md": {
	id: "tech-titans-pivot--ai-infrastructure-overtakes-stock-buybacks-in-strategic-realignment.md";
  slug: "tech-titans-pivot--ai-infrastructure-overtakes-stock-buybacks-in-strategic-realignment";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"technical-errors-or-just-bad-acting--amas-obasogie-s-great-escape-from-tanzanian-scandal.md": {
	id: "technical-errors-or-just-bad-acting--amas-obasogie-s-great-escape-from-tanzanian-scandal.md";
  slug: "technical-errors-or-just-bad-acting--amas-obasogie-s-great-escape-from-tanzanian-scandal";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"teens-use-ai-slander-pages-to-mock-teachers--exposing-systemic-failure.md": {
	id: "teens-use-ai-slander-pages-to-mock-teachers--exposing-systemic-failure.md";
  slug: "teens-use-ai-slander-pages-to-mock-teachers--exposing-systemic-failure";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tems--leading-vibe-initiative-heads-to-south-africa--empowerment-or-just-another-high-end-hennessy-ad.md": {
	id: "tems--leading-vibe-initiative-heads-to-south-africa--empowerment-or-just-another-high-end-hennessy-ad.md";
  slug: "tems--leading-vibe-initiative-heads-to-south-africa--empowerment-or-just-another-high-end-hennessy-ad";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tems-brings-her-hennessy-soaked--leading-vibe--to-south-africa-because-pr-never-sleeps.md": {
	id: "tems-brings-her-hennessy-soaked--leading-vibe--to-south-africa-because-pr-never-sleeps.md";
  slug: "tems-brings-her-hennessy-soaked--leading-vibe--to-south-africa-because-pr-never-sleeps";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tems-sells-the-sisterhood-dream--leading-vibe-initiative-heads-to-south-africa-for-another-round-of--empowerment.md": {
	id: "tems-sells-the-sisterhood-dream--leading-vibe-initiative-heads-to-south-africa-for-another-round-of--empowerment.md";
  slug: "tems-sells-the-sisterhood-dream--leading-vibe-initiative-heads-to-south-africa-for-another-round-of--empowerment";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tesla-s--2-billion-ai-hardware-gamble--a-mystery-acquisition-driven-by-desperation.md": {
	id: "tesla-s--2-billion-ai-hardware-gamble--a-mystery-acquisition-driven-by-desperation.md";
  slug: "tesla-s--2-billion-ai-hardware-gamble--a-mystery-acquisition-driven-by-desperation";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tesla-s--2-billion-ai-hardware-gamble--another-musk-vanity-project.md": {
	id: "tesla-s--2-billion-ai-hardware-gamble--another-musk-vanity-project.md";
  slug: "tesla-s--2-billion-ai-hardware-gamble--another-musk-vanity-project";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"test-article.md": {
	id: "test-article.md";
  slug: "imf-debt-trap-kenyan-dreams";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"teva-and-sanofi-advance-ibd-pipeline-with-positive-long-term-phase-2b-results-for-duvakitug.md": {
	id: "teva-and-sanofi-advance-ibd-pipeline-with-positive-long-term-phase-2b-results-for-duvakitug.md";
  slug: "teva-and-sanofi-advance-ibd-pipeline-with-positive-long-term-phase-2b-results-for-duvakitug";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the--111-billion-corporate-orgy--paramount-swallows-warner-bros-while-cnn-prays-for-its-life.md": {
	id: "the--111-billion-corporate-orgy--paramount-swallows-warner-bros-while-cnn-prays-for-its-life.md";
  slug: "the--111-billion-corporate-orgy--paramount-swallows-warner-bros-while-cnn-prays-for-its-life";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the--3-trillion-mirage--ruto-sells-continental-dreams-while-nairobi-suffers-the-ground-reality.md": {
	id: "the--3-trillion-mirage--ruto-sells-continental-dreams-while-nairobi-suffers-the-ground-reality.md";
  slug: "the--3-trillion-mirage--ruto-sells-continental-dreams-while-nairobi-suffers-the-ground-reality";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the--35-000-double-tap-and-timoth-e-s-recycled-refinement.md": {
	id: "the--35-000-double-tap-and-timoth-e-s-recycled-refinement.md";
  slug: "the--35-000-double-tap-and-timoth-e-s-recycled-refinement";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the--800-million-handshake--how-epic-games-sold-out-the--open--app-revolution.md": {
	id: "the--800-million-handshake--how-epic-games-sold-out-the--open--app-revolution.md";
  slug: "the--800-million-handshake--how-epic-games-sold-out-the--open--app-revolution";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the--fake-news--trap-is-dead--our-favorite-clout-chasers-just-got-a-legal-pass.md": {
	id: "the--fake-news--trap-is-dead--our-favorite-clout-chasers-just-got-a-legal-pass.md";
  slug: "the--fake-news--trap-is-dead--our-favorite-clout-chasers-just-got-a-legal-pass";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the--heist--of-ios-26--leaker-s-downfall-exposes-corporate-hypocrisy-and-legal-snafus.md": {
	id: "the--heist--of-ios-26--leaker-s-downfall-exposes-corporate-hypocrisy-and-legal-snafus.md";
  slug: "the--heist--of-ios-26--leaker-s-downfall-exposes-corporate-hypocrisy-and-legal-snafus";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the--moody--pivot--how-high-end-interior-design-trends-are-reshaping-the-luxury-real-estate-market.md": {
	id: "the--moody--pivot--how-high-end-interior-design-trends-are-reshaping-the-luxury-real-estate-market.md";
  slug: "the--moody--pivot--how-high-end-interior-design-trends-are-reshaping-the-luxury-real-estate-market";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the--secret--ai-meeting--a-performative-alliance-of-the-disgruntled.md": {
	id: "the--secret--ai-meeting--a-performative-alliance-of-the-disgruntled.md";
  slug: "the--secret--ai-meeting--a-performative-alliance-of-the-disgruntled";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the--soft-life--is-a-scam--your-favorite-influencer-s-airbnb-is-probably-illegal.md": {
	id: "the--soft-life--is-a-scam--your-favorite-influencer-s-airbnb-is-probably-illegal.md";
  slug: "the--soft-life--is-a-scam--your-favorite-influencer-s-airbnb-is-probably-illegal";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the--soft-life--just-got-harder--interpol-crashes-the-fake-billionaire-party.md": {
	id: "the--soft-life--just-got-harder--interpol-crashes-the-fake-billionaire-party.md";
  slug: "the--soft-life--just-got-harder--interpol-crashes-the-fake-billionaire-party";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the--unfat--revolution--nairobi-celebs-spending-millions-to-escape-the--wealthy--look.md": {
	id: "the--unfat--revolution--nairobi-celebs-spending-millions-to-escape-the--wealthy--look.md";
  slug: "the--unfat--revolution--nairobi-celebs-spending-millions-to-escape-the--wealthy--look";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-1-240-vertical-pass-threshold-and-the-new-era-of-kenyan-football.md": {
	id: "the-1-240-vertical-pass-threshold-and-the-new-era-of-kenyan-football.md";
  slug: "the-1-240-vertical-pass-threshold-and-the-new-era-of-kenyan-football";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-10k-circus--why-we-re-still-catching-small-fry-while-the-sharks-swim-free.md": {
	id: "the-10k-circus--why-we-re-still-catching-small-fry-while-the-sharks-swim-free.md";
  slug: "the-10k-circus--why-we-re-still-catching-small-fry-while-the-sharks-swim-free";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-2--delusion--europe-s-managed-decline-in-a-fragmented-world.md": {
	id: "the-2--delusion--europe-s-managed-decline-in-a-fragmented-world.md";
  slug: "the-2--delusion--europe-s-managed-decline-in-a-fragmented-world";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-20-trillion-shadow-how-global-elites-are-hiding-your-future-in-plain-sight.md": {
	id: "the-20-trillion-shadow-how-global-elites-are-hiding-your-future-in-plain-sight.md";
  slug: "the-20-trillion-shadow-how-global-elites-are-hiding-your-future-in-plain-sight";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-2026-ict-budget--another-digital-mirage-for-a-hungry-nation.md": {
	id: "the-2026-ict-budget--another-digital-mirage-for-a-hungry-nation.md";
  slug: "the-2026-ict-budget--another-digital-mirage-for-a-hungry-nation";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-2027-playbook--why-brian-kagoro-s-deportation-is-just-the-prequel.md": {
	id: "the-2027-playbook--why-brian-kagoro-s-deportation-is-just-the-prequel.md";
  slug: "the-2027-playbook--why-brian-kagoro-s-deportation-is-just-the-prequel";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-24-7-war-machine--how-crypto-profited-while-traditional-finance-slept.md": {
	id: "the-24-7-war-machine--how-crypto-profited-while-traditional-finance-slept.md";
  slug: "the-24-7-war-machine--how-crypto-profited-while-traditional-finance-slept";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-24-hour-economy-is-a-mirage-and-your-subscription-is-a-ransom-note.md": {
	id: "the-24-hour-economy-is-a-mirage-and-your-subscription-is-a-ransom-note.md";
  slug: "the-24-hour-economy-is-a-mirage-and-your-subscription-is-a-ransom-note";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-actor-awards--a-rebrand-nobody-asked-for-and-trophies-for-the-usual-suspects.md": {
	id: "the-actor-awards--a-rebrand-nobody-asked-for-and-trophies-for-the-usual-suspects.md";
  slug: "the-actor-awards--a-rebrand-nobody-asked-for-and-trophies-for-the-usual-suspects";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-addis-theatre-and-runda-bubbles--same-script--different-stage.md": {
	id: "the-addis-theatre-and-runda-bubbles--same-script--different-stage.md";
  slug: "the-addis-theatre-and-runda-bubbles--same-script--different-stage";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-afcon-2027-billion-shilling-ghost-why-rutos-stadium-promises-might-be-kenyas-biggest-sports-scam.md": {
	id: "the-afcon-2027-billion-shilling-ghost-why-rutos-stadium-promises-might-be-kenyas-biggest-sports-scam.md";
  slug: "the-afcon-2027-billion-shilling-ghost-why-rutos-stadium-promises-might-be-kenyas-biggest-sports-scam";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-africa-we-build-summit-and-kenya-s-bold-infrastructure-blueprint.md": {
	id: "the-africa-we-build-summit-and-kenya-s-bold-infrastructure-blueprint.md";
  slug: "the-africa-we-build-summit-and-kenya-s-bold-infrastructure-blueprint";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-agoa-band-aid--we-are-bleeding-and-ruto-is-buying-cotton-wool.md": {
	id: "the-agoa-band-aid--we-are-bleeding-and-ruto-is-buying-cotton-wool.md";
  slug: "the-agoa-band-aid--we-are-bleeding-and-ruto-is-buying-cotton-wool";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-ai-paradox--cooling-inflation-fails-to-offset-disruption-fears-in-volatile-tech-session.md": {
	id: "the-ai-paradox--cooling-inflation-fails-to-offset-disruption-fears-in-volatile-tech-session.md";
  slug: "the-ai-paradox--cooling-inflation-fails-to-offset-disruption-fears-in-volatile-tech-session";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-ai-paradox--global-markets-reeling-as-contradictory-fears-trigger--1-5-trillion-selloff.md": {
	id: "the-ai-paradox--global-markets-reeling-as-contradictory-fears-trigger--1-5-trillion-selloff.md";
  slug: "the-ai-paradox--global-markets-reeling-as-contradictory-fears-trigger--1-5-trillion-selloff";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-ai-parasite--microsoft-sacrifices-xbox-to-the-altar-of-corporate-margins.md": {
	id: "the-ai-parasite--microsoft-sacrifices-xbox-to-the-altar-of-corporate-margins.md";
  slug: "the-ai-parasite--microsoft-sacrifices-xbox-to-the-altar-of-corporate-margins";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-ai-productivity-take-off--new-data-signals-economic-transformation.md": {
	id: "the-ai-productivity-take-off--new-data-signals-economic-transformation.md";
  slug: "the-ai-productivity-take-off--new-data-signals-economic-transformation";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-airbnb-chronicles--when--clout--becomes-the-new-colonization.md": {
	id: "the-airbnb-chronicles--when--clout--becomes-the-new-colonization.md";
  slug: "the-airbnb-chronicles--when--clout--becomes-the-new-colonization";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-aluminum-mirage--war-is-the-new-global-thermostat.md": {
	id: "the-aluminum-mirage--war-is-the-new-global-thermostat.md";
  slug: "the-aluminum-mirage--war-is-the-new-global-thermostat";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-annual-nairobi-swim--death-by-a-thousand-puddles.md": {
	id: "the-annual-nairobi-swim--death-by-a-thousand-puddles.md";
  slug: "the-annual-nairobi-swim--death-by-a-thousand-puddles";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-apology-parasite--why-elite-athletes-weaponize-personal-drama-to-steal-the-spotlight.md": {
	id: "the-apology-parasite--why-elite-athletes-weaponize-personal-drama-to-steal-the-spotlight.md";
  slug: "the-apology-parasite--why-elite-athletes-weaponize-personal-drama-to-steal-the-spotlight";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-ar-patent-wars--litigating-the-future-into-stagnation.md": {
	id: "the-ar-patent-wars--litigating-the-future-into-stagnation.md";
  slug: "the-ar-patent-wars--litigating-the-future-into-stagnation";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-architecture-of-collapse--europe-profits-while-the-dollar-burns.md": {
	id: "the-architecture-of-collapse--europe-profits-while-the-dollar-burns.md";
  slug: "the-architecture-of-collapse--europe-profits-while-the-dollar-burns";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-army-as-an-eraser--ramaphosa-s-last-gasp-for-order.md": {
	id: "the-army-as-an-eraser--ramaphosa-s-last-gasp-for-order.md";
  slug: "the-army-as-an-eraser--ramaphosa-s-last-gasp-for-order";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-art-of-ignoring-you-legally--the-public-participation-bill-trap.md": {
	id: "the-art-of-ignoring-you-legally--the-public-participation-bill-trap.md";
  slug: "the-art-of-ignoring-you-legally--the-public-participation-bill-trap";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-art-of-the-shakedown--how-the-elite-get-fleeced-in-the-shadows.md": {
	id: "the-art-of-the-shakedown--how-the-elite-get-fleeced-in-the-shadows.md";
  slug: "the-art-of-the-shakedown--how-the-elite-get-fleeced-in-the-shadows";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-arusha-ghost-town--handing-over-a-broken-eac-and-a-mountain-of-debt.md": {
	id: "the-arusha-ghost-town--handing-over-a-broken-eac-and-a-mountain-of-debt.md";
  slug: "the-arusha-ghost-town--handing-over-a-broken-eac-and-a-mountain-of-debt";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-audacity-of-colonizer-broth--why-this-uk-pho-chain-needs-to-read-the-room.md": {
	id: "the-audacity-of-colonizer-broth--why-this-uk-pho-chain-needs-to-read-the-room.md";
  slug: "the-audacity-of-colonizer-broth--why-this-uk-pho-chain-needs-to-read-the-room";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-audio-hustle--kenya-s--creative-economy--is-just-another-gig-for-the-starving-artist.md": {
	id: "the-audio-hustle--kenya-s--creative-economy--is-just-another-gig-for-the-starving-artist.md";
  slug: "the-audio-hustle--kenya-s--creative-economy--is-just-another-gig-for-the-starving-artist";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-ball-stops--the-bills-don-t.md": {
	id: "the-ball-stops--the-bills-don-t.md";
  slug: "the-ball-stops--the-bills-don-t";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-bass-highway-ghost--why-one-man-s-arrest-signals-the-death-of-the-tasmanian-bush.md": {
	id: "the-bass-highway-ghost--why-one-man-s-arrest-signals-the-death-of-the-tasmanian-bush.md";
  slug: "the-bass-highway-ghost--why-one-man-s-arrest-signals-the-death-of-the-tasmanian-bush";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-beckham-brand-expansion--buying-a-rock-star-career-for-the-youngest-heir.md": {
	id: "the-beckham-brand-expansion--buying-a-rock-star-career-for-the-youngest-heir.md";
  slug: "the-beckham-brand-expansion--buying-a-rock-star-career-for-the-youngest-heir";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-beckham-brand-is-bleeding--birthday-throwbacks-won-t-fix-this-mess.md": {
	id: "the-beckham-brand-is-bleeding--birthday-throwbacks-won-t-fix-this-mess.md";
  slug: "the-beckham-brand-is-bleeding--birthday-throwbacks-won-t-fix-this-mess";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-beggar-in-chief--why-your-empty-pockets-are-to-blame-for-the-china-debt.md": {
	id: "the-beggar-in-chief--why-your-empty-pockets-are-to-blame-for-the-china-debt.md";
  slug: "the-beggar-in-chief--why-your-empty-pockets-are-to-blame-for-the-china-debt";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-begging-bowl-of-industry--socializing-risk-as-the-middle-east-burns.md": {
	id: "the-begging-bowl-of-industry--socializing-risk-as-the-middle-east-burns.md";
  slug: "the-begging-bowl-of-industry--socializing-risk-as-the-middle-east-burns";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-big-flexa-s-final-bow--when-platinum-plaques-aren-t-enough-to-save-you.md": {
	id: "the-big-flexa-s-final-bow--when-platinum-plaques-aren-t-enough-to-save-you.md";
  slug: "the-big-flexa-s-final-bow--when-platinum-plaques-aren-t-enough-to-save-you";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-billion-dollar-golf-mirage-collapses.md": {
	id: "the-billion-dollar-golf-mirage-collapses.md";
  slug: "the-billion-dollar-golf-mirage-collapses";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-billion-dollar-hospital-ward.md": {
	id: "the-billion-dollar-hospital-ward.md";
  slug: "the-billion-dollar-hospital-ward";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-billion-dollar-shakedown--harvard-and-the-death-of-the-sovereign-university.md": {
	id: "the-billion-dollar-shakedown--harvard-and-the-death-of-the-sovereign-university.md";
  slug: "the-billion-dollar-shakedown--harvard-and-the-death-of-the-sovereign-university";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-billion-dollar-sieve--nasa-s-artemis-2-delay-exposes-the-rot-in-space-bureaucracy.md": {
	id: "the-billion-dollar-sieve--nasa-s-artemis-2-delay-exposes-the-rot-in-space-bureaucracy.md";
  slug: "the-billion-dollar-sieve--nasa-s-artemis-2-delay-exposes-the-rot-in-space-bureaucracy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-billionaire-s-laundry--how-adani-s-friends-keep-the-soap-bubbling.md": {
	id: "the-billionaire-s-laundry--how-adani-s-friends-keep-the-soap-bubbling.md";
  slug: "the-billionaire-s-laundry--how-adani-s-friends-keep-the-soap-bubbling";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-bitter-aftertaste-of-kenya-s--3-5-billion-tea-scam.md": {
	id: "the-bitter-aftertaste-of-kenya-s--3-5-billion-tea-scam.md";
  slug: "the-bitter-aftertaste-of-kenya-s--3-5-billion-tea-scam";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-bloated-spectacle-of-48-teams-and-sovereign-decay.md": {
	id: "the-bloated-spectacle-of-48-teams-and-sovereign-decay.md";
  slug: "the-bloated-spectacle-of-48-teams-and-sovereign-decay";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-blockchain-is-just-a-digital-refinement-of-ancient-slavery.md": {
	id: "the-blockchain-is-just-a-digital-refinement-of-ancient-slavery.md";
  slug: "the-blockchain-is-just-a-digital-refinement-of-ancient-slavery";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-blue-shroud--why-police-custody-is-the-most-dangerous-place-in-kenya.md": {
	id: "the-blue-shroud--why-police-custody-is-the-most-dangerous-place-in-kenya.md";
  slug: "the-blue-shroud--why-police-custody-is-the-most-dangerous-place-in-kenya";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-blue-uniform-trap--where-your-dignity-goes-to-die.md": {
	id: "the-blue-uniform-trap--where-your-dignity-goes-to-die.md";
  slug: "the-blue-uniform-trap--where-your-dignity-goes-to-die";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-blue-uniformed-billionaires--police-sacco-s-sh66-billion-mirage.md": {
	id: "the-blue-uniformed-billionaires--police-sacco-s-sh66-billion-mirage.md";
  slug: "the-blue-uniformed-billionaires--police-sacco-s-sh66-billion-mirage";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-boardroom-coup--how-you-got-scammed-by-a-political-prenup.md": {
	id: "the-boardroom-coup--how-you-got-scammed-by-a-political-prenup.md";
  slug: "the-boardroom-coup--how-you-got-scammed-by-a-political-prenup";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-broad-based-buffet--when-enemies-share-a-plate-while-you-starve.md": {
	id: "the-broad-based-buffet--when-enemies-share-a-plate-while-you-starve.md";
  slug: "the-broad-based-buffet--when-enemies-share-a-plate-while-you-starve";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-broad-based-buffet--when-the-vultures-start-biting-each-other.md": {
	id: "the-broad-based-buffet--when-the-vultures-start-biting-each-other.md";
  slug: "the-broad-based-buffet--when-the-vultures-start-biting-each-other";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-bronze-medal-in-manipulation--sturla-holm-laegreid-s-performative-olympic-shame.md": {
	id: "the-bronze-medal-in-manipulation--sturla-holm-laegreid-s-performative-olympic-shame.md";
  slug: "the-bronze-medal-in-manipulation--sturla-holm-laegreid-s-performative-olympic-shame";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-brussels-bait--why-the-eu-kenya-trade-deal-is-a-trap.md": {
	id: "the-brussels-bait--why-the-eu-kenya-trade-deal-is-a-trap.md";
  slug: "the-brussels-bait--why-the-eu-kenya-trade-deal-is-a-trap";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-bullion-mirage--gold-withers-under-real-world-fire.md": {
	id: "the-bullion-mirage--gold-withers-under-real-world-fire.md";
  slug: "the-bullion-mirage--gold-withers-under-real-world-fire";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-bullish-delusion-of-a-world-on-fire.md": {
	id: "the-bullish-delusion-of-a-world-on-fire.md";
  slug: "the-bullish-delusion-of-a-world-on-fire";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-ca-s--safety--warning-is-just-another-tax-trap-for-the-broke.md": {
	id: "the-ca-s--safety--warning-is-just-another-tax-trap-for-the-broke.md";
  slug: "the-ca-s--safety--warning-is-just-another-tax-trap-for-the-broke";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-camelot-cadaver--pelosi-s-final-grift.md": {
	id: "the-camelot-cadaver--pelosi-s-final-grift.md";
  slug: "the-camelot-cadaver--pelosi-s-final-grift";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-cannes-mirage--selling-dreams-in-france-while-the-local-creative-scene-rots.md": {
	id: "the-cannes-mirage--selling-dreams-in-france-while-the-local-creative-scene-rots.md";
  slug: "the-cannes-mirage--selling-dreams-in-france-while-the-local-creative-scene-rots";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-cannibalization-of-women-s-sports-as-a-geopolitical-theater.md": {
	id: "the-cannibalization-of-women-s-sports-as-a-geopolitical-theater.md";
  slug: "the-cannibalization-of-women-s-sports-as-a-geopolitical-theater";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-caracas-tehran-blueprint-why-africa-is-abandoning-the-washington-consensus.md": {
	id: "the-caracas-tehran-blueprint-why-africa-is-abandoning-the-washington-consensus.md";
  slug: "the-caracas-tehran-blueprint-why-africa-is-abandoning-the-washington-consensus";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-carbon-registry--kanairo-s-newest-bureaucratic-playpen.md": {
	id: "the-carbon-registry--kanairo-s-newest-bureaucratic-playpen.md";
  slug: "the-carbon-registry--kanairo-s-newest-bureaucratic-playpen";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-carbon-tax-guillotine-and-the-end-of-cheap-bulk.md": {
	id: "the-carbon-tax-guillotine-and-the-end-of-cheap-bulk.md";
  slug: "the-carbon-tax-guillotine-and-the-end-of-cheap-bulk";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-cardinal-s-final-curtain-call--polycarp-pengo-checks-out-after-a-vip-medical-tour.md": {
	id: "the-cardinal-s-final-curtain-call--polycarp-pengo-checks-out-after-a-vip-medical-tour.md";
  slug: "the-cardinal-s-final-curtain-call--polycarp-pengo-checks-out-after-a-vip-medical-tour";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-central-bank-gaslight.md": {
	id: "the-central-bank-gaslight.md";
  slug: "the-central-bank-gaslight";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-ceo-wish-list--how-to-waste-paper-in-2026.md": {
	id: "the-ceo-wish-list--how-to-waste-paper-in-2026.md";
  slug: "the-ceo-wish-list--how-to-waste-paper-in-2026";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-cheap-oil-mirage--china-s-teapot-refineries-are-about-to-get-smoked.md": {
	id: "the-cheap-oil-mirage--china-s-teapot-refineries-are-about-to-get-smoked.md";
  slug: "the-cheap-oil-mirage--china-s-teapot-refineries-are-about-to-get-smoked";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-click-awards-2026--more-shiny-trophies-for-people-who-can-t-put-down-their-phones.md": {
	id: "the-click-awards-2026--more-shiny-trophies-for-people-who-can-t-put-down-their-phones.md";
  slug: "the-click-awards-2026--more-shiny-trophies-for-people-who-can-t-put-down-their-phones";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-clinton-contract--a-transactional-blueprint-for-power.md": {
	id: "the-clinton-contract--a-transactional-blueprint-for-power.md";
  slug: "the-clinton-contract--a-transactional-blueprint-for-power";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-cloud-bleeds--globalism-meets-a-drone-fired-reality-check.md": {
	id: "the-cloud-bleeds--globalism-meets-a-drone-fired-reality-check.md";
  slug: "the-cloud-bleeds--globalism-meets-a-drone-fired-reality-check";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-cluster-1-hunger-games--90-000-kenyan-kids-just-lost-the-lottery.md": {
	id: "the-cluster-1-hunger-games--90-000-kenyan-kids-just-lost-the-lottery.md";
  slug: "the-cluster-1-hunger-games--90-000-kenyan-kids-just-lost-the-lottery";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-collegiate-circus--exploiting-youth-in-the-shadow-of-a-crumbling-empire.md": {
	id: "the-collegiate-circus--exploiting-youth-in-the-shadow-of-a-crumbling-empire.md";
  slug: "the-collegiate-circus--exploiting-youth-in-the-shadow-of-a-crumbling-empire";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-collegiate-meat-grinder--profits-over-prospects.md": {
	id: "the-collegiate-meat-grinder--profits-over-prospects.md";
  slug: "the-collegiate-meat-grinder--profits-over-prospects";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-collusion-compromise--epic-and-google-s-theater-of-artificial-competition.md": {
	id: "the-collusion-compromise--epic-and-google-s-theater-of-artificial-competition.md";
  slug: "the-collusion-compromise--epic-and-google-s-theater-of-artificial-competition";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-comedy-of-errors--why-the-njugush-wakavinye--fairy-tale--was-always-a-business-plan.md": {
	id: "the-comedy-of-errors--why-the-njugush-wakavinye--fairy-tale--was-always-a-business-plan.md";
  slug: "the-comedy-of-errors--why-the-njugush-wakavinye--fairy-tale--was-always-a-business-plan";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-commodified-calm--unmasking-the-luxury-of-the-sojourn.md": {
	id: "the-commodified-calm--unmasking-the-luxury-of-the-sojourn.md";
  slug: "the-commodified-calm--unmasking-the-luxury-of-the-sojourn";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-consent-illusion--how-digital-borders-standardize-global-surveillance.md": {
	id: "the-consent-illusion--how-digital-borders-standardize-global-surveillance.md";
  slug: "the-consent-illusion--how-digital-borders-standardize-global-surveillance";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-content-meat-grinder--hollywood-s-creative-bankruptcy-accelerates.md": {
	id: "the-content-meat-grinder--hollywood-s-creative-bankruptcy-accelerates.md";
  slug: "the-content-meat-grinder--hollywood-s-creative-bankruptcy-accelerates";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-corporate-calculus-of-leftover-humanity.md": {
	id: "the-corporate-calculus-of-leftover-humanity.md";
  slug: "the-corporate-calculus-of-leftover-humanity";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-cost-of-privacy-is-a-rounding-error--google-buys-silence-for--135-million.md": {
	id: "the-cost-of-privacy-is-a-rounding-error--google-buys-silence-for--135-million.md";
  slug: "the-cost-of-privacy-is-a-rounding-error--google-buys-silence-for--135-million";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-courtroom-drama-no-one-asked-for--david-mokaya-walks-while-the-police-fumble-the-bag.md": {
	id: "the-courtroom-drama-no-one-asked-for--david-mokaya-walks-while-the-police-fumble-the-bag.md";
  slug: "the-courtroom-drama-no-one-asked-for--david-mokaya-walks-while-the-police-fumble-the-bag";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-creek-is-stagnant--how-dawson-s-legacy-sold-narcissism-as-sensitivity.md": {
	id: "the-creek-is-stagnant--how-dawson-s-legacy-sold-narcissism-as-sensitivity.md";
  slug: "the-creek-is-stagnant--how-dawson-s-legacy-sold-narcissism-as-sensitivity";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-crown-is-dusty--kenya-moore-s-luxury-hair-spa-is-giving-luxury-eviction-instead.md": {
	id: "the-crown-is-dusty--kenya-moore-s-luxury-hair-spa-is-giving-luxury-eviction-instead.md";
  slug: "the-crown-is-dusty--kenya-moore-s-luxury-hair-spa-is-giving-luxury-eviction-instead";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-crude-reality-of-bitcoin-s-fragile-rebound.md": {
	id: "the-crude-reality-of-bitcoin-s-fragile-rebound.md";
  slug: "the-crude-reality-of-bitcoin-s-fragile-rebound";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-crude-reality-of-geopolitical-collapse.md": {
	id: "the-crude-reality-of-geopolitical-collapse.md";
  slug: "the-crude-reality-of-geopolitical-collapse";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-dark-underbelly-of-viral-ai-fruit-videos--predictable-misogyny-and-mindless-consumption.md": {
	id: "the-dark-underbelly-of-viral-ai-fruit-videos--predictable-misogyny-and-mindless-consumption.md";
  slug: "the-dark-underbelly-of-viral-ai-fruit-videos--predictable-misogyny-and-mindless-consumption";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-dark-underbelly-of-viral-ai-fruit-videos-exposed.md": {
	id: "the-dark-underbelly-of-viral-ai-fruit-videos-exposed.md";
  slug: "the-dark-underbelly-of-viral-ai-fruit-videos-exposed";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-dark-underbelly-of-viral-ai-fruit-videos-revealed.md": {
	id: "the-dark-underbelly-of-viral-ai-fruit-videos-revealed.md";
  slug: "the-dark-underbelly-of-viral-ai-fruit-videos-revealed";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-day-rapcha-descended-on-spiro.md": {
	id: "the-day-rapcha-descended-on-spiro.md";
  slug: "rapcha-spiro-motors-battle";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-deadbeat-club--ruto-calls-a-meeting-for-neighbors-who-won-t-pay-their-bills.md": {
	id: "the-deadbeat-club--ruto-calls-a-meeting-for-neighbors-who-won-t-pay-their-bills.md";
  slug: "the-deadbeat-club--ruto-calls-a-meeting-for-neighbors-who-won-t-pay-their-bills";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-death-of-authenticity--why-nairobi-s-digital-elite-is-trading-influence-for-algorithms.md": {
	id: "the-death-of-authenticity--why-nairobi-s-digital-elite-is-trading-influence-for-algorithms.md";
  slug: "the-death-of-authenticity--why-nairobi-s-digital-elite-is-trading-influence-for-algorithms";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-death-of-honor--how-professionalism-killed-the-myth-of-the--gentleman-s-sport.md": {
	id: "the-death-of-honor--how-professionalism-killed-the-myth-of-the--gentleman-s-sport.md";
  slug: "the-death-of-honor--how-professionalism-killed-the-myth-of-the--gentleman-s-sport";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-death-of-stability-as-gold-bleeds-and-digital-speculation-surges.md": {
	id: "the-death-of-stability-as-gold-bleeds-and-digital-speculation-surges.md";
  slug: "the-death-of-stability-as-gold-bleeds-and-digital-speculation-surges";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-death-of-the-permissioned-world-and-the-rise-of-war-proof-capital.md": {
	id: "the-death-of-the-permissioned-world-and-the-rise-of-war-proof-capital.md";
  slug: "the-death-of-the-permissioned-world-and-the-rise-of-war-proof-capital";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-death-of-truth-in-silicon-valley-s-hallucination-engine.md": {
	id: "the-death-of-truth-in-silicon-valley-s-hallucination-engine.md";
  slug: "the-death-of-truth-in-silicon-valley-s-hallucination-engine";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-debt-saturated-mirage-of-digital-wealth.md": {
	id: "the-debt-saturated-mirage-of-digital-wealth.md";
  slug: "the-debt-saturated-mirage-of-digital-wealth";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-debt-trap-s-new-teeth--how-tariffs-are-strangling-the-dollar-s-dominance.md": {
	id: "the-debt-trap-s-new-teeth--how-tariffs-are-strangling-the-dollar-s-dominance.md";
  slug: "the-debt-trap-s-new-teeth--how-tariffs-are-strangling-the-dollar-s-dominance";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-decay-of-the-american-athletic-hegemony.md": {
	id: "the-decay-of-the-american-athletic-hegemony.md";
  slug: "the-decay-of-the-american-athletic-hegemony";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-delusion-of-indian-monetary-stability.md": {
	id: "the-delusion-of-indian-monetary-stability.md";
  slug: "the-delusion-of-indian-monetary-stability";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-desert-mirage-burns-while-global-supply-chains-bleed.md": {
	id: "the-desert-mirage-burns-while-global-supply-chains-bleed.md";
  slug: "the-desert-mirage-burns-while-global-supply-chains-bleed";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-desert-mirage-evaporates-leaving-golf-in-shambles.md": {
	id: "the-desert-mirage-evaporates-leaving-golf-in-shambles.md";
  slug: "the-desert-mirage-evaporates-leaving-golf-in-shambles";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-desert-mirage-implodes-as-globalism-catches-fire.md": {
	id: "the-desert-mirage-implodes-as-globalism-catches-fire.md";
  slug: "the-desert-mirage-implodes-as-globalism-catches-fire";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-desert-well-runs-dry-for-golf-s-mercenary-legion.md": {
	id: "the-desert-well-runs-dry-for-golf-s-mercenary-legion.md";
  slug: "the-desert-well-runs-dry-for-golf-s-mercenary-legion";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-desperate-alien-gambit-won-t-save-apple-s-mediocre-noir.md": {
	id: "the-desperate-alien-gambit-won-t-save-apple-s-mediocre-noir.md";
  slug: "the-desperate-alien-gambit-won-t-save-apple-s-mediocre-noir";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-desperate-anthropomorphism-of-dead-organic-matter.md": {
	id: "the-desperate-anthropomorphism-of-dead-organic-matter.md";
  slug: "the-desperate-anthropomorphism-of-dead-organic-matter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-desperation-of-the-sci-fi-pivot--why-sugar-season-2-is-a-warning.md": {
	id: "the-desperation-of-the-sci-fi-pivot--why-sugar-season-2-is-a-warning.md";
  slug: "the-desperation-of-the-sci-fi-pivot--why-sugar-season-2-is-a-warning";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-development-mirage--nigeria-as-the-guinea-pig-for-a-collapsing-global-order.md": {
	id: "the-development-mirage--nigeria-as-the-guinea-pig-for-a-collapsing-global-order.md";
  slug: "the-development-mirage--nigeria-as-the-guinea-pig-for-a-collapsing-global-order";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-digital-gold-myth-dissolves-in-the-heat-of-real-conflict.md": {
	id: "the-digital-gold-myth-dissolves-in-the-heat-of-real-conflict.md";
  slug: "the-digital-gold-myth-dissolves-in-the-heat-of-real-conflict";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-digital-graveyard-kenya-s-secret-war-against-ai-trauma.md": {
	id: "the-digital-graveyard-kenya-s-secret-war-against-ai-trauma.md";
  slug: "the-digital-graveyard-kenya-s-secret-war-against-ai-trauma";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-digital-nomad-s-sick-souvenir--nairobi-women-as-content.md": {
	id: "the-digital-nomad-s-sick-souvenir--nairobi-women-as-content.md";
  slug: "the-digital-nomad-s-sick-souvenir--nairobi-women-as-content";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-digital-panopticon--data-sovereignty-as-a-corporate-myth.md": {
	id: "the-digital-panopticon--data-sovereignty-as-a-corporate-myth.md";
  slug: "the-digital-panopticon--data-sovereignty-as-a-corporate-myth";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-digital-panopticon-enters-emerging-markets.md": {
	id: "the-digital-panopticon-enters-emerging-markets.md";
  slug: "the-digital-panopticon-enters-emerging-markets";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-digital-panopticon-s-glitch--google-strips-pixel-features-after-exposing-user-privacy.md": {
	id: "the-digital-panopticon-s-glitch--google-strips-pixel-features-after-exposing-user-privacy.md";
  slug: "the-digital-panopticon-s-glitch--google-strips-pixel-features-after-exposing-user-privacy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-digital-poultry-king--how-francis-muiruri-transformed-a-juja-plot-into-a-national-enterprise.md": {
	id: "the-digital-poultry-king--how-francis-muiruri-transformed-a-juja-plot-into-a-national-enterprise.md";
  slug: "the-digital-poultry-king--how-francis-muiruri-transformed-a-juja-plot-into-a-national-enterprise";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-digital-proletariat-kenya-s-invisible-backbone-of-global-ai.md": {
	id: "the-digital-proletariat-kenya-s-invisible-backbone-of-global-ai.md";
  slug: "the-digital-proletariat-kenya-s-invisible-backbone-of-global-ai";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-digital-puppet-show--how-human-vanity-ruined-the-first-ai-social-network.md": {
	id: "the-digital-puppet-show--how-human-vanity-ruined-the-first-ai-social-network.md";
  slug: "the-digital-puppet-show--how-human-vanity-ruined-the-first-ai-social-network";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-digital-shamba--your-data-is-the-new-cash-crop.md": {
	id: "the-digital-shamba--your-data-is-the-new-cash-crop.md";
  slug: "the-digital-shamba--your-data-is-the-new-cash-crop";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-disposable-bond--why-modern-relationships-are-engineered-to-fail.md": {
	id: "the-disposable-bond--why-modern-relationships-are-engineered-to-fail.md";
  slug: "the-disposable-bond--why-modern-relationships-are-engineered-to-fail";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-dji-romo-robovac-had-security-so-poor--this-man-remotely-accessed-thousands-of-them.md": {
	id: "the-dji-romo-robovac-had-security-so-poor--this-man-remotely-accessed-thousands-of-them.md";
  slug: "the-dji-romo-robovac-had-security-so-poor--this-man-remotely-accessed-thousands-of-them";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-dollar-bouquet-delusion--paying-a-premium-to-look-rich-while-going-broke.md": {
	id: "the-dollar-bouquet-delusion--paying-a-premium-to-look-rich-while-going-broke.md";
  slug: "the-dollar-bouquet-delusion--paying-a-premium-to-look-rich-while-going-broke";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-dollar-s-death-grip-on-a-fragmenting-world.md": {
	id: "the-dollar-s-death-grip-on-a-fragmenting-world.md";
  slug: "the-dollar-s-death-grip-on-a-fragmenting-world";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-dollar-s-death-rattle.md": {
	id: "the-dollar-s-death-rattle.md";
  slug: "the-dollar-s-death-rattle";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-door-to-door-deception--same-clowns--new-tents.md": {
	id: "the-door-to-door-deception--same-clowns--new-tents.md";
  slug: "the-door-to-door-deception--same-clowns--new-tents";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-dp-seat-is-just-a-musical-chair-for-the-elite.md": {
	id: "the-dp-seat-is-just-a-musical-chair-for-the-elite.md";
  slug: "the-dp-seat-is-just-a-musical-chair-for-the-elite";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-duopoly-s-handshake--how-epic-and-google-sold-out-the-open-android-dream.md": {
	id: "the-duopoly-s-handshake--how-epic-and-google-sold-out-the-open-android-dream.md";
  slug: "the-duopoly-s-handshake--how-epic-and-google-sold-out-the-open-android-dream";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-dynasty-death-match--same-script--new-mourners.md": {
	id: "the-dynasty-death-match--same-script--new-mourners.md";
  slug: "the-dynasty-death-match--same-script--new-mourners";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-eac-is-a-deadbeat-dad-with-a-grand-vision.md": {
	id: "the-eac-is-a-deadbeat-dad-with-a-grand-vision.md";
  slug: "the-eac-is-a-deadbeat-dad-with-a-grand-vision";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-eac-leadership-musical-chairs--same-circus--new-ringmaster.md": {
	id: "the-eac-leadership-musical-chairs--same-circus--new-ringmaster.md";
  slug: "the-eac-leadership-musical-chairs--same-circus--new-ringmaster";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-efficiency-meat-grinder--amazon-s-global-purge-begins.md": {
	id: "the-efficiency-meat-grinder--amazon-s-global-purge-begins.md";
  slug: "the-efficiency-meat-grinder--amazon-s-global-purge-begins";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-efficiency-trap--how-ai-engineered-the-perpetual-workday.md": {
	id: "the-efficiency-trap--how-ai-engineered-the-perpetual-workday.md";
  slug: "the-efficiency-trap--how-ai-engineered-the-perpetual-workday";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-empire-of-debt--dismantling-the-global-ponzi-scheme.md": {
	id: "the-empire-of-debt--dismantling-the-global-ponzi-scheme.md";
  slug: "the-empire-of-debt--dismantling-the-global-ponzi-scheme";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-end-of-the-alias--ai-is-coming-for-your-digital-double-life.md": {
	id: "the-end-of-the-alias--ai-is-coming-for-your-digital-double-life.md";
  slug: "the-end-of-the-alias--ai-is-coming-for-your-digital-double-life";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-enduring-legacy-of-casio-watches.md": {
	id: "the-enduring-legacy-of-casio-watches.md";
  slug: "the-enduring-legacy-of-casio-watches";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-energy-noose-tightens-as-global-governance-collapses.md": {
	id: "the-energy-noose-tightens-as-global-governance-collapses.md";
  slug: "the-energy-noose-tightens-as-global-governance-collapses";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-energy-ultimatum--global-tech-faces-fiscal-backlash-over-ai-power-demand.md": {
	id: "the-energy-ultimatum--global-tech-faces-fiscal-backlash-over-ai-power-demand.md";
  slug: "the-energy-ultimatum--global-tech-faces-fiscal-backlash-over-ai-power-demand";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-engineering-of-influence--how-advanced-packaging-design-is-reshaping-the-global-tech-and-retail-sectors.md": {
	id: "the-engineering-of-influence--how-advanced-packaging-design-is-reshaping-the-global-tech-and-retail-sectors.md";
  slug: "the-engineering-of-influence--how-advanced-packaging-design-is-reshaping-the-global-tech-and-retail-sectors";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-expensive-charade-of-global-athletic-supremacy.md": {
	id: "the-expensive-charade-of-global-athletic-supremacy.md";
  slug: "the-expensive-charade-of-global-athletic-supremacy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-export-of-american-amateur-tragedy.md": {
	id: "the-export-of-american-amateur-tragedy.md";
  slug: "the-export-of-american-amateur-tragedy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-false-choice-of-central-bank-mandates.md": {
	id: "the-false-choice-of-central-bank-mandates.md";
  slug: "the-false-choice-of-central-bank-mandates";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-faux-war-on-corruption--a-critical-examination-of-african-leadership.md": {
	id: "the-faux-war-on-corruption--a-critical-examination-of-african-leadership.md";
  slug: "the-faux-war-on-corruption--a-critical-examination-of-african-leadership";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-fifteen-percent-tax-on-global-sanity.md": {
	id: "the-fifteen-percent-tax-on-global-sanity.md";
  slug: "the-fifteen-percent-tax-on-global-sanity";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-financialization-of-fear--engineering-safety-for-the-fragile-global-investor.md": {
	id: "the-financialization-of-fear--engineering-safety-for-the-fragile-global-investor.md";
  slug: "the-financialization-of-fear--engineering-safety-for-the-fragile-global-investor";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-four-hearted-kenyan--shif-s-sh445-million-miracle.md": {
	id: "the-four-hearted-kenyan--shif-s-sh445-million-miracle.md";
  slug: "the-four-hearted-kenyan--shif-s-sh445-million-miracle";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-fragile-elephant-chokes-on-expensive-oil.md": {
	id: "the-fragile-elephant-chokes-on-expensive-oil.md";
  slug: "the-fragile-elephant-chokes-on-expensive-oil";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-fragile-illusion-of-a-two-week-peace.md": {
	id: "the-fragile-illusion-of-a-two-week-peace.md";
  slug: "the-fragile-illusion-of-a-two-week-peace";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-fragile-illusion-of-global-liquidity.md": {
	id: "the-fragile-illusion-of-global-liquidity.md";
  slug: "the-fragile-illusion-of-global-liquidity";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-fragility-of-emerging-empires.md": {
	id: "the-fragility-of-emerging-empires.md";
  slug: "the-fragility-of-emerging-empires";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-gavel-meets-the-rungus--maraga-s-reality-check.md": {
	id: "the-gavel-meets-the-rungus--maraga-s-reality-check.md";
  slug: "the-gavel-meets-the-rungus--maraga-s-reality-check";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-geopolitical-guillotine-awaits-india-s-fragile-ambitions.md": {
	id: "the-geopolitical-guillotine-awaits-india-s-fragile-ambitions.md";
  slug: "the-geopolitical-guillotine-awaits-india-s-fragile-ambitions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-ghost-in-the-ledger-how-private-equity-is-cannibalizing-the-african-commons.md": {
	id: "the-ghost-in-the-ledger-how-private-equity-is-cannibalizing-the-african-commons.md";
  slug: "the-ghost-in-the-ledger-how-private-equity-is-cannibalizing-the-african-commons";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-gilded-cage-of-american-soccer.md": {
	id: "the-gilded-cage-of-american-soccer.md";
  slug: "the-gilded-cage-of-american-soccer";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-gilded-coffin-of-western-hegemony.md": {
	id: "the-gilded-coffin-of-western-hegemony.md";
  slug: "the-gilded-coffin-of-western-hegemony";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-gimmick-of-the-extra-terrestrial-noir--why--sugar--season-2-is-a-symptom-of-creative-exhaustion.md": {
	id: "the-gimmick-of-the-extra-terrestrial-noir--why--sugar--season-2-is-a-symptom-of-creative-exhaustion.md";
  slug: "the-gimmick-of-the-extra-terrestrial-noir--why--sugar--season-2-is-a-symptom-of-creative-exhaustion";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-give-to-gain-delusion--why-nairobi-s-glass-ceiling-is-made-of-reinforced-concrete.md": {
	id: "the-give-to-gain-delusion--why-nairobi-s-glass-ceiling-is-made-of-reinforced-concrete.md";
  slug: "the-give-to-gain-delusion--why-nairobi-s-glass-ceiling-is-made-of-reinforced-concrete";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-gladiatorial-state-and-the-death-of-diplomacy.md": {
	id: "the-gladiatorial-state-and-the-death-of-diplomacy.md";
  slug: "the-gladiatorial-state-and-the-death-of-diplomacy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-global-distraction-factory--why-modern-media-is-a-terminal-regression.md": {
	id: "the-global-distraction-factory--why-modern-media-is-a-terminal-regression.md";
  slug: "the-global-distraction-factory--why-modern-media-is-a-terminal-regression";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-global-export-of-american-barbarism.md": {
	id: "the-global-export-of-american-barbarism.md";
  slug: "the-global-export-of-american-barbarism";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-global-export-of-american-narcissism-and-the-death-of-the-hero.md": {
	id: "the-global-export-of-american-narcissism-and-the-death-of-the-hero.md";
  slug: "the-global-export-of-american-narcissism-and-the-death-of-the-hero";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-global-export-of-financial-suicide.md": {
	id: "the-global-export-of-financial-suicide.md";
  slug: "the-global-export-of-financial-suicide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-global-guillotine--wealth-taxes-and-the-mirage-of-emerging-markets.md": {
	id: "the-global-guillotine--wealth-taxes-and-the-mirage-of-emerging-markets.md";
  slug: "the-global-guillotine--wealth-taxes-and-the-mirage-of-emerging-markets";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-global-hall-of-mirrors--why-ai-is-a-death-sentence-for-truth.md": {
	id: "the-global-hall-of-mirrors--why-ai-is-a-death-sentence-for-truth.md";
  slug: "the-global-hall-of-mirrors--why-ai-is-a-death-sentence-for-truth";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-global-meat-grinder--march-madness-and-the-illusion-of-amateurism.md": {
	id: "the-global-meat-grinder--march-madness-and-the-illusion-of-amateurism.md";
  slug: "the-global-meat-grinder--march-madness-and-the-illusion-of-amateurism";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-global-monopoly-of-recycled-mediocrity.md": {
	id: "the-global-monopoly-of-recycled-mediocrity.md";
  slug: "the-global-monopoly-of-recycled-mediocrity";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-global-order-is-dying-and-we-are-paying-for-the-funeral.md": {
	id: "the-global-order-is-dying-and-we-are-paying-for-the-funeral.md";
  slug: "the-global-order-is-dying-and-we-are-paying-for-the-funeral";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-global-order-s-terminal-atrophy.md": {
	id: "the-global-order-s-terminal-atrophy.md";
  slug: "the-global-order-s-terminal-atrophy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-global-scapegoat--energy-wars-and-the-death-of-the-middle-class.md": {
	id: "the-global-scapegoat--energy-wars-and-the-death-of-the-middle-class.md";
  slug: "the-global-scapegoat--energy-wars-and-the-death-of-the-middle-class";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-globalization-of-organized-trauma.md": {
	id: "the-globalization-of-organized-trauma.md";
  slug: "the-globalization-of-organized-trauma";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-golden-anchor-drags-the-global-economy-down.md": {
	id: "the-golden-anchor-drags-the-global-economy-down.md";
  slug: "the-golden-anchor-drags-the-global-economy-down";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-golden-funeral-of-transatlantic-diplomacy.md": {
	id: "the-golden-funeral-of-transatlantic-diplomacy.md";
  slug: "the-golden-funeral-of-transatlantic-diplomacy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-golden-graveyard--how-de-dollarization-is-burying-the-old-world-order.md": {
	id: "the-golden-graveyard--how-de-dollarization-is-burying-the-old-world-order.md";
  slug: "the-golden-graveyard--how-de-dollarization-is-burying-the-old-world-order";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-golden-illusion-shatters-under-geopolitical-pressure.md": {
	id: "the-golden-illusion-shatters-under-geopolitical-pressure.md";
  slug: "the-golden-illusion-shatters-under-geopolitical-pressure";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-golden-years-are-rusty--why-kenya-s-retirees-are-just-surviving.md": {
	id: "the-golden-years-are-rusty--why-kenya-s-retirees-are-just-surviving.md";
  slug: "the-golden-years-are-rusty--why-kenya-s-retirees-are-just-surviving";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-great-by-election-charade--uda-wins-a-race-against-nobody.md": {
	id: "the-great-by-election-charade--uda-wins-a-race-against-nobody.md";
  slug: "the-great-by-election-charade--uda-wins-a-race-against-nobody";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-great-consolidation-why-your-vanishing-middle-class-is-a-feature-not-a-bug.md": {
	id: "the-great-consolidation-why-your-vanishing-middle-class-is-a-feature-not-a-bug.md";
  slug: "the-great-consolidation-why-your-vanishing-middle-class-is-a-feature-not-a-bug";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-great-decentralization--generative-ai-and-the-erosion-of-cultural-gatekeepers.md": {
	id: "the-great-decentralization--generative-ai-and-the-erosion-of-cultural-gatekeepers.md";
  slug: "the-great-decentralization--generative-ai-and-the-erosion-of-cultural-gatekeepers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-great-decoupling-how-the-weaponization-of-the-dollar-birthed-a-new-financial-underground.md": {
	id: "the-great-decoupling-how-the-weaponization-of-the-dollar-birthed-a-new-financial-underground.md";
  slug: "the-great-decoupling-how-the-weaponization-of-the-dollar-birthed-a-new-financial-underground";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-great-disconnect--why-celebrity-paywalls-and-elitist-digital-clubs-failed-the-kenyan-youth.md": {
	id: "the-great-disconnect--why-celebrity-paywalls-and-elitist-digital-clubs-failed-the-kenyan-youth.md";
  slug: "the-great-disconnect--why-celebrity-paywalls-and-elitist-digital-clubs-failed-the-kenyan-youth";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-great-divorce--why-global-unity-is-a-marketing-scam.md": {
	id: "the-great-divorce--why-global-unity-is-a-marketing-scam.md";
  slug: "the-great-divorce--why-global-unity-is-a-marketing-scam";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-great-gazetted-recycle--why--continuity--is-just-code-for-state-capture.md": {
	id: "the-great-gazetted-recycle--why--continuity--is-just-code-for-state-capture.md";
  slug: "the-great-gazetted-recycle--why--continuity--is-just-code-for-state-capture";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-great-government-heist--when-your-impounded-bike-becomes-the-inspector-s-side-hustle.md": {
	id: "the-great-government-heist--when-your-impounded-bike-becomes-the-inspector-s-side-hustle.md";
  slug: "the-great-government-heist--when-your-impounded-bike-becomes-the-inspector-s-side-hustle";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-great-green-wall-of-bureaucracy-policy-failure.md": {
	id: "the-great-green-wall-of-bureaucracy-policy-failure.md";
  slug: "the-great-green-wall-of-bureaucracy-policy-failure";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-great-institutional-pivot--why-your-paycheck-is-a-secondary-concern-for-global-technocrats.md": {
	id: "the-great-institutional-pivot--why-your-paycheck-is-a-secondary-concern-for-global-technocrats.md";
  slug: "the-great-institutional-pivot--why-your-paycheck-is-a-secondary-concern-for-global-technocrats";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-great-maritime-consolidation.md": {
	id: "the-great-maritime-consolidation.md";
  slug: "the-great-maritime-consolidation";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-great-monetary-delusion--sacrificing-stability-for-political-survival.md": {
	id: "the-great-monetary-delusion--sacrificing-stability-for-political-survival.md";
  slug: "the-great-monetary-delusion--sacrificing-stability-for-political-survival";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-great-political-con--why--friendly-fire--is-just-code-for-more-eating.md": {
	id: "the-great-political-con--why--friendly-fire--is-just-code-for-more-eating.md";
  slug: "the-great-political-con--why--friendly-fire--is-just-code-for-more-eating";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-great-russian-ghost--why-our--urgency--is-just-hot-air.md": {
	id: "the-great-russian-ghost--why-our--urgency--is-just-hot-air.md";
  slug: "the-great-russian-ghost--why-our--urgency--is-just-hot-air";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-great-shamba-scam--why-kenyan-farmers-are-destined-to-fail.md": {
	id: "the-great-shamba-scam--why-kenyan-farmers-are-destined-to-fail.md";
  slug: "the-great-shamba-scam--why-kenyan-farmers-are-destined-to-fail";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-great-spiritual-grift--from-seed-money-to-political-puppets.md": {
	id: "the-great-spiritual-grift--from-seed-money-to-political-puppets.md";
  slug: "the-great-spiritual-grift--from-seed-money-to-political-puppets";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-great-tech-divergence--why-bureaucracy-lost-the-race-for-the-future.md": {
	id: "the-great-tech-divergence--why-bureaucracy-lost-the-race-for-the-future.md";
  slug: "the-great-tech-divergence--why-bureaucracy-lost-the-race-for-the-future";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-great-tiktok-takedown--why-our-leaders-are-suddenly-terrified-of-your-for-you-page.md": {
	id: "the-great-tiktok-takedown--why-our-leaders-are-suddenly-terrified-of-your-for-you-page.md";
  slug: "the-great-tiktok-takedown--why-our-leaders-are-suddenly-terrified-of-your-for-you-page";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-great-trek-to-nowhere--eric-omondi-s-486km-pr-stunt-for-a-dying-nation.md": {
	id: "the-great-trek-to-nowhere--eric-omondi-s-486km-pr-stunt-for-a-dying-nation.md";
  slug: "the-great-trek-to-nowhere--eric-omondi-s-486km-pr-stunt-for-a-dying-nation";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-great-uncoupling-the-quiet-death-of-the-unipolar-financial-order.md": {
	id: "the-great-uncoupling-the-quiet-death-of-the-unipolar-financial-order.md";
  slug: "the-great-uncoupling-the-quiet-death-of-the-unipolar-financial-order";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-green-colonization-kenya-s-silent-sacrifice-for-global-net-zero.md": {
	id: "the-green-colonization-kenya-s-silent-sacrifice-for-global-net-zero.md";
  slug: "the-green-colonization-kenya-s-silent-sacrifice-for-global-net-zero";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-green-fund-mirage--planting-promises-while-the-ground-stays-dry.md": {
	id: "the-green-fund-mirage--planting-promises-while-the-ground-stays-dry.md";
  slug: "the-green-fund-mirage--planting-promises-while-the-ground-stays-dry";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-green-guillotine-for-global-shipping.md": {
	id: "the-green-guillotine-for-global-shipping.md";
  slug: "the-green-guillotine-for-global-shipping";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-green-tax-squeeze.md": {
	id: "the-green-tax-squeeze.md";
  slug: "the-green-tax-squeeze";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-greenback-feeds-on-global-chaos.md": {
	id: "the-greenback-feeds-on-global-chaos.md";
  slug: "the-greenback-feeds-on-global-chaos";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-greenback-guillotine--global-markets-suffocate-under-american-hegemony.md": {
	id: "the-greenback-guillotine--global-markets-suffocate-under-american-hegemony.md";
  slug: "the-greenback-guillotine--global-markets-suffocate-under-american-hegemony";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-greenback-noose--central-banks-prepare-the-gallows.md": {
	id: "the-greenback-noose--central-banks-prepare-the-gallows.md";
  slug: "the-greenback-noose--central-banks-prepare-the-gallows";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-greenback-vampire-feeds-on-global-chaos.md": {
	id: "the-greenback-vampire-feeds-on-global-chaos.md";
  slug: "the-greenback-vampire-feeds-on-global-chaos";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-greenland-gambit--europe-bets-on-american-self-destruction-and-war-profits.md": {
	id: "the-greenland-gambit--europe-bets-on-american-self-destruction-and-war-profits.md";
  slug: "the-greenland-gambit--europe-bets-on-american-self-destruction-and-war-profits";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-greenland-gambit-and-the-devaluation-of-reality.md": {
	id: "the-greenland-gambit-and-the-devaluation-of-reality.md";
  slug: "the-greenland-gambit-and-the-devaluation-of-reality";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-greenland-gambit-and-the-slow-death-of-the-dollar.md": {
	id: "the-greenland-gambit-and-the-slow-death-of-the-dollar.md";
  slug: "the-greenland-gambit-and-the-slow-death-of-the-dollar";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-guitarist-ghost--nsikak-okon-david-and-the-art-of-making-stars-look-talented.md": {
	id: "the-guitarist-ghost--nsikak-okon-david-and-the-art-of-making-stars-look-talented.md";
  slug: "the-guitarist-ghost--nsikak-okon-david-and-the-art-of-making-stars-look-talented";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-hall-of-shame--why-the-nfl-s-moral-gatekeeping-is-a-fraud.md": {
	id: "the-hall-of-shame--why-the-nfl-s-moral-gatekeeping-is-a-fraud.md";
  slug: "the-hall-of-shame--why-the-nfl-s-moral-gatekeeping-is-a-fraud";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-hallucination-of-stability--markets-bet-on-cowardice-amidst-global-arson.md": {
	id: "the-hallucination-of-stability--markets-bet-on-cowardice-amidst-global-arson.md";
  slug: "the-hallucination-of-stability--markets-bet-on-cowardice-amidst-global-arson";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-hegemon-s-shadow-decoding-the-rise-of-the-american-world-police-and-africa-s-path-to-sovereignty.md": {
	id: "the-hegemon-s-shadow-decoding-the-rise-of-the-american-world-police-and-africa-s-path-to-sovereignty.md";
  slug: "the-hegemon-s-shadow-decoding-the-rise-of-the-american-world-police-and-africa-s-path-to-sovereignty";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-hegemony-tax--washington-sacrifices-domestic-stability-for-global-leverage.md": {
	id: "the-hegemony-tax--washington-sacrifices-domestic-stability-for-global-leverage.md";
  slug: "the-hegemony-tax--washington-sacrifices-domestic-stability-for-global-leverage";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-high-cost-of-staged-smiles-and-lakeside-revolutions.md": {
	id: "the-high-cost-of-staged-smiles-and-lakeside-revolutions.md";
  slug: "the-high-cost-of-staged-smiles-and-lakeside-revolutions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-high-frequency-hustle--why-you-re-paying--100-for-a-thigh-rash.md": {
	id: "the-high-frequency-hustle--why-you-re-paying--100-for-a-thigh-rash.md";
  slug: "the-high-frequency-hustle--why-you-re-paying--100-for-a-thigh-rash";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-high-price-of-a-tiktok-revolution--why-the-venezuela-invasion-is-a-corporate-trap.md": {
	id: "the-high-price-of-a-tiktok-revolution--why-the-venezuela-invasion-is-a-corporate-trap.md";
  slug: "the-high-price-of-a-tiktok-revolution--why-the-venezuela-invasion-is-a-corporate-trap";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-honorable-clout-chasers--why-parliament-s-tiktok-tantrum-is-a-total-flop.md": {
	id: "the-honorable-clout-chasers--why-parliament-s-tiktok-tantrum-is-a-total-flop.md";
  slug: "the-honorable-clout-chasers--why-parliament-s-tiktok-tantrum-is-a-total-flop";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-hottest-anti-ai-gadget-is-a-cyberdeck--a-potemkin-village-of-nostalgia.md": {
	id: "the-hottest-anti-ai-gadget-is-a-cyberdeck--a-potemkin-village-of-nostalgia.md";
  slug: "the-hottest-anti-ai-gadget-is-a-cyberdeck--a-potemkin-village-of-nostalgia";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-hustle-is-a-death-trap--selling-kenyans-to-the-russian-front.md": {
	id: "the-hustle-is-a-death-trap--selling-kenyans-to-the-russian-front.md";
  slug: "the-hustle-is-a-death-trap--selling-kenyans-to-the-russian-front";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-ice-is-bleeding-and-researchers-are-only-interested-in-the-chemistry-of-the-rust.md": {
	id: "the-ice-is-bleeding-and-researchers-are-only-interested-in-the-chemistry-of-the-rust.md";
  slug: "the-ice-is-bleeding-and-researchers-are-only-interested-in-the-chemistry-of-the-rust";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-illusion-of-appetite--us-debt-on-a-global-precipice.md": {
	id: "the-illusion-of-appetite--us-debt-on-a-global-precipice.md";
  slug: "the-illusion-of-appetite--us-debt-on-a-global-precipice";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-illusion-of-digital-safety--substack-s-data-leak-is-the-modern-tax-on-existence.md": {
	id: "the-illusion-of-digital-safety--substack-s-data-leak-is-the-modern-tax-on-existence.md";
  slug: "the-illusion-of-digital-safety--substack-s-data-leak-is-the-modern-tax-on-existence";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-illusion-of-independence-as-bitcoin-bows-to-crude.md": {
	id: "the-illusion-of-independence-as-bitcoin-bows-to-crude.md";
  slug: "the-illusion-of-independence-as-bitcoin-bows-to-crude";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-illusion-of-integrity--why-anti-cheat-is-just-another-revenue-protection-racket.md": {
	id: "the-illusion-of-integrity--why-anti-cheat-is-just-another-revenue-protection-racket.md";
  slug: "the-illusion-of-integrity--why-anti-cheat-is-just-another-revenue-protection-racket";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-illusion-of-meritocracy--why-professional-sports-is-just-financial-darwinism.md": {
	id: "the-illusion-of-meritocracy--why-professional-sports-is-just-financial-darwinism.md";
  slug: "the-illusion-of-meritocracy--why-professional-sports-is-just-financial-darwinism";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-illusion-of-protection--how-tariffs-erode-the-american-financial-fortress.md": {
	id: "the-illusion-of-protection--how-tariffs-erode-the-american-financial-fortress.md";
  slug: "the-illusion-of-protection--how-tariffs-erode-the-american-financial-fortress";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-illusion-of-recovery-in-a-choked-global-market.md": {
	id: "the-illusion-of-recovery-in-a-choked-global-market.md";
  slug: "the-illusion-of-recovery-in-a-choked-global-market";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-illusion-of-safety--engineering-the-death-of-real-market-risk.md": {
	id: "the-illusion-of-safety--engineering-the-death-of-real-market-risk.md";
  slug: "the-illusion-of-safety--engineering-the-death-of-real-market-risk";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-illusion-of-safety--engineering-the-next-financial-trap.md": {
	id: "the-illusion-of-safety--engineering-the-next-financial-trap.md";
  slug: "the-illusion-of-safety--engineering-the-next-financial-trap";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-illusion-of-the-digital-haven.md": {
	id: "the-illusion-of-the-digital-haven.md";
  slug: "the-illusion-of-the-digital-haven";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-illusion-of-wealth--how-forex-influencers-manipulate-nairobi-s-digital-economy---streamlinefeed-co-ke.md": {
	id: "the-illusion-of-wealth--how-forex-influencers-manipulate-nairobi-s-digital-economy---streamlinefeed-co-ke.md";
  slug: "the-illusion-of-wealth--how-forex-influencers-manipulate-nairobi-s-digital-economy---streamlinefeed-co-ke";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-imperial-fed-and-the--110-barrel-of-reality.md": {
	id: "the-imperial-fed-and-the--110-barrel-of-reality.md";
  slug: "the-imperial-fed-and-the--110-barrel-of-reality";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-importation-trap--why-your--dream-car--is-just-a-kra-donation-drive.md": {
	id: "the-importation-trap--why-your--dream-car--is-just-a-kra-donation-drive.md";
  slug: "the-importation-trap--why-your--dream-car--is-just-a-kra-donation-drive";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-industrial-suicide-of-geopolitical-incompetence.md": {
	id: "the-industrial-suicide-of-geopolitical-incompetence.md";
  slug: "the-industrial-suicide-of-geopolitical-incompetence";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-industrialization-of-addictive-poverty.md": {
	id: "the-industrialization-of-addictive-poverty.md";
  slug: "the-industrialization-of-addictive-poverty";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-industrialization-of-identity--how-global-ip-law-strangles-the-game.md": {
	id: "the-industrialization-of-identity--how-global-ip-law-strangles-the-game.md";
  slug: "the-industrialization-of-identity--how-global-ip-law-strangles-the-game";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-infinite-grind--how-ai-turns-efficiency-into-a-corporate-noose.md": {
	id: "the-infinite-grind--how-ai-turns-efficiency-into-a-corporate-noose.md";
  slug: "the-infinite-grind--how-ai-turns-efficiency-into-a-corporate-noose";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-infrastructure-of-expulsion--ice-uses-shutdown-chaos-to-cement-police-state-real-estate.md": {
	id: "the-infrastructure-of-expulsion--ice-uses-shutdown-chaos-to-cement-police-state-real-estate.md";
  slug: "the-infrastructure-of-expulsion--ice-uses-shutdown-chaos-to-cement-police-state-real-estate";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-institutional-decay-of-global-hegemony.md": {
	id: "the-institutional-decay-of-global-hegemony.md";
  slug: "the-institutional-decay-of-global-hegemony";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-invisible-chain-how-corporate-kenya-profits-from-modern-day-serfdom-in-private-security.md": {
	id: "the-invisible-chain-how-corporate-kenya-profits-from-modern-day-serfdom-in-private-security.md";
  slug: "the-invisible-chain-how-corporate-kenya-profits-from-modern-day-serfdom-in-private-security";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-iphone-smashing-circus--clout-is-the-new-currency-in-nairobi.md": {
	id: "the-iphone-smashing-circus--clout-is-the-new-currency-in-nairobi.md";
  slug: "the-iphone-smashing-circus--clout-is-the-new-currency-in-nairobi";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-jacaranda-ghost-dance--selling-parallel-dreams-to-empty-stomachs.md": {
	id: "the-jacaranda-ghost-dance--selling-parallel-dreams-to-empty-stomachs.md";
  slug: "the-jacaranda-ghost-dance--selling-parallel-dreams-to-empty-stomachs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-jet-set-ghost--why-filip-pronin-s-world-tour-is-the-messiest-performance-of-the-year.md": {
	id: "the-jet-set-ghost--why-filip-pronin-s-world-tour-is-the-messiest-performance-of-the-year.md";
  slug: "the-jet-set-ghost--why-filip-pronin-s-world-tour-is-the-messiest-performance-of-the-year";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-kabuki-carousel--why-kokuho-is-a-three-hour-monument-to-creative-exhaustion.md": {
	id: "the-kabuki-carousel--why-kokuho-is-a-three-hour-monument-to-creative-exhaustion.md";
  slug: "the-kabuki-carousel--why-kokuho-is-a-three-hour-monument-to-creative-exhaustion";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-kangemi-circus--16-classrooms-and-80-billion-reasons-to-stay-skeptical.md": {
	id: "the-kangemi-circus--16-classrooms-and-80-billion-reasons-to-stay-skeptical.md";
  slug: "the-kangemi-circus--16-classrooms-and-80-billion-reasons-to-stay-skeptical";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-karen-circus--why-the-magical-kenya-open-is-just-high-end-window-dressing.md": {
	id: "the-karen-circus--why-the-magical-kenya-open-is-just-high-end-window-dressing.md";
  slug: "the-karen-circus--why-the-magical-kenya-open-is-just-high-end-window-dressing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-keyboard-judge--why-your-social-media-receipts-are-the-ultimate-career-killer.md": {
	id: "the-keyboard-judge--why-your-social-media-receipts-are-the-ultimate-career-killer.md";
  slug: "the-keyboard-judge--why-your-social-media-receipts-are-the-ultimate-career-killer";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-king-s-boys-and-nanyuki-s-broken-dreams.md": {
	id: "the-king-s-boys-and-nanyuki-s-broken-dreams.md";
  slug: "the-king-s-boys-and-nanyuki-s-broken-dreams";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-kisumu-quarry-killings--why-four-brothers-died-for-corporate-profit.md": {
	id: "the-kisumu-quarry-killings--why-four-brothers-died-for-corporate-profit.md";
  slug: "the-kisumu-quarry-killings--why-four-brothers-died-for-corporate-profit";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-kitengela-bloodbath--new-year--same-old-rungus.md": {
	id: "the-kitengela-bloodbath--new-year--same-old-rungus.md";
  slug: "the-kitengela-bloodbath--new-year--same-old-rungus";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-law-enforcers-win-on-the-pitch-while-the-rest-of-us-lose-on-the-streets.md": {
	id: "the-law-enforcers-win-on-the-pitch-while-the-rest-of-us-lose-on-the-streets.md";
  slug: "the-law-enforcers-win-on-the-pitch-while-the-rest-of-us-lose-on-the-streets";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-line-makes-a-splash-for-i-m-a-celebrity--south-africa--all-stars-promo--but-is-it-anything-new.md": {
	id: "the-line-makes-a-splash-for-i-m-a-celebrity--south-africa--all-stars-promo--but-is-it-anything-new.md";
  slug: "the-line-makes-a-splash-for-i-m-a-celebrity--south-africa--all-stars-promo--but-is-it-anything-new";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-liquidity-guillotine--global-margin-calls-trigger-the-race-to-zero.md": {
	id: "the-liquidity-guillotine--global-margin-calls-trigger-the-race-to-zero.md";
  slug: "the-liquidity-guillotine--global-margin-calls-trigger-the-race-to-zero";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-liquidity-illusion--why-your-digital-gold-is-choking-on-us-debt.md": {
	id: "the-liquidity-illusion--why-your-digital-gold-is-choking-on-us-debt.md";
  slug: "the-liquidity-illusion--why-your-digital-gold-is-choking-on-us-debt";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-luxury-of-hitting-rock-bottom.md": {
	id: "the-luxury-of-hitting-rock-bottom.md";
  slug: "the-luxury-of-hitting-rock-bottom";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-makupa-connection--recovering-the-isuzu-ghost-fleet-of-gatanga.md": {
	id: "the-makupa-connection--recovering-the-isuzu-ghost-fleet-of-gatanga.md";
  slug: "the-makupa-connection--recovering-the-isuzu-ghost-fleet-of-gatanga";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-managed-decay-of-an-american-industrial-corpse.md": {
	id: "the-managed-decay-of-an-american-industrial-corpse.md";
  slug: "the-managed-decay-of-an-american-industrial-corpse";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-managed-decay-of-europe--lagarde-s-mission-of-denial.md": {
	id: "the-managed-decay-of-europe--lagarde-s-mission-of-denial.md";
  slug: "the-managed-decay-of-europe--lagarde-s-mission-of-denial";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-mandalorian-and-grogu--likely-rehashes-eu-villain--proving-hollywood-s-creative-bankruptcy.md": {
	id: "the-mandalorian-and-grogu--likely-rehashes-eu-villain--proving-hollywood-s-creative-bankruptcy.md";
  slug: "the-mandalorian-and-grogu--likely-rehashes-eu-villain--proving-hollywood-s-creative-bankruptcy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-mandalorian-and-grogu--likely-rehashes-eu-villain-to-rehash-profit.md": {
	id: "the-mandalorian-and-grogu--likely-rehashes-eu-villain-to-rehash-profit.md";
  slug: "the-mandalorian-and-grogu--likely-rehashes-eu-villain-to-rehash-profit";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-mandalorian-and-grogu--to-rehash-eu-villain-tropes--further-diluting-canon.md": {
	id: "the-mandalorian-and-grogu--to-rehash-eu-villain-tropes--further-diluting-canon.md";
  slug: "the-mandalorian-and-grogu--to-rehash-eu-villain-tropes--further-diluting-canon";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-mandera-mirage--opening-borders-or-inviting-chaos.md": {
	id: "the-mandera-mirage--opening-borders-or-inviting-chaos.md";
  slug: "the-mandera-mirage--opening-borders-or-inviting-chaos";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-mandera-mirage--trading-blood-for-miraa.md": {
	id: "the-mandera-mirage--trading-blood-for-miraa.md";
  slug: "the-mandera-mirage--trading-blood-for-miraa";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-mandera-pr-circus--big-words--small-checks--and-the-usual-script.md": {
	id: "the-mandera-pr-circus--big-words--small-checks--and-the-usual-script.md";
  slug: "the-mandera-pr-circus--big-words--small-checks--and-the-usual-script";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-manufactured-edge-of-pixar-s-corporate-rebellion.md": {
	id: "the-manufactured-edge-of-pixar-s-corporate-rebellion.md";
  slug: "the-manufactured-edge-of-pixar-s-corporate-rebellion";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-march-7-expiry--another-day--another-political-scam.md": {
	id: "the-march-7-expiry--another-day--another-political-scam.md";
  slug: "the-march-7-expiry--another-day--another-political-scam";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-meat-grinder--why-the-weekend-s-sporting-spectacle-is-a-fraud.md": {
	id: "the-meat-grinder--why-the-weekend-s-sporting-spectacle-is-a-fraud.md";
  slug: "the-meat-grinder--why-the-weekend-s-sporting-spectacle-is-a-fraud";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-mediterranean-theater-of-managed-decline.md": {
	id: "the-mediterranean-theater-of-managed-decline.md";
  slug: "the-mediterranean-theater-of-managed-decline";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-mercenary-in-the-kiss-and-cry--beno-t-richaud-and-the-death-of-sporting-loyalty.md": {
	id: "the-mercenary-in-the-kiss-and-cry--beno-t-richaud-and-the-death-of-sporting-loyalty.md";
  slug: "the-mercenary-in-the-kiss-and-cry--beno-t-richaud-and-the-death-of-sporting-loyalty";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-messi-circus--selling-out-the-soul-of-american-soccer.md": {
	id: "the-messi-circus--selling-out-the-soul-of-american-soccer.md";
  slug: "the-messi-circus--selling-out-the-soul-of-american-soccer";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-metaphysical-heist-why-arsenal-s-premier-league-ambitions-are-statistically-impossible.md": {
	id: "the-metaphysical-heist-why-arsenal-s-premier-league-ambitions-are-statistically-impossible.md";
  slug: "the-metaphysical-heist-why-arsenal-s-premier-league-ambitions-are-statistically-impossible";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-middle-east-meat-grinder-meets-your-grocery-bill.md": {
	id: "the-middle-east-meat-grinder-meets-your-grocery-bill.md";
  slug: "the-middle-east-meat-grinder-meets-your-grocery-bill";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-milk-closing-festival--are-we-being-milked-for-the-same-old-amapiano-drama.md": {
	id: "the-milk-closing-festival--are-we-being-milked-for-the-same-old-amapiano-drama.md";
  slug: "the-milk-closing-festival--are-we-being-milked-for-the-same-old-amapiano-drama";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-mirage-of-excellence-in-a-decaying-global-arena.md": {
	id: "the-mirage-of-excellence-in-a-decaying-global-arena.md";
  slug: "the-mirage-of-excellence-in-a-decaying-global-arena";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-mirage-of-growth--crude-reality-stings-the-sensex.md": {
	id: "the-mirage-of-growth--crude-reality-stings-the-sensex.md";
  slug: "the-mirage-of-growth--crude-reality-stings-the-sensex";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-mirage-of-indian-stability-in-a-fracturing-global-order.md": {
	id: "the-mirage-of-indian-stability-in-a-fracturing-global-order.md";
  slug: "the-mirage-of-indian-stability-in-a-fracturing-global-order";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-mirage-of-stability-dissolves-in-oil-and-debt.md": {
	id: "the-mirage-of-stability-dissolves-in-oil-and-debt.md";
  slug: "the-mirage-of-stability-dissolves-in-oil-and-debt";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-molten-price-of-permanent-war.md": {
	id: "the-molten-price-of-permanent-war.md";
  slug: "the-molten-price-of-permanent-war";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-mon-valley-s-new-imperial-masters.md": {
	id: "the-mon-valley-s-new-imperial-masters.md";
  slug: "the-mon-valley-s-new-imperial-masters";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-monopoly-of-blood--how-tko-and-riyadh-are-dismantling-the-last-bastion-of-athlete-labor.md": {
	id: "the-monopoly-of-blood--how-tko-and-riyadh-are-dismantling-the-last-bastion-of-athlete-labor.md";
  slug: "the-monopoly-of-blood--how-tko-and-riyadh-are-dismantling-the-last-bastion-of-athlete-labor";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-mountain-of-lies--wamuchomba-s-sudden-epiphany-and-the-paid-crowd-circus.md": {
	id: "the-mountain-of-lies--wamuchomba-s-sudden-epiphany-and-the-paid-crowd-circus.md";
  slug: "the-mountain-of-lies--wamuchomba-s-sudden-epiphany-and-the-paid-crowd-circus";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-mugabe-dynasty-s-last-export--bullet-shells-and-bloodshed-in-joburg.md": {
	id: "the-mugabe-dynasty-s-last-export--bullet-shells-and-bloodshed-in-joburg.md";
  slug: "the-mugabe-dynasty-s-last-export--bullet-shells-and-bloodshed-in-joburg";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-mulembe-suicide-pact-and-the-runda-escape-hatch.md": {
	id: "the-mulembe-suicide-pact-and-the-runda-escape-hatch.md";
  slug: "the-mulembe-suicide-pact-and-the-runda-escape-hatch";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-mutuini-photo-op--400-beds-and-a-million-broken-promises.md": {
	id: "the-mutuini-photo-op--400-beds-and-a-million-broken-promises.md";
  slug: "the-mutuini-photo-op--400-beds-and-a-million-broken-promises";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-mwisho-wa-lami-debt-crisis--mwalimu-andrew-navigates-shylocks-and-police-cells-to-rescue-fiolina.md": {
	id: "the-mwisho-wa-lami-debt-crisis--mwalimu-andrew-navigates-shylocks-and-police-cells-to-rescue-fiolina.md";
  slug: "the-mwisho-wa-lami-debt-crisis--mwalimu-andrew-navigates-shylocks-and-police-cells-to-rescue-fiolina";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-mystery-man-who-facilitated-andrew-s-descent-with-epstein.md": {
	id: "the-mystery-man-who-facilitated-andrew-s-descent-with-epstein.md";
  slug: "the-mystery-man-who-facilitated-andrew-s-descent-with-epstein";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-myth-of-the-crypto-hedge-burned-by-global-choke-points.md": {
	id: "the-myth-of-the-crypto-hedge-burned-by-global-choke-points.md";
  slug: "the-myth-of-the-crypto-hedge-burned-by-global-choke-points";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-myth-of-the-digital-safe-haven.md": {
	id: "the-myth-of-the-digital-safe-haven.md";
  slug: "the-myth-of-the-digital-safe-haven";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-myth-of-the-unstoppable-rupee.md": {
	id: "the-myth-of-the-unstoppable-rupee.md";
  slug: "the-myth-of-the-unstoppable-rupee";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-mzungu-dream-is-just-a-low-budget-horror-movie-in-nairobi.md": {
	id: "the-mzungu-dream-is-just-a-low-budget-horror-movie-in-nairobi.md";
  slug: "the-mzungu-dream-is-just-a-low-budget-horror-movie-in-nairobi";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-nairobi-hustle-is-just-a-digital-graveyard.md": {
	id: "the-nairobi-hustle-is-just-a-digital-graveyard.md";
  slug: "the-nairobi-hustle-is-just-a-digital-graveyard";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-nairobi-math--how-to--walk--500km-without-losing-your-breath.md": {
	id: "the-nairobi-math--how-to--walk--500km-without-losing-your-breath.md";
  slug: "the-nairobi-math--how-to--walk--500km-without-losing-your-breath";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-narcissism-of-the-post-victory-hijack.md": {
	id: "the-narcissism-of-the-post-victory-hijack.md";
  slug: "the-narcissism-of-the-post-victory-hijack";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-narcissist-s-podium--personal-brand-management-as-the-new-olympic-standard.md": {
	id: "the-narcissist-s-podium--personal-brand-management-as-the-new-olympic-standard.md";
  slug: "the-narcissist-s-podium--personal-brand-management-as-the-new-olympic-standard";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-ngara-mirage--why-nairobi-sisters-need-to-stop-chasing-mzungu-ghosts.md": {
	id: "the-ngara-mirage--why-nairobi-sisters-need-to-stop-chasing-mzungu-ghosts.md";
  slug: "the-ngara-mirage--why-nairobi-sisters-need-to-stop-chasing-mzungu-ghosts";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-nobel-peace-prize-facade-collapses-under-epstein-corruption-probe.md": {
	id: "the-nobel-peace-prize-facade-collapses-under-epstein-corruption-probe.md";
  slug: "the-nobel-peace-prize-facade-collapses-under-epstein-corruption-probe";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-nobel-rot--why-norway-s-moral-high-ground-is-a-sinking-ship.md": {
	id: "the-nobel-rot--why-norway-s-moral-high-ground-is-a-sinking-ship.md";
  slug: "the-nobel-rot--why-norway-s-moral-high-ground-is-a-sinking-ship";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-nobility-of-the-lie--why-egg-s-deception-is-just-another-targaryen-power-play.md": {
	id: "the-nobility-of-the-lie--why-egg-s-deception-is-just-another-targaryen-power-play.md";
  slug: "the-nobility-of-the-lie--why-egg-s-deception-is-just-another-targaryen-power-play";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-oil-guillotine-ends-india-s-growth-fantasy.md": {
	id: "the-oil-guillotine-ends-india-s-growth-fantasy.md";
  slug: "the-oil-guillotine-ends-india-s-growth-fantasy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-oil-noose-tightens-around-a-delusional-global-economy.md": {
	id: "the-oil-noose-tightens-around-a-delusional-global-economy.md";
  slug: "the-oil-noose-tightens-around-a-delusional-global-economy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-olympic-podium-as-a-pr-confessional--laegreid-s-calculated-narcissism.md": {
	id: "the-olympic-podium-as-a-pr-confessional--laegreid-s-calculated-narcissism.md";
  slug: "the-olympic-podium-as-a-pr-confessional--laegreid-s-calculated-narcissism";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-only-thing-dead-in-this-hearse-is-our-dignity.md": {
	id: "the-only-thing-dead-in-this-hearse-is-our-dignity.md";
  slug: "the-only-thing-dead-in-this-hearse-is-our-dignity";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-orange-divorce--inside-the-civil-war-threatening-to-sink-odm.md": {
	id: "the-orange-divorce--inside-the-civil-war-threatening-to-sink-odm.md";
  slug: "the-orange-divorce--inside-the-civil-war-threatening-to-sink-odm";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-orange-peels-off--why--linda-mwananchi--is-just-the-latest-political-rebrand.md": {
	id: "the-orange-peels-off--why--linda-mwananchi--is-just-the-latest-political-rebrand.md";
  slug: "the-orange-peels-off--why--linda-mwananchi--is-just-the-latest-political-rebrand";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-oratory-trap--why-sifuna-s-stories-won-t-fill-your-plate.md": {
	id: "the-oratory-trap--why-sifuna-s-stories-won-t-fill-your-plate.md";
  slug: "the-oratory-trap--why-sifuna-s-stories-won-t-fill-your-plate";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-ozempic-cartels--why-your-pursuit-of-a-cheap-miracle-just-hit-a-legal-wall.md": {
	id: "the-ozempic-cartels--why-your-pursuit-of-a-cheap-miracle-just-hit-a-legal-wall.md";
  slug: "the-ozempic-cartels--why-your-pursuit-of-a-cheap-miracle-just-hit-a-legal-wall";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-pan-african-traveling-salesman--ruto-s-addis-rebrand-while-the-house-is-on-fire.md": {
	id: "the-pan-african-traveling-salesman--ruto-s-addis-rebrand-while-the-house-is-on-fire.md";
  slug: "the-pan-african-traveling-salesman--ruto-s-addis-rebrand-while-the-house-is-on-fire";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-panopticon-s-expansion--why-your-ethics-are-irrelevant-to-the-machine.md": {
	id: "the-panopticon-s-expansion--why-your-ethics-are-irrelevant-to-the-machine.md";
  slug: "the-panopticon-s-expansion--why-your-ethics-are-irrelevant-to-the-machine";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-paper-shield--why-the-pro-human-ai-alliance-is-a-toothless-pr-stunt.md": {
	id: "the-paper-shield--why-the-pro-human-ai-alliance-is-a-toothless-pr-stunt.md";
  slug: "the-paper-shield--why-the-pro-human-ai-alliance-is-a-toothless-pr-stunt";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-parliament-sticker--your-vip-permit-to-kill-and-keep-partying.md": {
	id: "the-parliament-sticker--your-vip-permit-to-kill-and-keep-partying.md";
  slug: "the-parliament-sticker--your-vip-permit-to-kill-and-keep-partying";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-performative-outrage-trap--why-the-trump-bad-bunny-circus-is-a-distraction-we-can-t-afford.md": {
	id: "the-performative-outrage-trap--why-the-trump-bad-bunny-circus-is-a-distraction-we-can-t-afford.md";
  slug: "the-performative-outrage-trap--why-the-trump-bad-bunny-circus-is-a-distraction-we-can-t-afford";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-perpetual-arms-race-of-digital-vanity.md": {
	id: "the-perpetual-arms-race-of-digital-vanity.md";
  slug: "the-perpetual-arms-race-of-digital-vanity";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-petro-illusion--why-global-conflict-only-enriches-the-few-while-starving-the-many.md": {
	id: "the-petro-illusion--why-global-conflict-only-enriches-the-few-while-starving-the-many.md";
  slug: "the-petro-illusion--why-global-conflict-only-enriches-the-few-while-starving-the-many";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-petro-shield-is-dead--global-energy-chaos-and-the-death-of-the-cushion.md": {
	id: "the-petro-shield-is-dead--global-energy-chaos-and-the-death-of-the-cushion.md";
  slug: "the-petro-shield-is-dead--global-energy-chaos-and-the-death-of-the-cushion";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-petrodollar-mirage-meets-the-persian-firestorm.md": {
	id: "the-petrodollar-mirage-meets-the-persian-firestorm.md";
  slug: "the-petrodollar-mirage-meets-the-persian-firestorm";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-petroleum-guillotine-and-the-feds-eternal-interregnum.md": {
	id: "the-petroleum-guillotine-and-the-feds-eternal-interregnum.md";
  slug: "the-petroleum-guillotine-and-the-feds-eternal-interregnum";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-petroleum-noose-tightens-on-new-delhi.md": {
	id: "the-petroleum-noose-tightens-on-new-delhi.md";
  slug: "the-petroleum-noose-tightens-on-new-delhi";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-petroleum-shackle-on-digital-dreams.md": {
	id: "the-petroleum-shackle-on-digital-dreams.md";
  slug: "the-petroleum-shackle-on-digital-dreams";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-pok-mon-firered-and-leafgreen-switch-re-release-is-already-topping-the-eshop-charts--even-as-nintendo-mysteriously-removes-mention-of-home-compatibility.md": {
	id: "the-pok-mon-firered-and-leafgreen-switch-re-release-is-already-topping-the-eshop-charts--even-as-nintendo-mysteriously-removes-mention-of-home-compatibility.md";
  slug: "the-pok-mon-firered-and-leafgreen-switch-re-release-is-already-topping-the-eshop-charts--even-as-nintendo-mysteriously-removes-mention-of-home-compatibility";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-police-justice-circus--step-right-up-and-watch-the-files-disappear.md": {
	id: "the-police-justice-circus--step-right-up-and-watch-the-files-disappear.md";
  slug: "the-police-justice-circus--step-right-up-and-watch-the-files-disappear";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-post-raila-vacuum-5-leaders-fighting-for-the-5-million-baba-votes.md": {
	id: "the-post-raila-vacuum-5-leaders-fighting-for-the-5-million-baba-votes.md";
  slug: "the-post-raila-vacuum-5-leaders-fighting-for-the-5-million-baba-votes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-pr-fireshield--william-s-strategic--concern--over-the-epstein-stench.md": {
	id: "the-pr-fireshield--william-s-strategic--concern--over-the-epstein-stench.md";
  slug: "the-pr-fireshield--william-s-strategic--concern--over-the-epstein-stench";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-pr-machine-is-smoking--why-we-are-sick-of-manufactured--authenticity.md": {
	id: "the-pr-machine-is-smoking--why-we-are-sick-of-manufactured--authenticity.md";
  slug: "the-pr-machine-is-smoking--why-we-are-sick-of-manufactured--authenticity";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-predator-in-your-pocket--why-privacy-in-kanairo-is-a-cruel-joke.md": {
	id: "the-predator-in-your-pocket--why-privacy-in-kanairo-is-a-cruel-joke.md";
  slug: "the-predator-in-your-pocket--why-privacy-in-kanairo-is-a-cruel-joke";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-predatory-state-and-the-exodus-of-capital.md": {
	id: "the-predatory-state-and-the-exodus-of-capital.md";
  slug: "the-predatory-state-and-the-exodus-of-capital";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-price-of-a-presidency--liquidating-national-security-for-crypto-equity.md": {
	id: "the-price-of-a-presidency--liquidating-national-security-for-crypto-equity.md";
  slug: "the-price-of-a-presidency--liquidating-national-security-for-crypto-equity";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-price-of-blood-and-the-french-connection.md": {
	id: "the-price-of-blood-and-the-french-connection.md";
  slug: "the-price-of-blood-and-the-french-connection";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-price-of-clout--from-tiktok-flexing-to-a-dci-cell.md": {
	id: "the-price-of-clout--from-tiktok-flexing-to-a-dci-cell.md";
  slug: "the-price-of-clout--from-tiktok-flexing-to-a-dci-cell";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-price-of-rebellion--epic-games-trades-the--open-internet--for-an--800-million-google-handout.md": {
	id: "the-price-of-rebellion--epic-games-trades-the--open-internet--for-an--800-million-google-handout.md";
  slug: "the-price-of-rebellion--epic-games-trades-the--open-internet--for-an--800-million-google-handout";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-prince-of-darkness-and-the-pedophile--a-masterclass-in-establishment-rot.md": {
	id: "the-prince-of-darkness-and-the-pedophile--a-masterclass-in-establishment-rot.md";
  slug: "the-prince-of-darkness-and-the-pedophile--a-masterclass-in-establishment-rot";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-privilege-of-performance--why-harry-brook-s-horrendous-ordeal-is-a-pr-masterclass.md": {
	id: "the-privilege-of-performance--why-harry-brook-s-horrendous-ordeal-is-a-pr-masterclass.md";
  slug: "the-privilege-of-performance--why-harry-brook-s-horrendous-ordeal-is-a-pr-masterclass";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-pro-iran-meme-machine-trolls-trump-with-ai-lego-cartoons--a-masterclass-in-psyops.md": {
	id: "the-pro-iran-meme-machine-trolls-trump-with-ai-lego-cartoons--a-masterclass-in-psyops.md";
  slug: "the-pro-iran-meme-machine-trolls-trump-with-ai-lego-cartoons--a-masterclass-in-psyops";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-productivity-trap--how-ai-efficiency-became-a-digital-whip.md": {
	id: "the-productivity-trap--how-ai-efficiency-became-a-digital-whip.md";
  slug: "the-productivity-trap--how-ai-efficiency-became-a-digital-whip";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-professor-and-the-politician--ruto-s-new-intellectual-shield.md": {
	id: "the-professor-and-the-politician--ruto-s-new-intellectual-shield.md";
  slug: "the-professor-and-the-politician--ruto-s-new-intellectual-shield";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-profitable-scent-of-a-starvation-blockade.md": {
	id: "the-profitable-scent-of-a-starvation-blockade.md";
  slug: "the-profitable-scent-of-a-starvation-blockade";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-pulpit-for-sale--kiengei-s-holy-u-turn.md": {
	id: "the-pulpit-for-sale--kiengei-s-holy-u-turn.md";
  slug: "the-pulpit-for-sale--kiengei-s-holy-u-turn";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-rbi-s-delusional-resilience-in-a-fragmenting-world.md": {
	id: "the-rbi-s-delusional-resilience-in-a-fragmenting-world.md";
  slug: "the-rbi-s-delusional-resilience-in-a-fragmenting-world";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-recycling-plant--how-hollywood-s-latest-slate-confirms-cultural-stagnation.md": {
	id: "the-recycling-plant--how-hollywood-s-latest-slate-confirms-cultural-stagnation.md";
  slug: "the-recycling-plant--how-hollywood-s-latest-slate-confirms-cultural-stagnation";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-regulatory-mirage--why-the-silicon-safety-first-movement-failed.md": {
	id: "the-regulatory-mirage--why-the-silicon-safety-first-movement-failed.md";
  slug: "the-regulatory-mirage--why-the-silicon-safety-first-movement-failed";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-rise-of-sex-positive-content-creators-in-kenya-education-or-indecency.md": {
	id: "the-rise-of-sex-positive-content-creators-in-kenya-education-or-indecency.md";
  slug: "the-rise-of-sex-positive-content-creators-in-kenya-education-or-indecency";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-rising-sun-feeds-on-rust--nippon-s--15-billion-toxic-real-estate-play.md": {
	id: "the-rising-sun-feeds-on-rust--nippon-s--15-billion-toxic-real-estate-play.md";
  slug: "the-rising-sun-feeds-on-rust--nippon-s--15-billion-toxic-real-estate-play";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-royal-pimp-to-palace-pipeline.md": {
	id: "the-royal-pimp-to-palace-pipeline.md";
  slug: "the-royal-pimp-to-palace-pipeline";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-royal-pr-circus--putting-lipstick-on-a-windsor-pig.md": {
	id: "the-royal-pr-circus--putting-lipstick-on-a-windsor-pig.md";
  slug: "the-royal-pr-circus--putting-lipstick-on-a-windsor-pig";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-ruble-meat-grinder--why-kenya-exports-sons-to-die-in-russia.md": {
	id: "the-ruble-meat-grinder--why-kenya-exports-sons-to-die-in-russia.md";
  slug: "the-ruble-meat-grinder--why-kenya-exports-sons-to-die-in-russia";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-rupee-is-a-sinking-anchor-in-a-sea-of-oil.md": {
	id: "the-rupee-is-a-sinking-anchor-in-a-sea-of-oil.md";
  slug: "the-rupee-is-a-sinking-anchor-in-a-sea-of-oil";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-rupee-s-slow-bleed--india-s-economic-mirage-evaporates.md": {
	id: "the-rupee-s-slow-bleed--india-s-economic-mirage-evaporates.md";
  slug: "the-rupee-s-slow-bleed--india-s-economic-mirage-evaporates";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-rust-belt-s-new-overlords--exporting-decay-to-the-highest-bidder.md": {
	id: "the-rust-belt-s-new-overlords--exporting-decay-to-the-highest-bidder.md";
  slug: "the-rust-belt-s-new-overlords--exporting-decay-to-the-highest-bidder";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-safari-sell-out--exporting-our-culture-in-a-napa-bottle.md": {
	id: "the-safari-sell-out--exporting-our-culture-in-a-napa-bottle.md";
  slug: "the-safari-sell-out--exporting-our-culture-in-a-napa-bottle";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-sandpaper-boys-are-back--steve-smith-s-never-ending-redemption-tour.md": {
	id: "the-sandpaper-boys-are-back--steve-smith-s-never-ending-redemption-tour.md";
  slug: "the-sandpaper-boys-are-back--steve-smith-s-never-ending-redemption-tour";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-santa-clara-swindle--why-super-bowl-60-is-a-eulogy-for-american-sport.md": {
	id: "the-santa-clara-swindle--why-super-bowl-60-is-a-eulogy-for-american-sport.md";
  slug: "the-santa-clara-swindle--why-super-bowl-60-is-a-eulogy-for-american-sport";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-saudi-money-pit-runs-dry-as-golf-mercenaries-beg-for-mercy.md": {
	id: "the-saudi-money-pit-runs-dry-as-golf-mercenaries-beg-for-mercy.md";
  slug: "the-saudi-money-pit-runs-dry-as-golf-mercenaries-beg-for-mercy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-saudi-sportswashing-bubble-finally-bursts.md": {
	id: "the-saudi-sportswashing-bubble-finally-bursts.md";
  slug: "the-saudi-sportswashing-bubble-finally-bursts";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-sec-s-litigation-league--where-lawsuits-outpace-the-game.md": {
	id: "the-sec-s-litigation-league--where-lawsuits-outpace-the-game.md";
  slug: "the-sec-s-litigation-league--where-lawsuits-outpace-the-game";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-second-hand-scam-how-refurbished-electronics-are-being-sold-as-new-in-luthuli-avenue.md": {
	id: "the-second-hand-scam-how-refurbished-electronics-are-being-sold-as-new-in-luthuli-avenue.md";
  slug: "the-second-hand-scam-how-refurbished-electronics-are-being-sold-as-new-in-luthuli-avenue";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-secret-poison-on-your-plate--why-kanairo-s-bamboo-craze-is-a-total-scam.md": {
	id: "the-secret-poison-on-your-plate--why-kanairo-s-bamboo-craze-is-a-total-scam.md";
  slug: "the-secret-poison-on-your-plate--why-kanairo-s-bamboo-craze-is-a-total-scam";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-semaglutide-shakedown--why-corporate-monopolies-always-win.md": {
	id: "the-semaglutide-shakedown--why-corporate-monopolies-always-win.md";
  slug: "the-semaglutide-shakedown--why-corporate-monopolies-always-win";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-sh44-billion-mirage--motsepe-s--confidence--vs--our-empty-pockets.md": {
	id: "the-sh44-billion-mirage--motsepe-s--confidence--vs--our-empty-pockets.md";
  slug: "the-sh44-billion-mirage--motsepe-s--confidence--vs--our-empty-pockets";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-sh5-8-billion-hustle--africa-s-global-seat-at-the-scammer-s-table.md": {
	id: "the-sh5-8-billion-hustle--africa-s-global-seat-at-the-scammer-s-table.md";
  slug: "the-sh5-8-billion-hustle--africa-s-global-seat-at-the-scammer-s-table";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-sh80-billion-trojan-horse--how-nairobi-just-got-sold-back-to-the-state.md": {
	id: "the-sh80-billion-trojan-horse--how-nairobi-just-got-sold-back-to-the-state.md";
  slug: "the-sh80-billion-trojan-horse--how-nairobi-just-got-sold-back-to-the-state";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-shadow-banking-apocalypse--central-banks-admit-they-are-flying-blind.md": {
	id: "the-shadow-banking-apocalypse--central-banks-admit-they-are-flying-blind.md";
  slug: "the-shadow-banking-apocalypse--central-banks-admit-they-are-flying-blind";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-shadow-liquidity-trap-how-private-credit-is-quietly-cannibalizing-the-global-economy.md": {
	id: "the-shadow-liquidity-trap-how-private-credit-is-quietly-cannibalizing-the-global-economy.md";
  slug: "the-shadow-liquidity-trap-how-private-credit-is-quietly-cannibalizing-the-global-economy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-shadow-sovereign-how-128-trillion-in-private-wealth-is-quietly-decoupling-from-the-global-economy.md": {
	id: "the-shadow-sovereign-how-128-trillion-in-private-wealth-is-quietly-decoupling-from-the-global-economy.md";
  slug: "the-shadow-sovereign-how-128-trillion-in-private-wealth-is-quietly-decoupling-from-the-global-economy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-shadow-system-s-slow-motion-suicide-note.md": {
	id: "the-shadow-system-s-slow-motion-suicide-note.md";
  slug: "the-shadow-system-s-slow-motion-suicide-note";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-shady-man-connecting-andrew--epstein--and-china-s-gold-rush.md": {
	id: "the-shady-man-connecting-andrew--epstein--and-china-s-gold-rush.md";
  slug: "the-shady-man-connecting-andrew--epstein--and-china-s-gold-rush";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-silent-corridor-what-the-epstein-files-reveal-about-kenya-s-invisible-geopolitics.md": {
	id: "the-silent-corridor-what-the-epstein-files-reveal-about-kenya-s-invisible-geopolitics.md";
  slug: "the-silent-corridor-what-the-epstein-files-reveal-about-kenya-s-invisible-geopolitics";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-silent-exodus-the-geopolitical-erosion-of-the-african-marriage.md": {
	id: "the-silent-exodus-the-geopolitical-erosion-of-the-african-marriage.md";
  slug: "the-silent-exodus-the-geopolitical-erosion-of-the-african-marriage";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-silicon-crisis--valve-s-hardware-ambitions-hit-the-wall-of-corporate-greed.md": {
	id: "the-silicon-crisis--valve-s-hardware-ambitions-hit-the-wall-of-corporate-greed.md";
  slug: "the-silicon-crisis--valve-s-hardware-ambitions-hit-the-wall-of-corporate-greed";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-silicon-mirage--why-ai-has-yet-to-move-the-macroeconomic-needle.md": {
	id: "the-silicon-mirage--why-ai-has-yet-to-move-the-macroeconomic-needle.md";
  slug: "the-silicon-mirage--why-ai-has-yet-to-move-the-macroeconomic-needle";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-silicon-serengeti-s-invisible-chains-kenya-s-digital-labor-pivot.md": {
	id: "the-silicon-serengeti-s-invisible-chains-kenya-s-digital-labor-pivot.md";
  slug: "the-silicon-serengeti-s-invisible-chains-kenya-s-digital-labor-pivot";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-silver-guillotine--how-the--green--transition-decapitated-global-industry.md": {
	id: "the-silver-guillotine--how-the--green--transition-decapitated-global-industry.md";
  slug: "the-silver-guillotine--how-the--green--transition-decapitated-global-industry";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-silver-mirage-collapses-into-a-global-resource-war.md": {
	id: "the-silver-mirage-collapses-into-a-global-resource-war.md";
  slug: "the-silver-mirage-collapses-into-a-global-resource-war";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-singapore-delusion--ruto-s-big-dreams-and-kenya-s-empty-pockets.md": {
	id: "the-singapore-delusion--ruto-s-big-dreams-and-kenya-s-empty-pockets.md";
  slug: "the-singapore-delusion--ruto-s-big-dreams-and-kenya-s-empty-pockets";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-singapore-dream-is-just-a-nairobi-nightmare-in-disguise.md": {
	id: "the-singapore-dream-is-just-a-nairobi-nightmare-in-disguise.md";
  slug: "the-singapore-dream-is-just-a-nairobi-nightmare-in-disguise";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-singularity-protocol-why-the-quantum-ai-merger-is-the-last-invention-humanity-will-control.md": {
	id: "the-singularity-protocol-why-the-quantum-ai-merger-is-the-last-invention-humanity-will-control.md";
  slug: "the-singularity-protocol-why-the-quantum-ai-merger-is-the-last-invention-humanity-will-control";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-sisyphean-theater-of-digital-merit--why-the-war-on-hardware-cheating-is-already-lost.md": {
	id: "the-sisyphean-theater-of-digital-merit--why-the-war-on-hardware-cheating-is-already-lost.md";
  slug: "the-sisyphean-theater-of-digital-merit--why-the-war-on-hardware-cheating-is-already-lost";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-smile-turns-into-a-scar--amazon-s-30-000-soul-cull.md": {
	id: "the-smile-turns-into-a-scar--amazon-s-30-000-soul-cull.md";
  slug: "the-smile-turns-into-a-scar--amazon-s-30-000-soul-cull";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-soft-life-debt-trap-the-rising-rate-of-loan-app-suicides-among-young-professionals.md": {
	id: "the-soft-life-debt-trap-the-rising-rate-of-loan-app-suicides-among-young-professionals.md";
  slug: "the-soft-life-debt-trap-the-rising-rate-of-loan-app-suicides-among-young-professionals";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-solai-settlement-saga--why-kenyan-influencers-are-trading-brain-cells-for-clout.md": {
	id: "the-solai-settlement-saga--why-kenyan-influencers-are-trading-brain-cells-for-clout.md";
  slug: "the-solai-settlement-saga--why-kenyan-influencers-are-trading-brain-cells-for-clout";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-sovereign-cage--tariffs--tokens--and-the-death-of-free-markets.md": {
	id: "the-sovereign-cage--tariffs--tokens--and-the-death-of-free-markets.md";
  slug: "the-sovereign-cage--tariffs--tokens--and-the-death-of-free-markets";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-sovereign-fire-sale--how-trump-turned-national-security-into-a-personal-crypto-dividend.md": {
	id: "the-sovereign-fire-sale--how-trump-turned-national-security-into-a-personal-crypto-dividend.md";
  slug: "the-sovereign-fire-sale--how-trump-turned-national-security-into-a-personal-crypto-dividend";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-sovereignty-liquidation-of-the-greek-periphery.md": {
	id: "the-sovereignty-liquidation-of-the-greek-periphery.md";
  slug: "the-sovereignty-liquidation-of-the-greek-periphery";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-sovereignty-sell-out--dhaka-s-forced-submission-to-delhi.md": {
	id: "the-sovereignty-sell-out--dhaka-s-forced-submission-to-delhi.md";
  slug: "the-sovereignty-sell-out--dhaka-s-forced-submission-to-delhi";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-speculative-limbo-of-a-dying-digital-dream.md": {
	id: "the-speculative-limbo-of-a-dying-digital-dream.md";
  slug: "the-speculative-limbo-of-a-dying-digital-dream";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-stagnant-illusion-of-digital-salvation.md": {
	id: "the-stagnant-illusion-of-digital-salvation.md";
  slug: "the-stagnant-illusion-of-digital-salvation";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-stagnation-covenant--european-wealth-on-the-altar-of-american-tech.md": {
	id: "the-stagnation-covenant--european-wealth-on-the-altar-of-american-tech.md";
  slug: "the-stagnation-covenant--european-wealth-on-the-altar-of-american-tech";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-star-s-digital-pivot--is-kenya-s-media-losing-its-shine-for-clicks.md": {
	id: "the-star-s-digital-pivot--is-kenya-s-media-losing-its-shine-for-clicks.md";
  slug: "the-star-s-digital-pivot--is-kenya-s-media-losing-its-shine-for-clicks";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-state-house-handshake-circus--new-envoys--same-old-problems.md": {
	id: "the-state-house-handshake-circus--new-envoys--same-old-problems.md";
  slug: "the-state-house-handshake-circus--new-envoys--same-old-problems";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-state-house-tea-party--ruto-s-sh2-billion-pity-payment-for-kemu.md": {
	id: "the-state-house-tea-party--ruto-s-sh2-billion-pity-payment-for-kemu.md";
  slug: "the-state-house-tea-party--ruto-s-sh2-billion-pity-payment-for-kemu";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-sterile-narcissism-of-nordic-domesticity.md": {
	id: "the-sterile-narcissism-of-nordic-domesticity.md";
  slug: "the-sterile-narcissism-of-nordic-domesticity";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-strait-of-hormuz-chokehold--india-s-market-bleeds-as-the-west-watches.md": {
	id: "the-strait-of-hormuz-chokehold--india-s-market-bleeds-as-the-west-watches.md";
  slug: "the-strait-of-hormuz-chokehold--india-s-market-bleeds-as-the-west-watches";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-substack-breach--another-corporate-failure-masked-as-a-security-incident.md": {
	id: "the-substack-breach--another-corporate-failure-masked-as-a-security-incident.md";
  slug: "the-substack-breach--another-corporate-failure-masked-as-a-security-incident";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-substack-leak--why-your-private-data-is-the-secret-tax-on-your-newsletter-subscription.md": {
	id: "the-substack-leak--why-your-private-data-is-the-secret-tax-on-your-newsletter-subscription.md";
  slug: "the-substack-leak--why-your-private-data-is-the-secret-tax-on-your-newsletter-subscription";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-sunday-morning-slaughter--crypto-turns-geopolitical-chaos-into-a-24-hour-casino.md": {
	id: "the-sunday-morning-slaughter--crypto-turns-geopolitical-chaos-into-a-24-hour-casino.md";
  slug: "the-sunday-morning-slaughter--crypto-turns-geopolitical-chaos-into-a-24-hour-casino";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-sunk-cost-fallacy-of-modern-monogamy.md": {
	id: "the-sunk-cost-fallacy-of-modern-monogamy.md";
  slug: "the-sunk-cost-fallacy-of-modern-monogamy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-sunset-of-the-american-hoop-dream.md": {
	id: "the-sunset-of-the-american-hoop-dream.md";
  slug: "the-sunset-of-the-american-hoop-dream";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-surveillance-state-does-not-negotiate.md": {
	id: "the-surveillance-state-does-not-negotiate.md";
  slug: "the-surveillance-state-does-not-negotiate";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-surveillance-teddy--your-child-s-secrets-are-now-corporate-waste.md": {
	id: "the-surveillance-teddy--your-child-s-secrets-are-now-corporate-waste.md";
  slug: "the-surveillance-teddy--your-child-s-secrets-are-now-corporate-waste";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-tax-funded-liquidation-of-female-athletics.md": {
	id: "the-tax-funded-liquidation-of-female-athletics.md";
  slug: "the-tax-funded-liquidation-of-female-athletics";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-tears-of-a-wiper--kalonzo-musyoka-s-scripted-outrage-and-the-police-pawn-game.md": {
	id: "the-tears-of-a-wiper--kalonzo-musyoka-s-scripted-outrage-and-the-police-pawn-game.md";
  slug: "the-tears-of-a-wiper--kalonzo-musyoka-s-scripted-outrage-and-the-police-pawn-game";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-technocratic-hallucination-of-a-fading-europe.md": {
	id: "the-technocratic-hallucination-of-a-fading-europe.md";
  slug: "the-technocratic-hallucination-of-a-fading-europe";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-temple-of-justice-has-no-ramp--but-runda-has-a-padel-court.md": {
	id: "the-temple-of-justice-has-no-ramp--but-runda-has-a-padel-court.md";
  slug: "the-temple-of-justice-has-no-ramp--but-runda-has-a-padel-court";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-terminal-trap--another--investor--lands-in-the-cells.md": {
	id: "the-terminal-trap--another--investor--lands-in-the-cells.md";
  slug: "the-terminal-trap--another--investor--lands-in-the-cells";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-thin-blue-line-is-a-front-for-institutional-theft.md": {
	id: "the-thin-blue-line-is-a-front-for-institutional-theft.md";
  slug: "the-thin-blue-line-is-a-front-for-institutional-theft";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-thirst-is-real--but-the-water-is-just-hiding-in-someone-s-bank-account.md": {
	id: "the-thirst-is-real--but-the-water-is-just-hiding-in-someone-s-bank-account.md";
  slug: "the-thirst-is-real--but-the-water-is-just-hiding-in-someone-s-bank-account";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-tokyo-guillotine--how-cheap-debt-became-a-global-noose.md": {
	id: "the-tokyo-guillotine--how-cheap-debt-became-a-global-noose.md";
  slug: "the-tokyo-guillotine--how-cheap-debt-became-a-global-noose";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-tokyo-guillotine--wall-street-s-free-money-addiction-ends-in-blood.md": {
	id: "the-tokyo-guillotine--wall-street-s-free-money-addiction-ends-in-blood.md";
  slug: "the-tokyo-guillotine--wall-street-s-free-money-addiction-ends-in-blood";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-total-erosion-of-individual-anonymity.md": {
	id: "the-total-erosion-of-individual-anonymity.md";
  slug: "the-total-erosion-of-individual-anonymity";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-traveling-circus-of-plastic-soccer.md": {
	id: "the-traveling-circus-of-plastic-soccer.md";
  slug: "the-traveling-circus-of-plastic-soccer";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-traveling-mercenary--how-messi-masks-the-rot-of-american-soccer.md": {
	id: "the-traveling-mercenary--how-messi-masks-the-rot-of-american-soccer.md";
  slug: "the-traveling-mercenary--how-messi-masks-the-rot-of-american-soccer";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-two-week-delusion--global-markets-bet-on-a-blood-soaked-pause.md": {
	id: "the-two-week-delusion--global-markets-bet-on-a-blood-soaked-pause.md";
  slug: "the-two-week-delusion--global-markets-bet-on-a-blood-soaked-pause";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-university-of-grab-onomics--how-our-future-got-subdivided.md": {
	id: "the-university-of-grab-onomics--how-our-future-got-subdivided.md";
  slug: "the-university-of-grab-onomics--how-our-future-got-subdivided";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-us-supreme-court-just-told-trump-to-stop-daydreaming--but-our-coffee-is-still-in-trouble.md": {
	id: "the-us-supreme-court-just-told-trump-to-stop-daydreaming--but-our-coffee-is-still-in-trouble.md";
  slug: "the-us-supreme-court-just-told-trump-to-stop-daydreaming--but-our-coffee-is-still-in-trouble";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-value-addition-fairy-tale--how-to-starve-while-hosting-a-conference.md": {
	id: "the-value-addition-fairy-tale--how-to-starve-while-hosting-a-conference.md";
  slug: "the-value-addition-fairy-tale--how-to-starve-while-hosting-a-conference";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-vassalage-of-necessity--dhaka-s-descent-into-the-indian-orbit.md": {
	id: "the-vassalage-of-necessity--dhaka-s-descent-into-the-indian-orbit.md";
  slug: "the-vassalage-of-necessity--dhaka-s-descent-into-the-indian-orbit";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-vienna-exit--another-elite-lands-a-soft-landing.md": {
	id: "the-vienna-exit--another-elite-lands-a-soft-landing.md";
  slug: "the-vienna-exit--another-elite-lands-a-soft-landing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-vultures-are-fed-and-the-rest-of-us-are-for-sale.md": {
	id: "the-vultures-are-fed-and-the-rest-of-us-are-for-sale.md";
  slug: "the-vultures-are-fed-and-the-rest-of-us-are-for-sale";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-war-dividend--corporate-india-demands-a-safety-net-for-global-chaos.md": {
	id: "the-war-dividend--corporate-india-demands-a-safety-net-for-global-chaos.md";
  slug: "the-war-dividend--corporate-india-demands-a-safety-net-for-global-chaos";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-war-dividend--profiting-from-a-burning-middle-east.md": {
	id: "the-war-dividend--profiting-from-a-burning-middle-east.md";
  slug: "the-war-dividend--profiting-from-a-burning-middle-east";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-wash-wash-pandemic-why-nairobis-club-scene-is-actually-a-money-laundering-masterclass.md": {
	id: "the-wash-wash-pandemic-why-nairobis-club-scene-is-actually-a-money-laundering-masterclass.md";
  slug: "the-wash-wash-pandemic-why-nairobis-club-scene-is-actually-a-money-laundering-masterclass";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-watchdog-who-forgot-to-bark-at-his-own-poverty.md": {
	id: "the-watchdog-who-forgot-to-bark-at-his-own-poverty.md";
  slug: "the-watchdog-who-forgot-to-bark-at-his-own-poverty";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-weekend-sweep--when-democracy-needs-a-jail-cell.md": {
	id: "the-weekend-sweep--when-democracy-needs-a-jail-cell.md";
  slug: "the-weekend-sweep--when-democracy-needs-a-jail-cell";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-weekly-rebrand--heartbreaks--corporate-guitars--and-the--baddie--industrial-complex.md": {
	id: "the-weekly-rebrand--heartbreaks--corporate-guitars--and-the--baddie--industrial-complex.md";
  slug: "the-weekly-rebrand--heartbreaks--corporate-guitars--and-the--baddie--industrial-complex";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-west-asia-trap--india-s-economic-house-of-cards.md": {
	id: "the-west-asia-trap--india-s-economic-house-of-cards.md";
  slug: "the-west-asia-trap--india-s-economic-house-of-cards";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-withdrawal-of-tim-walz-and-the-gubernatorial-ambitions-of-amy-klobuchar.md": {
	id: "the-withdrawal-of-tim-walz-and-the-gubernatorial-ambitions-of-amy-klobuchar.md";
  slug: "the-withdrawal-of-tim-walz-and-the-gubernatorial-ambitions-of-amy-klobuchar";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-world-is-quietly-ghosting-american-debt.md": {
	id: "the-world-is-quietly-ghosting-american-debt.md";
  slug: "the-world-is-quietly-ghosting-american-debt";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-yellow-metal-rusts-as-institutions-chase-digital-ghosts.md": {
	id: "the-yellow-metal-rusts-as-institutions-chase-digital-ghosts.md";
  slug: "the-yellow-metal-rusts-as-institutions-chase-digital-ghosts";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-yen-carry-trade-is-a-noose-for-crypto.md": {
	id: "the-yen-carry-trade-is-a-noose-for-crypto.md";
  slug: "the-yen-carry-trade-is-a-noose-for-crypto";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-yen-guillotine--tokyo-ends-the-global-free-money-era.md": {
	id: "the-yen-guillotine--tokyo-ends-the-global-free-money-era.md";
  slug: "the-yen-guillotine--tokyo-ends-the-global-free-money-era";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"the-yen-noose-and-the-myth-of-crypto-sovereignty.md": {
	id: "the-yen-noose-and-the-myth-of-crypto-sovereignty.md";
  slug: "the-yen-noose-and-the-myth-of-crypto-sovereignty";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"thomas-frank-confirms-cristian-romero-apology-as-tottenham-crisis-deepens-after-manchester-united-defeat.md": {
	id: "thomas-frank-confirms-cristian-romero-apology-as-tottenham-crisis-deepens-after-manchester-united-defeat.md";
  slug: "thomas-frank-confirms-cristian-romero-apology-as-tottenham-crisis-deepens-after-manchester-united-defeat";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"thousands-of-vibe-coded-apps-expose-corporate-and-personal-data-on-the-open-web---a-predictable-disaster.md": {
	id: "thousands-of-vibe-coded-apps-expose-corporate-and-personal-data-on-the-open-web---a-predictable-disaster.md";
  slug: "thousands-of-vibe-coded-apps-expose-corporate-and-personal-data-on-the-open-web---a-predictable-disaster";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"three-months-of-disney-plus-and-hulu-for--15--a-costly-distraction.md": {
	id: "three-months-of-disney-plus-and-hulu-for--15--a-costly-distraction.md";
  slug: "three-months-of-disney-plus-and-hulu-for--15--a-costly-distraction";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tiktok-algorithm-kenya-ruto-keywords-controversy-data.md": {
	id: "tiktok-algorithm-kenya-ruto-keywords-controversy-data.md";
  slug: "tiktok-algorithm-kenya-ruto-keywords-controversy-data";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tiktok-ban-canceled--why-kenya-s-clout-thirsty-influencers-are-breathing-again--for-now.md": {
	id: "tiktok-ban-canceled--why-kenya-s-clout-thirsty-influencers-are-breathing-again--for-now.md";
  slug: "tiktok-ban-canceled--why-kenya-s-clout-thirsty-influencers-are-breathing-again--for-now";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tiktok-begging-syndicate-kenyan-creators-emotional-appeals-millions.md": {
	id: "tiktok-begging-syndicate-kenyan-creators-emotional-appeals-millions.md";
  slug: "tiktok-begging-syndicate-kenyan-creators-emotional-appeals-millions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tiktok-casts-actors-for-its-own-short-dramas--a-desperate-play-for-content-dominance.md": {
	id: "tiktok-casts-actors-for-its-own-short-dramas--a-desperate-play-for-content-dominance.md";
  slug: "tiktok-casts-actors-for-its-own-short-dramas--a-desperate-play-for-content-dominance";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tiktok-fame-or-digital-torture--branice-okanga-and-the-high-cost-of-going-viral.md": {
	id: "tiktok-fame-or-digital-torture--branice-okanga-and-the-high-cost-of-going-viral.md";
  slug: "tiktok-fame-or-digital-torture--branice-okanga-and-the-high-cost-of-going-viral";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tiktok-is-casting-actors-for-its-own-exploitative-short-dramas.md": {
	id: "tiktok-is-casting-actors-for-its-own-exploitative-short-dramas.md";
  slug: "tiktok-is-casting-actors-for-its-own-exploitative-short-dramas";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tiktok-s-ai-fueled-mini-drama-feed-unleashes-ai-zombies-and-depressed-polar-bears.md": {
	id: "tiktok-s-ai-fueled-mini-drama-feed-unleashes-ai-zombies-and-depressed-polar-bears.md";
  slug: "tiktok-s-ai-fueled-mini-drama-feed-unleashes-ai-zombies-and-depressed-polar-bears";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tiktok-tests-ai-zombies-and-bikini-gorillas-in-new-mini-drama-feed.md": {
	id: "tiktok-tests-ai-zombies-and-bikini-gorillas-in-new-mini-drama-feed.md";
  slug: "tiktok-tests-ai-zombies-and-bikini-gorillas-in-new-mini-drama-feed";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"timr-kenya-report--tobacco-industry-s-social-media-hustle-targets-kenyan-youth.md": {
	id: "timr-kenya-report--tobacco-industry-s-social-media-hustle-targets-kenyan-youth.md";
  slug: "timr-kenya-report--tobacco-industry-s-social-media-hustle-targets-kenyan-youth";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"title-deeds-as-collateral-and-ghost-v8s--the-public-health-buffet-is-open.md": {
	id: "title-deeds-as-collateral-and-ghost-v8s--the-public-health-buffet-is-open.md";
  slug: "title-deeds-as-collateral-and-ghost-v8s--the-public-health-buffet-is-open";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tiwa-savage-s-berklee--intensive---a-four-day-pr-stunt-or-a-real-career-move.md": {
	id: "tiwa-savage-s-berklee--intensive---a-four-day-pr-stunt-or-a-real-career-move.md";
  slug: "tiwa-savage-s-berklee--intensive---a-four-day-pr-stunt-or-a-real-career-move";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tiwa-savage-s-new-foundation--philanthropy-or-a-pre-emptive-legacy-tax.md": {
	id: "tiwa-savage-s-new-foundation--philanthropy-or-a-pre-emptive-legacy-tax.md";
  slug: "tiwa-savage-s-new-foundation--philanthropy-or-a-pre-emptive-legacy-tax";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"to-protect--serve--and-pillage.md": {
	id: "to-protect--serve--and-pillage.md";
  slug: "to-protect--serve--and-pillage";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tobacco-tears-and-billion-shilling-dividends--the-bat-kenya-magic-trick.md": {
	id: "tobacco-tears-and-billion-shilling-dividends--the-bat-kenya-magic-trick.md";
  slug: "tobacco-tears-and-billion-shilling-dividends--the-bat-kenya-magic-trick";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"today-in-germany--a-roundup-of-the-latest-news-on-thursday.md": {
	id: "today-in-germany--a-roundup-of-the-latest-news-on-thursday.md";
  slug: "today-in-germany--a-roundup-of-the-latest-news-on-thursday";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tokyo-s-desperate-currency-defense-will-liquidate-your-digital-gold.md": {
	id: "tokyo-s-desperate-currency-defense-will-liquidate-your-digital-gold.md";
  slug: "tokyo-s-desperate-currency-defense-will-liquidate-your-digital-gold";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"top-10-kenyan-artists-viral-disappeared-clout-culture.md": {
	id: "top-10-kenyan-artists-viral-disappeared-clout-culture.md";
  slug: "top-10-kenyan-artists-viral-disappeared-clout-culture";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"top-petroleum-officials-arrested--kenya-s-fuel-security-in-question.md": {
	id: "top-petroleum-officials-arrested--kenya-s-fuel-security-in-question.md";
  slug: "top-petroleum-officials-arrested--kenya-s-fuel-security-in-question";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"torrential-rains-in-kenya-kill-81-this-month--officials-confirm-waterlogged-reality.md": {
	id: "torrential-rains-in-kenya-kill-81-this-month--officials-confirm-waterlogged-reality.md";
  slug: "torrential-rains-in-kenya-kill-81-this-month--officials-confirm-waterlogged-reality";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tory-lanez-father-marries-kenyan-woman--rapper-s-ties-to-kenya-rehashed-amid-legal-woes.md": {
	id: "tory-lanez-father-marries-kenyan-woman--rapper-s-ties-to-kenya-rehashed-amid-legal-woes.md";
  slug: "tory-lanez-father-marries-kenyan-woman--rapper-s-ties-to-kenya-rehashed-amid-legal-woes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tottenham-player-ratings-vs-atletico-madrid--calamitous-antonin-kinsky-s-all-time-champions-league-shocker-sets-spurs-up-for-more-pain-as-igor-tudor-s-terrible-tactics-are-exposed-again.md": {
	id: "tottenham-player-ratings-vs-atletico-madrid--calamitous-antonin-kinsky-s-all-time-champions-league-shocker-sets-spurs-up-for-more-pain-as-igor-tudor-s-terrible-tactics-are-exposed-again.md";
  slug: "tottenham-player-ratings-vs-atletico-madrid--calamitous-antonin-kinsky-s-all-time-champions-league-shocker-sets-spurs-up-for-more-pain-as-igor-tudor-s-terrible-tactics-are-exposed-again";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"toxic-lyrikali-2026-hype-failure.md": {
	id: "toxic-lyrikali-2026-hype-failure.md";
  slug: "toxic-lyrikali-2026-hype-failure";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"trans-nzoia-west-police-nab-nine-in--intelligence-led--operation---another-day--another-gang.md": {
	id: "trans-nzoia-west-police-nab-nine-in--intelligence-led--operation---another-day--another-gang.md";
  slug: "trans-nzoia-west-police-nab-nine-in--intelligence-led--operation---another-day--another-gang";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"transsion-phones-africa-data-surveillance-threat.md": {
	id: "transsion-phones-africa-data-surveillance-threat.md";
  slug: "transsion-africa-digital-empire";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"treasury-ducks-imf-loans-in-new-budget--gambles-on-world-bank-and-empty-promises.md": {
	id: "treasury-ducks-imf-loans-in-new-budget--gambles-on-world-bank-and-empty-promises.md";
  slug: "treasury-ducks-imf-loans-in-new-budget--gambles-on-world-bank-and-empty-promises";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"trent-alexander-arnold-pulled-over-by-police-for-signing-autographs-leaving-real-madrid-training.md": {
	id: "trent-alexander-arnold-pulled-over-by-police-for-signing-autographs-leaving-real-madrid-training.md";
  slug: "trent-alexander-arnold-pulled-over-by-police-for-signing-autographs-leaving-real-madrid-training";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"trump-corruption-allegations--crypto-investor-claims-victimhood-amidst-shady-dealings.md": {
	id: "trump-corruption-allegations--crypto-investor-claims-victimhood-amidst-shady-dealings.md";
  slug: "trump-corruption-allegations--crypto-investor-claims-victimhood-amidst-shady-dealings";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"trump-corruption-allegations--crypto-investor-plays-victim-amidst-financial-shenanigans.md": {
	id: "trump-corruption-allegations--crypto-investor-plays-victim-amidst-financial-shenanigans.md";
  slug: "trump-corruption-allegations--crypto-investor-plays-victim-amidst-financial-shenanigans";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"trump-demands-jimmy-kimmel-s-immediate-firing-amidst-political-theater.md": {
	id: "trump-demands-jimmy-kimmel-s-immediate-firing-amidst-political-theater.md";
  slug: "trump-demands-jimmy-kimmel-s-immediate-firing-amidst-political-theater";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"trump-pope-leo-xiv-feud--americans-react-to-jesus-like-image-fallout.md": {
	id: "trump-pope-leo-xiv-feud--americans-react-to-jesus-like-image-fallout.md";
  slug: "trump-pope-leo-xiv-feud--americans-react-to-jesus-like-image-fallout";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"trump-s-golden-dome--another-boondoggle-chasing-reagan-s-ghost.md": {
	id: "trump-s-golden-dome--another-boondoggle-chasing-reagan-s-ghost.md";
  slug: "trump-s-golden-dome--another-boondoggle-chasing-reagan-s-ghost";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"trump-s-golden-dome--the-latest-expensive-illusion-in-space-defense.md": {
	id: "trump-s-golden-dome--the-latest-expensive-illusion-in-space-defense.md";
  slug: "trump-s-golden-dome--the-latest-expensive-illusion-in-space-defense";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"trump-s-golden-dome-steamroll---a-costly-mirage-of-security.md": {
	id: "trump-s-golden-dome-steamroll---a-costly-mirage-of-security.md";
  slug: "trump-s-golden-dome-steamroll---a-costly-mirage-of-security";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"trump-s-granddaughter-kai--18--is--very-arrogant--with-her--out-of-touch--war-machine-tiktok-post-tragedy--darling.md": {
	id: "trump-s-granddaughter-kai--18--is--very-arrogant--with-her--out-of-touch--war-machine-tiktok-post-tragedy--darling.md";
  slug: "trump-s-granddaughter-kai--18--is--very-arrogant--with-her--out-of-touch--war-machine-tiktok-post-tragedy--darling";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"trump-s-pope-squabble-and-jesus-image-blunder--predictable-dysfunction-continues.md": {
	id: "trump-s-pope-squabble-and-jesus-image-blunder--predictable-dysfunction-continues.md";
  slug: "trump-s-pope-squabble-and-jesus-image-blunder--predictable-dysfunction-continues";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"trump-s-secret-desert-payday-exposed--the-shocking-uae-crypto-scam-rotten-to-the-core.md": {
	id: "trump-s-secret-desert-payday-exposed--the-shocking-uae-crypto-scam-rotten-to-the-core.md";
  slug: "trump-s-secret-desert-payday-exposed--the-shocking-uae-crypto-scam-rotten-to-the-core";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"truphena-wambui-72-hours-of-resilience.md": {
	id: "truphena-wambui-72-hours-of-resilience.md";
  slug: "truphena-muthoni-72-hour-revolution-kenya";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tsc-shrugs-off-salary-delay-rumours--teachers-still-waiting-for-their-shillings.md": {
	id: "tsc-shrugs-off-salary-delay-rumours--teachers-still-waiting-for-their-shillings.md";
  slug: "tsc-shrugs-off-salary-delay-rumours--teachers-still-waiting-for-their-shillings";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tuju-to-high-court--block-my-arrest--remove-police-from-hospital-bedside.md": {
	id: "tuju-to-high-court--block-my-arrest--remove-police-from-hospital-bedside.md";
  slug: "tuju-to-high-court--block-my-arrest--remove-police-from-hospital-bedside";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"twelve-cases-of-clout-chasing--the-police-state-s-pathetic-attempt-to-muzzle-2027.md": {
	id: "twelve-cases-of-clout-chasing--the-police-state-s-pathetic-attempt-to-muzzle-2027.md";
  slug: "twelve-cases-of-clout-chasing--the-police-state-s-pathetic-attempt-to-muzzle-2027";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"twelve-guns-and-a-trillion-shilling-pipe-dream.md": {
	id: "twelve-guns-and-a-trillion-shilling-pipe-dream.md";
  slug: "twelve-guns-and-a-trillion-shilling-pipe-dream";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"two-arrested--20-slaughtered-donkeys-found-in-makindu---nairobi-gets-another-scare.md": {
	id: "two-arrested--20-slaughtered-donkeys-found-in-makindu---nairobi-gets-another-scare.md";
  slug: "two-arrested--20-slaughtered-donkeys-found-in-makindu---nairobi-gets-another-scare";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"u-s--judiciary-signals-zero-tolerance-for-crypto-laundering-with-landmark-20-year-sentence.md": {
	id: "u-s--judiciary-signals-zero-tolerance-for-crypto-laundering-with-landmark-20-year-sentence.md";
  slug: "u-s--judiciary-signals-zero-tolerance-for-crypto-laundering-with-landmark-20-year-sentence";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uae-firm-acquires-49-stake-in-trump-crypto-venture-for-500m.md": {
	id: "uae-firm-acquires-49-stake-in-trump-crypto-venture-for-500m.md";
  slug: "uae-firm-acquires-49-stake-in-trump-crypto-venture-for-500m";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uasin-gishu-s-120-000-residents-beg-parliament-for-land-titles-amidst-decades-of-delays.md": {
	id: "uasin-gishu-s-120-000-residents-beg-parliament-for-land-titles-amidst-decades-of-delays.md";
  slug: "uasin-gishu-s-120-000-residents-beg-parliament-for-land-titles-amidst-decades-of-delays";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uber-shares-decline-following-earnings-report-and-guidance.md": {
	id: "uber-shares-decline-following-earnings-report-and-guidance.md";
  slug: "uber-shares-decline-following-earnings-report-and-guidance";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uda--odm-zoning-clash--another-kenyan-political-circus-starts.md": {
	id: "uda--odm-zoning-clash--another-kenyan-political-circus-starts.md";
  slug: "uda--odm-zoning-clash--another-kenyan-political-circus-starts";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uda-s-tax-skip-act--millions-in-housing--income-tax-gone-missing-under-ruto-s-watch.md": {
	id: "uda-s-tax-skip-act--millions-in-housing--income-tax-gone-missing-under-ruto-s-watch.md";
  slug: "uda-s-tax-skip-act--millions-in-housing--income-tax-gone-missing-under-ruto-s-watch";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uganda-announces-visa-free-entry-for-kenya-and-39-other-countries.md": {
	id: "uganda-announces-visa-free-entry-for-kenya-and-39-other-countries.md";
  slug: "uganda-announces-visa-free-entry-for-kenya-and-39-other-countries";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uganda-s-parliament-approves-new-copyright-law-with-harsher-penalties---just-don-t-expect-miracles.md": {
	id: "uganda-s-parliament-approves-new-copyright-law-with-harsher-penalties---just-don-t-expect-miracles.md";
  slug: "uganda-s-parliament-approves-new-copyright-law-with-harsher-penalties---just-don-t-expect-miracles";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ugandan-big-shots-eye-kenya-after-davido-gig---more-money-grabbers--naturally.md": {
	id: "ugandan-big-shots-eye-kenya-after-davido-gig---more-money-grabbers--naturally.md";
  slug: "ugandan-big-shots-eye-kenya-after-davido-gig---more-money-grabbers--naturally";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uhuru-calls-gachagua--my-brother-riggy-g---another-handshake--more-hot-air.md": {
	id: "uhuru-calls-gachagua--my-brother-riggy-g---another-handshake--more-hot-air.md";
  slug: "uhuru-calls-gachagua--my-brother-riggy-g---another-handshake--more-hot-air";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uhuru-s-nairobi-shadow-play--a-grudge-match-with-ruto-looms.md": {
	id: "uhuru-s-nairobi-shadow-play--a-grudge-match-with-ruto-looms.md";
  slug: "uhuru-s-nairobi-shadow-play--a-grudge-match-with-ruto-looms";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uk-border-force-dci-visit--another-nairobi-anti-drug-circus.md": {
	id: "uk-border-force-dci-visit--another-nairobi-anti-drug-circus.md";
  slug: "uk-border-force-dci-visit--another-nairobi-anti-drug-circus";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uk-claims-russia-ran-submarine-operation-over-cables-and-pipelines--exposes-weakness.md": {
	id: "uk-claims-russia-ran-submarine-operation-over-cables-and-pipelines--exposes-weakness.md";
  slug: "uk-claims-russia-ran-submarine-operation-over-cables-and-pipelines--exposes-weakness";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uk-claims-russia-ran-submarine-operation-over-vital-cables-and-pipelines--while-denials-mount.md": {
	id: "uk-claims-russia-ran-submarine-operation-over-vital-cables-and-pipelines--while-denials-mount.md";
  slug: "uk-claims-russia-ran-submarine-operation-over-vital-cables-and-pipelines--while-denials-mount";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uk-claims-russian-submarine-snooping-over-cables--a-familiar-spectacle-of-bluster-and-inaction.md": {
	id: "uk-claims-russian-submarine-snooping-over-cables--a-familiar-spectacle-of-bluster-and-inaction.md";
  slug: "uk-claims-russian-submarine-snooping-over-cables--a-familiar-spectacle-of-bluster-and-inaction";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uk-policing-the-digital-self--who-is-truly-in-control--especially-when-you-re-just-trying-to-get-by-in-nairobi.md": {
	id: "uk-policing-the-digital-self--who-is-truly-in-control--especially-when-you-re-just-trying-to-get-by-in-nairobi.md";
  slug: "uk-policing-the-digital-self--who-is-truly-in-control--especially-when-you-re-just-trying-to-get-by-in-nairobi";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ulinzi-starlets-eyeing-police-bullets--top-spot-in-another-nairobi-saga.md": {
	id: "ulinzi-starlets-eyeing-police-bullets--top-spot-in-another-nairobi-saga.md";
  slug: "ulinzi-starlets-eyeing-police-bullets--top-spot-in-another-nairobi-saga";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"un-appoints-former-haiti-pm-to-top-job-in-nairobi.md": {
	id: "un-appoints-former-haiti-pm-to-top-job-in-nairobi.md";
  slug: "un-appoints-former-haiti-pm-to-top-job-in-nairobi";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"un-confirms-several-cases-of-alleged-sexual-abuse-by-kenyan-police-in-haiti---kenyans-co-ke.md": {
	id: "un-confirms-several-cases-of-alleged-sexual-abuse-by-kenyan-police-in-haiti---kenyans-co-ke.md";
  slug: "un-confirms-several-cases-of-alleged-sexual-abuse-by-kenyan-police-in-haiti---kenyans-co-ke";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"un-puts-former-haiti-pm-conille-in-charge-of-kenya-operations.md": {
	id: "un-puts-former-haiti-pm-conille-in-charge-of-kenya-operations.md";
  slug: "un-puts-former-haiti-pm-conille-in-charge-of-kenya-operations";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uncharted-antarctic-island-found-in--danger-zone----an-accidental-discovery-of-limited-consequence.md": {
	id: "uncharted-antarctic-island-found-in--danger-zone----an-accidental-discovery-of-limited-consequence.md";
  slug: "uncharted-antarctic-island-found-in--danger-zone----an-accidental-discovery-of-limited-consequence";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uncle-sam-s-new-favorite-side-piece--why-kenya-is-selling-our-medical-tea-for-a-vip-trade-pass.md": {
	id: "uncle-sam-s-new-favorite-side-piece--why-kenya-is-selling-our-medical-tea-for-a-vip-trade-pass.md";
  slug: "uncle-sam-s-new-favorite-side-piece--why-kenya-is-selling-our-medical-tea-for-a-vip-trade-pass";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"united-opposition-showing-cracks--ego-and-dirty-strategies-lead-to-standoff.md": {
	id: "united-opposition-showing-cracks--ego-and-dirty-strategies-lead-to-standoff.md";
  slug: "united-opposition-showing-cracks--ego-and-dirty-strategies-lead-to-standoff";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"unspoken-divorce-middle-class-kenyan-couples-splitting-living-together.md": {
	id: "unspoken-divorce-middle-class-kenyan-couples-splitting-living-together.md";
  slug: "unspoken-divorce-middle-class-kenyan-couples-splitting-living-together";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"untapped-jobs-small-businesses-kenyan-youth-2025.md": {
	id: "untapped-jobs-small-businesses-kenyan-youth-2025.md";
  slug: "untapped-jobs-small-businesses-kenyan-youth-2025";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"us-baffles-ruto-with-operation-epic-fury-details--hails-kenya-s-empty-condemnations-of-middle-east-strikes.md": {
	id: "us-baffles-ruto-with-operation-epic-fury-details--hails-kenya-s-empty-condemnations-of-middle-east-strikes.md";
  slug: "us-baffles-ruto-with-operation-epic-fury-details--hails-kenya-s-empty-condemnations-of-middle-east-strikes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"us-government-watchdog-investigates-epstein-files-release--more-theater--less-justice.md": {
	id: "us-government-watchdog-investigates-epstein-files-release--more-theater--less-justice.md";
  slug: "us-government-watchdog-investigates-epstein-files-release--more-theater--less-justice";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"us-israel-iran-war--how-nairobi-s-pockets-will-empty.md": {
	id: "us-israel-iran-war--how-nairobi-s-pockets-will-empty.md";
  slug: "us-israel-iran-war--how-nairobi-s-pockets-will-empty";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"us-launches-12bn-project-vault-for-critical-minerals.md": {
	id: "us-launches-12bn-project-vault-for-critical-minerals.md";
  slug: "us-launches-12bn-project-vault-for-critical-minerals";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"us-launches-12bn-project-vault-to-secure-mineral-supplies.md": {
	id: "us-launches-12bn-project-vault-to-secure-mineral-supplies.md";
  slug: "us-launches-12bn-project-vault-to-secure-mineral-supplies";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"us-marines-marching-to-middle-east-amidst-global-oil-crisis.md": {
	id: "us-marines-marching-to-middle-east-amidst-global-oil-crisis.md";
  slug: "us-marines-marching-to-middle-east-amidst-global-oil-crisis";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"us-rights-group-raises-alarm-over-kenya-s-passport-scandal--are-we-all-just-pawns-in-ruto-s-game.md": {
	id: "us-rights-group-raises-alarm-over-kenya-s-passport-scandal--are-we-all-just-pawns-in-ruto-s-game.md";
  slug: "us-rights-group-raises-alarm-over-kenya-s-passport-scandal--are-we-all-just-pawns-in-ruto-s-game";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"us-rights-group-raises-alarm-over-kenya-s-passport-scandal--cites-ruto-s-links-with-sudan-s-rsf.md": {
	id: "us-rights-group-raises-alarm-over-kenya-s-passport-scandal--cites-ruto-s-links-with-sudan-s-rsf.md";
  slug: "us-rights-group-raises-alarm-over-kenya-s-passport-scandal--cites-ruto-s-links-with-sudan-s-rsf";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"us-rights-group-wails-over-kenya-s-passport-shame--whispers-ruto-s-sudan-ties.md": {
	id: "us-rights-group-wails-over-kenya-s-passport-shame--whispers-ruto-s-sudan-ties.md";
  slug: "us-rights-group-wails-over-kenya-s-passport-shame--whispers-ruto-s-sudan-ties";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"us-supreme-court-invalidates-emergency-tariffs--forcing-shift-in-global-trade-strategy.md": {
	id: "us-supreme-court-invalidates-emergency-tariffs--forcing-shift-in-global-trade-strategy.md";
  slug: "us-supreme-court-invalidates-emergency-tariffs--forcing-shift-in-global-trade-strategy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"us-trade-policy-enters-volatile-phase-after-court-invalidates-emergency-tariffs.md": {
	id: "us-trade-policy-enters-volatile-phase-after-court-invalidates-emergency-tariffs.md";
  slug: "us-trade-policy-enters-volatile-phase-after-court-invalidates-emergency-tariffs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"utawala-gypsum-and-medical-bills--the-bitter-truth-behind-sam-kitiki-s--dream--barbershop.md": {
	id: "utawala-gypsum-and-medical-bills--the-bitter-truth-behind-sam-kitiki-s--dream--barbershop.md";
  slug: "utawala-gypsum-and-medical-bills--the-bitter-truth-behind-sam-kitiki-s--dream--barbershop";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"validation-or-violation--spotify-s-new-top-100-list-proves-the-industry-still-needs-a-western-crutch.md": {
	id: "validation-or-violation--spotify-s-new-top-100-list-proves-the-industry-still-needs-a-western-crutch.md";
  slug: "validation-or-violation--spotify-s-new-top-100-list-proves-the-industry-still-needs-a-western-crutch";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"valve-fights-new-york-s-loot-box-lawsuit--denies-gambling-allegations.md": {
	id: "valve-fights-new-york-s-loot-box-lawsuit--denies-gambling-allegations.md";
  slug: "valve-fights-new-york-s-loot-box-lawsuit--denies-gambling-allegations";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"valve-says-it-will-fight-new-york-s-loot-box-lawsuit---predictable-corporate-squabble-over-profits.md": {
	id: "valve-says-it-will-fight-new-york-s-loot-box-lawsuit---predictable-corporate-squabble-over-profits.md";
  slug: "valve-says-it-will-fight-new-york-s-loot-box-lawsuit---predictable-corporate-squabble-over-profits";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"vera-denies-dating-young-musician--ex-otile-brown-throws-shade-anyway.md": {
	id: "vera-denies-dating-young-musician--ex-otile-brown-throws-shade-anyway.md";
  slug: "vera-denies-dating-young-musician--ex-otile-brown-throws-shade-anyway";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"vera-hill-and-the-thirsty-masses--why-the--chichi-call--is-just-another-basic-trap.md": {
	id: "vera-hill-and-the-thirsty-masses--why-the--chichi-call--is-just-another-basic-trap.md";
  slug: "vera-hill-and-the-thirsty-masses--why-the--chichi-call--is-just-another-basic-trap";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"vertical-ai-vs-chatgpt-domain‑tools‑2026.md": {
	id: "vertical-ai-vs-chatgpt-domain‑tools‑2026.md";
  slug: "vertical-ai-vs-chatgpt-domain‑tools‑2026";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"viral-kindness-in-kayole--kenya-s-fragile-safety-net-now-a-digital-circus.md": {
	id: "viral-kindness-in-kayole--kenya-s-fragile-safety-net-now-a-digital-circus.md";
  slug: "viral-kindness-in-kayole--kenya-s-fragile-safety-net-now-a-digital-circus";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"viral-tiktok-surge-forces-highland-cow-relocation-from-hothfield-nature-reserve.md": {
	id: "viral-tiktok-surge-forces-highland-cow-relocation-from-hothfield-nature-reserve.md";
  slug: "viral-tiktok-surge-forces-highland-cow-relocation-from-hothfield-nature-reserve";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"virtual-boy-on-switch--labo-vr-goggles-compatibility-and-key-questions-answered.md": {
	id: "virtual-boy-on-switch--labo-vr-goggles-compatibility-and-key-questions-answered.md";
  slug: "virtual-boy-on-switch--labo-vr-goggles-compatibility-and-key-questions-answered";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"vodka--villains--and-viral-links--the-hypocrisy-of-the--russian-guy--scandal.md": {
	id: "vodka--villains--and-viral-links--the-hypocrisy-of-the--russian-guy--scandal.md";
  slug: "vodka--villains--and-viral-links--the-hypocrisy-of-the--russian-guy--scandal";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"waiguru-says-ruto-has-best-interests-for-mt--kenya--deserves-second-term.md": {
	id: "waiguru-says-ruto-has-best-interests-for-mt--kenya--deserves-second-term.md";
  slug: "waiguru-says-ruto-has-best-interests-for-mt--kenya--deserves-second-term";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"waist-beads-kenya-complete-guide.md": {
	id: "waist-beads-kenya-complete-guide.md";
  slug: "waist-beads-kenya-complete-guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"wandayi-s-substandard-fuel-scandal--petition-seeks-cs-suspension.md": {
	id: "wandayi-s-substandard-fuel-scandal--petition-seeks-cs-suspension.md";
  slug: "wandayi-s-substandard-fuel-scandal--petition-seeks-cs-suspension";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"war-games-and-the-24-hour-casino-of-global-chaos.md": {
	id: "war-games-and-the-24-hour-casino-of-global-chaos.md";
  slug: "war-games-and-the-24-hour-casino-of-global-chaos";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"war-profits-for-the-few-and-inflation-for-the-rest.md": {
	id: "war-profits-for-the-few-and-inflation-for-the-rest.md";
  slug: "war-profits-for-the-few-and-inflation-for-the-rest";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"war-room-or-country-club--trump-turns-mar-a-lago-into-a-battlefield-chic-set.md": {
	id: "war-room-or-country-club--trump-turns-mar-a-lago-into-a-battlefield-chic-set.md";
  slug: "war-room-or-country-club--trump-turns-mar-a-lago-into-a-battlefield-chic-set";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"wargames-for-the-elites-and-empty-pockets-for-the-rest.md": {
	id: "wargames-for-the-elites-and-empty-pockets-for-the-rest.md";
  slug: "wargames-for-the-elites-and-empty-pockets-for-the-rest";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"warlords--wine--and-why-your-passport-is-still-pending--the-nairobi-vip-special.md": {
	id: "warlords--wine--and-why-your-passport-is-still-pending--the-nairobi-vip-special.md";
  slug: "warlords--wine--and-why-your-passport-is-still-pending--the-nairobi-vip-special";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"washington-s--50-million--gift--to-african-film--more-gatekeeping-or-just-new-suits.md": {
	id: "washington-s--50-million--gift--to-african-film--more-gatekeeping-or-just-new-suits.md";
  slug: "washington-s--50-million--gift--to-african-film--more-gatekeeping-or-just-new-suits";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"washington-s-choirboy--ruto-s-selective-memory-in-the-gulf-inferno.md": {
	id: "washington-s-choirboy--ruto-s-selective-memory-in-the-gulf-inferno.md";
  slug: "washington-s-choirboy--ruto-s-selective-memory-in-the-gulf-inferno";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"washington-scrapes-the-bottom-of-the-global-barrel.md": {
	id: "washington-scrapes-the-bottom-of-the-global-barrel.md";
  slug: "washington-scrapes-the-bottom-of-the-global-barrel";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"watch-9-minutes-of-puka-nacua-s-best-plays-from-the-2025-season.md": {
	id: "watch-9-minutes-of-puka-nacua-s-best-plays-from-the-2025-season.md";
  slug: "watch-9-minutes-of-puka-nacua-s-best-plays-from-the-2025-season";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"wavinya-s-road-to-riches--how-to-triple-debt-and-ignore-potholes.md": {
	id: "wavinya-s-road-to-riches--how-to-triple-debt-and-ignore-potholes.md";
  slug: "wavinya-s-road-to-riches--how-to-triple-debt-and-ignore-potholes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"wayne-rooney-s-trousers-are-down-while-coleen-s-net-worth-is-up.md": {
	id: "wayne-rooney-s-trousers-are-down-while-coleen-s-net-worth-is-up.md";
  slug: "wayne-rooney-s-trousers-are-down-while-coleen-s-net-worth-is-up";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"wbd-may-engage-with-paramount-after-ellisons--latest-offer-as-state-of-play-shifts.md": {
	id: "wbd-may-engage-with-paramount-after-ellisons--latest-offer-as-state-of-play-shifts.md";
  slug: "wbd-may-engage-with-paramount-after-ellisons--latest-offer-as-state-of-play-shifts";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"wearables-are-getting-very-messy--patent-lawsuits-proving-innovation-s-high-cost.md": {
	id: "wearables-are-getting-very-messy--patent-lawsuits-proving-innovation-s-high-cost.md";
  slug: "wearables-are-getting-very-messy--patent-lawsuits-proving-innovation-s-high-cost";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"welcome-to-jkia--the-world-s-most-expensive-parking-lot.md": {
	id: "welcome-to-jkia--the-world-s-most-expensive-parking-lot.md";
  slug: "welcome-to-jkia--the-world-s-most-expensive-parking-lot";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"welcome-to-the-2027-rehearsal--where-passports-are-candy-and-philanthropy-is-a-crime.md": {
	id: "welcome-to-the-2027-rehearsal--where-passports-are-candy-and-philanthropy-is-a-crime.md";
  slug: "welcome-to-the-2027-rehearsal--where-passports-are-candy-and-philanthropy-is-a-crime";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"west-virginia-sues-apple--encryption-fails-child-abuse-spread.md": {
	id: "west-virginia-sues-apple--encryption-fails-child-abuse-spread.md";
  slug: "west-virginia-sues-apple--encryption-fails-child-abuse-spread";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"western-kenya-csos-predict-ethnic-politics-will-sink-governance-oversight-again.md": {
	id: "western-kenya-csos-predict-ethnic-politics-will-sink-governance-oversight-again.md";
  slug: "western-kenya-csos-predict-ethnic-politics-will-sink-governance-oversight-again";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"wetang-ula--the-last-man-standing-in-kenya-kwanza-s-power-games--for-now.md": {
	id: "wetang-ula--the-last-man-standing-in-kenya-kwanza-s-power-games--for-now.md";
  slug: "wetang-ula--the-last-man-standing-in-kenya-kwanza-s-power-games--for-now";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"what-happens-when-you-drink-snake-venom.md": {
	id: "what-happens-when-you-drink-snake-venom.md";
  slug: "what-happens-when-you-drink-snake-venom";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"whatsapp-diplomacy-and-kakamega-chaos--sifuna-s-latest-publicity-stunt.md": {
	id: "whatsapp-diplomacy-and-kakamega-chaos--sifuna-s-latest-publicity-stunt.md";
  slug: "whatsapp-diplomacy-and-kakamega-chaos--sifuna-s-latest-publicity-stunt";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"when-the-peacemaker-clocks-out.md": {
	id: "when-the-peacemaker-clocks-out.md";
  slug: "when-the-peacemaker-clocks-out";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"while-you-sweat--they-swing--the-great-kenyan-sell-off-at-karen.md": {
	id: "while-you-sweat--they-swing--the-great-kenyan-sell-off-at-karen.md";
  slug: "while-you-sweat--they-swing--the-great-kenyan-sell-off-at-karen";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"white-house-dinner-leftovers--lobsters-and-steaks-from-cancelled-event-go-to-shelters.md": {
	id: "white-house-dinner-leftovers--lobsters-and-steaks-from-cancelled-event-go-to-shelters.md";
  slug: "white-house-dinner-leftovers--lobsters-and-steaks-from-cancelled-event-go-to-shelters";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"white-house-signals-end-to-subsidized-ai-growth-as-big-tech-faces-full-infrastructure-bill.md": {
	id: "white-house-signals-end-to-subsidized-ai-growth-as-big-tech-faces-full-infrastructure-bill.md";
  slug: "white-house-signals-end-to-subsidized-ai-growth-as-big-tech-faces-full-infrastructure-bill";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"why-adults-pursuing-career-growth-or-personal-interests-are-the--new-majority--student.md": {
	id: "why-adults-pursuing-career-growth-or-personal-interests-are-the--new-majority--student.md";
  slug: "why-adults-pursuing-career-growth-or-personal-interests-are-the--new-majority--student";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"why-does-website-traffic-drop-after-a-google-algorithm-update.md": {
	id: "why-does-website-traffic-drop-after-a-google-algorithm-update.md";
  slug: "why-does-website-traffic-drop-after-a-google-algorithm-update";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"why-firms-must-pay-attention-to-employment-practices-risk.md": {
	id: "why-firms-must-pay-attention-to-employment-practices-risk.md";
  slug: "why-firms-must-pay-attention-to-employment-practices-risk";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"why-kenyan-genzs-prefer-protests-to-voting.md": {
	id: "why-kenyan-genzs-prefer-protests-to-voting.md";
  slug: "why-kenyan-genzs-prefer-protests-to-voting";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"why-kenyan-men-are-flocking-to-traditional-herbal-clinics-for-masculinity-solutions.md": {
	id: "why-kenyan-men-are-flocking-to-traditional-herbal-clinics-for-masculinity-solutions.md";
  slug: "why-kenyan-men-are-flocking-to-traditional-herbal-clinics-for-masculinity-solutions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"why-kenyas-private-schools-are-quietly-sabotaging-the-grade-10-transition.md": {
	id: "why-kenyas-private-schools-are-quietly-sabotaging-the-grade-10-transition.md";
  slug: "why-kenyas-private-schools-are-quietly-sabotaging-the-grade-10-transition";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"why-men-are-nolonger-getting-laid.md": {
	id: "why-men-are-nolonger-getting-laid.md";
  slug: "why-men-are-nolonger-getting-laid";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"why-modernising-and-expanding-jkia-is-a-strategic-investment.md": {
	id: "why-modernising-and-expanding-jkia-is-a-strategic-investment.md";
  slug: "why-modernising-and-expanding-jkia-is-a-strategic-investment";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"why-ruto-s-odm-pact-raises-eyebrows-as-2027-political-battle-looms.md": {
	id: "why-ruto-s-odm-pact-raises-eyebrows-as-2027-political-battle-looms.md";
  slug: "why-ruto-s-odm-pact-raises-eyebrows-as-2027-political-battle-looms";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"why-trump-s-rant-against-bad-bunny-is-the-ultimate-mid-life-crisis-for-the-american-dream.md": {
	id: "why-trump-s-rant-against-bad-bunny-is-the-ultimate-mid-life-crisis-for-the-american-dream.md";
  slug: "why-trump-s-rant-against-bad-bunny-is-the-ultimate-mid-life-crisis-for-the-american-dream";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"why-your-child-s-new-ai-friend-is-actually-a-digital-stalker.md": {
	id: "why-your-child-s-new-ai-friend-is-actually-a-digital-stalker.md";
  slug: "why-your-child-s-new-ai-friend-is-actually-a-digital-stalker";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"wickets--whining--and-wasted-potential--the-t20-world-cup-s-messiest-moments.md": {
	id: "wickets--whining--and-wasted-potential--the-t20-world-cup-s-messiest-moments.md";
  slug: "wickets--whining--and-wasted-potential--the-t20-world-cup-s-messiest-moments";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"woman-abandoned-as-baby-in-kenya-returns-to-africa-as-a-therapist---wyomingnewsnow-tv.md": {
	id: "woman-abandoned-as-baby-in-kenya-returns-to-africa-as-a-therapist---wyomingnewsnow-tv.md";
  slug: "woman-abandoned-as-baby-in-kenya-returns-to-africa-as-a-therapist---wyomingnewsnow-tv";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"woman-abandoned-as-baby-in-kenya-returns-to-africa-as-therapist--missions-abound.md": {
	id: "woman-abandoned-as-baby-in-kenya-returns-to-africa-as-therapist--missions-abound.md";
  slug: "woman-abandoned-as-baby-in-kenya-returns-to-africa-as-therapist--missions-abound";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"women-s-empowerment-in-agriculture-key-to-kenya-s-economic-growth--experts-say.md": {
	id: "women-s-empowerment-in-agriculture-key-to-kenya-s-economic-growth--experts-say.md";
  slug: "women-s-empowerment-in-agriculture-key-to-kenya-s-economic-growth--experts-say";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"wordpress-scales-global-educational-initiatives-to-fortify-digital-workforce-pipeline.md": {
	id: "wordpress-scales-global-educational-initiatives-to-fortify-digital-workforce-pipeline.md";
  slug: "wordpress-scales-global-educational-initiatives-to-fortify-digital-workforce-pipeline";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"world-bank-slaps-2-kenyan-firms-with-21-month-ban-over-ksh149-8-billion-scheme.md": {
	id: "world-bank-slaps-2-kenyan-firms-with-21-month-ban-over-ksh149-8-billion-scheme.md";
  slug: "world-bank-slaps-2-kenyan-firms-with-21-month-ban-over-ksh149-8-billion-scheme";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"world-s-high-seas-crime-fight-amidst-turbulence--a-kenyan-view.md": {
	id: "world-s-high-seas-crime-fight-amidst-turbulence--a-kenyan-view.md";
  slug: "world-s-high-seas-crime-fight-amidst-turbulence--a-kenyan-view";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"xbox-s-demise-looms--microsoft-s-ai-gambit-or-final-nail.md": {
	id: "xbox-s-demise-looms--microsoft-s-ai-gambit-or-final-nail.md";
  slug: "xbox-s-demise-looms--microsoft-s-ai-gambit-or-final-nail";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"yamal-condemns--intolerable--chants-as-racism-mars-spain-friendly.md": {
	id: "yamal-condemns--intolerable--chants-as-racism-mars-spain-friendly.md";
  slug: "yamal-condemns--intolerable--chants-as-racism-mars-spain-friendly";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"yellow-stickers-and-broken-promises--the-global-art-of-robbing-the-poor.md": {
	id: "yellow-stickers-and-broken-promises--the-global-art-of-robbing-the-poor.md";
  slug: "yellow-stickers-and-broken-promises--the-global-art-of-robbing-the-poor";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"you-can--hack--chatgpt-to-become-the-world-s-best-anything---a-directory-of-deceit.md": {
	id: "you-can--hack--chatgpt-to-become-the-world-s-best-anything---a-directory-of-deceit.md";
  slug: "you-can--hack--chatgpt-to-become-the-world-s-best-anything---a-directory-of-deceit";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"your-fave-s-designer-threads-are-on-credit--the--110-million-african-music-lie.md": {
	id: "your-fave-s-designer-threads-are-on-credit--the--110-million-african-music-lie.md";
  slug: "your-fave-s-designer-threads-are-on-credit--the--110-million-african-music-lie";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"your-identity-for-sale-while-the-elite-hide-in-runda.md": {
	id: "your-identity-for-sale-while-the-elite-hide-in-runda.md";
  slug: "your-identity-for-sale-while-the-elite-hide-in-runda";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"your-passport-is-now-a-party-favor--why-your-next--soft-life--trip-just-got-cancelled.md": {
	id: "your-passport-is-now-a-party-favor--why-your-next--soft-life--trip-just-got-cancelled.md";
  slug: "your-passport-is-now-a-party-favor--why-your-next--soft-life--trip-just-got-cancelled";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"your-password-is-a-suggestion--not-a-shield.md": {
	id: "your-password-is-a-suggestion--not-a-shield.md";
  slug: "your-password-is-a-suggestion--not-a-shield";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"your-payslip-is-a-crime-scene--and-the-government-is-holding-the-knife.md": {
	id: "your-payslip-is-a-crime-scene--and-the-government-is-holding-the-knife.md";
  slug: "your-payslip-is-a-crime-scene--and-the-government-is-holding-the-knife";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"your-pity-is-their-profit--the-sick-business-of-forced-begging.md": {
	id: "your-pity-is-their-profit--the-sick-business-of-forced-begging.md";
  slug: "your-pity-is-their-profit--the-sick-business-of-forced-begging";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"zakayo-plays-fire-while-the-kitchen-burns.md": {
	id: "zakayo-plays-fire-while-the-kitchen-burns.md";
  slug: "zakayo-plays-fire-while-the-kitchen-burns";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"zakayo-s-first-world-fever-dream-and-the-sh550-million-alliance-handout.md": {
	id: "zakayo-s-first-world-fever-dream-and-the-sh550-million-alliance-handout.md";
  slug: "zakayo-s-first-world-fever-dream-and-the-sh550-million-alliance-handout";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"zakayo-s-global-hustle--chasing-peace-abroad-while-the-house-is-on-fire.md": {
	id: "zakayo-s-global-hustle--chasing-peace-abroad-while-the-house-is-on-fire.md";
  slug: "zakayo-s-global-hustle--chasing-peace-abroad-while-the-house-is-on-fire";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"zakayo-s-new-carrot--buying-loyalty-one-prison-guard-at-a-time.md": {
	id: "zakayo-s-new-carrot--buying-loyalty-one-prison-guard-at-a-time.md";
  slug: "zakayo-s-new-carrot--buying-loyalty-one-prison-guard-at-a-time";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"zakayo-the-peacemaker--ruto-plays-global-policeman-while-local-celebs-chase-clout.md": {
	id: "zakayo-the-peacemaker--ruto-plays-global-policeman-while-local-celebs-chase-clout.md";
  slug: "zakayo-the-peacemaker--ruto-plays-global-policeman-while-local-celebs-chase-clout";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"zealous-ruto-re-election-campaigner-faces-heat-as-fuel-import-scandal-unravels.md": {
	id: "zealous-ruto-re-election-campaigner-faces-heat-as-fuel-import-scandal-unravels.md";
  slug: "zealous-ruto-re-election-campaigner-faces-heat-as-fuel-import-scandal-unravels";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"zuck-is-watching-you-pee--the-messy-reality-of-meta-s-ai-smart-glasses.md": {
	id: "zuck-is-watching-you-pee--the-messy-reality-of-meta-s-ai-smart-glasses.md";
  slug: "zuck-is-watching-you-pee--the-messy-reality-of-meta-s-ai-smart-glasses";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"zuckerberg-s-courthouse-entourage-arrived-in-meta-ray-bans.md": {
	id: "zuckerberg-s-courthouse-entourage-arrived-in-meta-ray-bans.md";
  slug: "zuckerberg-s-courthouse-entourage-arrived-in-meta-ray-bans";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"zuckerberg-s-meta-buys-ai-agent--slop--social-network.md": {
	id: "zuckerberg-s-meta-buys-ai-agent--slop--social-network.md";
  slug: "zuckerberg-s-meta-buys-ai-agent--slop--social-network";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"zuckerberg-testifies-as-landmark-trial-challenges-big-tech-liability-shields.md": {
	id: "zuckerberg-testifies-as-landmark-trial-challenges-big-tech-liability-shields.md";
  slug: "zuckerberg-testifies-as-landmark-trial-challenges-big-tech-liability-shields";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
