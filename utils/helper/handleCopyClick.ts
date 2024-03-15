
import { addAlert } from "../../redux/alert";
import { useAppDispatch } from "../../redux/store";
import { copyToClipboard } from "./clipboard";

export const handleCopyClick = async (
  textToCopy: string,
  message: string,
  dispatch: ReturnType<typeof useAppDispatch>
) => {
  const wasSuccessful = await copyToClipboard(textToCopy);
  if (wasSuccessful) {
    dispatch(
      addAlert({
        message: message,
        type: "success",
      })
    );
  } else {
    addAlert({
      message: "Failed to copy",
      type: "error",
    });
  }
};
