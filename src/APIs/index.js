import axios from "axios";

export const getData = () => axios.get("https://dummyjson.com/products");
