const authService = require("../services/login");

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const { token, userRole } = await authService.login(email, password);

        let redirectUrl = userRole === 'admin' ? '/admindashboard' : '/home';
        res.json({ token, userRole, redirectUrl }); 

    } catch (error) {
        res.status(401).json({ message: "Invalid credentials" });
    }
}

module.exports = {
    login
};
