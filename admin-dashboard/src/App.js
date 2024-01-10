// import './App.css';
// // import Header from './Screen/component/Header/Header';
// import Siderbar from './page/Sidebar/Sidebar';
// import Home from './page/Home/Home';
// import Todo from './page/registerandlogin/testfirebase/Testfirebase';
// import AddUser from './page/admin/user/AddUser/AddUser';

// import Tippy from './page/registerandlogin/testfirebase/Testpippy';
// import AddProduct from './page/admin/product/Addproduct/Addproduct';
// import Product from './page/admin/product/Product';
// function App() {
//     return (
//         <div className="App">
//             {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header> */}
//             <div>
//                 <AddProduct />
//             </div>
//         </div>
//     );
// }

// export default App;

//_____________________________________--------------------------------------------------------------

import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Login from './page/registerandlogin/Login/Login';
import Home from './page/Home/Home';
import User from './page/admin/user/User';
// import Product from './page/admin/product/Product';
import Product from './page/admin/product/View/Product';
import Cart from './page/admin/cart/Cart';
import AddUser from './page/admin/user/AddUser/AddUser';
import AddProduct from './page/admin/product/Addproduct/Addproduct';
import EditUser from './page/admin/user/UpdateUser/Updateuser';
import Category from './page/Category/ViewCategory/Category';
import AddCategory from './page/Category/AddCategory/Addcategory';
import ListOrder from './page/ListOrder/OrderView/ListOrder';
// import Register from './Screen/registerandlogin/Register/Register';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route exact path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/user" element={<User />} />
            <Route path="/adduser" element={<AddUser />} />
            <Route path="/product" element={<Product />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/category" element={<Category />} />
            <Route path="addcategory" element={<AddCategory />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/edituser" element={<EditUser />} />
            <Route path="/listorder" element={<ListOrder />} />

            {/* <Route path="/signup" element={<Register />} /> */}
        </Routes>
    );
};

export default App;
