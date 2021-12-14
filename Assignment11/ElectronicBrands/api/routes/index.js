const express=require("express");
const router=express.Router();
const controllerBrands=require("../controllers/electronicbrands.controller");
const controllerOffices=require("../controllers/offices.controller");
const controllerProducts=require("../controllers/products.controler");
const controllerUsers=require("../controllers/users.controller");


router.route("/users")
    .post(controllerUsers.usersRegister);


router.route("/auth")
    .post(controllerUsers.usersAuthenticate);

router.route("/brands")
.get(controllerBrands.getAllBrands)
// .post(controllerUsers.authenticate,controllerBrands.addOneBrand);
.post(controllerBrands.addOneBrand);

router.route("/brands/:brandId")
.get(controllerBrands.getOneBrand)
// .put(controllerUsers.authenticate,controllerBrands.fullUpdateOneBrand)
// .patch(controllerUsers.authenticate,controllerBrands.partialUpdateOneBrand)
// .delete(controllerUsers.authenticate,controllerBrands.deleteOneBrand);
.put(controllerBrands.fullUpdateOneBrand)
.patch(controllerBrands.partialUpdateOneBrand)
.delete(controllerBrands.deleteOneBrand);

router.route("/brands/:brandId/offices")
.get(controllerOffices.getAllOffices)
.post(controllerUsers.authenticate,controllerOffices.addOneOffice);

router.route("/brands/:brandId/offices/:officeId")
.get(controllerOffices.getOneOffice)
.put(controllerUsers.authenticate,controllerOffices.fullUpdateOneOffice)
.patch(controllerUsers.authenticate,controllerOffices.partialUpdateOneOffice)
.delete(controllerUsers.authenticate,controllerOffices.deleteOneOffice);

router.route("/brands/:brandId/products")
.get(controllerProducts.getAllProducts)
.post(controllerUsers.authenticate,controllerProducts.addOneProduct);


router.route("/brands/:brandId/products/:productId")
.get(controllerProducts.getOneProduct)
.put(controllerUsers.authenticate,controllerProducts.fullUpdateOneProduct)
.patch(controllerUsers.authenticate,controllerProducts.partialUpdateOneProduct)
.delete(controllerUsers.authenticate,controllerProducts.deleteOneProduct);

module.exports={
    router:router
}