import { useLayoutEffect, useRef } from "react";
import { fetchUserDataUtility } from "../../hooks/fetchUserDataUtility";
import { useAppDispatch } from "../../redux/store";

interface FetchDataOptions {
  dispatch: ReturnType<typeof useAppDispatch>;
  pathname: string;
}

const useFetchDataUtility = ({
  dispatch,
  pathname,
}: FetchDataOptions): void => {
  const hasRun = useRef(false);

  useLayoutEffect(() => {
    const fetchData = async () => {
      await fetchUserDataUtility(dispatch, pathname || "");
    };
    if (!hasRun.current) {
      fetchData();
      hasRun.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useFetchDataUtility;
