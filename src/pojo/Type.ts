export default class Type {
  uuid: string | undefined = '';
  name: any = '';
  detailTypes: Array<Type> | undefined = [];

  constructor(uuid?: string, name?: any, detailTypes?: Array<Type>) {
    this.uuid = uuid;
    this.name = name;
    this.detailTypes = detailTypes;
  }
}
