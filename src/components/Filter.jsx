import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { setRegion as setGlobalRegion } from "../store/countriesSlice";
import STATIC_DATA from "../assets/static.json" 
import { IoChevronDown } from "react-icons/io5";

const FilterEl = styled.div`
    position: relative;
`;

const FilterContainer = styled.div`
    width: 220px;
    padding: 15px;
    margin-left: auto;
    background-color: var(--colors-el);
    box-shadow: var(--shadow);
    color: var(--colors-ft);
    border-radius: 3px;
`;

const FilterWrapper = styled.div`
    position: absolute;
    margin-top: 6px;
    left: 0%;
    width: 100%;

    display: flex;
    flex-direction: column;
`;

const FilterSelectButton = styled.div`
    display: flex;
    align-items: center;
`;

const FilterItems = styled.div`
    display: flex;
    flex-direction: column;
`;

const FilterItem = styled.button`
    cursor: pointer;
    width: 100%;
    padding: 5px 0;
    color: var(--colors-ft);
    text-transform: capitalize;
    text-align: start;
    background-color: transparent;
    border: none;

`;
const REGIONS = STATIC_DATA.REGIONS;
const REGION_DEFAULT = "Filter by Region";

const RegionFilter = () => {
    const dispatcher = useDispatch();
    const [region, setRegion] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen((isOpen) => !isOpen);
    };

    const handleSetRegion = (region) => {
        setRegion(region);
    }

    useEffect(() => {
        dispatcher(setGlobalRegion({region}))
    }, [region])

    return (
        <FilterEl>
            <FilterContainer>
                <FilterSelectButton onClick={handleOpen}>
                    <FilterItem>{region ? region : REGION_DEFAULT}</FilterItem>
                    <IoChevronDown></IoChevronDown>
                </FilterSelectButton>
            </FilterContainer>

            {isOpen && (
                <FilterWrapper>
                    <FilterContainer>
                        <FilterItems>
                            {REGIONS.map((region, index) => (
                                <FilterItem key={region} onClick={()=> handleSetRegion(REGIONS[index])}>{region}</FilterItem>
                            ))}
                            { !region ?? <FilterItem onClick={() => handleSetRegion("")}>{REGION_DEFAULT}</FilterItem>}
                        </FilterItems>
                    </FilterContainer>
                </FilterWrapper>
            )}
        </FilterEl>
    );
};

export default RegionFilter;
