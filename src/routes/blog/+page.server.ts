export async function load ({ fetch }) {
    const postsIndexResponse = await fetch(`/data/posts/posts.json`);
    
	if (!postsIndexResponse.ok) {
        throw new Error('Posts index could not be found');
    }

    const postsIndexData = await postsIndexResponse.json();
	const fetches = postsIndexData.posts.map(async (fileName: string) => {
        const response = await fetch(`/data/posts/${fileName}.json`);
        
		if (!response.ok) {
            throw new Error(`Failed to load post ${fileName}`);
        }

        return response.json();
    });

    const articles = await Promise.all(fetches);

    return {
        articles
    };
}
