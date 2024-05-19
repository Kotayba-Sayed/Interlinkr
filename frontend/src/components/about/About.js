import "./about.css";


function About () {

    return (
        <>
        <div className="about-container">
            <h2 id="about">Group 17 Developers:</h2>
            <div className="developer-introduction">
                <div className="developer">
                    <h2 className="developer-name">Kotayba Sayed</h2>
                    <p className="developer-task">
                        Software Developer <br/>
                        Backend Development
                    </p>
                </div>
                <div className="developer">
                    <h2 className="developer-name">Courage Räsänen</h2>
                    <p className="developer-task">
                        Software Developer <br/>
                        Frontend Development
                    </p>
                </div>
                <div className="developer">
                    <h2 className="developer-name">Miina Mäkinen</h2>
                    <p className="developer-task">
                        Software Developer <br/>
                        Frontend Development
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}

export default About;