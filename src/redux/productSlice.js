import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};


export const fetchProductData = createAsyncThunk(
  "product/fetchProductData",
  async (id, { rejectWithValue }) => {
    try {
      const jwtToken = Cookies.get("jwt_token"); 
      const response = await fetch(`https://apis.ccbp.in/products/${id}`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();

      
      const formatData = data => ({
        id: data.id,
        title: data.title,
        brand: data.brand,
        availability: data.availability,
        description: data.description,
        price: data.price,
        rating: data.rating,
        totalReviews: data.total_reviews,
        imageUrl: data.image_url,
      });

      const productData = formatData(data);
      const similarProducts = data.similar_products.map(formatData);

      return { productData, similarProducts };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  productData: null,
  similarProducts: [],
  apiStatus: apiStatusConstants.initial,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProductData.pending, state => {
        state.apiStatus = apiStatusConstants.inProgress;
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.productData = action.payload.productData;
        state.similarProducts = action.payload.similarProducts;
        state.apiStatus = apiStatusConstants.success;
      })
      .addCase(fetchProductData.rejected, state => {
        state.apiStatus = apiStatusConstants.failure;
      });
  },
});

export default productSlice.reducer;