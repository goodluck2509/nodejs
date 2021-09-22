const Handlebars = require("handlebars");

module.exports = {
  sum: (a, b) => a + b, // Custom funcion ở đây chứ thằng handlebar nó ko cho code trong html
  sortable: (field, sort) => {
    const sortType = field === sort.column ? sort.type : "default";

    const icons = {
      default: "oi oi-elevator",
      asc: "oi oi-sort-ascending",
      desc: "oi oi-sort-descending",
    };
    const types = {
      default: "desc",
      asc: "desc",
      desc: "asc",
    };
    const icon = icons[sortType];
    const type = types[sortType];

    const address = Handlebars.escapeExpression(
      `?_sort&column=${field}&type=${type}`
    );

    const result = `<a href="${address}"><span class="${icon}"></span></a>`;
    return new Handlebars.SafeString(result);
  },
};
