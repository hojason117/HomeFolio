import {
    ADD_COMPARE_HOUSE,
    EMPTY_COMPARE_HOUSES,
    HOME_MAP_BOUND_CHANGED,
    HOME_DISPLAY_HOUSES_CHANGED,
    HOME_MAP_FOCUSED_MARKER_CHANGED
} from "../constants/action-types";

export const initialState = {
    compareHouses: [],
    compareHousesCount: 0,
    homeMapBound: {
        b: { b: -118.48106790475845, f: -118.04253209524154},
        f: { b: 34.00660862012279, f: 34.14097809398008 }
    },
    homeDisplayHouses: [],
    homeMapFocusedMarker: -1
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMPARE_HOUSE:
            if (!state.compareHouses.includes(action.payload))
                return { ...state, compareHousesCount: state.compareHousesCount + 1, compareHouses: [...state.compareHouses, action.payload] };
            else
                return state;

        case EMPTY_COMPARE_HOUSES:
            return { ...state, compareHousesCount: 0, compareHouses: [] };

        case HOME_MAP_BOUND_CHANGED:
            return { ...state, homeMapBound: action.payload };

        case HOME_DISPLAY_HOUSES_CHANGED:
            return { ...state, homeDisplayHouses: action.payload };

        case HOME_MAP_FOCUSED_MARKER_CHANGED:
            return { ...state, homeMapFocusedMarker: action.payload };

        default:
            return state;
    }
};

export default rootReducer;