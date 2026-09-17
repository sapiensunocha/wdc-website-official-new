import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, profile } from "../../api/user";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import BlogForm from "../../components/blogForm";
import CreatePost from "./createpost";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CustomTabPanel from "./customTab";
import Blogs from "../../components/blogs";
import AdminUsers from "./users";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function AdminPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const auth = JSON.parse(localStorage.getItem("userAuth"));
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const myprofile = async () => {
    const res = await profile(auth.id);
    if (res?.success) {
      if (res.user.role === "admin" || res.user.role === "dev") {
        setUser(res.user);
        // console.log(res?.user);
      } else {
        // console.log(auth);
        toast.warn("Redirected to home page ! You don't have the permission");
        navigate("/");
      }
    } else {
      toast.warn("Redirected to home page ! check your network");
      navigate("/");
    }
  };

  useEffect(() => {
    // navigate("");
    myprofile();
  }, []);

  return (
    <div>
      <Helmet><meta name="robots" content="noindex,nofollow" /><title>Admin — World Disaster Center</title></Helmet>
      <br />
      <br />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              style={{
                color: "white",
                fontWeight: "bold",
                border: "solid 1px rgba(200, 200, 200, 0.3)",
                margin: "4px",
              }}
              label="Users"
              {...a11yProps(0)}
            />
            <Tab
              style={{
                color: "white",
                fontWeight: "bold",
                border: "solid 1px rgba(200, 200, 200, 0.3)",
                margin: "4px",
              }}
              label="Blogs"
              {...a11yProps(1)}
            />
            <Tab
              style={{
                color: "white",
                fontWeight: "bold",
                border: "solid 1px rgba(200, 200, 200, 0.3)",
                margin: "4px",
              }}
              label="AddBlogs"
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <AdminUsers />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Blogs />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <CreatePost />
        </CustomTabPanel>
      </Box>

      {/* <BlogForm /> */}
    </div>
  );
}

export default AdminPage;
