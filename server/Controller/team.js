import User from '../model/User.js';
import Team from '../model/Team.js';

class TeamController {

    // the method to add the team member   
    async addTeam() {

        try {
            const userId = req.user._id || req.user.id;
            const { name, role, intro } = req.body;
            if (!name || !role || !intro) {
                res.status(400).json({
                    message: " Please fill all the filled ",
                    success: true
                })

            }
            let imagePath = '/placeholder-logo.png';
            if (req.file) {
                imagePath = `/uploads/${req.file.filename}`;
            }
            const user = await User.findById(userId);
            if (!user) {
                res.status(400).json({
                    message: "User not found",
                    success: false
                })
            }
            const newTeam = await Team.create({
                name,
                role,
                intro,
                image: imagePath
            })
            res.status(200).json({
                message: ""
            })
            await newTeam.save();

        } catch (err) {



        }





    }













}