import { CheckBox } from "@mui/icons-material";
import { Box, Button, Checkbox, Divider, FormControlLabel, Grid, MenuItem, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

function PersonalDetails({ formData, setFormData , handleNext }) {
    const [personalDetails, setPersonalDetails] = useState({
        owner: {
            name: "",
            pincode: null,
            email: "",
            mobileNumber: null
        },
        nominee: {
            name: "",
            releationship: "",
        },
        car: {
            registrationNumber: "",
            engineNumber: ""
        },
        confirm:false
    })


    const relationShipList = [
        { label: "Father", value: "Father" },
        { label: "Mother", value: "Mother" },
        { label: "Spouse", value: "Spouse" },
        { label: "Son", value: "Son" },
        { label: "Daughter", value: "Daughter" },
        { label: "Other", value: "Other" },
    ]

    function handleChange(section, key, value) {
        setPersonalDetails((prev) => (
            {
                ...prev,
                [section]: { ...prev[section], [key]: value }
            }
        ))
    }

    function handleConfirm(e){
        setPersonalDetails({...personalDetails,confirm:e.target.checked});
    }


    function handleUpdate(){
        setFormData({...formData,personalData:personalDetails});
        handleNext();
    }

    return (
        <>
            <Box component={Paper} p={3} elevation={2}>
                <Typography variant="h6" gutterBottom>Personal Details</Typography>
                <Divider sx={{ mb: 2 }}></Divider>

                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Owner Details</Typography>
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <TextField id="outlined-basic" label="Vehicle Owner Name" fullWidth variant="outlined" sx={{ mb: 3 }} value={personalDetails.owner.name} onChange={e => handleChange("owner", "name", e.target.value)} />
                        <TextField id="outlined-basic" label="Pincode" fullWidth variant="outlined" sx={{ mb: 3 }} value={personalDetails.owner.pincode} onChange={e => handleChange("owner", "pincode", e.target.value)} />
                        <TextField id="outlined-basic" label="Email" fullWidth variant="outlined" sx={{ mb: 3 }} value={personalDetails.owner.email} onChange={e => handleChange("owner", "email", e.target.value)} />
                        <TextField id="outlined-basic" label="Mobile Number" fullWidth variant="outlined" sx={{ mb: 3 }} value={personalDetails.owner.mobileNumber} onChange={e => handleChange("owner", "mobileNumber", e.target.value)} />
                        <Divider sx={{ my: 2, border: 1 }}></Divider>
                    </Grid>
                </Grid>

                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Nominee Details</Typography>
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <TextField id="outlined-basic" label="Nominee Name" fullWidth variant="outlined" sx={{ mb: 3 }} value={personalDetails.nominee.mobileNumber} onChange={e => handleChange("nominee", "name", e.target.value)} />
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Relationship"
                            defaultValue=""
                            fullWidth
                            value={personalDetails.nominee.releationship} onChange={e => handleChange("nominee", "releationship", e.target.value)}
                        >
                            {relationShipList.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Divider sx={{ my: 2, border: 1 }}></Divider>
                    </Grid>
                </Grid>

                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Car Details</Typography>
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <TextField id="outlined-basic" label="Registration Number" fullWidth variant="outlined" sx={{ mb: 3 }} value={personalDetails.car.registrationNumber} onChange={e => handleChange("car", "registrationNumber", e.target.value)} />
                        <TextField id="outlined-basic" label="Engine Number" fullWidth variant="outlined" sx={{ mb: 3 }} value={personalDetails.car.engineNumber} onChange={e => handleChange("car", "engineNumber", e.target.value)} />
                    </Grid>
                </Grid>

          <FormControlLabel control={<Checkbox checked={personalDetails.confirm} onChange={handleConfirm}  />} label="I confirm I have a validated PUC Certificate and will continue to renew the same during policy period." />

           <Button
                variant="contained"
                color="warning"
                fullWidth
                sx={{ mt: 3, fontWeight: 600 }}
               onClick={handleUpdate}
              >
                Continue
              </Button>
            </Box>
        </>
    )
}

export default PersonalDetails;