import { Box, Button, Grid, IconButton, Link, Typography } from "@mui/material";
import React, { useState } from "react";
import SelectBrand from "./SelectBrand";
import SelectModel from "./SelectModel";
import SelectVariant from "./SelectVariant";
import { CreateOutlined } from "@mui/icons-material";
import CreateIcon from '@mui/icons-material/Create';
import EditIcon from '@mui/icons-material/Edit'
function BasicCarDetails({ formData, setFormData }) {
    const [step, setStep] = useState("brand");

    function handleSelect(key, value) {
        console.log("key" + key, "value" + value)
        setFormData({ ...formData, [key]: value });
        if (step == 'brand') setStep("model");
        if (step == 'model') setStep("variant");
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid size={8} sx={{ border: 2, padding: 1 }}>

                    {
                        step == 'brand' && <SelectBrand onSelect={(v) => handleSelect("brand", v)}></SelectBrand>
                    }

                    {
                        step == 'model' && <SelectModel brand={formData.brand} onSelect={(v) => handleSelect("model", v)}></SelectModel>
                    }

                    {
                        step == 'variant' && <SelectVariant model={formData.model} onSelect={(v) => handleSelect("variant", v)}></SelectVariant>
                    }


                </Grid>


<Grid size={4} sx={{ border: 2, padding: 1 }}>
  <Box mb={2} display="flex" alignItems="center">
    <Typography variant="body2">
      Brand Name : {formData.brand}
    </Typography>
    {formData.brand && (
      <IconButton
        size="small"
        sx={{ marginLeft: '8px' }}
        onClick={() => setStep('brand')}
      >
        <EditIcon fontSize="small" />
      </IconButton>
    )}
  </Box>

  <Box mb={2} display="flex" alignItems="center">
    <Typography variant="body2">
      Model Name : {formData.model}
    </Typography>
    {formData.model && (
      <IconButton
        size="small"
        sx={{ marginLeft: '8px' }}
        onClick={() => setStep('model')}
      >
        <EditIcon fontSize="small" />
      </IconButton>
    )}
  </Box>

  <Box mb={2} display="flex" alignItems="center">
    <Typography variant="body2">
      Variant Name : {formData.variant}
    </Typography>
    {formData.variant && (
      <IconButton
        size="small"
        sx={{ marginLeft: '8px' }}
        onClick={() => setStep('variant')}
      >
        <EditIcon fontSize="small" />
      </IconButton>
    )}
  </Box>
</Grid>

            </Grid>
        </>
    )
}

export default BasicCarDetails;