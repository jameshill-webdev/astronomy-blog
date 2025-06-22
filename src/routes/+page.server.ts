export async function load ({ fetch }) {
    const galleryItemsIndexResponse = await fetch(`/data/gallery/gallery.json`);
    
	if (!galleryItemsIndexResponse.ok) {
        throw new Error('Gallery index could not be found');
    }

    const galleryIndexData = await galleryItemsIndexResponse.json();
	const fetches = galleryIndexData.items.map(async (fileName: string) => {
        const response = await fetch(`/data/gallery/${fileName}.json`);
        
		if (!response.ok) {
            throw new Error(`Failed to load gallery item ${fileName}`);
        }

        return response.json();
    });

    const items = await Promise.all(fetches);

    return {
        gallery: {
            items
        }
    };
}
