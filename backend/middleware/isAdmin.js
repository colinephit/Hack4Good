const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }
    next(); // Proceed if the user is an admin

    console.log("User in isAdmin middleware: ", req.user);
};

export default isAdmin;