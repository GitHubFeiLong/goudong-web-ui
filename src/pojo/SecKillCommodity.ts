import Commodity from '@/pojo/Commodity';

/**
 * 秒杀商品
 */
export default class SecKillCommodity extends Commodity {
  constructor(id: string, title: string, picture: any, price: number, originalPrice: number) {
    super(id, title, price, originalPrice, picture);
  }
}
