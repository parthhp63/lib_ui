import React, { useState } from "react";
// import "./Pagination.css"

const PaginationComponent = ({ totalPages, currentPage, pageChange }) => {
  const [pageNumber, setPageNumber] = useState(currentPage);

  const handleFirstPage = () => {
    pageChange(1);
    setPageNumber(1);
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      pageChange(pageNumber - 1);
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      pageChange(pageNumber + 1);
      setPageNumber(pageNumber + 1);
    }
  };

  const handleLastPage = () => {
    pageChange(totalPages);
    setPageNumber(totalPages);
  };

  return (
    <div className="pagination-container">
      <button className="pgbtn" onClick={handleFirstPage} disabled={pageNumber === 1}>
        &lt;&lt;
      </button>
      <button className="pgbtn" onClick={handlePreviousPage} disabled={pageNumber === 1}>
        &lt;
      </button>
      <span className="pageno">{pageNumber}</span>
      <button className="pgbtn" onClick={handleNextPage} disabled={pageNumber === totalPages}>
        &gt;
      </button>
      <button className="pgbtn" onClick={handleLastPage} disabled={pageNumber === totalPages}>
        &gt;&gt;
      </button>
    </div>
  );
};

export default PaginationComponent;
