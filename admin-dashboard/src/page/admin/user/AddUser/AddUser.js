import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import './adduser.css';
import { db, auth } from '../../../../firebase';
const AddUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [user, setUser] = useState([]);

    const addUser = async (e) => {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                // ...
            });
            const docRef = await addDoc(collection(db, 'User'), {
                email: email,
                password: password,
            });
            console.log('Document written with ID: ', docRef.id);
            alert('Thêm thành công');
        } catch (e) {
            console.error('Error adding document: ', e);
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
        <section className="todo-container">
            <div className="todo">
                <h1 className="header">Add User</h1>

                <div>
                    <div>
                        <input type="text" placeholder="Nhập email ..." onChange={(e) => setEmail(e.target.value)} />
                        <input
                            type="text"
                            placeholder="Nhập password ..."
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="btn-container">
                        <button type="submit" className="btn" onClick={addUser}>
                            Thêm
                        </button>
                    </div>
                </div>

                <div className="todo-content">
                    {user?.map((users, i) => (
                        <p key={i}>{users.email}</p>
                    ))}
                    {/* {todos?.map((todo, i) => (
                        <p key={i}>{todo.password}</p>
                    ))} */}
                </div>
            </div>
        </section>
    );
};

export default AddUser;
