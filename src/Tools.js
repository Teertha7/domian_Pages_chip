const Tools = ({ tools }) => {
	return (
		<div className="tools">
			{tools.map((item, index) => (
				<figure className="tool">
					<img src={process.env.PUBLIC_URL + item.icon} alt="" />
					<figcaption>{item.name}</figcaption>
				</figure>
			))}
		</div>
	);
};

export default Tools;
