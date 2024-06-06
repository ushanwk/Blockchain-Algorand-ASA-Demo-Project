import {CreateAccountPage} from "../pages/CreateAccountPage";
import {CreateAssetPage} from "../pages/CreateAssetPage";
import {AssetHoldingPage} from "../pages/AssetHoldingPage";
import {TransferAssetPage} from "../pages/TransferAssetPage";
import {useState} from "react";
import {AccountInfoPage} from "../pages/AccountInfoPage";
import {RecoverAccountPage} from "../pages/RecoverAccountPage";

export function MainSection( {selectedTab} ) {

    const [accounts, setAccounts] = useState([]);
    const [assets, setAssets] = useState([]);

    if (selectedTab === 'Create Account'){
        return <CreateAccountPage accounts={accounts} setAccounts={setAccounts} />
    }
    if (selectedTab === 'Recover Account'){
        return <RecoverAccountPage accounts={accounts} />
    }
    if (selectedTab === 'Account Info'){
        return <AccountInfoPage accounts={accounts} />
    }
    if (selectedTab === 'Create Asset'){
        return <CreateAssetPage accounts={accounts} assets={assets} setAssets={setAssets} />
    }
    if (selectedTab === 'Asset Holdings'){
        return <AssetHoldingPage assets={assets} />
    }
    if (selectedTab === 'Transfer Asset'){
        return <TransferAssetPage accounts={accounts} />
    }
}