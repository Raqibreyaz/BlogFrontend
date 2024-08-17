import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
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

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-3 py-1 rounded-md ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} hover:bg-blue-300`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        onClick={handlePrevious}
        className="px-3 py-1 rounded-md bg-white text-blue-500 hover:bg-blue-300"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={handleNext}
        className="px-3 py-1 rounded-md bg-white text-blue-500 hover:bg-blue-300"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
