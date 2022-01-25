const { Router } = require('express')
const meetController = require('../controllers/meetController');

const router = Router();

router.get('/',meetController.meet_home);
router.get('/create', meetController.meet_create_get);
router.post('/create',meetController.meet_create_post);
router.get('/:id',meetController.meet_update_get);
router.post('/:id',meetController.meet_update_post);
router.delete('/:id',meetController.meet_delete);

module.exports = router;