const User = require('../models/user')

module.exports = {
    isvalid: async (req, res, next) => {

        const token = req.get('Authorization')
        if (!token) {
            return res.json({
                msg: "No token found",
                token: `Your token: ${token}`,
                logout: true
            })
        }
        try {
            if (token) {
                // jwt.verify(token.split(' ')[1], process.env.JWTKEY, (err, decode) => {
                //     if (err) {
                //         return res.json({
                //             success: 0,
                //             msg: "Invalid token found"
                //         })
                //     } else {
                //         req.decode = decode
                //         next()
                //     }
                // })

                User.findOne({ password: token.split(' ')[1], role: 'admin' })
                    .then((user) => {
                        if (!user) {
                            return res.json({
                                success: 0,
                                msg: "Invalid token found",
                                token: token,
                                logout: true
                            })
                        }
                        else {
                            next()
                        }
                    })
            } else {
                return res.json({
                    success: 0,
                    msg: "Access denies! Invalid token found.",
                    logout: true
                })
            }
        } catch (err) {
            console.log(err)
        }
    },

}
