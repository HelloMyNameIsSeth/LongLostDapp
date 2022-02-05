// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      // let totalSupply = await store
      //   .getState()
      //   .blockchain.smartContract.methods.totalSupply()
      //   .call();

      // const isAllowListActive = await store
      //   .getState()
      //   .blockchain.smartContract.methods.isAllowListActive()
      //   .call();

      // const allowListMintAmount = await store
      //   .getState()
      //   .blockchain.smartContract.methods.allowListMintAmount()
      //   .call();

      // const maxMintAmountPerTx = await store
      //   .getState()
      //   .blockchain.smartContract.methods.maxMintAmountPerTx()
      //   .call();

      const [
        totalSupply,
        isAllowListActive,
        allowListMintAmount,
        maxMintAmountPerTx,
        remainingAllowListMints,
        remainingPublicMints,
      ] = await Promise.all([
        store.getState().blockchain.smartContract.methods.totalSupply().call(),
        store
          .getState()
          .blockchain.smartContract.methods.isAllowListActive()
          .call(),
        store
          .getState()
          .blockchain.smartContract.methods.allowListMintAmount()
          .call(),
        store
          .getState()
          .blockchain.smartContract.methods.maxMintAmountPerTx()
          .call(),
        store
          .getState()
          .blockchain.smartContract.methods.remainingAllowListMints(
            store.getState().blockchain.account
          )
          .call(),
        store
          .getState()
          .blockchain.smartContract.methods.remainingPublicMints(
            store.getState().blockchain.account
          )
          .call(),
      ]);

      dispatch(
        fetchDataSuccess({
          totalSupply,
          isAllowListActive,
          allowListMintAmount,
          maxMintAmountPerTx,
          remainingAllowListMints,
          remainingPublicMints,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
