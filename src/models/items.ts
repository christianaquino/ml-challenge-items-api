import { search } from '../services'

export const searchItems = async (searchText: string) => {
    const response = await search(searchText);

    const { results, available_filters, filters } = response.data;
    const categoriesCount =  available_filters.filter( f => f.id === 'category')[0]?.values;
    let categories = [];

    if (categoriesCount) {
        categories = categoriesCount.sort((a, b) => {
            if (a.results < b.results) {
                return 1;
            }
            if (a.results > b.results) {
                return -1;
            }
            
            return 0;
     
        })?.map( cat  => cat.name )?.slice(0, 5);
    } else {   
        categories = filters.filter( f => f.id === 'category' )[0].values[0].path_from_root.map( f => f.name);
    }
    
    const items = results.map(
        ( { id, title, prices, attributes, thumbnail, shipping: { free_shipping }, category_id } ) => {
        const { currency_id, amount } = prices.prices[0]
        const price = {
            currency: currency_id,
            amount,
            decimals: 0
        }

        const condition = attributes.filter( attr => attr.id === "ITEM_CONDITION"  );

        return {
            id, 
            title, 
            price, 
            picture: thumbnail, 
            condition: condition[0]?.value_name, 
            free_shipping,
        }
    });

    const author = {
        name: 'Christian',
        lastname: 'Aquino'
    };
    
    return {
        author, 
        categories, 
        items
    }
}

export const getItemDetails = (id: Number) => {
    return search('test')
}
