import { Outlet } from "react-router-dom";
import Body from "../Body";
import Header from "../Header";
import Footer from "../Footer";
function DefaultLayout() {
    return (  
        <>
            <Header/>
            <Body/>
            <Footer/>
        </>
    );
}
export default DefaultLayout;