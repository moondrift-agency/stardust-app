const SideNav = (props) => {
    return(
        <div className="card">
            <div className="card-header">
                <h5 className="card-title">Top 5 des posteurs</h5>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    <li className="list-group-item">An item</li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                    <li className="list-group-item">A fourth item</li>
                    <li className="list-group-item">And a fifth one</li>
                </ul>
            </div>
        </div>
    );
}

export default SideNav;