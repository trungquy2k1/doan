import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Modal from 'react-modal';

import { db, storage } from '../../../../firebase';
// import config from '../../../../configRoute';
import config from '../../../../configRoute';
// import Home from '../../../Home/Home';
import Home from '../../../Home/Home';
import '../../style/style.css';
import stylepro from './product.module.css';
import TopContainer from '../../../../component/Topcontainer/TopContainer';

// import AddProduct from '../Addproduct/Addproduct';
// import './product.css';
const Product = () => {
    const [idchon, setIdchon] = useState();

    const [product, setProduct] = useState([]);
    const [productData, setProductData] = useState([]);

    // const [stt, setStt] = useState(1);
    const [imageUpload, setImageUpload] = useState();

    //  const [imageUrl, setImageUrl] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [ten, setTencu] = useState('');
    const [catecu, setCatecu] = useState('');
    const [giagoccu, setGiagoccu] = useState('');
    const [giamgiacu, setGiamgiacu] = useState('');
    const [motacu, setMotacu] = useState('');

    const [giagoc, setGiagoc] = useState(0);
    const [giamgia, setGiamgia] = useState(0);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const fetchProduct = async () => {
        await getDocs(collection(db, 'Product')).then((querySnapshot) => {
            // const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            // setProduct(newData);
            const newData = querySnapshot.docs.map((doc, index) => ({
                ...doc.data(),
                id: doc.id,
                stt: index + 1,
                // stt: querySnapshot.size - index,
            }));
            // .sort((a, b) => b.stt - a.stt);
            // stt: querySnapshot.size - index;
            setProductData(newData);
            setProduct(newData);
            console.log('product:', product, 'Newdata: ', newData);
        });
    };

    const uploadFile = () => {
        if (!imageUpload) return;

        const imageRef = ref(storage, `images/${imageUpload.name}`);

        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                console.log(url);
                setImageUrl(url);
                alert('Upload thành công');
            });
        });
    };
    const resulPrice = () => {
        const resulPrice = giagoc - (giamgia / 100) * giagoc;
        setProductPrice(resulPrice);
    };

    const updateProduct = async (productId) => {
        try {
            const productRef = doc(db, 'Product', productId);
            // Set the "capital" field of the city 'DC'
            const updatedProductData = {
                name: productName,
                category: category,
                price: productPrice,
                giagoc: giagoc,
                giamgia: giamgia,
                description: description,
                image: imageUrl,
            };
            // await updateDoc(Update, {
            //     // capital: true,
            //     name: productName,
            //     category: category,
            //     price: productPrice,
            //     giagoc: giagoc,
            //     giamgia: giamgia,
            //     description: description,
            //     image: imageUrl,
            // });
            // fetchProduct();
            await updateDoc(productRef, updatedProductData);
            await fetchProduct();
            setProductName('');
            setCategory('');
            setGiagoc('');
            setGiamgia('');
            setImageUrl('');
            alert('thành công');
        } catch (e) {
            console.log(e);
        }
    };

    const handleSearch = () => {
        const filteredProducts = productData.filter((product) =>
            product.name.toLowerCase().includes(searchKeyword.toLowerCase()),
        );
        // setSearchResult(filteredProducts);

        setProduct(filteredProducts);
    };
    const handleSearchKeyword = (event) => {
        setSearchKeyword(event.target.value);
    };

    const deleteProduct = async (productId) => {
        try {
            // await deleteDoc(doc(db, 'Product', productId));
            await deleteDoc(doc(db, 'Product', productId));
            console.log('Document successfully deleted!');
            // Gọi lại fetchPost để cập nhật danh sách sản phẩm sau khi xóa
            fetchProduct();
        } catch (error) {
            console.error('Error removing document: ', error);
        }
    };

    useEffect(() => {
        fetchProduct();

        // setProduct((prevProduct) => prevProduct.sort((a, b) => b.stt - a.stt));
    }, []);

    // const openModal = (ten, loaicu, giagoc, giamgia, mta) => {
    //     setModalIsOpen(true);
    //     setTencu(ten);
    //     setCatecu(loaicu);
    //     setGiagoccu(giagoc);
    //     setGiamgiacu(giamgia);
    //     setMotacu(mta);
    // };
    const openModal = (Proid, ten, loaicu, giagoc, giamgia, mta) => {
        const selectedProduct = product.find((products) => products.id === Proid);
        if (selectedProduct) {
            setModalIsOpen(true);
            setIdchon(Proid);
            setTencu(ten);
            setCatecu(loaicu);
            setGiagoccu(giagoc);
            setGiamgiacu(giamgia);
            setMotacu(mta);
            // console.log('id được chọn: ', userID2);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    return (
        <Home>
            {/* Giao diện màn hình user */}
            <div>
                {/* <div className="adminhead">
                    <h2>Product</h2>
                    <div style={{ display: 'flex' }}>
                        <input placeholder="Search" value={searchKeyword} onChange={handleSearchKeyword} />
                        <button className="btnsearch" onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                    <NavLink to={config.routes.addproduct}>
                        <button className="btnsearch">Thêm</button>
                    </NavLink>
                </div> */}
                {/* <button className="btnsearch" onClick={() => openModal()}>
                        Thêm
                    </button> */}
                {/* <AddUser /> */}
                {/* <AddProduct isOpen={modalIsOpen} onRequestClose={closeModal} /> */}

                <TopContainer
                    value={searchKeyword}
                    onChange={handleSearchKeyword}
                    onClick={handleSearch}
                    to={config.routes.addproduct}
                />
                <div>
                    <div
                        style={{
                            // display: 'flex',
                            flex: 1,
                            // justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px',
                        }}
                    >
                        <div className={stylepro.labelview}>
                            <div className={stylepro.labelstt}>
                                <h3>STT</h3>
                            </div>
                            <div className={stylepro.labelanh}>
                                <h3>Ảnh </h3>
                            </div>

                            <div className={stylepro.labelten}>
                                <h3>Tên sản phẩm</h3>
                            </div>
                            <div className={stylepro.labelloai}>
                                <h3>Loại</h3>
                            </div>

                            <div className={stylepro.labelmota}>
                                <h3>Mô tả</h3>
                            </div>

                            <div className={stylepro.labelgia}>
                                <h3>Giá (VND)</h3>
                            </div>
                        </div>
                        {product.map((products) => (
                            <div key={products.id}>
                                <div className={stylepro.containerview}>
                                    <div className={stylepro.view}>
                                        <div className={stylepro.stt}>
                                            <h3>{products.stt}</h3>
                                        </div>
                                        <div className={stylepro.anh}>
                                            <img src={products.image} style={{ width: 120, height: 110 }} alt="" />
                                        </div>

                                        <div className={stylepro.ten}>
                                            <h3>{products.name}</h3>
                                        </div>
                                        <div className={stylepro.loai}>
                                            <h3>{products.category}</h3>
                                        </div>
                                        {/* </div> */}
                                        {/* <div style={{ flex: '3' }}> */}

                                        <div className={stylepro.mota}>
                                            <h3>{products.description}</h3>
                                        </div>
                                        {/* // </div> */}
                                        {/* <div style={{ flex: '2' }}> */}
                                        <div className={stylepro.gia}>
                                            <h3>{products.price} VND</h3>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            width: 105,
                                            // flex: 1,
                                            // display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            // alignContent: 'center',
                                        }}
                                    >
                                        <button onClick={() => deleteProduct(products.id)}>
                                            <span>delete</span>
                                        </button>

                                        <div>
                                            <button
                                                className="btnsearch"
                                                onClick={() =>
                                                    openModal(
                                                        products.id,
                                                        products.name,
                                                        products.category,
                                                        products.giagoc,
                                                        products.giamgia,
                                                        products.description,
                                                    )
                                                }
                                                style={{ marginTop: 10 }}
                                            >
                                                sửa
                                            </button>
                                            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                                                <button onClick={closeModal}>Hủy</button>
                                                <h2>Sửa thông tin tài khoản</h2>
                                                <div>
                                                    <label>Tên sản phẩm cũ là: {ten} </label>
                                                    <input
                                                        type="text"
                                                        // placeholder="Email đăng nhập"
                                                        placeholder={ten}
                                                        value={productName}
                                                        onChange={(e) => setProductName(e.target.value)}
                                                    />
                                                </div>

                                                <div>
                                                    <label>Loại sản phẩm cũ là: {catecu} </label>
                                                    <input
                                                        type="text"
                                                        placeholder={catecu}
                                                        value={category}
                                                        onChange={(e) => setCategory(e.target.value)}
                                                    />
                                                </div>

                                                <div>
                                                    <label>Mô tả cũ là: {motacu} </label>
                                                    {/* <input
                                                        type="text"
                                                        placeholder={motacu}
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                    /> */}
                                                    <textarea
                                                        style={{ width: 1075, height: 160 }}
                                                        placeholder={motacu}
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <label>Giá gốc cũ là: {giagoccu} </label>
                                                    <div style={{ display: 'flex' }}>
                                                        <input
                                                            style={{ width: '23%', marginRight: 5 }}
                                                            type="text"
                                                            placeholder={giagoccu}
                                                            // value={giagoc}
                                                            onChange={(e) => setGiagoc(e.target.value)}
                                                        />
                                                        <h4 style={{ fontSize: 24 }}>VND</h4>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label>Giảm giá cũ là: {giamgiacu} </label>
                                                    <div style={{ display: 'flex' }}>
                                                        <input
                                                            style={{ width: '23%', marginRight: 5 }}
                                                            type="text"
                                                            placeholder={giamgiacu}
                                                            // value={giamgia}
                                                            onChange={(e) => setGiamgia(e.target.value)}
                                                        />
                                                        <h4 style={{ fontSize: 24 }}>%</h4>
                                                    </div>
                                                </div>
                                                <div>
                                                    <button type="submit" className={stylepro.btn} onClick={resulPrice}>
                                                        Kết quả
                                                    </button>
                                                    <p>Giá bán: {productPrice} VND</p>
                                                </div>

                                                <div style={{ marginBottom: 10 }}>
                                                    <input
                                                        type="file"
                                                        onChange={(event) => {
                                                            setImageUpload(event.target.files[0]);
                                                        }}
                                                    />
                                                    <button onClick={uploadFile}>Thay ảnh</button>
                                                </div>
                                                {/* <button onClick={() => updatedUser(users.id)}>Lưu</button> */}
                                                <h1>id: {products.id}</h1>

                                                <button
                                                    className={stylepro.btnluu}
                                                    // onClick={() => updateProduct(products.id)}
                                                    onClick={() => updateProduct(idchon)}
                                                >
                                                    Lưu
                                                </button>
                                            </Modal>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Home>
    );
};

export default Product;
