import { Avatar, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import BackDrop from "./shared/BackDrop";
import { LogOutUser } from "../store/Action";

const UserMenu = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOutHandler = () => {
    dispatch(LogOutUser(navigate));
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className="sm:border-[1px] sm:border-slate-400 flex flex-row items-center gap-1
         rounded-full cursor-pointer hover:shadow-md transition text-slate-700"
      >
        <Avatar alt="Menu" src="" />
      </div>
      <Menu
        sx={{ width: "400px" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
            sx: { width: 160 },
          },
        }}
      >
        <Link to="/profile">
          <MenuItem onClick={handleClose} className="flex gap-2">
            <BiUser className="text-xl font-bold" />
            <span className="font-bold text-[16px] mt-1">{user?.username}</span>
          </MenuItem>
        </Link>

        <Link to="/order">
          <MenuItem onClick={handleClose} className="flex gap-2">
            <FaShoppingCart className="text-xl font-bold" />
            <span className="font-semibold ">Order</span>
          </MenuItem>
        </Link>

        <MenuItem onClick={logOutHandler} className="flex gap-2">
          <div className="font-semibold w-full flex gap-2 items-center bg-button-gradient px-4 py-1 text-white rounded-sm">
            <IoExitOutline className="text-xl font-bold" />
            <span className="font-semibold ">Logout</span>
          </div>
        </MenuItem>
      </Menu>

      {open && <BackDrop />}
    </div>
  );
};

export default UserMenu;
