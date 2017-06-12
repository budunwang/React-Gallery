require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//获取图片信息
let imageDatas = require('../data/imageDatas.json');

//将路径信息赋值给图片
imageDatas = ((imageDatasArr) => {
	imageDatasArr.map((value, index, array1) => {
		let singleImageData = value;
		singleImageData.imageURL = require('..images' + singleImageData.fileName);
		array1[index] = singleImageData;
	})
	return imageDatasArr;
})(imageDatas);

class AppComponent extends React.Component {
  render() {
    return (
      	<section className="stage">
      		<section className="img-sec">
      		</section>
      		<nav className="controller-nav">
      		</nav>
      	</section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
