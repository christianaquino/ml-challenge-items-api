import axios from 'axios'

export const search = async (searchText: string) => {
    return await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${searchText}`)
}
