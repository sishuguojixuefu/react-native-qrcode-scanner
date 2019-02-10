/**
 * Created by marno on 2017/4/13
 * Function: 二维码扫描界面
 * Desc:
 * Updated by xiurobert on 2019/2/10
 * Changes:
 * Updated to RNCamera
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {RNCamera} from 'react-native-camera'
import
{
    ActivityIndicator,
    StyleSheet,
    View,
    Animated,
    Easing,
    Text,
    Image,
} from 'react-native'

/***
 * Container within the RNCamera holding everything
 */
class QRScannerRectView extends Component {
    static defaultProps = {
        maskColor: '#0000004D',
        cornerColor: '#22ff00',
        borderColor: '#000000',
        rectHeight: 200,
        rectWidth: 200,
        borderWidth: 0,
        cornerBorderWidth: 4,
        cornerBorderLength: 20,
        isLoading: false,
        cornerOffsetSize: 0,
        isCornerOffset: false,
        bottomMenuHeight: 0,
        scanBarAnimateTime: 2500,
        scanBarColor: '#22ff00',
        scanBarImage: null,
        scanBarHeight: 1.5,
        scanBarMargin: 6,
        hintText: 'Align the QR code within the viewfinder',
        hintTextStyle: {color: '#fff', fontSize: 14, backgroundColor: 'transparent'},
        hintTextPosition: 130,
        isShowScanBar: true,
    };

    constructor(props) {
        super(props);

        this.getBackgroundColor = this.getBackgroundColor.bind(this);
        this.getRectSize = this.getRectSize.bind(this);
        this.getCornerSize = this.getCornerSize.bind(this);
        this.renderLoadingIndicator = this.renderLoadingIndicator.bind(this);

        this.state = {
            topWidth: 0,
            topHeight: 0,
            leftWidth: 0,
            animatedValue: new Animated.Value(0),
        }
    }

    getBackgroundColor() {
        return ({
            backgroundColor: this.props.maskColor,
        })
    }

    // Get the size of the boundary of the QR Scanner
    getRectSize() {
        return ({
            height: this.props.rectHeight,
            width: this.props.rectWidth,
        })
    }

    // Get the border size of the boundary of the QR Scanner
    getBorderSize() {
        if (this.props.isCornerOffset) {
            return ({
                height: this.props.rectHeight - this.props.cornerOffsetSize * 2,
                width: this.props.rectWidth - this.props.cornerOffsetSize * 2,
            })
        }
        return ({
            height: this.props.rectHeight,
            width: this.props.rectWidth,
        })
    }

    // Get the colours of the corners of the scanning rectangle
    getCornerColor() {
        return ({
            borderColor: this.props.cornerColor,
        })
    }

    // Get the size of the corners of the scanning rectangle
    getCornerSize() {
        return ({
            height: this.props.cornerBorderLength,
            width: this.props.cornerBorderLength,
        })
    }

    // Get the width of the scanning border
    getBorderWidth() {
        return ({
            borderWidth: this.props.borderWidth,
        })
    }

    // Get the colour of the scanning border
    getBorderColor() {
        return ({
            borderColor: this.props.borderColor,
        })
    }


    renderLoadingIndicator() {
        if (!this.props.isLoading) {
            return null
        }

        return (
            <ActivityIndicator
                animating={this.props.isLoading}
                color={this.props.color}
                size="large"
            />
        )
    }

    // Measure the size of the entire scanning rectangle
    measureTotalSize(e) {
        const totalSize = e.layout;
        this.setState({
            topWidth: totalSize.width,
        })
    }

    // Measure the position of the scanning rectangle
    measureRectPosition(e) {
        const rectSize = e.layout;
        this.setState({
            topHeight: rectSize.y,
            leftWidth: rectSize.x,
        })
    }

    // 获取顶部遮罩高度
    getTopMaskHeight() {
        if (this.props.isCornerOffset) {
            return this.state.topHeight + this.props.rectHeight - this.props.cornerOffsetSize
        }
        return this.state.topHeight + this.props.rectHeight
    }

    // 获取底部遮罩高度
    getBottomMaskHeight() {
        if (this.props.isCornerOffset) {
            return this.props.rectHeight + this.state.topHeight - this.props.cornerOffsetSize
        }
        return this.state.topHeight + this.props.rectHeight
    }

