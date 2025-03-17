interface Props {
  children?: React.ReactNode;
}

const PageTitle: React.FC<Props> = ({ children }) => {
  return <h1 className="text-4xl my-7">{children}</h1>;
};

export default PageTitle;
