function ProductModel(sku, name, description, images, qty) {
    this.sku = sku || null;
    this.name = name || null;
    this.description = description || null;
    this.images = images || null;
    this.qty = qty || null;
}

export default ProductModel;