import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useOutletContext } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import "./homepagetest.scss"
import SearchIcon from '@mui/icons-material/Search';
import SelectLabels from "../../app/layout/Select/Select";
import { Input } from "@mui/material";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: any;
}
  
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function HomePageTest() {
    const value = useOutletContext();
    return (
        <Box className="homepage_test">
          <Box className="inner">
            <Typography variant="h3">Giảng Viên</Typography>
            <TabPanel value={value} index={0}>
              <Box>
                <SelectLabels props="status"/>
                <SelectLabels props="department"/>
                <SelectLabels props="subject"/>
              </Box>
              <Box>
              <Box className="group">
                
              </Box>
                <Button variant="outlined" startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
          </Box>
        </Box>
    )
}

export default HomePageTest;