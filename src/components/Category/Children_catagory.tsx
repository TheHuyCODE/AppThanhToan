import { useParams } from "react-router-dom";

const ChildrenCategory = (props) => {
  const params = useParams();
  console.log("check params", params);
  return (
    <div>
      <h1>ChildrenCatalog</h1>
    </div>
  );
};
export default ChildrenCategory;
