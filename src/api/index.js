import { initialUserSellerState } from '../store/context-reducers/userSellerReducer';
import {
    instanceAWSS3,
    instanceCOMAPI
 } from '../axios/axios-instances';

/**
 * TODO: 
 * @param {*} sellerURL 
 * @returns 
 */
export const getsSellerConfigurationData = async (sellerURL='www.localhost') => {
    try {
        const { data : sellerConfigurations } = await instanceAWSS3.get(
            `store-configs/${sellerURL}.json`
        );
        
        console.log("sellerConfigurations", sellerConfigurations);
        return { sellerConfigurations, error : null }
    } catch (error) {
        return { sellerConfigurations : null, error }
    }
}

/**
 * TODO: 
 * 
 * 
 * @param {*} sellerURL 
 * @returns 
 */
 export const getDefaultCountriesFromAWSS3 = async (jsonFileName='countries') => {
    try {
        const { data : DefaultCountries } = await instanceAWSS3.get(
            `${jsonFileName}.json`
        );
        
        return { DefaultCountries, error : null }
    } catch (error) {
        return { DefaultCountries : null, error }
    }
}

/**
 * TODO: 
 * 
 * 
 * @param {*} sellerURL
 * 
 * @returns 
 */
 export const getDefaultLoyaltyProgramsFromAWSS3 = async (jsonFileName='loyalty') => {
    try {
        const { data : DefaultCountryLoyaltyPrograms } = await instanceAWSS3.get(
            `${jsonFileName}.json`
        );
        
        return { DefaultCountryLoyaltyPrograms, error : null }
    } catch (error) {
        return { DefaultCountryLoyaltyPrograms : null, error }
    }
}

/**
 * TODO: 
 * 
 * @returns 
 */
export const getUserFromAPI = async () => {
    try {
        const ax = await instanceCOMAPI();
        const response = await ax.get("user");

        // check if user profile exist if it does return the user details else
        // return the default user that has the 0 properties set in the reducer
        if (response.status === 200) {
            return { User: response.data , error: null };
        }

        return { User: initialUserSellerState.User , error: null };
    } catch (error) {
        return { User: null, error: error }
    }
}

/**
 * TODO:
 * 
 * @param {*} userID 
 * @param {*} sellerID 
 * 
 * @returns 
 */
 export const getUserSellerFromAPI = async (userID, sellerID) => {
    try {
        const ax = await instanceCOMAPI();
        const response = await ax.get(`userseller/${userID}/${sellerID}`);

        // check if user-seller record exist if it does return the user-seller
        // entity else return the default userseller that has the 0 properties
        // set in the reducer
        if (response.status === 200) {
            return { UserSeller: response.data , error: null };
        }

        return { UserSeller: initialUserSellerState.UserSeller , error: null };
    } catch (error) {
        return { UserSeller: null, error: error }
    }
}