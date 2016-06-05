import { Link } from 'react-router';
import "./StageList.less";

import Page from '../../../src/Components/page/page.jsx';

export default class StageList extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    	curPage: 1,
	    	stageList: [],
	    	stagePageInfo: {},
	    	getStageStatus: ""

	    };
	    this.removeCurStage = this.removeCurStage.bind(this);
  	}
  	getStageList(curPage){
  		this.setState({
  			getStageStatus: 'init'
  		});
  		Http.get ('/yowosoft/stage?curPage=' + curPage).then((res)=>{
	      	if(res.success){        
		        if(res.dataList.length > 0){
		        	this.setState({
			        	stageList: res.dataList,
			        	stagePageInfo: res.pageInfo,
			        	getStageStatus: 'success'
			        })   
		        }else{
		        	this.setState({
			        	getStageStatus: 'empty'
			        })   
		        }

	         
	      	}else{
		        console.log(res.resultMsg + '['+ res.resultCode +']');
		        this.setState({
		        	getStageStatus: 'fail'
		        }) 
		    }
	    })
  	}
  	removeCurStage(id){
  		var that = this;
  		swal({   
  			title: "确定删除?",   
  			text: "删除此项目记录",   
  			ype: "warning",   
  			showCancelButton: true,   
  			confirmButtonColor: "#DD6B55",   
  			confirmButtonText: "确认删除",   
  			closeOnConfirm: false }, 
  			function(){   
			    Http.get('/yowosoft/stage/remove/' + id).then((res)=>{
			      if(res.success){
			        that.getStageList(that.state.curPage);
			        swal("操作成功!", "已删除", "success");     
			      }else{
			        //console.log(res.resultMsg + '['+ res.resultCode +']');
			        swal("操作失败!", res.resultMsg + '['+ res.resultCode +']', "error");
			      }
			    })
  				
  			}
		);
  	}

  	componentWillMount(){
  		this.getStageList(this.state.curPage);
  	}
  	componentDidMount(){
  		
  	}
	render(){

		var self = this;
		var _list = this.state.stageList.map((item, i)=>{
			return(
				<tr key={i}>
					<td>{item.id}</td>
					<td>{item.projectId}</td>
					<td>{item.updateTime ? Utility.timeToDate(item.updateTime,1000) : '——'}</td>
					<td>{item.content}</td>
					<td className="oper-box">
						<Link to={'/userCenter/stageDetail/' + item.id} className="oper">详情</Link>
						<Link to={'/userCenter/stageEdit/' + item.id} className="oper">修改</Link>
						<a href="javascript:;" className="oper" onClick={()=>{this.removeCurStage(item.id)}}>删除</a>  
					</td>
				</tr>
			)
		});

		let result = () =>{
			let status;
			switch(this.state.getStageStatus)
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
			<div className="stage-container">
				<h4>项目列表</h4>
				<button type="button" className="btn btn-green addNewStage">
					<Link to="/userCenter/newStage">新增项目日志</Link>
				</button>
				
				<table className="table table-hover table-bordered table-striped">
					<thead> 
						<tr>
							<th>id</th>
							<th>项目ID</th>
							<th>更新时间</th>
							<th>内容</th>
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
					this.state.getStageStatus === 'success' ? 
					<Page 
						totalPage={this.state.stagePageInfo.totalPage} 
						selectPage={this.getStageList}
					/> : null
				}
				
				
			</div>
		)
	}	
}