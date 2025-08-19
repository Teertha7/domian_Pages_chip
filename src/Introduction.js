const Introduction = ({ title, subtitle, description }) => {
	return (
		<section>
			<br />
		
		
			<div className="container">
			<div className="analog-domain-container">
      <h1>
        <span className="highlight-title">{title}</span>
        <br />
        <span className="subtitle">{subtitle}</span>
      </h1>
      <div className="analog-domain-text">
        {description.map((item, index) => (
 					<p>{item}</p>
 				))}
      </div>
    </div>
			</div>
		</section>
	);
};

export default Introduction;

// return (
// 		<section>
// 			<header className="main-heading">
// 				<h1>{title}</h1>
// 				<p className="subtitle">{subtitle}</p>
// 			</header>
// 			<div className="description">
// 				{description.map((item, index) => (
// 					<p>{item}</p>
// 				))}
// 			</div>
// 		</section>
// 	);