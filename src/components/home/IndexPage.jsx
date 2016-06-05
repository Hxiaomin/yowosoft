import Banner from './Banner.jsx';
import Info from './Info.jsx';


export default class Index extends React.Component{
	constructor(props) {
	    super(props);
  	}

	render(){
		return (
			<div className="indexPage">
				<Banner />
			<Info />
			</div>
		)
	}	
}