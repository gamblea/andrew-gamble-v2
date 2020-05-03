import React, { useRef } from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import PhotoGallery from "../components/photoGallery"

function BlogPostTemplate({ data, pageContext, location }) {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  const galleryPhotos = useRef(
    data.galleryPhotos.nodes.map((photo, i) => {
      return {
        width: photo.childImageSharp.fluid.presentationWidth,
        height: photo.childImageSharp.fluid.presentationHeight,
        src: photo.childImageSharp.fluid.src,
        srcSet: photo.childImageSharp.fluid.srcSet,
        sizes: photo.childImageSharp.fluid.sizes,
        key: `${i}`,
        alt: photo.childImageSharp.fluid.originalName,
        caption: photo.childImageSharp.fluid.originalName,
        source: {
          regular: photo.childImageSharp.fullscreen.src,
          fullscreen: photo.childImageSharp.download.src,
        },
      }
    })
  )

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(40),
        }}
      >
        <h1>{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1 / 2),
            marginTop: rhythm(-1 / 4),
            marginLeft: rhythm(1 / 8),
          }}
        >
          {post.frontmatter.date}
        </p>
        <MDXRenderer>{post.body}</MDXRenderer>
      </div>
      <PhotoGallery photos={galleryPhotos.current} />
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />

      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}
      >
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query($slug: String!, $galleryDir: String!) {
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
        date(formatString: "MMMM DD, YYYY")
      }
      body
    }
    galleryPhotos: allFile(
      filter: {
        extension: { in: ["jpg", "png"] }
        relativeDirectory: { eq: $galleryDir }
        sourceInstanceName: { eq: "blog" }
      }
      sort: { fields: name }
    ) {
      nodes {
        childImageSharp {
          fluid(maxWidth: 256) {
            originalName
            presentationHeight
            presentationWidth
            ...GatsbyImageSharpFluid
          }
          fullscreen: fixed(width: 1024) {
            src
          }
          download: fixed(width: 2048) {
            src
          }
        }
      }
    }
  }
`
