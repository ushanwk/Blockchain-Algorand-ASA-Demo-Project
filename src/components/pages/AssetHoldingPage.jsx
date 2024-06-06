import Name from "../../assets/images/Name.png";
import Wallet from '../../assets/images/Wallet.png'
import Coin from '../../assets/images/Coin.png'
import {useState} from "react";
import {findAccountAssets} from "../../service/Algorand";
import {logDOM} from "@testing-library/react";

export function AssetHoldingPage({assets}) {

    const [accountAddr, setAccountAddr] = useState('');
    const [assetId, setAssetId] = useState('');
    const [assetName, setAssetName] = useState('');
    const [unitName, setUnitName] = useState('');
    const [amount, setAmount] = useState('');

    return (
        <div>
            <h1 className='text-white text-[40px] font-bold'>Asset Holding</h1>

            <div className='w-full flex justify-center mt-20'>
                <div className='flex gap-10'>

                    <div className='flex gap-5'>

                        <div
                            className="flex items-center bg-white w-[300px] h-[50px] p-1 pl-3 rounded-[10px] gap-2 border-[1px] max-xl:w-full">
                            <img src={Wallet} className="w-5 h-5 opacity-40"/>
                            <input
                                className="p-1 text-[13px] w-[480px] border border-white focus:outline-none focus:border-white sm:text-sm hover:border-transparent"
                                type="text" placeholder="Enter account address...."
                                value={accountAddr}
                                onChange={(e) => setAccountAddr(e.target.value)}
                            />
                        </div>

                        <div
                            className="flex items-center bg-white w-[200px] h-[50px] p-1 pl-3 rounded-[10px] gap-2 border-[1px] max-xl:w-full">
                            <img src={Coin} className="w-6 h-6 opacity-40"/>
                            <input
                                className="p-1 text-[13px] w-[150px] border border-white focus:outline-none focus:border-white sm:text-sm hover:border-transparent"
                                type="text" placeholder="Enter asset id...."
                                value={assetId}
                                onChange={(e) => setAssetId(e.target.value)}
                            />
                        </div>

                    </div>


                    <div
                        className='h-[50px] w-[150px] rounded-[10px] border-2 flex justify-center items-center cursor-pointer bg-white bg-opacity-10'
                        onClick={() => {
                           if(accountAddr === '' || assetId === ''){
                               return alert("Fill all fields to continue....");
                           }else{
                               findAccountAssets(accountAddr, assetId).then(
                                   (asset) => {
                                       setAmount(asset.amount);

                                       for(let i = 0; i < assets.length; i++){
                                           if(assets[i].assetId === parseInt(assetId)){
                                               setAssetName(assets[i].asset);
                                               setUnitName(assets[i].unit);
                                           }
                                       }
                                   });
                           }
                        }}
                    >
                        <h1 className='text-white'>Search</h1>
                    </div>
                </div>
            </div>

            <div className='w-full mt-20'>
                <div className='w-full'>
                    <div className='gap-[12px] flex justify-center items-center'>
                        <h1 className='text-white text-[20px]'>Asset Name :</h1>

                        <div
                            className='w-[1000px] h-14 border-2 bg-white bg-opacity-25 rounded-[10px] flex items-center px-3'>
                            <h1 className={`text-white font-bold ${assetName === '' ? 'font-normal opacity-40' : undefined}`}>{assetName === ''? 'Asset name...' : assetName}</h1>
                        </div>
                    </div>
                </div>

                <div className='w-full mt-[20px]'>
                    <div className='gap-[25px] flex justify-center items-center'>
                        <h1 className='text-white text-[20px]'>Unit Name :</h1>

                        <div
                            className='w-[1000px] h-14 border-2 bg-white bg-opacity-25 rounded-[10px] flex items-center px-3'>
                            <h1 className={`text-white font-bold ${unitName === '' ? 'font-normal opacity-40' : undefined}`}>{unitName === ''? 'Unit name...' : unitName}</h1>
                        </div>
                    </div>
                </div>

                <div className='w-full mt-[20px]'>
                    <div className='gap-[45px] flex justify-center items-center'>
                        <h1 className='text-white text-[20px]'>Amount :</h1>

                        <div
                            className='w-[1000px] h-14 border-2 bg-white bg-opacity-25 rounded-[10px] flex items-center px-3'>
                            <h1 className={`text-white font-bold ${amount === '' ? 'font-normal opacity-40' : undefined}`}>{amount === ''? 'Asset amount...' : amount}</h1>
                        </div>
                    </div>
                </div>

                <div className='flex justify-end mt-[50px] px-[88px]'>
                    <div
                        className='h-[50px] w-[100px] rounded-[10px] border-2 flex justify-center items-center cursor-pointer bg-white bg-opacity-10'
                    >
                        <h1 className='text-white'>Clear</h1>
                    </div>
                </div>
            </div>

        </div>
    )
}