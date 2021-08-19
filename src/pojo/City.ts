export default class City {
  id: string | undefined;

  name: string | undefined;

  checked: boolean | undefined;

  constructor(id?: string, name?: string, checked?: boolean) {
    this.id = id;
    this.name = name;
    this.checked = checked;
  }
}
