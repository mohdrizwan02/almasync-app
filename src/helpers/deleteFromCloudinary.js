export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Deleted:", result);
    return result;
  } catch (err) {
    console.error("Delete Error:", err);
    throw err;
  }
};
