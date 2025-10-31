import { Box, Grid, MenuItem, MenuList, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SelectField from "./SelectField";
import axios from "axios";

function BasicDetails() {

    const [brands, setBrands] = useState([
        {
            brandName: "Maruti",
            logo: "https://d2h44aw7l5xdvz.cloudfront.net/assets/icons/Maruti_Suzuki_n.png"
        },
        {
            brandName: "TATA",
            logo: ""
        },
        {
            brandName: "Hyundai",
            logo: "https://d2h44aw7l5xdvz.cloudfront.net/assets/icons/Hyundai_n.png",
        },
        {
            brandName: "Toyota",
            logo: "https://d2h44aw7l5xdvz.cloudfront.net/assets/icons/Toyota_n.png",
        },
        {
            brandName: "Mahindra",
            logo: "https://d2h44aw7l5xdvz.cloudfront.net/assets/icons/Mahindra_n.png",
        },
        {
            brandName: "Honda",
            logo: "https://d2h44aw7l5xdvz.cloudfront.net/assets/icons/Honda_n.png",
        }
    ]
    )

    const [models, setModels] = useState([]);
    const [variants,setVariants] = useState([]);



    const [selectBrand, setSelectBrand] = useState("");
    const [selectModel, setSelectModel] = useState("");
    const [selectVariant,setSelectVariant] = useState("");


    function getModels() {
        const endPoint = "http://localhost:3000/brands?brandName=" + selectBrand
        axios.get(endPoint).then((resp) => {
            console.log("resp", resp.data);
            if (resp && resp.data && resp.data.length > 0) {
                setModels(resp.data[0].models);
            }
        }).catch(error => console.log(error));
    }


    function getVariants() {
        const endPoint = "http://localhost:3000/variants?modelName=" + selectModel
        axios.get(endPoint).then((resp) => {
            console.log("resp", resp.data);
            if (resp && resp.data && resp.data.length > 0) {
                setVariants(resp.data[0].variantList);
            }
        }).catch(error => console.log(error));
    }

    useEffect(() => {
        getModels();
    }, [selectBrand]);


    useEffect(()=>{
      getVariants();
    },[selectModel]);

    return (
        <>
            <Grid container spacing={2}>
                <Grid size={8} sx={{ border: 2, padding: 1 }}>
                    {
                        !selectBrand &&
                        <Box>
                            <Typography variant="subtitle1">Select Brand</Typography>
                            {/* <SelectField label="Brand" options={brands} onChange={(val) => setSelectBrand(val)}></SelectField> */}
                            <MenuList>
                                {
                                    brands.map((item, index) => (
                                        <MenuItem key={index} sx={{ fontSize: '14px' }} onClick={() => setSelectBrand(item.brandName)}>
                                            {item.brandName}
                                        </MenuItem>
                                    ))
                                }

                            </MenuList>
                        </Box>
                    }

                    {
                        (selectBrand && !selectModel) &&
                        <Box>
                            <Typography variant="subtitle1">Select Model</Typography>
                            {/* <SelectField label='Model' options={models} onChange={(val) => selectModel(val)}></SelectField> */}
                            <MenuList sx={{ maxHeight: 250, overflow: 'auto' }}>
                                {
                                    models.map((item, index) => (
                                        <MenuItem key={index} sx={{ fontSize: '14px' }} onClick={() => setSelectModel(item.concat)}>
                                            {item.concat}
                                        </MenuItem>
                                    ))
                                }

                            </MenuList>
                        </Box>
                    }

                    {
                        (selectBrand && selectModel ) &&
                        <Box>
                            <Typography variant="subtitle1">Select Variant</Typography>
                            {/* <SelectField label='Model' options={models} onChange={(val) => selectModel(val)}></SelectField> */}
                            <MenuList sx={{ maxHeight: 250, overflow: 'auto' }}>
                                {
                                    variants.map((item, index) => (
                                        <MenuItem key={index} sx={{ fontSize: '14px' }} onClick={() => setSelectVariant(item.new_variant)}>
                                            {item.new_variant}
                                        </MenuItem>
                                    ))
                                }

                            </MenuList>
                        </Box>
                    }
                    

                </Grid>
                <Grid size={4} sx={{ border: 2, padding: 1 }}>
                    <Typography variant="body2">Brand Name : {selectBrand}</Typography>
                    <Typography variant="body2">Model Name : {selectModel}</Typography>
                     <Typography variant="body2">Variant Name : {selectVariant}</Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default BasicDetails