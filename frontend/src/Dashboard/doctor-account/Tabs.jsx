
import { authContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BiMenu } from "react-icons/bi"
import { BASE_URL } from "../../config";

const Tabs = ({ tab, setTab }) => {
    const { dispatch } = useContext(authContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
    };

    const handleDeleteDoctor = async () => {
        // Ask for confirmation
        const confirmation = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");

        if (confirmation) {
            try {
                const response = await fetch(`${BASE_URL}/doctors/delete-account`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT token stored in localStorage
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    alert(data.message);  // Success message from backend
                    handleLogout();  // Log out the user after successful account deletion
                } else {
                    alert(data.message || "Failed to delete doctor account");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred while deleting the account");
            }
        }
    };

    return (
        <div>
            <span className="lg:hidden">
                <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
            <div className="hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md">
                <button
                    onClick={() => setTab("overview")}
                    className={`${tab === "overview"
                        ? "bg-indigo-100 text-primaryColor"
                        : "bg-transparent text-headingColor"
                        } w-full btn mt-0 rounded-md`}
                >
                    Overview
                </button>
                <button
                    onClick={() => setTab("appointments")}
                    className={`${tab === "appointments"
                        ? "bg-indigo-100 text-primaryColor"
                        : "bg-transparent text-headingColor"
                        } w-full btn mt-0 rounded-md`}
                >
                    Appointments
                </button>
                <button
                    onClick={() => setTab("settings")}
                    className={`${tab === "settings"
                        ? "bg-indigo-100 text-primaryColor"
                        : "bg-transparent text-headingColor"
                        } w-full btn mt-0 rounded-md`}
                >
                    Profile
                </button>
                <div className="mt-[100px] w-full">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
                    >
                        Logout
                    </button>
                    <button onClick={handleDeleteDoctor} className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Tabs;


