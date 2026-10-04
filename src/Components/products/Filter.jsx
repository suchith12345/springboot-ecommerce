import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch } from "react-icons/fi";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Button,
} from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Filter = ({categories}) => {
  // const categories = [-----category is fron the back end as the props
  //   { categoryId: 1, categoryName: " Electronics " },
  //   { categoryId: 2, categoryName: "Laptops" },
  //   { categoryId: 3, categoryName: "Phones" },
  //   { categoryId: 4, categoryName: "Clothing" },
  //   { categoryId: 5, categoryName: "Bicycles" },
  // ];

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const currentCategory = searchParams.get("category") || "all";
    const currentSortOrder = searchParams.get("sortOrder") || "asc";
    const currentSearchTerm = searchParams.get("keyword") || "";

    setCategory(currentCategory);
    setSortOrder(currentSortOrder);
    setSearchTerm(currentSearchTerm);
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        searchParams.set("keyword", searchTerm);
      } else {
        searchParams.delete("keyword");
      }
      navigate(`${pathname}?${searchParams.toString()}`);
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const HandleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory == "all") {
      params.delete("category");
    } else {
      params.set("category", selectedCategory);
    }
    navigate(`${pathname}?${params}`);
    setCategory(event.target.value);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    // console.log("NEW:", newOrder);
    setSortOrder(newOrder);
    params.set("sortOrder", newOrder);
    navigate(`${pathname}?${params}`);
  };

  const handleClearFilter = () => {
    navigate({ pathname: window.location.pathname });
  };

  return (
    <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
      {/* {search-Bar} */}
      <div className="relative flex items-center  sm:w-[420px]   2xl:w-[420px] w-full">
        <input
          type="input"
          placeholder="Search roduct"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-400 text-slate-800 rounded-md py-1.5 pl-10 pr-4 
          focus:outline-none  focus:ring-2 focus:ring-[#1976d2]"
        />
        <FiSearch className="absolute left-3 text-slate-800 size-{20}" />
      </div>
      {/* { category button} */}
      <div className="flex sm:flex-row flex-col gap-8 items-center ">
        <FormControl
          className="text-slate-800 border-slate-700 "
          variant="outlined"
          size="small"
        >
          <InputLabel id="Category-select-lable">Category</InputLabel>
          <Select
            className="min-w-[130px] text-slate-800"
            label="Category"
            labelId="Category-select-lable"
            value={category}
            onChange={HandleCategoryChange}
          >
            <MenuItem value="all">All</MenuItem>
            {categories.map((item) => {
              return (
                <MenuItem key={item.categoryId} value={item.categoryName}>
                  {item.categoryName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        {/* {sort button and clear button} */}
        <Tooltip title="Sorted by price :asc">
          <Button
            onClick={toggleSortOrder}
            variant="contained"
            color="primary"
            className="flex items-center gap-2 h-10 "
          >
            Sort By
            {sortOrder == "asc" ? (
              <FiArrowUp size={20} />
            ) : (
              <FiArrowDown size={20} />
            )}
          </Button>
        </Tooltip>

        <button
          onClick={handleClearFilter}
          className="flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md"
        >
          <FiRefreshCw size={16} />
          <span className="font-semibold">Clear Filter</span>
        </button>
      </div>
    </div>
  );
};
export default Filter;
