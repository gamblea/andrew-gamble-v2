const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const basicMd = path.resolve(`./src/templates/basic-md.js`)
  return graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                section
              }
              body
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }
    // Create blog posts pages.
    const posts = result.data.allMdx.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      if (post.node.frontmatter.section == `blog`) {
        const regex = /\/blog\/(.+)\/$/
        const postName = post.node.fields.slug.match(regex)[1]
        createPage({
          path: post.node.fields.slug,
          component: blogPost,
          context: {
            slug: post.node.fields.slug,
            galleryDir: `${postName}/gallery`,
            previous,
            next,
          },
        })
      } else {
        createPage({
          path: post.node.fields.slug,
          component: basicMd,
          context: {
            slug: post.node.fields.slug,
            previous,
            next,
          },
        })
      }
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })

    if (node.frontmatter.section == `blog`) {
      createNodeField({
        name: `slug`,
        node,
        value: `/blog${value}`,
      })
    } else {
      createNodeField({
        name: `slug`,
        node,
        value,
      })
    }
  }
}
