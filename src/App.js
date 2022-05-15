import {Routes, Route} from "react-router-dom";
import MachinesPage from "./pages/MachinesPage";
import MachineInfoPage from "./pages/MachineInfoPage"
import ErrorsPage from "./pages/ErrorsPage";
import ErrorPropertyPage from "./pages/ErrorPropertyPage";
import AboutPage from "./pages/AboutPage";
import UserPage from "./pages/UserPage";
import ErrorCreatePage from "./pages/ErrorCreatePage";
import StorePage from "./pages/StorePage";
import MainPage from "./pages/MainPage";

function App() {

    return (

        <Routes>
            <Route path="/" element={<MainPage />}/>
            <Route path="/errors" element={<ErrorsPage/>}/>
            <Route path="/machines" element={<MachinesPage/>}/>
            <Route path="/machines/:inv_number" element={<MachineInfoPage/>}/>
            <Route path="/errors/:id" element={<ErrorPropertyPage/>}/>
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/users" element={<UserPage/>}/>
            <Route path="/errorcreate" element={<ErrorCreatePage/>}/>
            <Route path="/store" element={<StorePage />}/>
        </Routes>
    );
}

export default App;
