const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipesController');

router.get('/', recipesController.getAllRecipes);
router.get('/tag/:tag', recipesController.getByTag);
router.get('/rating', recipesController.getByRating);
router.get('/cookingTime/:cookingTime', recipesController.getByCookingTime);
router.get('/search', recipesController.getByKeyword);
router.get('/latest', recipesController.getLatest);

router.post('/', recipesController.createRecipe);
router.delete('/:id', recipesController.deleteRecipe);
router.put('/:id', recipesController.updateRecipe);

module.exports = router;