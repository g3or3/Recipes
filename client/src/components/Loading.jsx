import React from "react";
import ReactLoading from "react-loading";
import LoadingOverlay from "react-loading-overlay";

<LoadingOverlay
  active={isActive}
  spinner
  text="Loading your content..."
></LoadingOverlay>;

// function Loading() {
//   const [loadData, setLoadData] = useState([]);
//   const [done, setDone] = useState(undefined);
//
//   useEffect(() => {
// setTimeout(() => {
//   fetch("https://jsonplaceholder.typicode.com/posts")
// .then((response) => response.json())
// .then((json) => {
//   console.log(json);
//   setLoadData(json);
//   setDone(true);
// });
// }, 2000);
//   }, []);
//
//   return (
// <>
{
  /* {!done ? ( */
}
// <ReactLoading
//   type={"bars"}
//   color={"#03fc4e"}
//   height={100}
//   width={100}
// />
//   ) : (
// <ul>
{
  /* {data.map((post) => ( */
}
// <li key={post.id}>{post.title}</li>
//   ))}
{
  /* </ul> */
}
//   )}
{
  /* </> */
}
//   );
// }
//
// export default Loading;
