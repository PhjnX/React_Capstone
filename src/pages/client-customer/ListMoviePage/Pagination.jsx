  import PropTypes from "prop-types";

  export default function Pagination({ page, totalPages, setPage }) {
    return (
      <div className="flex justify-center items-center space-x-2 mt-12">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
            page === 1
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-purple-500 text-white hover:bg-purple-700"
          }`}
        >
          ←
        </button>

        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => {
                setPage(pageNumber);
                window.scrollTo({ top: 400, behavior: "smooth" }); // Cuộn đến vị trí phù hợp
              }}
              className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                page === pageNumber
                  ? "bg-purple-700 text-white border-2 border-purple-900"
                  : "bg-gray-700 text-white hover:bg-gray-500"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
            page === totalPages
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-purple-500 text-white hover:bg-purple-700"
          }`}
        >
          →
        </button>
      </div>
    );
  }

  Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
  };
