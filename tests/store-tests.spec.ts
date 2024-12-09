import { test, expect } from "@playwright/test";


test.describe("API Tests Store - all API tests related to the 'Store' section of Petstore", () => {
  
    test(`GET inventory - get inventore by status`, async ({ request }) => {
        const getInventoryResponse = await request.get("store/inventory");
        
        // validate status code
        await expect(getInventoryResponse).toBeOK();
        
        // expected vs actual result
        const getInventoryResponseJSON = await getInventoryResponse.json();
        console.log(getInventoryResponseJSON);
    });

});