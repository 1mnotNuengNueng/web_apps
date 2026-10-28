import axios from 'axios'
import { useState, useEffect } from 'react'

import UserList from './userList.jsx'



function User() {
    const [userList, setUserList] = useState([]);
    // fetchCustomers function

    // fetchProvinces function

    // load customerList provinceList
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get("http://localhost:5000/api/user");
                setUserList(userResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData(); // Call the async function
    }, []);


    // delete customer

    // add customer

    return (<>
        <UserList userList={userList} />
    </>);
}


export default User
