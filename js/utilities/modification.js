export function modifyProductData(product) {
    delete product.otherName;
    delete product.info;
    delete product.type;
    delete product.ingredients;
    return product;
}