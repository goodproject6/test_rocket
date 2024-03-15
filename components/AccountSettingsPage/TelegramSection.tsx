import React, { useState } from "react";
import Iconify from "../Elements/icon";
import { Language } from "../../redux/utils/interface";
import { Input } from "@nextui-org/react";
import { handleGenerateSignUpUrl } from "../../utils/auth/generateLoginUrl";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useRouter } from "next/navigation";
import useReCaptcha from "../../hooks/useReCaptcha";
import { accSyncStatus, submitGeneratedSignUpUrl } from "../../redux/auth/features";
import { addAlert } from "../../redux/alert";
import { errorMsg } from "../../utils/constant";



function TelegramSection({
  is_telegram_active,
  currentLang,
  translations,
  accountSynced
}: {
  is_telegram_active: boolean | undefined,
  currentLang: Language,
  translations: any
  accountSynced: boolean
}) {
  const guideLines = translations[currentLang.alias]["guideLines"]
  const [showGuide, setShowGuide] = useState("hidden")
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { isUrl } =
    useAppSelector((state) => state.auth);

  const [showInputUrl, setShowInputUrl] = useState(false)

  const [inp, setInp] = useState("")

  const [inpErr, setInpErr] = useState("")

  const { generateReCaptchaToken } = useReCaptcha();




  //Submit result url and signup
  const handleSubmitUrl = async (
    payload: string,
    dispatch: ReturnType<typeof useAppDispatch>
  ) => {
    // generate recaptcha token
    const recaptcha_token = await generateReCaptchaToken("login");
    const actionResult = await dispatch(submitGeneratedSignUpUrl({ login_result: payload, recaptcha_token, referral_code: "" }));
    if (submitGeneratedSignUpUrl.fulfilled.match(actionResult)) {
      dispatch(
        addAlert({
          message: "Account synced",
          type: "success",
        })
      );
      dispatch(accSyncStatus())
    } else if (submitGeneratedSignUpUrl.rejected.match(actionResult)) {
      if (actionResult.error) {
        dispatch(
          addAlert({
            message: errorMsg(currentLang.alias),
            type: "error",
          })
        );
      }
    }
  };


  return (
    <div className="md:flex flex-col justify-between h-full">
      <div>
        <div>
          <h2 className="text-custom-gray font-medium">Telegram</h2>
        </div>

        <div className="mt-4 md:mt-2 space-y-4">
          <div className="border rounded-lg h-10 flex items-center px-3">
            <p className="text-sm">{is_telegram_active ? "Active" : "Not Active"}</p>
          </div>

          <div className="flex items-center space-x-2 justify-between text-theme border border-theme rounded-md px-3 py-1.5 text-xs xxs:text-sm xs:text-base cursor-pointer">
            <div className="flex items-center space-x-2">
              <Iconify icon="mingcute:telegram-line" />
              <p>{translations[currentLang.alias]["activeTelegramNotification"]}</p>
            </div>

            <div className="flex items-center  gap-3">
              <button onMouseEnter={() => {
                setShowGuide("block")

              }}
                onMouseLeave={() => {
                  setShowGuide("hidden")
                }}
              >
                <Iconify icon="flowbite:info-circle-solid" />
              </button>

              <Iconify icon="solar:copy-linear" />
            </div>
          </div>
        </div>

        <ul className={`mt-4 ${showGuide}`}>
          {guideLines.map((guideLine: any, index: number) => (
            <li
              key={guideLine}
              className="text-sm text-custom-gray flex space-x-2 mb-5 last:mb-0"
            >
              <span>{index + 1}.</span> <span>{guideLine}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-12">
        {accountSynced ? <Input
          label="Flex Account Sync"
          value="Account Synced"
          labelPlacement="outside"
          variant="bordered"
          readOnly
          classNames={{
            inputWrapper: "rounded-md red-border",
            label: "!text-custom-gray text-base !font-medium",
            input: "text-custom-gray",
          }}
        /> :
          (
            showInputUrl ? <div className="mt-12 space-y-1">
              <Input
                label="Flex Account Sync"
                value={inp}
                labelPlacement="outside"
                placeholder="Paste your link"
                variant="bordered"
                classNames={{
                  inputWrapper: "rounded-md red-border",
                  label: "!text-custom-gray text-base !font-medium",
                  input: "text-custom-gray",
                }}
                onChange={(e) => {
                  setInpErr("")
                  setInp(e.target.value)
                }}
              />
              <p className="text-sm text-red-500">{inpErr}</p>
              <p className="cursor-pointer" onClick={() => {
                if (!inp) {
                  setInpErr("Please paste your link")
                } else {
                  setInpErr("")
                  handleSubmitUrl(inp, dispatch)
                }
              }}>{
                  isUrl ? <Iconify
                    icon="mingcute:loading-line"
                    className="text-2xl animate-spin"
                  /> : "Submit Url"
                }</p>
            </div> : <div className="space-y-1" onClick={() => {
              handleGenerateSignUpUrl(dispatch, "generating link", router, currentLang, false)
              setShowInputUrl(true)
            }}>
              <p className="text-custom-gray text-base font-medium">Flex Account Sync</p>
              <div className="flex items-center space-x-2 justify-between border border-[#FF9900] rounded-md px-3 py-1.5 text-xs xxs:text-sm xs:text-base cursor-pointer">
                <div className="flex items-center space-x-2">
                  <p>Login to flex account</p>
                </div>
                <div className="flex items-center  gap-3">
                  {
                    isUrl ? <Iconify
                      icon="mingcute:loading-line"
                      className="text-2xl animate-spin"
                    /> : <Iconify icon="mingcute:telegram-line" className="text-[#FF9900]" />
                  }
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default TelegramSection;
