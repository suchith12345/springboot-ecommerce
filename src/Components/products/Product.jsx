import { FaExclamationTriangle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategory, fetchProducts } from "../../store/Action";
import Filter from "./Filter";
import Loader from "../shared/Loader";
import Paginations from "../shared/Paginations";
import ProductCart from "../shared/ProductCart";
import UseProductFilter from "../../hooks/UseProductFilter";

const Product = () => {
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  // const errorMeassage = "";
  // const isLoading=false;

  const { products, categories, pagination } = useSelector(
    (state) => state.products,
  );
  const dispatch = useDispatch();

  UseProductFilter();

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  return (
    <div>
      <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
        <Filter categories={categories ? categories : []} />
        {isLoading ? (
          <Loader text={"Product loading......"} />
        ) : errorMessage ? (
          <div className="flex justify-center items-center h-[200px]">
            <FaExclamationTriangle className="text-slate-700 text-3xl mr-2" />
            <span className="text-slate-700 text-lg font-medium">
              {errorMessage}
            </span>
          </div>
        ) : (
          <div className="min-h-[700px]">
            <div className="pb-6 pt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-6 gap-x-6">
              {products &&
                products.map((item, i) => {
                  return (
                    <div key={i}>
                      <ProductCart {...item} />
                    </div>
                  );
                })}
            </div>
            <div className="flex justify-center pt-10">
              <Paginations
                noOfPages={pagination?.totalPages}
                noOfTotalElements={pagination?.totalElements}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Product;
