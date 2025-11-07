import { Box, MenuItem, MenuList, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModel } from "../features/insurance/carInsuranceSlice";

function SelectModel({ onSelect }) {

  const [models, setModels] = useState([]);

  const dispatch = useDispatch();
  const {brand} = useSelector((state)=> state.carInsurance);


    function getModels() {
        const endPoint = "http://localhost:3000/brands?brandName=" + brand
        axios.get(endPoint).then((resp) => {
            console.log("resp", resp.data);
            if (resp && resp.data && resp.data.length > 0) {
                setModels(resp.data[0].models);
            }
        }).catch(error => console.log(error));
    }

   function handleSelect(model){
      dispatch(setModel(model));
      onSelect(model);
    }


    useEffect(() => {
        getModels();
    }, [brand]);

    return (
        <>
            <Box>
                <Typography variant="h6" sx={{fontSize:'18px'}}>Select Model</Typography>
                {/* <SelectField label='Model' options={models} onChange={(val) => selectModel(val)}></SelectField> */}
                <MenuList sx={{ maxHeight: 250, overflow: 'auto' }}>
                    {
                        models.map((item, index) => (
                            <MenuItem key={index} sx={{ fontSize: '14px' }} onClick={() => handleSelect(item.concat)}>
                                {item.concat}
                            </MenuItem>
                        ))
                    }

                </MenuList>
            </Box>
        </>
    )
}

export default SelectModel;