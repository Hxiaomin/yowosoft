import { Link } from 'react-router';
import "./NewStage.less";


export default class NewStage extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    	add: {
	    		//id: "",
	    		//updateTime: "",
	    		content:"",
	    		projectId: ""
	    	}
	    };

	    this.addStage = this.addStage.bind(this);
	    this.handleChange = this.handleChange.bind(this);
	    this.formData = [
	    	{title: '项目ID', name: 'projectId'},
	    	{title: '更新内容', name: 'content'}
	    	//{title: '更新时间', name: 'updateTime'},
	    ]
  	}
  	
  	handleChange(event){
  		var form = event.target.form;
	    this.setState({
	        add: {
	    		//updateTime:form.updateTime.value,
	    		content: form.content.value,
	    		projectId: form.projectId.value
	    	}
	    })
  	}

  	addStage(){
  		var _data = this.state.add;
	    Http.post('/yowosoft/stage', JSON.stringify(_data)).then((res)=>{
	      if(res.success){
	      	this.setState({
	      		add: {
		    		content:"",
		    		projectId: ""
		    	}
	    	});
	        swal("新增成功!", "", "success");
	      }else{
	        //console.log(resultMsg + '['+ resultCode +']') 
	        swal("新增失败!", res.resultMsg + '['+ res.resultCode +']', "error");
	      }
	    })
  	}
  	
  	
	render(){
		let stageEditFormData = this.formData.map((item, i) => {
			return(
				<div className="form-group" key={i}>
					<label  htmlFor={item.name} className="col-sm-2 control-label">{item.title}</label>
					<div className="col-sm-10">
						<input type="text" name={item.name} className="form-control" value={this.state.add[item.name]} onChange={this.handleChange} placeholder={item.title} />
					</div>
				</div>
			)
		});

		return (
			<div className="newStage-container">
				<Link to={'/userCenter/stage'}>返回列表</Link>
				<h4>添加项目日志</h4>
				<div className="newStageForm">
					<form name="newStage" className="form-horizontal newStage">
						{stageEditFormData}
	                  	<button type="button" className="btn btn-green fr" onClick={this.addStage}>新增</button>
					</form>
				</div>
			</div>
		)
	}	
}