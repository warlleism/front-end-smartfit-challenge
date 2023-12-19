import axios from "axios";
import { useQuery } from "react-query";
import useStore from "../context/useStore";

export const Api = () => {
    const { addItems } = useStore();

    const { data, isLoading } = useQuery(
        "unites",
        async () => {
            const response = await axios.get("https://test-frontend-developer.s3.amazonaws.com/data/locations.json");
            const unites = response.data.locations;
            return unites;
        },
        {
            staleTime: 1000 * 100,
            onSuccess: (data) => { addItems(data) },
        }
    );


    return (<></>)
};
