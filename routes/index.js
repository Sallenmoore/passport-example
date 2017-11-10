var express = require('express');
var passport = require('passport');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    //console.log(req.session);
    res.render('index', { title: 'Log in' });
});
router.get('/loggedin', function(req, res, next) {
    //console.log(req.user);
    res.render('index', { title: 'You are logged in' });
});
// router.post('/login', function(req, res, next){
//     req.session.user = "it worked"
//     res.redirect('/loggedin');
// });
router.post('/login', passport.authenticate('local', {
                    successRedirect: '/loggedin',
                    failureRedirect: '/'
                })
);
module.exports = router;
