import {useEffect, useState} from "react";
import {createAsset} from "../../service/Algorand";

export function CreateAssetPage({accounts, assets, setAssets}) {

    const [creator, setCreator] = useState(accounts[0]?.accountDetails);
    const [unit, setUnit] = useState('');
    const [asset, setAsset] = useState('');
    const [total, setTotal] = useState(0);
    const [assetId, setAssetId] = useState('');

    useEffect(() => {
        let assetObj = {
            assetId,
            asset,
            unit
        }
        setAssets([
            ...assets,
            assetObj
        ]);
    }, [assetId])

    return (
        <div>
            <h1 className='text-white text-[40px] font-bold mb-20'>Create Asset</h1>

            <div className='w-full mt-20'>
                <div className='w-full'>
                    <div className='gap-[100px] flex justify-center items-center'>
                        <h1 className='text-white text-[20px]'>Creator :</h1>

                        <div className='flex gap-[10px]'>
                            <div
                                className='w-[700px] h-14 border-2 bg-white bg-opacity-25 rounded-[10px] flex items-center px-3'>
                                <h1 className={`text-white font-bold ${accounts.length === 0 ? 'font-normal opacity-40' : undefined}`}>{accounts.length === 0 ? 'Creator address here...' : creator.account.addr}</h1>
                            </div>

                            <div
                                className='w-[290px] h-14 border-2 bg-white bg-opacity-25 rounded-[10px] flex items-center px-3'>
                                <h1 className={`text-white font-bold ${accounts.length === 0 ? 'font-normal opacity-40' : undefined}`}>{accounts.length === 0 ? 'Creator name here...' : accounts[0].name}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full mt-[20px]'>
                    <div className='gap-[85px] flex justify-center items-center'>
                        <h1 className='text-white text-[20px]'>Manager :</h1>

                        <div className='flex gap-[10px]'>
                            <div
                                className='w-[700px] h-14 border-2 bg-white bg-opacity-25 rounded-[10px] flex items-center px-3'>
                                <h1 className={`text-white font-bold ${accounts.length === 0 ? 'font-normal opacity-40' : undefined}`}>{accounts.length === 0 ? 'Manager address here...' : creator.account.addr}</h1>
                            </div>

                            <div
                                className='w-[290px] h-14 border-2 bg-white bg-opacity-25 rounded-[10px] flex items-center px-3'>
                                <h1 className={`text-white font-bold ${accounts.length === 0 ? 'font-normal opacity-40' : undefined}`}>{accounts.length === 0 ? 'Manager name here...' : accounts[0].name}</h1>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='gap-[61px] flex justify-center items-center mt-[20px]'>
                    <h1 className='text-white text-[20px]'>Unite Name :</h1>

                    <div
                        className="flex items-center bg-white w-[1000px] h-[55px] p-1 pl-3 rounded-[10px] gap-2 border-[1px] max-xl:w-full">
                        <input
                            className="p-1 text-[13px] w-[980px] border border-white focus:outline-none focus:border-white sm:text-sm hover:border-transparent"
                            type="text" placeholder="Enter unit name...."
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                        />
                    </div>
                </div>

                <div className='gap-[61px] flex justify-center items-center mt-[20px]'>
                    <h1 className='text-white text-[20px]'>Asset Name :</h1>

                    <div
                        className="flex items-center bg-white w-[1000px] h-[55px] p-1 pl-3 rounded-[10px] gap-2 border-[1px] max-xl:w-full">
                        <input
                            className="p-1 text-[13px] w-[980px] border border-white focus:outline-none focus:border-white sm:text-sm hover:border-transparent"
                            type="text" placeholder="Enter asset name...."
                            value={asset}
                            onChange={(e) => setAsset(e.target.value)}
                        />
                    </div>
                </div>

                <div className='gap-[42px] flex justify-center items-center mt-[20px]'>
                    <h1 className='text-white text-[20px]'>Total Issuance :</h1>

                    <div
                        className="flex items-center bg-white w-[1000px] h-[55px] p-1 pl-3 rounded-[10px] gap-2 border-[1px] max-xl:w-full">
                        <input
                            className="p-1 text-[13px] w-[980px] border border-white focus:outline-none focus:border-white sm:text-sm hover:border-transparent"
                            type="text" placeholder="Enter total issuance...."
                            value={total}
                            onChange={(e) => setTotal(parseInt(e.target.value))}
                        />
                    </div>
                </div>

                <div className='flex justify-between mt-[50px] px-14'>
                    <div className='gap-[25px] flex justify-center items-center'>
                        <h1 className='text-white text-[20px]'>Created Asset ID :</h1>

                        <div
                            className='w-[250px] h-14 border-2 bg-white bg-opacity-25 rounded-[10px] flex items-center px-3'>
                            <h1 className={`text-white font-bold ${assetId === '' ? 'font-normal opacity-40' : undefined}`}>{assetId === '' ? 'Created asset id here...' : assetId}</h1>
                        </div>
                    </div>

                    <div
                        className='h-[50px] w-[150px] rounded-[10px] border-2 flex justify-center items-center cursor-pointer bg-white bg-opacity-10'
                        onClick={
                            () => {

                                if(unit==='' || asset==='' || total===0){
                                    return alert("Fill all fields to continue....");
                                }else{
                                    createAsset(creator.account, unit, asset, total).then(
                                        (out) => {
                                            setAssetId(out);
                                        }
                                    );
                                }
                            }
                        }
                    >
                        <h1 className='text-white'>Create Asset</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}