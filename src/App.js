import './App.css';
import {useState} from "react";
import {Header} from "./components/common/Header";
import {MainSection} from "./components/common/MainSection";

function App() {
    const [selectedTab, setSelectedTab] = useState('Create Account');

    return (
        <div className=" pt-10 pb-10 h-[100vh]
                px-48 max-2xl:px-36 max-xl:px-28 max-lg:px-16 max-md:px-10 max-sm:px-2
                w-full bg-[url('assets/images/Background.png')] bg-cover"
        >
            <Header selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
            <MainSection selectedTab={selectedTab} />

        </div>
    );
}

export default App;