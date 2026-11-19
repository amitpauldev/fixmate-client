import "server-only";

export async function uploadToImgBB(file: File) {
	const apiKey = process.env.IMGBB_API_KEY;

	if (!apiKey) {
		throw new Error("ImgBB API key is missing");
	}

	const formData = new FormData();
	formData.append("key", apiKey);
	formData.append("image", file);

	const response = await fetch("https://api.imgbb.com/1/upload", {
		method: "POST",
		body: formData,
	});

	if (!response.ok) {
		throw new Error("Image upload failed");
	}

	const data: unknown = await response.json();
	if (
		typeof data !== "object" ||
		data === null ||
		!("data" in data) ||
		typeof data.data !== "object" ||
		data.data === null ||
		!("url" in data.data) ||
		typeof data.data.url !== "string" ||
		!data.data.url
	) {
		throw new Error("ImgBB returned an invalid image response");
	}

	return data.data.url;
}