    // 获取左右两边遮罩高度
    getSideMaskHeight() {
        if (this.props.isCornerOffset) {
            return this.props.rectHeight - this.props.cornerOffsetSize * 2
        }
        return this.props.rectHeight
    }

    // 获取左右两边遮罩宽度
    getSideMaskWidth() {
        if (this.props.isCornerOffset) {
            return this.state.leftWidth + this.props.cornerOffsetSize
        }
        return this.state.leftWidth
    }

    getBottomMenuHeight() {
        return ({
            bottom: this.props.bottomMenuHeight,
        })
    }

    getScanBarMargin() {
        return ({
            marginRight: this.props.scanBarMargin,
            marginLeft: this.props.scanBarMargin,
        })
    }

    getScanImageWidth() {
        return this.props.rectWidth - this.props.scanBarMargin * 2
    }

    // Renders the scanning line
    _renderScanBar() {
        if (!this.props.isShowScanBar) return;
        if (this.props.scanBarImage) {
            return (<Image
                style={{resizeMode: 'contain', width: this.getScanImageWidth()}}
                source={this.props.scanBarImage}
            />)
        }
        return (<View style={[this.getScanBarMargin(), {
            backgroundColor: this.props.scanBarColor,
            height: this.props.scanBarHeight,
        }]}
        />)
    }

    render() {
        const animatedStyle = {
            transform: [
                {translateY: this.state.animatedValue},
            ],
        };

        return (
            <View
                onLayout={({nativeEvent: e}) => this.measureTotalSize(e)}
                style={[styles.container, this.getBottomMenuHeight()]}
            >

                <View
                    style={[styles.viewfinder, this.getRectSize()]}
                    onLayout={({nativeEvent: e}) => this.measureRectPosition(e)}
                >

                    {/* Animated line moving up and down the scanning area */}
                    <View style={[
                        this.getBorderSize(),
                        this.getBorderColor(),
                        this.getBorderWidth(),
                    ]}
                    >

                        <Animated.View
                            style={[
                                animatedStyle]}
                        >
                            {this._renderScanBar()}
                        </Animated.View>

                    </View>

                    {/* Top left border */}
                    <View style={[
                        this.getCornerColor(),
                        this.getCornerSize(),
                        styles.topLeftCorner,
                        {
                            borderLeftWidth: this.props.cornerBorderWidth,
                            borderTopWidth: this.props.cornerBorderWidth,
                        },
                    ]}
                    />

                    {/* Top right border */}
                    <View style={[
                        this.getCornerColor(),
                        this.getCornerSize(),
                        styles.topRightCorner,
                        {
                            borderRightWidth: this.props.cornerBorderWidth,
                            borderTopWidth: this.props.cornerBorderWidth,
                        },
                    ]}
                    />


                    {this.renderLoadingIndicator()}

                    {/* Bottom left corner */}
                    <View style={[
                        this.getCornerColor(),
                        this.getCornerSize(),
                        styles.bottomLeftCorner,
                        {
                            borderLeftWidth: this.props.cornerBorderWidth,
                            borderBottomWidth: this.props.cornerBorderWidth,
                        },
                    ]}
                    />

                    {/* Bottom right corner */}
                    <View style={[
                        this.getCornerColor(),
                        this.getCornerSize(),
                        styles.bottomRightCorner,
                        {
                            borderRightWidth: this.props.cornerBorderWidth,
                            borderBottomWidth: this.props.cornerBorderWidth,
                        },
                    ]}
                    />
                </View>

                <View style={[
                    this.getBackgroundColor(),
                    styles.topMask,
                    {
                        bottom: this.getTopMaskHeight(),
                        width: this.state.topWidth,
                    },
                ]}
                />

                <View style={[
                    this.getBackgroundColor(),
                    styles.leftMask,
                    {
                        height: this.getSideMaskHeight(),
                        width: this.getSideMaskWidth(),
                    },
                ]}
                />

                <View style={[
                    this.getBackgroundColor(),
                    styles.rightMask,
                    {
                        height: this.getSideMaskHeight(),
                        width: this.getSideMaskWidth(),
                    }]}
                />

                <View style={[
                    this.getBackgroundColor(),
                    styles.bottomMask,
                    {
                        top: this.getBottomMaskHeight(),
                        width: this.state.topWidth,
                    }]}
                />

                <View style={{position: 'absolute', bottom: this.props.hintTextPosition}}>
                    <Text style={this.props.hintTextStyle}>{this.props.hintText}</Text>
                </View>

            </View>
        )
    }

