import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProfileDetails,
  clearAlert,
} from "../../features/tenantUser/tenantUserSlice";
import {
  AlertToast,
  PageLoading,
  UserProfileComponent,
} from "../../components";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, isLoading, alertFlag, alertType, alertMsg } = useSelector(
    (store) => store.tenantUser
  );

  useEffect(() => {
    dispatch(getProfileDetails());
  }, [dispatch]);

  const handleClose = useCallback(
    (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      dispatch(clearAlert());
    },
    [dispatch]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  if (isLoading) return <PageLoading />;

  return (
    <>
      <main className="flex justify-center">
        <div className="hidden md:block md:w-1/3 mt-10 ml-16">
          <p className="font-bold text-2xl my-2">
            Hey <span className="font-normal text-lg">{user?.firstName},</span>
          </p>
          <div className="hidden w-60 rounded-lg overflow-hidden mt-4 md:block">
            <img
              className="h-60 w-full object-cover"
              src={user?.profileImage}
              alt="profile"
            />
          </div>
        </div>
        <div className="w-3/4 mt-10">
          <div className="mb-4 text-center">
            <h2>Profile</h2>
            <p className="text-gray-400 -mt-3 font-robotoNormal">
              View or update profile
            </p>
          </div>
          <form id="form" onSubmit={handleSubmit} className="">
            <UserProfileComponent {...user} />
          </form>
        </div>
      </main>
      <AlertToast
        alertFlag={alertFlag}
        alertMsg={alertMsg}
        alertType={alertType}
        handleClose={handleClose}
      />
    </>
  );
};

export default ProfilePage;
