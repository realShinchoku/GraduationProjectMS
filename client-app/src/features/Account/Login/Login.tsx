import {observer} from "mobx-react-lite";
import { Box, Link } from "@mui/material";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./login.scss";
import { useStore } from "../../../app/stores/store";
import { UserFormValues } from "../../../app/models/user";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

function Login() {
    const {userStore:{login}} = useStore();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values:UserFormValues) => {
        await login(values)
    },
  });
  return (
    <Box className="container">
      <Box className="thumb">
        <Box className="logo"></Box>
      </Box>
      <Box className="SignUp_Form">
        {/* <SingUp /> */}
        <Box className="inner">
          <form onSubmit={formik.handleSubmit}>
            <TextField
              className="input"
              fullWidth
              id="email"
              name="email"
              label="Email"
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              className="input"
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </form>
        </Box>
        <Link href="" underline="none">
          Forgot password
        </Link>
      </Box>
    </Box>
  );
}

export default observer(Login);
