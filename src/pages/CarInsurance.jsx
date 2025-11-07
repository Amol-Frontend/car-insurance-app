import { Box, Button, Step, StepLabel, Stepper,Paper } from "@mui/material";
import React, { useState } from "react";
import BasicDetails from "../components/BasicDetails";
import BasicCarDetails from "../components/BasicCarDetails";
import InsurancePlanPage from "./EligiblePlans";
import EligiblePlans from "./EligiblePlans";
import PersonalDetails from "./PersonalDetails";
import PaymentPage from "./PaymentPage";



const steps = ['BASIC DETAILS', 'CHOOSE PLAN', 'PERSONAL DETAILS', 'PAYMENT'];

function CarInsurance(){


    const [carDetails,setCarDetails] = useState({
        brand : "",
        model : "",
        variant : "",
        planDetails : {},
        personalData : {}
    })



  const [activeStep, setActiveStep] = useState(0);

  function handleBack(){
     setActiveStep(activeStep-1);
  }

  function handleNext(){
     setActiveStep(activeStep+1);
  }

  console.log("Car Insurance Details",carDetails);

    return (
        <>

              <Box sx={{ width: '90%' , margin: "20px" }}>

                <Stepper activeStep={activeStep} alternativeLabel >
                    {
                        steps.map((label, index) => (
                            <Step key={index}>
                                <StepLabel sx={{fontSize:'11px'}}>{label}</StepLabel>
                            </Step>
                        ))
                    }
                </Stepper>

                <Paper sx={{p:3}}>
                    {/* <BasicDetails></BasicDetails> */}
                    {activeStep === 0 && <BasicCarDetails></BasicCarDetails>}

                    {activeStep == 1 && <EligiblePlans formData={carDetails} setFormData={setCarDetails} handleNext={handleNext}></EligiblePlans>}

                    {activeStep == 2 && <PersonalDetails formData={carDetails} setFormData={setCarDetails} handleNext={handleNext}></PersonalDetails>}

                    {activeStep == 3 && <PaymentPage formData={carDetails} setFormData={setCarDetails}></PaymentPage>}
                   </Paper> 
    
              

                <Box sx={{ display: 'flex', justifyContent:'space-between' ,flexDirection: 'row', pt: 2 }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>

                    <Button onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Box>

            </Box>
        </>
    )
}

export default CarInsurance;