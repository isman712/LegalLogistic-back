import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from "../database/models/User.js";
import { elogs } from "lyria-logs";

dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.AUTH_GOOGLE_ID,
  clientSecret: process.env.AUTH_GOOGLE_SECRET,
  callbackURL: process.env.URL + '/api/auth/google/callback', 
  scope: ['profile', 'email']
},
async function(accessToken, refreshToken, profile, done) {
  try {
    const userImage = profile.photos[0]?.value || 
      "https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png";
    
    const [dbUser, created] = await User.findOrCreate({
      where: { email: profile.emails[0].value },
      defaults: {
        name: profile.displayName,
        image: userImage,
        role: "cliente",
      },
    });

    elogs.info(created ? "Nuevo usuario registrado." : "Usuario existente.");

    return done(null, dbUser);
  } catch (error) {
    return done(error, null);
  }
}));

passport.serializeUser(function(user, done) {
  done(null, user.id); 
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findByPk(id);  
    done(null, user);  
  } catch (error) {
    done(error, null);
  }
});

export default passport;
