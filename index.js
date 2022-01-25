const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRouter');
const meetRoutes = require('./routes/meetRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

const dbURI = 'mongodb://test-user:test-password@nimblenotes-shard-00-00.mihom.mongodb.net:27017,nimblenotes-shard-00-01.mihom.mongodb.net:27017,nimblenotes-shard-00-02.mihom.mongodb.net:27017/meetDb?ssl=true&replicaSet=atlas-12r9m5-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(process.env.PORT || 3000);
        console.log('server started')
    })
    .catch(err => console.log(err));

app.set('view engine','ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});
app.use(express.json());
app.use(cookieParser());


app.get('*', checkUser);
app.use(authRoutes);
app.use('/',requireAuth,meetRoutes);
app.use((req,res) => {res.status(404).render('404', { title: '404' });} )