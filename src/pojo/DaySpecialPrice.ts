import Commodity from "@/pojo/Commodity";
export default class DaySpecialPrice extends Commodity{
  private minimumPriceDays: string;

  /**
   *
   * @param uuid 主键
   * @param title 商品标题
   * @param picture 图片
   * @param price 价格
   * @param originalPrice 原价
   * @param minimumPriceDays 最低价时间
   */
  constructor(uuid: string, title: string, picture: any, price: number, originalPrice: number, minimumPriceDays:string) {
    super(uuid, title, price, originalPrice, picture);
    this.minimumPriceDays = minimumPriceDays;
  }
}
