import { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAllContacts,
  createContract,
  clearAlert,
} from "../../features/ownerUser/ownerUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker, AlertToast, ConfirmModal } from "../../components";
import { Button, CircularProgress, TextField, MenuItem } from "@mui/material";
import moment from "moment";

const CreateContractPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { realEstateId, title, price, slug } = location?.state; // state is passed from the previous page

  const {
    contacts,
    isProcessing,
    contractDetail,
    alertFlag,
    alertMsg,
    alertType,
  } = useSelector((state) => state.ownerUser);

  useEffect(() => {
    dispatch(getAllContacts());
  }, [dispatch]);

  const [contractForm, setContractFrom] = useState({
    tenant: "",
    realEstate: realEstateId,
    rentAmount: price,
    paymentPlan: "",
  });

  const [date, setDate] = useState(null);

  const handleChange = useCallback(
    (e) => {
      setContractFrom({ ...contractForm, [e.target.name]: e.target.value });
    },
    [contractForm]
  );

  const paymentPlans = [
    "Monthly",
    "Two Months",
    "Three Months",
    "Six Months",
    "Yearly",
  ];

  // Redirect to detail page of the property after successful contract creation
  useEffect(() => {
    if (contractDetail) {
      const timer = setTimeout(() => {
        navigate(`/owner/real-estate/${slug}`);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [contractDetail, navigate, slug]);

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

  const [formData, setFormData] = useState({});
  const handleConfirmation = (e) => {
    e.preventDefault();
    const { tenant, realEstate, rentAmount, paymentPlan } = contractForm;
    setFormData({
      tenant,
      realEstate,
      rentAmount,
      paymentPlan,
      startDate: moment(date).format("YYYY-MM-DD"),
    });

    handleModalOpen();
  };

  const handleCreateContract = useCallback(() => {
    dispatch(createContract({ formData }));
    handleModalClose();
  }, [dispatch, formData, handleModalClose]);

  return (
    <main className="mt-10 flex flex-col items-center md:ml-10 md:items-start">
      <div className="mb-6">
        <h3 className="font-heading font-bold">Create Contract</h3>
        <p className="text-gray-400 -mt-2 font-robotoNormal">
          Fill in the form below to create a contract
        </p>
      </div>
      <div className="mb-4">
        <h3 className="">Real Estate</h3>
        <p className="-mt-2">{title}</p>
      </div>
      <div className="w-3/5">
        <form id="form" onSubmit={handleConfirmation}>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <TextField
              select
              required
              label="Tenant User"
              value={contractForm.tenant}
              onChange={handleChange}
              sx={{ width: "300px" }}
              name="tenant"
              color="tertiary"
            >
              {contacts?.map((user) => (
                <MenuItem key={user._id} value={user._id} className="">
                  {user.firstName} {user.lastName}
                </MenuItem>
              ))}
            </TextField>
            <DatePicker
              label="Contract Start Date"
              value={date}
              handleChange={useCallback(
                (date) => {
                  setDate(date);
                },
                [setDate]
              )}
            />

            <TextField
              select
              required
              label="Payment Plan"
              value={contractForm.paymentPlan}
              onChange={handleChange}
              sx={{ width: "300px" }}
              name="paymentPlan"
              color="tertiary"
            >
              {paymentPlans.map((option, index) => (
                <MenuItem key={index} value={option} className="">
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Rent Amount"
              value={contractForm.rentAmount}
              name="rentAmount"
              color="tertiary"
              sx={{ width: "300px" }}
              disabled
            />
          </div>
          <div className="text-center mt-4 mb-6">
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "primary.dark",
                  opacity: [0.9, 0.8, 0.7],
                },
                width: "25%",
              }}
            >
              {isProcessing ? (
                <CircularProgress
                  size={26}
                  sx={{
                    color: "#fff",
                  }}
                />
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </form>
      </div>

      <div>
        <ConfirmModal open={open} handleModalClose={handleModalClose}>
          <h3 className="text-center">Confirm Contract</h3>
          <p className="text-center my-4">
            Are you sure you want to create this contract?
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <Button
              onClick={handleCreateContract}
              color="success"
              variant="contained"
            >
              Confirm
            </Button>

            <Button onClick={handleModalClose} color="error">
              Close
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

export default CreateContractPage;
