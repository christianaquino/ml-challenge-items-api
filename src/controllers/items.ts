import { response } from 'express';
import { searchItems } from '../models/items'

const itemList = async (req, res) => {
    const response = await searchItems('coso');
    
    res.send(response)
};

const itemDetails = (req, res) => {
    res.send('El detalle')
};

export { itemList, itemDetails }