import { Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Logo, NavBarLinksOwner, NavBarLinksTenant } from "../components";
import { logOut } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Header = ({ toggleMenu, menuOpen }) => {
  const { userType } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logOutUser = () => {
    dispatch(logOut());
  };
  return (
    <>
      {menuOpen && (
        <section className="modal-container bg-[rgb(0,0,0,0.7)] fixed inset-0 outline-none overflow-x-hidden overflow-y-auto z-10 lg:hidden">
          <div className="modal-dialog relative w-11/12 h-5/6 mx-auto mt-10 pointer-events-none">
            <div className="modal-content border-none shadow-lg relative w-full h-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div className="modal-header flex flex-col flex-shrink-0  items-start p-4 border-b border-gray-200 rounded-t-md">
                <CloseIcon
                  fontSize="large"
                  color="error"
                  onClick={toggleMenu}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      color: "#FF0000",
                    },
                  }}
                />
                <div className="mx-auto">
                  <Logo />
                </div>
              </div>
              <div className="modal-body relative p-4 flex flex-col h-3/4 gap-5">
                {userType === "owner" ? (
                  <NavBarLinksOwner />
                ) : (
                  <NavBarLinksTenant />
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      <header className="flex m-1 shadow-sm justify-center items-center">
        <Logo />
        <div className="flex flex-col justify-center  ml-2 mr-auto">
          <h1 className="font-display text-xl md:text-2xl">Rent Manager</h1>
          <p className="text-xs md:text-sm">
            Find and Manage your rentals in one place
          </p>
        </div>

        <nav className="hidden justify-evenly items-center w-1/3 lg:flex">
          {userType === "owner" ? <NavBarLinksOwner /> : <NavBarLinksTenant />}
        </nav>

        <div className="mr-1 lg:hidden">
          <Button
            variant="text"
            size="small"
            sx={{
              color: "black",
              "&:hover": {
                color: "primary.dark",
              },
            }}
            onClick={toggleMenu}
          >
            <MenuIcon />
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            size="small"
            color="tertiary"
            sx={{
              color: "white",
            }}
            onClick={logOutUser}
          >
            Logout
          </Button>
        </div>
      </header>
    </>
  );
};

export default Header;
