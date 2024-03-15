import { generateUniqueId } from "../../components/GenerateUUID";
import { addAlert, removeAlert } from "../../redux/alert";
import { updateUserDetails } from "../../redux/auth/features";
import { UpdateUser } from "../../redux/auth/interface";
import { useAppDispatch } from "../../redux/store";
import { ERROR_OCCURED_MESSAGE } from "../constant";

 export const handleUpdateUserDetails = async (
    payload: UpdateUser,
    dispatch: ReturnType<typeof useAppDispatch>
  ) => {
    const alertId = generateUniqueId()
    dispatch(
      addAlert({
        id: alertId,
        type: "info",
        message: "Saving changes...",
        autoClose: false,
        icon: "mingcute:loading-line",
        spin: true,
      })
    );
    const actionResult = await dispatch(updateUserDetails(payload));
    if (updateUserDetails.fulfilled.match(actionResult)) {
      dispatch(
        addAlert({
          message: "Changes saved",
          type: "success",
        })
      );
    } else if (updateUserDetails.rejected.match(actionResult)) {
      if (actionResult.error) {
        const errorCode = parseInt(actionResult.error.message || "")
        dispatch(
          addAlert({
            message: errorCode === 429 ? "Too many requests" : ERROR_OCCURED_MESSAGE,
            type: "error",
          })
        );
      }
    }
    dispatch(removeAlert(alertId));
  };