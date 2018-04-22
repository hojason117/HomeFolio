import { 
    ADD_COMPARE_HOUSE,
    EMPTY_COMPARE_HOUSES,
    HOME_MAP_BOUND_CHANGED,
    HOME_DISPLAY_HOUSES_CHANGED,
    HOME_MAP_FOCUSED_MARKER_CHANGED,
    SEARCH_HOUSES_RESULT_CHANGED,
    SEARCH_MAP_FOCUSED_MARKER_CHANGED,
    SEARCH_CONDITION_CHANGED,
    SELL_DIALOG_TOGGLED,
    UPDATE_DIALOG_TOGGLED
} from "../constants/action-types";

export const addCompareHouses = house => ({ type: ADD_COMPARE_HOUSE, payload: house });
export const emptyCompareHouses = () => ({ type: EMPTY_COMPARE_HOUSES });
export const homeMapBoundChanged = newBounds => ({ type: HOME_MAP_BOUND_CHANGED, payload: newBounds });
export const homeDisplayHousesChanged = newHouses => ({ type: HOME_DISPLAY_HOUSES_CHANGED, payload: newHouses });
export const homeMapFocusedMarkerChanged = newFocused => ({ type: HOME_MAP_FOCUSED_MARKER_CHANGED, payload: newFocused });
export const searchHousesResultChanged = results => ({ type: SEARCH_HOUSES_RESULT_CHANGED, payload: results });
export const searchMapFocusedMarkerChanged = newFocused => ({ type: SEARCH_MAP_FOCUSED_MARKER_CHANGED, payload: newFocused });
export const searchConditionChanged = newConditions => ({ type: SEARCH_CONDITION_CHANGED, payload: newConditions });
export const sellDialogToggled = () => ({ type: SELL_DIALOG_TOGGLED });
export const updateDialogToggled = () => ({ type: UPDATE_DIALOG_TOGGLED });