import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import AddBooks from "./components/books/Books";
import Registration from "./components/registration";
import Books from "./components/books/Books";
import Author from "./components/books/Author";
import Publisher from "./components/books/Publiser";
import axios from "axios";
import AdminView from "./components/admin/AdminView";
import AdminDashboard from "./components/adminDashboard/AdminDashboard";
import ShowBooks from "./components/books/ShowBooks";
import DisplayBooks from "./components/books/DisplayBooks";
import ManageUser from "./components/manage/ManageUser";
import UserDashboard from "./components/user/userDashboard/UserDashboard";
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import { currUser } from "./redux/slices/users/authSlice";
import UserView from "./components/user/userDashboard/UserView";
import Borrow from "./components/user/borrow/Borrow";
import UserBooks from "./components/user/books/UserBooks";
import UserProfile from "./components/user/profile/UserProfile";
import BorrowBookDetails from "./components/user/borrow/BorrowBookDetails";
import BorrowRequest from "./components/adminBorrow/BorrowRequest";
import BorrowRejected from "./components/adminBorrow/BorrowRejected";
import BorrowActive from "./components/adminBorrow/BorrowActive";
import BookDetails from "./components/user/books/BookDetails";
import PageNotFound from "./components/PageNotFound/PageNotFound";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3002";
function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  useEffect(() => {}, [dispatch]);

  const Admin = users.LoggedIn && users.user.role_id === 1;
  const user = users.LoggedIn && users.user.role_id === 2;

  return (
    <div>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        {Admin && (
          <Route element={<AdminView />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            <Route path="/admin/books/addbooks" element={<AddBooks />} />
            <Route path="/admin/books/addauthor" element={<Author />} />
            <Route path="/admin/books/addpublisher" element={<Publisher />} />
            <Route path="/admin/books/display" element={<ShowBooks />} />
            <Route path="/admin/manage/manageuser" element={<ManageUser />} />
            <Route path="/admin/books/addbooks/:id" element={<AddBooks />} />
            <Route path="/admin/books/addauthor/:id" element={<Author />} />
            <Route
              path="/admin/books/addpublisher/:id"
              element={<Publisher />}
            />

            <Route
              path="/admin/borrow/handleborrow"
              element={<BorrowRequest />}
            />
            <Route
              path="/admin/borrow/handleborrow"
              element={<BorrowRequest />}
            />
            <Route
              path="/admin/borrow/handleborrow"
              element={<BorrowRequest />}
            />
            <Route
              path="/admin/borrow/handlereject"
              element={<BorrowRejected />}
            />
            <Route
              path="/admin/borrow/activeborrow"
              element={<BorrowActive />}
            />
          </Route>
        )}

        {user && (
          <Route element={<UserView />}>

            <Route path="/user/books" element={<UserBooks />} />
            <Route path="/user/borrow" element={<Borrow />} />
            <Route path="/user/profile" element={<UserProfile />} />
            <Route
              path="/user/borrow/bookdetails/:id"
              element={<BorrowBookDetails />}
            />

            <Route path="user/book/bookdetails/:id" element={<BookDetails />} />
          </Route>
        )}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
