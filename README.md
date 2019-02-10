# xiurobert-ac-qrcode-rn

## Features and Changes
- Supports QR Codes ONLY
- Supports both Android and iOS
- Based on `react-native-camera`
- Simple to use scanning boundary
- Supports enabling and disabling torchlight via a prop

## Installation

```bash
$ yarn add xiurobert-ac-qrcode-rn
$ yarn add react-native-camera
$ react-native link react-native-camera
```

## Basic usage

```ecmascript 6
import React,{Component} from 'react'
import { Text, StyleSheet } from 'react-native'
import { QRScannerView } from 'ac-qrcode-rn'
import { Toast } from 'antd-mobile-rn'

class DefaultScreen extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}
  
  onScanResultReceived = ({ data, type }) => {
    console.log(`Type: ${type}\nData: ${data}`)
    // do anything
  }

  renderTopBarView() {
    return (
      <Text style={styles.text}>Insert your top menu here</Text>
    )
  }

  renderBottomMenuView() {
    return (
      <Text style={styles.text}>Insert your bottom menu here</Text>
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

## Props

![](https://github.com/MarnoDev/AC-QRCode-RN/blob/master/screenshots/ac-qrcode-props.jpg)

|         Prop         	|  Type  	|                              Default Value                             	| Optional 	|                Explanation               	|
|:--------------------:	|:------:	|:----------------------------------------------------------------------:	|:--------:	|:----------------------------------------:	|
|       maskColor      	| string 	|                                #0000004D                               	|   true   	|                Mask colour               	|
|      borderColor     	| string 	|                                 #000000                                	|   true   	|               Border colour              	|
|      cornerColor     	| string 	|                                 #000000                                	|   true   	|               Corner colour              	|
|      borderWidth     	| number 	|                                    0                                   	|   true   	|               Border width               	|
|   cornerBorderWidth  	| number 	|                                    4                                   	|   true   	|               Corner width               	|
|  cornerBorderLength  	| number 	|                                   20                                   	|   true   	|               Corner height              	|
|      rectHeight      	| number 	|                                   200                                  	|   true   	|         Scanning rectangle height        	|
|       rectWidth      	| number 	|                                   200                                  	|   true   	|         Scanning rectangle height        	|
|    isCornerOffset    	|  bool  	|                                  false                                 	|   true   	|      Whether the corners are offset      	|
|   cornerOffsetSize   	| number 	|                                    0                                   	|   true   	|            Corner offset size            	|
|   bottomMenuHeight   	| number 	|                                    0                                   	|   true   	|         Height of the bottom menu        	|
|  scanBarAnimateTime  	| number 	|                                  2500                                  	|   true   	| Time for the scan bar to move down fully 	|
|     scanBarColor     	| string 	|                                 #22ff00                                	|   true   	|      Colour of the animated scan bar     	|
|     scanBarImage     	|   any  	|                                  null                                  	|   true   	|     Image to be used for the scan bar    	|
|     scanBarHeight    	| number 	|                                   1.5                                  	|   true   	|           Height of the scan bar         	|
|     scanBarMargin    	| number 	|                                    6                                   	|   true   	|          Margins of the scan bar         	|
|       hintText       	| string 	|                 Align the QR code within the viewfinder                	|   true   	|                   Hint                   	|
|     hintTextStyle    	| object 	| { color: '#fff', </br>fontSize: 14,</br>backgroundColor:'transparent'} 	|   true   	|              Hint text style             	|
|   hintTextPosition   	| number 	|                                   130                                  	|   true   	|    Absolute position of the hint text    	|
|     isShowScanBar    	|  bool  	|                                  true                                  	|   true   	|           Should show scan bar?          	|
|    bottomMenuStyle   	| object 	|                                    -                                   	|   true   	|             Bottom menu style            	|
|   renderTopBarView   	|  func  	|                                    -                                   	|   false  	|   Function to render the top menu view   	|
| renderBottomMenuView 	|  func  	|                                    -                                   	|   false  	|  Function to render the bottom menu view 	|
| onScanResultReceived 	|  func  	|                                    -                                   	|   false  	| Function to call when QR code is scanned 	|
| torchEnabled         	| bool   	| false                                                                  	| true     	| Whether the torchlight is enabled        	|

## Credits

- [react-native-camera](https://github.com/lwansbrough/react-native-camera)
- [react-native-qrcode-app](https://github.com/insiderdev/react-native-qrcode-app)
- [react-native-qrcode](https://github.com/cssivision/react-native-qrcode)
- [AC-QRCode-RN](https://github.com/MarnoDev/AC-QRCode-RN)
- [AC-QRCode-RN 2](https://github.com/young-js/ac-qrcode-rn)