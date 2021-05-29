import Commodity from '@/pojo/Commodity';

/**
 * 秒杀商品
 */
export default class SecKillCommodity extends Commodity {
  /**
   * 价格
   */
  price: number | undefined = undefined;

  /**
   * 原价
   */
  originalPrice: number | undefined = undefined;

  constructor(uuid: string, title: string, picture: any, price: number, originalPrice: number) {
    super(uuid, title, price, picture);
    this.price = price;
    this.originalPrice = originalPrice;
  }
}
