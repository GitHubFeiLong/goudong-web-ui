/**
 * 商品
 */
export default class Commodity {
  /**
   * 主键uuid
   */
  uuid: string | undefined = undefined;

  /**
   * 商品标题
   */
  title: string | undefined = undefined;

  /**
   * 价格
   */
  price: number | undefined = undefined;

  /**
   * 原价
   */
  originalPrice: number | undefined = undefined;

  /**
   * 图片
   */
  picture: any = undefined;


  constructor(uuid: string | undefined
              , title: string | undefined
              , price: number | undefined
              , originalPrice: number | undefined
              , picture: any) {
    this.uuid = uuid;
    this.title = title;
    this.price = price;
    this.originalPrice = originalPrice;
    this.picture = picture;
  }
}
