import { search } from '../services'

export const searchItems = async (searchText: string) => {
    const laresponse = await search(searchText);

    return laresponse.data
}

export const getItemDetails = (id: Number) => {
    return search('test')
}
