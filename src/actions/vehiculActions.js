import * as types from './actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import VehiculApi from '../api/mockVehicul';


export function loadCarMarksSuccess(marks) {
    return { type: types.LOAD_CAR_MARKS_SUCCESS, marks };
}

export function loadCarMarks() {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return VehiculApi
            .getAllMarks()
            .then( 
                marks => {
                    dispatch(loadCarMarksSuccess(marks));
                 }
                )
                .catch(error => {
                throw error;
            });
    };
}