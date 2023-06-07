const boom = require("@hapi/boom");
const User = require("../db/schema/user");

const getProfile = async (req, res, next) => {
    try {
        const { username } = req.params;
        let user = await User.findOne({username});
        if (!user) {
            throw boom.notFound('User does not exist');
        }

        res.status(200).json({
            _id: user._id,
            username: user.username,
            name: user.name
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProfile
}