import passport from "passport";
import { API_URL } from "../../../shared/const";
import { AuthService } from "../../application/AuthService";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { MongoUserRepository } from "../../../user/infrastructure/databases/MongoUserRepository";

const userRepository = new MongoUserRepository();
const authService = new AuthService(userRepository);

passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env["CLIENT_ID"]}`,
      clientSecret: `${process.env["CLIENT_SECRET"]}`,
      callbackURL: `${API_URL}/auth/google/callback`,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const user = await authService.handleGoogleAuth(profile);
        done(null, user);
      } catch (error) {
        done(error, undefined);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user as false);
});
