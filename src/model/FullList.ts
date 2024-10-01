import ListItem from "./ListItem";

interface List {
  listItems: ListItem[];
  addItem(item: ListItem): void;
  deleteItem(id: string): void;
  load(): void;
  clearList(): void;
  save(): void;
}

export default class FullList implements List {
  //Since only one List will be on the entire app we made it singleton
  static instance: FullList = new FullList();
  private constructor(private _listItems: ListItem[] = []) {}
  get listItems(): ListItem[] {
    return this._listItems;
  }
  load(): void {
    //Load the list from local storage if exists, else create a new list
    const savedList: string | null = localStorage.getItem("list");
    //Check if the list is a type of string.
    if (typeof savedList !== "string") return;

    try {
      //Parse the saved list to an array of objects.
      const parsedList: { _id: string; _item: string; _checked: boolean }[] =
        JSON.parse(savedList);
        //Create a new ListItem for each object in the parsed list and add it to the FullList instance.
      parsedList.map((itemObj) => {
        const newListItem = new ListItem(
          itemObj._id,
          itemObj._item,
          itemObj._checked
        );
        FullList.instance.addItem(newListItem);
      });
    } catch (e) {
      console.error("Error parsing saved list", e);
    }
  }
  
  save(): void {
    //Save the list to local storage as a JSON string.
    localStorage.setItem("list", JSON.stringify(this._listItems));
  }
  clearList(): void {
    //Clear the list and save it to local storage.
    this._listItems = [];
    this.save();
  }
  addItem(item: ListItem): void {
    //Add the item to the list and save it to local storage.
    this._listItems.push(item);
    this.save();
  }
  deleteItem(id: string): void {
    //Delete the item with the given id from the list and save it to local storage.
    this._listItems = this._listItems.filter((item) => item.id !== id);
    this.save();
  }
}
