import React from 'react';

class ControllerUnit extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  //索引点击事件
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
    //根据图片状态加载索引条
    let controllerUnitClassName = 'controller-unit';
    controllerUnitClassName = this.props.arrange.isCenter? controllerUnitClassName + ' is-center':controllerUnitClassName;
    controllerUnitClassName = this.props.arrange.isInverse? controllerUnitClassName + ' is-inverse':controllerUnitClassName;

    return (
      <span className={controllerUnitClassName}
            onClick={this.handleClick}></span>
    )
  }
}

export default ControllerUnit;
