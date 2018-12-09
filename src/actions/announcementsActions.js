import * as types from './actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import announcementApi from '../api/mockAnnouncement';


export function loadAnnouncementsSuccess(announcements) {
    return { type: types.LOAD_ANNOUNCEMENTS_SUCCESS, announcements };
}

export function loadAnnouncementSuccess(announcement) {
    return { type: types.LOAD_ANNOUNCEMENT_SUCCESS, announcement };
}
export function createAnnouncementSuccess(announcement) {
    return { type: types.CREATE_ANNOUNCEMENT_SUCCESS, announcement };
}

export function updateAnnouncementSuccess(announcement) {
    return { type: types.UPDATE_ANNOUNCEMENT_SUCCESS, announcement };
}


export function loadAnnouncements(type) {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return announcementApi
            .getAllAnnouncements(type)
            .then(announcements => { dispatch(loadAnnouncementsSuccess(announcements)); }).catch(error => {
                throw error;
            });
    };
}

export function saveAnnouncement(announcement) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return announcementApi
            .saveAnnouncement(announcement)
            .then(savedAnnouncement => {
                announcement.id
                    ? dispatch(updateAnnouncementSuccess(savedAnnouncement))
                    : dispatch(createAnnouncementSuccess(savedAnnouncement));
            })
            .catch(error => {
                dispatch(ajaxCallError(error));
                throw error;
            });
    };
}

export function loadAnnouncement(id) {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return announcementApi
            .getAnnouncement(id)
            .then(announcement => {
                dispatch(loadAnnouncementSuccess(announcement));
            }).catch(error => {
                throw error;
            });
    };
}
