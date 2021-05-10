import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import User from '../models/User';

const { env } = process;

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.JWT_KEY || 'JoinUsKey',
    },
    (payload, done) => {
      User.findById({ _id: payload.sub }, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        else return done(null, false);
      });
    }
  )
);

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      user.comparePassword(password, done);
    });
  })
);