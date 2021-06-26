import Commodity from '@/pojo/Commodity';

/**
 * 秒杀商品
 */
export default class SecKillCommodity extends Commodity {
  constructor(uuid: string, title: string, picture: any, price: number, originalPrice: number) {
    super(uuid, title, price, originalPrice, picture);
  }
}
