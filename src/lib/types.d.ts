export type HeadingClassModifier = 'gallery-article';

export type HeadingComponent = {
	type: 'heading';
	parameters: {
		level: 1 | 2 | 3;
		text: string;
		modifiers?: HeadingClassModifier[];
	};
};

export type ParagraphComponent = {
	type: 'paragraph';
	parameters: {
		text: string;
	};
};

export type ListComponent = {
	type: 'list';
	parameters: {
		listType: 'ordered' | 'unordered'
		items: string[];
	};
};

export type FigureComponent = {
	type: 'figure';
	parameters: {
		src: string;
		expandedSrc: string;
		alt: string;
		caption: string;
	};
};

export type ImageComparisonComponent = {
	type: 'image-comparison';
	parameters: {
		lowerImageSrc: string;
		lowerImageAlt: string;
		upperImageSrc: string;
		upperImageAlt: string;
	};
};

type SharedComponentProperties = {
	blockClasses?: string;
};

export type PageComponent = SharedComponentProperties & (HeadingComponent | ParagraphComponent | ListComponent | FigureComponent | ImageComparisonComponent);

export type PageComponentMap = {
	[key: string]: typeof Heading | typeof Paragraph | typeof List | typeof Figure | typeof ImageComparison
};

export type Image = {
	src: string;
	alt: string;
};

export type Article = {
	metadata: {
		slug: string;
		title: string;
		date: string;
		summary: string;
		thumbnail: Image,
		published: boolean;
		year?: string;
	};
	content: {
		heading: string;
		components: PageComponent[];
	};
}

export type ArticleGroup = {
	name: string;
	articles: Article[];
};

export type GalleryArticleObjectInfo = {
	otherNames: string;
	type: string;
	age: string;
	distance: string;
	size: string;
	constellation: string;
};

export type GalleryArticleEquipmentAndMethod = {
	optics: string;
	mount: string;
	camera: string;
	exposures: string;
	software: string;
	date?: string;
};

export type ExpandedGalleryItem = {
	image: ExpandableImageProps;
	title: string;
	objectInformation: GalleryArticleObjectInfo;
	equipmentAndMethod: GalleryArticleEquipmentAndMethod;
	content: {
		components: PageComponent[];
	};
	date?: string;
};

export type GalleryItem = {
	metadata: {
		date: string;
		slug: string;
		published: boolean;
	};
	collapsedView: {
		title: string;
		thumbnail: Image;
	};
	expandedView: ExpandedGalleryItem;
	// TODO: create separate type for processed gallery items which is a union of GalleryItem and these additional props
	index?: number;
};

export type GalleryArticleMode = 'overlay' | 'static';
export type NavPageName = 'gallery' | 'blog' | 'about';

export type ExpandableImageProps = {
	src: string;
	expandedSrc: string;
	alt?: string;
};
export type ImageComparisonProps = {
	lowerImageSrc: string;
    lowerImageAlt: string;
    upperImageSrc: string;
    upperImageAlt: string;
};
export type ImageProps = {
	src: string;
	alt?: string;
};