import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Modal from 'react-modal';

import styles from './category.module.css';
// import { db } from '../../../../firebase';
import { storage, db } from '../../../firebase';
// import { db,  } from '../../../firebase';

import config from '../../../configRoute';

import Home from '../../Home/Home';

import '../../admin/style/style.css';
// import './category.css';
import AddCategory from '../AddCategory/Addcategory';

const Category = () => {
    const [idchon, setIdchon] = useState();
    const [imageUpload, setImageUpload] = useState();

    const [category, setCategory] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    // const [stt, setStt] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [cate, setCate] = useState('');
    const [catecu, setCatecu] = useState('');

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

    const updatedUser = async (cateid) => {
        const Update = doc(db, 'Category', cateid);
        // Set the "capital" field of the city 'DC'
        await updateDoc(doc(db, 'Category', cateid), {
            // capital: true,
            categoryname: cate,
            image: imageUrl,
        });
        fetchCategory();
        setCate('');
        setImageUrl('');
        alert('thành công');
    };
    const uploadFile = () => {
        if (!imageUpload) return;

        const imageRef = ref(storage, `images/Category/${imageUpload.name}`);

        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                console.log(url);
                setImageUrl(url);
                alert('Upload thành công');
            });
        });
    };
    console.log('day là link anh cate: ', imageUrl);

    useEffect(() => {
        fetchCategory();
    }, []);

    // const openModal = (ten) => {
    //     setModalIsOpen(true);
    //     setCatecu(ten);
    // };
    const openModal = (Cateid) => {
        const selectedProduct = category.find((cate) => cate.id === Cateid);
        if (selectedProduct) {
            setModalIsOpen(true);
            setIdchon(Cateid);
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
                <div className="adminhead">
                    <h2>Category</h2>
                    <div style={{ display: 'flex' }}>
                        <input placeholder="Search" value={searchKeyword} onChange={handleSearchKeyword} />
                        <button className="btnsearch" onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                    {/* <button className="btnsearch" onClick={() => openModal()}>
                        Thêm
                    </button>
                    <AddCategory isOpen={modalIsOpen} onRequestClose={closeModal} /> */}
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
                        <div className={styles.labelviewcate}>
                            <div className={styles.labelsttcate}>
                                <h3>STT</h3>
                            </div>
                            <div className={styles.labelanhcate}>
                                <h3>Ảnh </h3>
                            </div>

                            <div className={styles.labeltencate}>
                                <h3>Tên loại sản phẩm</h3>
                            </div>
                        </div>
                        {category.map((categories, index) => (
                            <div key={index}>
                                <div className={styles.containerviewcate}>
                                    <div className={styles.viewcate}>
                                        <div className={styles.sttcate}>
                                            <h3 style={{ textAlign: 'center' }}>{categories.stt}</h3>
                                        </div>
                                        <div className={styles.anhcate}>
                                            <img src={categories.image} style={{ width: 150, height: 110 }} />
                                        </div>

                                        <div className={styles.tencate}>
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
                                            // marginRight: 10
                                            // padding: 10,
                                            // alignContent: 'center',
                                            // borderRightWidth: 1,
                                        }}
                                    >
                                        <button onClick={() => deleteCategory(categories.id)}>
                                            <span>delete</span>
                                        </button>
                                        <button
                                            className="btnsearch"
                                            onClick={() => openModal(categories.id)}
                                            style={{ marginLeft: 10 }}
                                        >
                                            sửa
                                        </button>
                                        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                                            <button onClick={closeModal}>Hủy</button>
                                            <h2>Sửa thông tin tài khoản</h2>
                                            <div>
                                                {/* <label>Email cũ là: {selectedEmail} </label> */}
                                                <input
                                                    type="text"
                                                    // placeholder="Tên loại"
                                                    placeholder={catecu}
                                                    value={cate}
                                                    onChange={(e) => setCate(e.target.value)}
                                                />
                                            </div>

                                            {/* <div>
                                                <label>Tên người dùng cũ là: {selectedUsername} </label>
                                                <input
                                                    type="text"
                                                    placeholder={selectedUsername}
                                                    value={usernamenhap}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                />
                                            </div>*/}
                                            <div>
                                                <input
                                                    type="file"
                                                    onChange={(event) => {
                                                        setImageUpload(event.target.files[0]);
                                                    }}
                                                />
                                                <button onClick={uploadFile}>Upload</button>
                                            </div>
                                            {/* <div>
                                                <label>Tên người dùng cũ là: {selectedPassword} </label>
                                                <input
                                                    type="text"
                                                    placeholder={selectedPassword}
                                                    value={passwordnhap}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>  */}
                                            <button onClick={() => updatedUser(idchon)}>Lưu</button>
                                            {/* <button>Lưu</button> */}
                                        </Modal>
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