    componentDidMount() {
        this.scannerLineMove()
    }

    scannerLineMove() {
        this.state.animatedValue.setValue(0); // 重置Rotate动画值为0
        Animated.timing(this.state.animatedValue, {
            toValue: this.props.rectHeight,
            duration: this.props.scanBarAnimateTime,
            easing: Easing.ease,
        }).start(() => this.scannerLineMove())
    }
}

/**
 * Usable Component.
 */
export default class QRScannerView extends Component {
    static propTypes = {
        maskColor: PropTypes.string,
        borderColor: PropTypes.string,
        cornerColor: PropTypes.string,
        borderWidth: PropTypes.number,
        cornerBorderWidth: PropTypes.number,
        cornerBorderLength: PropTypes.number,
        rectHeight: PropTypes.number,
        rectWidth: PropTypes.number,
        isLoading: PropTypes.bool,
        isCornerOffset: PropTypes.bool,
        cornerOffsetSize: PropTypes.number,
        bottomMenuHeight: PropTypes.number,
        scanBarAnimateTime: PropTypes.number,
        scanBarColor: PropTypes.string,
        scanBarImage: PropTypes.any,
        scanBarHeight: PropTypes.number,
        scanBarMargin: PropTypes.number,
        hintText: PropTypes.string,
        hintTextStyle: PropTypes.object,
        hintTextPosition: PropTypes.number,
        renderTopBarView: PropTypes.func,
        renderBottomMenuView: PropTypes.func,
        isShowScanBar: PropTypes.bool,
        bottomMenuStyle: PropTypes.object,
        flashMode: PropTypes.object,
    };

    constructor(props) {
        super(props);
        // 通过这句代码屏蔽 YellowBox
        console.disableYellowBox = true
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <RNCamera
                    barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
                    onBarCodeRead={this.props.onScanResultReceived}
                    style={{flex: 1}}
                    flashMode={this.props.flashMode}
                >
                    {/* Top Menu */}
                    {this.props.renderTopBarView()}

                    {/* QR Scanner Boundary */}
                    <QRScannerRectView
                        maskColor={this.props.maskColor}
                        cornerColor={this.props.cornerColor}
                        borderColor={this.props.borderColor}
                        rectHeight={this.props.rectHeight}
                        rectWidth={this.props.rectWidth}
                        borderWidth={this.props.borderWidth}
                        cornerBorderWidth={this.props.cornerBorderWidth}
                        cornerBorderLength={this.props.cornerBorderLength}
                        isLoading={this.props.isLoading}
                        cornerOffsetSize={this.props.cornerOffsetSize}
                        isCornerOffset={this.props.isCornerOffset}
                        bottomMenuHeight={this.props.bottomMenuHeight}
                        scanBarAnimateTime={this.props.scanBarAnimateTime}
                        scanBarColor={this.props.scanBarColor}
                        scanBarHeight={this.props.scanBarHeight}
                        scanBarMargin={this.props.scanBarMargin}
                        hintText={this.props.hintText}
                        hintTextStyle={this.props.hintTextStyle}
                        scanBarImage={this.props.scanBarImage}
                        hintTextPosition={this.props.hintTextPosition}
                        isShowScanBar={this.props.isShowScanBar}
                    />

                    {/* Bottom Menu */}
                    <View style={[styles.buttonsContainer, this.props.bottomMenuStyle]}>
                        {this.props.renderBottomMenuView()}
                    </View>

                </RNCamera>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    buttonsContainer: {
        position: 'absolute',
        height: 100,
        bottom: 0,
        left: 0,
        right: 0,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
    },
    viewfinder: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    topLeftCorner: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    topRightCorner: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    bottomLeftCorner: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    bottomRightCorner: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    topMask: {
        position: 'absolute',
        top: 0,
    },
    leftMask: {
        position: 'absolute',
        left: 0,
    },
    rightMask: {
        position: 'absolute',
        right: 0,
    },
    bottomMask: {
        position: 'absolute',
        bottom: 0,
    },
})
