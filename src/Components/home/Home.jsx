import { useDispatch, useSelector } from "react-redux";
import HomeBanner from "./HomeBanner";
import { useEffect } from "react";
import { fetchProducts } from "../../store/Action";
import ProductCart from "../shared/ProductCart";
import { FcLike } from "react-icons/fc";
import Loader from "../shared/Loader";
import { FaExclamationTriangle } from "react-icons/fa";

const Home = () => {
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div className="lg:px-14 sm:px-8 px-4">
      <div className="py-6">
        <HomeBanner />
      </div>

      <div>
        <div className="flex flex-col justify-center items-center space-y-2">
          <h1 className="text-black text-4xl font-bold">Product</h1>
          <span className="text-gray-500 font-bold text-2xl flex gap-2 items-center">
            Best Sales Of the Day <FcLike />
          </span>
        </div>
      </div>

      {isLoading ? (
        <Loader text="Product loading..." />
      ) : errorMessage ? (
        <div className="flex justify-center items-center h-[200px]">
          <FaExclamationTriangle className="text-slate-700 text-3xl mr-2" />
          <span className="text-slate-700 text-lg font-medium">
            {errorMessage}
          </span>
        </div>
      ) : (
        <div className="pb-6 pt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-6 gap-x-6">
          {products &&
            products?.slice(0, 8).map((item, i) => {
              return (
                <div key={i}>
                  <ProductCart {...item} />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};
export default Home;
