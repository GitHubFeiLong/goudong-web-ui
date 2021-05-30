import Commodity from '@/pojo/Commodity';

/**
 * 底部活动的商品
 */
export default class ActivityFloorCommodity extends Commodity {
  type: string | undefined = undefined;

  constructor(uuid: string, title: string, type: string, picture: any) {
    super(uuid, title, 0, picture);
    this.type = type;
  }
}
