"use server";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User Id is required");
  }

  const { userId } = sessionUser;

  const property = await Property.findById(propertyId);

  if (!property) throw new Error("Property Not Found");

  // Verify ownership
  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  if (property.images.length > 0) {
    for (let image of property.images) {
      const publicId = image.split("/").at(-1).split(".").at(0);
      await cloudinary.uploader.destroy(`property_webdev/${publicId}`);
    }
  }

  // // Extract public ID from image URLs
  // const publicIds = property.images.map((imageUrl) => {
  //   const parts = imageUrl.split("/");
  //   return parts.at(-1).split(".").at(0);
  // });

  // if (publicIds.length > 0) {
  //   // Delete images from Cloudinary
  //   for (let publicId of publicIds) {
  //     await cloudinary.uploader.destroy(`property_webdev/${publicId}`);
  //   }
  // }

  await property.deleteOne();

  revalidatePath("/", "layout");
}

export default deleteProperty;
