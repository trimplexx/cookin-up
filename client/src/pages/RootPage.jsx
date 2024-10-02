import useAuthCheck from "../hooks/useAuthCheck";
const RootPage = () => {
  useAuthCheck();

  return <div></div>;
};

export default RootPage;
