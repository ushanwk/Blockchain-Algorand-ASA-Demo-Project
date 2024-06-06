import Name from '../../assets/images/Name.png'
import {useState} from "react";
import {createGeneralAccount} from "../../service/Algorand";

export function CreateAccountPage({accounts, setAccounts}) {

    const [name, setName] = useState('');
    const [accAddr, setAccAddr] = useState('');
    const [accMn, setAccMn] = useState('');

    return (
        <section>
            <h1 className='text-white text-[40px] font-bold'>Create Account</h1>

            <div className='w-full flex justify-center mt-20'>
                <div className='flex gap-5'>
                    <div
                        className="flex items-center bg-white w-[500px] h-[50px] p-1 pl-3 rounded-[10px] gap-2 border-[1px] max-xl:w-full">
                        <img src={Name} className="w-5 h-5 opacity-40"/>
                        <input
                            className="p-1 text-[13px] w-[480px] border border-white focus:outline-none focus:border-white sm:text-sm hover:border-transparent"
                            type="text" placeholder="Enter account name...."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div
                        className='h-[50px] w-[150px] rounded-[10px] border-2 flex justify-center items-center cursor-pointer bg-white bg-opacity-10'
                        onClick={() => {
                            if (name === '') {
                                return alert("Please enter a name !");
                            } else {
                                createGeneralAccount().then(
                                    (acc) => {
                                        let accObj = {
                                            name,
                                            accountDetails: acc
                                        }

                                        setAccounts([
                                            ...accounts,
                                            accObj
                                        ]);

                                        setAccAddr(accObj.accountDetails.account.addr);
                                        setAccMn(accObj.accountDetails.mn);
                                    }
                                )
                            }

                        }}
                    >
                        <h1 className='text-white'>Create Account</h1>
                    </div>
                </div>
            </div>

            <div className='w-full mt-[150px]'>
                <div className='gap-6 flex justify-center items-center'>
                    <h1 className='text-white text-[20px]'>Account Address :</h1>

                    <div
                        className='w-[1000px] h-14 border-2 bg-white bg-opacity-25 rounded-[10px] flex items-center px-3'>
                        <h1 className={`text-white font-bold ${accAddr === '' ? 'font-normal opacity-40' : undefined}`}>{accAddr === '' ? 'Create account to see account address....' : accAddr}</h1>
                    </div>
                </div>
            </div>

            <div className='w-full mt-[60px]'>
                <div className='gap-5 flex justify-center items-center'>
                    <h1 className='text-white text-[19px]'>Mnemonic Phrase :</h1>

                    <div
                        className='w-[1000px] h-20 border-2 bg-white bg-opacity-25 rounded-[10px] flex items-center px-3'>
                        <h1 className={`text-white font-bold ${accMn === '' ? 'font-normal opacity-40' : undefined}`}>{accMn === '' ? 'Create account to see mnemonic phrase....' : accMn}</h1>
                    </div>
                </div>
            </div>

        </section>
    )
}