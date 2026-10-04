import { Pagination } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Paginations = ({ noOfPages, noOfTotalElements }) => {
  const [searchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const params = new URLSearchParams(searchParams);

  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const onChangeHandler = (event, value) => {
    params.set("page", value.toString());
    navigate(`${pathname}?${params}`);
  };

//   console.log("noOfPages:", noOfPages);
//   console.log("currentPage:", currentPage);

  return (
    <div>
      <Pagination
        count={noOfPages}
        page={currentPage}
        defaultPage={1}
        siblingCount={0}
        boundaryCount={2}
        shape="rounded"
        onChange={onChangeHandler}
      />
    </div>
  );
};
export default Paginations;
