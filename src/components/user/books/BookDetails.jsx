import React, { useEffect, useState } from "react";
import {
  axiosGetRequest,
  axiosPostRequest,
} from "../../../services/axios.service";
import { useParams } from "react-router-dom";
import SubmitButton from "../../buttons/SubmitButton";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BookDetails = () => {
     const dispatch = useDispatch();
     const users = useSelector((state) => state.users);
     console.log(users.user.id, "users");
     const routeParams = useParams();
     const navigate = useNavigate();

     console.log(routeParams.id, "roputemsdalfgjsdvf");
     const [books, setBooks] = useState([]);

     const borrowBook=()=>{

     }

     useEffect(() => {
       axiosGetRequest(`/user/userviewbook/${routeParams.id}`).then(
         (resp) => {
             console.log(resp, "resp");
           setBooks(resp);
         }
       );
     }, []);

     console.log(books,'books of particular detail');

  return (
    <div>
      <div className="max-w-sm rounded m-8 overflow-hidden shadow-lg" 
      style={{margin:`0 auto`}}
    
>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Borrow Book</div>
          <p className="text-gray-700 text-base">Book Details</p>
          <p className="text-gray-700 text-base">
            Book Id:- <span> {books.id}</span>
          </p>
          <p className="text-gray-700 text-base">
            Title:- <span> {books.title}</span>
          </p>
          <p className="text-gray-700 text-base">
            Book Category:- <span> {books?.book_category?.type}</span>
          </p>
          <p className="text-gray-700 text-base">
            Publisher Name:- <span> {books?.publisher_detail?.name}</span>
          </p>
          <p className="text-gray-700 text-base">
            Isbn:- <span> {books.isbn}</span>
          </p>
          <p className="text-gray-700 text-base">
            Description:- <span> {books.description}</span>
          </p>
          <p className="text-gray-700 text-base">
            Price:- <span>{books.price}</span>
          </p>
          <div>
            <p>Image:</p>
            <img src={books.photo} alt="no preview avilable" />
          </div>
        </div>
        <div className="px-6 pt-4 pb-2">
          <Link to="/user/books">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={borrowBook}
            >
              Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
