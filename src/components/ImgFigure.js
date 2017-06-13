import React from 'react';

class ImgFigure extends React.Component {

  constructor(props) {
    super(props);
  }

  getImgeStyle(){
    let styleObj = {};

    /* 如果props属性中指定了这张图片的位置,则使用 */
    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }
    return styleObj;
  }


  render() {
    let styleObj = this.getImgeStyle();
    let data = this.props.data;

    return (
      <figure className="img-figure"
              style={styleObj}>
        <img src={data.imageUrl} alt={data.title}/>
        <figcaption>
          <h2 className="img-title">{data.title}</h2>
        </figcaption>
      </figure>
    );
  }
}

export default ImgFigure;
