function ProductModel(sku, name, description, images, qty) {
    this.sku = sku || null;
    this.name = name || null;
    this.description = description || null;
    this.images = images || null;
    this.qty = qty || null;
}

ProductModel.prototype.getSku = function () {
    return this.sku;
}

ProductModel.prototype.setSku = function (sku) {
    this.sku = sku;
}

ProductModel.prototype.getName = function () {
    return this.name;
}

ProductModel.prototype.setName = function (name) {
    this.name = name;
}

ProductModel.prototype.getDescription = function () {
    return this.description;
}

ProductModel.prototype.setDescription = function (description) {
    this.description = description;
}

ProductModel.prototype.getImages = function () {
    return this.images;
}

ProductModel.prototype.setImages = function (images) {
    this.images = images;
}

ProductModel.prototype.getQty = function () {
    return this.qty;
}

ProductModel.prototype.setQty = function (qty) {
    this.qty = qty;
}

export default ProductModel;