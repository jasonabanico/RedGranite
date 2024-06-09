import { apolloClient } from "../../graphql";
import { GET_ITEMS } from "./queries";
import { GetItems } from "./__generated__/GetItems";
import { ADD_ITEM } from "./mutations";
import { AddItem } from "./__generated__/AddItem";
import { ItemInput } from "../../../../__generated__/globalTypes";

class ItemService {
  async getItems(page: Number, perPage = 5): Promise<GetItems> {
    try {
      const response = await apolloClient.query({
        query: GET_ITEMS,
        variables: { page, perPage },
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
        throw new Error("Cannot get items.");

      return response.data;
    } catch (err) {
      throw err;
    }
  }
}

export default new ItemService();