import { search, details, description } from '../services';

const author = {
  name: 'Christian',
  lastname: 'Aquino',
};
const filterCategoryId = (filter) => filter.id === 'category';
const mapName = (category) => category.name;
const sortFilterCounts = (a, b) => {
  if (a.results < b.results) {
    return 1;
  }
  if (a.results > b.results) {
    return -1;
  }

  return 0;
};
const getItemCondition = (attributes) => attributes.filter((attr) => attr.id === 'ITEM_CONDITION')[0]?.value_name;

export const searchItems = async (searchText: string) => {
  const response = await search(searchText);

  const { results, available_filters, filters } = response.data;
  const categoriesCount = available_filters.filter(filterCategoryId)[0]?.values;
  let categories = [];

  if (categoriesCount) {
    categories = categoriesCount.sort(sortFilterCounts)?.map(mapName)?.slice(0, 5);
  } else {
    categories = filters.filter(filterCategoryId)[0].values[0].path_from_root.map(mapName);
  }

  const items = results.map(
    ({
      id, title, prices, attributes, thumbnail, shipping: { free_shipping },
    }) => {
      const { currency_id, amount } = prices.prices[0];
      const price = {
        currency: currency_id,
        amount,
        decimals: 0,
      };

      const condition = getItemCondition(attributes);

      return {
        id, title, price, picture: thumbnail, condition, free_shipping,
      };
    },
  );

  return {
    author,
    categories,
    items,
  };
};

export const getItemDetails = async (itemId: string) => {
  const detailsResponse = await details(itemId);
  const descriptonResponse = await description(itemId);

  const {
    id, title, currency_id, price, pictures, attributes, shipping: { free_shipping }, sold_quantity,
  } = detailsResponse.data;
  const { plain_text } = descriptonResponse.data;

  const condition = getItemCondition(attributes);

  const item = {
    id,
    title,
    price: {
      currency: currency_id,
      amount: price,
      decimals: 0,
    },
    picture: pictures[0].url,
    condition,
    free_shipping,
    sold_quantity,
    description: plain_text,
  };

  return { author, item };
};
