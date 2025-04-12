import { apolloClient } from "../../graphql";
import { GET_ITEM, GET_ITEMS } from "./queries";
import { GetItem } from "./__generated__/GetItem";
import { GetItems } from "./__generated__/GetItems";
import { ADD_ITEM, UPDATE_ITEM } from "./mutations";
import { AddItem } from "./__generated__/AddItem";
import { UpdateItem } from "./__generated__/UpdateItem";
import { ItemInput } from "../../../__generated__/globalTypes";

class ItemService {
  async getItem(id: String | undefined): Promise<GetItem> {
    try {
      const response = await apolloClient.query({
        query: GET_ITEM,
        variables: { id },
      });

      if (!response || !response.data)
        throw new Error("Cannot get item.");

      return response.data;
    } catch (err) {
      throw err;
    }
  }
   
  async getItems(isoDateString: String, count = 20): Promise<GetItems> {
    try {
      const response = await apolloClient.query({
        query: GET_ITEMS,
        variables: { isoDateString, count },
      });

      if (!response || !response.data)
        throw new Error("Cannot get items.");

      return response.data.GetItems;
    } catch (err) {
      throw err;
    }
  }
  
  async addItem(item: ItemInput): Promise<AddItem> {
    try {
      const response = await apolloClient.mutate({
        mutation: ADD_ITEM,
        variables: { item },
      });

      if (!response || !response.data)
        throw new Error("Cannot add item.");

      return response.data;
    } catch (err) {
      throw err;
    }
  }

  async updateItem(item: ItemInput): Promise<UpdateItem> {
    try {
      const response = await apolloClient.mutate({
        mutation: UPDATE_ITEM,
        variables: { item },
      });

      if (!response || !response.data)
        throw new Error("Cannot update item.");

      return response.data;
    } catch (err) {
      throw err;
    }
  }  
}

export default new ItemService();