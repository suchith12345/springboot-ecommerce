import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaAddressCard } from "react-icons/fa";
import InputFeild from "../shared/InputFeild";
import SpinnerLogin from "../shared/SpinnerLogin";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addUpdateUserAddress } from "../../store/Action";

const AddAddressForm = ({ address, setOpenAddressModel }) => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onSaveAddressHandler = async (data) => {
    console.log("Address clicked");
    dispatch(
      addUpdateUserAddress(
        data,
        toast,
        reset,
        address?.addressId,
        setOpenAddressModel,
      ),
    );
  };

  useEffect(() => {
    if (address?.addressId) {
      setValue("buildingName", address?.buildingName);
      setValue("street", address?.street);
      setValue("state", address?.state);
      setValue("city", address?.city);
      setValue("pincode", address?.pincode);
      setValue("country", address?.country);
    }
  }, [address]);

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSaveAddressHandler)} className="">
        <div className="flex  items-center justify-center  mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
          <FaAddressCard className="mr-2 text-2xl" />
          <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
            {!address?.addressId ? "Add Address" : "Update Address"}
          </h1>
        </div>
        <div className="flex flex-col gap-4 ">
          <InputFeild
            label="Building Name"
            type="text"
            required
            min={5}
            message="*Building Name is required"
            placeholder="Enter your Building Name"
            id="buildingName"
            register={register}
            errors={errors}
          />

          <InputFeild
            label="Street"
            type="text"
            required
            min={5}
            message="*Street is required"
            placeholder="Enter your Street"
            id="street"
            register={register}
            errors={errors}
          />

          <InputFeild
            label="City"
            type="text"
            required
            min={4}
            message="*City is required"
            placeholder="Enetr your City"
            id="city"
            register={register}
            errors={errors}
          />

          <InputFeild
            label="State"
            type="text"
            required
            min={2}
            message="*State is required"
            placeholder="Enter your State"
            id="state"
            register={register}
            errors={errors}
          />

          <InputFeild
            label="Pincode"
            type="text"
            required
            min={6}
            message="*Pincode is required"
            placeholder="Enter your Pincode"
            id="pincode"
            register={register}
            errors={errors}
          />

          <InputFeild
            label="Country"
            type="text"
            required
            min={2}
            message="*Country is required"
            placeholder="Enter your Country"
            id="country"
            register={register}
            errors={errors}
          />
        </div>
        <button
          disabled={loader}
          className="text-white bg-custom-blue px-4 py-2 rounded-md mt-4"
          type="submit"
        >
          {loader ? (
            <>
              <SpinnerLogin />
              Loading.....
            </>
          ) : (
            <>Save</>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddAddressForm;
