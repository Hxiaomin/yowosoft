import { Link } from 'react-router';
import "./Job.less";

import Page from '../../../src/Components/page/page.jsx';

export default class Job extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    	curPage: 1,	
	    	jobList: [],
	    	jobPageInfo: {},
	    	currentJobLetterDetail: [],
	    	getJobListStatus: ''
	    };

	    this.getJobList = this.getJobList.bind(this);
  	}

  	componentWillMount(){
  		this.getJobList(this.state.curPage);
  	}
  	
  	getJobList(curPage){
  		this.setState({
  			getJobListStatus: 'init'
  		});
  		Http.get('/yowosoft/job?curPage=' + curPage).then((res)=>{
	      if(res.success){
	      	if(res.dataList.length > 0){
	      		this.setState({
		        	jobList: res.dataList,
		        	jobPageInfo: res.pageInfo,
		        	getJobListStatus: 'success'
		        })  
	      	}else{
	      		this.setState({
	  			getJobListStatus: 'empty'
	  		});
	      	}
	          
	      }else{
	        console.log(res.resultMsg + '['+ res.resultCode +']');
	        this.setState({
	  			getJobListStatus: 'fail'
	  		});
	      }
	    });
	    //this.forceUpdate() 
  	}
  	removeJobLetter(id){
  		var that = this;
  		swal({   
  			title: "确定删除?",   
  			text: "删除此用户",   
  			ype: "warning",   
  			showCancelButton: true,   
  			confirmButtonColor: "#DD6B55",   
  			confirmButtonText: "确认删除",   
  			closeOnConfirm: false }, 
  			function(){   
			    Http.post('/yowosoft/job/remove/' + id).then((res)=>{
			      if(res.success){
			        that.getJobList(that.state.curPage);
			        swal("操作成功!", "已删除", "success");     
			      }else{
			        //console.log(res.resultMsg + '['+ res.resultCode +']');
			        swal("操作失败!", res.resultMsg + '['+ res.resultCode +']', "error");
			      }
			    })
  				
  			}
		);
  		
  	}
  	
	render(){
		var self = this;
		var _list =  this.state.jobList.map((item, i)=>{
			return(
				<tr key={i}>
					<td>{item.name}</td>
					<td>{item.sex}</td>
					<td>{item.jobIntension}</td>
					<td>{item.contact}</td>
					<td>{item.qqNumber}</td>
					<td className="oper-box">
						<Link to={'/userCenter/jobLetterDetail/' + item.id} className="oper">详情</Link>
						<a href="javascript:;" onClick={self.removeJobLetter.bind(this, item.id)} className="oper">删除</a>
					</td>
				</tr>
			)
		});

		let result = () =>{
			let status;
			switch(this.state.getJobListStatus)
			{	
				case 'init':
					status = <tr><td colSpan="7" className="text-center">正在加载中...</td></tr>
					break;
				case 'empty':
					status = <tr><td colSpan="7" className="text-center">暂无数据</td></tr>
					break;
				case 'success':
					console.info(this.state.jobList);
					status = _list;
					break;
				case 'fail':
					status = <tr><td colSpan="7" className="text-center">加载失败</td></tr>
					break;
			}
			
			return status;
		};

		return (
			<div className="job-container">
				<h4>求职信息管理</h4>
				<table className="table table-hover table-bordered table-striped">
					<thead> 
						<tr>
							<th>名字</th>
							<th>性别</th>
							<th>求职意向</th>
							<th>联系方式</th>
							<th>QQ号码</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						{result()}		
					</tbody>
					<tfoot>
						
					</tfoot>
				</table>	
				
				<Page 
					totalPage={this.state.jobPageInfo.totalPage} 
					selectPage={this.getJobList}
				/>
			</div>
		)
	}	
}

