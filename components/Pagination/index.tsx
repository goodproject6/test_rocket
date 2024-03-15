import React from "react";
import Iconify from "../Elements/icon";


interface PaginationInterface {
  total: number;
  currentPage: number;
}

interface PaginationProps {
  pagination: PaginationInterface;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
}) => {
  const { total, currentPage } = pagination;
  const itemsPerPage = 30;
  const totalPages = Math.ceil(total / itemsPerPage);

  // Generate the range of page numbers to be displayed
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap justify-center mt-4 border-t pt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 border-r flex items-center text-sm rounded-l-lg bg-white shadow-sm gap-2 font-medium hover:bg-gray-200"
      >
        <Iconify icon="ic:round-arrow-back" className="text-lg" />
        Previous
      </button>

      <div>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`h-10 w-10 text-sm ${
              page === currentPage
                ? "bg-gray-200 font-medium"
                : "bg-white shadow-sm border-l"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 border-l flex items-center text-sm rounded-r-lg bg-white shadow-sm gap-2 font-medium hover:bg-gray-200"
      >
        Next
        <Iconify icon="lucide:arrow-right" className="text-lg" />
      </button>
    </div>
  );
};

export default Pagination;
