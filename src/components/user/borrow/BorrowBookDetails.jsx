import React, { useEffect, useState } from "react";
import { axiosGetRequest, axiosPostRequest } from "../../../services/axios.service";
import { useParams } from "react-router-dom";
import SubmitButton from "../../buttons/SubmitButton";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

const BorrowBookDetails = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  console.log(users.user.id, "users");
  const routeParams = useParams();
  const navigate = useNavigate();

  console.log(routeParams.id, "roputemsdalfgjsdvf");
  const [books, setBooks] = useState([]);


  const borrowBook=()=>{
    const data = {
      user_id: users.user.id,
      book_id: books.id,
      start_date: Date.now(),
      end_date: Date.now(),
    };

    axiosPostRequest("/borrow/borrowrequest", data)
      .then((resp) => {
        console.log(resp, "resp");
         Swal.fire({
           title: "Request submitted",
           text: "Your Request for borrowing the book is submitted ",
           icon: "success",
         });
         navigate("/user/borrow");
      })
      .catch((error) => {
        console.log(error, "error");
        Swal.fire({
          icon: "error",
          title: "Book borrow request already submitted",
          text: "You have already submitted request for the book!!",
        });
      });
            // console.log(Swal);
}
  useEffect(() => {
    axiosGetRequest(`/borrow/borrowbook/${routeParams.id}`).then((resp) => {
    //   console.log(resp, "resp");
      setBooks(resp);
    });
  }, []);
  return (
    <div>
      <div className="max-w-sm rounded m-8 overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Borrow Book</div>
          <p className="text-gray-700 text-base">Book Details</p>
          {/* <p className="text-gray-700 text-base">
            Book Id:- <span> {books.id}</span>
          </p> */}
            <p className="text-gray-700 text-base">
              Title:- <span> {books.title}</span>
            </p>
          <p className="text-gray-700 text-base">
            Book Category:- <span> {books?.book_category?.type}</span>
          </p>
          {/* <p className="text-gray-700 text-base">
            Publisher Name:- <span> {books?.publisher_detail?.name}</span>
          </p> */}
          <p className="text-gray-700 text-base">
            Isbn:- <span> {books.isbn}</span>
          </p>
          {/* <p className="text-gray-700 text-base">
            Description:- <span> {books.description}</span>
          </p> */}
          <p className="text-gray-700 text-base">
            Price:- <span>{books.price}</span>
          </p>
      
        </div>
        <div className="px-6 pt-4 pb-2">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => navigate(`/user/borrow`)}
          >
            Cancel
          </button>

          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={borrowBook}
          >
            Borrow Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default BorrowBookDetails;
