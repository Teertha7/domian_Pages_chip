import "./App.css";
import React, { useState } from "react";
import SiliconWaferBackground from "./SiliconWaferBackground";
import Navbar from "./Navbar";
import Introduction from "./Introduction";
import Tools from "./Tools";
import ImageSlider from "./ImageSlider";
import Projects from "./Projects";
import domainData from "./domains.json";

function App() {
  const [domainIndex, setDomainIndex] = useState(0);
  const domains = domainData.domains;

  return (
    <div className="App">
      {/* Background Layer */}
      <div className="background-layer">
        <SiliconWaferBackground />
      </div>

      {/* Content Layer */}
      <div className="content-layer" style={{ zIndex: 10 }}>
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
          <h2>Projects.</h2>
          <Projects projects={domains[domainIndex].projects} />
        </section>
      </div>
    </div>
  );
}

export default App;
