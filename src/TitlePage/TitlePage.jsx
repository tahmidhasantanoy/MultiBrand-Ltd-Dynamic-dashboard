import { Helmet } from "react-helmet";
// import { Helmet } from "react-helmet-async";

const TitlePage = ({ title }) => {
  return (
    <Helmet>
      <title>{title + " | MultiBrand Ltd"}</title>
    </Helmet>
  );
};

export default TitlePage;
