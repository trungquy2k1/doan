// import React, { useState } from 'react';
// import './Addproduct.css';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { collection, addDoc } from 'firebase/firestore';

// import { storage, db } from '../../../../firebase';

// function AddProduct() {
//     const [imageUpload, setImageUpload] = useState();
//     const [productName, setProductName] = useState('');
//     const [productPrice, setProductPrice] = useState('');
//     const [giagoc, setGiagoc] = useState(0);
//     const [giamgia, setGiamgia] = useState(0);

//     const [category, setCategory] = useState('');
//     const [description, setDescriptione] = useState('');

//     const [imageUrl, setImageUrl] = useState('');

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
//     console.log('day là link anh: ', imageUrl);
//     const resulPrice = () => {
//         const resulPrice = giagoc - (giamgia / 100) * giagoc;
//         setProductPrice(resulPrice);
//     };
//     const addProduct = async (e) => {
//         e.preventDefault();

//         try {
//             const docRef = await addDoc(collection(db, 'Product'), {
//                 name: productName,
//                 category: category,
//                 price: productPrice,
//                 giagoc: giagoc,
//                 giamgia: giamgia,
//                 description: description,
//                 image: imageUrl,
//             });
//             console.log('Document written with ID: ', docRef.id);
//             alert('Thêm thành công');
//         } catch (e) {
//             console.error('Error adding document: ', e);
//         }
//     };

//     return (
//         <section className="todo-container">
//             <div className="todo">
//                 <h1 className="header">Add Product</h1>

//                 <div>
//                     <div>
//                         <input
//                             type="text"
//                             placeholder="Nhập tên sản phẩm ..."
//                             value={productName}
//                             onChange={(e) => setProductName(e.target.value)}
//                         />
//                         <input
//                             type="text"
//                             placeholder="Nhập loại sản phẩm ..."
//                             value={category}
//                             onChange={(e) => setCategory(e.target.value)}
//                         />
//                         <div style={{ display: 'flex' }}>
//                             <input
//                                 type="text"
//                                 placeholder="Nhập giá gốc ..."
//                                 // value={giagoc}
//                                 onChange={(e) => setGiagoc(e.target.value)}
//                                 style={{ width: '23%', marginRight: 5 }}
//                             />
//                             <h4 style={{ fontSize: 24 }}>VND</h4>
//                         </div>
//                         <div style={{ display: 'flex' }}>
//                             <input
//                                 type="text"
//                                 placeholder="Nhập giảm giá ..."
//                                 // value={giamgia}
//                                 onChange={(e) => setGiamgia(e.target.value)}
//                                 style={{ width: '23%', marginRight: 5 }}
//                             />
//                             <h4 style={{ fontSize: 24 }}>%</h4>
//                         </div>

//                         <div>
//                             <button type="submit" className="btn" onClick={resulPrice}>
//                                 Kết quả
//                             </button>
//                             <p>Giá bán: {productPrice} VND</p>
//                         </div>

//                         <textarea
//                             style={{ width: 1075, height: 200 }}
//                             placeholder="Nhập mô tả ..."
//                             value={description}
//                             onChange={(e) => setDescriptione(e.target.value)}
//                         />
//                     </div>
//                     <div>
//                         <input
//                             type="file"
//                             onChange={(event) => {
//                                 setImageUpload(event.target.files[0]);
//                             }}
//                         />
//                         <button onClick={uploadFile}>Upload</button>
//                     </div>

//                     <div className="btn-container">
//                         <button type="submit" className="btn" onClick={addProduct}>
//                             Thêm sản phẩm
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default AddProduct;

import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import Modal from 'react-modal';
// import firebase from 'firebase/app';
// import { firebaseConfig } from '../../../../firebase';
import styles from './Addproduct.module.css';
import { storage, db } from '../../../../firebase';

