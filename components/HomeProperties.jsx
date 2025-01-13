import PropertyCard from "./PropertyCard";
import Link from "next/link";
import connectDB from "@/config/database";
import Property from "@/models/Property";

const HomeProperties = async () => {
  await connectDB();
  const recentProperties = await Property.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  //console.log(recentProperties);

  return (
    <>
      <section id="properties">
        <div className="container-xl lg:container m-auto px-4 py-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 from-40% to-blue-500 to-60% bg-clip-text text-transparent text-center mb-6">
            Recent Properties
          </h2>
          {recentProperties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
      {/* Can use "max-w-lg" to limit the width size of the button */}
      <section className="mx-auto container max-w-lg my-10 px-6">
        {/* REMEMBER "Link" by default is inline */}
        <Link
          href="/properties"
          className="block text-center bg-black px-6 py-4  text-white rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
