import { Link } from 'react-router';
import "./Project.less";

import Page from '../../../src/Components/page/page.jsx';

export default class Project extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    	curPage: 1,
	    	projectList: [],
	    	projectPageInfo: {},
	    	getProjectStatus: ""
	    };
		this.getProjectList = this.getProjectList.bind(this);
  	}

	componentWillMount(){
		this.getProjectList(this.state.curPage);
	}
  	getProjectList(curPage){
  		this.setState({
  			getProjectStatus: 'init'
  		});
  		Http.get ('/yowosoft/project?curPage=' + curPage).then((res)=>{
	      	if(res.success){        
		        if(res.dataList.length > 0){
		        	this.setState({
			        	projectList: res.dataList,
			        	projectPageInfo: res.pageInfo,
			        	getProjectStatus: 'success'
			        });
					console.info(this.state.projectList);
		        }else{
		        	this.setState({
			        	getProjectStatus: 'empty'
			        })   
		        }

	         
	      	}else{
		        console.log(res.resultMsg + '['+ res.resultCode +']');
		        this.setState({
		        	getProjectStatus: 'fail'
		        }) 
		    }
	    })
  	}

  	componentDidMount(){
  		
  	}
	render(){

		var self = this;
		var _list = this.state.projectList.map((item, i)=>{
			return(
				<tr key={i}>
					<td>{item.projectName}</td>
					<td>{item.startTime ? Utility.timeToDate(item.startTime,1000) : '——'}</td>
					<td>{item.endTime ? Utility.timeToDate(item.endTime,1000):'——'}</td>
					<td>{item.submitTime ? Utility.timeToDate(item.submitTime,1000) :'——'}</td>
					<td>{item.status}</td>
					<td>{item.progress}</td>
					<td className="oper-box">
						<Link to={'/userCenter/projectDetail/' + item.id} className="oper">详情</Link>
						<Link to={'/userCenter/projectEdit/' + item.id} className="oper">修改</Link>
					</td>
				</tr>
			)
		});

		let result = () =>{
			let status;
			switch(this.state.getProjectStatus)
			{	
				case 'init':
					status = <tr><td colSpan="7" className="text-center">正在加载中...</td></tr>
					break;
				case 'empty':
					status = <tr><td colSpan="7" className="text-center">暂无数据</td></tr>
					break;
				case 'success':
					status = _list;
					break;
				case 'fail':
					status = <tr><td colSpan="7" className="text-center">加载失败</td></tr>
					break;
			}
			
			return status;
		};

		return (
			<div className="project-container">
				<h4>项目列表</h4>
				<button type="button" className="btn btn-green addNewProject">
					<Link to="/userCenter/newProject">新增项目</Link>
				</button>
				<table className="table table-hover table-bordered table-striped">
					<thead> 
						<tr>
							<th>项目名称</th>
							<th>开始时间</th>
							<th>结束时间</th>
							<th>提交时间</th>
							<th>项目状态</th>
							<th>项目进度</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						{result()}		
					</tbody>
					<tfoot>
						
					</tfoot>
				</table>
				{	
					this.state.getProjectStatus === 'success' ? 
					<Page 
						totalPage={this.state.projectPageInfo.totalPage} 
						selectPage={this.getProjectList}
					/> : null
				}
				
				
			</div>
		)
	}	
}