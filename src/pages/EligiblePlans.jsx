import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Radio,
  Button,
  Stack,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPlanDetails } from "../features/insurance/carInsuranceSlice";

export default function EligiblePlans({  handleNext}) {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [idvDetails,setIdvDetails] = useState(null);
  const [addons, setAddons] = useState([]);

  const formData = useSelector((state)=> state.carInsurance);
  const dispatch = useDispatch();

    const totalPremium = useMemo(() => {
        console.log("calculating total premium");
        if (!selectedPlan) return 0;
        const addOnTotal = addons.reduce((sum, a) => sum + a.price.net_premium, 0);
        const addOnGst = addons.reduce((sum, a) => sum + a.price.gst.gst, 0);
        const premium = parseFloat(selectedPlan.price.net_premium || 0) + addOnTotal + selectedPlan.price.gst.gst + addOnGst;
        return premium;
    }, [selectedPlan, addons]);


    useEffect(() => {
        const endPoint = "http://localhost:3000/get-eligible-plan-2";
        axios
            .get(endPoint)
            .then((resp) => {
                if (resp?.data?.plans?.length) {
                    const data = resp.data.plans;
                    setPlans(data);
                    setIdvDetails(resp.data.idv);

                    if (formData && formData.planDetails.planName) {
                        const planSelected = data.filter((plan) => plan.display_name == formData.planDetails.planName);
                        if (planSelected) {
                            setSelectedPlan(planSelected[0]);
                            const addOnSelected = formData.planDetails.selectedAddons.map((e) => e.name);
                            console.log("addOnSelecName", addOnSelected);
                            const addList = planSelected[0].addons.filter((obj) => addOnSelected.includes(obj.display_name));
                            setAddons(addList);
                        }
                    } else {
                        setSelectedPlan(data[0]);
                    }
                  
                }
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        if (selectedPlan) {
            const totalAddOns = addons.reduce((sum, a) => sum + a.price.net_premium, 0);
            const totalAddonGst =  addons.reduce((sum, a) => sum + a.price.gst.gst, 0);
            const data = {
                idv : idvDetails.recommended,
                planName:selectedPlan.display_name,
                netPremium:selectedPlan.price.net_premium,
                grossPrmium:selectedPlan.price.gross_premium,
                planGst:selectedPlan.price.gst.gst,
                selectedAddons:addons.map((obj)=> ({
                    name : obj.display_name,
                    premium : obj.price.net_premium,
                    gst : obj.price.gst.gst
                })),
                addOnTotal : totalAddOns,
                addOnTotalGst : totalAddonGst,
                totalPremium : selectedPlan.price.net_premium + totalAddOns,
                totalPremiumWithGst : totalPremium
            }
            // setFormData({ ...formData, planDetails: data })
            dispatch(setPlanDetails({...data}));
        }
    }, [selectedPlan, addons, totalPremium]);

  if (!selectedPlan) return <Typography>Loading...</Typography>;

//   const totalPremium =
//     parseFloat(selectedPlan.price.net_premium || 0) + selectedPlan.price.gst.gst;



  const toggleAddon = (addon) => {
    const selectedList =   addons.filter((item)=> item.id == addon.id);
    if (selectedList.length > 0) {
      setAddons(addons.filter((a) => a.id !== addon.id));
    } else {
      setAddons([...addons, addon]);
    }
  };

  console.log("selectedPlan",selectedPlan);

  return (
    <Box sx={{ p: 4, backgroundColor: "#fafafa", minHeight: "100vh" }}>
      <Grid container spacing={2}>
        <Grid size={8}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Select Your Plan
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {plans.map((plan, index) => {
              const isSelected = selectedPlan.display_name === plan.display_name;
              return (
                <Card
                  key={index}
                  variant="outlined"
                  onClick={() => {
                    setSelectedPlan(plan);
                  }}
                  sx={{
                    flex: "1 1 calc(33.333% - 16px)", // 3 cards per row
                    cursor: "pointer",
                    borderWidth: isSelected ? 2 : 1,
                    borderColor: isSelected ? "#f6b400" : "#ddd",
                    transition: "0.2s",
                    "&:hover": {
                      boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Radio
                        checked={isSelected}
                        onChange={() => {
                          setSelectedPlan(plan);
                        }}
                        color="warning"
                      />
                      <Typography variant="subtitle1" fontWeight={600}>
                        {plan.display_name}
                      </Typography>
                    </Stack>

                    <Stack spacing={0.6} mt={1}>
                      {plan?.primary_description_v1?.map((desc, idx) => (
                        <Typography key={idx} fontSize={13}>
                          ✅ {desc.text}
                        </Typography>
                      ))}
                    </Stack>

                    <Divider sx={{ my: 2 }} />

                    <Box textAlign="right">
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textDecoration: "line-through" }}
                      >
                        ₹{(plan.price.gross_premium || 0).toLocaleString()}
                      </Typography>
                      <Typography variant="h6" fontWeight={700}>
                        ₹{(plan.price.net_premium || 0).toLocaleString()}
                      </Typography>
                      <Typography fontSize={12} color="text.secondary">
                        (Excl. GST)
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Box>

          {/* ---- Mandatory Cover ---- */}
          <Card
            sx={{
              mt: 3,
              p: 2,
              borderColor: "#f6b400",
              borderLeft: "5px solid #f6b400",
            }}
            variant="outlined"
          >
            <FormControlLabel
              control={<Checkbox checked readOnly color="warning" />}
              label={
                <Typography>
                  <strong>Personal Accident Cover - ₹1,899</strong>
                </Typography>
              }
            />
            <Typography color="error" fontSize={13}>
              Having a personal accident cover is mandatory
            </Typography>
          </Card>

          {/* ---- IDV Section ---- */}
          <Card sx={{ mt: 3, p: 2 }} variant="outlined">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>
                IDV (Insured Value): <strong>₹{/* Add IDV Value */}</strong>
              </Typography>
              <Button size="small" variant="outlined" color="warning">
                Edit
              </Button>
            </Stack>
          </Card>

          {/* ---- Add-ons ---- */}
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Customize Your Plan
          </Typography>

          {selectedPlan.addons?.length === 0 ? (
            <Typography color="text.secondary" fontSize={14}>
              No add-ons available for this plan.
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {selectedPlan.addons.map((addon, index) => {
                const isSelectedAddon = addons.filter((item)=> item.id == addon.id).length > 0; 
                return (
                  <Grid item size={12} key={index}>
                    <Card
                      sx={{
                        p: 2,
                        borderColor: isSelectedAddon ? "#f6b400" : "#ddd",
                        borderWidth: 1,
                        "&:hover": {
                          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        },
                      }}
                      variant="outlined"
                    >
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>
                          <Typography fontWeight={600}>
                            {addon.display_name}
                          </Typography>
                          <Typography fontSize={12} color="text.secondary">
                            {addon.description_v2 ||
                              addon.description ||
                              ""}
                          </Typography>
                        </Box>
                        <Box textAlign="right">
                          <Typography fontWeight={700} color="success.main">
                            ₹{addon.price?.gross_premium?.toLocaleString()}
                          </Typography>
                          <Button
                            variant={isSelectedAddon ? "contained" : "outlined"}
                            color="warning"
                            size="small"
                            sx={{
                              mt: 1,
                              textTransform: "none",
                              fontWeight: 600,
                            }}
                            onClick={() => toggleAddon(addon)}
                          >
                            {isSelectedAddon ? "Selected" : "Select"}
                          </Button>
                        </Box>
                      </Stack>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Grid>

        {/* RIGHT SECTION (Total Premium) */}
        <Grid size={4}>
          <Box sx={{ mt: 6 }}>
            <Card
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
              variant="outlined"
            >
              <Typography variant="subtitle2" color="text.secondary">
                Total Premium (With GST)
              </Typography>

              <Stack direction="row" alignItems="baseline" spacing={1}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textDecoration: "line-through" }}
                >
                  ₹{selectedPlan.price.net_strike_through_premium}
                </Typography>
                <Typography variant="h5" fontWeight={700}>
                  ₹{totalPremium.toLocaleString()}
                </Typography>
              </Stack>

              <Typography fontSize={12} color="text.secondary">
                (With 18% GST)
              </Typography>

              <Button
                variant="contained"
                color="warning"
                fullWidth
                sx={{ mt: 3, fontWeight: 600 }}
                onClick={handleNext}
              >
                Continue
              </Button>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
