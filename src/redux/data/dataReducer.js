const initialState = {
  loading: false,
  totalSupply: 0,
  cost: 0,
  error: false,
  errorMsg: "",
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_DATA_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        totalSupply: action.payload.totalSupply,
        isAllowListActive: action.payload.isAllowListActive,
        allowListMintAmount: action.payload.allowListMintAmount,
        maxMintAmountPerTx: action.payload.maxMintAmountPerTx,
        remainingAllowListMints: action.payload.remainingAllowListMints,
        remainingPublicMints: action.payload.remainingPublicMints,
        isContractPaused: action.payload.isContractPaused,
        // cost: action.payload.cost,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
