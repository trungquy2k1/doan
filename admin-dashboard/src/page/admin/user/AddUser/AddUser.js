import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
// import Modal from 'react-modal';

import styles from './adduser.module.css';
import { db, auth } from '../../../../firebase';
const AddUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const [user, setUser] = useState([]);

    const addUser = async (e) => {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // console.log(user);
                // ...
            });
            const docRef = await addDoc(collection(db, 'User'), {
                email: email,
                password: password,
                username: name,
            });
            console.log('Document written with ID: ', docRef.id);
            alert('Thêm thành công');
        } catch (e) {
            // console.error('Error adding document: ', e);
            const errorCode = e.code;
            let errorMessage = '';

            switch (errorCode) {
                case 'auth/email-already-in-use':
                    errorMessage = 'Email đã được sử dụng';
                    break;
                // Các mã lỗi khác và thông báo tương ứng
                default:
                    errorMessage = 'Đã xảy ra lỗi';
                    break;
            }

            alert(errorMessage);
            // alert(e);
        }
    };

    const fetchPost = async () => {
        await getDocs(collection(db, 'User')).then((querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setUser(newData);
            console.log('user:', user, 'Newdata: ', newData);
        });
    };

    useEffect(() => {
        fetchPost();
    }, []);

    return (
        // <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        //     <button onClick={() => onRequestClose()}>Trở lại</button>
        <section className={styles.todocontainer}>
            <div className={styles.todo}>
                <h1 className={styles.header}>Add User</h1>

                <div>
                    <div>
                        <input type="text" placeholder="Nhập email ..." onChange={(e) => setEmail(e.target.value)} />
                        <input
                            type="text"
                            placeholder="Nhập password ..."
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Nhập tên người dùng ..."
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className={styles.btncontainer}>
                        <button type="submit" className={styles.todocontainer} onClick={addUser}>
                            Thêm
                        </button>
                    </div>
                </div>

                <div className={styles.todocontent}>
                    {user?.map((users, i) => (
                        <p key={i}>{users.email}</p>
                    ))}
                    {/* {todos?.map((todo, i) => (
                        <p key={i}>{todo.password}</p>
                    ))} */}
                </div>
            </div>
        </section>
        // </Modal>
    );
};

export default AddUser;
