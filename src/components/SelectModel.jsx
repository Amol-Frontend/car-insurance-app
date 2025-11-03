import { Box, MenuItem, MenuList, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function SelectModel({ brand, onSelect }) {

  const [models, setModels] = useState([]);


    function getModels() {
        const endPoint = "http://localhost:3000/brands?brandName=" + brand
        axios.get(endPoint).then((resp) => {
            console.log("resp", resp.data);
            if (resp && resp.data && resp.data.length > 0) {
                setModels(resp.data[0].models);
            }
        }).catch(error => console.log(error));
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
                            <MenuItem key={index} sx={{ fontSize: '14px' }} onClick={() => onSelect(item.concat)}>
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