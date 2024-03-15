import { addAlert } from "../redux/alert";
import { getUserDetails } from "../redux/auth/features";
import { useAppDispatch } from "../redux/store";
import { errorMsg } from "../utils/constant";



export const fetchUserDataUtility = async (
  dispatch: ReturnType<typeof useAppDispatch>,
  route: string
) => {
  const EXCLUDED_ROUTES = ["/"];

  const dispatchAlert = (message: string) => {
    if (!EXCLUDED_ROUTES.includes(route)) {
      dispatch(addAlert({ message, type: "error" }));
    }
  };
  try {
    const actionResult = await dispatch(getUserDetails());
    if (getUserDetails.rejected.match(actionResult)) {
      const errorMessage = actionResult.error?.message || errorMsg("en")

      // Only dispatch the alert if the route is not in the excluded list.
      if (
        !EXCLUDED_ROUTES.some((excludedRoute) =>
          route.startsWith(excludedRoute)
        )
      ) {
        dispatchAlert(errorMessage);
      }
    }
  } catch (err) {
    if (
      !EXCLUDED_ROUTES.some((excludedRoute) => route.startsWith(excludedRoute))
    ) {
      dispatchAlert(errorMsg("en"));
    }
  }
};
