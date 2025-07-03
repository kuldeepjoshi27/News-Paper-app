import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./Context/DataContext";
import CategoryPage from "./Components/CategoryPage/CategoryPage";
import DescriptionPage from "./Components/DescriptionPage/DescriptionPage";
import Home from "./Components/Home";
import News from "./Components/Admin/News";
import AdminLayout from "./Components/Admin/AdminLayout"; // Admin layout
import Dashboard from "./Components/Admin/Dashboard";
import Draft from "./Components/Admin/Draft";
import Category from "./Components/Admin/Category";
import Settings from "./Components/Admin/Settings";
import AddNews from "./Components/Admin/AddNews";
import EditNews from "./Components/Admin/EditNews";
import Login from "./Components/LoginSignup/Login";
import SignUp from "./Components/LoginSignup/Signup";
import MiddleNewsBar from "./Components/HomePageNews/MiddleNewsBar";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  return (
    <DataProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public routes */}
          <Route element={<Home />}>
            <Route index element={<MiddleNewsBar />} />
            <Route path="/:categoryName" element={<CategoryPage />} />
            <Route path="/:category_slug/:slug" element={<DescriptionPage />} />
          </Route> 

          <Route path="/login" element={<Login />}></Route>
          <Route path="/Signup" element={<SignUp />}></Route>

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            {/* AdminHome as the default route */}
            <Route index element={<Dashboard />} />
            <Route path="news" element={<News />} />
            <Route path="add-news" element={<AddNews />} />
            <Route path="edit-news/:id" element={<EditNews />} />
            <Route path="category" element={<Category />} />
            <Route path="draft" element={<Draft />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
