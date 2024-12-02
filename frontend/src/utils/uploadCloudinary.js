const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
const cloud_name = import.meta.env.VITE_CLOUD_NAME;

const uploadImageToCloudinary = async (file) => {
    const uploadData = new FormData();

    // Ensure `upload_preset` is valid before appending
    if (!upload_preset) {
        console.error("Upload preset is missing");
        throw new Error("Upload preset is not configured correctly.");
    }

    uploadData.append('file', file);
    uploadData.append('upload_preset', upload_preset);

    try {
        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
            {
                method: "POST",
                body: uploadData,
            }
        );

        if (!res.ok) {
            throw new Error(`Cloudinary upload failed with status ${res.status}`);
        }

        const data = await res.json();

        // Check if the data includes the expected response
        if (!data.secure_url) {
            throw new Error("Cloudinary upload failed, no secure URL returned");
        }

        return data; // Return the data containing the image URL
    } catch (error) {
        console.error("Error during image upload:", error);
        throw error; // Rethrow the error to handle it in your component
    }
}

export default uploadImageToCloudinary;
