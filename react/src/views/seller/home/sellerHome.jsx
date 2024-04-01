import {
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
  NavLink,
} from "react-router-dom";
import Sidebar from "./sidebar";
import SellerNavbar from "./seller-navbar";
const sellerHome = ({ children }) => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const locaiton = useLocation();

  const isDefault = useMatch(`user/${encodeURIComponent(name)}/seller`);
  if (!isDefault) {
    return (
      <section className="flex  ">
        <div className="w-[20Vw]  sticky top-0 shadow h-screen  ">
          <Sidebar />
        </div>

        <section className="flex-1 border overflow-y-auto ">
          <div className="border-b ">
            <SellerNavbar />
          </div>
          <section className=" p-4 ">
            <Outlet />
          </section>
        </section>
      </section>
    );
  }

  return (
    <section className="   ">
      <div
        className="bg-cover bg-no-repeat bg-center h-[90Vh] flex flex-1"
        style={{ backgroundImage: 'url("/src/images/landingimage.jpg")' }}
      >
        <div className="  text-white bg-[rgba(0,0,0,0.3)] w-full grid place-content-center ">
          <div className="flex flex-col gap-4">
            <p className="text-center text-[4em]  font-bold">Work You Way</p>
            <p className="text-[2em] text-slate-50 font-bold ">
              You bring the skil.We'll make earning easy
            </p>
            <div className="grid place-content-center">
              <button
                className="bg-green-600 p-2 rounded-md shadow   text-lg w-[300px] text-white"
                onClick={() => {
                  navigate(
                    `/user/${localStorage.getItem("name")}/service/guideline`
                  );
                }}
              >
                Become A Seller
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default sellerHome;
