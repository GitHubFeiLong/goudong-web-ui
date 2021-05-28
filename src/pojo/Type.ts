export default class Type {
  uuid: string | undefined = '';
  name: string | undefined = '';
  detailTypes: Array<Type> | undefined = [];

  constructor(uuid?: string, name?: string, detailTypes?: Array<Type>) {
    this.uuid = uuid;
    this.name = name;
    this.detailTypes = detailTypes;
  }
}
