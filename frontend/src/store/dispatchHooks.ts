import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from ".";

//typescript cannot automatically infer custom thunks dispatch type so created a custome dispatch hook for it
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
