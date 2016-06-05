
import { Link } from 'react-router';
import "./UserPageOper.less";

export default
class UserPageOper extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var iconArray = ["glyphicon","-user","-th","-th-list","-envelope","-book"];
        var Menu = this.props.userOperMenu.map((item, i)=> {
            return (
                <li key={i}>
                        <Link to={item.url} activeClassName="active" className={iconArray[0]+"  "+iconArray[0]+iconArray[i+1]}>{item.name}</Link>
                    </li>
            )
        });
        var avatar = this.props.userInfo.avatars ? this.props.userInfo.avatars[0] : this.props.userInfo.avatars;
        return (
            <div className="userOperNav-container">
                <div className='userInfo'>
                    <div className="triangle"></div>
                    <div className="avatarImg"><img src={avatar} alt=""/></div>
                    <div>{this.props.userInfo.name}</div>
                    <div>{this.props.userInfo.email}</div>
                </div>
                <ul className="userMenu">
					{Menu}
                </ul>
                <div className='clearfix'></div>
            </div>
        )
    }
}
