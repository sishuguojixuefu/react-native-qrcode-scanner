# ac-qrcode-rn

## 特性
- 支持扫描二维码、条形码
- 支持 Android 和 iOS 系统
- 基于 react-native-camera
- 轻松实现各类扫描界面

## 安装

```bash
$ yarn add ac-qrcode-rn
$ yarn add react-native-camera
$ react-native link react-native-camera
```

## 基本使用

```js
import React,{Component} from 'react'
import { Text, StyleSheet } from 'react-native'
import { QRScannerView } from 'ac-qrcode-rn'
import { Toast } from 'antd-mobile-rn'

class DefaultScreen extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}
  
  onScanResultReceived = (e) => {
    Toast.show(`Type: ${e.type}\nData: ${e.data}`)
    // console.log(e)
  }

  renderTopBarView() {
    return (
      <Text style={styles.text}>这里添加底部菜单</Text>
    )
  }

  renderBottomMenuView() {
    return (
      <Text style={styles.text}>这里添加标题</Text>
    )
  }

  render() {
    return (
      <QRScannerView
        onScanResultReceived={this.onScanResultReceived}
        renderTopBarView={this.renderTopBarView}
        renderBottomMenuView={this.renderBottomMenuView}
      />
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 20,
    padding: 12,
  },
})

export default DefaultScreen
```

## 属性列表

![](https://github.com/MarnoDev/AC-QRCode-RN/blob/master/screenshots/ac-qrcode-props.jpg)

|        属性名        |  类型  |                                 默认值                                 | 可选  |        描述        |
|:--------------------:|:------:|:----------------------------------------------------------------------:|:-----:|:------------------:|
|      maskColor       | string |                               #0000004D                                | true  |      遮罩颜色      |
|     borderColor      | string |                                #000000                                 | true  |      边框颜色      |
|     cornerColor      | string |                                #000000                                 | true  |      转角颜色      |
|     borderWidth      | number |                                   0                                    | true  |      边框宽度      |
|  cornerBorderWidth   | number |                                   4                                    | true  |      转角宽度      |
|  cornerBorderLength  | number |                                   20                                   | true  |      转角长度      |
|      rectHeight      | number |                                  200                                   | true  |     扫描狂高度     |
|      rectWidth       | number |                                  200                                   | true  |     扫描狂宽度     |
|    isCornerOffset    |  bool  |                                 false                                  | true  |    转角是否偏移    |
|   cornerOffsetSize   | number |                                   0                                    | true  |     转角偏移量     |
|   bottomMenuHeight   | number |                                   0                                    | true  |  底部操作菜单高度  |
|  scanBarAnimateTime  | number |                                  2500                                  | true  |   扫描线移动速度   |
|     scanBarColor     | string |                                #22ff00                                 | true  |     扫描线颜色     |
|     scanBarImage     |  any   |                                  null                                  | true  |   使用图片扫描线   |
|    scanBarHeight     | number |                                  1.5                                   | true  |     扫描线高度     |
|    scanBarMargin     | number |                                   6                                    | true  | 扫描线距扫描狂边距 |
|       hintText       | string |                将二维码/条码放入框内，</br>即可自动扫描                | true  |      提示文本      |
|    hintTextStyle     | object | { color: '#fff', </br>fontSize: 14,</br>backgroundColor:'transparent'} | true  |    提示文字样式    |
|   hintTextPosition   | number |                                  130                                   | true  |    提示文字位置    |
|    isShowScanBar     |  bool  |                                  true                                  | true  |   是否显示扫描条   |
|   bottomMenuStyle    | object |                                   -                                    | true  |    底部菜单样式    |
|   renderTopBarView   |  func  |                                   -                                    | flase | 绘制顶部操作条组件 |
| renderBottomMenuView |  func  |                                   -                                    | false | 绘制底部操作条组件 |
| onScanResultReceived |  func  |                                   -                                    | false |    扫描结果回调    |

## 感谢

- [react-native-camera](https://github.com/lwansbrough/react-native-camera)
- [react-native-qrcode-app](https://github.com/insiderdev/react-native-qrcode-app)
- [react-native-qrcode](https://github.com/cssivision/react-native-qrcode)
- [AC-QRCode-RN](https://github.com/MarnoDev/AC-QRCode-RN)