function AddProduct() {
    const [imageUpload, setImageUpload] = useState();

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const [giagoc, setGiagoc] = useState(0);
    const [giamgia, setGiamgia] = useState(0);

    // const [variations, setVariations] = useState([]);

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
    console.log('day là link anh: ', imageUrl);

    const resulPrice = () => {
        const resulPrice = giagoc - (giamgia / 100) * giagoc;
        setProductPrice(resulPrice);
    };

    const addProduct = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, 'Product'), {
                name: productName,
                category: category,
                price: productPrice,
                giagoc: giagoc,
                giamgia: giamgia,
                description: description,
                image: imageUrl,
                // timestamp: fieldValue.serverTimestamp(),
                // variations: variations,
            });
            console.log('Document written with ID: ', docRef.id);
            alert('Thêm thành công');
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    // const addProduct = async (e) => {
    //     e.preventDefault();

    //     try {
    //         // Kiểm tra xem loại sản phẩm có tồn tại trong danh sách loại sản phẩm hay không
    //         const categoriesSnapshot = await getDoc(collection(db, 'Category'));
    //         const categoriesData = categoriesSnapshot.docs.map((doc) => doc.data().category);
    //         if (!categoriesData.includes(category)) {
    //             alert('Loại sản phẩm không tồn tại!');
    //             return;
    //         }

    //         const docRef = await addDoc(collection(db, 'Product'), {
    //             name: productName,
    //             category: category,
    //             price: productPrice,
    //             giagoc: giagoc,
    //             giamgia: giamgia,
    //             description: description,
    //             image: imageUrl,
    //         });
    //         console.log('Document written with ID: ', docRef.id);
    //         alert('Thêm thành công');
    //     } catch (e) {
    //         console.error('Error adding document: ', e);
    //     }
    // };

    // import { collection, addDoc } from 'firebase/firestore';

    // ...

    // const addProduct = async (e) => {
    //     e.preventDefault();

    //     try {
    //         // Kiểm tra xem loại sản phẩm có tồn tại trong danh sách loại sản phẩm hay không
    //         const categoriesSnapshot = await getDoc(collection(db, 'Categories'));
    //         const categoriesData = categoriesSnapshot.docs.map((doc) => doc.data().category);
    //         if (!categoriesData.includes(category)) {
    //             alert('Loại sản phẩm không tồn tại!');
    //             return;
    //         }

    //         const productData = {
    //             name: productName,
    //             category: category,
    //             price: productPrice,
    //             giagoc: giagoc,
    //             giamgia: giamgia,
    //             description: description,
    //             image: imageUrl,
    //         };

    //         const docRef = await addDoc(collection(db, 'Product'), productData);
    //         console.log('Document written with ID: ', docRef.id);
    //         alert('Thêm thành công');
    //     } catch (e) {
    //         console.error('Error adding document: ', e);
    //     }
    // };

    // const addVariation = () => {
    //     const newVariation = {
    //         variationName: '',
    //         // variationPrice: '',
    //     };
    //     setVariations([...variations, newVariation]);
    // };

    // const updateVariation = (index, field, value) => {
    //     const updatedVariations = [...variations];
    //     updatedVariations[index][field] = value;
    //     setVariations(updatedVariations);
    // };

    return (
        // <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        //     <button onClick={() => onRequestClose()}>Trở lại</button>

        <section className={styles.todocontainer}>
            <div className={styles.todo}>
                <h1 className={styles.header}>Add Product</h1>

                <div>
                    <div>
                        <input
                            type="text"
                            placeholder="Nhập tên sản phẩm ..."
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Nhập loại sản phẩm ..."
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <div style={{ display: 'flex' }}>
                            <input
                                type="text"
                                placeholder="Nhập giá gốc ..."
                                // value={giagoc}
                                onChange={(e) => setGiagoc(e.target.value)}
                                style={{ width: '23%', marginRight: 5 }}
                            />
                            <h4 style={{ fontSize: 24 }}>VND</h4>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <input
                                type="text"
                                placeholder="Nhập giảm giá ..."
                                // value={giamgia}
                                onChange={(e) => setGiamgia(e.target.value)}
                                style={{ width: '23%', marginRight: 5 }}
                            />
                            <h4 style={{ fontSize: 24 }}>%</h4>
                        </div>

                        <div>
                            <button type="submit" className={styles.btn} onClick={resulPrice}>
                                Kết quả
                            </button>
                            <p>Giá bán: {productPrice} VND</p>
                        </div>

                        <textarea
                            style={{ width: 1075, height: 200 }}
                            placeholder="Nhập mô tả ..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="file"
                            onChange={(event) => {
                                setImageUpload(event.target.files[0]);
                            }}
                        />
                        <button onClick={uploadFile}>Upload</button>
                    </div>

                    {/* <div> */}
                    {/* <h3>Loại sản phẩm:</h3>
                        {variations.map((variation, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    placeholder="Tên loại sản phẩm ..."
                                    value={variation.variationName}
                                    onChange={(e) => updateVariation(index, 'variationName', e.target.value)}
                                /> */}
                    {/* <input
                                    type="text"
                                    placeholder="Giá loại sản phẩm ..."
                                    value={variation.variationPrice}
                                    onChange={(e) => updateVariation(index, 'variationPrice', e.target.value)}
                                /> */}
                    {/* </div>
                        ))}
                        <button onClick={addVariation}>Thêm loại sản phẩm</button>
                    </div>*/}

                    <div className={styles.btncontainer}>
                        <button type="submit" className={styles.btn} onClick={addProduct}>
                            Thêm sản phẩm
                        </button>
                    </div>
                </div>
            </div>
        </section>
        // </Modal>
    );
}

export default AddProduct;
