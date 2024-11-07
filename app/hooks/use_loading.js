import { useDispatch } from "react-redux";
import { setLoading } from "~/redux";

export const useLoading = () => {
  const dispatch = useDispatch();

  showLoading = () => {
    dispatch(setLoading(true));
  };
  hideLoading = (timeOut) => {
    if (timeOut) {
      setTimeout(() => {
        dispatch(setLoading(false));
      }, timeOut);
    } else {
      dispatch(setLoading(false));
    }
  };

  return {
    showLoading,
    hideLoading,
  };
};
