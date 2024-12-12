import { test, expect } from "@playwright/test";

import { TestDataPets, NewTestDataPets } from "../test-data/pets.json";


// TODO : create a random data generator in a helper function

test.describe("API Tests Pets - all API tests related to the 'Pets' section of Petstore", () => {
  
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
      for (const pet of getPetResponseJSON) { expect(pet).toHaveProperty("status", status); }
    });
  }
  
  for (const pet of TestDataPets) {
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

  for (const newPet of NewTestDataPets) {
    const originalName = TestDataPets[newPet.id - 1].name;
    const newName      = newPet.name;
    test(`PUT pet - update an existing pet with original name '${originalName}' to new name '${newName}'`, async ({ request }) => {
      const putPetResponse  = await request.put("pet", {
        data: {
          "id": newPet.id,
          "category": {
            "id"  : newPet.category.id,
            "name": newPet.category.name
          },
          "name"     : newPet.name,
          "photoUrls": newPet.photoUrls,
          "tags"     : newPet.tags,
          "status"   : newPet.status
        }
      });
    
      
      // validate status code
      await expect(putPetResponse).toBeOK();

      // expected vs actual result
      const putPetResponseJSON = await putPetResponse.json();
      const getPetResponse = await request.get(`pet/${newPet.id}`);
      const getPetResponseJSON  = await getPetResponse.json(); 
      await expect(getPetResponse).toBeOK();
      expect(getPetResponseJSON).toStrictEqual(putPetResponseJSON);
    });
  }
    
  test(`DELETE pet - delete an existing pet`, async ({ request }) => {
    const petId = TestDataPets.at(-1)?.id!; // delete last pet in the list
    const deletePetResponse = await request.delete(`pet/${petId}`);
    
    // validate status code
    await expect(deletePetResponse).toBeOK();
    
    // expected vs actual result
    const getPetResponse = await request.get(`pet/${petId}`);
    const getPetResponseJSON  = await getPetResponse.json(); 
    await expect(getPetResponse).not.toBeOK();
    expect(getPetResponseJSON).toHaveProperty("message", "Pet not found");
  }); 
});