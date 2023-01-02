module.exports = (dataObj) => {

    const categories = dataObj.reduce(
        function (values, item) {
            if (!values.includes(item.category)) {
                values.push(item.category);
            }
            return values;
        },
        ["all"] 
    );

    const categoryBtnsCard = categories
        .map(function (category) {
            // let output = buttons.replace(/{%buttonType%}/g, category);
            let output
            if (category === 'all')
                output = `<a href="/"><button type="button" class="filter-btn" data-id="all">${category}</button></a>`

            else
                output = `<a href="category?category=${category}"><button type="button" class="filter-btn" data-id="all">${category}</button></a>`;
            return output;
        })
        .join("");
    return categoryBtnsCard;
}
 