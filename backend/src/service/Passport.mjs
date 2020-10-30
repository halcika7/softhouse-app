import passport from 'passport';
import github from 'passport-github2';
import { Environment } from '../config/index.mjs';
import { UserRepository } from '../repository/User.mjs';
import { DataRepository } from '../repository/Data.mjs';
import { CookieService } from './Cookie.mjs';
import { JWTService } from './JWT.mjs';
import BaseService from './Base.mjs';

const { Strategy } = github;

const { url, social, img, environment } = Environment;

class Passport extends BaseService {
  constructor() {
    super(Passport);
  }

  socialCallback(req, res) {
    return passport.authenticate(
      'github',
      { session: false, failureRedirect: '/', successRedirect: '/' },
      (err, user) => this.passportCallback(err, user, res)
    )(req, res);
  }

  static async passportStrategy(profile, done) {
    try {
      const { login, id, avatar_url: Picture, email } = profile._json;

      if (!email) {
        return done('Email address is required');
      }

      const user = await UserRepository.findUserForSocial(email, id, login);

      if (!user) {
        const picture = Picture || img;
        const newUser = await UserRepository.createUser({
          email,
          picture,
          githubId: id,
          username: login,
          hasPassword: false,
        });

        DataRepository.createUserData(newUser._id);

        return done(undefined, newUser);
      }

      if (
        user.email !== email ||
        user.githubId !== id ||
        user.username !== login
      ) {
        user.username = login;
        user.githubId = id;
        user.email = email;
        await user.save();
      }

      return done(undefined, user);
    } catch (error) {
      return done(error.message, null);
    }
  }

  passportCallback(err, user, res) {
    if (err) return res.redirect(`${url}/login?err=${err}`);

    try {
      const { id } = user;

      const accessToken = JWTService.signToken({ id });
      CookieService.setRefreshToken(res, JWTService.signToken({ id }, true));

      return res.redirect(`${url}/login?token=${accessToken}`);
    } catch (error) {
      return res.redirect(`${url}/login?err=${error}`);
    }
  }
}

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
  const user = await UserRepository.findById(id);
  return done(null, user);
});

passport.use(
  new Strategy(
    {
      clientID: social.githubID,
      clientSecret: social.githubSecretID,
      callbackURL: social.githubCallBack,
    },
    (_, __, profile, done) => Passport.passportStrategy(profile, done)
  )
);

export const PassportService = new Passport();

export default passport;
