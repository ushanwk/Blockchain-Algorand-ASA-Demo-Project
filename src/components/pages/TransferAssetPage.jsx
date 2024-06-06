import Amount from "../../assets/images/Amount.png";
import Coin from "../../assets/images/Coin.png";
import Transfer from '../../assets/images/Transfer.png'
import {useState} from "react";
import {transferAsset} from "../../service/Algorand";

export function TransferAssetPage({accounts}) {

    const [assetId, setAssetId] = useState('');
    const [amount, setAmount] = useState('');

    const [senderAccAddr, setSenderAccAddr] = useState('');
    const [receiverAccAddr, setReceiverAccAddr] = useState('');

    console.log(accounts)

    return (
        <div>
            <h1 className='text-white text-[40px] font-bold'>Transfer Asset</h1>

            <div className='w-full flex justify-center mt-20'>
                <div className='flex gap-10'>

                    <div className='flex gap-5'>

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

                        <div
                            className="flex items-center bg-white w-[200px] h-[50px] p-1 pl-3 rounded-[10px] gap-2 border-[1px] max-xl:w-full">
                            <img src={Amount} className="w-6 h-6 opacity-40"/>
                            <input
                                className="p-1 text-[13px] w-[150px] border border-white focus:outline-none focus:border-white sm:text-sm hover:border-transparent"
                                type="text" placeholder="Enter amount...."
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>

                    </div>


                    <div
                        className='h-[50px] w-[150px] rounded-[10px] border-2 flex justify-center items-center cursor-pointer bg-white bg-opacity-10'
                        onClick={() => {
                            if(assetId === '' || amount === '' || senderAccAddr === '' || receiverAccAddr === ''){
                                return alert("Fill all fields to continue....");
                            }else{
                                let finalSenderAcc = '';
                                let finalRecAcc = '';


                                for(let i = 0; i < accounts.length; i++){
                                    if(accounts[i].accountDetails.account.addr === senderAccAddr){
                                        finalSenderAcc = accounts[i].accountDetails.account;
                                    }

                                    if(accounts[i].accountDetails.account.addr === receiverAccAddr){
                                        finalRecAcc = accounts[i].accountDetails.account;
                                    }
                                }

                               transferAsset(finalSenderAcc, finalRecAcc, parseInt(assetId), parseInt(amount)).then(
                                   (trn) => {
                                       console.log(trn)
                                   }
                               );
                            }
                        }}
                    >
                        <h1 className='text-white'>Transfer</h1>
                    </div>
                </div>
            </div>

            <div className='gap-[42px] flex justify-center items-center mt-20'>
                <h1 className='text-white text-[20px]'>Sender's Account Address :</h1>

                <div
                    className="flex items-center bg-white w-[800px] h-[55px] p-1 pl-3 rounded-[10px] gap-2 border-[1px] max-xl:w-full">
                    <input
                        className="p-1 text-[13px] w-[780px] border border-white focus:outline-none focus:border-white sm:text-sm hover:border-transparent"
                        type="text" placeholder="Enter sender account address...."
                        value={senderAccAddr}
                        onChange={(e) => setSenderAccAddr(e.target.value)}
                    />
                </div>
            </div>

            <div className='w-full h-10 py-16 flex justify-center items-center'>
                <img src={Transfer} width={40} className='rotate-90'/>
            </div>

            <div className='gap-[20px] flex justify-center items-center'>
                <h1 className='text-white text-[20px]'>Receiver's Account Address :</h1>

                <div
                    className="flex items-center bg-white w-[800px] h-[55px] p-1 pl-3 rounded-[10px] gap-2 border-[1px] max-xl:w-full">
                    <input
                        className="p-1 text-[13px] w-[780px] border border-white focus:outline-none focus:border-white sm:text-sm hover:border-transparent"
                        type="text" placeholder="Enter reciever account address...."
                        value={receiverAccAddr}
                        onChange={(e) => setReceiverAccAddr(e.target.value)}
                    />
                </div>
            </div>

        </div>
    )
}