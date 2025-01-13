import { ClipLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0px auto",
};

const SmallSpinner = () => {
  return (
    <ClipLoader
      color="#3b82f6"
      cssOverride={override}
      size={25}
      aria-label="Loading Spinner"
    />
  );
};

export default SmallSpinner;
