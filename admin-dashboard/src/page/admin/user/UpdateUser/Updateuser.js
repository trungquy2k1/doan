import React, { useState, useEffect } from 'react';
import { collection, getDoc, updateDoc, doc } from 'firebase/firestore';

// import { db, auth } from '../../../firebase';
import { db, auth } from '../../../../firebase';
// import config from '../../../configRoute';
// import Home from '../../Home/Home';
// import '../style/style.css';

const EditUser = () => {
    const [user, setUser] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const fetchUser = async () => {
        await getDoc(collection(db, 'User'), user.id).then((querySnapshot) => {
            const userData = querySnapshot.data();
            setUsername(userData.username);
            setPassword(userData.password);
        });
    };

    // const updateUser = async () => {
    //     const updatedData = {
    //         username,
    //         password,
    //     };
    //     const docRef = doc(db, 'users', 'doc1');
    //     await updateDoc(docRef, {
    //         username: 'newUsername',
    //         password: 'newPassword',
    //     });
    //     await updateDoc(doc(db, 'User', user.id), updatedData);

    //     // Update user information in Firebase Authentication
    //     const user = await auth.currentUser; // Get current user information
    //     if (user) {
    //         await user.updateEmail(username); // Update user email
    //         await user.updatePassword(password); // Update user password
    //     }

    //     console.log('User successfully updated!');
    // };

    const updateUser = async () => {
        const updatedData = {
            username,
            password,
        };

        // Thay đổi code như sau:
        // await updateDoc(collection(db, 'User'), user.id, updatedData);

        const docRef = doc(db, 'User', user.id);
        await updateDoc(docRef, updatedData);

        // Update user information in Firebase Authentication
        const user = await auth.currentUser; // Get current user information
        if (user) {
            await user.updateEmail(username); // Update user email
            await user.updatePassword(password); // Update user password
        }

        console.log('User successfully updated!');
    };
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div>
            <h2>Sửa thông tin tài khoản</h2>
            <div>
                <input
                    type="text"
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={updateUser}>Lưu</button>
        </div>
    );
};

export default EditUser;
