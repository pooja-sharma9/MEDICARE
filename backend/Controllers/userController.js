// import mongoose from "mongoose";
import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js"
import bcrypt from 'bcryptjs';

// Create a User model using the schema
// const User = mongoose.model('User', UserSchema);

// export const updateUser = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const updatedUser = await User.findByIdAndUpdate(
//             id,
//             { $set: req.body },
//             { new: true }
//         );

//         if (!updatedUser) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }

//         res.status(200).json({
//             success: true,
//             message: 'Successfully updated',
//             data: updatedUser,
//         });

//     } catch (err) {
//         res.status(500).json({ success: false, message: 'Failed to update', error: err.message });
//     }
// };

export const updateUser = async (req, res) => {
    const id = req.params.id;

    try {
        // Fetch the user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if the password is being updated
        if (req.body.password) {
            // Hash the new password
            const hashedPassword = await bcrypt.hash(req.body.password, 12);
            req.body.password = hashedPassword;
        }

        // Update the user's fields
        Object.assign(user, req.body); // Merge req.body into the user object
        const updatedUser = await user.save();

        res.status(200).json({
            success: true,
            message: 'Successfully updated',
            data: updatedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to update',
            error: err.message,
        });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    try {
        // Use the authenticated user's ID from the token
        const userId = req.userId; // Assuming the user ID is stored in the req object after JWT authentication

        // Find and delete the user by their authenticated ID
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "Successfully Deleted",
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to delete" });
    }
};

// Get single user by id
export const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id).select("-password");
        if (user) {
            res.status(200).json({
                success: true,
                message: "User found",
                data: user,
            });
        } else {
            res.status(404).json({ success: false, message: "No User found" });
        }

    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to Retrieve User" });
    }
};

// Get all users
export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.status(200).json({
            success: true,
            message: 'Users found',
            data: users,
        });

    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to Retrieve Users" });
    }
};

// Get user Profile
export const getUserProfile = async (req, res) => {
    const userId = req.userId;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const { password, ...rest } = user._doc;

        res.status(200).json({ success: true, message: 'Profile info retrieved successfully', data: { ...rest } });

    } catch (err) {
        res.status(500).json({ success: false, message: "Something went wrong, cannot get profile" });

    }
};


// Get My appointments
export const getMyAppointments = async (req, res) => {
    try {
        // step -1: retrieve appointments from booking for specific user
        const bookings = await Booking.find({ user: req.userId });
        // step -2: extract doctor ids from appointment bookings
        const doctorIds = bookings.map(el => el.doctor.id);
        // const doctorIds = bookings.map(el => el.doctor);
        // step -3: retrieve doctors using doctor ids
        const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select('-password');

        res.status(200).json({ success: true, message: "Appointments are retrieved successfully", data: doctors });
    } catch (err) {
        res.status(500).json({ success: false, message: "Something went wrong, cannot get appointments" });
    }
};