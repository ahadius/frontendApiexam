import React, { useEffect, useState } from 'react'

const Navbar = () => {
    const [role, setrole] = useState("");
    const [name, setname] = useState("");

    useEffect(() => {
        const role = localStorage.getItem('secret-login-info');
        const name = localStorage.getItem('secret-login-name');
        setrole(role)
        setname(name)
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul  className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/home">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={role==="admin"?"/add":"/"}>{role==="admin"?"Manage Activity":"Activity"}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={()=>localStorage.clear()} href='/'><b>Logout</b></a>
                        </li>
                    </ul>
                    <div className='mx-3 p-3'>
                       <b>Hi! &nbsp;{name.toUpperCase()}</b>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar