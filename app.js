const express = require('express');
const session = require('express-session');
const passport = require('./passport');
const mongoose = require('mongoose');
const app = express();
const User = require('./User.js');
const dbUrl = process.env.DB_URL;

app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



app.listen(3000, () => {
  console.log('Server avviato su http://localhost:3000');
});



// Connessione al database
mongoose.connect(dbUrl)
  .then(() => {
    console.log('Connessione al database riuscita!');

      app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      //console.log(req.user.displayName)

      const newUser = new User({
        username: req.user.displayName,
        email: req.user.emails[0].value,
        profile_image_url: req.user.photos[0].value,
      });

      console.log(newUser)

          newUser.save()
      .then((savedUser) => {
        console.log('Utente salvato con successo:', savedUser);
      })
      .catch((error) => {
        console.error('Errore durante il salvataggio dell\'utente:', error);
      });

      res.redirect('/');
    }
  );

  app.get('/', (req, res) => {
    res.send(req.isAuthenticated() ? 'Autenticato!' : 'Non autenticato!');
  });

  })
  .catch((err) => {
    console.error('Errore durante la connessione al database:', err);
  });

// Gli eventi di connessione possono essere gestiti come segue:
mongoose.connection.on('connected', () => {
  console.log('Connesso a MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Errore di connessione a MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnesso da MongoDB');
});

