import React, { useEffect, useState } from 'react'
import './SettingsStyle.css'
import Sidebar from '../../components/sidebar/Sidebar'
import profileimage from '../../assets/navbar/profile1.png'
import UserService from '../../services/UserService';

export default function Settings() {

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const user = UserService.getUser();
        if (user) {
            setUserData({
                username: user.username,
                email: user.email || "",
                password: "",
            })
        }
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        // Här kan du lägga till funktionalitet för att uppdatera användardatan
        // Du kan till exempel spara ändringarna i UserService eller skicka till API
        console.log('Updated user data:', userData);
        alert('Your profile has been updated!');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    return (
        <div className='settings'>

            <div className="settingswrapper">
                <div className="settingstitle">
                    <span className='settingsupdate-title'>Update Your Account</span>
                    <span className='settingsdelete-title'>Delete Your Account</span>
                </div>
                <form className='settingsform' onSubmit={handleUpdate}>
                    <label>Profile Picture</label>
                    <div className="settingsprofile-picture">
                        <img src={profileimage}
                            alt=""
                        />
                        <label htmlFor="fileinput">
                            <i className="settingsprofileicon fa-regular fa-circle-user"></i>
                        </label>
                        <input type="file" id='fileinput' style={{ display: 'none' }} />
                    </div>
                    <label>Username</label>

                    <input
                        type="text"
                        name='username'
                        value={userData.username}
                        onChange={handleChange}
                        placeholder='Username' />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        placeholder='Email'
                    />

                    <label>Password</label>
                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"} // Dynamiskt ändra mellan text och password
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                        />
                        <i
                            className={`password-toggle-icon fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                            onClick={togglePasswordVisibility}
                        ></i>
                    </div>


                    <button type='submit' className="settingssubmit">Update</button>
                </form>
            </div>

            <Sidebar isSettingsPage={true} />

        </div>
    )
}
