import Commodity from "@/pojo/Commodity";

/**
 * 折扣商品
 */
export default class DiscountCommodity extends Commodity {
  /**
   * 折扣，详细描述
   */
  private discountInfo : string = '全场九折起';
  /**
   * 折扣还剩多少天
   */
  private days : number = 0;
  /**
   * 品牌专场
   */
  private brandSpecial : string;

  constructor(id: string | undefined, title: string | undefined, picture: any, discountInfo: string, days: number, brandSpecial: string) {
    super(id, title, -1, -1, picture);
    this.discountInfo = discountInfo;
    this.days = days;
    this.brandSpecial = brandSpecial;
  }
}
