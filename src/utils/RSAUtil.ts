/**
 * encryptlong 分段加密，分段解密
 */
//@ts-ignore
import { JSEncrypt } from 'encryptlong'
import {Base64} from 'js-base64';



//~客户端相关
//==================================================================================================
// 声明goudong-web-ui的encrypt对象
const UiJsEncrypt = new JSEncrypt();
/**
 * 客户端公钥
 */
const UI_PUBLIC_KEY = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAi5K+TItaOQFziqBUSnmDwbYRVghXOb4E7A7OXC5H8NwkyJiKOxka98ok6Nbo5Iu98eoWuCt19FSfiArtqilQl4sQR5cPoA/7XavZBc4V70UPAvZCTuV671CdYK1+HSnKyYsLJ/AukCixqtrkRf3McUkfP4+EZwNr7Oeze5hyeH9QgrzWpFG1NyDQjJZHbpVmQyZEKS2MZUZs1fEnDL9rYS0X+nmFNZ4M8yR4gmVsBRKDkHP2yod8qyNGqeFy3miSusRWxokOmueVLUBvbPOyOzo/Nml47cCLDOiQurl7ow7n7HpzNn3MVXgPlpOGUO6hGP2OqprbtnN/pmj8+r/G1QIDAQAB`;
/**
 * 客户端私钥
 */
const UI_PRIVATE_KEY = `MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCLkr5Mi1o5AXOKoFRKeYPBthFWCFc5vgTsDs5cLkfw3CTImIo7GRr3yiTo1ujki73x6ha4K3X0VJ+ICu2qKVCXixBHlw+gD/tdq9kFzhXvRQ8C9kJO5XrvUJ1grX4dKcrJiwsn8C6QKLGq2uRF/cxxSR8/j4RnA2vs57N7mHJ4f1CCvNakUbU3INCMlkdulWZDJkQpLYxlRmzV8ScMv2thLRf6eYU1ngzzJHiCZWwFEoOQc/bKh3yrI0ap4XLeaJK6xFbGiQ6a55UtQG9s87I7Oj82aXjtwIsM6JC6uXujDufsenM2fcxVeA+Wk4ZQ7qEY/Y6qmtu2c3+maPz6v8bVAgMBAAECggEBAIjRzOJUKJmBJrZZ/McU32fhBpWDj532+/Q7f2c1pyghZZ2OitLsBVeqPQxSv/JqWkTu6F6ZnANrgQdnTxtjbLFhjQ/gsVyCzjJA53mdUDtBQznwFYgpxJ0cNWo0KFCGS1fOiZ0ZAUwn2CJYeTVzWhojSBKSqYQiAoY1i+g4xN4A3U7yN02hxIzhis4vWUIFS7MEpdsYXEs17WrpP+yfrpIGUszIKiABwG/I9gW6d57Mf4mIY5BBamuw7Tba/xprD9slk477xpZnMYyQjziIwXOAfGi4sfWVXvWWQAInW8aicAcwgeh/awpaJ4tYkTC1Wj/8hI1nd/J0S0OxTcmiL/ECgYEAwHXd70Ejo9VQflR8AjZQWuvnktlQv2uJL76qejMLtPLqyz6GmAKEkHC/zy3E1OFaCjOD85KE+KkpaBZeHldKMPuV9kG/kD/gtgdRyS1hRZm/d/USRrmJfIbgbCLUM8jh8gloCPGlJv89up1hncug5hzPvjQIiDjL82MB71wGQv8CgYEAuacFWzPWDwdJWVhWz0/Vaj3iWmmMNuCkWuDE6yY+ZzCiZOK7s5QfRUICUzto1F9+A/6PyHbWn9E4dY2xwNxy3dtXDyF47jFGX67fqtm0VcnxDDxEfRv5YrwTsUmOjDEVXB1gIWQIuGzLBU2b0oT9m6i981zIJcT7SSi/+Oc7eisCgYEAo2hwEyAffo8zVM+uqsIq38fESu6wnJZVWHBulmqY2f4WVJK1/ILGw0y3ztRxdr4PkPHEax5QQECAo5u6NdCvcX9rCDcyyusxg9wbGNCq8klkRBmUdvA5R73M9oNr4LwC+1n5Nv7U1pOIedX+d9fYuQhlan0LcX2nzPKXRf/AYUkCgYA9oJbjlop5RKbxlKSEfvDOKqrH7n+P+/QzAqf7kx9l67wMl0NNsl7LA8V30aHT1bskIk2icuh99tqyEw4tgkBTKyt0J11YXF0LCCbRNSFq1PVCZYMqsK2RO/Ohh1RdbzGy+UFe9DD834hpQ0D1mhYBpPshHOyHtSLhPziyrDePLwKBgExghqizg3beOweEU5fxeDLrW+tF4jBPtBuq29skn2cxi4E+68GEO6igAlO/kb04wiG9YrLxbx/bXskJqvozx4P9jKrxK0BIFBiufQYMUD7PzmdIbG71wvbZoMnhJt0tVUaxh54xngM5GW5Cccl5jFqoLuTCRMOojicYP7jas5id`;


UiJsEncrypt.setPublicKey(UI_PUBLIC_KEY);
UiJsEncrypt.setPrivateKey(UI_PRIVATE_KEY);

//~ 服务端相关
//==================================================================================================
/**
 * 服务端公钥
 */
const SERVER_PUBLIC_KEY = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgMMsJimfsZqN//iyRVfC/v2Yec7mf5lUeuFIsrquofl5VFwoUx13UQvV8WI4alHNCXKsnvNuIqQ7ESOznQ3aS4ZEvhpwnjMxDDvjZ9xCXRVU06e7ppI8I8neT2PtSh7IvV3gSRauLxMRkNw5UIhiPQ4hps0kLzfZwsRm17/FE/gBbN1MvNY77JneRgwsbuMIUaxn22Aqq2uZgTOOlLsHaGnthDBXb7QPlngxe/wAQF5cckJg4qzQ2AUtBV9PXrnK07cBT+cUWTYhKrvK2VWDXEgmv8b62WacpPVLuCJE9JWmuVqTgYhzTGfXGBr8l8hjCO8FOBzGPmgZTee3HcAcDQIDAQAB";

// 声明goudong-java的encrypt对象
const serverJsEncrypt = new JSEncrypt();
serverJsEncrypt.setPublicKey(SERVER_PUBLIC_KEY);
/**
 * 使用服务端公钥加密
 * @param data 加密前的字符串
 * @return result 加密后的字符串(Base64编码后的密文)
 */
export function serverPublicKeyEncrypt(data: string) {
  return serverJsEncrypt.encryptLong(data);
}
