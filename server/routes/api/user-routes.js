const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  login,
  saveProductToCart,
  removeProductFromCart,
} = require('../../controllers/user-controller');

// Import middleware
const { authMiddleware } = require('../../utils/auth');

// Routes for the clothing ecommerce app
router.route('/').post(createUser);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.post('/save-product', saveProductToCart);

router.delete('/remove-product/:productId', removeProductFromCart);

module.exports = router;
