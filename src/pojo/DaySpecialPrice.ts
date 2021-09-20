import Commodity from "@/pojo/Commodity";
export default class DaySpecialPrice extends Commodity{
  private minimumPriceDays: string;

  /**
   *
   * @param id 主键
   * @param title 商品标题
   * @param picture 图片
   * @param price 价格
   * @param originalPrice 原价
   * @param minimumPriceDays 最低价时间
   */
  constructor(id: string, title: string, picture: any, price: number, originalPrice: number, minimumPriceDays:string) {
    super(id, title, price, originalPrice, picture);
    this.minimumPriceDays = minimumPriceDays;
  }
}
