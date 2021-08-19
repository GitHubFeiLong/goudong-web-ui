export default class Type {
  id: string | undefined = '';

  name: any = '';

  detailTypes: Array<Type> | undefined = [];

  constructor(id?: string, name?: any, detailTypes?: Array<Type>) {
    this.id = id;
    this.name = name;
    this.detailTypes = detailTypes;
  }
}
