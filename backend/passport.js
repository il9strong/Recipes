const passport = require("passport");
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const User = require("./models/Users");

passport.use(
    'jwt',
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '123',
    },
    function (jwtPayload, done) {
      return User.findOne({ where: { id: jwtPayload.id } })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);