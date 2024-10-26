import './errorPage404.css';
import imgUrlError from '../../../assets/pexels-cottonbro-studio-7191423.jpg';


export { };
export const ErrorPage404 = () => {
    let image404 = `radial-gradient(#25236E82, #4A5ECB75), url(${imgUrlError})`;

    return (
        <section className='section404' style={{ backgroundImage: image404 }}>
            <div className="container">
                <div className="container404">
                    <h1>404</h1>
                    <h2>We've Got an Error</h2>
                </div>
            </div>
        </section>
    );
}
