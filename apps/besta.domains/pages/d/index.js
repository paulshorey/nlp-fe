import React from "react";
import App from "src/shared/components/App";
import Domains from "src/domains/containers/Home";
import Footer from "src/shared/components/Footer";

class ResultsPage extends React.Component {
  render() {
    return (
      <App meta_title={"Domain suggestions"}>
        <Domains />
        <Footer />
      </App>
    );
  }
}

export default ResultsPage;
