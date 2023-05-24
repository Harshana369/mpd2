import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import {
//   mobitelChartAreaReducer,
//   mobitelChartColumnReducer,
//   mobitelDatabseReducer,
//   mobitelLastUpdateReducer,
//   mobitelOverviewReducer,
//   mobitelScopeReducer
// } from './Reducers/mobitelReduce';
// import {
//   huaweiAreaChartReducer,
//   huaweiColumChartReducer,
//   huaweiDatabaseReducer,
//   huaweiFiltedNameReducer,
//   huaweiLastUpdateReducer,
//   huaweiScopeReducer
// } from './Reducers/huaweiReducer';
// import {
//   zteAreaChartReducer,
//   zteColumChartReducer,
//   zteDatabaseReducer,
//   zteFiltedNameReducer,
//   zteLastUpdateReducer,
//   zteScopeReducer
// } from './Reducers/zteReducer';

import { AllTableReducer, SiteEngineerForSite, SiteIdReducer } from './Reducers/DayPlanReducer';
import {
  mobitelChartColumnReducer,
  mobitelPendingTaskDataReducer,
  mobitelTilesReducer
} from './Reducers/mobitelReduce';
import { userLoginReducer } from './Reducers/userReducer';

const reducer = combineReducers({
  mobitelSiteEngineerDayPlan: SiteIdReducer,
  allTableData: AllTableReducer,
  SiteEngineerForAllSite: SiteEngineerForSite,
  mobileTilesData: mobitelTilesReducer,
  mobitelColumnChartData: mobitelChartColumnReducer,
  mobitelPendingTaskData: mobitelPendingTaskDataReducer,
  userLogin: userLoginReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
