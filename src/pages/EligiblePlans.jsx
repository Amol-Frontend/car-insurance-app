import React, { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Radio,
    Button,
    Chip,
    Stack,
    Divider,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import axios from "axios";

export default function EligiblePlans({ formData, setFormData }) {
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [addons, setAddons] = useState([]);


    useEffect(() => {
        const endPoint = "http://localhost:3000/get-eligible-plan-2";
        axios
            .get(endPoint)
            .then((resp) => {
                if (resp && resp.data && resp.data.plans) {
                    const data = resp.data.plans;
                    console.log("ad",data);
                    setPlans(data);
                    setSelectedPlan(data[0]);
                    setAddons(data[0].addons);
                }
            })
            .catch((err) => console.error(err));
    }, []);

    if (!selectedPlan) return <Typography>Loading...</Typography>;

    const totalPremium = parseFloat(selectedPlan.price.net_premium || 0) + selectedPlan.price.gst.gst;
    const isSelected = false;

     console.log("selectedPlan",selectedPlan.addons);
    return (
        <Box sx={{ p: 4, backgroundColor: "#fafafa", minHeight: "100vh" }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Select Your Plan
                    </Typography>

                    <Grid container spacing={2}>
                        {plans.map((plan, index) => (
                            <Grid item  md={4}  key={index}>
                                <Card
                                    variant="outlined"
                                    onClick={() => setSelectedPlan(plan)}
                                    sx={{
                                        cursor: "pointer",
                                        borderWidth:
                                            selectedPlan.display_name === plan.display_name ? 2 : 1,
                                        borderColor:
                                            selectedPlan.display_name === plan.display_name
                                                ? "#f6b400"
                                                : "#ddd",
                                        "&:hover": {
                                            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                                        },
                                        height: "100%",
                                    }}
                                >
                                    <CardContent>
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <Radio
                                                checked={selectedPlan.display_name === plan.display_name}
                                                onChange={() => setSelectedPlan(plan)}
                                                color="warning"
                                            />
                                            <Typography variant="subtitle1" fontWeight={600}>
                                                {plan.display_name}
                                            </Typography>
                                        </Stack>

                                        <Stack spacing={1} mt={1}>
                                          { plan?.primary_description_v1?.map((plan,idex)=> (
                                            <>
                                               <Typography key={index} fontSize={13}>
                                                ✅  {plan.text}
                                               </Typography>
                                            </>
                                          ))


                                          }

                                            {/* {plan.planName === "ComprehensiveCover" ? (
                                                <>
                                                    <Typography fontSize={13}>
                                                        ✅ 1 year Own Damage
                                                    </Typography>
                                                    <Typography fontSize={13}>
                                                        ✅ 3 year Third Party
                                                    </Typography>
                                                    <Typography fontSize={13}>
                                                        ✅ Up to 15000 km/year
                                                    </Typography>
                                                </>
                                            ) : (
                                                <>
                                                    <Typography fontSize={13}>
                                                        ✅ 1 year Third Party
                                                    </Typography>
                                                </>
                                            )} */}
                                        </Stack>

                                        <Divider sx={{ my: 2 }} />
                                       
                                        {/* Plan-specific Add-ons */}
                                    

                                        {/* Premium info */}
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
                            </Grid>
                        ))}
                    </Grid>

 {/* Personal Accident Cover Section */}
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

                    {/* IDV Section */}
                    <Card sx={{ mt: 3, p: 2 }} variant="outlined">
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography>
                                IDV (Insured Value):{" "}
                                <strong>
                                    {/* {selectedPlan.vehicle.vehicleIDV.idv.toLocaleString()} */}
                                </strong>
                            </Typography>
                            <Button size="small" variant="outlined" color="warning">
                                Edit
                            </Button>
                        </Stack>
                    </Card>


 {/* Add Ons Section */}

                    <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                        Customize Your Plan
                    </Typography>

                     {
                        console.log("Selected Plan",selectedPlan)
                     }
                    {selectedPlan.addons.length === 0 && (
                        <Typography color="text.secondary" fontSize={14}>
                            No add-ons available for this plan.
                        </Typography>
                    )}

                  

                    {selectedPlan.addons.map((addon, index) => (
                        <>
                            <Grid container spacing={2} w>
                                <Card
                                    key={index}
                                    sx={{
                                        mb: 2,
                                        p: 2,
                                        borderColor: isSelected ? "#f6b400" : "#ddd",
                                        borderWidth: 1,
                                        "&:hover": { boxShadow: "0 2px 8px rgba(0,0,0,0.05)" },
                                        maxWidth:500
                                    }}
                                    variant="outlined"
                                >
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Box>
                                            <Typography fontWeight={600}>{addon.display_name}</Typography>
                                            <Typography fontSize={12} color="text.secondary">
                                                {addon.description_v2 || addon.description || ""}
                                            </Typography>
                                        </Box>
                                        <Box textAlign="right">
                                            <Typography fontWeight={700} color="success.main">
                                                ₹{addon.price?.gross_premium?.toLocaleString()}
                                            </Typography>
                                            <Button
                                                variant={isSelected ? "contained" : "outlined"}
                                                color="warning"
                                                size="small"
                                                sx={{ mt: 1, textTransform: "none", fontWeight: 600 }}
                                                onClick={() => toggleAddon(addon)}
                                            >
                                                {isSelected ? "Selected" : "Select"}
                                            </Button>
                                        </Box>
                                    </Stack>
                                </Card>
                            </Grid>
                        </>
                    )
                    )
                    }
                

                </Grid>

                <Grid item xs={12} md={4}>
                    <Box
                        sx={{
                            // position: "sticky",
                            // top: 10,
                             marginTop:'50px'

                        }}
                    >
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
