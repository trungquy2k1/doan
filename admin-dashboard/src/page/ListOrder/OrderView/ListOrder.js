import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Table from 'react-bootstrap/Table';

import 'bootstrap/dist/css/bootstrap.min.css';
import { db, storage } from '../../../firebase';
import Home from '../../Home/Home';
import TopContainer from '../../../component/Topcontainer/TopContainer';
import styles from './order.module.css';

const ListOrder = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [listOrder, setListOrder] = useState([]);

    const FetchOrder = async () => {
        await getDocs(collection(db, 'Order')).then((querySnapshot) => {
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
            setListOrder(newData);
            // setProduct(newData);
            console.log('Order:', listOrder, 'Newdata: ', newData);
        });
        // };
    };

    useEffect(() => {
        FetchOrder();
    }, []);

    return (
        <Home>
            {/* Giao diện màn hình home */}
            <h1>ListOrder Screen!</h1>
            <div>
                <div>
                    <TopContainer
                        value={searchKeyword}
                        onChange={setSearchKeyword}
                        onClick={undefined}
                        to={undefined}
                    />
                </div>
                {/* <div
                    style={{
                        alignItems: 'center',
                        borderBottom: '1px',
                    }}
                >
                    <div className={styles.labelvieworder}>
                        <div className={styles.labelsttorder}>
                            <h3>STT</h3>
                        </div>
                        <div className={styles.labeltenorder}>
                            <h3>Tên người nhận </h3>
                        </div>

                        <div className={styles.labelsdtorder}>
                            <h3>Số điện thoại</h3>
                        </div>
                        <div className={styles.labeldiachiorder}>
                            <h3>Địa chỉ</h3>
                        </div>
                        <div className={styles.labelngayorder}>
                            <h3>Ngày đặt</h3>
                        </div>
                        <div className={styles.labeltienorder}>
                            <h3>Tổng tiền</h3>
                        </div>
                        <div className={styles.labeltstateorder}>
                            <h3>Trạng thái</h3>
                        </div>
                    </div>
                </div> */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Username</th>
                            <th>Tên người nhận</th>
                            <th>Số điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Ngày đặt</th>
                            <th>Số tiền</th>
                            <th>Trạng thái</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOrder.map((order) => (
                            <tr key={order.id}>
                                <th>{order.stt}</th>
                                <th> {order.username} </th>
                                <th>{order.tennguoinhan}</th>
                                <th>{order.sodienthoai}</th>
                                <th>{order.diachi}</th>
                                <th>{new Date(order.ngaydat).toLocaleDateString()}</th>
                                {/* {new Date(order.ngaydat).toLocaleDateString()} */}
                                <th>{order.tongtien}</th>
                                <th>{order.state}</th>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Home>
    );
};

export default ListOrder;
