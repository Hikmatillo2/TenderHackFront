import {BrowserRouter, Routes, Route} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import './elements/Auth/button.css';
import './elements/Auth/auth.css';
import './App.css';
import './elements/Auth/auth.css'
import Default from "./elements/Default";
import Auth from "./elements/Auth";
import Error from "./elements/Error";
import Account from "./elements/Account";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Default/>}/>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/error" element={<Error/>}/>
                <Route path="/account" element={<Account/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
