import {Routes, Route} from "react-router-dom";
import MachinesPage from "./pages/MachinesPage";
import MachineInfoPage from "./pages/MachineInfoPage"
import ErrorsPage from "./pages/ErrorsPage";
import ErrorPropertyPage from "./pages/ErrorPropertyPage";

function App() {

    return (

            <Routes>
                <Route path="/errors" element={<ErrorsPage/>}/>
                <Route path="/machines" element={<MachinesPage/>}/>
                <Route path="/machines/:inv_number" element={<MachineInfoPage/>}/>
                <Route path="/errors/:id" element={<ErrorPropertyPage/>}/>
            </Routes>
    );
}

export default App;
