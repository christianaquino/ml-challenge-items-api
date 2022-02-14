import axios from 'axios'

export const search = async (searchText: string) => {
    return await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${searchText}`)
}

export const details = async (id: string) => {
    const url = `https://api.mercadolibre.com/items/${id}`;
    
    return await axios.get(url)
}

export const description = async (id: string) => {
    const url = `https://api.mercadolibre.com/items/${id}/description`;
    
    return await axios.get(url)
}