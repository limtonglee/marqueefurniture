import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import { Input } from '@mui/material';

const Searchbar = ({placeholder, onChange}) => {
  return (
        <>
            <SearchIcon />
            <Input
                placeholder = {placeholder}
                onChange = {onChange}
                sx={{minWidth: 400}}
            />
        </>
  )
}

export default Searchbar