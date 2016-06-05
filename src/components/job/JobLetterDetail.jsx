import { Link } from 'react-router';
import "./JobLetterDetail.less"

export default class JobLetterDetail extends React.Component{
	constructor(props) {
	    super(props);

	    this.state = {
	    	currentJobLetterDetail: [],
	    }
  	}
  	
  	getJobLetter(id){
  		Http.get('/yowosoft/job/' + id).then((res)=>{
	      if(res.success){
	        //console.log(res);
	        this.setState({
	        	currentJobLetterDetail: res.data
	        })
	      }else{
	        //console.log(res.resultMsg + '['+ res.resultCode +']')
	      }
	    })
  	}
  	componentWillMount(){
  		this.getJobLetter(this.props.params.id)
  	}
  	

	render(){
		if(this.state.currentJobLetterDetail.accessoryPaths instanceof Array){ 
			var downloadList = this.state.currentJobLetterDetail.accessoryPaths.map((item, i) => {				
				return(
					<p clasName="text-left" key={i}>
						<a href={item} target="_blank" >下载</a>
					</p>
				)
			});
		}
		
		return (
			<div className="JobLetterDetail-container">
				<div clasName="backToList">
					<Link to={'/userCenter/job'}>>>返回列表</Link> 
				</div>
				<h4>个人求职简历信息</h4>
				<div className="userJobInfo">
					<div className="userInfoName">
				 		<h3>{this.state.currentJobLetterDetail.name}</h3>
				 	</div>
				 	<div className="userInfoDetail">
				 		<p className="text-left">性别：{this.state.currentJobLetterDetail.sex}</p>
				 		<p className="text-left">联系方式：{this.state.currentJobLetterDetail.contact}</p>
				 		<p className="text-left">学历：{this.state.currentJobLetterDetail.highestDegree}</p>
				 		<p className="text-left">求职意向：{this.state.currentJobLetterDetail.jobIntension}</p>
				 		<p className="text-left">技能：{this.state.currentJobLetterDetail.professionalSkill}</p>
				 		<p className="text-left">学习经历：{this.state.currentJobLetterDetail.studyExperience}</p>
				 		<p className="text-left">工作经历：{this.state.currentJobLetterDetail.workExperience}</p>
				 		<p className="text-left">自我评价：{this.state.currentJobLetterDetail.selfAssessment}</p>
				 		<p className="text-left">QQ号码：{this.state.currentJobLetterDetail.qqNumber}</p>
				 		{downloadList}
				 	</div>
				</div>
			</div>
		)
	}	
}

