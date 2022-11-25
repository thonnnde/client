import { combineReducers } from "redux";
import routePlanReducer from "./routePlanSlice";
import mapOptionReducer from "./mapOptionSlice";
import mapSettingReducer  from "./mapSettingSlice";

export default combineReducers({
    routePlan:routePlanReducer,
    mapOption:mapOptionReducer, 
    mapSetting:mapSettingReducer,
});