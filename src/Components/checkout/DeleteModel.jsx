import React from "react";
import { IoWarning, IoClose } from "react-icons/io5";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const DeleteModel = ({ open, setOpen, title, onDeleteHandler, loader }) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      {/* Backdrop */}
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/70 transition-opacity"
      />

      {/* Dialog Container */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-3 text-gray-400
                       hover:text-gray-600
                       transition duration-200"
          >
            <IoClose size={28} />
          </button>

          {/* Warning + Message */}
          <div className="flex items-center gap-4 pr-8">
            {/* Warning Icon */}
            <IoWarning
              size={48}
              className="shrink-0 rounded-full bg-red-100 p-2 text-red-600"
            />

            {/* Title + Message */}
            <div className="flex flex-col gap-1">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                {title}
              </DialogTitle>

              <p className="text-sm text-gray-600">
                Are you sure you want to delete?
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            {/* Cancel */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md border border-gray-300 bg-white px-4 py-2
                         text-sm font-medium text-gray-700
                         hover:bg-gray-100
                         transition duration-200"
            >
              Cancel
            </button>

            {/* Delete */}
            <button
              type="button"
              disabled={loader}
              onClick={onDeleteHandler}
              className="rounded-md bg-red-500 px-4 py-2
                         text-sm font-medium text-white
                         hover:bg-red-600
                         disabled:cursor-not-allowed
                         disabled:opacity-60
                         transition duration-200"
            >
              {loader ? "Deleting..." : "Delete"}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DeleteModel;
