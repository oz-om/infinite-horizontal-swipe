import React, { useRef, useEffect } from "react";
export function Swipe({ children, childWidth = "120px", gap = "80px", duration = 10000, dir = "rtl" }) {
  const scroller = useRef();

  useEffect(() => {
    const Children = Array.from(scroller.current.children);
    // clone the items
    Children.forEach((childe) => {
      childe.style.flexBasis = childWidth;
      childe.style.flexShrink = "0";

      const childeClone = childe.cloneNode(true);
      childeClone.setAttribute("added", true);
      scroller.current.appendChild(childeClone);
    });

    // create scroll animation
    // get the scroller real width by calc width of each child and gap between them
    let childPXWidth = parseInt(getComputedStyle(scroller.current.firstChild).width);
    let items = children.length;
    let pxGap = parseInt(getComputedStyle(scroller.current).columnGap);
    // concat results
    let width = childPXWidth * items + pxGap * items;

    scroller.current.animate([{ right: "0" }, { right: `${width}px` }], {
      duration,
      iterations: Infinity,
      direction: dir == "ltr" ? "reverse" : "normal",
    });
  }, []);
  return (
    <div
      className='swipe_wrapper'
      style={{
        overflow: "hidden",
        WebkitMask: "linear-gradient(90deg, transparent, white 20%, white 80%, transparent)",
        mask: "linear-gradient(90deg, transparent, white 20%, white 80%, transparent)",
      }}
    >
      <div
        ref={scroller}
        className='scroller'
        style={{
          position: "relative",
          display: "flex",
          columnGap: gap,
        }}
      >
        {children}
      </div>
    </div>
  );
}
