import PropertySearchForm from "./PropertySearchForm";

const Hero = () => {
  return (
    <section
      id="search-form"
      className="bg-gradient-to-r from-teal-50 via-white to-teal-50"
    >
      {/* Hero Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mb-4 flex flex-col items-center">
        {/* Title & Desc */}
        <div className="text-center">
          <h1 className="font-extrabold text-gray-800 text-4xl sm:text-5xl md:text-6xl">
            Find The Perfect Rental
          </h1>
          <p className="my-4 text-md sm:text-xl text-gray-800">
            Discover the perfect property that suits your needs.
          </p>
        </div>
        {/* <!-- Form Component --> */}
        <PropertySearchForm />
      </div>
    </section>
  );
};

export default Hero;
