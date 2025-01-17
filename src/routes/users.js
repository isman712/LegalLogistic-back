import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({Nombre: 'LegalLogistic', version: '1.0.0'});
});

export default router;
