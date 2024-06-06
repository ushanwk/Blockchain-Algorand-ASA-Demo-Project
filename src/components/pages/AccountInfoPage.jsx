import Wallet from "../../assets/images/Wallet.png";
import {useState} from "react";
import {findAccountAlgoAmount} from "../../service/Algorand";

export const AccountInfoPage = ({accounts}) => {

    const [name, setName] = useState('');
    const [accAddr, setAccAddr] = useState('');
    const [accMn, setAccMn] = useState('');
    const [algo, setAlgo] = useState('');


    console.log(accounts)

    return (
        <div>
            <h1 className='text-white text-[40px] font-bold'>Account Information</h1>

            <div className='w-full flex justify-center mt-20'>
                <div className='flex gap-5'>
                    <div
                        className="flex items-center bg-white w-[500px] h-[50px] p-1 pl-3 rounded-[10px] gap-2 border-[1px] max-xl:w-full">
                        <img src={Wallet} className="w-5 h-5 opacity-40"/>
                        <input
                            className="p-1 text-[13px] w-[480px] border border-white focus:outline-none focus:border-white sm:text-sm hover:border-transparent"
                            type="text" placeholder="Enter wallet address...."
                            value={accAddr}
                            onChange={(e) => setAccAddr(e.target.value)}
                        />
                    </div>

                    <div
                        className='h-[50px] w-[150px] rounded-[10px] border-2 flex justify-center items-center cursor-pointer bg-white bg-opacity-10'
                        onClick={() => {
                            for(let i = 0; i < accounts.length; i++){
                                if(accounts[i].accountDetails.account.addr === accAddr){
                                    setName(accounts[i].name);
                                    setAccMn(accounts[i].accountDetails.mn);
                                }
                            }

                            findAccountAlgoAmount(accAddr).then(
                                (out) => {
                                    setAlgo(String(out))
                                }
                            );
                        }}
                    >
                        <h1 className='text-white'>Search Account</h1>
                    </div>
                </div>
            </div>

            <div className='w-full mt-[150px] flex gap-36 px-20'>
                <div className='gap-8 flex justify-center items-center'>
                    <h1 className='text-white text-[20px]'>Owner Name :</h1>

                    <div
                        className='w-[200px] h-14 border-2 bg-white bg-opacity-25 rounded-[10px] flex items-center px-3'>
                        <h1 className={`text-white font-bold ${name === '' ? 'font-normal opacity-40' : undefined}`}>{name === '' ? 'Owner name....' : name}</h1>
                    </div>
                </div>

                <div className='gap-8 flex justify-center items-center'>
                    <h1 className='text-white text-[20px]'>Algo Amount :</h1>

                    <div
                        className='w-[200px] h-14 border-2 bg-white bg-opacity-25 rounded-[10px] flex items-center px-3'>
                        <h1 className={`text-white font-bold ${algo === '' ? 'font-normal opacity-40' : undefined}`}>{algo === '' ? 'Algo amount....' : algo}</h1>
                    </div>
                </div>
            </div>

            <div className='w-full mt-[60px]'>
                <div className='gap-5 flex justify-center items-center'>
                    <h1 className='text-white text-[19px]'>Mnemonic Phrase :</h1>

                    <div
                        className='w-[1000px] h-20 border-2 bg-white bg-opacity-25 rounded-[10px] flex items-center px-3'>
                        <h1 className={`text-white font-bold ${accMn === '' ? 'font-normal opacity-40' : undefined}`}>{accMn === '' ? 'Mnemonic phrase....' : accMn}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}