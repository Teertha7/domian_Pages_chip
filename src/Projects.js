import Tools from "./Tools";
import { useState } from "react";

const Projects = ({ projects }) => {
	const [expandedIndexes, setExpandedIndexes] = useState(new Set());

	const toggleProject = (index) => {
		setExpandedIndexes((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(index)) {
				newSet.delete(index);
			} else {
				newSet.add(index);
			}
			return newSet;
		});
	};

	return (
		<div className="projects-container">
			{projects.map((item, index) => {
				const isShown = expandedIndexes.has(index);
				return (
					<article key={index} className={`project ${isShown ? "project-shown" : ""}`}>
						<h3
							className="project-title"
							onClick={() => toggleProject(index)}
							style={{ cursor: "pointer" }}>
							{item.title}
						</h3>
						<div className="project-content">
							<img
								className="project-image"
								src={process.env.PUBLIC_URL + item.image.src}
								alt={item.image.alt}
							/>
							<div className="project-data">
								<p className="project-description">{item.description}</p>
								<Tools tools={item.tools} />
							</div>
						</div>
					</article>
				);
			})}
		</div>
	);
};

export default Projects;
