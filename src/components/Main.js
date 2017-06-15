import 'normalize.css/normalize.css';
import 'styles/App.scss';

import React from 'react';
import { findDOMNode } from 'react-dom';
import ImgFigure from './ImgFigure';

//获取图片信息
import imageJsonDatas from '../data/imageDatas.json';

//将路径信息赋值给图片
const imageDatas = imageJsonDatas.map((img) => {
  img.imageUrl = require('../images/' + img.fileName);
  return img;
});

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.Constant = {
      centerPos: {
        left: 0,
        right: 0
      },
      hPosRange: {
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      vPosRange: {
        x: [0, 0],
        topY: [0, 0]
      }
    };
    this.state = {
      imgsArrangeArr: [
        /*
          {
            pos: {
              left: '0',
              top: '0'
            },
            // 旋转角度
            rotate: 0,
            // 图片正反判断，true是反面，false是正面
            isInverse: false
            // 图片居中判断，false不居中，true居中
            isCenter: false
          }
        */
      ]
    };
  }

  componentDidMount() {

    //获取展示页面的大小
    let stageDOM = findDOMNode(this.refs.stage);
    let stageW = stageDOM.scrollWidth;
    let stageH = stageDOM.scrollHeight;
    let halfStageW = Math.ceil(stageW / 2);
    let halfStageH = Math.ceil(stageH / 2);

    //获取图片的大小
    let imgFigureDOM = findDOMNode(this.refs.imgFigure0);
    let imgW = imgFigureDOM.scrollWidth;
    let imgH = imgFigureDOM.scrollHeight;
    let halfImgW = Math.ceil(imgW / 2);
    let halfImgH = Math.ceil(imgH / 2);

    //计算中心图片的位置
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    }

    //计算左右区域图片的极限位置
    this.Constant.hPosRange = {
      leftSecX: [ -halfImgW, halfStageW - halfImgW * 3],
      rightSecX: [halfStageW + halfImgW, stageW - halfImgW],
      y: [ -halfImgW, stageH - halfImgH]
    }

    //计算上部区域图片的极限位置
    this.Constant.vPosRange = {
      x: [ halfStageW - imgW, halfStageW],
      topY: [ -halfImgH, halfStageH - halfImgH * 3]
    }

    //初始化布局
    this.rearrange(0);
  }

  /*
  * 重新布局图片位置
  */
  rearrange(centerIndex) {
    let { imgsArrangeArr } = this.state;
    let { centerPos, hPosRange, vPosRange } = this.Constant;

    let hPosRangeLeftSecX = hPosRange.leftSecX;
    let hPosRangeRightSecX = hPosRange.rightSecX;
    let hPosRangeY = hPosRange.y;
    let vPosRangeX = vPosRange.x;
    let vPosRangeTopY = vPosRange.topY;

    //取出中间图片，剩余图片保存在数组
    let imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);
    //centerIndex图片居中，不旋转
    imgsArrangeCenterArr[0]= {
      pos: centerPos,
      rotate: 0,
      isCenter: true
    };

    //处理上部区域图片
    let imgsArrangeTopArr = [];
    //随机取0或1
    let topImgNum = Math.ceil(Math.random() * 2);
    //随机取出上部区域图片信息
    let topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
    //取0或1张图片在上部
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

    //上部区域图片布局
    imgsArrangeTopArr.forEach((value, index) => {
      imgsArrangeTopArr[index] = {
        pos: {
          top: this.getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
          left: this.getRangeRandom(vPosRangeX[0], vPosRangeX[1])
        },
        rotate: this.get30DegRandom(),
        isCenter: false
      };
    });

    //处理左右区域图片
    for(let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
      let imgsPosRorL = i < k ? hPosRangeRightSecX : hPosRangeLeftSecX;
      //左右区域图片布局
      imgsArrangeArr[i] = {
        pos: {
          top: this.getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
          left: this.getRangeRandom(imgsPosRorL[0], imgsPosRorL[1])
        },
        rotate: this.get30DegRandom(),
        isCenter: false
      };
    }

    //将中间图片放回图片数组
    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

    //将上部区域图片放回图片数组
    if(imgsArrangeTopArr&&imgsArrangeTopArr[0]) {
      imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
    }

    //设置state，重新渲染view
    this.setState({
      imgsArrangeArr:imgsArrangeArr
    })
  }

  //获取区间内的随机数
  getRangeRandom(low, high) {
    return Math.ceil(Math.random() * (high -low) +low);
  }

  //获取30度内的正负旋转角度
  get30DegRandom() {
    return (Math.random() > 0.5 ? '-' : '') + Math.ceil(Math.random() * 30);
  }

  //翻转图片
  //index是传入的图片index
  inverse(index) {
    let { imgsArrangeArr } = this.state;
    imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
    this.setState({
      imgsArrangeArr: imgsArrangeArr
    });
  }

  //将图片居中
  //index是传入的图片index
  center(index) {
    this.rearrange(index);
  }

  render() {
    let controllerUnits = [];
    let imgFigure = [];

    imageDatas.forEach((value, index) => {
      if(!this.state.imgsArrangeArr[index]) {
        this.state.imgsArrangeArr[index] = {
          pos: {
            top: 0,
            left: 0
          },
          rotate: 0,
          isInverse: false,
          isCenter: false
        }
      }
      imgFigure.push(<ImgFigure data={value} ref={'imgFigure' + index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse.bind(this,index)} center={this.center.bind(this,index)}/>);
    });

    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigure}
        </section>
        <nav className="controller-nav">
        </nav>
      </section>
    );
  }
}

export default AppComponent;
