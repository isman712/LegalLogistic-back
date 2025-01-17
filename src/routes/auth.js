import express from "express";
import passport from "../util/auth.js";
import authVerify from "../util/midewall.js";


const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect(process.env.FRONT_URL);
  }
);

router.get("/logout", (req, res) => {
    res.clearCookie("session"); 
    req.logout((err) => {
      if (err) return res.status(500).json({ message: "Error al cerrar sesión" });
      res.status(200).json({ message: "Sesión cerrada exitosamente" });
    });
  });

router.get("/profile", authVerify, (req, res) => {
  res.json(req.user);
});

export default router;
