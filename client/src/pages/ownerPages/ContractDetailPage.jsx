import { useState, useEffect, useCallback } from "react";
import {
  getContractOwnerView,
  clearAlert,
  deleteContract,
} from "../../features/ownerUser/ownerUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import { Button, CircularProgress } from "@mui/material";
import { PageLoading, AlertToast, ConfirmModal } from "../../components";
import { dateFormatter, format } from "../../utils/valueFormatter";

const ContractDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { realEstateId } = location?.state;

  const {
    contractDetail,
    isLoading,
    isProcessing,
    alertFlag,
    alertType,
    alertMsg,
    success,
  } = useSelector((state) => state.ownerUser);

  useEffect(() => {
    dispatch(getContractOwnerView({ realEstateId }));
  }, [dispatch, realEstateId]);

  // Redirect to detail page of the property after contract is deleted
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate(`/owner/real-estate/${contractDetail?.realEstate?.slug}`);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate, contractDetail?.realEstate?.slug]);

  const handleAlertClose = useCallback(
    (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      dispatch(clearAlert());
    },
    [dispatch]
  );

  //modal
  const [open, setOpen] = useState(false);
  const handleModalOpen = useCallback(() => setOpen(true), []);
  const handleModalClose = useCallback(() => setOpen(false), []);

  const handleDeleteContract = useCallback(() => {
    dispatch(deleteContract({ contractId: contractDetail?._id }));
    handleModalClose();
  }, [dispatch, contractDetail?._id, handleModalClose]);

  if (isLoading) return <PageLoading />;

  if (!contractDetail)
    return (
      <div className="flex justify-center items-start h-screen mt-10">
        <h1>Contract Does not Exists!</h1>
      </div>
    );

  return (
    <main className="mb-12">
      <h3 className="my-4 font-heading font-bold text-center">
        Contract Detail
      </h3>
      <div className="flex flex-col w-11/12 mx-auto items-center gap-4 sm:flex-row sm:justify-center sm:items-start">
        <div className="flex flex-col gap-2 w-3/5  p-4 items-center text-center">
          <h4 className="font-bold">Real Estate</h4>
          <h5
            className="font-robotoNormal hover:text-primaryDark duration-300 ease-in-out cursor-pointer"
            onClick={() =>
              navigate(`/owner/real-estate/${contractDetail?.realEstate?.slug}`)
            }
          >
            {contractDetail?.realEstate?.title}
          </h5>
          <p>{contractDetail?.realEstate?.category}</p>
          <p className="">
            <LocationOnOutlinedIcon color="success" />{" "}
            {contractDetail?.realEstate?.address.location},{" "}
            {contractDetail?.realEstate?.address?.streetName}
          </p>
        </div>

        <div className="flex flex-col gap-2 w-3/5  p-4 items-center text-center">
          <h4 className="font-bold">Tenant User</h4>
          <h5
            className="font-robotoNormal hover:text-primaryDark duration-300 ease-in-out cursor-pointer"
            onClick={() =>
              navigate(`/owner/tenant-user/${contractDetail?.tenant?.slug}`)
            }
          >
            {contractDetail?.tenant?.firstName}{" "}
            {contractDetail?.tenant?.lastName}
          </h5>
          <div className="flex gap-2 items-center">
            <LocalPhoneRoundedIcon sx={{ color: "#6D9886" }} />
            <p className="">{contractDetail?.tenant?.phoneNumber}</p>
          </div>
          <div className="flex gap-2 items-center">
            <EmailRoundedIcon sx={{ color: "#E7AB79" }} />
            <p className="lowercase overflow-clip">
              {contractDetail?.tenant?.email}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center mt-4 text-center">
        <h4 className="font-bold">Contract Details</h4>
        <div>
          <h5 className="font-robotoNormal">
            <span className="font-medium">Contract Start Date</span>:{" "}
            {dateFormatter(contractDetail?.startDate)}
          </h5>
        </div>
        <div>
          <h5 className="font-robotoNormal">
            <span className="font-medium">Payment Plan</span>:{" "}
            {contractDetail?.paymentPlan}
          </h5>
        </div>
        <div>
          <h5 className="font-robotoNormal">
            <span className="font-medium">Rent Amount</span>: NRS.{" "}
            {format(contractDetail?.rentAmount)} per month
          </h5>
        </div>
      </div>
      {contractDetail?.status === "Pending" && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={handleModalOpen}
            variant="contained"
            size="medium"
            color="error"
            sx={{ color: "#fff" }}
            startIcon={<RemoveCircleRoundedIcon />}
          >
            {isProcessing ? (
              <CircularProgress
                size={26}
                sx={{
                  color: "#fff",
                }}
              />
            ) : (
              "Delete Contract"
            )}
          </Button>
        </div>
      )}
      {contractDetail?.status === "Active" && (
        <div className="flex justify-center items-center mt-6 gap-2">
          <CheckCircleRoundedIcon color="success" />
          <p className="font-bold">Active Contract</p>
        </div>
      )}

      <div>
        <ConfirmModal open={open} handleModalClose={handleModalClose}>
          <h3 className="text-center">Delete Contract</h3>
          <p className="text-center my-4">
            Are you sure you want to delete this contract?
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <Button onClick={handleModalClose} color="warning">
              Close
            </Button>

            <Button
              onClick={handleDeleteContract}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </div>
        </ConfirmModal>
      </div>

      <AlertToast
        alertFlag={alertFlag}
        alertMsg={alertMsg}
        alertType={alertType}
        handleClose={handleAlertClose}
      />
    </main>
  );
};

export default ContractDetailPage;
