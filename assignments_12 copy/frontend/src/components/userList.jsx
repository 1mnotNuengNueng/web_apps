const UserList = ({ userList, deleteUser }) => {
    return (
        <div>
            <h5>User List</h5>
            <ul>
                {userList && userList.map((item) => (
                    <li key={item.userId}>
                        ID: {item.userId} | Name: {item.name} | Email: {item.email} | Role: {item.role}
                        {deleteUser && (
                            <button onClick={() => deleteUser(item.userId)}>Delete</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
