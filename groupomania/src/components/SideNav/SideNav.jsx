const SideNav = () => {
    return(
        <div className="card">
                <div className="card-body text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png"
                         alt="User" className="img-fluid img-thumbnail rounded-circle border-0 mb-3"></img>
                        <h5 className="card-title">John Doe</h5>
                        <p className="text-secondary mb-1">Full Stack Developer</p>
                        <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                </div>
                <div className="card-footer card-sidenav-footer">
                    <button className="btn btn-light btn-sm bg-white has-icon btn-block" type="button"><i
                        className="material-icons">add</i>Follow
                    </button>
                    <button className="btn btn-light btn-sm bg-white has-icon ml-2" type="button">

                    </button>
                </div>
        </div>
    );
}

export default SideNav;