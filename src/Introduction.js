const Introduction = ({ title, subtitle, description }) => {
	return (
		<section>
			<header className="main-heading">
				<h1>{title}</h1>
				<p className="subtitle">{subtitle}</p>
			</header>
			<div className="description">
				{description.map((item, index) => (
					<p>{item}</p>
				))}
			</div>
		</section>
	);
};

export default Introduction;
