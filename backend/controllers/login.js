const authService = require("../services/login");

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const { token, userRole } = await authService.login(email, password);

        // Determine redirect URL based on user role
        let redirectUrl;
        switch (userRole) {
            case 'admin':
                redirectUrl = '/admindashboard';
                break;
            case 'admin2':
                redirectUrl = '/Maintainingdashboard'; // Updated URL
                break;
            case 'admin3':
                redirectUrl = '/SuperviseDashboard';
                break;
            case 'admin4':
                redirectUrl = '/admin4dashboard';
                break;
            case 'admin5':
                redirectUrl = '/admin5dashboard';
                break;
            case 'admin6':
                redirectUrl = '/admin6dashboard';
                break;
            case 'admin7':
                redirectUrl = '/admin7dashboard';
                break;
            case 'admin8':
                redirectUrl = '/admin8dashboard';
                break;
            default:
                redirectUrl = '/home';
        }

        res.json({ token, userRole, redirectUrl });

    } catch (error) {
        res.status(401).json({ message: "Invalid credentials" });
    }
}

module.exports = {
    login
};
