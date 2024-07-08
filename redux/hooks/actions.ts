import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { rootActions } from "../rootSlice";

const actions = {
  ...rootActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
