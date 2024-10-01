import FullList from "../model/FullList";

interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
  static instance: ListTemplate = new ListTemplate();

  //Html element ul #listItems
  ul: HTMLUListElement;

  private constructor() {
    this.ul = document.querySelector("#listItems") as HTMLUListElement;
  }

  //Clears the HTML list items.
  clear(): void {
    this.ul.innerHTML = "";
  }
  //Creates the DOM elements.
  render(fullList: FullList): void {
    //Clear the list before rendering
    this.clear();

    //Render each item in the listItems array as a new list item.
    fullList.listItems.forEach((item) => {
        //Create a li element with the class name of item.
      const li = document.createElement("li") as HTMLLIElement;
      li.className = "item";
      
      //Create a checkbox element with the id and checked state of the item. Append it to the li item
      const checkbox = document.createElement("input") as HTMLInputElement;
      checkbox.type = "checkbox";
      checkbox.id = item.id;
      checkbox.checked = item.checked;
      li.append(checkbox);
      
      //Create a label element with the text content of the item. Append it to the li item.
      const label = document.createElement("label") as HTMLLabelElement;
      label.htmlFor = item.id;
      label.textContent = item.item;
      li.append(label);

      //Create a delete button element. Append it to the li item.
      const button = document.createElement("button") as HTMLButtonElement;
      button.textContent = "X";
      li.append(button);
      
      //Add a click event listener to the delete button that removes the item from the list and re-renders the list.
      button.addEventListener("click", () => {
        fullList.deleteItem(item.id);
        this.render(fullList);
      });

      //Append the li item to the ul element.
      this.ul.append(li);
    });
  }
}
