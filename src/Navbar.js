const Navbar = ({ domains, domainIndex, setDomainIndex }) => {
	return (
		<nav className="top-navbar">
			<ol>
				{domains.map((item, index) => (
					<li
						onClick={() => setDomainIndex(index)}
						style={{
							color: domainIndex === index ? "#b3ff00" : "lightgray",
							cursor: "pointer",
						}}>
						{item.key}
					</li>
				))}
			</ol>
		</nav>
	);
};

export default Navbar;
