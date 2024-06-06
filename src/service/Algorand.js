const algosdk = require('algosdk');

const token = "429687815be14b8b23c3cc89e23eb8b03a9aa6e99dc89dc777c8b9646d68e331";
const server = "https://testnet-api.algonode.cloud/";
const port = 443;

let algodClient = new algosdk.Algodv2(token, server, port);



//----------------------- Create Account ---------------------------
const createGeneralAccount = async function () {
    let newAccount = algosdk.generateAccount();
    let mn = algosdk.secretKeyToMnemonic(newAccount.sk);

    let accountDetails = {
        account: newAccount,
        mn
    }
    return accountDetails;
}
//------------------------------------------------------------------

//
//
// //------------------- Recover Account from MN ----------------------
const recoverAccount = async function(mn){
    return algosdk.mnemonicToSecretKey(mn);
}
// //------------------------------------------------------------------
//
//
//
// //--------------------- Find Accounts Details -----------------------
// const findAccountDet = async function (accountAddr) {
//     let account_info = (await algodClient.accountInformation(accountAddr).do());
//
//     let details = {
//         AccountAddress: account_info.address,
//         AlgosAmount: account_info.amount,
//         AmountWithoutPendingRewards: account_info['amount-without-pending-rewards'],
//         AppsLocalState: account_info['apps-local-state'],
//         AppsTotalSchema: account_info['apps-total-schema'],
//         Assets: account_info.assets,
//         CreatedApps: account_info['created-apps'],
//         CreatedAssets: account_info['created-assets'],
//         MinBalance: account_info['min-balance'],
//         PendingRewards: account_info['pending-rewards'],
//         RewardBase: account_info['reward-base'],
//         Rewards: account_info.rewards,
//         Round: account_info.round,
//         Status: account_info.status,
//         TotalAppsOptedIn: account_info['total-apps-opted-in'],
//         TotalAssetsOptedIn: account_info['total-assets-opted-in'],
//         TotalCreatedApps: account_info['total-created-apps'],
//         TotalCreatedAssets: account_info['total-created-assets'],
//     }
//
//     return details;
// }
// //------------------------------------------------------------------
//
//
//
// //------------------- Find Accounts Algo Count ---------------------
const findAccountAlgoAmount = async function (accountAddr) {
    const acctInfo = await algodClient.accountInformation(accountAddr).do();
    return (acctInfo.amount);
}
// //------------------------------------------------------------------
//
//
//
//--------------------- Find Accounts Assets -----------------------
const findAccountAssets = async function (accountAddr, assetId) {
    let account_info = (await algodClient.accountInformation(accountAddr).do());
    let assets = account_info.assets;

    for(let i = 0; i < assets.length; i++){
        if(assets[i]['asset-id'] === parseInt(assetId)){
            return assets[i];
        }
    }

    return null;
}
//------------------------------------------------------------------
//
//
//
//----------------- Find Accounts Created Assets -------------------
// const findAccountCreatedAssets = async function (accountAddr) {
//     let account_info = (await algodClient.accountInformation(accountAddr).do());
//     return account_info['created-assets'];
// }
//------------------------------------------------------------------
//
//
//
// //------------------------ Create an Asset --------------------------
const createAsset = async function (creator, unit, asset, total) {
    const suggestedParams = await algodClient.getTransactionParams().do();

    const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
        from: creator.addr,
        suggestedParams,
        defaultFrozen: false,
        unitName: unit,
        assetName: asset,
        manager: creator.addr,
        reserve: creator.addr,
        freeze: creator.addr,
        clawback: creator.addr,
        assetURL: "https://www.forbes.com/advisor/in/investing/cryptocurrency/what-is-an-nft-how-do-nfts-work/",
        total: total,
        decimals: 0,
    });

    const signedTxn = txn.signTxn(creator.sk);
    await algodClient.sendRawTransaction(signedTxn).do();

    const result = await algosdk.waitForConfirmation(
        algodClient,
        txn.txID().toString(),
        3
    );

    const assetIndex = result['asset-index'];
    return assetIndex;
}
// //------------------------------------------------------------------
//
//
//
// //---------------------- Modifying an Asset ------------------------
// const modifyAsset = async function(creator){
//     const suggestedParams = await algodClient.getTransactionParams().do();
//
//     let assetId = 627929630;
//
//     const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
//         from: creator.addr,
//         suggestedParams,
//         assetId,
//         manager: creator.addr,
//         clawback: creator.addr,
//         reserve: creator.addr,
//         freeze: creator.addr
//     });
//
//     const signedTxn = txn.signTxn(creator.sk);
//     await algodClient.sendRawTransaction(signedTxn).do();
//
//     const result = await algosdk.waitForConfirmation(
//         algodClient,
//         txn.txID().toString(),
//         3
//     );
//
//     const assetIndex = result['asset-index'];
//     return assetIndex;
// }
// //------------------------------------------------------------------
//
//
//
//----------------------- Transfer an Asset ------------------------
const transferAsset = async function(senderAccount, receiverAccount, assetIndex, amount){
    const suggestedParams = await algodClient.getTransactionParams().do();

    const optInTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: receiverAccount.addr,
        to: receiverAccount.addr,
        suggestedParams,
        assetIndex: assetIndex,
        amount: 0
    });

    const signedOptInTxn = optInTxn.signTxn(receiverAccount.sk);
    await algodClient.sendRawTransaction(signedOptInTxn).do();
    await algosdk.waitForConfirmation(algodClient, optInTxn.txID().toString(), 3);


    const xferTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: senderAccount.addr,
        to: receiverAccount.addr,
        suggestedParams,
        assetIndex: assetIndex,
        amount: amount
    });

    const  signedXferTxn = xferTxn.signTxn(senderAccount.sk);
    await  algodClient.sendRawTransaction(signedXferTxn).do();
    await algosdk.waitForConfirmation(algodClient, xferTxn.txID().toString(), 3);

    return xferTxn;
}
//------------------------------------------------------------------
//
//
//
// //------------------------ Freeze an Asset -------------------------
// const freezeAsset = async function(creator){
//     const suggestedParams = await algodClient.getTransactionParams().do();
//
//     const freezeTxn = algosdk.makeAssetFreezeTxnWithSuggestedParamsFromObject({
//         from: creator.addr,
//         suggestedParams,
//         assetIndex: 627934227,
//         freezeState: false,
//         freezeTarget: creator.addr
//     });
//
//     const signedFreezeTxn = freezeTxn.signTxn(creator.sk);
//     await algodClient.sendRawTransaction(signedFreezeTxn).do();
//     await algosdk.waitForConfirmation(
//         algodClient,
//         freezeTxn.txID().toString(),
//         3
//     );
// }
// //------------------------------------------------------------------

export {createGeneralAccount, createAsset, findAccountAssets, transferAsset, findAccountAlgoAmount, recoverAccount}
