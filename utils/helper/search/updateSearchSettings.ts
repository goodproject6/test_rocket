import { SearchSettings } from '../../../redux/searchSetup/interface';
import { setUpdatingSearchSettings } from '../../../redux/searchSetup';
import { generateUniqueId } from '../../../components/GenerateUUID';
import { addAlert, removeAlert } from '../../../redux/alert';
import { updateSearchSettings } from '../../../redux/searchSetup/features';
import { useAppDispatch } from '../../../redux/store';
import { ERROR_OCCURED_MESSAGE } from '../../constant';



export async function handleUpdateSearchSettings(
    dispatch: ReturnType<typeof useAppDispatch>,
    payload: SearchSettings,
    type: string,
    message: string
): Promise<void> {
    dispatch(setUpdatingSearchSettings(type));
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
        const actionResult = await dispatch(updateSearchSettings(payload));
        if (updateSearchSettings.fulfilled.match(actionResult)) {
            dispatch(
                addAlert({
                    message: `${message} updated`,
                    type: 'success',
                })
            );
        } else if (updateSearchSettings.rejected.match(actionResult)) {
            if (actionResult.error) {
                const errorCode = parseInt(actionResult.error.message || '');
                dispatch(
                    addAlert({
                        message: errorCode === 429 ? 'Too many requests' : ERROR_OCCURED_MESSAGE,
                        type: 'error',
                    })
                );
            }
        }
        dispatch(removeAlert(alertId));
   
}
