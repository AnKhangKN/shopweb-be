const ProductRoutesAdmin = require("./admin/ProductRoutes");
const ProductRoutesShared = require("./shared/ProductRoutes");
const UserRoutes = require("./auth/UserRoutes");
const express = require("express");
const path = require("path");
const ImageRoutes = require("./shared/ImageRoutes");
const CartRoutesUser = require("./user/CartRoutes")
const OrderRoutesUser = require("./user/OrderRoutes");
const UserRoutesUser = require("./user/UserRoutes");
const WishRoutesUser = require("./user/WishRoutes");
const AuthRoutesUser = require('./user/AuthRoutes')

const routes = (app) => {
  // admin
  app.use("/api/admin", ProductRoutesAdmin);

  // images
  // app.use(
  //   "/uploads/productImage",
  //   express.static(path.join(__dirname, "uploads"))
  // );
  app.use("/api/image", ImageRoutes);

  // Shared
  app.use("/api/shared", ProductRoutesShared);

  // auth user
  app.use("/api/user", UserRoutes);

  // User routes
  app.use("/api/user", CartRoutesUser)

  app.use("/api/user", OrderRoutesUser);

  app.use("/api/user", UserRoutesUser);

  app.use("/api/user", WishRoutesUser);

  app.use("/api/user", AuthRoutesUser);
};

module.exports = routes;
