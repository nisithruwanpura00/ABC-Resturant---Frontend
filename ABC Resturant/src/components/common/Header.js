import React, { useState, useEffect } from "react";
import {
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Select,
  styled,
  Box,
} from "@mui/material";

import navbarStyles from "../../assets/styles/components/navbar";
import Popup from "./Popup";
import { createUser } from "../../service/signIn.service";
import { registerUser } from "../../service/register.service";
import signIn from "../../models/signIn";
import register from "../../models/register";
import { popAlert } from "../../utils/alerts";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import colors from "../../assets/styles/colors";
import logo1 from "../../assets/images/logo1.png";

export const IconsWrapper = styled(Box)(({ theme }) => ({
  alignItems: "center",
  gap: "20px",
  display: "flex",
  justifyContent: "flex-end",
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigationHome = () => {
    navigate("/");
  };

  const handleNavigationDonation = () => {
    navigate("/donation");
  };

  const handleNavigationChildrenHome = () => {
    navigate("/branch");
  };

  const handleRegister = () => {
    setRegiserPopup(true);
  };

  const handleSignIn = () => {
    setShowPopup(true);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const [showPopup, setShowPopup] = useState(false);
  const [RegiserPopup, setRegiserPopup] = useState(false);

  const [inputs, setInputs] = useState(signIn);
  //register
  const [RegInputs, setRegInputs] = useState(register);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isloading, setISLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [conError, setConError] = useState("");

  const handlePopupClose = () => setShowPopup(false);
  const handleRegisterPopupClose = () => setRegiserPopup(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await createUser(inputs);

    if (response.success) {
      setLoading(false);
      dispatch(authActions.login(response.data));
      response?.data?.message &&
        popAlert("Success!", response?.data?.message, "success").then((res) => {
          setShowPopup(false);
          setInputs(signIn);
          setAnchorEl(null);
        });
    } else {
      response?.data?.message &&
        popAlert("Error!", response?.data?.message, "error");
      response?.data?.data && setErrors(response.data.data);
    }
    setLoading(false);
  };

  //   const handleRegisterSubmit = async (e) => {
  //   e.preventDefault();
  //   setISLoading(true);

  //   let role = "customer"; // Default role is "customer"

  //   if (RegInputs.role === "pharmacy owner" && RegInputs.role === "children home") {
  //     role = "pharmacy owner";
  //   }

  //   const response = await registerUser({
  //     ...RegInputs,
  //     role: role,
  //   });

  //   if (response.success) {
  //     response?.data?.message &&
  //       popAlert("Success!", response?.data?.message, "success").then((res) => {
  //         setRegiserPopup(false);
  //         setRegInputs(register);
  //         setAnchorEl(null);
  //       });
  //   } else {
  //     response?.data?.message &&
  //       popAlert("Error!", response?.data?.message, "error");
  //     response?.data?.data && setErrors(response.data.data);
  //   }
  //   setISLoading(false);
  // };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setISLoading(true);

    let role = "customer"; // Default role is "customer"

    // if (RegInputs.role === "donner" || RegInputs.role === "children home") {
    //   role = RegInputs.role;
    // }

    const response = await registerUser({
      ...RegInputs,
      role: role,
    });

    if (response.success) {
      response?.data?.message &&
        popAlert("Success!", response?.data?.message, "success").then((res) => {
          setRegiserPopup(false);
          setRegInputs(register);
          setAnchorEl(null);
        });
    } else {
      response?.data?.message &&
        popAlert("Error!", response?.data?.message, "error");
      response?.data?.data && setErrors(response.data.data);
    }
    setISLoading(false);
  };

  const handleClear = () => {
    setRegInputs(register);
  };

  const NavitationNEW = () => {
    navigate("/branch");
  };

  useEffect(() => {
    let unmounted = false;

    if (RegInputs.password !== confirmPassword) {
      // if (!unmounted) setConError("Password does not match!");
    } else {
      if (!unmounted) setConError("");
    }
    return () => {
      unmounted = true;
    };
  }, [confirmPassword, RegInputs.password]);

  // console.log("AUTH", authState.user.role);
  // console.log("RegiserPopup", RegiserPopup);

  //logout
  const logout = () => {
    dispatch(authActions.logout());
    navigate("/");
  };
  //profile
  const profile = () => {
    navigate("/profile");
  };

  const NavitationHOME = () => {
    navigate("/");
  };

  const NavitationRecepies = () => {
    navigate("/recepies");
  };

  const NavitationMenu = () => {
    navigate("/menutype");
  };

  const NavitationBranch = () => {
    navigate("/branchtable");
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          backgroundColor: "#4f3406",
          px: 8,
          py: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <img src={logo1} alt="Logo" style={{ width: 40, marginRight: 16 }} />
        <Box sx={{ px: 8, py: 3 }}>
          <Grid container>
            <Grid item xs={12}>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                alignItems="center"
                sx={{ height: "100%", marginLeft: "auto" }}
              >
                {/* {authState?.isLoggedIn && authState?.user?.role === "pharmacy owner" ? ( */}
                <>
                  <Typography
                    sx={{ ...navbarStyles.signInUpBtn, textAlign: "right" }}
                    onClick={NavitationHOME}
                  >
                    HOME
                  </Typography>
                  <Typography
                    sx={{ ...navbarStyles.signInUpBtn, textAlign: "right" }}
                    onClick={NavitationNEW}
                  >
                    BRANCH
                  </Typography>
                </>
                {/* ) : ( */}
                <>
                  {/* {authState?.isLoggedIn && ( */}
                  <>
                    {/* <Typography
                      sx={{ ...navbarStyles.signInUpBtn, textAlign: "right" }}
                      onClick={NavitationHOME}
                    >
                      Header 01
                    </Typography> */}
                    <Typography
                      sx={{ ...navbarStyles.signInUpBtn, textAlign: "right" }}
                      onClick={NavitationRecepies}
                    >
                      RECEPIES
                    </Typography>
                    <Typography
                      sx={{ ...navbarStyles.signInUpBtn, textAlign: "right" }}
                      onClick={NavitationMenu}
                    >
                      MENU TYPE
                    </Typography>
                    <Typography
                      sx={{ ...navbarStyles.signInUpBtn, textAlign: "right" }}
                      onClick={NavitationBranch}
                    >
                      BRANCH TABLE
                    </Typography>
                  </>
                  {/* )} */}
                </>
                {/* )} */}
                {/* {authState?.isLoggedIn && ( */}
                <>
                  <IconButton
                    className="header__menu__elements nav__icon"
                    aria-label="show more"
                    aria-haspopup="true"
                    color="primary"
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <AccountCircleIcon style={{ fontSize: 30 }} />
                  </IconButton>
                  <Menu
                    justifyContent="flex-end"
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                    className="header__menu"
                  >
                    <div className="navbar-nav ms-auto">
                      <MenuItem onClick={() => setRegiserPopup(true)}>
                        REGISTER
                      </MenuItem>
                      <MenuItem onClick={() => setShowPopup(true)}>
                        SIGN IN
                      </MenuItem>
                      <MenuItem onClick={() => logout()}>
                        <ExitToAppIcon />
                        SIGN OUT
                      </MenuItem>
                      <MenuItem onClick={() => profile()}>
                        <AccountCircleIcon />
                        PROFILE
                      </MenuItem>
                    </div>
                  </Menu>
                </>
                {/* )} */}
                {/* {!authState?.isLoggedIn && ( */}
                <>
                  {/* <Typography
                    sx={{ ...navbarStyles.signInUpBtn }}
                    onClick={() => setRegiserPopup(true)}
                  >
                    REGISTER
                  </Typography>
                  <Typography
                    sx={{ ...navbarStyles.signInUpBtn }}
                    onClick={() => setShowPopup(true)}
                  >
                    SIGN IN
                  </Typography> */}
                </>
                {/* )} */}
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* signin popup */}
        <Popup width={650} show={showPopup} onClose={handlePopupClose}>
          <Box sx={{ mb: 2 }}>
            <form onSubmit={handleSubmit}>
              <Typography
                variant="h4"
                fontWeight="bold"
                color="primary"
                textAlign={"center"}
                sx={{ mb: 6 }}
              >
                Sign In
              </Typography>
              <Box sx={{ mb: 5, m: 2 }}>
                <TextField
                  variant="filled"
                  label="Email"
                  fullWidth
                  value={inputs.email}
                  onChange={(e) =>
                    setInputs({
                      ...inputs,
                      email: e.target.value,
                    })
                  }
                />
                {errors["email"] && (
                  <Typography color="error">{errors["email"]}</Typography>
                )}
              </Box>

              <Box sx={{ mb: 5, m: 2, mt: 6 }}>
                <TextField
                  variant="filled"
                  label="Password"
                  type="password"
                  fullWidth
                  value={inputs.password}
                  onChange={(e) =>
                    setInputs({
                      ...inputs,
                      password: e.target.value,
                    })
                  }
                />
                {errors["password"] && (
                  <Typography color="error">{errors["password"]}</Typography>
                )}
              </Box>

              <Box sx={{ ml: 50 }}>
                <Typography variant="h7" color="primary">
                  Forget Your Password ?
                </Typography>
              </Box>
              <Box sx={{ m: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? <CircularProgress color="secondary" /> : "Sign In"}
                </Button>
              </Box>
            </form>
            <Box textAlign={"center"}>
              <Typography variant="h7" color="primary">
                Do you need to create an account?
              </Typography>
            </Box>
          </Box>
        </Popup>

        {/* register popup */}
        <Popup
          width={650}
          show={RegiserPopup}
          onClose={handleRegisterPopupClose}
        >
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="primary"
              textAlign={"center"}
              sx={{ mb: 6 }}
            >
              Register
            </Typography>

            <form onSubmit={handleRegisterSubmit}>
              <Box sx={{ mb: 2, m: 3 }}>
                <TextField
                  variant="filled"
                  label="First Name"
                  fullWidth
                  value={RegInputs.firstName}
                  onChange={(e) =>
                    setRegInputs({
                      ...RegInputs,
                      firstName: e.target.value,
                    })
                  }
                />
                {errors["firstName"] && (
                  <Typography color="error">{errors["firstName"]}</Typography>
                )}
              </Box>

              <Box sx={{ mb: 2, m: 3 }}>
                <TextField
                  variant="filled"
                  label="Last Name"
                  fullWidth
                  value={RegInputs.lastName}
                  onChange={(e) =>
                    setRegInputs({
                      ...RegInputs,
                      lastName: e.target.value,
                    })
                  }
                />
                {errors["lastName"] && (
                  <Typography color="error">{errors["lastName"]}</Typography>
                )}
              </Box>

              <Box sx={{ mb: 2, m: 3 }}>
                <TextField
                  variant="filled"
                  label="NIC"
                  fullWidth
                  value={RegInputs.NIC}
                  onChange={(e) =>
                    setRegInputs({
                      ...RegInputs,
                      NIC: e.target.value,
                    })
                  }
                />
                {errors["NIC"] && (
                  <Typography color="error">{errors["NIC"]}</Typography>
                )}
              </Box>

              <Box sx={{ mb: 2, m: 3 }}>
                <TextField
                  id="outlined-basic"
                  variant="filled"
                  label="Address"
                  fullWidth
                  value={RegInputs.address}
                  onChange={(e) =>
                    setRegInputs({
                      ...RegInputs,
                      address: e.target.value,
                    })
                  }
                />
                {errors["address"] && (
                  <Typography color="error">{errors["address"]}</Typography>
                )}
              </Box>

              <Box sx={{ mb: 2, m: 3 }}>
                <TextField
                  variant="filled"
                  label="Mobile"
                  fullWidth
                  value={RegInputs.mobile}
                  onChange={(e) =>
                    setRegInputs({
                      ...RegInputs,
                      mobile: e.target.value,
                    })
                  }
                />
                {errors["mobile"] && (
                  <Typography color="error">{errors["mobile"]}</Typography>
                )}
              </Box>

              <Box sx={{ mb: 2, m: 3 }}>
                <TextField
                  variant="filled"
                  label="E-mail"
                  type="email"
                  fullWidth
                  value={RegInputs.email}
                  onChange={(e) =>
                    setRegInputs({
                      ...RegInputs,
                      email: e.target.value,
                    })
                  }
                />
                {errors["email"] && (
                  <Typography color="error">{errors["email"]}</Typography>
                )}
              </Box>

              <Box sx={{ mb: 2, m: 3 }}>
                <TextField
                  variant="filled"
                  label="Password"
                  type="password"
                  fullWidth
                  value={RegInputs.password}
                  onChange={(e) =>
                    setRegInputs({
                      ...RegInputs,
                      password: e.target.value,
                    })
                  }
                />
                {errors["password"] && (
                  <Typography color="error">{errors["password"]}</Typography>
                )}
              </Box>

              <Box sx={{ mb: 2, m: 3 }}>
                {/* <TextField
                variant="filled"
                label="Confirm Password"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {conError && <Typography color="error">{conError}</Typography>} */}
              </Box>

              <Box
                sx={{
                  mb: 2,
                  mr: 3,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  type="reset"
                  variant="contained"
                  onClick={handleClear}
                  sx={{ py: 2, px: 5, mr: 2, backgroundColor: colors.grey }}
                >
                  Clear
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ py: 2, px: 5 }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress color="secondary" /> : "Save"}
                </Button>
              </Box>
            </form>
          </Box>
        </Popup>
      </Box>
    </React.Fragment>
  );
};

export default Header;
