import  { combineReducers } from 'redux';
import announcements from './announcementReducer';
import marks from './vehiculReducer';
import i18next from './i18nextReducer';

import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    announcements,
    ajaxCallsInProgress,
    i18next,
    marks
});

export default rootReducer;