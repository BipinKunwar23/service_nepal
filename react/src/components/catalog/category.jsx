import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { setCategory, setSubCategory } from "../../redux/buyerSlice";
import { SlArrowLeft } from "react-icons/sl";

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
    <div className="flex relative">
      {showPrev && (
        <button
          onClick={handlePrevClick}
          className=" bg-white text-gray-600  left-0 top-0 absolute text-2xl  "
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
          gap: "30px",
          fontWeight: 500,
          content: "center",
        // Adjust as needed
          scrollbarWidth: "none", // Hide scrollbar for Firefox
        }}
        className=""
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
              className={`text-center text-black    text-[1em] ${
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
          className=" bg-white  right-0  absolute text-2xl top-0 text-gray-600  "
        >
          <i>
            <FaChevronRight />
          </i>{" "}
        </button>
      )}
    </div>
  );
}
