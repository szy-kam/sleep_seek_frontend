const initialState = {
    dateRange: {
        from: null,
        to: null,
    }
};

const stayReducer = (state = initialState, action) => {
    switch (action.type) {
        case "DATE_RANGE_CHANGE":
            return {
                ...state,
                dateRange: action.payload,
            };
        default:
            return state;
    }
};
export default stayReducer;
