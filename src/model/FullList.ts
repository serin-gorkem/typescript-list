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
  static instance: FullList = new FullList();
  private constructor(private _listItems: ListItem[] = []) {}

  get listItems(): ListItem[] {
    return this._listItems;
  }
  load(): void {
    const savedList: string | null = localStorage.getItem("list");
    if (typeof savedList !== "string") return;

    try {
      const parsedList: { _id: string; _item: string; _checked: boolean }[] =
        JSON.parse(savedList);
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
    localStorage.setItem("list", JSON.stringify(this._listItems));
  }
  clearList(): void {
    this._listItems = [];
    this.save();
  }
  addItem(item: ListItem): void {
    this._listItems.push(item);
    this.save();
  }
  deleteItem(id: string): void {
    this._listItems = this._listItems.filter((item) => item.id !== id);
    this.save();
  }
}
