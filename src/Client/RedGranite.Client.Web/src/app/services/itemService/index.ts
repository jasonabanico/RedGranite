import { apolloClient } from "../../graphql";
import { ITEMS } from "./queries";
import { Items } from "./__generated__/Items";

class ItemService {
  async getItems(page: Number, perPage = 5): Promise<Items> {
    try {
      const response = await apolloClient.query({
        query: ITEMS,
        variables: { page, perPage },
      });

      if (!response || !response.data)
        throw new Error("Cannot get items.");

      console.log("DATA: ", response.data);

      return response.data.Page;
    } catch (err) {
      throw err;
    }
  }
}

export default new ItemService();