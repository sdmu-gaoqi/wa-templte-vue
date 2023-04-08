import _ from "lodash";

export const scrollListener = (callback: (e: string) => void) => {
  const scrollBody = document.querySelector("#addressScroll");
  if (scrollBody) {
    scrollBody.addEventListener(
      "scroll",
      _.debounce((e) => {
        const children = e.target.children;
        const scrollTop = e.target.scrollTop;
        for (let i in children) {
          const node = children[i];
          const { offsetTop, clientHeight } = node;
          if (offsetTop + clientHeight - 100 > scrollTop) {
            const id = node?.id?.replace("_box", "");
            callback(id);
            return
          }
        }
      }, 200)
    );
  }
};
