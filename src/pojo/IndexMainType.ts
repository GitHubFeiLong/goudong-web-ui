/**
 * 首页标签 实体对象
 */
import Type from "@/pojo/Type";

export default class IndexMainType {
    /**
     * 外层数组
     */
    outTypes: Array<Type> = [];
    /**
     * 内层顶部数组
     */
    inTypes: Array<Type> = [];
    /**
     * 内层的详细数组
     */
    detailTypes: Array<Type> = [];

    constructor(outTypes: Array<Type>, inTypes: Array<Type>, detailTypes: Array<Type>) {
        this.outTypes = outTypes;
        this.inTypes = inTypes;
        this.detailTypes = detailTypes;
    }
}


