import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllTenantRentalProperties } from "../../features/realEstateTenant/realEstateTenantSlice";
import { PageLoading, Footer } from "../../components";
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { format } from "../../utils/valueFormatter";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const AllRentalProperties = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allRentalProperties, isLoading } = useSelector(
    (state) => state.realEstateTenant
  );
  useEffect(() => {
    dispatch(getAllTenantRentalProperties());
  }, [dispatch]);

  if (isLoading) return <PageLoading />;

  return (
    <>
      <main className="flex flex-col mb-12 mt-8 md:items-start md:ml-10">
        {allRentalProperties?.length === 0 ? (
          <>
            <div className="mx-auto text-center">
              <h4 className="mb-4">
                You do not have any active Rental Properties
              </h4>
              <Button
                onClick={() => navigate("/tenant")}
                variant="contained"
                sx={{ color: "#fff" }}
              >
                Browse Properties
              </Button>
            </div>
          </>
        ) : (
          <>
            <h3 className="my-4 font-heading font-bold text-center">
              Your Rental{" "}
              {allRentalProperties?.length > 1 ? "Properties" : "Property"}
            </h3>
            <div className="flex flex-wrap gap-8 justify-center">
              {allRentalProperties?.map((item) => {
                const {
                  title,
                  category,
                  price,
                  address,
                  realEstateImages,
                  propertyOwner,
                } = item?.realEstate;
                return (
                  <div key={item._id}>
                    <Card
                      sx={{
                        minWidth: 345,
                        maxWidth: 345,
                        bgcolor: "transparent",
                        boxShadow: "none",
                        "&:hover": {
                          boxShadow: "0 2px 5px 0 rgba(0,0,0,0.2)",
                        },
                        color: "#102a43",
                      }}
                    >
                      <CardActionArea onClick={() => navigate("")}>
                        <CardMedia
                          component="img"
                          sx={{ maxHeight: 150 }}
                          image={realEstateImages[0]}
                          alt={title}
                        />
                        <CardContent>
                          <h4
                            className="mb-1 overflow-hidden overflow-ellipsis whitespace-nowrap hover:text-primaryDark duration-300 ease-in-out"
                            style={{ maxWidth: "31ch" }}
                          >
                            {title}
                          </h4>
                          <p className="text-sm text-gray-400">{category}</p>
                          <p className="font-semibold">
                            NPR. <span className="">{format(price)}</span> /
                            month
                          </p>
                          <p className="text-base">
                            <LocationOnOutlinedIcon color="secondary" />{" "}
                            {address?.location}, {address?.streetName}
                          </p>
                        </CardContent>
                      </CardActionArea>

                      <div className="flex p-2">
                        <div className="flex items-center gap-1">
                          <img
                            className="w-6 h-6 rounded-full ml-1 object-cover"
                            src={propertyOwner?.profileImage}
                            alt={propertyOwner?.firstName}
                          />
                          <span className="font-semibold text-xs text-gray-600">
                            {propertyOwner?.firstName} {propertyOwner?.lastName}
                          </span>
                        </div>
                        <Button
                          onClick={() =>
                            navigate(
                              `/tenant/owner-user/${propertyOwner?.slug}`
                            )
                          }
                          size="small"
                          color="tertiary"
                          variant="outlined"
                          sx={{
                            color: "#0496b4",
                            marginLeft: "auto",
                            marginRight: "0.25rem",
                          }}
                        >
                          More Details
                        </Button>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default AllRentalProperties;
