import React from 'react'
import "./OurLegacy.css"
import SharanyaImage from '../../assets/sharanya.jpeg';
import TaranImage from '../../assets/taran.jpg';
import GauthamImage from '../../assets/gautham.jpg'

const OurLegacy = () => {
  return (
    <div className="create-project">
        <h1 className="banner">Our Legacy</h1>
        <h1 className="titles">Meet Our Team</h1>

        <div className="team-container">
          <div className="image-container">
            <img className="circle-image" src={TaranImage} alt="Sharanya Image" />
            <div class="image-text">Taran Chowdhury </div>
          </div>

          <div className="image-container">
          <img className="circle-image" src={SharanyaImage} alt="Sharanya Image" />
            <div className="image-text">Sharanya Udupa </div>
          </div>

          <div className="image-container">
          <img className="circle-image" src={GauthamImage} alt="Gautham Image" />
            <div className="image-text">Gautham Naryanan </div>
          </div>
    </div>
    
    <h1 className="titles">Our Idea</h1>
    <p className="long-texts">Our product, BrainBank, is a private repository that aesthetically stores a company's research documents (including project progress and history) for other co-workers to refer to in the future or to collaborate with. Our typical business or problem domain would be in the area of knowledge management and project management for businesses. Specifically, BrainBank aims to help businesses manage their research documents and project progress in a centralized and organized way, promoting efficient accessibility of company resources. Brain Bank acts as both a repository and a project planning tool, so you can hold all documents/research/code from company to company, but also allow for collaboration on the documents/research/code.</p>
    
    <h1 className="titles">Our Approach</h1>
    <p className="long-texts">We are thrilled to announce the latest updates to our product, BrainBank, and our unwavering commitment to continuous improvement. BrainBank offers a seamless project collaboration experience, revolutionizing the way you work. <br></br><br></br>

Host and Manage Your Projects with Ease:
With BrainBank, hosting and managing your projects has never been easier. Our platform allows you to effortlessly gather the perfect team to bring your ideas to life. Choose from a pool of talented individuals who align with your project's vision, and witness the magic unfold. <br></br><br></br>

Enhanced Project Organization:
We understand the importance of organization in project management. That's why BrainBank offers enhanced project organization features. Add comprehensive project summaries to provide a valuable reference point for others interested in your work. Streamline your project documentation and keep everyone on the same page.<br></br><br></br>

Seamless Project Tracking:
Keeping track of project updates is crucial for success. BrainBank simplifies this process with our intuitive search menu. Effortlessly locate your projects by searching for their names, creation dates, or file types. Find the projects that meet your specific requirements and access them with ease. Each project leads you to a dedicated page filled with essential project information.<br></br><br></br>

Empowering Employee Roles:
Collaboration thrives when each team member's unique strengths are recognized. At BrainBank, we empower employees through distinct roles and associated powers:<br></br><br></br>

Experience the Future of Project Collaboration with BrainBank:
Join us on this transformative journey and discover the future of project collaboration. Unlock new levels of productivity, efficiency, and success as you leverage BrainBank's innovative features and empower your team to achieve greatness.</p>
    </div>

    
  )
}

export default OurLegacy