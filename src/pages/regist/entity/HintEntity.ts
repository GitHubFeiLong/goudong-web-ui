/**
 * 注册页的提示信息的元数据
 */
class HintEntity {
    // 提示信息
    info:string;
    // 字体颜色
    color:string;
    // 图标位置(使用的精灵图)
    backgroundPosition: string;
    constructor (info:string ="验证完成后，你可以使用该邮箱登录或找回密码", color:string='#c5c5c5', backgroundPosition:string='0px -100px') {
        this.info = info;
        this.color = color;
        this.backgroundPosition = backgroundPosition;
    }
}
export default HintEntity;