import {tabImages, tabNames} from "../../assets/tabs/Tabs";

export function Header({ selectedTab, setSelectedTab }) {

    return(
        <header className='w-full flex items-center justify-between mb-24'>
            <h1 className='text-white text-[30px] font-bold'>eWallet .</h1>

            <div className='flex gap-4 max-lg:gap-2 max-sm:gap-1'>
                {
                    tabNames.map((name, index) => (
                        <div to={`/${name}`}
                            className={`h-10 rounded-xl px-4 flex gap-2 items-center justify-center cursor-pointer max-lg:w-full ${selectedTab === name ? 'border-[1px] border-white' : undefined }`}
                            onClick={() => {setSelectedTab(name)}} key={index}
                        >

                            <h6 className='text-white text-[13px] font-semibold max-lg:hidden'>{name}</h6>
                        </div>

                    ))
                }
            </div>
        </header>
    )
}