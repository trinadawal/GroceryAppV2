import axios from 'axios';

const ITEM_API_BASE_URL = "http://localhost:9091/ecz/api/items";

class ItemService {

    getItems() {
        return axios.get(ITEM_API_BASE_URL);
    }

    addItems(item) {
        return axios.post(ITEM_API_BASE_URL, item);
    }

    getItemsByName(itemName) {
        return axios.get(ITEM_API_BASE_URL + '/' + itemName);
    }

    updateItem(item, itemName) {
        return axios.put(ITEM_API_BASE_URL + '/' + itemName, item);
    }

    deleteItem(itemName) {
        return axios.delete(ITEM_API_BASE_URL + '/' + itemName);
    }
}

export default new ItemService()