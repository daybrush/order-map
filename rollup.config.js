
const builder = require("@daybrush/builder");

module.exports = builder([
    {
        name: "OrderMap",
        input: "src/OrderMap.ts",
        output: "./dist/order-map.js",
        resolve: true,
    },
    {
        name: "OrderMap",
        input: "src/OrderMap.ts",
        output: "./dist/order-map.min.js",
        resolve: true,
        uglify: true,

    },
    {
        input: "src/OrderMap.ts",
        output: "./dist/order-map.esm.js",
        exports: "named",
        format: "es",
    },
    {
        input: "src/index.cjs.ts",
        output: "./dist/order-map.cjs.js",
        exports: "named",
        format: "cjs",
    },
]);
