import "./Banner.less";

export default class Banner extends React.Component{
	constructor(props) {
	    super(props);
  	}
	render(){
		return (
			<div className="banner mt57">
				<div className="text">
                    <h1 className="main"><div className="h1-div">放&nbsp;心</div><div className="h1-div">有&nbsp;我</div></h1>
                    <span className="other">专业提供微信开发、网站建设、系统开发、升级运维等服务</span>
                    <span className="contact"><a title="联系我们" href="#module-five">联系我们</a></span>
                </div>
			</div>
		)
	}	
}