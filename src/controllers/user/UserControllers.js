const UserServices = require('../../services/user/UserServices');

const getAllOrderHistory = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({
                error: 'User not found',
            })
        }

        const result = await UserServices.getAllOrderHistory({userId});
        return res.status(200).json(result);

    } catch (error) {
        return res.status(400).json({
            message: error.message || "Internal Server Error",
        })
    }
}

const updateUserName = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({
                error: 'User not found',
            });
        }

        const { userName } = req.body;

        if (!userName) {
            return res.status(400).json({
                error: 'userName is required',
            });
        }

        const result = await UserServices.updateUserName({ userId, userName });

        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error",
        });
    }
};

const uploadAvatar = async (req, res) => {
    try {
        const userId = req.userId;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: "Không có file được upload" });
        }

        const result = await UserServices.uploadAvatar({ userId, file });

        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({
            message: error.message || "Internal Server Error",
        });
    }
};


module.exports = {
    getAllOrderHistory,
    updateUserName,
    uploadAvatar
}