import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "@styles/Pagination.scss";

type PaginationProps = {
  totalBooks: number;
  booksPerPage: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  totalBooks,
  booksPerPage,
  currentPage,
  paginate,
}) => {
  const navigate = useNavigate();
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      paginate(pageNumber);
      navigate(`?page=${pageNumber}`); // Update URL with the new page number
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={`pagination__item ${
          currentPage === 1 ? "pagination__item--disabled" : ""
        }`}
        onClick={handlePrevious}
      >
        <a href="#" className="pagination__link">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className={currentPage === 1 ? "pagination__link__icons" : ""}
          />
        </a>
      </li>
      <li className="pagination__item pagination__item--active">
        <a href="#" className="pagination__link">
          {currentPage}
        </a>
      </li>
      <li
        className={`pagination__item ${
          currentPage === totalPages ? "pagination__item--disabled" : ""
        }`}
        onClick={handleNext}
      >
        <a href="#" className="pagination__link">
          <FontAwesomeIcon
            icon={faChevronRight}
            className={
              currentPage === totalPages ? "pagination__link__icons" : ""
            }
          />
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
