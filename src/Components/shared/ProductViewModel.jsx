import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Status from "./Status";
import { MdClose, MdDone } from "react-icons/md";

function ProductViewModel({ open, setOpen, product, isAvailable }) {
  const handleClickOpen = () => {
    setOpen(true);
  };
  const {
    id,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
  } = product;

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-700/30 bg-opacity-75 transtion-opacity " />
        <div className="fixed inset-0 flex w-screen items-center justify-center">
          <DialogPanel
            className=" relative transform overflow-hidden max-w-lg space-y-4 border
           bg-white rounded-2xl md:max-w-[450px]  md:min-w-[450px] w-full"
          >
            {image && (
              <div className=" flex justify-center aspect-[3/2]">
                <img src={image} alt={productName} />
              </div>
            )}

            <div className="flex justify-baseline items-start ">
              <DialogTitle className="font-semibold lg:text-3xl sm:text-2xl text-xl leading-6 px-5">
                {productName}
              </DialogTitle>
            </div>

            <div className="space-y-2 text-gray-700 px-5 py-3 border-b">
              <div className="flex items-center justify-between gap-2">
                {specialPrice ? (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 line-through">
                      ${Number(price).toFixed(2)}
                    </span>
                    <span className="text-black-500 font-bold sm:text-xl">
                      ${Number(specialPrice).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-500 font-bold text-xl">
                    {"  "}${Number(price).toFixed(2)}
                  </span>
                )}
                {isAvailable ? (
                  <Status
                    text="In Stock"
                    icon={MdDone}
                    bg="bg-teal-200"
                    color="text-teal-900"
                  />
                ) : (
                  <Status
                    text="Out-Of-Stock"
                    icon={MdClose}
                    bg="bg-rose-200"
                    color="text-rose-900"
                  />
                )}
              </div>
            </div>

            <div className="pt-0 px-5">
              <Description>{description}</Description>
            </div>

            <div className="flex gap-4 justify-center items-center pb-5">
              <button
                onClick={() => setOpen(false)}
                className="border bg-gray-500 rounded-sm px-7 py-2 text-white"
              >
                close
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
export default ProductViewModel;
