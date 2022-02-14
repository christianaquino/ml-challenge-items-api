import { response } from 'express';
import { searchItems,getItemDetails } from '../models/items'

const itemList = async (req, res) => {
    const response = await searchItems(req.query.q);
    
    res.send(response)
};

const itemDetails = async (req, res) => {
    const response = await getItemDetails(req.params.id)
    
    res.send(response)
};

export { itemList, itemDetails }