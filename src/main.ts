import './css/style.css'
import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './template/ListTemplate'

const initApp = (): void => {
  // get instances of the full list and list template
  const fullList = FullList.instance;
  const listTemplate = ListTemplate.instance;

  //access to the item Entry Form and add event listener to the form to add new items to the list
  const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement;

  itemEntryForm.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    // Access to the input item and get its value.
    const itemInput = document.getElementById("newItem") as HTMLInputElement;
    const newEnrtyText: string = itemInput.value.trim();

    // Check if the input item is not empty and add it to the list if it is not.
    if (newEnrtyText.length > 0) {
      // Generate a unique id for the new item by getting the last id from the list items array and incrementing it by 1. If the array is empty, start from 1.
      const itemId: number = fullList.listItems.length ? parseInt(fullList.listItems[fullList.listItems.length - 1].id) + 1 : 1;

      // Create a new list item with the generated id and the input item value.
      const newItem = new ListItem(itemId.toString(), newEnrtyText);

      // Add the new item to the list and render the list template.
      fullList.addItem(newItem);
      listTemplate.render(fullList);
    }

    // Access to the clear items button and add event listener to the button to clear the list and render the list template.
    const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement;

    clearItems.addEventListener("click", (): void => {
      fullList.clearList();
      listTemplate.clear();
    });
  })
  fullList.load();
  listTemplate.render(fullList);
}
document.addEventListener("DOMContentLoaded", initApp);