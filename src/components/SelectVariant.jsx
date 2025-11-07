import { Box, MenuItem, MenuList, Tab, Tabs, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVariant } from "../features/insurance/carInsuranceSlice";


function SelectVariant({onSelect }) {

    const [variants, setVariants] = useState([]);
    const [filter, setFilter] = useState("All");
    const [fuelTypes,setFuleTypes] = useState([]);


    const dispatch = useDispatch();
    const {model} = useSelector((state)=> state.carInsurance);

    function handleSelect(variantName){
        dispatch(setVariant(variantName))
        onSelect(variantName);
    }
   // const [filteredVariants,setFilteredVariants] = useState([]);

    useEffect(() => {
        getVariants();
    }, [model]);

    useEffect(() => {
        const types = [...new Set(variants.map((obj) => obj['Fuel Type']))];
        types.unshift("All");
        setFuleTypes(types);
        console.log("fuleTypes", types);
    }, [variants]);


    const filterVariants = useMemo(() => {
        return variants.filter((el) => {
            console.log("inside filterVariants" + filter);
            if (filter == 'All') {
                return true
            } else {
                let fuleType = el['Fuel Type'];
                return fuleType.toLowerCase().includes(filter.toLowerCase());
                //return el['Fuel Type'] == filter;
            }
        }
        )
    }, [filter, variants]);
    console.log("filter",filterVariants);


    function getVariants() {
        const endPoint = "http://localhost:3000/variants?modelName=" + model
        axios.get(endPoint).then((resp) => {
            console.log("resp", resp.data);
            if (resp && resp.data && resp.data.length > 0) {
                setVariants(resp.data[0].variantList);
            }
        }).catch(error => console.log(error));
    }

    return (
        <>
            <Box>
                <Typography variant="subtitle1">Select Variant</Typography>
                {/* <SelectField label='Model' options={models} onChange={(val) => selectModel(val)}></SelectField> */}


                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={filter} onChange={(e, newVal) => setFilter(newVal)} textColor="primary" aria-label="basic tabs example">
                            {fuelTypes.map((type, index) => (
                                <Tab key={index} label={type} value={type} />
                            ))}

                        </Tabs>
                    </Box>

                </Box>


                <MenuList sx={{ maxHeight: 250, overflow: 'auto' }}>
                    {
                        filterVariants.map((item, index) => (
                            <MenuItem key={index} sx={{ fontSize: '14px' }} onClick={() => handleSelect(item.new_variant)}>
                                {item.new_variant}
                            </MenuItem>
                        ))
                    }

                </MenuList>
            </Box>
        </>
    )
}

export default SelectVariant;