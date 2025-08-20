// import { useRef, useEffect } from "react";

// const Navbar = ({ domains, domainIndex, setDomainIndex }) => {
// 	const olRef = useRef(null);
//     const [barStyle, setBarStyle] = useState({ left: 0, width: 0 });

// 	useEffect(() => {
//         const ol = olRef.current;
//         if (!ol) return;
//         const li = ol.children[domainIndex];
//         if (li) {
//             setBarStyle({
//                 left: li.offsetLeft,
//                 width: li.offsetWidth,
//             });
//         }
//     }, [domainIndex, domains.length]);

// 	return (
// 		<nav className="top-navbar">
// 			<ol >
// 				{domains.map((item, index) => (
// 					<li
// 						key={item.key}
// 						onClick={() => setDomainIndex(index)}
// 						style={{
							
// 							color: domainIndex === index ? "#b3ff00" : "lightgray",
// 							fontWeight: domainIndex === index ? 700 : 500,
// 							cursor: "pointer",
// 							position: "relative",
//                             zIndex: 1,
							
// 						}}>
// 						{item.key}
// 					</li>
// 				))}
// 			</ol>
// 		</nav>
// 	);
// };

// export default Navbar;


import { useRef, useEffect, useState } from "react";

const Navbar = ({ domains, domainIndex, setDomainIndex }) => {
    const olRef = useRef(null);
    const [barStyle, setBarStyle] = useState({ left: 0, width: 0, opacity: 0.2, background: "#d1ff22" });
    const [showSlider, setShowSlider] = useState(true);
    const [hovering, setHovering] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    // Helper to get correct li
    const getLi = (index) => {
        const ol = olRef.current;
        if (!ol) return null;
        return ol.querySelectorAll('li')[index];
    };

    // Move slider to active item on mount and domain change
    useEffect(() => {
        const li = getLi(domainIndex);
        if (li) {
            setBarStyle({
                left: li.offsetLeft,
                width: li.offsetWidth,
                opacity: 0.2,
                
            });
            setShowSlider(true);
        }
    }, [domainIndex, domains.length]);

    // Handle hover
    const handleHover = (index) => {
        const li = getLi(index);
        if (li) {
            setBarStyle({
                left: li.offsetLeft,
                width: li.offsetWidth,
                opacity: 1,
                
            });
            setShowSlider(true);
            // setHovering(true);
            
        }
    };

    // Restore slider on mouse leave
    const handleMouseLeave = () => {
        const li = getLi(domainIndex);
        if (li) {
            setBarStyle({
                left: li.offsetLeft,
                width: li.offsetWidth,
                opacity: 0.2,
                
            });
            setShowSlider(true);
            //setHovering(false);
        }
        if (timeoutId) clearTimeout(timeoutId);
    };

    return (
        <nav className="top-navbar">
            <ol ref={olRef} className="navbar-list" onMouseLeave={handleMouseLeave}>
                {showSlider && (
                    <div
					
                        className="navbar-slider"
                        style={{
                            left: barStyle.left,
                            width: barStyle.width,
							
                            opacity: barStyle.opacity,
							
                            //background: barStyle.background,
                            transition: "left 0.3s cubic-bezier(.4,0,.2,1), width 0.3s cubic-bezier(.4,0,.2,1), opacity 0.3s"
                        }}
                    ></div>
                )}
                {domains.map((item, index) => (
                    <li
                        key={item.key}
                        onClick={() => setDomainIndex(index)}
                        onMouseEnter={() => handleHover(index)}
                        style={{
                            color: domainIndex === index ? "#b3ff00" : "lightgray",
                            fontWeight: domainIndex === index ? 700 : 500,
                            cursor: "pointer",
                            position: "relative",
                            zIndex: 1,
                            background: hovering && showSlider && barStyle.left === getLi(index)?.offsetLeft ? "#d1ff22" : "transparent",
                            transition: "background 0.3s"
                        }}
                    >
                        {item.key}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Navbar;