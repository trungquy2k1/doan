import React, { useState } from 'react';
import './Addcategory.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

// import { storage, db } from '../../../../firebase';
import { storage, db } from '../../../firebase';

function AddCategory() {
    const [imageUpload, setImageUpload] = useState();
    const [categoryname, setCategoryname] = useState('');
    const [imageUrl, setImageUrl] = useState('');

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

    const addProduct = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, 'Category'), {
                categoryname: categoryname,
                image: imageUrl,
            });
            console.log('Document written with ID: ', docRef.id);
            alert('Thêm thành công');
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    return (
        <section className="todo-container">
            <div className="todo">
                <h1 className="header">Add Product</h1>

                <div>
                    <div>
                        <input
                            type="text"
                            placeholder="Nhập tên loại sản phẩm ..."
                            value={categoryname}
                            onChange={(e) => setCategoryname(e.target.value)}
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

                    <div className="btn-container">
                        <button type="submit" className="btn" onClick={addProduct}>
                            Thêm loại sản phẩm
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AddCategory;
