import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

import { db } from '../../../../firebase';
// import config from '../../../../configRoute';
import config from '../../../../configRoute';
// import Home from '../../../Home/Home';
import Home from '../../../Home/Home';
import '../../style/style.css';
import './product.css';
// import './product.css';
const Product = () => {
    const [product, setProduct] = useState([]);
    // const [stt, setStt] = useState(1);
    const [productData, setProductData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
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

    return (
        <Home>
            {/* Giao diện màn hình user */}
            <div>
                <div className="adminhead">
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
                </div>
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
                        <div className="labelview">
                            <div className="labelstt">
                                <h3>STT</h3>
                            </div>
                            <div className="labelanh">
                                <h3>Ảnh </h3>
                            </div>

                            <div className="labelten">
                                <h3>Tên sản phẩm</h3>
                            </div>
                            <div className="labelloai">
                                <h3>Loại</h3>
                            </div>

                            <div className="labelmota">
                                <h3>Mô tả</h3>
                            </div>

                            <div className="labelgia">
                                <h3>Giá (VND)</h3>
                            </div>
                        </div>
                        {product.map((products, index) => (
                            <div key={index}>
                                <div className="containerview">
                                    <div className="view">
                                        <div className="stt">
                                            <h3>{products.stt}</h3>
                                        </div>
                                        <div className="anh">
                                            <img src={products.image} style={{ width: 120, height: 110 }} alt="" />
                                        </div>

                                        <div className="ten">
                                            <h3>{products.name}</h3>
                                        </div>
                                        <div className="loai">
                                            <h3>{products.category}</h3>
                                        </div>
                                        {/* </div> */}
                                        {/* <div style={{ flex: '3' }}> */}

                                        <div className="mota">
                                            <h3>{products.description}</h3>
                                        </div>
                                        {/* // </div> */}
                                        {/* <div style={{ flex: '2' }}> */}
                                        <div className="gia">
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
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* <h3>passwword</h3>
                        <button>
                            <span>delete</span>
                        </button> */}
                    </div>
                </div>
            </div>
        </Home>
    );
};

export default Product;
