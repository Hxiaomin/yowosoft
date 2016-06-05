export default
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            pageSize: 5,
            totalPage: 0,
            prev_enabled: false,
            next_enabled: true
        };
        this.pageStart = 1;
        this.pageEnd = this.state.pageSize;
        this.page = 0;
        this.pageHtml = [];

        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }

    componentWillMount() {
        this.state.totalPage = this.props.totalPage;
        this.state.pageSize = this.props.pageSize || 5;

        this.page = Math.ceil(this.state.totalPage / this.state.pageSize);
        this.updatePage();
    }

    componentWillReceiveProps(nextProps) {
        //console.warn("componentWillReceiveProps");
        //console.log(nextProps)
        this.state.totalPage = nextProps.totalPage;
        this.state.pageSize = nextProps.pageSize || 5;

        this.page = Math.ceil(this.state.totalPage / this.state.pageSize); //5
        this.updatePage();
    }

    componentWillUpdate() {

    }

    updatePage() {
        this.pageHtml = [];
        if (this.page === 1) this.pageEnd = this.state.totalPage;
        for (var i = this.pageStart; i <= this.pageEnd; i++) {
            this.pageHtml.push(<li key={i}>
                <a href="javascript:;" onClick={this.props.selectPage.bind(this, i)}>{i}</a>
            </li>);
        }
    }

    prevPage() {

        if (this.pageStart === 1) return;
        this.pageStart = this.pageStart - this.state.pageSize;
        this.pageEnd = this.pageStart + this.state.pageSize - 1;

    }

    nextPage() {
        //16 20 ->24

        if (this.pageEnd == this.state.totalPage) return;
        if (this.pageStart + this.state.pageSize > this.state.totalPage) return;


        this.pageStart = this.pageStart + this.state.pageSize;
        //16+5 = 21
        //是最后一页的区间了
        if (this.pageEnd + this.state.pageSize >= this.state.totalPage) {
            this.pageEnd = this.state.totalPage;
        } else {
            this.pageEnd = this.pageEnd + this.state.pageSize;
        }

    }

    render() {
        return (
            <nav>
                <ul className="pagination">
                    <li>
                        <a href="javascript:;" onClick={this.prevPage}>
                            <span>&laquo;</span>
                        </a>
                    </li>
            {this.pageHtml}
                    <li>
                        <a href="javascript:;" onClick={this.nextPage}>
                            <span>&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        )
    }
}

