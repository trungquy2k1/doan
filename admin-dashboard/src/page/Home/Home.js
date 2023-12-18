// import { Children } from 'react';
import Header from '../Header/Header';
import Siderbar from '../Sidebar/Sidebar';
import './Home.css';
const Home = ({ children }) => {
    return (
        <div className="Home">
            <Header />
            <div className="containerHome">
                <div>
                    <Siderbar checkClick />
                </div>
                {/* <h1>Đây là trang Admin</h1> */}
                <div className="rightcontainer">{children}</div>
            </div>
        </div>
    );
};

export default Home;
