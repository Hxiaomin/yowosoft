import { Link } from 'react-router';
import "./stageEdit.less";


export default class StageEdit extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    	edit: {
	    		id: "",
	    		updateTime: "",
	    		content:""
	    		//projectId: "",
	    	}
	    };
	    
	    this.projectId = "";

	    this.editStageInfo = this.editStageInfo.bind(this);
	    this.handleChange = this.handleChange.bind(this);
	    this.formData = [
	    	{title: '更新内容', name: 'content'},
	    	{title: '更新时间', name: 'updateTime'}
	    ]
  	}
  	componentWillMount(){
  		this.getStageDetail(this.props.params.id);
  	}
  	//获取日志详情
  	getStageDetail(id){
  		Http.get('/yowosoft/stage/' + id).then((res)=>{
	      if(res.success){
	        this.setState({
	        	edit: {
		    		//id: "",
		    		updateTime: res.data.updateTime,
		    		content: res.data.content
		    		//projectId: "",
		    	}
	        });
	        this.projectId = res.data.id;
	      }else{
	        console.log(res.resultMsg + '['+ res.resultCode +']')
	      }
	    })
  	}
  	handleChange(event){
  		var form = event.target.form;
	    this.setState({
	        edit: {
	    		updateTime:form.updateTime.value,
	    		content: form.content.value
	    	}
	    })
  	}

  	editStageInfo(){
  		var _data = this.state.edit;
  		this.state.edit.id = this.projectId;
	    var id = this.projectId;    
	    Http.post('/yowosoft/stage/' + id, JSON.stringify(_data)).then((res)=>{
	      if(res.success){
	        swal("修改成功!", "", "success");
	      }else{
	        //console.log(resultMsg + '['+ resultCode +']') 
	        swal("修改失败!", res.resultMsg + '['+ res.resultCode +']', "error");
	      }
	    })
  	}
  	
  	
	render(){
		let stageEditFormData = this.formData.map((item, i) => {
			return(
				<div className="form-group" key={i}>
					<label  htmlFor={item.name} className="col-sm-2 control-label">{item.title}</label>
					<div className="col-sm-10">
						<input type="text" name={item.name} className="form-control" value={this.state.edit[item.name]} onChange={this.handleChange} placeholder={item.title} />
					</div>
				</div>
			)
		});

		return (
			<div className="stageEdit-container">
				<Link to={'/userCenter/stage'}>返回列表</Link>
				<h4>项目详情</h4>
				<div className="stageEditForm">
					<form name="stageEdit" className="form-horizontal stageEdit">
						{stageEditFormData}
	                  	<button type="button" className="btn btn-green fr" onClick={this.editStageInfo}>修改</button>
					</form>
				</div>
			</div>
		)
	}	
}