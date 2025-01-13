import Link from "next/link";

const Pagination = ({ page, pageSize, totalItems }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <section className="container mx-auto flex justify-center items-center mt-8">
      {page > 1 && (
        <Link
          href={`/properties?page=${page - 1}`}
          className="px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
        >
          Previous
        </Link>
      )}
      {[...Array(totalPages).keys()].map((page) => (
        <Link href={`/properties?page=${page + 1}`}>
          <div
            className="px-2 py-1 border border-gray-300 hover:bg-gray-100"
            key={page + 1}
          >
            {page + 1}
          </div>
        </Link>
      ))}
     
      {page < totalPages && (
        <Link
          href={`/properties?page=${page + 1}`}
          className="px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
        >
          Next
        </Link>
      )}
    </section>
  );
};

export default Pagination;
