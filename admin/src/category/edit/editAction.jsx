import React from 'react'
import EditCategory from './editCategory';
import EditSubCategory from './ediSubCategory';
import EditService from './editService';
import { useSelector } from 'react-redux';
const EditAction = () => {
    const AddSection = ({ children }) => {
        return (
          <section className="form absolute -top-8 w-full h-full box-border  bg-[rgba(0,0,0,0.4)]">
            {children}
          </section>
        );
      };
      const edit = useSelector((state) => state.categorySlice.edit);
    
      switch (edit) {
        case "category":
          return (
            <AddSection>
             <EditCategory/>
            </AddSection>
          );
          break;
          case "subcategory":
            return (
                <AddSection>
                  <EditSubCategory/>
                </AddSection>
              );
            break;
            case "service":
                return (
                    <AddSection>
                      <EditService/>
                    </AddSection>
                  );
                break;
    
        default:
          break;
      }
}

export default EditAction