import React from "react";

const UsersList = ({ usersData, userIsDeleting, deleteUser }) => {
  return (
    <div className="users-box">
      {usersData?.map((user) => {
        return (
          <div key={user._id} className="user-card">
            <h3>{user.name}</h3>
            <p>{user.age}</p>
            <p>{user.jobTitle}</p>
            <button
              onClick={() => deleteUser(user._id)}
              disabled={userIsDeleting}
            >
              X
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default UsersList;
