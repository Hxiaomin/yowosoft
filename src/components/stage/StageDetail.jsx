import { Link } from 'react-router';
import "./stageDetail.less";


export default class StageDetail extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    	curStageDetail: {},
	    };
	    
  	}
  	componentWillMount(){
  		this.getStageDetail(this.props.params.id)
  	}
  	//获取项目详情
  	getStageDetail(id){
  		Http.get('/yowosoft/stage/' + id).then((res)=>{
	      if(res.success){
	        this.setState({
	        	curStageDetail: res.data
	        })
	      }else{
	        console.log(res.resultMsg + '['+ res.resultCode +']')
	      }
	    })
  	}
  	
  	
	render(){
		return (
			<div className="stageDetail">
				<div clasName="backToList">
					<Link to={'/userCenter/stage'}>返回列表</Link> 
				</div>
				<h4>项目详情</h4>
				<div className="stageInfo">
					<p>id:{this.props.params.id}</p>
					<p>updateTime: {this.state.curStageDetail.updateTime ? Utility.timeToDate(this.state.curStageDetail.updateTime,1000) : '——'}</p>
					<p>content: {this.state.curStageDetail.content}</p>
					<p>projectId: {this.state.curStageDetail.projectId}</p>
				</div>
			</div>
		)
	}	
}