import User from '../models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // Make sure you're importing bcryptjs

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: '15d',
        }
    );
};

export const register = async (req, res) => {
    const { email, password, role, name, photo, gender } = req.body;
    try {
        let user = null;

        if (role === 'patient') {
            user = await User.findOne({ email });
        } else if (role === 'doctor') {
            user = await Doctor.findOne({ email });
        }

        // Check if user exists
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // // Hash password
        // const salt = await bcrypt.genSalt(10);
        // const hashPassword = await bcrypt.hash(password, salt);

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);


        if (role === 'patient') {
            user = new User({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role,
            });
        }

        if (role === 'doctor') {
            user = new Doctor({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role,
            });
        }

        await user.save();

        res.status(200).json({ success: true, message: 'User successfully created' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error, try again' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = null;

        // First check for patient, then for doctor
        const patient = await User.findOne({ email });
        const doctor = await Doctor.findOne({ email });

        if (patient) {
            user = patient;
        } else if (doctor) {
            user = doctor;
        }

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if bcrypt.compare returns a Promise
        console.log(bcrypt.compare); // Debugging line to check the function type

        // Compare the password (make sure to await the comparison)
        const isPasswordMatch = bcrypt.compare(password, user.password); // Ensure this line is awaited properly

        if (!isPasswordMatch) {
            return res.status(400).json({ status: false, message: 'Invalid Credentials' });
        }

        // Generate a token if credentials are valid
        const token = generateToken(user);

        // Exclude sensitive data like password and role before sending the response
        const { password: _, role, appointment, ...rest } = user._doc;

        res.status(200).json({
            status: true,
            message: 'Successfully logged in',
            token,
            data: { ...rest },
            role,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, message: 'Failed to login' });
    }
};
