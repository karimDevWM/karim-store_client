import { Box, Pagination, Typography } from "@mui/material";
import { Metadata } from "../models/pagination";
import { useState } from "react";

interface Props {
    metadata: Metadata;
    onPageChange: (pages: number) => void;
}

export default function AppPagination({metadata, onPageChange}: Props) {
    const {currentPage, totalCount, totalPages, pageSize} = metadata;
    const [pageNumber, setPageNumber] = useState(currentPage);

    function handlePageChange(page: number) {
        setPageNumber(page);
        onPageChange(page);
    }

    return (
        <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography>
                Displaying {(currentPage - 1)*pageSize+1} - 
                {currentPage*pageSize > totalCount 
                ? totalCount 
                : currentPage*pageSize} of {totalCount} items
            </Typography>
            <Pagination
                color="secondary"
                size="large"
                count={totalPages}
                page={pageNumber}
                onChange={(e, page) => handlePageChange(page)}
            />
        </Box>
    )
}