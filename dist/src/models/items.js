"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemDetails = exports.searchItems = void 0;
const services_1 = require("../services");
const searchItems = (searchText) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const response = yield (0, services_1.search)(searchText);
    const { results, available_filters, filters } = response.data;
    const categoriesCount = (_a = available_filters.filter(f => f.id === 'category')[0]) === null || _a === void 0 ? void 0 : _a.values;
    let categories = [];
    if (categoriesCount) {
        categories = (_c = (_b = categoriesCount.sort((a, b) => {
            if (a.results < b.results) {
                return 1;
            }
            if (a.results > b.results) {
                return -1;
            }
            return 0;
        })) === null || _b === void 0 ? void 0 : _b.map(cat => cat.name)) === null || _c === void 0 ? void 0 : _c.slice(0, 5);
    }
    else {
        categories = filters.filter(f => f.id === 'category')[0].values[0].path_from_root.map(f => f.name);
    }
    const items = results.map(({ id, title, prices, attributes, thumbnail, shipping: { free_shipping }, category_id }) => {
        var _a;
        const { currency_id, amount } = prices.prices[0];
        const price = {
            currency: currency_id,
            amount,
            decimals: 0
        };
        const condition = attributes.filter(attr => attr.id === "ITEM_CONDITION");
        return {
            id,
            title,
            price,
            picture: thumbnail,
            condition: (_a = condition[0]) === null || _a === void 0 ? void 0 : _a.value_name,
            free_shipping,
        };
    });
    const author = {
        name: 'Christian',
        lastname: 'Aquino'
    };
    return {
        author,
        categories,
        items
    };
});
exports.searchItems = searchItems;
const getItemDetails = (id) => {
    return (0, services_1.search)('test');
};
exports.getItemDetails = getItemDetails;
