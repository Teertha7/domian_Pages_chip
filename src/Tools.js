

const Tools = ({ tools }) => {
	if (tools.length <= 4) {
		return (
			<div className="tools">
				{tools.map((item, index) => (
					<figure key={index} className="tool">
						<img src={item.icon} alt="" />
						<figcaption>{item.name}</figcaption>
					</figure>
				))}
			</div>
		);
	}

	return (
  <div className="infinite-slider">
    <div className="slider-wrapper">
      <div className="slider-track">
        {[...tools, ...tools].map((item, index) => (
          <div className="slide" key={index}>
            <figure className="tool">
              <img src={item.icon} alt={item.name} />
              <figcaption>{item.name}</figcaption>
            </figure>
          </div>
        ))}
      </div>
    </div>
  </div>
);

};

export default Tools;
