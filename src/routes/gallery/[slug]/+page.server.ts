export async function load ({ params, fetch }) {
	const { slug } = params;
    const galleryItemResponse = await fetch(`/data/gallery/${params.slug}.json`);
    
	if (!galleryItemResponse.ok) {
        throw new Error(`Gallery item "${slug}" could not be found`);
    }

	const article = galleryItemResponse.json();

    return article;
}
