import { generateUniqueId } from "../../components/GenerateUUID";
import { addAlert, removeAlert } from "../../redux/alert";
import { generateSignUpUrl } from "../../redux/auth/features";
import { useAppDispatch } from "../../redux/store";
import { errorMsg } from "../constant";

export const handleGenerateSignUpUrl = async (
    dispatch: ReturnType<typeof useAppDispatch>,
    message:string,
    router: any,
    currentLang:any,
    redirect:boolean,
    referral?:string
) => {
    const alertId = generateUniqueId()
    dispatch(
      addAlert({
        id: alertId,
        type: "info",
        message,
        autoClose: false,
        icon: "mingcute:loading-line",
        spin: true,
      })
    );
    const actionResult = await dispatch(generateSignUpUrl());
    if (generateSignUpUrl.fulfilled.match(actionResult)) {
        const { url } = actionResult.payload
        window.open(url, '_blank');
        if(redirect)  router.push(`/welcome?referral=${referral}`)
    } else if (generateSignUpUrl.rejected.match(actionResult)) {
        if (actionResult.error) {
            const errorCode = parseInt(actionResult.error.message || "")
            dispatch(
                addAlert({
                    message: errorCode === 429 ? "Too many requests" : errorMsg(currentLang.alias),
                    type: "error",
                })
            );
        }
    }
    dispatch(removeAlert(alertId));
};