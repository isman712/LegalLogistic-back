const authVerify = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ message: "No autenticado" });
  }
};

export default authVerify;
