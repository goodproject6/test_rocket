import { Locations } from '../../../redux/searchSetup/interface';
import { setUpdatingLocation} from '../../../redux/searchSetup';
import { generateUniqueId } from '../../../components/GenerateUUID';
import { addAlert, removeAlert } from '../../../redux/alert';
import { updateLocation,  } from '../../../redux/searchSetup/features';
import { useAppDispatch } from '../../../redux/store';
import { errorMsg } from '../../constant';




export async function handleUpdateLocation(
    dispatch: ReturnType<typeof useAppDispatch>,
    payload: Locations,
    type: string,
    message: string
): Promise<void> {
    dispatch(setUpdatingLocation(type));
    const alertId = generateUniqueId();
    dispatch(
        addAlert({
            id: alertId,
            type: 'info',
            message: `Updating ${message}`,
            autoClose: false,
            icon: 'mingcute:loading-line',
            spin: true,
        })
    );
        const actionResult = await dispatch(updateLocation(payload));
        if (updateLocation.fulfilled.match(actionResult)) {
            dispatch(
                addAlert({
                    message: `${message} updated`,
                    type: 'success',
                })
            );
        } else if (updateLocation.rejected.match(actionResult)) {
            if (actionResult.error) {
                const errorCode = parseInt(actionResult.error.message || '');
                dispatch(
                    addAlert({
                        message: errorCode === 429 ? 'Too many requests' : errorMsg("en"),
                        type: 'error',
                    })
                );
            }
        }
        dispatch(removeAlert(alertId));
   
}
