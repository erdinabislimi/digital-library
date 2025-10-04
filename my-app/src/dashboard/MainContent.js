import React, { useState, useEffect } from 'react';
import { FaBook, FaUserFriends, FaBookOpen } from 'react-icons/fa';
import ChartsSection from './ChartsSection'; // Import the charts section component
import pink from './pink-user.jpg';

const MainContent = () => {
  const [bookCount, setBookCount] = useState(0);
  const [borrowedCount, setBorrowedCount] = useState(0);
  const [memberCount, setMemberCount] = useState(0);
  const [newMembers, setNewMembers] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingBorrowed, setLoadingBorrowed] = useState(true);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [loadingNewMembers, setLoadingNewMembers] = useState(true);
  const [loadingRecentActivity, setLoadingRecentActivity] = useState(true);

  useEffect(() => {
    // Fetch the total books count
    fetch('https://localhost:7226/api/Libri/count')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok for total books');
        }
        return response.json();
      })
      .then(data => {
        setBookCount(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching total books:', error);
        setLoading(false);
      });

    // Fetch the count of borrowed books
    fetch('https://localhost:7226/api/Huazimi/countBorrowed')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok for borrowed books');
        }
        return response.json();
      })
      .then(data => {
        setBorrowedCount(data);
        setLoadingBorrowed(false);
      })
      .catch(error => {
        console.error('Error fetching borrowed books:', error);
        setLoadingBorrowed(false);
      });

    // Fetch the count of members (non-admin users)
    fetch('https://localhost:7226/api/Authenticate/count-users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok for members count');
        }
        return response.json();
      })
      .then(data => {
        setMemberCount(data);
        setLoadingMembers(false);
      })
      .catch(error => {
        console.error('Error fetching members count:', error);
        setLoadingMembers(false);
      });

    // Fetch the list of non-admin users (only username and email)
    fetch('https://localhost:7226/api/Authenticate/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok for new members');
        }
        return response.json();
      })
      .then(data => {
        setNewMembers(data);
        setLoadingNewMembers(false);
      })
      .catch(error => {
        console.error('Error fetching new members:', error);
        setLoadingNewMembers(false);
      });

    // Fetch the recent activity
    fetch('https://localhost:7226/api/Authenticate/recent-activity')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok for recent activity');
        }
        return response.json();
      })
      .then(data => {
        setRecentActivity(data);
        setLoadingRecentActivity(false);
      })
      .catch(error => {
        console.error('Error fetching recent activity:', error);
        setLoadingRecentActivity(false);
      });
  }, []);

  return (
    <main className="main-content container-fluid">
      {/* Stats Cards */}
      <div className="row my-4">
        {/* Total Books Card */}
        <div className="col-md-4 mb-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Books</h5>
              <p className="card-text">
                {loading ? 'Loading...' : bookCount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Total Members Card */}
        <div className="col-md-4 mb-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Members</h5>
              <p className="card-text">
                {loadingMembers ? 'Loading...' : memberCount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Books Borrowed Card */}
        <div className="col-md-4 mb-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Books Borrowed</h5>
              <p className="card-text">
                {loadingBorrowed ? 'Loading...' : borrowedCount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <ChartsSection />

      {/* Table and New Members Section */}
      <div className="row my-4">
        {/* Recent Activity Table */}
        <div className="col-md-8 mb-3">
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="mb-0">Recent Activity</h5>
            </div>
            <div className="card-body">
              {loadingRecentActivity ? (
                'Loading...'
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Activity</th>
                        <th>Date</th>
                        <th>User</th>
                        <th>Book ISBN</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentActivity.map((activity, index) => (
                        <tr key={index}>
                          <td>{activity.activity}</td>
                          <td>{new Date(activity.date).toLocaleString()}</td>
                          <td>{activity.username}</td>
                          <td>{activity.bookIsbn}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* New Members Section */}
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="mb-0">New Members</h5>
            </div>
            <div className="card-body">
              {loadingNewMembers ? (
                'Loading...'
              ) : (
                newMembers.map((member, index) => (
                  <MemberItem
                    key={index}
                    imgSrc={pink}
                    username={member.username}
                    email={member.email}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const MemberItem = ({ imgSrc, username, email }) => (
  <div className="d-flex align-items-center mb-3">
    <img
      src={imgSrc}
      alt={username}
      className="rounded-circle me-3"
      style={{ width: '30px', height: '30px' }}
    />
    <div>
      <strong>{username}</strong>
      <br />
      <small className="text-muted">{email}</small>
    </div>
  </div>
);

export default MainContent;
