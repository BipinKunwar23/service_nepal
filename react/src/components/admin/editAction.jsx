import React from 'react'
import EditCategory from '../admin/catalog/category/editCategory';
import EditSubCategory from '../admin/catalog/subcategory/ediSubCategory';
import EditService from '../admin/catalog/service/editService';
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