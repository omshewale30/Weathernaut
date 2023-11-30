// ProfileIcon.jsx
import React from 'react';
import { Link } from 'react-router-dom';


const ProfileIcon = () => {


    return (
        <div>
            <Link to="/ProfilePage" > {/* Replace "/Profile" with the actual path to your profile page */}
                <div>
                    {/* You can use an icon library or your custom icon */}

                    <img src="src/user.png" alt="Profile" />
                </div>

            </Link>
        </div>
    );
};

export default ProfileIcon;
