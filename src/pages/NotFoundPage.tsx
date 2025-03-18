import PageTitle from "../components/PageTitle";

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center">
      <PageTitle>Page not found</PageTitle>
      <p>Please check the URL and try again.</p>
    </div>
  );
};

export default NotFoundPage;
