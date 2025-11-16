import React from "react";
import styled from 'styled-components';
import TextField from '@/components/shared/TextField';

// Define type for FilterBar props
interface FilterBarProps {
    searchHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    keysHandler: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    searchTerm: string;
    setPlaceTerm?: (term: string) => void;
    isTypoTolerance: boolean;
    setIsTypoTolerance: (val: boolean) => void;
    placeFilterOptions?: unknown;
    currentLocId?: string;
    setCurrentLocId?: (id: string) => void;
    defaultFacets?: unknown;
    setUezdFilter?: (val: string) => void;
    children?: React.ReactNode;
}

const StyledForm = styled.form`
    & > :not(style) {
        margin: 8px;
        width: 25ch;
    }
`;

const FilterBar = ({
                       searchHandler,
                       keysHandler,
                       searchTerm,
                       setPlaceTerm,
                       isTypoTolerance,
                       setIsTypoTolerance,
                       placeFilterOptions,
                       currentLocId,
                       setCurrentLocId,
                       defaultFacets,
                       setUezdFilter,
                        children
                   }: FilterBarProps) => {
    return <>
        <StyledForm
            noValidate
            autoComplete="off"
        >
            <TextField size="small" value={searchTerm} onChange={searchHandler} id="outlined-basic" label="Церковь / Костел" variant="outlined" />
        </StyledForm>
        {children}
    </>
};

export default FilterBar;
