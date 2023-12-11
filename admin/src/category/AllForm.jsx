import React from "react";
import { useSelector } from "react-redux";
import { AddCategory } from "./AddCategory";
import AddSubCategory from "./AddSubCategory";
import AddService from "./AddService";
const AllForm = () => {
  const AddSection = ({ children }) => {
    return (
      <section className="grid justify-content-center absolute -top-8 w-full min-h-full box-border p-2  bg-[rgba(0,0,0,0.4)]">
        {children}
      </section>
    );
  };
  const action = useSelector((state) => state.categorySlice.action);

  switch (action) {
    case "create":
      return (
        <AddSection>
          <AddCategory />
        </AddSection>
      );
      break;
      case "subcategory":
        return (
            <AddSection>
              <AddSubCategory/>
            </AddSection>
          );
        break;
        case "service":
            return (
                <AddSection>
                  <AddService/>
                </AddSection>
              );
            break;

    default:
      break;
  }
};

export default AllForm;
