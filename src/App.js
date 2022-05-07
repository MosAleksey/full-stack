import {Routes, Route} from "react-router-dom";
import MachinesPage from "./pages/MachinesPage";
import MachineInfoPage from "./pages/MachineInfoPage"
import ErrorsPage from "./pages/ErrorsPage";
import ErrorPropertyPage from "./pages/ErrorPropertyPage";
import AboutPage from "./pages/AboutPage";
import UserPage from "./pages/UserPage";

function App() {

    return (

        <Routes>
            <Route path="/errors" element={<ErrorsPage/>}/>
            <Route path="/machines" element={<MachinesPage/>}/>
            <Route path="/machines/:inv_number" element={<MachineInfoPage/>}/>
            <Route path="/errors/:id" element={<ErrorPropertyPage/>}/>
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/users" element={<UserPage/>}/>
        </Routes>
    );
}

export default App;
