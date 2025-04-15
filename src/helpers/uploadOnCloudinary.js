import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

export async function uploadOnCloudinary(file, folder = "profile") {
  console.log(file);
  return new Promise((resolve, reject) => {
    const chunks = [];
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );

    if (file instanceof Buffer) {
      stream.end(file);
    } else {
      file.stream().pipe(stream);
    }
  });
}
