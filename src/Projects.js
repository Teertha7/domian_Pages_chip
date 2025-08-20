import Tools from "./Tools";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

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
						<div 
                        className="project-header"
                        onClick={() => toggleProject(index)}
                    >
                        <h3 className="project-title">
                            {item.title}
                        </h3>
                        <span className="project-year">{item.year}</span>
                    </div>

						<div className="project-content"
						style={{ padding:"2vw", alignItems:"flex-start", display: isShown ? 'flex' : 'none', flexDirection: "row"
								 }}
						
						>
							<img
								className="project-image"
								src={process.env.PUBLIC_URL + item.image.src}
								alt={item.image.alt}
							/>
							<div className="project-data">
								<p className="project-description"
								style={{ fontSize: "17px"
								 }}
								>{item.description}</p>
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
