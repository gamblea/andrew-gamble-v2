import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BasicMdTemplate extends React.Component {
  render() {
    const mdx = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={mdx.frontmatter.title} description={mdx.excerpt} />

        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(40),
          }}
        >
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </div>
      </Layout>
    )
  }
}

export default BasicMdTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
      }
      body
    }
  }
`
