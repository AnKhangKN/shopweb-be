const ProductRoutes = require("./admin/ProductRoutes");
const express = require("express");
const path = require("path");

const routes = (app) => {

    // admin
    app.use('/api/admin', ProductRoutes);
    app.use('/api/admin', ProductRoutes);

    // images
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
}

module.exports = routes;