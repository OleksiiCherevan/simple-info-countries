import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getFilteredCountries = (countries = [], name = "", region = "") => {

    const filteredByRegionCountries = !region ? countries : countries.filter(country => country.region === region);

    const filteredByNames = !name ? filteredByRegionCountries : filteredByRegionCountries.filter(country => {
        return country.name.common.toLocaleLowerCase().includes(name.toLowerCase());
    })

    return filteredByNames;
};

const fetchCountries = createAsyncThunk(
    "countries/fetchCountries",
    async () => {
        const response = await axios(
            "https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region,cioc"
        );
        
        return  {data: response.data};
    }
);


export const countriesSlice = createSlice({
    name: "countries",
    initialState: {
        status: "pending",
        countries: [],
        countryName: "",
        countryRegion: "",
        availableCountries: [],
    },
    reducers: {
        setCountries: (state, action) => {
            const { region, name } = state;
            state.countries = action.payload.countries;
           
            state.availableCountries = getFilteredCountries(countries, name ,region)
        },
        setName: (state, action) => {
            const { countries, countryRegion:region  } = state;
            const { name } = action.payload;
            
            state.countryName = name; 
            state.availableCountries = getFilteredCountries(countries, name ,region)
        },
        setRegion: (state, action) => {
            const { countries, name  } = state;
            const { region } = action.payload;
             
            state.countryRegion = region;
            state.availableCountries = getFilteredCountries(countries, name ,region)
        },
    },
    extraReducers: {
        [fetchCountries.rejected]: (state, action) => {
            state.status = "pending";
        },
        [fetchCountries.rejected]: (state, action) => {
            state.status = "rejected";
        },
        [fetchCountries.fulfilled]: (state, action) => {
            const {data} = action.payload;
            
            state.countries = data;
            state.availableCountries = data;
            state.status = "fulfilled";
        }
    },
});


export const { setCountries, setName, setRegion } = countriesSlice.actions;
export { fetchCountries } ;
export default countriesSlice.reducer;
