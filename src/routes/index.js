import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({Nombre: 'LegalLogistic', version: '1.0.0'});
});


router.get('/api/auth/callback', async (req, res) => {
  if (req.session.user) {
    res.redirect('/dashboard'); 
  } else {
    res.redirect('/login'); 
  }
});


export default router;
