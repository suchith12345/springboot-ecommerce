import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModel from "../shared/ProductViewModel";
import { useDispatch } from "react-redux";
import { fetchAddToCart } from "../../store/Action";
import toast from "react-hot-toast";

const ProductCart = ({
  productId,
  productName,
  image,
  description,
  quantity,
  price,
  discount,
  specialPrice,
  about = false,
}) => {
  const [openProductViewModel, setOpenProductViewModel] = useState(false);
  const btnLoader = false;
  const [selectedViewModel, setSelectedViewModel] = useState("");
  const isAvailable = quantity && Number(quantity) > 0;
  const dispatch = useDispatch();

  const handleProductview = (product) => {
    if (!about) {
      setSelectedViewModel(product);
      setOpenProductViewModel(true);
    }
  };

  const AddToCartHandler = (cartItems) => {
    dispatch(fetchAddToCart(cartItems, 1,toast));
  };

  return (
    <div className="border rounded-lg shadow-2xl overflow-hidden transition-shadow duration-300">
      <div
        onClick={() => {
          handleProductview({
            id: productId,
            productName,
            image,
            description,
            quantity,
            price,
            discount,
            specialPrice,
          });
        }}
        className="w-full overflow-hidden aspect-[3/2]"
      >
        <img
          className="w-full h-full  cursor-pointer transition-transform duration-300 transform hover:scale-105"
          src={image}
          alt={productName}
        />
      </div>
      <div className="p-4">
        <h2
          onClick={() => {
            handleProductview({
              id: productId,
              productName,
              image,
              description,
              quantity,
              price,
              discount,
              specialPrice,
            });
          }}
          className="text-lg font-semibold mb-2 cursor-pointer"
        >
          {/* {TrancateText(productName, 25)} */}
          {productName}
        </h2>

        <div className="min-h-20 max-h-20">
          <p className="text-sm text-gray-500">
            {/* {TrancateText(description,50)} */}
            {description}
          </p>
        </div>

        {!about && (
          <div className="flex items-center justify-between">
            {specialPrice ? (
              <div className="flex flex-col">
                <span className="text-gray-500 line-through">
                  ${Number(price).toFixed(2)}
                </span>
                <span className="text-gray-500 font-bold">
                  ${Number(specialPrice).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-gray-500 font-bold">
                {"  "}${Number(price).toFixed(2)}
              </span>
            )}

            <button
              disabled={!isAvailable || btnLoader}
              onClick={() =>
                AddToCartHandler({
                  productId,
                  productName,
                  image,
                  description,
                  quantity,
                  price,
                  discount,
                  specialPrice,
                })
              }
              className={`${isAvailable ? "bg-blue-500 hover:bg-blue-600" : " bg-red-500 "} text-white rounded-sm py-2 px-3 
           flex justify-center items-center cursor-pointer `}
            >
              <FaShoppingCart className="mr-2.5" />
              {isAvailable ? "Add to Cart " : " Stock Out"}
            </button>
          </div>
        )}
      </div>
      <ProductViewModel
        open={openProductViewModel}
        setOpen={setOpenProductViewModel}
        product={selectedViewModel}
        isAvailable={isAvailable}
      />
    </div>
  );
};
export default ProductCart;
