import Mn from "../../assets/images/Mn.png";
import {useState} from "react";
import {recoverAccount} from "../../service/Algorand";

export const RecoverAccountPage = () => {

    const [mn, setMn] = useState('');
    const [accAddr, setAccAddr] = useState('');

    return (
        <div>
            <h1 className='text-white text-[40px] font-bold'>Recover Account</h1>

            <div className='w-full flex justify-center mt-20'>
                <div className='flex gap-5'>
                    <div
                        className="flex items-center bg-white w-[500px] h-[50px] p-1 pl-3 rounded-[10px] gap-2 border-[1px] max-xl:w-full">
                        <img src={Mn} className="w-7 h-7 opacity-40"/>
                        <input
                            className="p-1 text-[13px] w-[480px] border border-white focus:outline-none focus:border-white sm:text-sm hover:border-transparent"
                            type="text" placeholder="Enter Mnemonic phrase...."
                            value={mn}
                            onChange={(e) => setMn(e.target.value)}
                        />
                    </div>

                    <div
                        className='h-[50px] w-[150px] rounded-[10px] border-2 flex justify-center items-center cursor-pointer bg-white bg-opacity-10'
                        onClick={() => {
                            if (mn === '') {
                                return alert("Please enter a name !");
                            } else {
                                recoverAccount(mn).then(
                                    (acc) => {
                                        setAccAddr(acc.addr);
                                    }
                                );
                            }
                        }}
                    >
                        <h1 className='text-white'>Recover Account</h1>
                    </div>
                </div>
            </div>

            <div className='w-full mt-[150px]'>
                <div className='gap-6 flex justify-center items-center'>
                    <h1 className='text-white text-[20px]'>Account Address :</h1>

                    <div
                        className='w-[1000px] h-14 border-2 bg-white bg-opacity-25 rounded-[10px] flex items-center px-3'>
                        <h1 className={`text-white font-bold ${accAddr === '' ? 'font-normal opacity-40' : undefined}`}>{accAddr === '' ? 'Search with mn to get account address....' : accAddr}</h1>
                    </div>
                </div>
            </div>

        </div>
    )
}