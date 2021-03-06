import React, { useCallback, useState } from "react";
import { Container } from "@theme-ui/components";
import Header from "./header";
import "./layout.css";

export default function Layout({ children }) {
  const [sizes, setSizes] = useState({});
  const headerRef = useCallback(node => {
    if (node) {
      setSizes(sizes => ({ ...sizes, header: node.getBoundingClientRect() }));
    }
  }, []);
  const footerRef = useCallback(node => {
    if (node) {
      setSizes(sizes => ({ ...sizes, footer: node.getBoundingClientRect() }));
    }
  }, []);
  const Children = ({ ...props }) =>
    React.Children.map(children, child =>
      React.cloneElement(child, {
        ...props,
        sizes,
      }),
    );

  return (
    <Container px="1.0875rem">
      <Header headerRef={headerRef} />
      <main>
        <Children />
      </main>
      <footer ref={footerRef}>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a
          href="https://www.gatsbyjs.org"
          target="_blank"
          rel="noreferrer noopener"
        >
          Gatsby
        </a>
      </footer>
    </Container>
  );
}
