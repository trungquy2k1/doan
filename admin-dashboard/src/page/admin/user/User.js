import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
// import Modal from 'react-modal';
// import 'react-modal/style.css';

import { db, auth } from '../../../firebase';
import config from '../../../configRoute';
import Home from '../../Home/Home';
import '../style/style.css';
const User = () => {
    const [user, setUser] = useState([]);
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [selectedUser, setSelectedUser] = useState(null);
    // const openModal = () => {
    //     setIsModalOpen(true);
    // };

    // const closeModal = () => {
    //     setIsModalOpen(false);
    // };
    const fetchUser = async () => {
        await getDocs(collection(db, 'User')).then((querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setUser(newData);
            console.log('user:', user, 'Newdata: ', newData);
        });
    };

    const deleteUser = async (userId) => {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa tài khoản?');
        if (confirmDelete) {
            // TODO: Xóa tài khoản tại đây
            try {
                // Xóa tài khoản trong Firebase Authentication
                const user = await auth.currentUser; // Lấy thông tin người dùng hiện tại
                if (user) {
                    await user.delete(); // Xóa tài khoản người dùng
                }

                // await deleteDoc(doc(db, 'Product', productId));
                await deleteDoc(doc(db, 'User', userId));
                console.log('Document successfully deleted!');
                // Gọi lại fetchPost để cập nhật danh sách user sau khi xóa
                fetchUser();
            } catch (error) {
                console.error('Error removing document: ', error);
            }
        }
    };

    // const editUser = async (userId) => {
    //     const userRef = collection(db, 'User'); // Create a Query object for the 'User' collection
    //     const userSnapshot = await getDocs(userRef, (query) => query.where('userId', '==', userId)); // Query the collection for the specific user
    //     if (userSnapshot.docs.length > 0) {
    //         const userData = userSnapshot.docs[0].data(); // Get the data of the first document (which should be the only one)
    //         setSelectedUser(userData);
    //     }
    // };
    // const editUser = async (userId) => {
    //     const userRef = collection(db, 'User'); // Create a Query object for the 'User' collection
    //     const userSnapshot = await getDocs(userRef, (query) => query.where('userId', '==', userId)); // Query the collection for the specific user
    //     if (userSnapshot.docs.length > 0) {
    //         const userData = userSnapshot.docs[0].data(); // Get the data of the first document (which should be the only one)
    //         setSelectedUser(userData);
    //         openModal(); // Open the modal after retrieving the user data
    //     }
    // };
    // const editUser = async (userId) => {
    //     const userRef = collection(db, 'User');
    //     const userSnapshot = await getDocs(userRef, (query) => query.where('userId', '==', userId));
    //     if (userSnapshot.docs.length > 0) {
    //         const userData = userSnapshot.docs[0].data();
    //         setSelectedUser(userData);
    //         openModal(); // Open the modal after retrieving the user data

    //         // Move the saveUser function call here
    //         saveUser(); // Call the saveUser function to update the user data
    //     }
    // };
    // const [editedUser, setEditedUser] = useState({
    //     email: '',
    //     password: '',
    // });

    // const handleInputChange = (event) => {
    //     const { name, value } = event.target;
    //     setEditedUser((prevUser) => ({
    //         ...prevUser,
    //         [name]: value,
    //     }));
    // };
    // // const saveUser = async () => {
    // //     try {
    // //         const userRef = doc(db, 'User', selectedUser.id);
    // //         await updateDoc(userRef, editedUser);

    // //         // Update email and password of the current user
    // //         const user = auth.currentUser;
    // //         if (user) {
    // //             await user.updateEmail(editedUser.email);
    // //             await user.updatePassword(editedUser.password);
    // //         }

    // //         console.log('User successfully updated!');
    // //         setSelectedUser(null);
    // //         setEditedUser({
    // //             email: '',
    // //             password: '',
    // //         });
    // //         fetchUser();
    // //     } catch (error) {
    // //         console.error('Error updating user: ', error);
    // //     }
    // // };

    // const saveUser = async () => {
    //     try {
    //         if (!selectedUser) {
    //             console.error('Error updating user: Selected user is undefined');
    //             return;
    //         }

    //         const userRef = doc(db, 'User', selectedUser.id);
    //         await updateDoc(userRef, editedUser);

    //         const user = auth.currentUser;
    //         if (user) {
    //             await user.updateEmail(editedUser.email);
    //             await user.updatePassword(editedUser.password);
    //         }

    //         console.log('User successfully updated!');
    //         setSelectedUser(null);
    //         setEditedUser({
    //             email: '',
    //             password: '',
    //         });
    //         fetchUser();
    //     } catch (error) {
    //         console.error('Error updating user: ', error);
    //     }
    // };

    // const saveUser = async () => {
    //     try {
    //         if (selectedUser) {
    //             // Make sure selectedUser is defined before using it
    //             const userRef = doc(db, 'User', selectedUser.id);
    //             await updateDoc(userRef, editedUser);

    //             // Update email and password of the current user
    //             const user = auth.currentUser;
    //             if (user) {
    //                 await user.updateEmail(editedUser.email);
    //                 await user.updatePassword(editedUser.password);
    //             }

    //             console.log('User successfully updated!');
    //             setSelectedUser(null);
    //             setEditedUser({
    //                 email: '',
    //                 password: '',
    //             });
    //             fetchUser();
    //         } else {
    //             console.error('Error updating user: Selected user is undefined');
    //         }
    //     } catch (error) {
    //         console.error('Error updating user: ', error);
    //     }
    // };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <Home>
            {/* Giao diện màn hình user */}
            <div>
                <div className="adminhead">
                    <h2>Use</h2>
                    <div style={{ display: 'flex' }}>
                        <input placeholder="Search" />
                        <button className="btnsearch">Search</button>
                    </div>
                    <NavLink to={config.routes.adduser}>
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
                        {user.map((users, index) => (
                            <div
                                key={index}
                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                <div style={{ flex: '3' }}>
                                    {/* <h3 style={{ marginBottom: 10 }}>Email</h3> */}
                                    <h3>{users.email}</h3>
                                </div>

                                <div style={{ flex: '2' }}>
                                    {/* <h3 style={{ marginBottom: 10 }}>Password</h3> */}
                                    <h3>{users.password}</h3>
                                </div>
                                <div style={{ flex: '1' }}>
                                    <button onClick={() => deleteUser(users.id)}>
                                        <span>delete</span>
                                    </button>
                                </div>
                                <div style={{ flex: '1' }}>
                                    {/* <button
                                        onClick={() => {
                                            
                                        }}
                                    >
                                        <span>Sửa</span>
                                    </button> */}
                                    <NavLink to={config.routes.edituser}>
                                        <button className="btnsearch">sửa</button>
                                    </NavLink>
                                </div>
                                {/* <Modal
                                    isOpen={isModalOpen}
                                    onRequestClose={closeModal}
                                    contentLabel="Edit User Modal"
                                    appElement={document.getElementById('root')}
                                >
                                    <h2>Sửa thông tin người dùng</h2>
                                    {selectedUser && (
                                        <div>
                                            <h3>Email</h3>
                                            <input
                                                type="text"
                                                name="email"
                                                value={editedUser.email}
                                                onChange={handleInputChange}
                                            />
                                            <h3>Password</h3>
                                            <input
                                                type="password"
                                                name="password"
                                                value={editedUser.password}
                                                onChange={handleInputChange}
                                            />
                                            <button onClick={() => saveUser(users.id)}>Lưu</button>
                                        </div>
                                    )}
                                    <button onClick={closeModal}>Đóng</button>
                                </Modal> */}
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

export default User;
