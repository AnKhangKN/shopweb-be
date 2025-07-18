const ProductRoutesAdmin = require("./admin/ProductRoutes");
const ProductRoutesShared = require("./shared/ProductRoutes");
const UserRoutes = require("./auth/UserRoutes");
const express = require("express");
const path = require("path");
const ImageRoutes = require("./shared/ImageRoutes");

const routes = (app) => {
  // admin
  app.use("/api/admin", ProductRoutesAdmin);

  // images
  app.use(
    "/uploads/productImage",
    express.static(path.join(__dirname, "uploads"))
  );
  app.use("/api/productImage", ImageRoutes);

  // Shared
  app.use("/api/shared", ProductRoutesShared);

  // auth user
  app.use("/api/user", UserRoutes);
};

module.exports = routes;
