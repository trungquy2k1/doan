import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import Modal from 'react-modal';
// import { db, auth } from '../../../firebase';
import { db, auth } from '../../../../firebase';
// import config from '../../../configRoute';
// import Home from '../../Home/Home';
// import '../style/style.css';

const EditUser = ({ userID1, isOpen, onRequestClose, fetchupdate }) => {
    const [email, setEmail] = useState('');
    const [usernamenhap, setUsername] = useState('');
    const [passwordnhap, setPassword] = useState('');

    const updatedUser = async (userid) => {
        const Update = doc(db, 'User', userid);
        // Set the "capital" field of the city 'DC'
        await updateDoc(Update, {
            // capital: true,
            email: email,
            username: usernamenhap,
            password: passwordnhap,
        });
        fetchupdate = fetchupdate;
        alert('thành công');
    };
    // useEffect(()=>(

    // ),[])

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <button onClick={() => onRequestClose()}>Hủy</button>
            <h2>Sửa thông tin tài khoản</h2>
            <div>
                <input
                    type="text"
                    placeholder="Email đăng nhập"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Tên đăng nhập"
                    value={usernamenhap}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Mật khẩu"
                    value={passwordnhap}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <h1> {userID1} </h1>
            <button onClick={() => updatedUser(userID1)}>Lưu</button>
            {/* <button>Lưu</button> */}
        </Modal>
    );
};

export default EditUser;

// import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

// import { db, storage } from '../../../../firebase';
// import config from '../../../../configRoute';
// import Home from '../../../Home/Home';
// import '../../style/style.css';
// import stylepro from './product.module.css';
// import Modal from 'react-modal';
// // import './product.css';
// const Product = () => {
//     const [product, setProduct] = useState([]);
//     const [productData, setProductData] = useState([]);

//     // const [stt, setStt] = useState(1);
//     const [imageUpload, setImageUpload] = useState();

//     //  const [imageUrl, setImageUrl] = useState('');
//     const [searchKeyword, setSearchKeyword] = useState('');
//     const [productName, setProductName] = useState('');
//     const [productPrice, setProductPrice] = useState('');
//     const [category, setCategory] = useState('');
//     const [description, setDescription] = useState('');
//     const [imageUrl, setImageUrl] = useState('');
//     const [ten, setTencu] = useState('');
//     const [catecu, setCatecu] = useState('');
//     const [giagoccu, setGiagoccu] = useState('');
//     const [giamgiacu, setGiamgiacu] = useState('');
//     const [motacu, setMotacu] = useState('');

//     const [giagoc, setGiagoc] = useState(0);
//     const [giamgia, setGiamgia] = useState(0);

//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const fetchProduct = async () => {
//         await getDocs(collection(db, 'Product')).then((querySnapshot) => {
//             // const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//             // setProduct(newData);
//             const newData = querySnapshot.docs.map((doc, index) => ({
//                 ...doc.data(),
//                 id: doc.id,
//                 stt: index + 1,
//                 // stt: querySnapshot.size - index,
//             }));
//             // .sort((a, b) => b.stt - a.stt);
//             // stt: querySnapshot.size - index;
//             setProductData(newData);
//             setProduct(newData);
//             console.log('product:', product, 'Newdata: ', newData);
//         });
//     };

//     const uploadFile = () => {
//         if (!imageUpload) return;

//         const imageRef = ref(storage, `images/${imageUpload.name}`);

//         uploadBytes(imageRef, imageUpload).then((snapshot) => {
//             getDownloadURL(snapshot.ref).then((url) => {
//                 console.log(url);
//                 setImageUrl(url);
//                 alert('Upload thành công');
//             });
//         });
//     };
//     const resulPrice = () => {
//         const resulPrice = giagoc - (giamgia / 100) * giagoc;
//         setProductPrice(resulPrice);
//     };

//     const updateProduct = async (proid) => {
//         try {
//             const Update = doc(db, 'Product', proid);
//             // Set the "capital" field of the city 'DC'
//             await updateDoc(Update, {
//                 // capital: true,
//                 name: productName,
//                 category: category,
//                 price: productPrice,
//                 giagoc: giagoc,
//                 giamgia: giamgia,
//                 description: description,
//                 image: imageUrl,
//             });
//             fetchProduct();
//             setProductName('');
//             setCategory('');
//             setGiagoc('');
//             setGiamgia('');
//             setImageUrl('');
//             alert('thành công');
//         } catch (e) {
//             console.log(e);
//         }
//     };

//     const handleSearch = () => {
//         const filteredProducts = productData.filter((product) =>
//             product.name.toLowerCase().includes(searchKeyword.toLowerCase()),
//         );
//         // setSearchResult(filteredProducts);

//         setProduct(filteredProducts);
//     };
//     const handleSearchKeyword = (event) => {
//         setSearchKeyword(event.target.value);
//     };

