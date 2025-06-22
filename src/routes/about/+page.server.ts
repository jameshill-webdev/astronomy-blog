export async function load({ fetch }) {
	const postResponse = await fetch(`/data/about.json`);

	if (!postResponse.ok) {
		throw new Error(`about.json could not be found`);
	}

	const article = postResponse.json();

	return article;
}
