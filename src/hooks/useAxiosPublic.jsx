import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://find-my-mate-server.vercel.app'
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
