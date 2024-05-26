import { apolloClient } from "../../graphql";
import { GET_ITEMS } from "./queries";
import { GetItems } from "./__generated__/GetItems";

class ItemService {
  async getItems(page: Number, perPage = 5): Promise<GetAnimePage["Page"]> {
    try {
      const response = await apolloClient.query({
        query: GET_ITEMS,
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