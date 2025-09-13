import { Outlet } from "react-router-dom";
import CustomNavBar from "../../components/CustomNavBar/CustomNavBar";
import ErrorToast from "../../components/ErrorToast/ErrorToast";

function Layout() {

    return (
        <div className="bg-cover grid grid-cols-1 overflow-hidden place-items-stretch bg-white gap-2">
            <div>
                <CustomNavBar />
            </div>
            <div className="flex justify-center bg-blue-400 rounded-box pt-10 pb-10">
                <div className="w-200 h-200">
                    <Outlet />
                </div>
            </div>
            <div>
                <ErrorToast />
            </div>
        </div>
    )
}

export default Layout;
