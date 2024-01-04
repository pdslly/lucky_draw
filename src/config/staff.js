const getImageUrl = (name) => {
  return new URL(`../assets/avatar/${name}`, import.meta.url).href;
};

// export default [
//   {
//     name: "李向阳",
//     avatar: getImageUrl("a01.jpeg"),
//     department: "研发部",
//   },
// ];

export default new Array(40).fill(0).map((_, index) => {
  return {
    name: `张三${index}`,
    avatar: getImageUrl(`a0${(index % 6) + 1}.jpeg`),
    department: `研发部${index % 2}`,
  };
});
