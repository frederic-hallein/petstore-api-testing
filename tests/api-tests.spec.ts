import { test, expect } from "@playwright/test";

import { TestDataPets } from "../test-data/pets.json";

test.describe("API Pet Tests - all API tests related to the 'Pets' section of Petstore", () => {
  test.describe("All GET tests", () => {
    const statuses: string[] = ["available", "pending", "sold"];
    for (const status of statuses) {
      test(`GET pet - get all pets with status '${status}'`, async ({ request }) => {
        const getPetResponse = await request.get("pet/findByStatus", {
          params: {
            "status": status
          }
        });
        
        // validate status code
        await expect(getPetResponse).toBeOK();
        
        // expected vs actual result
        const getPetResponseJSON = await getPetResponse.json();
        for (const pet of getPetResponseJSON) { expect(pet.status).toStrictEqual(status); }
      });
    }
  });

  test.describe("All POST tests", () => {  
    for (const [_, pet] of Object.entries(TestDataPets)) {
      test(`POST pet - add a new pet with name '${pet.name}' to the store`, async ({ request }) => {
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
        
        // validate status code
        await expect(postPetResponse).toBeOK();
        
        // expected vs actual result
        const postPetResponseJSON = await postPetResponse.json();
        const getPetResponse = await request.get(`pet/${postPetResponseJSON.id}`);
        const getPetResponseJSON  = await getPetResponse.json(); 
        await expect(getPetResponse).toBeOK();
        expect(getPetResponseJSON).toStrictEqual(postPetResponseJSON);
      });
      
    }
  });

  test.describe("All PUT tests", () => {  
    test(`PUT pet - update an existing pet`, async ({ request }) => {
      // const putPetResponse = await request.put("pet", {
      //   data: {

      //   }
      // });
      
      // validate status code

      
      // expected vs actual result

    });
      
    
  });
});