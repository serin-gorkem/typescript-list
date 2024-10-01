import './css/style.css'
import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './template/ListTemplate'


const initApp = (): void => {
  const fullList = FullList.instance;
  const listTemplate = ListTemplate.instance;

  const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement;

  itemEntryForm.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    const itemInput = document.getElementById("newItem") as HTMLInputElement;
    const newEnrtyText: string = itemInput.value.trim();

    if (newEnrtyText.length > 0) {
      const itemId: number = fullList.listItems.length ? parseInt(fullList.listItems[fullList.listItems.length - 1].id) + 1 : 1;

      const newItem = new ListItem(itemId.toString(), newEnrtyText);

      fullList.addItem(newItem);
      listTemplate.render(fullList);
    }

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