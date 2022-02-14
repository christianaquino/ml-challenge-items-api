import { response } from 'express';
import { searchItems } from '../models/items'

const itemList = async (req, res) => {
    const response = await searchItems(req.query.q);
    
    res.send(response)
};

const itemDetails = (req, res) => {
    res.send('Details not implemented yet')
};

export { itemList, itemDetails }