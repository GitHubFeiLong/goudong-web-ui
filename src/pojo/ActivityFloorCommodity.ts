import Commodity from '@/pojo/Commodity';

/**
 * 底部活动的商品
 */
export default class ActivityFloorCommodity extends Commodity {
  type: string | undefined = undefined;

  constructor(id: string, title: string, type: string, picture: any) {
    super(id, title, 0,0, picture);
    this.type = type;
  }
}
