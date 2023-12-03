import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

// import { db } from '../../../../firebase';
import { db } from '../../../firebase';

import config from '../../../configRoute';

import Home from '../../Home/Home';

import '../../admin/style/style.css';
import './category.css';

const Category = () => {
    const [category, setCategory] = useState([]);
    // const [stt, setStt] = useState(1);
    const [categoryData, setCategoryData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const fetchCategory = async () => {
        await getDocs(collection(db, 'Category')).then((querySnapshot) => {
            // const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            // setProduct(newData);
            const newData = querySnapshot.docs.map((doc, index) => ({ ...doc.data(), id: doc.id, stt: index + 1 }));
            setCategoryData(newData);
            setCategory(newData);
            console.log('category:', category, 'Newdata: ', newData);
        });
    };

    const handleSearch = () => {
        const filteredCategory = categoryData.filter((category) =>
            category.categoryname.toLowerCase().includes(searchKeyword.toLowerCase()),
        );
        // setSearchResult(filteredProducts);

        setCategory(filteredCategory);
    };
    const handleSearchKeyword = (event) => {
        setSearchKeyword(event.target.value);
    };

    const deleteCategory = async (categoryId) => {
        try {
            // await deleteDoc(doc(db, 'Product', productId));
            await deleteDoc(doc(db, 'Category', categoryId));
            console.log('Document successfully deleted!');
            // Gọi lại fetchPost để cập nhật danh sách sản phẩm sau khi xóa
            fetchCategory();
        } catch (error) {
            console.error('Error removing document: ', error);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    return (
        <Home>
            {/* Giao diện màn hình user */}
            <div>
                <div className="adminhead">
                    <h2>Category</h2>
                    <div style={{ display: 'flex' }}>
                        <input placeholder="Search" value={searchKeyword} onChange={handleSearchKeyword} />
                        <button className="btnsearch" onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                    <NavLink to={config.routes.addcategory}>
                        <button className="btnsearch">Thêm</button>
                    </NavLink>
                </div>
                <div>
                    <div
                        style={{
                            // display: 'flex',
                            // justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px',
                        }}
                    >
                        <div className="labelviewcate">
                            <div className="labelstt">
                                <h3>STT</h3>
                            </div>
                            <div className="labelanhcate">
                                <h3>Ảnh </h3>
                            </div>

                            <div className="labeltencate">
                                <h3>Tên loại sản phẩm</h3>
                            </div>
                        </div>
                        {category.map((categories, index) => (
                            <div key={index}>
                                <div className="containerviewcate">
                                    <div className="viewcate">
                                        <div className="sttcate">
                                            <h3 style={{ textAlign: 'center' }}>{categories.stt}</h3>
                                        </div>
                                        <div className="anhcate">
                                            <img src={categories.image} style={{ width: 150, height: 110 }} />
                                        </div>

                                        <div className="tencate">
                                            <h3 style={{ textAlign: 'center' }}>{categories.categoryname}</h3>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            width: 105,
                                            flex: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            // alignContent: 'center',
                                            // borderRightWidth: 1,
                                        }}
                                    >
                                        <button onClick={() => deleteCategory(categories.id)}>
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

export default Category;
