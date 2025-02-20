import { apolloClient } from "../../graphql";
import { GET_ITEMS } from "./queries";
import { GetItems } from "./__generated__/GetItems";
import { ADD_ITEM } from "./mutations";
import { AddItem } from "./__generated__/AddItem";
import { UPDATE_ITEM } from "./mutations";
import { UpdateItem } from "./__generated__/UpdateItem";
import { ItemInput } from "../../../../__generated__/globalTypes";

class ItemService {
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