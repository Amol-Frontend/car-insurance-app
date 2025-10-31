import { Box, MenuItem, MenuList } from "@mui/material";
import React from "react";

function SelectField({ label, options , onChange }) {
    console.log("options", options)
    return (
        <>
            <Box sx={{ height: 350, overflow: 'auto' }}>
                <MenuList>
                    {
                        options.map((item, index) => (
                            <MenuItem key={index} sx={{ fontSize: '14px' }} onClick={() => onChange(item.brandName)}>
                                {item.brandName}
                            </MenuItem>
                        ))
                    }

                </MenuList>
            </Box>

        </>
    )

}

export default SelectField;