import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { setCategory, setSubCategory } from "../../redux/buyerSlice";

export default function Category({ categories }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const containerRef = useRef(null); // Create a reference to the container element
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [showPrev, setShowPrev] = useState(false);
  const categoryId = useSelector((state) => state.buyerSlice.category);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = containerRef.current;
        setShowNext(scrollLeft + clientWidth < scrollWidth);
        setShowPrev(scrollLeft > 0);
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);

      handleScroll();
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleNextClick = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 400, // Adjust this value based on your design
        behavior: "smooth",
      });
      setScrollPosition(containerRef.current.scrollLeft + 400);
    }
  };

  const handlePrevClick = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -400, // Adjust this value based on your design
        behavior: "smooth",
      });
      setScrollPosition(containerRef.current.scrollLeft - 400);
    }
  };

  return (
    <div className=" py-2 border-y flex relative">
      {showPrev && (
        <button
          onClick={handlePrevClick}
          className=" bg-white text-gray-400 p-3 left-0 top-0 absolute text-2xl  "
        >
          <i>
            <FaChevronLeft />
          </i>{" "}
        </button>
      )}

      <div
        ref={containerRef}
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "10px",
          content: "center",
        // Adjust as needed
          scrollbarWidth: "none", // Hide scrollbar for Firefox
          "-ms-overflow-style": "none", // Hide scrollbar for IE and Edge
        }}
        className="px-3"
      >
        {categories.map((category) => (
          <div
            key={category?.id}
            className="text-[1em] cursor-pointer"
            style={{ flex: "0 0 auto" }}
          >
            <button
              onClick={() => {
                dispatch(setCategory(category?.id));
                dispatch(setSubCategory(null));
                navigate(`category/${category.id}`);
              }}
              className={`text-center text-gray-700  m-2  font-semibold  ${
                categoryId === category?.id
                  ? " border-b-2 pb-2 border-gray-700 "
                  : "bg-white"
              }   `}
            >
              {category?.name}
            </button>
          </div>
        ))}
      </div>
      {showNext && (
        <button
          onClick={handleNextClick}
          className=" bg-white p-3 right-0  absolute text-2xl top-0 text-gray-400  "
        >
          <i>
            <FaChevronRight />
          </i>{" "}
        </button>
      )}
    </div>
  );
}
