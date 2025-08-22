import Tools from "./Tools";
import { useState } from "react";

const Projects = ({ projects }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleProject = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="projects-container">
            {projects.map((item, index) => {
                const isShown = activeIndex === index;
                return (
                    <article key={index} className={`project ${isShown ? "project-shown" : ""}`}>
                        <div className="project-header" onClick={() => toggleProject(index)}>
                            <h3 className="project-title">{item.title}</h3>
                            <span className="project-year">{item.year}</span>
                        </div>
                        <div 
                            className="project-content"
                            style={{
                                maxHeight: isShown ? "2000px" : "0",
                                opacity: isShown ? "1" : "0",
                                visibility: isShown ? "visible" : "hidden"
                            }}
                        >
                            <img
                                className="project-image"
                                src={process.env.PUBLIC_URL + item.image.src}
                                alt={item.image.alt}
                            />
                            <div className="project-data">
                                <p className="project-description">{item.description}</p>
								<h2 className="tools-used">Tools used:</h2>
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
