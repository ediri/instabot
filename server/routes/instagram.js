module.exports = function (app, express) {

  var router = express.Router();

  router.get('/', ensureAuthenticated, function (req, res) {
    res.render('index', {title: req.user.username, user: req.user});
  });

  router.get('/account', ensureAuthenticated, function (req, res) {
    res.render('account', {user: req.user});
  });

  router.get('/', function (req, res) {
    res.render('index', {user: req.user});
  });


  app.use('/instagram', router);

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login')
  }
};
