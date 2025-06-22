export async function load ({ params, fetch }) {
	const { slug } = params;
    const postResponse = await fetch(`/data/posts/${params.slug}.json`);
    
	if (!postResponse.ok) {
        throw new Error(`Post "${slug}" could not be found`);
    }

	const article = postResponse.json();

    return article;
}
