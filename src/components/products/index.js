const CustomRouter = require('../../routes/router'); 
const productsController = require('./productsController/productsController');
const upload = require('../../utils/multer/multer');
const { validateProductId } = require('../../utils/routes/routerParams');

class ProductsRoutes extends CustomRouter {
  constructor() {
    super(); 
    this.setupRoutes();
  }

  setupRoutes() {
    // Middleware para manejar el parametro pid
    this.router.param('pid', validateProductId);

    const basePath = '/api/products'; 
    /* Sólo el ADMIN puede crear, actualizar y eliminar productos. */
    this.post(`${basePath}/`, ['ADMIN', 'PREMIUM'], upload.array('image', 5), productsController.addProduct);
    this.put(`${basePath}/:pid`, ['ADMIN', 'PREMIUM'], upload.array('image', 5), productsController.updateProduct);
    this.delete(`${basePath}/:pid`, ['ADMIN', 'PREMIUM'], productsController.deleteProduct);
    this.get(`${basePath}/`, ['ADMIN', 'PREMIUM'], productsController.getAllProducts);
    this.get(`${basePath}/:pid`, ['ADMIN'], productsController.getProductById);
  }
}

module.exports = new ProductsRoutes();
