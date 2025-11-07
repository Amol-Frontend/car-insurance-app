import { Box, MenuItem, MenuList, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setBrand } from "../features/insurance/carInsuranceSlice";

function SelectBrand({onSelect}) {
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

    const dispatch = useDispatch();
    
    function handleSelect(brand){
       dispatch(setBrand(brand));    
        onSelect(brand);
    }
    


    return (
        <>

            <Box>
                <Typography variant="h6" sx={{fontSize:'18px'}}>Select Brand</Typography>
                {/* <SelectField label="Brand" options={brands} onChange={(val) => setSelectBrand(val)}></SelectField> */}
                <MenuList>
                    {
                        brands.map((item, index) => (
                            <MenuItem key={index} sx={{ fontSize: '14px' }} onClick={() => handleSelect(item.brandName)}>
                                {item.brandName}
                            </MenuItem>
                        ))
                    }

                </MenuList>
            </Box>

        </>
    )
}

export default SelectBrand;