import React from 'react'

const Home = () => {
    return (
        <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div class="card" style={{width:"18rem"}}>
                <img src="https://res.cloudinary.com/dy1hlcsyw/image/upload/v1690054759/samples/smile.jpg" class="card-img-top" alt="Home page"/>
                    <div class="card-body">
                        <h5 class="card-title">Home Title</h5>
                        <p class="card-text">Welcome TO HOme page</p>
                        <a href="#" class="btn btn-primary">Random</a>
                    </div>
            </div>
        </div>
    )
}

export default Home