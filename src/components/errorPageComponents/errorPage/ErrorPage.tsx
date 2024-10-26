import './errorPage.css';


export const ErrorPage = () => {
    return (
        <section className='loadErrorSection'>
            <div className="container">
                <div className="loadErrorContainer">
                    <div className="loadErrorTitleContainer">
                        <h1>{"Sorry"}</h1>
                        <h2>{"We're Closed"}</h2>
                        <h3 className="minorh3">{"or experiencing a technical problem"}</h3>
                        <h3>{"Refresh to Reopen"}</h3>
                    </div>
                </div>
            </div>
        </section>
    )
}
