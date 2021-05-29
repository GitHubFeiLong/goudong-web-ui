export default class City {
  uuid: string | undefined;

  name: string | undefined;

  checked: boolean | undefined;

  constructor(uuid?: string, name?: string, checked?: boolean) {
    this.uuid = uuid;
    this.name = name;
    this.checked = checked;
  }
}
