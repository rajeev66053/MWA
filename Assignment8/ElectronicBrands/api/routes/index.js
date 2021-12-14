const express=require("express");
const router=express.Router();
const controllerBrands=require("../controllers/electronicbrands.controller");
const controllerOffices=require("../controllers/offices.controller");
const controllerProducts=require("../controllers/products.controler");
const { get } = require("mongoose");

router.route("/brands")
.get(controllerBrands.getAllBrands)
.post(controllerBrands.addOneBrand);

router.route("/brands/:brandId")
.get(controllerBrands.getOneBrand)
.put(controllerBrands.fullUpdateOneBrand)
.patch(controllerBrands.partialUpdateOneBrand)
.delete(controllerBrands.deleteOneBrand);

router.route("/brands/:brandId/offices")
.get(controllerOffices.getAllOffices)
.post(controllerOffices.addOneOffice);

router.route("/brands/:brandId/offices/:officeId")
.get(controllerOffices.getOneOffice)
.put(controllerOffices.fullUpdateOneOffice)
.patch(controllerOffices.partialUpdateOneOffice)
.delete(controllerOffices.deleteOneOffice);

router.route("/brands/:brandId/products")
.get(controllerProducts.getAllProducts)
.post(controllerProducts.addOneProduct);


router.route("/brands/:brandId/products/:productId")
.get(controllerProducts.getOneProduct)
.put(controllerProducts.fullUpdateOneProduct)
.patch(controllerProducts.partialUpdateOneProduct)
.delete(controllerProducts.deleteOneProduct);

module.exports={
    router:router
}