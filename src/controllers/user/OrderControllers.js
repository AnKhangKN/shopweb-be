const OrderServices = require("../../services/user/OrderServices");

const createOrder = async (req, res) => {
    try {

        const userId = req.userId;
        const {shippingAddress, items, orderNote, totalPrice, shippingPrice, paymentMethod} = req.body;

        const result = await OrderServices.createOrder({
            userId,
            shippingAddress, items, orderNote, totalPrice, shippingPrice, paymentMethod
        });
        return res.status(200).json(result);

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

const getShippingAddress = async (req, res) => {
    try {
        const userId = req.userId;

        const result = await OrderServices.getShippingAddress({userId})
        return res.status(200).json(result);

    } catch (error) {
        return res.status(400).json({
            error: error.message|| "Internal Server Error"
        })
    }
}

const addShippingAddress = async (req, res) => {
    try {
        const userId = req.userId;

        const { phone, address, city } = req.body;
        
        console.log(req.body);
        
        const result = await OrderServices.addShippingAddress({userId, phone, address, city});

        return res.status(200).json(result);

    } catch (error) {
        return res.status(400).json({
            error: error.message|| "Internal Server Error"
        })
    }
}

const deleteShippingAddress = async (req, res) => {
    try {

        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({
                error: "User ID is required"
            })
        }

        const { phone, address, city } = req.body;

        const result = await OrderServices.deleteShippingAddress({userId, phone, address, city});
        return res.status(200).json(result);

    } catch (error) {
        return res.status(400).json({
            error: error.message|| "Internal Server Error"
        })
    }
}

module.exports = {
    createOrder,
    getShippingAddress,
    addShippingAddress,
    deleteShippingAddress
}