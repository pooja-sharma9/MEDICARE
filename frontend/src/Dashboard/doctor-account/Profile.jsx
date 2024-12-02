import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from "./../../utils/uploadCloudinary";
import { BASE_URL, token } from "./../../config";
import { toast } from "react-toastify";

const Profile = ({ doctorData }) => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        bio: "",
        gender: "",
        specialization: "",
        ticketPrice: 0,
        qualifications: [],
        experiences: [],
        timeSlots: [],
        about: "",
        photo: null,
    });

    useEffect(() => {
        setFormData({
            name: doctorData?.name,
            email: doctorData?.email,
            phone: doctorData?.phone,
            bio: doctorData?.bio,
            gender: doctorData?.gender,
            specialization: doctorData?.specialization,
            ticketPrice: doctorData?.ticketPrice,
            qualifications: doctorData?.qualifications,
            experiences: doctorData?.experiences,
            timeSlots: doctorData?.timeSlots,
            about: doctorData?.about,
            photo: doctorData?.photo,
        });
    }, [doctorData]);

    // Handle input change for basic fields
    const handleInputChange = e => {
        // const { name, value } = e.target;
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // setFormData({ ...formData, [name]: value });
    };

    // Handle file input change and upload to Cloudinary
    // const handleFileInputChange = async (event) => {
    //     const file = event.target.files[0];
    //     try {
    //         const data = await uploadImageToCloudinary(file);
    //         setFormData({ ...formData, photo: data?.url });
    //     } catch (error) {
    //         toast.error("Image upload failed. Please try again.");
    //     }
    // };
    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        const data = await uploadImageToCloudinary(file);
        setFormData({ ...formData, photo: data?.url });
    };

    // Update profile handler
    const updateProfileHandler = async e => {
        e.preventDefault();
        try {
            const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.message);
            }

            toast.success(result.message);
        } catch (err) {
            toast.error(err.message);
        }
    };

    // Reusable add function
    // const addItem = (key, item) => {
    //     setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         [key]: [...(prevFormData[key] || []), item],
    //     }));
    // };

    const addItem = (key, item) => {
        setFormData(prevFormData => ({ ...prevFormData, [key]: [...prevFormData[key], item] }));
    };

    // Reusable input change function
    const handleReusableInputChangeFunc = (key, index, event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => {
            const updatedItems = [...prevFormData[key]];
            updatedItems[index][name] = value;
            return {
                ...prevFormData,
                [key]: updatedItems,
            };
        });
    };

    // Reusable delete function
    const deleteItem = (key, index) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [key]: prevFormData[key].filter((_, i) => i !== index),
        }));
    };

    // Add qualification
    const addQualification = (e) => {
        e.preventDefault();
        addItem("qualifications", {
            startingDate: "",
            endingDate: "",
            degree: "PHD",
            university: "Gulzar Group of Institutes",
        });
    };

    // Handle qualification change
    const handleQualificationChange = (event, index) => {
        handleReusableInputChangeFunc("qualifications", index, event);
    };

    // Delete qualification
    const deleteQualification = (e, index) => {
        e.preventDefault();
        deleteItem("qualifications", index);
    };

    // Add experience
    const addExperience = (e) => {
        e.preventDefault();
        addItem("experiences", {
            startingDate: "",
            endingDate: "",
            position: "Senior Surgeon",
            hospital: "Anand Medical Hospital",
        });
    };

    // Handle experience change
    const handleExperienceChange = (event, index) => {
        handleReusableInputChangeFunc("experiences", index, event);
    };

    // Delete experience
    const deleteExperience = (e, index) => {
        e.preventDefault();
        deleteItem("experiences", index);
    };

    // Add time slot
    const addTimeSlot = e => {
        e.preventDefault();
        addItem("timeSlots", { day: "Sunday", startingTime: "10:00", endingTime: "04:30" });
    };

    // Handle time slot change
    const handleTimeSlotChange = (event, index) => {
        handleReusableInputChangeFunc("timeSlots", index, event);
    };

    // Delete time slot
    const deleteTimeSlot = (e, index) => {
        e.preventDefault();
        deleteItem("timeSlots", index);
    };

    return (
        <div>
            <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
                Profile Information
            </h2>
            <form>
                <div className="mb-5">
                    <p className="form__label">Name*</p>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        className="form__input"
                    />
                </div>
                <div className="mb-5">
                    <p className="form__label">Email*</p>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="form__input"
                        readOnly
                        disabled
                    />
                </div>
                <div className="mb-5">
                    <p className="form__label">Phone*</p>
                    <input
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        className="form__input"
                    />
                </div>
                <div className="mb-5">
                    <p className="form__label">Bio*</p>
                    <input
                        type="text"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Bio"
                        className="form__input"
                        maxLength={200}
                    />
                </div>
                <div className="mb-5">
                    <div className="grid grid-cols-3 gap-5 mb-[30px]">
                        <div>
                            <p className="form__label">Gender*</p>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="form__input py-3.5"
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <p className="form__label">Specialization*</p>
                            <select
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleInputChange}
                                className="form__input py-3.5"
                            >
                                <option value="">Select</option>
                                <option value="surgeon">Surgeon</option>
                                <option value="neurologist">Neurologist</option>
                                <option value="dermatologist">Dermatologist</option>
                            </select>
                        </div>
                        <div>
                            <p className="form__label">Ticket Price*</p>
                            <input
                                type="number"
                                placeholder="100"
                                name="ticketPrice"
                                value={formData.ticketPrice}
                                className="form__input"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-5">
                    <p className="form__label">Qualifications*</p>
                    {formData.qualifications?.map((item, index) => (
                        <div key={index}>
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <p className="form__label">Starting Date*</p>
                                    <input
                                        type="date"
                                        name="startingDate"
                                        value={item.startingDate}
                                        onChange={e => handleQualificationChange(e, index)}
                                        className="form__input"
                                    />
                                </div>
                                <div>
                                    <p className="form__label">Ending Date*</p>
                                    <input
                                        type="date"
                                        name="endingDate"
                                        value={item.endingDate}
                                        onChange={e => handleQualificationChange(e, index)}
                                        className="form__input"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-5 mt-5">
                                <div>
                                    <p className="form__label">Degree*</p>
                                    <input
                                        type="text"
                                        name="degree"
                                        value={item.degree}
                                        onChange={e => handleQualificationChange(e, index)}
                                        className="form__input"
                                    />
                                </div>
                                <div>
                                    <p className="form__label">University*</p>
                                    <input
                                        type="text"
                                        name="university"
                                        value={item.university}
                                        onChange={e => handleQualificationChange(e, index)}
                                        className="form__input"
                                    />
                                </div>
                            </div>
                            <button
                                // type="button"
                                className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                                onClick={e => deleteQualification(e, index)}
                            >
                                <AiOutlineDelete />
                            </button>
                        </div>
                    ))}
                    <button
                        // type="button"
                        className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
                        onClick={addQualification}
                    >
                        Add Qualification
                    </button>
                </div>
                <div className="mb-5">
                    <p className="form__label">Experiences*</p>
                    {formData.experiences?.map((item, index) => (
                        <div key={index}>
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <p className="form__label">Starting Date*</p>
                                    <input
                                        type="date"
                                        name="startingDate"
                                        value={item.startingDate}
                                        onChange={e => handleExperienceChange(e, index)}
                                        className="form__input"
                                    />
                                </div>
                                <div>
                                    <p className="form__label">Ending Date*</p>
                                    <input
                                        type="date"
                                        name="endingDate"
                                        value={item.endingDate}
                                        onChange={e => handleExperienceChange(e, index)}
                                        className="form__input"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-5 mt-5">
                                <div>
                                    <p className="form__label">Position*</p>
                                    <input
                                        type="text"
                                        name="position"
                                        value={item.position}
                                        onChange={e => handleExperienceChange(e, index)}
                                        className="form__input"
                                    />
                                </div>
                                <div>
                                    <p className="form__label">Hospital*</p>
                                    <input
                                        type="text"
                                        name="hospital"
                                        value={item.hospital}
                                        onChange={e => handleExperienceChange(e, index)}
                                        className="form__input"
                                    />
                                </div>
                            </div>
                            <button
                                // type="button"
                                className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                                onClick={e => deleteExperience(e, index)}
                            >
                                <AiOutlineDelete />
                            </button>
                        </div>
                    ))}
                    <button
                        // type="button"
                        className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
                        onClick={addExperience}
                    >
                        Add Experience
                    </button>
                </div>
                <div className="mb-5">
                    <p className="form__label">Time Slots*</p>
                    {formData.timeSlots?.map((item, index) => (
                        <div key={index}>
                            <div className="grid grid-cols-2 md:grid-cols-4 mb-8 gap-5">
                                <div>
                                    <p className="form__label">Day*</p>
                                    <select
                                        name="day"
                                        value={item.day}
                                        onChange={e => handleTimeSlotChange(e, index)}
                                        className="form__input py-3.5"
                                    >
                                        <option value="">Select</option>
                                        <option value="Sunday">Sunday</option>
                                        <option value="Monday">Monday</option>
                                        <option value="Tuesday">Tuesday</option>
                                        <option value="Wednesday">Wednesday</option>
                                        <option value="Thursday">Thursday</option>
                                        <option value="Friday">Friday</option>
                                        <option value="Saturday">Saturday</option>
                                    </select>
                                </div>
                                <div>
                                    <p className="form__label">Starting Time*</p>
                                    <input
                                        type="time"
                                        name="startingTime"
                                        value={item.startingTime}
                                        onChange={e => handleTimeSlotChange(e, index)}
                                        className="form__input"
                                    />
                                </div>
                                <div>
                                    <p className="form__label">Ending Time*</p>
                                    <input
                                        type="time"
                                        name="endingTime"
                                        value={item.endingTime}
                                        onChange={e => handleTimeSlotChange(e, index)}
                                        className="form__input"
                                    />
                                </div>
                                <div className="flex items-center justify-center">
                                    <button
                                        // type="button"
                                        className="bg-red-600 p-2 rounded-full text-white text-[18px] cursor-pointer mt-6"
                                        onClick={e => deleteTimeSlot(e, index)}
                                    >
                                        <AiOutlineDelete />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        // type="button"
                        className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
                        onClick={addTimeSlot}
                    >
                        Add Time Slot
                    </button>
                </div>
                <div className="mb-5">
                    <p className="form__label">About*</p>
                    <textarea
                        name="about"
                        // id=""
                        rows={5}
                        value={formData.about}
                        placeholder="write about yourself "
                        onChange={handleInputChange}
                        className="form__input"
                    >
                        {/* {" "} */}
                    </textarea>
                </div>
                <div className="mb-5 flex items-center gap-3 ">
                    {formData.photo && (
                        <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                            <img
                                src={formData.photo}
                                className="w-full rounded-full"
                                alt=""
                            />
                        </figure>
                    )}
                    <div className="relative w-[130px] h-[50px]">
                        <input
                            type="file"
                            name="photo"
                            id="customFile"
                            onChange={handleFileInputChange}
                            accept=".jpg,.png"
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer file-input"
                        />
                        <label
                            htmlFor="customFile"
                            className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.35rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                        >
                            Upload Photo
                        </label>
                    </div>
                </div>
                <div className="mt-7">
                    <button
                        type="submit"
                        onClick={updateProfileHandler}
                        className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg "
                    >
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;