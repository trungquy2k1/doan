import React, { useState } from 'react';
import styleaddpro from './Addcategory.module.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
// import Modal from 'react-modal';

// import { storage, db } from '../../../../firebase';
import { storage, db } from '../../../firebase';

function AddCategory() {
    const [imageUpload, setImageUpload] = useState();
    const [categoryname, setCategoryname] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imglogo, setImgLogo] = useState('');

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
    console.log('day là link anh: ', imageUrl);

    const uploadLogo = () => {
        if (!imageUpload) return;

        const imageRef = ref(storage, `images/Category/LogoCate/${imageUpload.name}`);

        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                console.log(url);
                setImgLogo(url);
                alert('Upload logo thành công');
            });
        });
    };

    const addProduct = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, 'Category'), {
                categoryname: categoryname,
                image: imageUrl,
                imagelogo: imglogo,
            });
            console.log('Document written with ID: ', docRef.id);
            alert('Thêm thành công');
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    return (
        // <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        //     <button onClick={() => onRequestClose()}>Trở lại</button>
        <section className={styleaddpro.todocontainer}>
            <div className={styleaddpro.todo}>
                <h1 className={styleaddpro.header}>Add Product</h1>

                <div>
                    <div>
                        <input
                            type="text"
                            placeholder="Nhập tên loại sản phẩm ..."
                            value={categoryname}
                            onChange={(e) => setCategoryname(e.target.value)}
                        />
                    </div>
                    {/* logo */}
                    <h3>Logo</h3>
                    <div>
                        <input
                            type="file"
                            onChange={(event) => {
                                setImageUpload(event.target.files[0]);
                            }}
                        />
                        <button onClick={uploadLogo}>Upload Logo</button>
                    </div>
                    {/* logo */}

                    {/* Ảnh */}
                    <h3>Ảnh</h3>
                    <div>
                        <input
                            type="file"
                            onChange={(event) => {
                                setImageUpload(event.target.files[0]);
                            }}
                        />
                        <button onClick={uploadFile}>Upload</button>
                    </div>

                    <div className={styleaddpro.btncontainer}>
                        <button type="submit" className="btn" onClick={addProduct}>
                            Thêm loại sản phẩm
                        </button>
                    </div>
                </div>
            </div>
        </section>
        // </Modal>
    );
}

export default AddCategory;
