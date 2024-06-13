import { useRef, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Fauget2.png';
import blankprofile from '../assets/blankprofile.jpg';
import authContext from '../context/auth/authContext';

const Navbar = () => {
    const { isLogin, setIsLogin, checkLogin, loggedInUserData } = useContext(authContext);

    useEffect(() => {
        checkLogin();
    }, [isLogin])

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleProfileClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleMenuClick = (menuOption) => {
        setIsDropdownOpen(false);
    };

    return (
        <div className='flex items-center w-full bg-primary p-2 text-white py-3 justify-between shadow-md shadow-[#30C7D6] sticky top-0 z-50'>
            <div className='flex items-center'>
                <Link to={'/'} className='sm:ml-4 text-md sm:text-xl font-bold text-center w-24 sm:w-fit'><img src={logo} className='sm:w-32 h-18 rounded-xl' alt="social parivartan" /></Link>
            </div>
            <div className='flex text-md sm:text-xl gap-1 sm:gap-4'>
                {
                    isLogin && <span className='flex justify-center items-center font-semibold text-[#07E1E6]'>{loggedInUserData.name}</span>
                }
                <div className="relative mr-4">
                    <img src={blankprofile} alt="profile" className='h-10 w-10 rounded-full cursor-pointer' onClick={handleProfileClick} />
                    {isDropdownOpen && (
                        <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-300 ring-1 ring-black ring-opacity-5">
                            <div className="p-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                                {isLogin ? (
                                    <>
                                        <Link to={'/profile'}
                                            className="flex px-4 py-2 text-sm text-gray-700 hover:bg-[#07e2e688] hover:text-gray-900 w-full"
                                            role="menuitem"
                                            tabIndex="-1"
                                            onClick={() => handleMenuClick('Button 1')}
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            className="flex px-4 py-2 text-sm text-gray-700 hover:bg-[#07e2e688]  hover:text-gray-900 w-full border-t"
                                            onClick={() => {
                                                setIsLogin(false);
                                                localStorage.clear();
                                                handleMenuClick('Button 1')
                                            }}
                                        >
                                            Logout
                                        </button>
                                    </>

                                ) : (
                                    <Link to={'/login'}
                                        className="flex px-4 py-2 text-sm text-gray-700 hover:bg-[#07e2e688] hover:text-gray-900 w-full "
                                        role="menuitem"
                                        tabIndex="-1"
                                        onClick={() => handleMenuClick('Button 1')}
                                    >
                                        Login
                                    </Link>
                                )}

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
