module.exports = (menuCard, product) => {
    let output = menuCard.replace(/{%image%}/g, product.img);
    output = output.replace(/{%Category}/g, product.category)
    output = output.replace(/{%title%}/g, product.title);
    output = output.replace(/{%price%}/g, product.price);
    output = output.replace(/{%desc%}/g, product.desc);
    return output;
}
