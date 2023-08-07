import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
import { useSelector } from "react-redux";
import { selectPizzaData } from "../../redux/pizza/selectors";
type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onChangePage,
}) => {
  const { allItems } = useSelector(selectPizzaData);

  const pageCount = Math.ceil(allItems.length / 8);
  return (
    <div>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={8}
        pageCount={pageCount}
        previousLabel="<"
        forcePage={currentPage - 1}
      />
    </div>
  );
};

export default Pagination;
