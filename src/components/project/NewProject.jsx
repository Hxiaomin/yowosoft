import { Link } from 'react-router';
import "./NewProject.less";

export default class NewProject extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    	newProject: {
	    		projectName: "",
		        content: "",
		        lowestProjectFund: "",
		        highProjectFund: "",
		        startTime: "",
		        endTime: "",
		        contact: "",
		        address: "",
		        company: "",
		        qqNumber: "",
		        username: "",
		        remark: "",
		        type: ""
	        }
	    };
        this.handleChange = this.handleChange.bind(this);
        this.addProject = this.addProject.bind(this);

        this.addProjectFromData = [
        	{name: 'projectName', title: '项目名称'},
        	{name: 'content', title: '需求内容'},
        	{name: 'lowestProjectFund', title: '最少项目经费'},
        	{name: 'highProjectFund', title: '最高项目经费'},
        	{name: 'startTime', title: '需求开始时间'},
        	{name: 'endTime', title: '需求结束时间'},
        	{name: 'contact', title: '联系方式'},
        	{name: 'address', title: '联系地址'},
        	{name: 'company', title: '需求方公司单位'},
        	{name: 'qqNumber', title: '客户QQ号码'},
        	{name: 'username', title: '客户姓名'},
        	{name: 'remark', title: '附加信息'},
        	{name: 'type', title: '项目类型'}
        ]
  	}
  	handleChange(event){
	    var form = event.target.form;
	    this.setState({
	        newProject: {
	        	projectName: form.projectName.value,
		        content: form.content.value,
		        lowestProjectFund: form.lowestProjectFund.value,
		        highProjectFund: form.highProjectFund.value,
		        startTime: form.startTime.value,
		        endTime: form.endTime.value,
		        contact: form.contact.value,
		        address: form.address.value,
		        company: form.company.value,
		        qqNumber: form.qqNumber.value,
		        username: form.username.value,
		        remark: form.remark.value,
		        type: form.type.value
	        }
	    })
  	}
  	addProject(){
  		var _data = this.state.newProject;	    
	    Http.post('/yowosoft/project', JSON.stringify(_data)).then((res)=>{
	      if(res.success){
	        //console.log('新增成功');
	        swal("新增成功!", "", "success");
	        this.setState({
	        	newProject: {
	        		projectName: "",
			        content: "",
			        lowestProjectFund: "",
			        highProjectFund: "",
			        startTime: "",
			        endTime: "",
			        contact: "",
			        address: "",
			        company: "",
			        qqNumber: "",
			        username: "",
			        remark: "",
			        type: ""
	        	}
	        })
	      }else{
	        //console.log(resultMsg + '['+ resultCode +']');
	        swal("新增失败!", res.resultMsg + '['+ res.resultCode +']', "error");  
	      }
	    })
  	}
  	componentWillMount(){
  		
  	}
  	componentDidMount(){
  		
  	}
	render(){
		let addProjectFromData = this.addProjectFromData.map((item, i) => {
			return(
				<div className="form-group" key={i}>
					<label  htmlFor={item.name} className="col-sm-2 control-label">{item.title}</label>
					<div className="col-sm-10">
						<input type="text" name={item.name} className="form-control" value={this.state.newProject[item.name]} onChange={this.handleChange} placeholder={item.title} />
					</div>
				</div>
			)
		});

		return (
			<div className="NewProject">
				<div clasName="backToList">
					<Link to={'/userCenter/project'}>返回列表</Link> 
				</div>
				<h4>添加项目</h4>
				<form className="form-horizontal">
     				{addProjectFromData}
				  	<button type="button" className="btn btn-green fr" onClick={this.addProject}>添加</button>
				</form>
			</div>
		)
	}	
}