import passport from "passport";
import { API_URL } from "../const";
import { joinWithGoogle } from "../services/auth";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env["CLIENT_ID"]}`,
      clientSecret: `${process.env["CLIENT_SECRET"]}`,
      callbackURL: `${API_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await joinWithGoogle(profile);
        done(null, user);
      } catch (error) {
        done(error, undefined);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user as false);
});
