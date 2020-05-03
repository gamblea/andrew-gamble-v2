import React from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"
import { rhythm, scale } from "../utils/typography"
import Card from "react-bootstrap/Card"
import postCardStyles from "./postCard.module.scss"

function PostCard({ title, date, excerpt, fields, frontmatter }) {
  return (
    <Card
      className="mx-auto"
      style={{ width: rhythm(9), marginTop: rhythm(1) }}
    >
      {frontmatter.featureImg ? (
        <Link to={fields.slug}>
          <Card.Img
            as={Image}
            fluid={frontmatter.featureImg.childImageSharp.fluid}
          />
        </Link>
      ) : null}
      <Card.Body>
        <Card.Title className={postCardStyles.title} as={Link} to={fields.slug}>
          {frontmatter.title}
        </Card.Title>
        <Card.Subtitle style={{ ...scale(-1 / 4) }} className="text-muted">
          {frontmatter.date}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  )
}

export default PostCard
