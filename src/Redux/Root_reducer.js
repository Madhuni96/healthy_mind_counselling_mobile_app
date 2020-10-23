import { combineReducers } from 'redux';
import user_reducer from './USER/user_reducer';
import answerset_reducer from './ANSWERSET/answerset_reducer';
import questionset_reducer from './QUESTIONSET/questionset_reducer';
import recommendation_reducer from './RECOMMENDATION/recommendation_reducer';
import carea_reducer from './CAREA/carea_reducer';

const root_reducer = combineReducers({
    user: user_reducer,
    answerset: answerset_reducer,
    questionset: questionset_reducer,
    recommendation: recommendation_reducer,
    carea: carea_reducer
})

export default root_reducer