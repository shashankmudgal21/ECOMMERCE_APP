import React from 'react'
import Layout from '../Component/Layout/Layout'

const About = () => {
  return (
    <Layout title = {'About us'}>
       <div className="about-container container">
        <div className="ab-1 container-md-6">
          <img className='about_img' src="../images/about.png" alt="Remote-image" />
        </div>
        <div className=" ab-2 container-md-6">
          <p className='about-desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quasi eos obcaecati numquam quis voluptatem molestiae nesciunt, excepturi rem, fuga porro necessitatibus suscipit laborum unde aliquam? Iste possimus tenetur distinctio? Nisi quibusdam earum, repellendus porro unde asperiores dignissimos eius maxime, explicabo omnis ut? Reprehenderit, eius eos corporis optio aliquid id.</p>
        </div>
      </div>
    </Layout>
  )
}

export default About
