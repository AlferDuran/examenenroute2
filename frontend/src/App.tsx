import React from "react";
import "./App.css";
import { Grommet, Main, Footer, Anchor, Header, Text, Box, Nav } from "grommet";
import { Outlet, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const AppBar = (props: any) => (
  <Header
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="medium"
    {...props}
  />
);

const client = new QueryClient();
function App() {
  return (
    <Grommet full>
      <QueryClientProvider client={client}>
        <div className="App">
          <AppBar>
            <Text size="large">IOhm Value Calculator</Text>
            <Nav align="center" direction="row">
              <Link to={`/`} style={{ textDecoration: "none" }}>
                <Anchor label="Calculator" />
              </Link>
              <Link to={`/admin`} style={{ textDecoration: "none" }}>
                <Anchor label="Admin" />
              </Link>
            </Nav>
          </AppBar>
          <Box style={{ flex: 1 }}>
            <Main pad="medium" background="#fafaf6">
              <Outlet />
            </Main>
          </Box>
          <Footer background="#ace7ef" justify="center" pad="small">
            <Text>Made with ❤️ by Alfer Duran for Enroute</Text>
          </Footer>
        </div>
      </QueryClientProvider>
    </Grommet>
  );
}

export default App;
