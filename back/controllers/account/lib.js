const User = require("../../schema/schemaUser.js");
const passwordHash = require("password-hash");

async function signup(req, res) {
    const { password, email } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            text: "Invalid request"
        });
    }
    const user = {
        email,
        password: passwordHash.generate(password)
    };
    try {
        const findUser = await User.findOne({
            email
        });
        if (findUser) {
            return res.status(400).json({
                text: "User already exists"
            });
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
    try {
        const userData = new User(user);
        const userObject = await userData.save();
        return res.status(200).json({
            text: "Success",
            token: userObject.getToken()
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

async function login(req, res) {
    const { password, email } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            text: "Invalid request"
        });
    }
    try {
        const findUser = await User.findOne({ email });
        if (!findUser)
            return res.status(401).json({
                text: "User doesn't exist"
            });
        if (!findUser.authenticate(password))
            return res.status(401).json({
                text: "Incorrect password"
            });
        return res.status(200).json({
            token: findUser.getToken(),
            text: email
        });
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
}

async function saveDashboard(req, res) {
//    console.log("req body = ", req.body);
    const {dashboard} = req.body.dashboard;
    User.findOne({email: req.body.email}, function (err, usr) {
//        console.log("user ", usr);
        if (err) {
            console.log("error", err);
            res.send("error ", err);
        }
        if (usr && dashboard) {
 //           console.log("usr && dashboard");
            usr.dashboard.push(dashboard);
            usr.save(function (err) {
                if (err) {
                    console.log("error ", err);
                    res.send(err);
                }
//                console.log("Dashboard saved !");
                res.status(200).json({text: "Successfully saved dashboard!"})
            });
        }
//        console.log("no if");
    })
}

async function getDashboard(req, res) {
    User.findOne({email: req.body.email}, function (err, usr) {
        if (err) {
            res.send(err);
        }
        if (usr) {
            return res.status(200).json({
                text: usr.dashboard
            })
        }
    })
}

exports.login = login;
exports.signup = signup;
exports.saveDashboard = saveDashboard;
exports.getDashboard = getDashboard;