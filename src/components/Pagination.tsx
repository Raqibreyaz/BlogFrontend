import React, { useMemo } from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // If there's only one page or no pages, don't render the component
  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageButtons = useMemo(() => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2); // Previous two pages
    const endPage = Math.min(totalPages, currentPage + 2); // Next two pages

    // Add previous page numbers
    for (let i = startPage; i < currentPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className="px-3 py-1 rounded-md bg-white text-blue-500 hover:bg-blue-200 text-lg"
          aria-label={`Page ${i}`}
        >
          {i}
        </button>
      );
    }

    // Add current page
    pages.push(
      <button
        key={currentPage}
        className="px-3 py-1 rounded-md bg-blue-600 text-white text-lg"
        aria-label={`Current Page ${currentPage}`}
      >
        {currentPage}
      </button>
    );

    // Add next page numbers
    for (let i = currentPage + 1; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className="px-3 py-1 rounded-md bg-white text-blue-500 hover:bg-blue-200 text-lg"
          aria-label={`Page ${i}`}
        >
          {i}
        </button>
      );
    }

    // Add ellipsis if there are pages beyond the next two pages
    if (endPage < totalPages - 1) {
      pages.push(<span key="ellipsis" className="px-3 py-1">...</span>);
    }

    // Add last page
    if (endPage < totalPages) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-1 rounded-md bg-white text-blue-500 hover:bg-blue-200 text-lg"
          aria-label={`Page ${totalPages}`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  }, [currentPage, totalPages, onPageChange]);

  return (
    <div className="flex items-center justify-center space-x-2 mt-4 text-xl">
      {currentPage > 1 && (
        <button
          onClick={handlePrevious}
          className="px-3 py-1 rounded-md bg-white text-blue-500 hover:text-blue-600"
          aria-label="Previous Page"
        >
          <HiChevronDoubleLeft />
        </button>
      )}
      {pageButtons}
      {currentPage < totalPages && (
        <button
          onClick={handleNext}
          className="px-3 py-1 rounded-md bg-white text-blue-500 hover:text-blue-600"
          aria-label="Next Page"
        >
          <HiChevronDoubleRight />
        </button>
      )}
    </div>
  );
};

export default Pagination;
