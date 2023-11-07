import React, { useEffect, useRef, useState } from "react";
import { MdFilterList } from "react-icons/md";
import { usePopper } from "react-popper";
import Portal from "./Portal";

const DtoFilterButton = (props) => {
  const [showFilter, setShowFilter] = useState(false);
  const popperReference = useRef();
  const popperElement = useRef();

  const { styles, attributes } = usePopper(
    popperReference.current,
    popperElement.current,
    {
      placement: "bottom-end",
    }
  );

  useEffect(() => {
    const outsideClick = (e) => {
      e.preventDefault();
      if (
        !popperReference.current.contains(e.target) &&
        !popperElement.current.contains(e.target)
      ) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", outsideClick);
    return () => {
      document.removeEventListener("mousedown", outsideClick);
    };
  }, []);

  return (
    <>
      <div
        ref={popperReference}
        className="no_selection relative m-auto w-fit cursor-pointer rounded-full bg-white p-2 shadow-sm duration-300 hover:bg-gray-200"
        onClick={() => {
          setShowFilter(!showFilter);
        }}
      >
        <MdFilterList size={20} />
      </div>
      <Portal>
        <div
          ref={popperElement}
          className={`z-[1] mt-2 rounded-2xl border  bg-white p-3  ${
            showFilter ? "block" : "hidden"
          }`}
          style={styles.popper}
          {...attributes.popper}
        >
          {props.filterItems.map((item, index) => (
            <div className="flex gap-2" key={index}>
              <input
                className="accent-cyan-600"
                type="checkbox"
                name={item.item}
                id={index}
                value={item.value}
                onChange={props.onChange}
                checked={item.value}
                autoComplete="off"
              />
              <p className="text-sm">{item.title}</p>
            </div>
          ))}
        </div>
      </Portal>
    </>
  );
};

export default DtoFilterButton;
