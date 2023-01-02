module.exports = (menuCard, product) => {
    //console.log(`Path:${path}`);
    let output = menuCard.replace(/{%title%}/g, product.title);
    output = output.replace(/{%image%}/g, product.img);
    output = output.replace(/{%id%}/g, product.id);
    output = output.replace(/{%price%}/g, product.price);
    output = output.replace(/{%desc%}/g, product.desc);
    return output;
}


