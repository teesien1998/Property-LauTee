import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializeableObject } from "@/utils/convertToObject";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SearchResultsPage = async ({
  searchParams: { location, propertyType },
}) => {
  await connectDB();

  const query = {};

  if (location?.trim()) {
    const locationPattern = new RegExp(location, "i");
    query.$or = [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.state": locationPattern },
      { "location.zipcode": locationPattern },
    ];
  }

  if (propertyType && propertyType !== "All") {
    const typePattern = new RegExp(propertyType, "i");
    query.type = typePattern;
  }

  const propertiesQueryResults = await Property.find(query).lean();
  const properties = propertiesQueryResults.map(convertToSerializeableObject);
  //   console.log(properties);

  return (
    <>
      <section
        id="search-form"
        className="bg-gradient-to-r from-teal-50 via-white to-teal-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <PropertySearchForm />
        </div>
      </section>
      <section id="bookmark-property" className="px-4 py-6">
        <div className="container-xl lg:container mx-auto px-4 py-6">
          <Link
            href="/properties"
            className="flex items-center text-gray-800 hover:underline mb-3"
          >
            <FaArrowAltCircleLeft className="mr-2" /> Back To Properties
          </Link>
          <h1 className="text-3xl font-bold text-blue-500 mb-4">
            Search Results
          </h1>
          {properties.length === 0 ? (
            <p>No search results</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;
