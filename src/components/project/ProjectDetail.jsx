import { Link } from 'react-router';
import "./ProjectDetail.less";


export default class ProjectDetail extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    	curProjectDetail: {},
	    	projectStatusValue: "",
	    	projectProgressValue: ""

	    };
	    this.editProjectStatus = this.editProjectStatus.bind(this);
	    this.editProjectProgress = this.editProjectProgress.bind(this);
	    this.handleChange = this.handleChange.bind(this);
  	}
  	componentWillMount(){
  		this.getProjectDetail(this.props.params.id)
  	}
  	//获取项目详情
  	getProjectDetail(id){
  		Http.get('/yowosoft/project/' + id).then((res)=>{
	      if(res.success){
	        this.setState({
	        	curProjectDetail: res.data
	        })
	      }else{
	        console.log(res.resultMsg + '['+ res.resultCode +']')
	      }
	    })
  	}
  	//修改项目状态
  	editProjectStatus(){
  		var _data = {
  			id: this.props.params.id,
  			status: parseInt(this.state.projectStatusValue)
  		};
  		Http.post('/yowosoft/project/status', JSON.stringify(_data)).then((res)=>{
	      if(res.success){
	        swal("修改项目状态成功!", "" , "success");
	      }else{
	        //console.log(res.resultMsg + '['+ res.resultCode +']')
	        swal("修改项目状态失败!", res.resultMsg + '['+ res.resultCode +']', "error");
	      }
	    })
  	}
  	//修改项目进度
  	editProjectProgress(){
  		var _data = {
  			id: this.props.params.id,
  			progress: parseInt(this.state.projectProgressValue)
  		};
  		Http.post('/yowosoft/project/progress', JSON.stringify(_data)).then((res)=>{
	      if(res.success){
	        swal("修修改项目进度态成功!", "" , "success");
	      }else{
	        //console.log(res.resultMsg + '['+ res.resultCode +']');
	        swal("修改项目进度失败!", res.resultMsg + '['+ res.resultCode +']', "error");
	      }
	    })
  	}
  	handleChange(event, type){
  		event.stopPropagation();
		event.preventDefault();

	    var form = event.target.form;
	    console.log(form);
	    //console.log(type, form.projectProgressValue.value);
	    if(type === 'projectStatus'){
			this.setState({
		        projectStatusValue: form.projectStatusValue.value
		    })	
	    }else if(type === 'projectProgress'){
	    	this.setState({
		        projectProgressValue: form.projectProgressValue.value
		    })
	    }
	    
  	}
	render(){
		return (
			<div className="ProjectDetail">
				<div clasName="backToList">
					<Link to={'/userCenter/project'}>返回列表</Link> 
				</div>
				<h4>项目详情</h4>
				<div className="ProjectInfo">
					<p>id:{this.props.params.id}</p>
					<p>projectName: {this.state.curProjectDetail.projectName}</p>
					<p>content: {this.state.curProjectDetail.content}</p>
					<p>startTime: {this.state.curProjectDetail.startTime ? Utility.timeToDate(this.state.curProjectDetail.startTime,1000) : '——'}</p>
					<p>endTime: {this.state.curProjectDetail.endTime ? Utility.timeToDate(this.state.curProjectDetail.endTime,1000) : '——'}</p>
					<p>contact: {this.state.curProjectDetail.contact}</p>
					<p>company: {this.state.curProjectDetail.company}</p>
					<p>address: {this.state.curProjectDetail.address}</p>
					<p>username: {this.state.curProjectDetail.username}</p>
				</div>
				
				<form className="form-inline projectStatusForm">
					<input type="number" name="projectStatusValue" className="form-control" value={this.state.projectStatusValue} onChange={(event, projectStatus)=>{this.handleChange(event, 'projectStatus')}}  />
					<button type="button" onClick={this.editProjectStatus} className="btn btn-green">修改项目状态</button>
				</form>
				
				<form className="form-inline projectProgressForm">
					<input type="number" name="projectProgressValue" className="form-control" value={this.state.projectProgressValue} onChange={(event, projectProgress)=>{this.handleChange(event, 'projectProgress')}} />
					<button type="button" onClick={this.editProjectProgress} className="btn btn-green">修改项目进度</button>
				</form>
			</div>
		)
	}	
}