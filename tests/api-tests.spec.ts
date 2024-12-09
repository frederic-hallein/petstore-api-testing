import { test, expect } from "@playwright/test";

import { TestDataPets } from "../test-data/pets.json";

test.describe("API Pet Tests - all API tests related to the 'Pets' section of Petstore", () => {
  
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


  test(`PUT pet - update an existing pet`, async ({ request }) => {
    const newId           = TestDataPets.length + 1; 
    const newCategoryId   = 3;
    const newCategoryName = "Maine Coon";
    const newName         = "Trixie";
    const newphotoUrls    = ["https://www.google.com/search?sca_esv=8ecf68fec1b05011&sxsrf=ADLYWIJHwqqOQYixmwgKgOAZaD4w7xH5xQ:1733739429192&q=Maine+Coon&udm=2&fbs=AEQNm0Aa4sjWe7Rqy32pFwRj0UkWd8nbOJfsBGGB5IQQO6L3JyJJclJuzBPl12qJyPx7ESJehObpS5jg6J88CCM-RK72sNV8xvbUxy-SoOtM-WmPLIjZzuRzEJJ0u2V8OeDS2QzrFq0l6uL0u5ydk68vXkBqxln9Kbinx1HZnJEg4P6VfVQ98eE&sa=X&ved=2ahUKEwi4pb3WupqKAxVlcaQEHef4K2wQtKgLegQIFRAB&biw=3072&bih=1581&dpr=1.25#vhid=eDaZbHHMToLfFM&vssid=mosaic", 
                             "https://www.google.com/search?sca_esv=8ecf68fec1b05011&sxsrf=ADLYWIJHwqqOQYixmwgKgOAZaD4w7xH5xQ:1733739429192&q=Maine+Coon&udm=2&fbs=AEQNm0Aa4sjWe7Rqy32pFwRj0UkWd8nbOJfsBGGB5IQQO6L3JyJJclJuzBPl12qJyPx7ESJehObpS5jg6J88CCM-RK72sNV8xvbUxy-SoOtM-WmPLIjZzuRzEJJ0u2V8OeDS2QzrFq0l6uL0u5ydk68vXkBqxln9Kbinx1HZnJEg4P6VfVQ98eE&sa=X&ved=2ahUKEwi4pb3WupqKAxVlcaQEHef4K2wQtKgLegQIFRAB&biw=3072&bih=1581&dpr=1.25#vhid=RC_k1P2GW_UHiM&vssid=mosaic"
    ];
    const newTags         = [];
    const newStatus       = "pending";
    const putPetResponse  = await request.put("pet", {
      data: {
        "id": newId,
        "category": {
          "id"  : newCategoryId,
          "name": newCategoryName
        },
        "name"     : newName,
        "photoUrls": newphotoUrls,
        "tags"     : newTags,
        "status"   : newStatus
      }
    });
    
    // validate status code
    await expect(putPetResponse).toBeOK();

    // expected vs actual result
    const putPetResponseJSON = await putPetResponse.json();
    const getPetResponse = await request.get(`pet/${newId}`);
    const getPetResponseJSON  = await getPetResponse.json(); 
    await expect(getPetResponse).toBeOK();
    expect(getPetResponseJSON).toStrictEqual(putPetResponseJSON);
  });
    
  test(`DELETE pet - delete an existing pet`, async ({ request }) => {
    const petId = TestDataPets.at(-1)?.id!; 
    const deletePetResponse = await request.delete(`pet/${petId}`, {
      params: {
        petId: petId
      }
    });
    
    // validate status code
    await expect(deletePetResponse).toBeOK();
    
    // expected vs actual result
    const getPetResponse = await request.get(`pet/${petId}`);
    const getPetResponseJSON  = await getPetResponse.json(); 
    await expect(getPetResponse).not.toBeOK();
    expect(getPetResponseJSON).toHaveProperty("message", "Pet not found");
  }); 
});