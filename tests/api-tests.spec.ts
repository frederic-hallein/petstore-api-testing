import { test, expect } from "@playwright/test";

import { TestDataPets } from "../test-data/pets.json";

test.describe("API Pet Tests - all API tests related to the 'Pets' section of Petstore", () => {
  for (const [_, pet] of Object.entries(TestDataPets)) {
    test(`POST pet with name ${pet.name}`, async ({ request }) => {
      const postPetResponse = await request.post("pet", {
        data: {
          "id": pet.id,
          "category": {
            "id"  : pet.category.id,
            "name": pet.category.name
          },
          "name"     : pet.name,
          "photoUrls": pet.photoUrls,
          "tags"     : pet.tags,
          "status"   : pet.status
        }
      });
      const postPetResponseJSON = await postPetResponse.json(); 
      await expect(postPetResponse).toBeOK();
    });
    
  }
});