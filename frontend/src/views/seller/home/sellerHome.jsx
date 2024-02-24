import { Outlet, useLocation, useMatch, useNavigate } from "react-router-dom";
const sellerHome = ({children}) => {
  
  const navigate=useNavigate()
  const name=localStorage.getItem('name');
  console.log('name',name);
  const locaiton=useLocation();
  console.log(locaiton);

  const isDefault=useMatch(`user/${encodeURIComponent(name)}`);
  // console.log('default',isDefault);
  if(!isDefault){
    return <Outlet/>
  }
  
  return (
    <>
      <div
        className="bg-cover bg-no-repeat bg-center h-[90Vh] flex "
        style={{ backgroundImage: 'url("/src/images/landingimage.jpg")' }}
      >
        <div className="  text-white bg-[rgba(0,0,0,0.3)] w-full grid place-content-center ">
          <div className="flex flex-col gap-4">
            <p className="text-center text-[4em]  font-bold">Work You Way</p>
            <p className="text-[2em] text-slate-50 font-bold ">
              You bring the skil.We'll make earning easy
            </p>
            <div className="grid place-content-center">
              <button className="bg-green-600 p-2 rounded-md shadow   text-lg w-[300px] text-white"
              onClick={()=>{
                navigate(`/user/${localStorage.getItem('name')}/service/guideline`)
              }}
              >
                Become A Seller
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default sellerHome;
