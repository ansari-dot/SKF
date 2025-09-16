import User from '../model/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "sk";

class UserController {



    // Login user
    static async login(req, res) {
            try {
                const { email, password } = req.body;

                // find user
                const user = await User.findOne({ email });
                if (!user) {
                    return res.status(400).json({ message: "Invalid credentials" });
                }

                // check password
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(400).json({ message: "Invalid credentials" });
                }

                // create token
                const token = jwt.sign({ id: user._id, role: user.role },
                    JWT_SECRET, { expiresIn: "1d" }
                );

                // store token in cookie
                res.cookie("token", token, {
                    httpOnly: true, // prevents JS access
                    secure: false, // set true if using HTTPS
                    maxAge: 24 * 60 * 60 * 1000 // 1 day
                });

                res.json({ message: "Login successful", token, user: { id: user._id, email: user.email, role: user.role } });
            } catch (error) {
                res.status(500).json({ message: "Server error", error: error.message });
            }
        }
        // logout User
    static async logout(req, res) {
        try {
            res.clearCookie("token");
            res.json({ message: "Logged out successfully" });
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

   // Update user profile
    static async updateProfile(req, res) {
        try {
            const userId = req.user.id;
            const { name, email, phone } = req.body;

            // Find user and update
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Update fields if provided
            if (name) user.name = name;
            if (email) user.email = email;
            if (phone) user.phone = phone;

            await user.save();

            res.json({ 
                message: "Profile updated successfully", 
                user: { 
                    id: user._id, 
                    name: user.name, 
                    email: user.email, 
                    phone: user.phone,
                    role: user.role 
                } 
            });
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    // Change password
    static async changePassword(req, res) {
        try {
            const userId = req.user.id;
            const { currentPassword, newPassword } = req.body;

            // Find user
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Verify current password
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Current password is incorrect" });
            }

            // Hash new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;

            await user.save();

            res.json({ message: "Password changed successfully" });
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

}

export default UserController;