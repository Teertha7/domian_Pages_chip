import "./App.css";
import Navbar from "./Navbar";
import Introduction from "./Introduction";
import Tools from "./Tools";
import ImageSlider from "./ImageSlider";
import Projects from "./Projects";
import { useState } from "react";
import domainData from "./domains.json";

function App() {
	const [domainIndex, setDomainIndex] = useState(0);
	const domains = domainData.domains;
	return (
		<div className="App">
			<Navbar domains={domains} domainIndex={domainIndex} setDomainIndex={setDomainIndex} />
			<Introduction
				title={domains[domainIndex].title}
				subtitle={domains[domainIndex].subtitle}
				description={domains[domainIndex].description}
			/>
			<section>
				<h2>Tools/Frameworks used in this domain</h2>
				<Tools tools={domains[domainIndex].tools} />
				<ImageSlider images={domains[domainIndex].images} />
			</section>
			<section className="projects">
				<h2>Projects</h2>
				<Projects projects={domains[domainIndex].projects} />
			</section>
		</div>
	);
}

export default App;
