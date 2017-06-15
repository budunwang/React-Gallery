import React from 'react';

class ImgFigure extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  getImgeStyle(){
    let styleObj = {};

    /* 如果props属性中指定了这张图片的位置,则使用 */
    if(this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }

    if(this.props.arrange.isCenter) {
      styleObj.zIndex = 11;
    }

    //添加图片旋转度
    if(this.props.arrange.rotate) {
      let prefix = [ 'MozTransform','MsTransform','WebkitTransform','transform' ];
      prefix.forEach( value => {
        styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
      });
    }
    return styleObj;
  }

  //图片点击函数
  handleClick(e) {
    if(this.props.arrange.isCenter) {
      this.props.inverse();
    } else {
      this.props.center();
    }
    e.stopPropagation();
    e.preventDefault();
  }


  render() {
    let styleObj = this.getImgeStyle();
    let data = this.props.data;

    let imgFigureClassName = this.props.arrange.isInverse? 'img-figure is-inverse':'img-figure';

    return (
      <figure className={imgFigureClassName}
              style={styleObj}
              onClick={this.handleClick}>
        <img src={data.imageUrl} alt={data.title}/>
        <figcaption>
          <h2 className="img-title">{data.title}</h2>
          <div className="img-back" onClick={this.handleClick}>
            <p>
              {data.desc}
            </p>
          </div>
        </figcaption>
      </figure>
    );
  }
}

export default ImgFigure;
