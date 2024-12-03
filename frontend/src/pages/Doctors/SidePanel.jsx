// import convertTime from "../../utils/convertTime";
// import { BASE_URL, token } from "./../../config";
// import { toast } from "react-toastify";

// const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {

//     const bookingHandler = async () => {
//         try {
//             const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
//                 method: "post",
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             const data = await res.json();

//             if (!res.ok) {
//                 throw new Error(data.message + "Please try again");
//             }

//             if (data.session.url) {
//                 window.location.href = data.session.url;
//             }

//         } catch (err) {
//             toast.error(err.message);
//         }
//     };

//     return (
//         <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
//             <div className="flex items-center justify-between">
//                 <p className="text__para mt-0 font-semibold">Ticket Price</p>
//                 <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
//                     &#x20B9;{ticketPrice}
//                 </span>
//             </div>

//             <div className="mt-[30px]">
//                 <p className="text__para mt-0 font-semibold text-headingColor">
//                     Available Time Slots:
//                 </p>

//                 <ul className="mt-3">
//                     {timeSlots?.map((item, index) => (
//                         <li key={index} className="flex items-center justify-between mb-2">
//                             <p className="text-[15px] leading-6 text-textColor font-semibold">
//                                 {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
//                             </p>
//                             <p className="text-[15px] leading-6 text-textColor font-semibold">
//                                 {convertTime(item.startingTime)} - {convertTime(item.endingTime)}
//                             </p>
//                         </li>
//                     ))}

//                 </ul>
//             </div>

//             <button onClick={bookingHandler} className='btn px-2 w-full rounded-md'>Book Appointment</button>
//         </div>
//     );
// };

// export default SidePanel;

import convertTime from "../../utils/convertTime";
import { BASE_URL, token } from "./../../config";
import { toast } from "react-toastify";

const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {

    const bookingHandler = async () => {
        try {
            // Make the POST request to the backend API to create the checkout session
            const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Parse the response data
            const data = await res.json();

            // Check if the response is not ok (status code not 2xx)
            if (!res.ok) {
                throw new Error(data.message || "Something went wrong. Please try again.");
            }

            // If the session URL exists in the response, redirect the user to that URL
            if (data.session?.url) {
                window.location.href = data.session.url;
            }

        } catch (err) {
            // Show the error in a toast notification
            const errorMessage = err.message || "An unknown error occurred. Please try again.";
            toast.error(errorMessage);
            console.error("Error during booking:", err);  // Log the entire error for debugging
        }
    };

    return (
        <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
            <div className="flex items-center justify-between">
                <p className="text__para mt-0 font-semibold">Ticket Price</p>
                <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
                    &#x20B9;{ticketPrice}
                </span>
            </div>

            <div className="mt-[30px]">
                <p className="text__para mt-0 font-semibold text-headingColor">
                    Available Time Slots:
                </p>

                <ul className="mt-3">
                    {timeSlots?.length > 0 ? (
                        timeSlots.map((item, index) => (
                            <li key={index} className="flex items-center justify-between mb-2">
                                <p className="text-[15px] leading-6 text-textColor font-semibold">
                                    {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
                                </p>
                                <p className="text-[15px] leading-6 text-textColor font-semibold">
                                    {convertTime(item.startingTime)} - {convertTime(item.endingTime)}
                                </p>
                            </li>
                        ))
                    ) : (
                        <p>No available time slots.</p>
                    )}
                </ul>
            </div>

            <button onClick={bookingHandler} className="btn px-2 w-full rounded-md">
                Book Appointment
            </button>
        </div>
    );
};

export default SidePanel;
