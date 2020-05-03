/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import SEO from "../components/seo"
import aboutStyles from "./about.module.scss"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { rhythm } from "../utils/typography"

const About = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 400, quality: 50) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      logos: allFile(
        filter: { relativeDirectory: { eq: "logos" } }
        sort: { fields: name }
      ) {
        edges {
          node {
            childImageSharp {
              fluid(maxHeight: 100, quality: 50) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            instagram
          }
          socialUrls {
            gitHub
            instagram
            linkedIn
            wordPress
            youTube
          }
        }
      }
    }
  `)

  //const { author, social } = data.site.siteMetadata
  let { author, socialUrls } = data.site.siteMetadata
  const logosImg = data.logos.edges
  console.log(typeof socialUrls)
  const logos = Object.keys(socialUrls).map((social, i) => {
    return {
      url: socialUrls[social],
      fluid: logosImg[i].node.childImageSharp.fluid,
    }
  })

  return (
    <div>
      <Row>
        <SEO title="About" />
        <div className={aboutStyles.meWrapper + " col-md"}>
          <Image
            fluid={data.avatar.childImageSharp.fluid}
            alt={author.name}
            className={aboutStyles.me}
          />
        </div>
        <div className="col-md align-self-center">
          <div className="mx-auto ">
            <p>
              Hi, I’m Andrew. I am an undergraduate student at the University of
              Waterloo, who enjoys eating pineapple on his pizza.
            </p>
            <p>
              My main interests academically are in mathematics and computer
              science along with the hardware side of computing. Outside of
              academics I love being active, coding, reading about math,
              cooking, playing volleyball and sharing my experiences through
              making videos and photography.
            </p>
            <p>
              Growing up in British Columbia I love getting outside and being
              active. From skiing through the trees to a long day of hiking
              there is nothing better than exploring the outdoors. In addition,
              I love experimenting in the kitchen and trying out new ways to not
              follow the recipe.
            </p>
            <p>Feel free to reach out!</p>
            <p>Andrew</p>
          </div>
        </div>
      </Row>
      <Row
        className={aboutStyles.logos}
        style={{
          padding: `${rhythm(1)} ${rhythm(1)}`,
        }}
      >
        {logos.map((logo, index) => (
          <Col className={aboutStyles.logoContainer} key={index}>
            <a href={logo.url} target="_blank" rel="noopener noreferrer">
              <Image fluid={logo.fluid} className={aboutStyles.logo} />
            </a>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default About
