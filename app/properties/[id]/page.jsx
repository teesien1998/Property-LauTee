import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyDetails from "@/components/PropertyDetails";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import PropertyImages from "@/components/PropertyImages";
import { convertToSerializeableObject } from "@/utils/convertToObject";
import { FaExclamation } from "react-icons/fa";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButton from "@/components/ShareButton";
import PropertyContactForm from "@/components/PropertyContactForm";

const ProperytPage = async ({ params }) => {
  // asynchronous access of `params.id`.
  const { id } = await params;

  await connectDB();
  const propertyDoc = await Property.findById(id).lean();
  const property = convertToSerializeableObject(propertyDoc);

  if (!property) {
    return (
      <section className="bg-blue-50 min-h-screen flex-grow">
        <div className="container mx-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-24 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <div className="flex justify-center">
              <FaExclamation className="text-8xl text-yellow-400" />
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold mt-4 mb-2">
                Product Not Found
              </h1>
              <p className="text-gray-500 text-xl mb-10">
                The product you are looking for does not exist.
              </p>
              <Link
                href="/"
                className=" bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-grow"></div>
      </section>
    );
  }

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section id="back-link">
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Back to Properties
          </Link>
        </div>
      </section>
      <section id="property-details" class="bg-blue-50">
        <div class="container m-auto py-10 px-6 grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
          <PropertyDetails property={property} />
          <aside className="space-y-4">
            <BookmarkButton property={property} />
            <ShareButton property={property} />
            <PropertyContactForm property={property} />
          </aside>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};

export default ProperytPage;
