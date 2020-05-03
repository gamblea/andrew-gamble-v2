import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Row from "react-bootstrap/Row"

import "bootstrap/dist/css/bootstrap.min.css"

import layoutStyles from "./layout.module.scss"

const Layout = ({ location, title, children }) => {
  //const rootPath = `${__PATH_PREFIX__}/`
  let header = (
    <div>
      <Navbar expand="sm" className={layoutStyles.navbar}>
        <Navbar.Brand
          style={{
            ...scale(0.6),
          }}
        >
          <Link className={layoutStyles.title} to="/">
            Andrew Gamble
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/blog">
              Blog
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
            <Nav.Link as={Link} to="/cv/">
              CV
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Row
        style={{
          height: rhythm(1 / 4),
        }}
      />
    </div>
  )
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(48),
        padding: `${rhythm(1 / 2)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{header}</header>
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          padding: `${rhythm(1 / 8)} ${rhythm(1.5)}`,
        }}
      >
        <main>{children}</main>
      </div>
    </div>
  )
}

export default Layout
