import React, { useState, useEffect } from 'react';
import { FaArrowUp } from "react-icons/fa";
import './scrollTopButton.css';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 200) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div>
            {isVisible && 
						<div className="scroll-to-top"  onClick={scrollToTop}>
                <div>
                    <FaArrowUp className="scroll-icon" />
                </div>
								</div>
            }
        </div>
    );
};

export default ScrollToTopButton;