//     useEffect(() => {
//         fetchProduct();

//         // setProduct((prevProduct) => prevProduct.sort((a, b) => b.stt - a.stt));
//     }, []);

//     const openModal = (ten, loaicu, giagoc, giamgia, mta) => {
//         setModalIsOpen(true);
//         setTencu(ten);
//         setCatecu(loaicu);
//         setGiagoccu(giagoc);
//         setGiamgiacu(giamgia);
//         setMotacu(mta);
//     };

//     const closeModal = () => {
//         setModalIsOpen(false);
//     };
//     return (
//         <Home>
//             {/* Giao diện màn hình user */}
//             <div>

//                 <div>
//                     <div
//                         style={{
//                             // display: 'flex',
//                             flex: 1,
//                             // justifyContent: 'space-between',
//                             alignItems: 'center',
//                             borderBottom: '1px',
//                         }}
//                     >

//                         {productData.map((products, index) => (

//                                         <div key={index}>
//                                             <button
//                                                 className="btnsearch"
//                                                 onClick={() =>
//                                                     openModal(
//                                                         products.name,
//                                                         products.category,
//                                                         products.giagoc,
//                                                         products.giamgia,
//                                                         products.description,
//                                                     )
//                                                 }
//                                                 style={{ marginTop: 10 }}
//                                             >
//                                                 sửa
//                                             </button>
//                                             <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
//                                                 <button onClick={closeModal}>Hủy</button>
//                                                 <h2>Sửa thông tin tài khoản</h2>
//                                                 <div>
//                                                     <label>Tên sản phẩm cũ là: {ten} </label>
//                                                     <input
//                                                         type="text"
//                                                         // placeholder="Email đăng nhập"
//                                                         placeholder={ten}
//                                                         value={productName}
//                                                         onChange={(e) => setProductName(e.target.value)}
//                                                     />
//                                                 </div>

//                                                 <div>
//                                                     <label>Loại sản phẩm cũ là: {catecu} </label>
//                                                     <input
//                                                         type="text"
//                                                         placeholder={catecu}
//                                                         value={category}
//                                                         onChange={(e) => setCategory(e.target.value)}
//                                                     />
//                                                 </div>

//                                                 <div>
//                                                     <label>Mô tả cũ là: {motacu} </label>
//                                                     {/* <input
//                                                         type="text"
//                                                         placeholder={motacu}
//                                                         value={description}
//                                                         onChange={(e) => setDescription(e.target.value)}
//                                                     /> */}
//                                                     <textarea
//                                                         style={{ width: 1075, height: 160 }}
//                                                         placeholder={motacu}
//                                                         value={description}
//                                                         onChange={(e) => setDescription(e.target.value)}
//                                                     />
//                                                 </div>
//                                                 <div>
//                                                     <label>Giá gốc cũ là: {giagoccu} </label>
//                                                     <div style={{ display: 'flex' }}>
//                                                         <input
//                                                             style={{ width: '23%', marginRight: 5 }}
//                                                             type="text"
//                                                             placeholder={giagoccu}
//                                                             // value={giagoc}
//                                                             onChange={(e) => setGiagoc(e.target.value)}
//                                                         />
//                                                         <h4 style={{ fontSize: 24 }}>VND</h4>
//                                                     </div>
//                                                 </div>
//                                                 <div>
//                                                     <label>Giảm giá cũ là: {giamgiacu} </label>
//                                                     <div style={{ display: 'flex' }}>
//                                                         <input
//                                                             style={{ width: '23%', marginRight: 5 }}
//                                                             type="text"
//                                                             placeholder={giamgiacu}
//                                                             // value={giamgia}
//                                                             onChange={(e) => setGiamgia(e.target.value)}
//                                                         />
//                                                         <h4 style={{ fontSize: 24 }}>%</h4>
//                                                     </div>
//                                                 </div>
//                                                 <div>
//                                                     <button type="submit" className={stylepro.btn} onClick={resulPrice}>
//                                                         Kết quả
//                                                     </button>
//                                                     <p>Giá bán: {productPrice} VND</p>
//                                                 </div>

//                                                 <div style={{ marginBottom: 10 }}>
//                                                     <input
//                                                         type="file"
//                                                         onChange={(event) => {
//                                                             setImageUpload(event.target.files[0]);
//                                                         }}
//                                                     />
//                                                     <button onClick={uploadFile}>Thay ảnh</button>
//                                                 </div>
//                                                 {/* <button onClick={() => updatedUser(users.id)}>Lưu</button> */}
//                                                 <h1>id: {products.id}</h1>

//                                                 <button
//                                                     className={stylepro.btnluu}
//                                                     onClick={() => updateProduct(products.id)}
//                                                 >
//                                                     Lưu
//                                                 </button>
//                                             </Modal>
//                                         </div>

//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </Home>
//     );
// };

// export default Product;
